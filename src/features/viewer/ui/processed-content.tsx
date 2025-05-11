import type { ProcessedContentBlock } from '../model/types';
import { textToSpeech } from '../lib/text-to-speech';
import { Typography } from '@/shared/ui';
import { Volume2 } from 'lucide-react';
import type React from 'react';

interface ProcessedContentProps {
	blocks: ProcessedContentBlock[];
	fontSize: number;
	fontFamily: string;
	lineSpacing: number;
}

export const ProcessedContent: React.FC<ProcessedContentProps> = ({
	blocks,
	fontSize,
	fontFamily,
	lineSpacing,
}) => {
	const handleSpeak = (text: string) => {
		textToSpeech.speak(text);
	};

	return (
		<>
			{blocks.map((block, index) => {
				const key = block.id || `block-${index}`;
				switch (block.type) {
					case 'heading':
						return (
							<div key={key} className="mb-4 group relative">
								<Typography
									variant={
										block.level === 1 ? 'h3' : block.level === 2 ? 'h4' : 'h4'
									}
									className="font-bold"
									style={{
										fontFamily,
										fontSize: `${fontSize + (4 - (block.level || 3)) * 2}px`,
										lineHeight: `${lineSpacing}`,
									}}
								>
									{block.text || block.content}
								</Typography>
								<button
									type="button"
									onClick={() => handleSpeak(block.text || block.content || '')}
									className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center"
								>
									<Volume2 className="w-4 h-4" />
								</button>
							</div>
						);
					case 'paragraph':
						return (
							<div key={key} className="mb-4 group relative">
								<Typography
									variant="p"
									className="text-justify"
									style={{
										fontFamily,
										fontSize: `${fontSize}px`,
										lineHeight: `${lineSpacing}`,
									}}
								>
									{block.text || block.content}
								</Typography>
								<button
									type="button"
									onClick={() => handleSpeak(block.text || block.content || '')}
									className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center"
								>
									<Volume2 className="w-4 h-4" />
								</button>
							</div>
						);
					case 'image': {
						const imageUrl = block.url || block.src || '';
						return (
							<figure key={key} className="mb-4">
								<img
									src={imageUrl}
									alt={block.alt || '이미지'}
									className="rounded-md max-w-full h-auto"
								/>
								{block.caption && (
									<figcaption
										className="text-center text-sm mt-2 text-gray-600"
										style={{ fontFamily }}
									>
										{block.caption}
									</figcaption>
								)}
							</figure>
						);
					}
					case 'list':
						return (
							<div key={key} className="mb-4">
								{block.ordered ? (
									<ol
										className="list-decimal pl-8"
										style={{
											fontFamily,
											fontSize: `${fontSize}px`,
											lineHeight: `${lineSpacing}`,
										}}
									>
										{(block.items || []).map((item, itemIndex) => (
											<li
												key={item + itemIndex}
												className="mb-1 group relative"
											>
												{item}
												<button
													type="button"
													onClick={() => handleSpeak(item)}
													className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center"
												>
													<Volume2 className="w-4 h-4" />
												</button>
											</li>
										))}
									</ol>
								) : (
									<ul
										className="list-disc pl-8"
										style={{
											fontFamily,
											fontSize: `${fontSize}px`,
											lineHeight: `${lineSpacing}`,
										}}
									>
										{(block.items || []).map((item, itemIndex) => (
											<li
												key={item + itemIndex}
												className="mb-1 group relative"
											>
												{item}
												<button
													type="button"
													onClick={() => handleSpeak(item)}
													className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center"
												>
													<Volume2 className="w-4 h-4" />
												</button>
											</li>
										))}
									</ul>
								)}
							</div>
						);
					case 'table':
						return (
							<div key={key} className="mb-4 overflow-x-auto">
								<table
									className="min-w-full border-collapse border border-gray-300 rounded"
									style={{ fontFamily, fontSize: `${fontSize}px` }}
								>
									{block.headers && (
										<thead>
											<tr>
												{block.headers.map((header, headerIndex) => (
													<th
														key={header + headerIndex}
														className="border border-gray-300 px-4 py-2 bg-gray-100"
													>
														{header}
													</th>
												))}
											</tr>
										</thead>
									)}
									<tbody>
										{(block.rows || []).map((row, rowIndex) => (
											<tr key={row.join('-') + rowIndex}>
												{row.map((cell, cellIndex) => (
													<td
														key={cell + cellIndex}
														className="border border-gray-300 px-4 py-2"
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
					default:
						if (block.text || block.content) {
							return (
								<div key={key} className="mb-4">
									<Typography
										variant="p"
										style={{
											fontFamily,
											fontSize: `${fontSize}px`,
											lineHeight: `${lineSpacing}`,
										}}
									>
										{block.text || block.content}
									</Typography>
								</div>
							);
						}
						return null;
				}
			})}
		</>
	);
};
