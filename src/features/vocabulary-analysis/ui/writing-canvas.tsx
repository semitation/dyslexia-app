import type React from 'react';
import { useRef, useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Eraser } from 'lucide-react';

interface WritingCanvasProps {
	height?: number;
	onSave?: (pngData: string) => void;
}

export function WritingCanvas({ height = 300, onSave }: WritingCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const contextRef = useRef<CanvasRenderingContext2D | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [containerWidth, setContainerWidth] = useState(0);
	const lastPointRef = useRef<{
		x: number;
		y: number;
		pressure: number;
	} | null>(null);
	const pointsRef = useRef<{ x: number; y: number; pressure: number }[]>([]);

	useEffect(() => {
		const updateCanvasSize = () => {
			const container = containerRef.current;
			if (!container) return;
			setContainerWidth(container.clientWidth);
		};

		updateCanvasSize();
		const resizeObserver = new ResizeObserver(updateCanvasSize);
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => resizeObserver.disconnect();
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || containerWidth === 0) return;

		const scale = window.devicePixelRatio;
		canvas.width = containerWidth * scale;
		canvas.height = height * scale;
		canvas.style.width = `${containerWidth}px`;
		canvas.style.height = `${height}px`;

		const context = canvas.getContext('2d');
		if (!context) return;

		context.scale(scale, scale);
		context.lineCap = 'round';
		context.lineJoin = 'round';
		context.strokeStyle = '#000000';
		context.shadowColor = '#000000';
		context.shadowBlur = 1;
		context.fillStyle = '#FFFFFF';
		context.fillRect(0, 0, containerWidth, height);

		contextRef.current = context;
	}, [containerWidth, height]);

	const getStrokeWidth = (pressure: number) => {
		// 기본 굵기를 2로 하고, 압력에 따라 1.5~4 사이의 값을 반환
		const minWidth = 1.5;
		const maxWidth = 4;
		return minWidth + (maxWidth - minWidth) * pressure;
	};

	const drawPoints = (points: { x: number; y: number; pressure: number }[]) => {
		const context = contextRef.current;
		if (!context || points.length < 2) return;

		context.beginPath();
		context.moveTo(points[0].x, points[0].y);

		// Catmull-Rom 스플라인을 사용하여 부드러운 곡선 그리기
		for (let i = 1; i < points.length - 2; i++) {
			const c = (points[i].x + points[i + 1].x) / 2;
			const d = (points[i].y + points[i + 1].y) / 2;
			const pressure = (points[i].pressure + points[i + 1].pressure) / 2;

			context.lineWidth = getStrokeWidth(pressure);
			context.quadraticCurveTo(points[i].x, points[i].y, c, d);
		}

		// 마지막 두 점 처리
		if (points.length > 2) {
			const lastPoint = points[points.length - 1];
			const preLastPoint = points[points.length - 2];
			context.lineWidth = getStrokeWidth(lastPoint.pressure);
			context.quadraticCurveTo(
				preLastPoint.x,
				preLastPoint.y,
				lastPoint.x,
				lastPoint.y,
			);
		}

		context.stroke();
	};

	const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
		const canvas = canvasRef.current;
		if (!canvas || !contextRef.current) return;

		setIsDrawing(true);
		const point = getEventPoint(e, canvas);
		lastPointRef.current = point;
		pointsRef.current = [point];
	};

	const draw = (e: React.MouseEvent | React.TouchEvent) => {
		if (!isDrawing || !contextRef.current || !lastPointRef.current) return;
		e.preventDefault();

		const canvas = canvasRef.current;
		if (!canvas) return;

		const point = getEventPoint(e, canvas);
		pointsRef.current.push(point);

		// 부드러운 곡선을 위해 최근 4개의 점만 사용
		if (pointsRef.current.length > 4) {
			drawPoints(pointsRef.current.slice(-4));
			pointsRef.current = pointsRef.current.slice(-3);
		}

		lastPointRef.current = point;
	};

	const stopDrawing = () => {
		if (!contextRef.current) return;

		if (pointsRef.current.length >= 2) {
			drawPoints(pointsRef.current);
		}

		setIsDrawing(false);
		lastPointRef.current = null;
		pointsRef.current = [];

		if (onSave && canvasRef.current) {
			const pngData = canvasRef.current.toDataURL('image/png');
			onSave(pngData);
		}
	};

	const getEventPoint = (
		e: React.MouseEvent | React.TouchEvent,
		canvas: HTMLCanvasElement,
	) => {
		const rect = canvas.getBoundingClientRect();
		let clientX: number,
			clientY: number,
			pressure = 0.5;

		if ('touches' in e) {
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
			// Touch API에서 압력 정보 가져오기
			pressure = (e.touches[0] as any).force || 0.5;
		} else {
			clientX = e.clientX;
			clientY = e.clientY;
			// 마우스의 경우 기본 압력값 사용
			pressure = 0.5;
		}

		return {
			x: clientX - rect.left,
			y: clientY - rect.top,
			pressure,
		};
	};

	const clearCanvas = () => {
		const context = contextRef.current;
		const canvas = canvasRef.current;
		if (!context || !canvas) return;

		context.fillStyle = '#FFFFFF';
		context.fillRect(0, 0, canvas.width, canvas.height);

		if (onSave) {
			const pngData = canvas.toDataURL('image/png');
			onSave(pngData);
		}
	};

	return (
		<div className="flex flex-col gap-4" ref={containerRef}>
			<div className="relative rounded-lg border border-gray-200 bg-white shadow-sm w-full">
				<canvas
					ref={canvasRef}
					onMouseDown={startDrawing}
					onMouseMove={draw}
					onMouseUp={stopDrawing}
					onMouseLeave={stopDrawing}
					onTouchStart={startDrawing}
					onTouchMove={draw}
					onTouchEnd={stopDrawing}
					className="touch-none w-full"
					style={{
						height: `${height}px`,
					}}
				/>
			</div>
			<Button
				variant="outline"
				size="sm"
				onClick={clearCanvas}
				className="w-fit"
			>
				<Eraser className="mr-2 h-4 w-4" />
				다시 쓰기
			</Button>
		</div>
	);
}
