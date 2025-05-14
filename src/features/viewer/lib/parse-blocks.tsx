import type { ReactNode } from 'react';
import type { Block } from '../model/types';
import { cn } from '@/lib/utils';
import { LongPressText } from '@/features/vocabulary-analysis';

interface ParseBlocksOptions {
	fontSize?: number;
	fontFamily?: string;
	lineSpacing?: number;
	onBlockClick?: (block: Block) => void;
	activeBlockId?: string | null;
	documentId: number;
	pageNumber: number;
}

export function parseBlocks(
	blocks: Block[],
	options: ParseBlocksOptions,
): ReactNode[] {
	if (!blocks) return [];
	const {
		fontSize = 16,
		fontFamily = 'Noto Sans KR',
		lineSpacing = 1.5,
		onBlockClick,
		activeBlockId,
		documentId,
		pageNumber,
	} = options;

	return blocks.map((block, i) => {
		const key = block.id ? String(block.id) : `${i}`;
		const isActive = activeBlockId === block.id;
		const baseStyle = {
			fontFamily,
			fontSize,
			lineHeight: lineSpacing,
			background: isActive ? '#fffbe6' : undefined,
			transition: 'background 0.2s',
			cursor: onBlockClick ? 'pointer' : undefined,
		};

		switch (block.type) {
			case 'TEXT':
				return (
					<div
						key={key}
						style={baseStyle}
						className={cn(
							'cursor-pointer',
							block.blank && 'mb-4',
						)}
					>
						<LongPressText
							text={block.text}
							documentId={documentId}
							pageNumber={pageNumber}
							blockId={block.id}
						/>
					</div>
				);
			case 'HEADING1':
				return (
					<h2
						key={key}
						style={{ ...baseStyle, fontSize: fontSize + 8 }}
						className="font-bold mb-2"
						onClick={onBlockClick ? () => onBlockClick(block) : undefined}
						onKeyDown={onBlockClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onBlockClick(block) } : undefined}
						tabIndex={onBlockClick ? 0 : undefined}
					>
						{block.text}
					</h2>
				);
			case 'HEADING2':
				return (
					<h3
						key={key}
						style={{ ...baseStyle, fontSize: fontSize + 4 }}
						className="font-bold mb-2"
						onClick={onBlockClick ? () => onBlockClick(block) : undefined}
						onKeyDown={onBlockClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onBlockClick(block) } : undefined}
						tabIndex={onBlockClick ? 0 : undefined}
					>
						{block.text}
					</h3>
				);
			case 'HEADING3':
				return (
					<h4
						key={key}
						style={{ ...baseStyle, fontSize: fontSize + 2 }}
						className="font-bold mb-2"
						onClick={onBlockClick ? () => onBlockClick(block) : undefined}
						onKeyDown={onBlockClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onBlockClick(block) } : undefined}
						tabIndex={onBlockClick ? 0 : undefined}
					>
						{block.text}
					</h4>
				);
			case 'LIST':
			case 'DOTTED':
				return (
					<ul
						key={key}
						className="list-disc pl-8 mb-4"
						style={baseStyle}
					>
						{block.items.map((item, idx) => (
							<li
								key={block.id ? `${block.id}-item-${idx}` : `${i}-item-${idx}`}
								className="mb-1 group relative"
								onClick={onBlockClick ? () => onBlockClick(block) : undefined}
								onKeyDown={onBlockClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onBlockClick(block) } : undefined}
								tabIndex={onBlockClick ? 0 : undefined}
								style={isActive ? { background: '#fffbe6' } : undefined}
							>
								{item}
							</li>
						))}
					</ul>
				);
			case 'IMAGE':
				return (
					<figure key={key} className="mb-4">
						<img
							src={block.url}
							alt={block.alt}
							className="rounded-md max-w-full h-auto"
							style={{ width: block.width, height: block.height }}
						/>
					</figure>
				);
			case 'TABLE':
				return (
					<div key={key} className="overflow-x-auto mb-4">
						<table
							className="min-w-full border text-sm"
							style={baseStyle}
						>
							<thead>
								<tr>
									{block.headers.map((header, idx) => (
										<th
											key={block.id ? `${block.id}-header-${idx}` : `${i}-header-${idx}`}
											className="border px-2 py-1 bg-gray-100"
										>
											{header}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{block.rows.map((row, rowIdx) => (
									<tr
										key={block.id ? `${block.id}-row-${rowIdx}` : `${i}-row-${rowIdx}`}
									>
										{row.map((cell, cellIdx) => (
											<td
												key={block.id ? `${block.id}-cell-${rowIdx}-${cellIdx}` : `${i}-cell-${rowIdx}-${cellIdx}`}
												className="border px-2 py-1"
											>
												{cell}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				);
			// PAGE_TIP, PAGE_IMAGE는 뷰어에서 별도 처리
			default:
				console.log('switch default', block.type, block);
				return null;
		}
	});
}
