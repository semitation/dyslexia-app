import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { Typography } from '@/shared/ui/typography';
import { Book as BookIcon, CalendarDays } from 'lucide-react';

const BOOKS = [
	{
		id: 'b1',
		title: '우리 동네 동물들',
		progress: 65,
		current: 13,
		total: 20,
		buttonText: '계속',
		lastActive: '어제',
		bgColor: 'bg-orange-100',
		iconColor: 'text-orange-500',
	},
	{
		id: 'b2',
		title: '우주 탐험 이야기',
		progress: 30,
		current: 8,
		total: 25,
		buttonText: '계속',
		lastActive: '3일 전',
		bgColor: 'bg-blue-100',
		iconColor: 'text-blue-500',
	},
	{
		id: 'b3',
		title: '마법의 숲 모험',
		progress: 0,
		current: 0,
		total: 18,
		buttonText: '시작',
		lastActive: '아직 읽지 않음',
		bgColor: 'bg-green-100',
		iconColor: 'text-green-500',
	},
];

export default function LibraryView() {
	return (
		<div className="space-y-4">
			{BOOKS.map((book) => (
				<Card
					key={book.id}
					className="bg-white rounded-2xl p-4 shadow-md flex items-center"
				>
					<div
						className={`${book.bgColor} w-12 h-12 rounded-lg flex items-center justify-center`}
					>
						<BookIcon className={`${book.iconColor} w-6 h-6`} />
					</div>

					<div className="flex-1 ml-4">
						<Typography variant="p" weight="semibold" className="text-gray-800">
							{book.title}
						</Typography>
						<Typography variant="p" size="sm" className="text-gray-500 mt-1">
							진행률
						</Typography>
						<div className="flex items-center space-x-2 mt-1">
							<ProgressBar progress={book.progress} className="h-2 flex-1" />
							<span className="text-sm font-medium text-gray-700">
								{book.progress}%
							</span>
						</div>
						<div className="flex items-center justify-between mt-2 text-sm text-gray-500">
							<div className="flex items-center space-x-1">
								<CalendarDays className="w-4 h-4" />
								<span>{book.lastActive}</span>
							</div>
							<span>
								{book.current}/{book.total} 페이지
							</span>
						</div>
					</div>

					<Button size="sm" className="ml-4">
						{book.buttonText}
					</Button>
				</Card>
			))}
		</div>
	);
}
