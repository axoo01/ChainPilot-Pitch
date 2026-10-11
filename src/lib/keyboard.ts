import { useEffect, useRef } from "react";
import { type DeckState, firstDemoSlide, goTo, next, prev, toAttract } from "./deck";
import { slides } from "../slides";

export interface KeyActions {
	update: (fn: (s: DeckState) => DeckState) => void;
	onFullscreen?: () => void;
	onSpeaker?: () => void;
}

/**
 * Laptop keyboard and presentation clickers (they send the same keys).
 *   → Space PageDown Enter : next      ← PageUp Backspace : back
 *   Esc / L : back to stand loop        Home / End : first / last slide
 *   D : jump to demo    B : blackout    F : fullscreen    S : speaker view
 *   R : reset timer   K : keep (cancel the auto-return to the loop)
 */
export function useDeckKeys(actions: KeyActions) {
	const ref = useRef(actions);
	ref.current = actions;

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.metaKey || e.ctrlKey || e.altKey) return;
			const a = ref.current;
			const handled = (() => {
				switch (e.key) {
					case "ArrowRight":
					case "ArrowDown":
					case " ":
					case "PageDown":
					case "Enter":
						a.update(next);
						return true;
					case "ArrowLeft":
					case "ArrowUp":
					case "PageUp":
					case "Backspace":
						a.update(prev);
						return true;
					case "Escape":
					case "l":
					case "L":
						a.update(toAttract);
						return true;
					case "Home":
						a.update((s) => goTo(s, 0));
						return true;
					case "End":
						a.update((s) => goTo(s, slides.length - 1));
						return true;
					case "d":
					case "D":
						a.update((s) => goTo(s, firstDemoSlide));
						return true;
					case "b":
					case "B":
						a.update((s) => ({ ...s, blackout: !s.blackout }));
						return true;
					case "f":
					case "F":
						a.onFullscreen?.();
						return Boolean(a.onFullscreen);
					case "s":
					case "S":
						a.onSpeaker?.();
						return Boolean(a.onSpeaker);
					case "r":
					case "R":
						a.update((s) => (s.mode === "pitch" ? { ...s, startedAt: Date.now() } : s));
						return true;
					case "k":
					case "K":
						a.update((s) => ({ ...s, nudge: s.nudge + 1 }));
						return true;
					default:
						return false;
				}
			})();
			if (handled) e.preventDefault();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
}
