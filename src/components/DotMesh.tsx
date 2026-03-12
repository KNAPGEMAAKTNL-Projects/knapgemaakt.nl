import { useEffect, useRef } from "react";

/**
 * Animated dot mesh background with cursor-reveal effect.
 * A uniform grid of dots that undulate via compound sine waves.
 * Dots are invisible by default and glow near the cursor.
 *
 * Props:
 * - dotColor: RGB string like "20, 184, 166" (default: teal/accent)
 * - maxOpacity: peak opacity near cursor (default: 0.3)
 *
 * Features:
 * - Pauses when offscreen (IntersectionObserver)
 * - Respects prefers-reduced-motion
 * - Works through overlapping text/buttons (document-level tracking)
 */

interface DotMeshProps {
	dotColor?: string;
	maxOpacity?: number;
}

export function DotMesh({
	dotColor = "20, 184, 166",
	maxOpacity = 0.5,
}: DotMeshProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animId = 0;
		let time = 0;
		let w = 0;
		let h = 0;
		let visible = true;
		let mouseX = -1;
		let mouseY = -1;

		const SPACING = 28;
		const BASE_RADIUS = 1.2;

		function resize() {
			const dpr = Math.min(window.devicePixelRatio, 2);
			const rect = canvas!.getBoundingClientRect();
			w = rect.width;
			h = rect.height;
			canvas!.width = w * dpr;
			canvas!.height = h * dpr;
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
		}

		resize();

		function draw() {
			if (!visible && !reducedMotion) {
				animId = requestAnimationFrame(draw);
				return;
			}

			ctx!.clearRect(0, 0, w, h);

			const cols = Math.ceil(w / SPACING) + 1;
			const rows = Math.ceil(h / SPACING) + 1;

			for (let row = 0; row < rows; row++) {
				for (let col = 0; col < cols; col++) {
					const baseX = col * SPACING;
					const baseY = row * SPACING;

					const displacement =
						Math.sin(baseX * 0.015 + baseY * 0.01 + time * 0.003) * 6 +
						Math.sin(baseX * 0.008 - baseY * 0.012 + time * 0.002) * 4 +
						Math.cos(baseX * 0.012 + baseY * 0.008 + time * 0.0025) * 3;

					const x = baseX;
					const y = baseY + displacement;

					const sizeFactor = 1 + displacement * 0.02;
					let radius = BASE_RADIUS * Math.max(0.5, sizeFactor);
					let opacity = 0;

					if (mouseX >= 0) {
						const dx = x - mouseX;
						const dy = y - mouseY;
						const dist = Math.sqrt(dx * dx + dy * dy);
						const influence = Math.max(0, 1 - dist / 250);
						opacity = influence * maxOpacity;
						radius += influence * 1.8;
					}

					if (opacity > 0.005) {
						ctx!.beginPath();
						ctx!.arc(x, y, radius, 0, Math.PI * 2);
						ctx!.fillStyle = `rgba(${dotColor}, ${opacity})`;
						ctx!.fill();
					}
				}
			}

			time++;

			if (!reducedMotion) {
				animId = requestAnimationFrame(draw);
			}
		}

		function onMouse(e: MouseEvent) {
			const rect = canvas!.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			if (x >= 0 && x <= w && y >= 0 && y <= h) {
				mouseX = x;
				mouseY = y;
			} else {
				mouseX = -1;
				mouseY = -1;
			}
		}

		function onMouseLeave() {
			mouseX = -1;
			mouseY = -1;
		}

		document.addEventListener("mousemove", onMouse);
		document.addEventListener("mouseleave", onMouseLeave);

		const io = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
		});
		io.observe(canvas);

		const ro = new ResizeObserver(resize);
		ro.observe(canvas);

		draw();

		return () => {
			cancelAnimationFrame(animId);
			document.removeEventListener("mousemove", onMouse);
			document.removeEventListener("mouseleave", onMouseLeave);
			io.disconnect();
			ro.disconnect();
		};
	}, [dotColor, maxOpacity]);

	return (
		<canvas
			ref={canvasRef}
			className="absolute inset-0 w-full h-full z-0"
			aria-hidden="true"
		/>
	);
}
