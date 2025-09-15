import { Card, CardContent } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';

const missions = [
	{
		icon: '/icons/upload.svg',
		title: 'AI 맞춤 변환',
		description: 'PDF를 난독증 학생에 맞춰 자동 변환해요',
	},
	{
		icon: '/icons/audio.svg',
		title: '읽기 자신감',
		description: 'TTS, 폰트 조절 등으로 아이만의 속도로 학습할 수 있어요',
	},
	{
		icon: '/icons/understand.svg',
		title: 'AI 학습 친구',
		description: '그림을 그리면 AI 친구가 살아 움직이며 반응해요',
	},
	{
		icon: '/icons/dashboard.svg',
		title: '학습 관리',
		description: '보호자에게 상세한 학습 분석 리포트를 제공해요',
	},
];

export default function Mission() {
	return (
		<section className="py-20 px-4 bg-white">
			<div className="max-w-6xl mx-auto text-center">
				<Typography
					as="h2"
					variant="h2"
					weight="bold"
					className="text-3xl mb-12 leading-8 text-primary"
				>
					모든 학생은 배울 권리가 있습니다.
				</Typography>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{missions.map((item, idx) => (
						<Card
							key={idx}
							className="transition-shadow hover:shadow-md border border-gray-200"
						>
							<CardContent className="flex flex-col items-center p-6 text-center">
								<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
									<img src={item.icon} alt={item.title} className="w-6 h-6" />
								</div>
								<Typography
									variant="h4"
									className="mb-2 font-semibold text-gray-800"
								>
									{item.title}
								</Typography>
								<Typography
									variant="p"
									className="text-sm text-gray-600 leading-relaxed"
								>
									{item.description}
								</Typography>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
