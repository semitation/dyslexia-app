import type { ReactNode } from 'react';
import type { Block } from '../model/types';

export function parseBlocks(
	blocks: Block[],
	options?: {
		fontSize?: number;
		fontFamily?: string;
		lineSpacing?: number;
		onSpeak?: (text: string) => void;
	},
): ReactNode[] {
	if (!blocks) return [];
	const {
		fontSize = 16,
		fontFamily = 'Noto Sans KR',
		lineSpacing = 1.5,
		onSpeak,
	} = options || {};

	return blocks.map((block, i) => {
		const key = block.id ? String(block.id) : `${i}`;
		switch (block.type) {
			case 'TEXT':
				return (
					<p
						key={key}
						style={{ fontFamily, fontSize, lineHeight: lineSpacing }}
					>
						{block.text}
					</p>
				);
			case 'HEADING1':
				return (
					<h2
						key={key}
						style={{
							fontFamily,
							fontSize: fontSize + 8,
							lineHeight: lineSpacing,
						}}
						className="font-bold mb-2"
					>
						{block.text}
					</h2>
				);
			case 'HEADING2':
				return (
					<h3
						key={key}
						style={{
							fontFamily,
							fontSize: fontSize + 4,
							lineHeight: lineSpacing,
						}}
						className="font-bold mb-2"
					>
						{block.text}
					</h3>
				);
			case 'HEADING3':
				return (
					<h4
						key={key}
						style={{
							fontFamily,
							fontSize: fontSize + 2,
							lineHeight: lineSpacing,
						}}
						className="font-bold mb-2"
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
						style={{ fontFamily, fontSize, lineHeight: lineSpacing }}
					>
						{block.items.map((item, idx) => (
							<li
								key={block.id ? `${block.id}-item-${idx}` : `${i}-item-${idx}`}
								className="mb-1 group relative"
							>
								{item}
								{onSpeak && (
									<button
										type="button"
										onClick={() => onSpeak(item)}
										className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center"
									>
										<span role="img" aria-label="speak">
											🔊
										</span>
									</button>
								)}
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
							style={{ fontFamily, fontSize, lineHeight: lineSpacing }}
						>
							<thead>
								<tr>
									{block.headers.map((header, idx) => (
										<th
											key={
												block.id
													? `${block.id}-header-${idx}`
													: `${i}-header-${idx}`
											}
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
										key={
											block.id
												? `${block.id}-row-${rowIdx}`
												: `${i}-row-${rowIdx}`
										}
									>
										{row.map((cell, cellIdx) => (
											<td
												key={
													block.id
														? `${block.id}-cell-${rowIdx}-${cellIdx}`
														: `${i}-cell-${rowIdx}-${cellIdx}`
												}
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
				return null;
		}
	});
}
