import { MotionConfig } from "motion/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Audience } from "./Audience";
import { Speaker } from "./Speaker";
import "./styles.css";

const isSpeaker = location.hash.startsWith("#/speaker");

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<MotionConfig reducedMotion="user">{isSpeaker ? <Speaker /> : <Audience />}</MotionConfig>
	</StrictMode>,
);
