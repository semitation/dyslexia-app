import React from 'react';
import type { PhonemeAnalysis, SyllableInfo } from '@/shared/api/types';
import { Button } from '@/shared/ui/button';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { Volume, ArrowLeft } from 'lucide-react';
import { WritingCanvas } from './writing-canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

interface WritingPracticeProps {
	word: string;
	phonemeAnalysis: PhonemeAnalysis;
	onBack: () => void;
	onSpeak: (text: string) => void;
}

type PracticeStep = {
	type: 'initial' | 'medial' | 'final' | 'syllable';
	syllableIndex: number;
	componentIndex: number;
	complete: boolean;
};

export function WritingPractice({
	word,
	phonemeAnalysis,
	onBack,
	onSpeak,
}: WritingPracticeProps) {
	const [currentStep, setCurrentStep] = React.useState<PracticeStep>({
		type: 'initial',
		syllableIndex: 0,
		componentIndex: 0,
		complete: false,
	});

	const totalSteps = React.useMemo(() => {
		return phonemeAnalysis.syllables.reduce((total, syllable) => {
			// 초성, 중성은 필수
			let count = 2;
			// 종성이 있으면 +1
			if (syllable.components.final) count++;
			// 전체 음절 연습 +1
			count++;
			return total + count;
		}, 0);
	}, [phonemeAnalysis.syllables]);

	const currentStepNumber = React.useMemo(() => {
		let step = 1;
		for (let i = 0; i < currentStep.syllableIndex; i++) {
			step += phonemeAnalysis.syllables[i].components.final ? 4 : 3;
		}
		if (currentStep.type === 'medial') step++;
		else if (currentStep.type === 'final') step += 2;
		else if (currentStep.type === 'syllable') step += 3;
		return step;
	}, [currentStep, phonemeAnalysis.syllables]);

	const progress = (currentStepNumber / totalSteps) * 100;

	const getCurrentSyllable = () => phonemeAnalysis.syllables[currentStep.syllableIndex];

	const getStepGuide = () => {
		const syllable = getCurrentSyllable();
		switch (currentStep.type) {
			case 'initial':
				return {
					title: `초성 "${syllable.components.initial.consonant}" 쓰기`,
					description: syllable.components.initial.sound,
					example: syllable.components.initial.consonant,
				};
			case 'medial':
				return {
					title: `중성 "${syllable.components.medial.vowel}" 쓰기`,
					description: syllable.components.medial.sound,
					example: syllable.components.medial.vowel,
				};
			case 'final':
				return syllable.components.final ? {
					title: `종성 "${syllable.components.final.consonant}" 쓰기`,
					description: syllable.components.final.sound,
					example: syllable.components.final.consonant,
				} : null;
			case 'syllable':
				return {
					title: `음절 "${syllable.syllable}" 완성하기`,
					description: syllable.combinedSound,
					example: syllable.syllable,
				};
			default:
				return null;
		}
	};

	const handleNext = () => {
		const syllable = getCurrentSyllable();
		
		if (currentStep.type === 'initial') {
			setCurrentStep({ ...currentStep, type: 'medial' });
		} else if (currentStep.type === 'medial') {
			if (syllable.components.final) {
				setCurrentStep({ ...currentStep, type: 'final' });
			} else {
				setCurrentStep({ ...currentStep, type: 'syllable' });
			}
		} else if (currentStep.type === 'final') {
			setCurrentStep({ ...currentStep, type: 'syllable' });
		} else if (currentStep.type === 'syllable') {
			if (currentStep.syllableIndex < phonemeAnalysis.syllables.length - 1) {
				setCurrentStep({
					type: 'initial',
					syllableIndex: currentStep.syllableIndex + 1,
					componentIndex: 0,
					complete: false,
				});
			} else {
				setCurrentStep({ ...currentStep, complete: true });
			}
		}
	};

	const guide = getStepGuide();
	if (!guide) return null;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Button variant="ghost" size="icon" onClick={onBack}>
						<ArrowLeft className="h-4 w-4" />
					</Button>
					<h3 className="text-2xl font-bold">"{word}" 쓰기 연습</h3>
				</div>
				<Button variant="ghost" size="icon" onClick={() => onSpeak(guide.example)}>
					<Volume className="h-4 w-4" />
				</Button>
			</div>

			<ProgressBar progress={progress} className="h-2" />
			
			<div className="text-center space-y-2">
				<p className="text-sm text-muted-foreground">
					{currentStepNumber} / {totalSteps} 단계
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>{guide.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div className="text-center">
							<p className="text-sm text-muted-foreground mb-2">{guide.description}</p>
							<div className="text-6xl font-bold text-primary">{guide.example}</div>
						</div>
						
						<WritingCanvas height={200} />

						<div className="flex justify-end">
							<Button onClick={handleNext}>
								다음 단계로
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
} 