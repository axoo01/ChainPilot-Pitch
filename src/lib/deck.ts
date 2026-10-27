import { tiles } from "../content/overview";
import { slides } from "../slides";

export type Mode = "attract" | "overview" | "pitch";

/** No input for this long on a pitch slide → back to the stand loop. */
export const IDLE_MS = 120_000;

export interface DeckState {
	mode: Mode;
	slide: number;
	step: number;
	/** Epoch ms when the pitch timer started; null while the stand loop runs. */
	startedAt: number | null;
	blackout: boolean;
	/** Bumped by K: "I'm still here", resets the idle return without moving. */
	nudge: number;
	/** Overview page: highlighted tile (-1 = none yet), auto-rotation on/off, tech face shown. */
	overview: { tile: number; playing: boolean; tech: boolean };
}

export const initialState: DeckState = {
	mode: "attract",
	slide: 0,
	step: 0,
	startedAt: null,
	blackout: false,
	nudge: 0,
	overview: { tile: -1, playing: true, tech: false },
};

const lastSlide = slides.length - 1;
const stepsOf = (slide: number) => slides[slide].notes.length;

export const startPitch = (s: DeckState): DeckState => ({
	...s,
	mode: "pitch",
	slide: 0,
	step: 0,
	startedAt: Date.now(),
	blackout: false,
});

export const toAttract = (s: DeckState): DeckState => ({
	...s,
	mode: "attract",
	slide: 0,
	step: 0,
	startedAt: null,
	blackout: false,
});

export function next(s: DeckState): DeckState {
	if (s.mode === "attract") return startPitch(s);
	if (s.mode === "overview") return leaveOverview(s);
	if (s.step < stepsOf(s.slide) - 1) return { ...s, step: s.step + 1 };
	if (s.slide < lastSlide) return { ...s, slide: s.slide + 1, step: 0 };
	return s;
}

export function prev(s: DeckState): DeckState {
	if (s.mode !== "pitch") return s;
	if (s.step > 0) return { ...s, step: s.step - 1 };
	if (s.slide > 0) {
		const slide = s.slide - 1;
		return { ...s, slide, step: stepsOf(slide) - 1 };
	}
	return s;
}

export function goTo(s: DeckState, slide: number): DeckState {
	const base = s.mode === "pitch" ? s : s.startedAt ? { ...s, mode: "pitch" as const } : startPitch(s);
	return { ...base, slide: Math.max(0, Math.min(lastSlide, slide)), step: 0 };
}

/* ---------- overview ---------- */

/** Open the overview fresh. A pitch in progress keeps its place and timer. */
export const toOverview = (s: DeckState): DeckState =>
	s.mode === "overview"
		? s
		: { ...s, mode: "overview", blackout: false, overview: { tile: -1, playing: true, tech: false } };

/** Enter from the overview: resume a pitch in progress, or start a new one. */
export const leaveOverview = (s: DeckState): DeckState =>
	s.startedAt ? { ...s, mode: "pitch" } : startPitch(s);

const wrap = (i: number) => (i + tiles.length) % tiles.length;

/** Manual move: pauses auto-rotation (it stays paused until P). */
export const overviewMove = (s: DeckState, by: number): DeckState => ({
	...s,
	overview: {
		...s.overview,
		tile: s.overview.tile < 0 ? (by > 0 ? 0 : tiles.length - 1) : wrap(s.overview.tile + by),
		playing: false,
	},
});

/** Click / pin a tile: same as a manual move. */
export const overviewPick = (s: DeckState, tile: number): DeckState => ({
	...s,
	overview: { ...s.overview, tile: wrap(tile), playing: false },
});

/** Auto-rotation tick (driven by the audience window only). */
export const overviewTick = (s: DeckState): DeckState =>
	s.mode === "overview" && s.overview.playing
		? { ...s, overview: { ...s.overview, tile: wrap(s.overview.tile + 1) } }
		: s;

export const overviewTogglePlay = (s: DeckState): DeckState => ({
	...s,
	overview: { ...s.overview, playing: !s.overview.playing },
});

export const overviewSetTech = (s: DeckState, tech: boolean): DeckState => ({
	...s,
	overview: { ...s.overview, tech },
});

export const overviewToggleTech = (s: DeckState): DeckState => ({
	...s,
	overview: { ...s.overview, tech: !s.overview.tech },
});

export const firstDemoSlide = slides.findIndex((d) => d.demo);

/** The beat that follows the current one, or null at the very end. */
export function peekNext(s: DeckState): { slide: number; step: number } | null {
	if (s.mode === "attract") return { slide: 0, step: 0 };
	if (s.mode === "overview") return s.startedAt ? { slide: s.slide, step: s.step } : { slide: 0, step: 0 };
	const n = next(s);
	return n === s ? null : { slide: n.slide, step: n.step };
}

export function stateToHash(s: DeckState): string {
	if (s.mode === "attract") return "#/";
	if (s.mode === "overview") return "#/overview";
	return `#/pitch/${s.slide + 1}/${s.step + 1}`;
}

export function stateFromHash(hash: string): DeckState {
	if (hash.startsWith("#/overview")) return { ...initialState, mode: "overview" };
	const m = /^#\/pitch\/(\d+)\/(\d+)/.exec(hash);
	if (!m) return initialState;
	const slide = Math.max(0, Math.min(lastSlide, Number(m[1]) - 1));
	const step = Math.max(0, Math.min(stepsOf(slide) - 1, Number(m[2]) - 1));
	return { ...initialState, mode: "pitch", slide, step, startedAt: Date.now() };
}
