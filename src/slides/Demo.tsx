import { AnimatePresence, motion } from "motion/react";
import { Asset } from "../components/Asset";
import { Eyebrow, SlideShell, easeBrand } from "../components/ui";
import { type Demo, type FocusBox, SHOT_ASPECT } from "../content/assets";

const FRAME_W = 1180;
const FRAME_H = Math.round(FRAME_W / SHOT_ASPECT);
const MAX_ZOOM = 2.6;

/** Scale + offset that brings a focus box to the centre of the frame. */
function zoomTo(f: FocusBox | undefined) {
	if (!f) return { scale: 1, x: 0, y: 0 };
	const scale = Math.min(0.92 / f.w, 0.92 / f.h, MAX_ZOOM);
	const clamp = (v: number, min: number) => Math.min(0, Math.max(min, v));
	const x = clamp(FRAME_W / 2 - (f.x + f.w / 2) * FRAME_W * scale, FRAME_W - FRAME_W * scale);
	const y = clamp(FRAME_H / 2 - (f.y + f.h / 2) * FRAME_H * scale, FRAME_H - FRAME_H * scale);
	return { scale, x, y };
}

export function DemoSlide({
	step,
	demo,
	index,
	total,
}: {
	step: number;
	demo: Demo;
	index: number;
	total: number;
}) {
	const view = demo.views[Math.min(step, demo.views.length - 1)];
	const zoom = zoomTo(view.focus);

	return (
		<SlideShell tone="dark" label={`Demo ${index}/${total}`} strokes="left">
			<div className="flex h-full items-center gap-[60px]">
				<div className="flex w-[400px] shrink-0 flex-col">
					<Eyebrow>Live demo</Eyebrow>
					<h2 className="mt-6 text-[64px]">{demo.module}</h2>
					<div className="relative mt-10 h-[280px]">
						<AnimatePresence mode="wait" initial={false}>
							<motion.p
								key={step}
								className="absolute inset-x-0 text-[36px] leading-snug text-white/85"
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -14 }}
								transition={{ duration: 0.35, ease: easeBrand }}
							>
								{view.caption}
							</motion.p>
						</AnimatePresence>
					</div>
					<div className="mt-6 flex gap-3">
						{demo.views.map((v, i) => (
							<span
								key={v.caption}
								className={`h-[8px] rounded-full transition-all duration-500 ${
									i === step ? "w-12 bg-orange" : "w-[8px] bg-white/30"
								}`}
							/>
						))}
					</div>
				</div>

				<div className="mt-[60px] flex flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl shadow-black/40">
					<div className="flex h-[44px] items-center gap-3 bg-mist px-5">
						{[0, 1, 2].map((i) => (
							<span key={i} className="size-[14px] rounded-full bg-white ring-1 ring-navy/15" />
						))}
						<span className="ml-4 rounded-full bg-white px-5 py-1 text-[18px] text-navy/60">
							ChainPilot · {demo.module}
						</span>
					</div>
					<div className="relative overflow-hidden bg-white" style={{ width: FRAME_W, height: FRAME_H }}>
						{/* keyed by image: same screenshot → zooms; new screenshot → cross-fade, then zoom */}
						<AnimatePresence initial={false}>
							<motion.div
								key={view.src}
								className="absolute left-0 top-0"
								style={{ width: FRAME_W, height: FRAME_H, transformOrigin: "0 0" }}
								initial={{ opacity: 0, scale: 1, x: 0, y: 0 }}
								animate={{ opacity: 1, ...zoom }}
								exit={{ opacity: 0 }}
								transition={{
									opacity: { duration: 0.45 },
									default: { duration: 0.9, delay: 0.35, ease: easeBrand },
								}}
							>
								<Asset
									asset={{ src: view.src, label: `${demo.module} screenshot` }}
									variant="screen"
									className="h-full w-full object-cover object-top"
								/>
								<AnimatePresence>
									{view.focus && (
										<motion.div
											key={step}
											className="absolute rounded-[10px]"
											style={{
												left: view.focus.x * FRAME_W,
												top: view.focus.y * FRAME_H,
												width: view.focus.w * FRAME_W,
												height: view.focus.h * FRAME_H,
												border: `${4 / zoom.scale}px solid var(--color-orange)`,
												boxShadow: "0 0 0 4000px rgba(8, 40, 59, 0.35)",
											}}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.4, delay: 1 }}
										/>
									)}
								</AnimatePresence>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>
		</SlideShell>
	);
}
