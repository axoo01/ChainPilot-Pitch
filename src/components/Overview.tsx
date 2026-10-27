import { ArrowRight, Layers } from "lucide-react";
import { motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import {
	type Face,
	type OverviewTile,
	ROTATE_SECONDS,
	LAYER_SECONDS,
	type LayerTone,
	hero,
	sectors,
	techLayers,
	tiles,
} from "../content/overview";
import { AmaliTechLogo, ChainPilotLogo, EStrokes } from "./brand";
import { IconTile, easeBrand, layerTone } from "./ui";

/**
 * The overview page on the 1920×1080 stage: a bento grid of everything
 * ChainPilot does. One tile is highlighted at a time; T flips every tile to
 * its tech face. Highlight state comes from the synced deck state.
 */

export interface OverviewProps {
	tile: number;
	tech: boolean;
	playing: boolean;
	/** Mouse-hovered tile (audience window only); holds the highlight. */
	hovered?: number | null;
	onHover?: (tile: number | null) => void;
	onPick?: (tile: number) => void;
	/** Business/Tech switch clicked (audience window only). */
	onSetTech?: (tech: boolean) => void;
}

/** Grid placement for each tile id (6 columns × 4 rows). */
const place: Record<string, string> = {
	sectors: "col-span-2 row-start-1",
	inventory: "col-span-2 row-start-2",
	production: "col-span-2 row-start-2",
	sales: "col-span-2 row-start-2",
	procurement: "col-span-2 row-start-3",
	console: "col-span-2 row-start-3",
	why: "col-span-2 row-start-3",
};

/** Two faces back to back; `tech` turns the card over. */
function FlipCard({
	tech,
	delay,
	front,
	back,
}: {
	tech: boolean;
	delay: number;
	front: ReactNode;
	back: ReactNode;
}) {
	const face = "absolute inset-0 rounded-[32px] [backface-visibility:hidden]";
	return (
		<div className="relative h-full w-full" style={{ perspective: 2000 }}>
			<motion.div
				className="relative h-full w-full"
				style={{ transformStyle: "preserve-3d" }}
				initial={false}
				animate={{ rotateY: tech ? 180 : 0 }}
				transition={{ duration: 0.9, delay, ease: easeBrand }}
			>
				<div className={`${face} bg-white/[0.06]`}>{front}</div>
				<div className={`${face} bg-sky/[0.10]`} style={{ transform: "rotateY(180deg)" }}>
					{back}
				</div>
			</motion.div>
		</div>
	);
}

function TileFace({
	face,
	tile,
	focused,
	compact,
}: {
	face: Face;
	tile: OverviewTile;
	focused: boolean;
	compact: boolean;
}) {
	const { Icon } = tile;
	const isSectors = tile.id === "sectors";
	return (
		<div className="flex h-full flex-col p-7">
			<div className="flex items-center gap-5">
				<IconTile size={compact ? 52 : 58} spin={focused} spinStyle="turn">
					<Icon className={compact ? "size-7" : "size-8"} strokeWidth={1.75} />
				</IconTile>
				<div className="min-w-0">
					<h3 className={compact ? "text-[28px]" : "text-[30px]"}>{face.title}</h3>
					<p className="mt-1 text-[19px] leading-snug text-sky">{face.tagline}</p>
				</div>
			</div>
			{isSectors && (
				<div className="mt-4 grid grid-cols-5">
					{sectors.map(({ Icon: S, label }) => (
						<div key={label} className="flex flex-col items-center gap-2">
							<IconTile size={46}>
								<S className="size-6" strokeWidth={1.75} />
							</IconTile>
							<span className="text-[15px] text-white/70">{label}</span>
						</div>
					))}
				</div>
			)}
			<ul
				className={`flex flex-col gap-2 ${isSectors ? "mt-3" : compact ? "mt-4" : "mt-5"}`}
			>
				{face.details.map((d) => (
					<li
						key={d}
						className={`flex gap-3 leading-snug text-white/85 ${compact ? "text-[18px]" : "text-[20px]"}`}
					>
						<span className="mt-[9px] size-[7px] shrink-0 rounded-full bg-orange" />
						{d}
					</li>
				))}
			</ul>
		</div>
	);
}

/** Business flow: neutral chips. */
function PlainFlow({ steps }: { steps: string[] }) {
	return (
		<div className="flex items-center gap-3">
			{steps.map((step, i) => (
				<div key={step} className="flex items-center gap-3">
					{i > 0 && <ArrowRight className="size-5 text-white/40" />}
					<span className="rounded-full bg-white/10 px-5 py-1.5 text-[19px] font-medium">{step}</span>
				</div>
			))}
		</div>
	);
}

/** Tech flow: chips coloured by layer, with a data dot travelling along the line. */
function TechFlow({ steps }: { steps: { label: string; tone: LayerTone }[] }) {
	return (
		<div className="relative flex w-fit items-center gap-8">
			<div className="absolute inset-x-4 top-1/2 h-[2px] -translate-y-1/2 bg-white/15" />
			{/* the track-wide wrapper slides by its own width, carrying the dot (GPU transform, no layout) */}
			<div className="cp-travel pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2">
				<span className="block size-[10px] -translate-x-1/2 rounded-full bg-sun shadow-[0_0_12px_var(--color-sun)]" />
			</div>
			{steps.map(({ label, tone }) => (
				<span
					key={label}
					className={`relative flex items-center gap-2.5 rounded-full border-2 bg-navy-soft px-5 py-1.5 text-[19px] font-medium ${layerTone[tone].chip}`}
				>
					<span className={`size-[9px] rounded-full ${layerTone[tone].dot}`} />
					{label}
				</span>
			))}
		</div>
	);
}

function Hero({ tech, onSetTech }: { tech: boolean; onSetTech?: (tech: boolean) => void }) {
	const face = (headline: string, flow: ReactNode) => (
		<div className="flex h-full flex-col justify-between p-8">
			<h2 className="max-w-[1000px] text-[40px] leading-[1.12]">{headline}</h2>
			{flow}
		</div>
	);
	return (
		<div className="col-span-4 row-start-1 flex flex-col">
			<div className="mb-4 grid grid-cols-[1fr_auto_1fr] items-center">
				<ChainPilotLogo size={38} />
				<div className="flex rounded-full bg-white/10 p-1 text-[17px] font-medium">
					{(["Business", "Tech"] as const).map((v, i) => (
						<button
							key={v}
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								onSetTech?.(i === 1);
							}}
							className={`cursor-pointer rounded-full px-5 py-1.5 transition-colors duration-500 ${
								(i === 1) === tech ? "bg-white text-navy" : "text-white/60 hover:text-white"
							}`}
						>
							{v}
						</button>
					))}
				</div>
				<div className="justify-self-end">
					<AmaliTechLogo height={20} />
				</div>
			</div>
			<div className="min-h-0 flex-1">
				<FlipCard
					tech={tech}
					delay={0}
					front={face(hero.business.headline, <PlainFlow steps={hero.business.flow} />)}
					back={face(hero.tech.headline, <TechFlow steps={hero.tech.flow} />)}
				/>
			</div>
		</div>
	);
}

/**
 * Tech side of the "Built for" tile: cycles through the four stack layers on
 * its own timer (LAYER_SECONDS), as soon as the tech view is on.
 */
function TechLayersFace({ tech, focused }: { tech: boolean; focused: boolean }) {
	const [layer, setLayer] = useState(0);
	// Loops whenever the tech view is on, independent of highlight, hover and pause.
	useEffect(() => {
		setLayer(0);
		if (!tech) return;
		const t = window.setInterval(() => setLayer((n) => (n + 1) % techLayers.length), LAYER_SECONDS * 1000);
		return () => window.clearInterval(t);
	}, [tech]);
	const l = techLayers[layer];
	return (
		<div className="flex h-full flex-col p-7">
			<div key={l.layer} className="cp-fade-in flex-1">
					<div className="flex items-center gap-5">
						<IconTile size={58} spin={focused} spinStyle="turn">
							<Layers className="size-8" strokeWidth={1.75} />
						</IconTile>
						<div>
							<h3 className="text-[30px]">{l.title}</h3>
							<p className={`mt-1 text-[19px] ${layerTone[l.tone].text}`}>{l.tagline}</p>
						</div>
					</div>
					<div className="mt-5 flex flex-wrap gap-2">
						{l.items.map((it) => (
							<span
								key={it}
								className={`rounded-full border-2 px-3 py-0.5 text-[17px] ${layerTone[l.tone].chip}`}
							>
								{it}
							</span>
						))}
					</div>
					<p className="mt-3 text-[18px] text-white/70">{l.line}</p>
			</div>
			<div className="flex gap-2">
				{techLayers.map((t, i) => (
					<span
						key={t.layer}
						className={`h-[7px] rounded-full transition-all duration-500 ${layerTone[t.tone].dot} ${
							i === layer ? "w-8" : "w-[7px] opacity-40"
						}`}
					/>
				))}
			</div>
		</div>
	);
}

/** Always-visible stack band; label colours double as the layer legend. */
function StackBand() {
	return (
		<div className="col-span-6 row-start-4 grid grid-cols-4 gap-6 rounded-[28px] bg-white/[0.04] px-8 py-4">
			{techLayers.map(({ layer, tone, items }) => (
				<div key={layer}>
					<p
						className={`flex items-center gap-2 text-[14px] font-medium uppercase tracking-[0.16em] ${layerTone[tone].text}`}
					>
						<span className={`size-[8px] rounded-full ${layerTone[tone].dot}`} />
						{layer}
					</p>
					<div className="mt-2 flex flex-wrap gap-2">
						{items.map((it) => (
							<span key={it} className="rounded-full bg-white/[0.08] px-3 py-1 text-[16px] text-white/85">
								{it}
							</span>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export function Overview({
	tile,
	tech,
	playing,
	hovered = null,
	onHover,
	onPick,
	onSetTech,
}: OverviewProps) {
	const shown = hovered ?? tile;

	return (
		<div className="absolute inset-0 bg-navy text-white">
			<EStrokes size={1400} className="-right-[500px] -bottom-[560px]" />
			<div
				className="absolute inset-0 grid grid-cols-6 gap-6 px-[80px] py-[56px]"
				style={{ gridTemplateRows: "284px 272px 206px 1fr" }}
			>
				<Hero tech={tech} onSetTech={onSetTech} />

				{tiles.map((t, i) => {
					const focused = i === shown;
					const anyFocused = shown >= 0;
					return (
						<motion.div
							key={t.id}
							className={`relative cursor-pointer ${place[t.id]}`}
							initial={false}
							animate={{ opacity: focused || !anyFocused ? 1 : 0.55, scale: focused ? 1.02 : 1 }}
							transition={{ duration: 0.5, ease: easeBrand }}
							onMouseEnter={() => onHover?.(i)}
							onMouseLeave={() => onHover?.(null)}
							onClick={(e) => {
								e.stopPropagation();
								onPick?.(i);
							}}
						>
							<FlipCard
								tech={tech}
								delay={0.05 + i * 0.05}
								front={<TileFace face={t.business} tile={t} focused={focused} compact={i >= 3 && i <= 5} />}
								back={
									t.id === "sectors" ? (
										<TechLayersFace tech={tech} focused={focused} />
									) : (
										<TileFace face={t.tech} tile={t} focused={focused} compact={i >= 3 && i <= 5} />
									)
								}
							/>
							{/* highlight ring + rotation progress (outside the flip so they never turn over) */}
							<div
								className={`pointer-events-none absolute inset-0 rounded-[32px] border-2 transition-colors duration-500 ${
									focused ? "border-orange" : "border-transparent"
								}`}
							/>
							{focused && playing && hovered === null && (
								<div className="pointer-events-none absolute inset-x-8 top-0 h-[5px] overflow-hidden rounded-b-full">
									{/* purely visual: the rotation timer lives in the TV window */}
									<div
										key={`${tile}-${tech}`}
										className="h-full origin-left bg-orange"
										style={{ animation: `cp-grow-x ${ROTATE_SECONDS}s linear forwards` }}
									/>
								</div>
							)}
						</motion.div>
					);
				})}

				<StackBand />
			</div>
		</div>
	);
}
