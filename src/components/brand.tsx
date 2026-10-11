import { motion } from "motion/react";
import { logos } from "../content/assets";
import { Asset } from "./Asset";
import { ChainPilotMark } from "./ChainPilotMark";

/**
 * The three rounded strokes of the AmaliTech "E", used as the layout's
 * design element (Styleguide 04). Never orange. On dark blue: light blue
 * at 20%. On white: charcoal at 5%.
 */
export function EStrokes({
	tone = "dark",
	className = "",
	drift = false,
	size = 900,
}: {
	tone?: "dark" | "light";
	className?: string;
	drift?: boolean;
	size?: number;
}) {
	const color = tone === "dark" ? "bg-sky/20" : "bg-charcoal/5";
	const bar = size * 0.72;
	const thick = size * 0.085;
	return (
		<div
			aria-hidden="true"
			className={`pointer-events-none absolute ${className}`}
			style={{ width: size, height: size, rotate: "-45deg" }}
		>
			{[0, 1, 2].map((i) => (
				<motion.div
					key={i}
					className={`absolute left-0 rounded-full ${color}`}
					style={{ width: bar, height: thick, top: size * (0.18 + i * 0.27) }}
					initial={{ x: -size * 0.3, opacity: 0 }}
					animate={
						drift
							? { x: [0, size * 0.06, 0], opacity: 1 }
							: { x: 0, opacity: 1 }
					}
					transition={
						drift
							? {
									x: { duration: 14 + i * 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
									opacity: { duration: 1.2 },
								}
							: { duration: 1.1, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }
					}
				/>
			))}
		</div>
	);
}

export function ChainPilotLogo({
	size = 56,
	tone = "dark",
	className = "",
}: {
	size?: number;
	tone?: "dark" | "light";
	className?: string;
}) {
	const text = tone === "dark" ? "text-white" : "text-navy";
	return (
		<div className={`flex items-center ${text} ${className}`} style={{ gap: size * 0.28 }}>
			<ChainPilotMark className="shrink-0" size={size * 1.05} />
			<span
				className="font-display font-semibold tracking-tight"
				style={{ fontSize: size, lineHeight: 1 }}
			>
				ChainPilot
			</span>
		</div>
	);
}

/** The official AmaliTech logo, sized by its visible height (not the file's padding). */
export function AmaliTechLogo({
	tone = "dark",
	height = 30,
	className = "",
}: {
	tone?: "dark" | "light";
	/** Height of the visible letters, in stage px. */
	height?: number;
	className?: string;
}) {
	const logo = tone === "dark" ? logos.amalitechOnDark : logos.amalitechOnLight;
	return (
		<Asset
			asset={logo}
			className={`w-auto ${className}`}
			style={{ height: height * logo.padRatio }}
		/>
	);
}
