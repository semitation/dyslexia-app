import type { LearningTip } from '@/shared/api/types';
import { Card, CardContent } from '@/shared/ui/card';
import { Lightbulb } from 'lucide-react';

interface LearningTipsSectionProps {
	tips: LearningTip[];
}

export function LearningTipsSection({ tips }: LearningTipsSectionProps) {
	return (
		<div className="space-y-4">
			{tips.map((tip, index) => (
				<Card key={`tip-${tip.category}-${index}`}>
					<CardContent className="flex items-start gap-4 p-4">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
							<Lightbulb className="h-4 w-4 text-yellow-600" />
						</div>
						<div className="flex-1">
							<h4 className="font-semibold">{tip.category}</h4>
							<p className="text-sm text-muted-foreground">{tip.content}</p>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
} 