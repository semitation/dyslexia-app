import DocumentUploadModal from '@/components/DocumentUploadModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useDocumentPolling } from '@/features/document/context/document-polling-context';
import {
	Download,
	Eye,
	FileText,
	Filter,
	MoreVertical,
	Search,
	Trash2,
	Upload,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useDocumentStatus } from '@/features/document/hooks/use-document-upload';
import { useQuery, useQueryClient, useQueries } from '@tanstack/react-query';
import { guardianTextbookApi } from '@/features/textbooks/api/guardian-textbook-api';
import { useNavigate } from '@tanstack/react-router';

interface Document {
    id: number;
    title: string;
    uploadDate: string;
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
    totalPages: number;
    // Optional: only for locally-tracked uploading job
    progress?: number;
}

const ContentManagePage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [activeJobDoc, setActiveJobDoc] = useState<Document | null>(null);
    const { getProcessingDocuments } = useDocumentPolling();
    const { data: textbooks = [], isLoading } = useQuery({
        queryKey: ['guardian', 'textbooks'],
        queryFn: () => guardianTextbookApi.listMyTextbooks(),
        staleTime: 30_000,
    });
	const [searchTerm, setSearchTerm] = useState('');
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const { toast } = useToast();

	// 모달 외부에서도 진행률을 추적하기 위한 상태
	const [activeJob, setActiveJob] = useState<{ jobId: string; fileName?: string } | null>(
		null,
	);

	const { data: extStatus } = useDocumentStatus(
		activeJob?.jobId || '',
		!!activeJob?.jobId,
	);

	// 리스트 상에서 진행 중 항목을 위한 임시 문서 ID
	const [activeJobDocId, setActiveJobDocId] = useState<number | null>(null);

    useEffect(() => {
        if (!extStatus) return;
        if (activeJobDocId && activeJobDoc) {
            setActiveJobDoc({
                ...activeJobDoc,
                title: extStatus.fileName || activeJobDoc.title,
                status: extStatus.status as Document['status'],
                progress: Math.max(0, Math.min(100, extStatus.progress ?? 0)),
            });
        }

		if (extStatus.status === 'COMPLETED') {
			toast({
				title: '교안 변환 완료',
				description: `${extStatus.fileName || activeJob?.fileName || '교안'} 변환이 완료되었습니다.`,
			});
            setActiveJob(null);
            setActiveJobDocId(null);
            setActiveJobDoc(null);
            queryClient.invalidateQueries({ queryKey: ['guardian', 'textbooks'] }).catch(() => {});
        }
        if (extStatus.status === 'FAILED') {
			toast({
				title: '변환 실패',
				description: extStatus.errorMessage || '교안 변환 중 오류가 발생했습니다.',
				variant: 'destructive',
			});
            setActiveJob(null);
            setActiveJobDocId(null);
            setActiveJobDoc(null);
        }
    }, [extStatus, toast, activeJobDocId, activeJob, activeJobDoc, queryClient]);

    const apiDocuments: Document[] = useMemo(
        () =>
            (textbooks || []).map((t) => ({
                id: t.id,
                title: t.title,
                uploadDate: t.createdAt,
                status: t.convertProcessStatus,
                totalPages: t.pageCount ?? 0,
            })),
        [textbooks],
    );

    // Derive processing textbook IDs for progress polling
    const processingIds = useMemo(
        () =>
            apiDocuments
                .filter((d) => d.status === 'PROCESSING' || d.status === 'PENDING')
                .map((d) => d.id),
        [apiDocuments],
    );

    // Helper: map analysis/convert status to pseudo progress (until backend provides numeric progress)
    const statusToProgress = (status?: string): number => {
        switch (status) {
            case 'PENDING':
                return 5;
            case 'PROCESSING':
                return 25;
            case 'ANALYZING':
                return 60;
            case 'THUMBNAIL':
                return 80;
            case 'COMPLETED':
                return 100;
            case 'FAILED':
                return 0;
            default:
                return 15;
        }
    };

    // Poll per-processing textbook detail to derive progress and auto-refresh when done
    const detailQueries = useQueries({
        queries: processingIds.map((id) => ({
            queryKey: ['guardian', 'textbooks', id, 'detail', 'progress'],
            queryFn: () => guardianTextbookApi.getTextbookDetail(id),
            enabled: processingIds.length > 0,
            refetchInterval: 10000,
            staleTime: 2000,
        })),
    });

    const detailProgressMap = useMemo(() => {
        const map = new Map<number, number>();
        detailQueries.forEach((q, idx) => {
            const id = processingIds[idx];
            const detail = q.data as any;
            if (!id || !detail) return;
            const s = detail.analysis_status ?? detail.convert_status;
            map.set(id, statusToProgress(s));
        });
        return map;
    }, [detailQueries, processingIds]);

    // When any detail reports COMPLETED, refresh main list
    useEffect(() => {
        if (!detailQueries.length) return;
        for (const q of detailQueries) {
            const d: any = q.data;
            if (d && (d.convert_status === 'COMPLETED' || d.analysis_status === 'COMPLETED')) {
                queryClient.invalidateQueries({ queryKey: ['guardian', 'textbooks'] }).catch(() => {});
                break;
            }
        }
    }, [detailQueries, queryClient]);

    const combinedDocuments = useMemo(() => {
        return activeJobDoc ? [activeJobDoc, ...apiDocuments] : apiDocuments;
    }, [activeJobDoc, apiDocuments]);

    const filteredDocuments = combinedDocuments.filter((doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleUploadComplete = (_newDocument: Document) => {
        // After completion, the polling will refetch the list
        toast({
            title: '교안 변환 완료',
            description:
                '교안이 성공적으로 변환되었습니다. 이제 학생에게 배정할 수 있습니다.',
        });
    };

	const getStatusBadge = (status: Document['status']) => {
		switch (status) {
			case 'PENDING':
				return (
					<Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
						대기중
					</Badge>
				);
			case 'PROCESSING':
				return (
					<Badge variant="secondary" className="bg-blue-100 text-blue-800">
						변환중
					</Badge>
				);
			case 'COMPLETED':
				return (
					<Badge variant="default" className="bg-green-100 text-green-800">
						완료
					</Badge>
				);
			case 'FAILED':
				return <Badge variant="destructive">실패</Badge>;
			default:
				return null;
		}
	};

	const getStatusText = (status: Document['status']) => {
		switch (status) {
			case 'PENDING':
				return '업로드 대기 중...';
			case 'PROCESSING':
				return '난독증 친화적 교안으로 변환 중...';
			case 'COMPLETED':
				return '변환 완료! 학생에게 배정할 수 있습니다.';
			case 'FAILED':
				return '변환에 실패했습니다. 다시 시도해주세요.';
			default:
				return '';
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				{/* 업로드 진행 배너 */}
				{activeJob && extStatus &&
					(extStatus.status === 'PENDING' || extStatus.status === 'PROCESSING') && (
						<div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
							<div className="flex items-center justify-between">
								<div className="text-sm text-blue-800">
									<strong>{activeJob.fileName || '교안'}</strong> 변환 진행 중...
								</div>
								<div className="flex items-center gap-3">
									<div className="text-sm text-blue-700">{extStatus.progress}%</div>
									<Button
										size="sm"
										variant="outline"
										onClick={() => setIsUploadModalOpen(true)}
										className="text-blue-700 border-blue-300 hover:bg-blue-100"
									>
										자세히 보기
									</Button>
								</div>
							</div>
							<div className="mt-2">
								<Progress value={extStatus.progress} className="h-2" />
							</div>
						</div>
					)}
				{/* 헤더 */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">교안 보관함</h1>
					<p className="text-gray-600">
						업로드한 PDF 교안을 관리하고 학생에게 배정하세요
					</p>
				</div>

				{/* 액션 바 */}
				<div className="flex flex-col sm:flex-row gap-4 mb-6">
					<div className="flex-1">
						<div className="relative">
							<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input
								placeholder="교안 제목으로 검색..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" size="sm">
							<Filter className="h-4 w-4 mr-2" />
							필터
						</Button>
						<Button
							onClick={() => setIsUploadModalOpen(true)}
							className="bg-primary hover:bg-primary/90"
						>
							<Upload className="h-4 w-4 mr-2" />새 교안 업로드
						</Button>
					</div>
				</div>

				{/* 통계 카드 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center">
                                <FileText className="h-8 w-8 text-blue-500" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">전체 교안</p>
                                    <p className="text-2xl font-bold">{combinedDocuments.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
							<div className="flex items-center">
								<div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
									<div className="h-4 w-4 bg-green-500 rounded-full"></div>
								</div>
								<div className="ml-4">
									<p className="text-sm font-medium text-gray-600">변환 완료</p>
                                    <p className="text-2xl font-bold">{combinedDocuments.filter((d) => d.status === 'COMPLETED').length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
						<CardContent className="p-4">
							<div className="flex items-center">
								<div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
									<div className="h-4 w-4 bg-blue-500 rounded-full"></div>
								</div>
								<div className="ml-4">
									<p className="text-sm font-medium text-gray-600">변환 중</p>
                                    <p className="text-2xl font-bold">{combinedDocuments.filter((d) => d.status === 'PROCESSING' || d.status === 'PENDING').length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

				{/* 교안 목록 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredDocuments.map((document) => (
						<Card
							key={document.id}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<h3 className="font-semibold text-gray-900 mb-1">
											{document.title}
										</h3>
                                <p className="text-sm text-gray-500 mb-2">{new Date(document.uploadDate).toLocaleDateString()}</p>
                                {getStatusBadge(document.status)}
                            </div>
                            <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* 썸네일 */}
                        <div className={`w-full h-32 bg-slate-200 rounded-lg mb-4 flex items-center justify-center`}>
                            <FileText className="h-12 w-12 text-white" />
                        </div>

								{/* 진행률 (변환 중일 때만) */}
                        {(document.status === 'PROCESSING' || document.status === 'PENDING') &&
                            ((document.progress ?? detailProgressMap.get(document.id)) !== undefined) && (
                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>변환 진행률</span>
                                    <span>{document.progress ?? detailProgressMap.get(document.id)}%</span>
                                </div>
                                <Progress value={document.progress ?? detailProgressMap.get(document.id) ?? 0} className="h-2" />
                            </div>
                        )}

								{/* 상태 메시지 */}
								<p className="text-sm text-gray-600 mb-4">
									{getStatusText(document.status)}
								</p>

								{/* 메타 정보 */}
                        <div className="flex justify-end text-sm text-gray-500 mb-4">
                            <span>{document.totalPages > 0 ? `${document.totalPages}페이지` : '-'}</span>
                        </div>

								{/* 액션 버튼 */}
                                <div className="flex gap-2">
                                    {document.status === 'COMPLETED' && (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                                onClick={() =>
                                                    navigate({
                                                        to: '/teacher/viewer/$documentId',
                                                        params: { documentId: String(document.id) },
                                                    })
                                                }
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                미리보기
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
									{document.status === 'FAILED' && (
										<Button variant="outline" size="sm" className="flex-1">
											다시 시도
										</Button>
									)}
									<Button variant="ghost" size="sm">
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>

								{/* 배정 정보 */}
                        {/* 배정 정보: 현재 스키마에 없어 비표시 */}
                    </CardContent>
                </Card>
            ))}
        </div>

				{/* 빈 상태 */}
				{filteredDocuments.length === 0 && (
					<Card className="p-12 text-center">
						<FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-semibold text-gray-900 mb-2">
							{searchTerm
								? '검색 결과가 없습니다'
								: '아직 업로드된 교안이 없습니다'}
						</h3>
						<p className="text-gray-600 mb-6">
							{searchTerm
								? '다른 키워드로 검색해보세요'
								: 'PDF 파일을 업로드하여 난독증 친화적 교안을 만들어보세요'}
						</p>
						{!searchTerm && (
							<Button
								onClick={() => setIsUploadModalOpen(true)}
								className="bg-primary hover:bg-primary/90"
							>
								<Upload className="h-4 w-4 mr-2" />첫 교안 업로드하기
							</Button>
						)}
					</Card>
				)}
			</div>

			{/* 업로드 모달 */}
				<DocumentUploadModal
					open={isUploadModalOpen}
					onOpenChange={setIsUploadModalOpen}
					onUploadComplete={handleUploadComplete}
					resumeJobId={activeJob?.jobId}
                onJobStarted={(jobId, fileName) => {
                    setActiveJob({ jobId, fileName });
                    const tempId = Date.now();
                    setActiveJobDocId(tempId);
                    setActiveJobDoc({
                        id: tempId,
                        title: fileName || '새 교안',
                        uploadDate: new Date().toISOString(),
                        status: 'PROCESSING',
                        totalPages: 0,
                        progress: 0,
                    });
                }}
            />
		</div>
	);
};

export default ContentManagePage;
