import DocumentUploadModal from '@/components/DocumentUploadModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
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
import { useState } from 'react';

interface Document {
	id: number;
	title: string;
	uploadDate: string;
	status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
	assignedStudents: number;
	totalPages: number;
	grade: string;
	thumbnailColor: string;
	progress: number;
}

const mockDocuments: Document[] = [
	{
		id: 1,
		title: '초등 국어 3학년 1단원',
		uploadDate: '2024-03-15',
		status: 'COMPLETED',
		assignedStudents: 3,
		totalPages: 12,
		grade: '3학년',
		thumbnailColor: 'bg-blue-400',
		progress: 100,
	},
	{
		id: 2,
		title: '수학 연산 워크북',
		uploadDate: '2024-03-14',
		status: 'PROCESSING',
		assignedStudents: 0,
		totalPages: 0,
		grade: '미정',
		thumbnailColor: 'bg-green-400',
		progress: 65,
	},
	{
		id: 3,
		title: '과학 실험 가이드',
		uploadDate: '2024-03-13',
		status: 'FAILED',
		assignedStudents: 0,
		totalPages: 0,
		grade: '미정',
		thumbnailColor: 'bg-red-400',
		progress: 0,
	},
];

const ContentManagePage = () => {
	const [documents, setDocuments] = useState<Document[]>(mockDocuments);
	const [searchTerm, setSearchTerm] = useState('');
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const { toast } = useToast();

	const filteredDocuments = documents.filter((doc) =>
		doc.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const handleUploadComplete = (newDocument: Document) => {
		setDocuments((prev) => [newDocument, ...prev]);
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
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center">
								<FileText className="h-8 w-8 text-blue-500" />
								<div className="ml-4">
									<p className="text-sm font-medium text-gray-600">전체 교안</p>
									<p className="text-2xl font-bold">{documents.length}</p>
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
									<p className="text-2xl font-bold">
										{documents.filter((d) => d.status === 'COMPLETED').length}
									</p>
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
									<p className="text-2xl font-bold">
										{
											documents.filter(
												(d) =>
													d.status === 'PROCESSING' || d.status === 'PENDING',
											).length
										}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center">
								<div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
									<div className="h-4 w-4 bg-orange-500 rounded-full"></div>
								</div>
								<div className="ml-4">
									<p className="text-sm font-medium text-gray-600">
										배정된 학생
									</p>
									<p className="text-2xl font-bold">
										{documents.reduce((sum, d) => sum + d.assignedStudents, 0)}
									</p>
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
										<p className="text-sm text-gray-500 mb-2">
											{new Date(document.uploadDate).toLocaleDateString()}
										</p>
										{getStatusBadge(document.status)}
									</div>
									<Button variant="ghost" size="sm">
										<MoreVertical className="h-4 w-4" />
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								{/* 썸네일 */}
								<div
									className={`w-full h-32 ${document.thumbnailColor} rounded-lg mb-4 flex items-center justify-center`}
								>
									<FileText className="h-12 w-12 text-white" />
								</div>

								{/* 진행률 (변환 중일 때만) */}
								{(document.status === 'PROCESSING' ||
									document.status === 'PENDING') && (
									<div className="mb-4">
										<div className="flex justify-between text-sm text-gray-600 mb-2">
											<span>변환 진행률</span>
											<span>{document.progress}%</span>
										</div>
										<Progress value={document.progress} className="h-2" />
									</div>
								)}

								{/* 상태 메시지 */}
								<p className="text-sm text-gray-600 mb-4">
									{getStatusText(document.status)}
								</p>

								{/* 메타 정보 */}
								<div className="flex justify-between text-sm text-gray-500 mb-4">
									<span>{document.grade}</span>
									<span>
										{document.totalPages > 0
											? `${document.totalPages}페이지`
											: '-'}
									</span>
								</div>

								{/* 액션 버튼 */}
								<div className="flex gap-2">
									{document.status === 'COMPLETED' && (
										<>
											<Button variant="outline" size="sm" className="flex-1">
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
								{document.assignedStudents > 0 && (
									<div className="mt-3 pt-3 border-t">
										<p className="text-sm text-gray-600">
											{document.assignedStudents}명의 학생에게 배정됨
										</p>
									</div>
								)}
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
			/>
		</div>
	);
};

export default ContentManagePage;
