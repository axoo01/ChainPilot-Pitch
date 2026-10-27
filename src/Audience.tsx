import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Attract } from "./components/Attract";
import { Overview } from "./components/Overview";
import { SlideView } from "./components/SlideView";
import { Stage } from "./components/Stage";
import { easeBrand } from "./components/ui";
import { allAssetSrcs } from "./content/assets";
import { ROTATE_SECONDS } from "./content/overview";
import {
	IDLE_MS,
	next,
	overviewPick,
	overviewSetTech,
	overviewTick,
	stateFromHash,
	stateToHash,
	toAttract,
} from "./lib/deck";
import { useDeckKeys } from "./lib/keyboard";
import { useSyncedDeck } from "./lib/sync";
import { slides } from "./slides";

function toggleFullscreen() {
	if (document.fullscreenElement) void document.exitFullscreen();
	else void document.documentElement.requestFullscreen();
}

function openSpeakerView() {
	window.open(
		`${location.pathname}#/speaker`,
		"chainpilot-speaker",
		"popup,width=1440,height=900",
	);
}

/** Three light-blue strokes that sweep across when switching loop ↔ pitch. */
function Sweep() {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
			{[0, 1, 2].map((i) => (
				<motion.div
					key={i}
					className="absolute left-1/2 top-1/2 h-[150px] w-[2600px] rounded-full bg-sky"
					style={{ rotate: "-45deg", marginLeft: -1300, marginTop: -75 + (i - 1) * 260 }}
					initial={{ x: -2600 }}
					animate={{ x: 2600 }}
					transition={{ duration: 1.1, delay: i * 0.08, ease: [0.65, 0, 0.35, 1] }}
				/>
			))}
		</div>
	);
}

function useIdleCursor() {
	useEffect(() => {
		let t: number | undefined;
		const wake = () => {
			document.body.classList.remove("cursor-idle");
			window.clearTimeout(t);
			t = window.setTimeout(() => document.body.classList.add("cursor-idle"), 2000);
		};
		wake();
		window.addEventListener("mousemove", wake);
		return () => {
			window.removeEventListener("mousemove", wake);
			window.clearTimeout(t);
		};
	}, []);
}

export function Audience() {
	const { state, update, changedAt } = useSyncedDeck("audience", stateFromHash(location.hash));
	const [sweeps, setSweeps] = useState(0);
	const [hovered, setHovered] = useState<number | null>(null);
	const lastMode = useRef(state.mode);

	useDeckKeys({ update, onFullscreen: toggleFullscreen, onSpeaker: openSpeakerView });
	useIdleCursor();

	// Keep the URL in step so a refresh lands on the same beat.
	useEffect(() => {
		history.replaceState(null, "", stateToHash(state));
	}, [state]);

	// Loop ↔ pitch transition accent.
	useEffect(() => {
		if (lastMode.current !== state.mode) setSweeps((n) => n + 1);
		lastMode.current = state.mode;
		setHovered(null);
	}, [state.mode]);

	// Drift back to the stand loop when the visitor has gone.
	useEffect(() => {
		if (state.mode !== "pitch" || slides[state.slide].demo) return;
		const t = window.setTimeout(() => update(toAttract), IDLE_MS - (Date.now() - changedAt));
		return () => window.clearTimeout(t);
	}, [state, changedAt, update]);

	// Overview auto-rotation: one plain timer, owned by the TV window only.
	// Restarts whenever the highlight, view or pause state changes; holds while hovered.
	const { tile: ovTile, playing: ovPlaying, tech: ovTech } = state.overview;
	useEffect(() => {
		if (state.mode !== "overview" || !ovPlaying || hovered !== null) return;
		const t = window.setTimeout(() => update(overviewTick), ROTATE_SECONDS * 1000);
		return () => window.clearTimeout(t);
	}, [state.mode, ovTile, ovPlaying, ovTech, hovered, update]);

	// Warm the image cache so nothing pops in mid-pitch.
	useEffect(() => {
		for (const src of allAssetSrcs) new Image().src = src;
	}, []);

	return (
		<main
			className="h-full w-full bg-navy"
			onClick={() => update((s) => (s.mode === "overview" ? s : next(s)))}
		>
			<Stage>
				<AnimatePresence initial={false}>
					<motion.div
						key={state.mode}
						className="absolute inset-0"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.6, ease: easeBrand }}
					>
						{state.mode === "attract" ? (
							<Attract />
						) : state.mode === "overview" ? (
							<Overview
								{...state.overview}
								hovered={hovered}
								onHover={setHovered}
								onPick={(i) => update((s) => overviewPick(s, i))}
								onSetTech={(v) => update((s) => overviewSetTech(s, v))}
							/>
						) : (
							<SlideView slide={state.slide} step={state.step} />
						)}
					</motion.div>
				</AnimatePresence>
				{sweeps > 0 && <Sweep key={sweeps} />}
			</Stage>

			<AnimatePresence>
				{state.blackout && (
					<motion.div
						className="fixed inset-0 bg-black"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4 }}
					/>
				)}
			</AnimatePresence>
		</main>
	);
}
