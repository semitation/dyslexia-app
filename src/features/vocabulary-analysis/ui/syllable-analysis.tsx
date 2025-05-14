import type { PhonemeComponent, SyllableComponents, SyllableInfo } from '@/shared/api/types';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

function PhonemeCard({ component, type }: { component: PhonemeComponent | SyllableComponents['medial']; type: 'initial' | 'medial' | 'final' }) {
	return (
		<div className="flex flex-col items-center gap-2 rounded-lg border p-3 text-center">
			<div className="text-2xl font-bold">{type === 'medial' ? (component as SyllableComponents['medial']).vowel : (component as PhonemeComponent).consonant}</div>
			<div className="text-sm text-gray-500">{component.pronunciation}</div>
			<div className="text-xs text-gray-400">{component.sound}</div>
			<Badge className={getDifficultyStyle(component.difficulty)}>
				{getDifficultyText(component.difficulty)}
			</Badge>
		</div>
	);
}

export function SyllableAnalysis({ syllable }: { syllable: SyllableInfo }) {
	return (
		<Card className="mb-4">
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<span className="text-2xl">{syllable.syllable}</span>
					<span className="text-sm text-gray-500">{syllable.combinedSound}</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-3 gap-4">
					<PhonemeCard component={syllable.components.initial} type="initial" />
					<PhonemeCard component={syllable.components.medial} type="medial" />
					{syllable.components.final && (
						<PhonemeCard component={syllable.components.final} type="final" />
					)}
				</div>
				<div className="mt-4 text-sm text-gray-600">
					<p>{syllable.writingTips}</p>
				</div>
			</CardContent>
		</Card>
	);
}

const getDifficultyText = (level: string) => {
	switch (level) {
		case 'easy':
			return '쉬움';
		case 'medium':
			return '보통';
		default:
			return '어려움';
	}
};

const getDifficultyStyle = (level: string) => {
	switch (level) {
		case 'easy':
			return 'bg-green-100 text-green-800';
		case 'medium':
			return 'bg-yellow-100 text-yellow-800';
		default:
			return 'bg-red-100 text-red-800';
	}
}; 