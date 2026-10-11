import { Monitor, MonitorOff, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Attract } from "./components/Attract";
import { SlideView } from "./components/SlideView";
import { Stage } from "./components/Stage";
import { IDLE_MS, goTo, initialState, peekNext, toAttract } from "./lib/deck";
import { useDeckKeys } from "./lib/keyboard";
import { useSyncedDeck } from "./lib/sync";
import { slides } from "./slides";

const TARGET_MS = 5 * 60_000;

function useNow(ms = 500) {
	const [now, setNow] = useState(() => Date.now());
	useEffect(() => {
		const t = window.setInterval(() => setNow(Date.now()), ms);
		return () => window.clearInterval(t);
	}, [ms]);
	return now;
}

const mmss = (ms: number) => {
	const s = Math.max(0, Math.floor(ms / 1000));
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

function Preview({ slide, step, attract }: { slide: number; step: number; attract?: boolean }) {
	return (
		<div className="aspect-video w-full overflow-hidden rounded-xl bg-navy ring-1 ring-white/10">
			<Stage>{attract ? <Attract /> : <SlideView slide={slide} step={step} />}</Stage>
		</div>
	);
}

const keys = [
	["→ / Space", "next"],
	["←", "back"],
	["D", "demo"],
	["L / Esc", "stand loop"],
	["B", "blackout"],
	["K", "keep"],
	["R", "reset timer"],
];

export function Speaker() {
	const { state, update, changedAt, peerSeenAt } = useSyncedDeck("speaker", initialState);
	useDeckKeys({ update });
	const now = useNow();
	const current = useRef<HTMLLIElement>(null);

	useEffect(() => {
		current.current?.scrollIntoView({ block: "center", behavior: "smooth" });
	}, [state.slide, state.step]);

	useEffect(() => {
		document.title = "Speaker view · ChainPilot";
	}, []);

	const pitching = state.mode === "pitch";
	const def = slides[state.slide];
	const upcoming = peekNext(state);
	const elapsed = state.startedAt ? now - state.startedAt : 0;
	const timerColor =
		elapsed > TARGET_MS ? "text-orange" : elapsed > TARGET_MS - 30_000 ? "text-sun" : "text-white";
	const connected = peerSeenAt !== null && now - peerSeenAt < 5000;
	const idleLeft = IDLE_MS - (now - changedAt);
	const idleWarning = pitching && !def.demo && idleLeft < 20_000;

	return (
		<div className="flex h-full flex-col bg-[#05192a] text-white">
			<header className="flex items-center gap-6 border-b border-white/10 px-6 py-3">
				<span className="font-display text-lg font-semibold">ChainPilot · Speaker view</span>
				<span className="text-white/60">
					{pitching
						? `Slide ${state.slide + 1}/${slides.length} · ${def.title} · beat ${state.step + 1}/${def.notes.length}`
						: "Stand loop running"}
				</span>
				<span
					className={`ml-auto flex items-center gap-2 text-sm ${connected ? "text-sky" : "text-orange"}`}
				>
					{connected ? <Monitor className="size-4" /> : <MonitorOff className="size-4" />}
					{connected ? "TV window connected" : "TV window not found"}
				</span>
				{state.blackout && (
					<span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-black">
						BLACKOUT
					</span>
				)}
				<div className="flex items-center gap-3">
					<span className={`font-display text-4xl font-semibold tabular-nums ${timerColor}`}>
						{mmss(elapsed)}
					</span>
					<span className="text-white/40">/ 5:00</span>
					<button
						type="button"
						onClick={() => update((s) => (s.mode === "pitch" ? { ...s, startedAt: Date.now() } : s))}
						className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
						title="Reset timer (R)"
					>
						<RotateCcw className="size-5" />
					</button>
				</div>
			</header>

			{idleWarning && (
				<div className="bg-sun px-6 py-2 text-center font-medium text-navy">
					Returning to the stand loop in {Math.ceil(idleLeft / 1000)}s. Press K to stay.
				</div>
			)}

			<div className="grid min-h-0 flex-1 grid-cols-[1.25fr_1fr] gap-6 p-6">
				<section className="flex min-h-0 flex-col gap-4">
					<p className="text-xs uppercase tracking-widest text-white/40">On the TV now</p>
					<Preview slide={state.slide} step={state.step} attract={!pitching} />
					<div className="flex min-h-0 gap-4">
						<div className="w-1/2 shrink-0">
							<p className="mb-2 text-xs uppercase tracking-widest text-white/40">Next</p>
							{upcoming ? (
								<Preview slide={upcoming.slide} step={upcoming.step} />
							) : (
								<div className="flex aspect-video items-center justify-center rounded-xl ring-1 ring-white/10 text-white/40">
									End of deck
								</div>
							)}
						</div>
						<p className="mt-6 line-clamp-6 text-sm leading-relaxed text-white/50">
							{upcoming ? slides[upcoming.slide].notes[upcoming.step] : ""}
						</p>
					</div>
				</section>

				<section className="flex min-h-0 flex-col">
					<p className="mb-3 text-xs uppercase tracking-widest text-white/40">
						{pitching ? `Script · ${def.title}` : "Ready"}
					</p>
					{pitching ? (
						<ol className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-2">
							{def.notes.map((n, i) => (
								<li
									key={n}
									ref={i === state.step ? current : undefined}
									className={`rounded-xl p-4 transition-all duration-300 ${
										i === state.step
											? "bg-white/10 text-2xl leading-snug text-white"
											: i < state.step
												? "text-lg text-white/30"
												: "text-lg text-white/55"
									}`}
								>
									{n}
								</li>
							))}
						</ol>
					) : (
						<div className="flex-1 space-y-4 text-xl leading-relaxed text-white/80">
							<p>The stand loop is playing on the TV.</p>
							<p>
								Press <b>→</b> or <b>Space</b> to start the pitch. The timer starts by itself.
							</p>
							<p className="text-white/50">
								Visitor only wants the demo? Press <b>D</b> to jump straight to it.
							</p>
						</div>
					)}

					<nav className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
						{slides.map((s, i) => (
							<button
								key={s.id}
								type="button"
								onClick={() => update((st) => goTo(st, i))}
								className={`rounded-full px-3 py-1 text-xs ${
									pitching && i === state.slide
										? "bg-orange text-white"
										: "bg-white/5 text-white/60 hover:bg-white/10"
								}`}
							>
								{i + 1}. {s.title}
							</button>
						))}
						<button
							type="button"
							onClick={() => update(toAttract)}
							className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60 hover:bg-white/10"
						>
							↺ Stand loop
						</button>
					</nav>
				</section>
			</div>

			<footer className="flex flex-wrap gap-x-6 gap-y-1 border-t border-white/10 px-6 py-2 text-xs text-white/40">
				{keys.map(([k, v]) => (
					<span key={k}>
						<kbd className="rounded bg-white/10 px-1.5 py-0.5 font-sans text-white/70">{k}</kbd> {v}
					</span>
				))}
			</footer>
		</div>
	);
}
