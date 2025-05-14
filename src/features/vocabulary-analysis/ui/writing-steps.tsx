import type { WritingStep } from '@/shared/api/types';
import { Card, CardContent } from '@/shared/ui/card';
import { Check } from 'lucide-react';

interface WritingStepsProps {
	steps: WritingStep[];
}

export function WritingSteps({ steps }: WritingStepsProps) {
	return (
		<div className="space-y-4">
			{steps.map((step, index) => (
				<Card key={`step-${step.component}-${index}`}>
					<CardContent className="flex items-center gap-4 p-4">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
							{index + 1}
						</div>
						<div className="flex-1">
							<h4 className="font-semibold">{step.component}</h4>
							<p className="text-sm text-muted-foreground">{step.description}</p>
						</div>
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
							<Check className="h-4 w-4 text-green-600" />
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
} 