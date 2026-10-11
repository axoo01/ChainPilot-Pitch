import { type ReactNode, useLayoutEffect, useRef, useState } from "react";

export const STAGE_W = 1920;
export const STAGE_H = 1080;

/**
 * A fixed 1920×1080 canvas scaled to fit its parent (letterboxed, never
 * stretched). Everything is designed in stage pixels, so the deck looks the
 * same on the TV, the laptop, and the small previews in the speaker view.
 */
export function Stage({ children, className = "" }: { children: ReactNode; className?: string }) {
	const host = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(0);

	useLayoutEffect(() => {
		const el = host.current;
		if (!el) return;
		const measure = () =>
			setScale(Math.min(el.clientWidth / STAGE_W, el.clientHeight / STAGE_H));
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	return (
		<div ref={host} className={`relative h-full w-full overflow-hidden ${className}`}>
			<div
				className="absolute left-1/2 top-1/2 overflow-hidden"
				style={{
					width: STAGE_W,
					height: STAGE_H,
					transform: `translate(-50%, -50%) scale(${scale})`,
					visibility: scale ? "visible" : "hidden",
				}}
			>
				{children}
			</div>
		</div>
	);
}
