import type { PageTipResponse } from '../model/types';
import { textToSpeech } from '../lib/text-to-speech';
import { Typography } from '@/shared/ui';
import { Volume2, Info } from 'lucide-react';
import type React from 'react';

interface PageTipsProps {
	tips: PageTipResponse[];
	fontSize: number;
}

export const PageTips: React.FC<PageTipsProps> = ({ tips, fontSize }) => {
	if (!tips || tips.length === 0) return null;

	const handleSpeak = (text: string) => {
		textToSpeech.speak(text);
	};

	return (
		<div className="mt-6 bg-blue-50 p-4 rounded-md">
			<div className="flex items-center mb-2">
				<Info className="w-5 h-5 text-blue-500 mr-2" />
				<Typography variant="h4" className="text-blue-700">
					학습 팁
				</Typography>
			</div>
			<div className="space-y-3">
				{tips.map((tip) => (
					<div key={tip.id} className="bg-white p-3 rounded shadow-sm">
						<div className="flex justify-between">
							<Typography variant="p" className="font-bold text-blue-800">
								{tip.term}
							</Typography>
							<button
								type="button"
								onClick={() =>
									handleSpeak(tip.readAloudText || tip.simplifiedExplanation)
								}
								className="text-blue-600 hover:text-blue-800"
							>
								<Volume2 className="w-4 h-4" />
							</button>
						</div>
						<Typography
							variant="p"
							className="text-gray-700 mt-1"
							style={{ fontSize: `${fontSize - 1}px` }}
						>
							{tip.simplifiedExplanation}
						</Typography>
					</div>
				))}
			</div>
		</div>
	);
};
