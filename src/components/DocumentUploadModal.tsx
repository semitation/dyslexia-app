import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
	useDocumentStatus,
	useDocumentUpload,
} from '@/features/document/hooks/use-document-upload';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
	AlertCircle,
	CheckCircle,
	FileText,
	Info,
	Upload,
	X,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDocumentPolling } from '@/features/document/context/document-polling-context';

interface DocumentUploadModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onUploadComplete?: (documentData: unknown) => void;
	onJobStarted?: (jobId: string, fileName?: string) => void;
	allowCloseWhileProcessing?: boolean;
	resumeJobId?: string; // 모달 재개 시 이어받을 jobId
}

type UploadPhase = 'idle' | 'uploading' | 'processing' | 'completed' | 'failed';

interface UploadState {
	phase: UploadPhase;
	jobId?: string;
	progress: number;
	error?: string;
	fileName?: string;
}

const DocumentUploadModal = ({
    open,
    onOpenChange: onParentOpenChange,
    onUploadComplete,
    onJobStarted,
    allowCloseWhileProcessing = false,
    resumeJobId,
}: DocumentUploadModalProps) => {
    const [file, setFile] = useState<File | null>(null);
    useEffect(() => {
        // resumeJobId가 있으면 처리 중 상태로 복원
        if (open && resumeJobId) {
            setUploadState((prev) => ({
                ...prev,
                phase: 'processing',
                jobId: resumeJobId,
                progress: 0,
                fileName: prev.fileName || '처리 중인 파일',
            }));
        }
        if (!open) {
            // 닫힐 때 상태 초기화
            setFile(null);
            setUploadState({ phase: 'idle', progress: 0 });
        }
    }, [open, resumeJobId]);
	const [isDragActive, setIsDragActive] = useState(false);
	const [uploadState, setUploadState] = useState<UploadState>({
		phase: 'idle',
		progress: 0,
	});
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { toast } = useToast();
	const queryClient = useQueryClient();
    const { addProcessingDocument } = useDocumentPolling();

	// API Hooks
	const uploadMutation = useDocumentUpload();
    const { data: statusData } = useDocumentStatus(
        uploadState.jobId || '',
        !!(uploadState.jobId && uploadState.phase === 'processing'),
    );

	// 파일 검증 함수
	const validateFile = useCallback(
		(file: File): boolean => {
			// MIME 타입 검증
			if (file.type !== 'application/pdf') {
				toast({
					title: '파일 형식 오류',
					description: 'PDF 파일만 업로드할 수 있습니다.',
					variant: 'destructive',
				});
				return false;
			}

			// 파일 크기 제한 (50MB)
			const MAX_FILE_SIZE = 50 * 1024 * 1024;
			if (file.size > MAX_FILE_SIZE) {
				toast({
					title: '파일 크기 초과',
					description: '파일 크기는 50MB 이하여야 합니다.',
					variant: 'destructive',
				});
				return false;
			}

			return true;
		},
		[toast],
	);

	// 파일 선택 핸들러
	const handleFileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const selectedFile = event.target.files?.[0];
			if (selectedFile && validateFile(selectedFile)) {
				setFile(selectedFile);
				setUploadState((prev) => ({
					...prev,
					fileName: selectedFile.name,
				}));
			}
		},
		[validateFile],
	);

	// 드래그 앤 드롭 핸들러
	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragActive(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragActive(false);
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setIsDragActive(false);

			const droppedFile = e.dataTransfer.files[0];
			if (droppedFile && validateFile(droppedFile)) {
				setFile(droppedFile);
				setUploadState((prev) => ({
					...prev,
					fileName: droppedFile.name,
				}));
			}
		},
		[validateFile],
	);

	// 업로드 핸들러
    const handleUpload = useCallback(async () => {
        if (!file) {
			toast({
				title: '파일을 선택해주세요',
				description: 'PDF 파일을 선택한 후 업로드해주세요.',
				variant: 'destructive',
			});
			return;
		}

        // 업로드 단계로 변경
        setUploadState({
            phase: 'uploading',
            progress: 0,
            fileName: file.name,
        });

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await uploadMutation.mutateAsync(formData);

            // 폴링 단계로 변경
            setUploadState({
                phase: 'processing',
                jobId: response.jobId,
                progress: 0,
                fileName: file.name,
            });


			// 상위에 작업 시작 이벤트 전달
			if (response.jobId && onJobStarted) {
				onJobStarted(response.jobId, file.name);
			}



            toast({
                title: '업로드 시작',
                description: response.message || '교안 변환이 시작되었습니다.',
            });

            // 교안 리스트를 즉시 갱신 시도
            queryClient.invalidateQueries({ queryKey: ['guardian', 'textbooks'] }).catch(() => {});
            queryClient.invalidateQueries({ queryKey: ['teacher'] }).catch(() => {});
			} catch (error: unknown) {
			setUploadState({
				phase: 'failed',
				progress: 0,
				error:
					error instanceof Error ? error.message : '업로드에 실패했습니다.',
				fileName: file.name,
			});

			toast({
				title: '업로드 실패',
				description:
					error instanceof Error
						? error.message
						: '파일 업로드 중 오류가 발생했습니다.',
				variant: 'destructive',
			});
		}
    }, [file, uploadMutation, toast, addProcessingDocument, onJobStarted, queryClient]);

	// 상태 폴링 결과 처리
    useEffect(() => {
        if (!statusData || uploadState.phase !== 'processing') return;

        // 진행률만 변경 시 불필요한 렌더 방지
        setUploadState((prev) => {
            if (prev.progress === statusData.progress) return prev;
            return { ...prev, progress: statusData.progress };
        });

        if (statusData.status === 'COMPLETED') {
            setUploadState((prev) =>
                prev.phase === 'completed' && prev.progress === 100
                    ? prev
                    : { ...prev, phase: 'completed', progress: 100 },
            );
            onUploadComplete?.({
                id: statusData.jobId,
                title: statusData.fileName,
                uploadDate: statusData.createdAt,
                status: 'COMPLETED',
                assignedStudents: 0,
                totalPages: 0,
                grade: '미정',
                thumbnailColor: 'bg-green-400',
                progress: 100,
            });
            toast({ title: '변환 완료', description: '교안이 성공적으로 변환되었습니다.' });
            queryClient.invalidateQueries({ queryKey: ['guardian', 'textbooks'] }).catch(() => {});
            queryClient.invalidateQueries({ queryKey: ['teacher'] }).catch(() => {});
        } else if (statusData.status === 'FAILED') {
            setUploadState((prev) => ({
                ...prev,
                phase: 'failed',
                error: statusData.errorMessage || '변환에 실패했습니다.',
            }));
            toast({
                title: '변환 실패',
                description: statusData.errorMessage || '교안 변환 중 오류가 발생했습니다.',
                variant: 'destructive',
            });
        }
    }, [statusData, uploadState.phase, onUploadComplete, toast, queryClient]);

	// 재시도 핸들러
	const handleRetry = useCallback(() => {
		setUploadState({
			phase: 'idle',
			progress: 0,
			fileName: file?.name,
		});
	}, [file]);

    // 모달 닫기 핸들러
    const handleClose = useCallback(() => {
        setFile(null);
        setUploadState({ phase: 'idle', progress: 0 });
        onParentOpenChange(false);
    }, [onParentOpenChange]);

	// 파일 입력 클릭 핸들러
	const handleFileInputClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	// 파일 제거 핸들러
	const handleRemoveFile = useCallback(() => {
		setFile(null);
		setUploadState((prev) => ({
			...prev,
			fileName: undefined,
		}));
	}, []);

    return (
    <Dialog open={open} onOpenChange={onParentOpenChange}>
        <DialogContent className="max-w-md sm:max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>새 교안 업로드</span>
                </DialogTitle>
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-5 top-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label="닫기"
                >
                  <X className="h-4 w-4" />
                </button>
            </DialogHeader>

				{uploadState.phase === 'idle' ? (
					<div className="space-y-6">
						{/* 파일 업로드 영역 */}
						<div className="space-y-2">
							<Label>PDF 파일 선택</Label>
							<div
								className={cn(
									'border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer',
									isDragActive
										? 'border-primary bg-primary/5'
										: 'border-gray-300 hover:border-primary/50',
								)}
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}
								onClick={handleFileInputClick}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										handleFileInputClick();
									}
								}}
								tabIndex={0}
								role="button"
								aria-label="PDF 파일을 선택하거나 드래그하여 업로드하세요"
							>
								<input
									ref={fileInputRef}
									type="file"
									accept=".pdf,application/pdf"
									onChange={handleFileChange}
									className="hidden"
								/>
								{file ? (
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<FileText className="w-8 h-8 text-primary" />
											<div className="text-left">
												<p className="text-sm font-medium text-gray-700">
													{file.name}
												</p>
												<p className="text-xs text-gray-500">
													{(file.size / 1024 / 1024).toFixed(2)} MB
												</p>
											</div>
										</div>
										<Button
											variant="ghost"
											size="sm"
											onClick={(e) => {
												e.stopPropagation();
												handleRemoveFile();
											}}
											className="h-6 w-6 p-0"
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
								) : (
									<>
										<Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
										<p className="text-sm text-gray-600 mb-1">
											{isDragActive
												? '여기에 파일을 놓아주세요'
												: 'PDF 파일을 드래그하거나 클릭하여 선택하세요'}
										</p>
										<p className="text-xs text-gray-400">
											최대 50MB • PDF 형식만 지원
										</p>
									</>
								)}
							</div>
						</div>

						{/* 가이드 섹션 */}
						<div className="bg-blue-50 p-4 rounded-lg space-y-3">
							<div className="flex items-center space-x-2 text-blue-700">
								<Info className="w-4 h-4" />
								<span className="font-medium text-sm">업로드 가이드</span>
							</div>
							<div className="text-xs text-blue-600 space-y-1">
								<p>
									• <strong>지원 파일 형식:</strong> PDF만 업로드 가능합니다
								</p>
								<p>
									• <strong>파일 크기 제한:</strong> 최대 50MB까지 지원합니다
								</p>
								<p>
									• <strong>자동 번역 지원:</strong> 모든 언어 자료는 한국어로
									자동 번역됩니다
								</p>
								<p>
									• <strong>변환 시간:</strong> 페이지 수에 따라 5-15분
									소요됩니다
								</p>
								<p>
									• <strong>실시간 알림:</strong> 변환 완료 시 자동으로
									알려드립니다
								</p>
							</div>
						</div>

						{/* 버튼 */}
						<div className="flex space-x-2">
							<Button
								variant="outline"
								onClick={handleClose}
								className="flex-1"
							>
								취소
							</Button>
							<Button
								onClick={handleUpload}
								disabled={!file || uploadMutation.isPending}
								className="flex-1"
							>
								<Upload className="w-4 h-4 mr-2" />
								생성하기
							</Button>
						</div>
					</div>
				) : uploadState.phase === 'uploading' ? (
					/* 업로드 중 */
					<div className="space-y-6 py-4">
						<div className="text-center">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
								<Upload className="w-8 h-8 text-blue-600" />
							</div>
							<h3 className="text-lg font-semibold mb-2">
								파일을 업로드하고 있어요
							</h3>
							<p className="text-sm text-gray-600">
								파일을 서버에 전송하는 중입니다...
							</p>
						</div>

						{/* 업로드 단계에서도 기본 진행 막대를 표시 (0% 고정) */}
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>업로드 진행률</span>
								<span>0%</span>
							</div>
							<Progress value={0} className="h-3" />
						</div>
					</div>
				) : uploadState.phase === 'processing' ? (
					/* 처리 중 */
					<div className="space-y-6 py-4">
						<div className="text-center">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<FileText className="w-8 h-8 text-primary" />
							</div>
							<h3 className="text-lg font-semibold mb-2">
								난독증 친화적 교안으로 변환 중
							</h3>
							<p className="text-sm text-gray-600 mb-4">
								잠시만 기다려주세요. 변환이 완료되면 알려드릴게요.
							</p>
						</div>

						{/* 프로그레스 바 */}
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>변환 진행률</span>
								<span>{uploadState.progress}%</span>
							</div>
							<Progress value={uploadState.progress} className="h-3" />
						</div>

						<div className="bg-blue-50 p-3 rounded-lg text-center">
							<p className="text-sm text-blue-600">
								💡 진행률은 교안 보관함에서 계속 확인하실 수 있어요!
							</p>
						</div>

						<div className="text-center">
							<p className="text-xs text-gray-500">
								JobID: {uploadState.jobId}
							</p>
						</div>

						{/* 처리 중일 때 백그라운드 실행 버튼 */}
						<div className="flex space-x-2">
							<Button
								variant="outline"
								onClick={handleClose}
								className="flex-1"
							>
								백그라운드로 실행
							</Button>
						</div>
					</div>
				) : uploadState.phase === 'completed' ? (
					/* 완료 */
					<div className="space-y-6 py-4">
						<div className="text-center">
							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<CheckCircle className="w-8 h-8 text-green-600" />
							</div>
							<h3 className="text-lg font-semibold text-green-800 mb-2">
								교안 변환이 완료되었습니다!
							</h3>
							<p className="text-sm text-gray-600 mb-4">
								교안 보관함에서 확인하고 학생에게 배정하세요.
							</p>
						</div>

						<div className="bg-green-50 p-4 rounded-lg">
							<p className="text-sm text-green-700 text-center">
								✅ {uploadState.fileName} 변환 완료
							</p>
						</div>

						<Button onClick={handleClose} className="w-full">
							교안 보관함으로 이동
						</Button>
					</div>
				) : uploadState.phase === 'failed' ? (
					/* 실패 */
					<div className="space-y-6 py-4">
						<div className="text-center">
							<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<AlertCircle className="w-8 h-8 text-red-600" />
							</div>
							<h3 className="text-lg font-semibold text-red-800 mb-2">
								변환에 실패했습니다
							</h3>
							<p className="text-sm text-gray-600 mb-4">
								{uploadState.error || '알 수 없는 오류가 발생했습니다.'}
							</p>
						</div>

						<div className="bg-red-50 p-4 rounded-lg">
							<div className="text-sm text-red-700 space-y-2">
								<p className="font-medium">문제 해결 방법:</p>
								<ul className="list-disc list-inside space-y-1 text-xs">
									<li>PDF 파일이 손상되지 않았는지 확인해보세요</li>
									<li>파일 크기가 50MB를 초과하지 않았는지 확인해보세요</li>
									<li>네트워크 연결 상태를 확인해보세요</li>
									<li>문제가 계속되면 고객지원센터에 문의해주세요</li>
								</ul>
							</div>
						</div>

						<div className="flex space-x-2">
							<Button
								variant="outline"
								onClick={handleClose}
								className="flex-1"
							>
								닫기
							</Button>
							<Button onClick={handleRetry} className="flex-1">
								다시 시도
							</Button>
						</div>
					</div>
				) : null}
			</DialogContent>
		</Dialog>
	);
};

export default DocumentUploadModal;
