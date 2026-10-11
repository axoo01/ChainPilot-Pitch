import { ImageOff } from "lucide-react";
import { type CSSProperties, useState } from "react";
import type { AssetDef } from "../content/assets";

interface Props {
	asset: AssetDef;
	className?: string;
	/** Placeholder look: "badge" for logos, "screen" for screenshots. */
	variant?: "badge" | "screen";
	tone?: "dark" | "light";
	style?: CSSProperties;
}

/** Shows the real file if it exists in public/assets, else a labelled placeholder. */
export function Asset({ asset, className = "", variant = "badge", tone = "dark", style }: Props) {
	const [failed, setFailed] = useState(false);

	if (!failed) {
		return (
			<img
				src={asset.src}
				alt={asset.label}
				className={className}
				style={style}
				draggable={false}
				onError={() => setFailed(true)}
			/>
		);
	}

	const border = tone === "dark" ? "border-white/40 text-white/80" : "border-navy/30 text-navy/70";
	return (
		<div
			className={`flex items-center justify-center gap-3 rounded-2xl border-2 border-dashed ${border} ${className}`}
			role="img"
			aria-label={`${asset.label} (placeholder)`}
		>
			{variant === "screen" ? (
				<div className="flex flex-col items-center gap-4 text-center">
					<ImageOff className="size-16 opacity-60" />
					<p className="font-display text-4xl">{asset.label}</p>
					<p className="font-mono text-2xl opacity-60">public/{asset.src}</p>
				</div>
			) : (
				<span className="px-4 text-center font-display text-[0.9em] leading-tight">
					{asset.label}
				</span>
			)}
		</div>
	);
}
