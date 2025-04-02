import { cn } from '../lib/utils';

interface ProgressBarProps {
	progress: number;
	maxWidth?: string;
	height?: string;
	className?: string;
	showPercentage?: boolean;
	bgColor?: string;
	progressColor?: string;
}

export function ProgressBar({
	progress,
	maxWidth = '100%',
	height = '0.75rem',
	className,
	showPercentage = false,
	bgColor = 'bg-gray-200',
	progressColor = 'bg-dyslexia-blue',
}: ProgressBarProps) {
	const normalizedProgress = Math.min(Math.max(0, progress), 100);

	return (
		<div className={cn('flex flex-col gap-1', className)}>
			<div
				className={cn('w-full rounded-full overflow-hidden', bgColor)}
				style={{ maxWidth, height }}
			>
				<div
					className={cn(
						'h-full rounded-full transition-all duration-300 ease-in-out',
						progressColor,
					)}
					style={{ width: `${normalizedProgress}%` }}
					role="cell"
					aria-valuenow={normalizedProgress}
					aria-valuemin={0}
					aria-valuemax={100}
				/>
			</div>
			{showPercentage && (
				<span className="text-sm text-gray-600 text-right">
					{normalizedProgress.toFixed(0)}%
				</span>
			)}
		</div>
	);
}

export function LabeledProgressBar({
	label,
	progress,
	maxWidth = '100%',
	height = '0.75rem',
	className,
	showPercentage = true,
	bgColor = 'bg-gray-200',
	progressColor = 'bg-dyslexia-blue',
}: ProgressBarProps & { label: string }) {
	return (
		<div className={cn('flex flex-col gap-1', className)}>
			<div className="flex justify-between items-center mb-1">
				<span className="text-sm font-medium text-gray-700">{label}</span>
				{showPercentage && (
					<span className="text-sm text-gray-600">
						{Math.min(Math.max(0, progress), 100).toFixed(0)}%
					</span>
				)}
			</div>
			<ProgressBar
				progress={progress}
				maxWidth={maxWidth}
				height={height}
				bgColor={bgColor}
				progressColor={progressColor}
				showPercentage={false}
			/>
		</div>
	);
}
