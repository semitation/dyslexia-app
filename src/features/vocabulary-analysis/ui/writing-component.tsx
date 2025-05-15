import { Typography } from '@/shared/ui';
import { WritingCanvas } from './writing-canvas';
import { SoundButton } from '@/shared/ui/sound-button';
import { useTextToSpeech } from '@/shared/hooks/use-text-to-speech';
import { toast } from 'sonner';

interface WritingComponentProps {
	title: string;
	description?: string;
	width?: number;
	height?: number;
	guideText?: string;
	onSave: (imageData: string) => void;
	initialImage?: string;
}

export function WritingComponent({
	title,
	description,
	width = 280,
	height = 200,
	guideText,
	onSave,
	initialImage,
}: WritingComponentProps) {
  const { speak } = useTextToSpeech();
	return (
		<div className="flex flex-col gap-2">
			<div>
        <div className="flex w-full justify-between">
				<Typography variant="h4" size="lg" className="font-semibold">{title}</Typography>
        <SoundButton text={title} onSpeak={() => {
          if (guideText) {
            speak(guideText);
          } else {
            toast.error('음성이 없습니다.');
          }
        }} />
        </div>
				{description && (
					<Typography variant="p" size="sm" className="text-gray-500">
						{description}
					</Typography>
				)}
			</div>
			<WritingCanvas
				width={width}
				height={height}
				className="bg-white"
				onSave={onSave}
				initialImage={initialImage}
				guideText={guideText}
			/>
		</div>
	);
} 