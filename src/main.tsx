import { MotionConfig } from "motion/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Audience } from "./Audience";
import { OverviewPhone } from "./OverviewPhone";
import { Speaker } from "./Speaker";
import "./styles.css";

/**
 * One app, three entry points chosen by the URL when the page loads:
 *   #/speaker  → speaker view
 *   #/overview on a small screen → phone overview page
 *   anything else → the audience (TV) window
 * Decided once, so resizing the TV window never swaps the view mid-pitch.
 */
const hash = location.hash;
const isPhone = window.matchMedia("(max-width: 900px)").matches;
const App = hash.startsWith("#/speaker")
	? Speaker
	: hash.startsWith("#/overview") && isPhone
		? OverviewPhone
		: Audience;

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<MotionConfig reducedMotion="user">
			<App />
		</MotionConfig>
	</StrictMode>,
);
