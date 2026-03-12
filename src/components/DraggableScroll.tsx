import { useRef, useState, useCallback, type ReactNode } from "react";

interface DraggableScrollProps {
	children: ReactNode;
	className?: string;
}

export function DraggableScroll({ children, className = "" }: DraggableScrollProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const startXRef = useRef(0);
	const scrollLeftRef = useRef(0);
	const hasMovedRef = useRef(false);

	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		const container = containerRef.current;
		if (!container) return;

		setIsDragging(true);
		hasMovedRef.current = false;
		startXRef.current = e.pageX - container.offsetLeft;
		scrollLeftRef.current = container.scrollLeft;
	}, []);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	const handleMouseMove = useCallback((e: React.MouseEvent) => {
		if (!isDragging) return;
		e.preventDefault();

		const container = containerRef.current;
		if (!container) return;

		const x = e.pageX - container.offsetLeft;
		if (Math.abs(x - startXRef.current) > 5) {
			hasMovedRef.current = true;
		}
		const walk = x - startXRef.current;
		container.scrollLeft = scrollLeftRef.current - walk;
	}, [isDragging]);

	const handleMouseLeave = useCallback(() => {
		setIsDragging(false);
	}, []);

	// Prevent click navigation when user was dragging
	const handleClick = useCallback((e: React.MouseEvent) => {
		if (hasMovedRef.current) {
			e.preventDefault();
			e.stopPropagation();
		}
	}, []);

	// Prevent native drag ghost image (the link/image preview)
	const handleDragStart = useCallback((e: React.DragEvent) => {
		e.preventDefault();
	}, []);

	return (
		<div
			ref={containerRef}
			className={`flex gap-6 overflow-x-auto scrollbar-hide ${isDragging ? "cursor-grabbing" : "cursor-grab"} select-none ${className}`}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onClickCapture={handleClick}
			onDragStart={handleDragStart}
			style={{
				scrollBehavior: isDragging ? "auto" : "smooth",
				WebkitOverflowScrolling: "touch",
			}}
		>
			{children}
		</div>
	);
}
