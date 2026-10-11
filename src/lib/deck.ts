import { slides } from "../slides";

export type Mode = "attract" | "pitch";

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
}

export const initialState: DeckState = {
	mode: "attract",
	slide: 0,
	step: 0,
	startedAt: null,
	blackout: false,
	nudge: 0,
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
	if (s.step < stepsOf(s.slide) - 1) return { ...s, step: s.step + 1 };
	if (s.slide < lastSlide) return { ...s, slide: s.slide + 1, step: 0 };
	return s;
}

export function prev(s: DeckState): DeckState {
	if (s.mode === "attract") return s;
	if (s.step > 0) return { ...s, step: s.step - 1 };
	if (s.slide > 0) {
		const slide = s.slide - 1;
		return { ...s, slide, step: stepsOf(slide) - 1 };
	}
	return s;
}

export function goTo(s: DeckState, slide: number): DeckState {
	const base = s.mode === "attract" ? startPitch(s) : s;
	return { ...base, slide: Math.max(0, Math.min(lastSlide, slide)), step: 0 };
}

export const firstDemoSlide = slides.findIndex((d) => d.demo);

/** The beat that follows the current one, or null at the very end. */
export function peekNext(s: DeckState): { slide: number; step: number } | null {
	if (s.mode === "attract") return { slide: 0, step: 0 };
	const n = next(s);
	return n === s ? null : { slide: n.slide, step: n.step };
}

export function stateToHash(s: DeckState): string {
	return s.mode === "attract" ? "#/" : `#/pitch/${s.slide + 1}/${s.step + 1}`;
}

export function stateFromHash(hash: string): DeckState {
	const m = /^#\/pitch\/(\d+)\/(\d+)/.exec(hash);
	if (!m) return initialState;
	const slide = Math.max(0, Math.min(lastSlide, Number(m[1]) - 1));
	const step = Math.max(0, Math.min(stepsOf(slide) - 1, Number(m[2]) - 1));
	return { ...initialState, mode: "pitch", slide, step, startedAt: Date.now() };
}
