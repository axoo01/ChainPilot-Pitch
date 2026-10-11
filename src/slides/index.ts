import { createElement } from "react";
import { demos as demoContent } from "../content/assets";
import { script } from "../content/script";
import { Bridge } from "./Bridge";
import { Close } from "./Close";
import { Connect } from "./Connect";
import { DemoSlide } from "./Demo";
import { Hook } from "./Hook";
import { Inside } from "./Inside";
import { Problem } from "./Problem";
import type { SlideDef, SlideProps } from "./types";
import { UseCases } from "./UseCases";
import { Value } from "./Value";

const demos = [
	{ id: "demoExpiry", demo: demoContent.inventory },
	{ id: "demoProduction", demo: demoContent.production },
	{ id: "demoDispatch", demo: demoContent.sales },
] as const;

/** Running order of the pitch. The demo slides come after the close. */
export const slides: SlideDef[] = [
	{ id: "hook", title: "The hook", tone: "dark", notes: script.hook, Component: Hook },
	{ id: "problem", title: "The problem", tone: "light", notes: script.problem, Component: Problem },
	{ id: "bridge", title: "Why ChainPilot", tone: "dark", notes: script.bridge, Component: Bridge },
	{ id: "inside", title: "What's inside", tone: "dark", notes: script.inside, Component: Inside },
	{ id: "connect", title: "How it connects", tone: "light", notes: script.connect, Component: Connect },
	{ id: "value", title: "Value & impact", tone: "dark", notes: script.value, Component: Value },
	{ id: "useCases", title: "Use cases", tone: "light", notes: script.useCases, Component: UseCases },
	{ id: "close", title: "Closing", tone: "dark", notes: script.close, Component: Close },
	...demos.map(
		({ id, demo }, i): SlideDef => ({
			id,
			title: `Demo: ${demo.module}`,
			tone: "dark",
			// one beat per view, so the notes and the screenshots stay in step
			notes: demo.views.map((_, v) => script[id][v] ?? ""),
			demo: true,
			Component: ({ step }: SlideProps) =>
				createElement(DemoSlide, { step, demo, index: i + 1, total: demos.length }),
		}),
	),
];
