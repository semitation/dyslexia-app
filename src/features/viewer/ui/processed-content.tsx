import type { Block } from '../model/types';
import { parseBlocks } from '../lib/parse-blocks';
import { useBlockSpeech } from '../lib/use-block-speech';
import { Typography } from '@/shared/ui';
import { Volume2 } from 'lucide-react';
import type React from 'react';

interface ProcessedContentProps {
	blocks: Block[];
	fontSize: number;
	fontFamily: string;
	lineSpacing: number;
	documentId: number;
	pageNumber: number;
}

export const ProcessedContent: React.FC<ProcessedContentProps> = ({
	blocks,
	fontSize,
	fontFamily,
	lineSpacing,
	documentId,
	pageNumber,
}) => {
	const { activeBlockId, speak } = useBlockSpeech();
	console.log("processed content", { blocks, activeBlockId });

	const handleBlockClick = (block: Block) => {
		console.log({ block })
		if ('text' in block && block.text) {
			speak(block.id, block.text);
		}
	};

	return (
		<>
			{parseBlocks(blocks, {
				fontSize,
				fontFamily,
				lineSpacing,
				onBlockClick: handleBlockClick,
				activeBlockId,
				documentId,
				pageNumber,
			})}
		</>
	);
};
