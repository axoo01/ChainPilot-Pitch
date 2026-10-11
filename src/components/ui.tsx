import { motion } from "motion/react";
import type { ReactNode } from "react";
import { AmaliTechLogo, EStrokes } from "./brand";

export const easeBrand = [0.22, 1, 0.36, 1] as const;

export type Tone = "dark" | "light";

/** Fades/slides in when `show` turns true, and back out when stepping back. */
export function Reveal({
	show,
	children,
	className = "",
	delay = 0,
	y = 28,
	x = 0,
}: {
	show: boolean;
	children: ReactNode;
	className?: string;
	delay?: number;
	y?: number;
	x?: number;
}) {
	return (
		<motion.div
			className={className}
			initial={false}
			animate={show ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
			transition={{ duration: 0.6, delay: show ? delay : 0, ease: easeBrand }}
		>
			{children}
		</motion.div>
	);
}

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: Tone }) {
	return (
		<div
			className={`flex items-center gap-4 font-display text-[26px] font-medium uppercase tracking-[0.18em] ${
				tone === "dark" ? "text-sky" : "text-navy/60"
			}`}
		>
			<span className="h-[6px] w-12 rounded-full bg-orange" />
			{children}
		</div>
	);
}

/** Common slide chrome: padding, design element, AmaliTech badge, page number. */
export function SlideShell({
	tone,
	label,
	children,
	strokes = "right",
	badge = true,
}: {
	tone: Tone;
	label: string;
	children: ReactNode;
	strokes?: "right" | "left" | "none";
	badge?: boolean;
}) {
	return (
		<div className={`absolute inset-0 ${tone === "dark" ? "text-white" : "text-navy"}`}>
			{strokes !== "none" && (
				<EStrokes
					tone={tone}
					size={1100}
					className={strokes === "right" ? "-right-[260px] -top-[120px]" : "-left-[380px] -bottom-[300px]"}
				/>
			)}
			{badge && <AmaliTechLogo tone={tone} className="absolute right-[72px] top-[56px]" />}
			<div className="absolute inset-0 px-[140px] pb-[110px] pt-[90px]">{children}</div>
			<div
				className={`absolute bottom-[52px] right-[64px] font-display text-[26px] font-semibold ${
					tone === "dark" ? "text-white/70" : "text-navy/50"
				}`}
			>
				{label}
			</div>
		</div>
	);
}

/**
 * Icon animation settings: tune them here.
 *   flip: card-style half turn (Problem, Inside, Value, Use cases)
 *   turn: spins in place with a small pop (How it connects)
 * degrees = how far it turns, duration = seconds, pop = size at the midpoint.
 */
export const iconMotion = {
	flip: { degrees: 180, duration: 1.2 },
	turn: { degrees: 360, duration: 0.8, pop: 1.18 },
};

/** Icon in a soft rounded tile. */
export function IconTile({
	children,
	tone = "dark",
	active = true,
	spin = false,
	spinStyle = "flip",
	size = 96,
}: {
	children: ReactNode;
	tone?: Tone;
	active?: boolean;
	/** Turns true when this item becomes the current one: the icon animates once. */
	spin?: boolean;
	/** Which animation `spin` plays (see iconMotion). */
	spinStyle?: keyof typeof iconMotion;
	size?: number;
}) {
	const look =
		tone === "dark"
			? active
				? "bg-navy-raised text-sky"
				: "bg-navy-soft text-white/30"
			: active
				? "bg-navy text-white"
				: "bg-navy/5 text-navy/30";
	return (
		<div
			className={`flex shrink-0 items-center justify-center rounded-[28%] transition-colors duration-500 ${look}`}
			style={{ width: size, height: size, perspective: size * 5 }}
		>
			{/* Two faces carry the icon, so a half-turn flip still lands the right way round. */}
			<motion.span
				className="relative grid place-items-center"
				style={{ transformStyle: "preserve-3d" }}
				initial={false}
				animate={
					!spin
						? { rotateY: 0, rotate: 0, scale: 1, transition: { duration: 0 } }
						: spinStyle === "turn"
							? {
									rotate: iconMotion.turn.degrees,
									scale: [1, iconMotion.turn.pop, 1],
									transition: { duration: iconMotion.turn.duration, ease: easeBrand },
								}
							: {
									rotateY: iconMotion.flip.degrees,
									transition: { duration: iconMotion.flip.duration, ease: easeBrand },
								}
				}
			>
				<span className="col-start-1 row-start-1 flex [backface-visibility:hidden]">{children}</span>
				<span
					className="col-start-1 row-start-1 flex [backface-visibility:hidden]"
					style={{ transform: "rotateY(180deg)" }}
					aria-hidden="true"
				>
					{children}
				</span>
			</motion.span>
		</div>
	);
}
