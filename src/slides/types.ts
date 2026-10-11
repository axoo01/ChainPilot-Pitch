import type { ComponentType } from "react";
import type { Tone } from "../components/ui";

export interface SlideProps {
	/** Current beat within the slide, 0-based. */
	step: number;
}

export interface SlideDef {
	id: string;
	title: string;
	tone: Tone;
	/** One entry per beat (see content/script.ts). */
	notes: string[];
	Component: ComponentType<SlideProps>;
	/** Demo slides never auto-return to the stand loop. */
	demo?: boolean;
}
