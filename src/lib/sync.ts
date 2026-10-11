import { useCallback, useEffect, useRef, useState } from "react";
import type { DeckState } from "./deck";

/**
 * Keeps the audience (TV) window and the speaker (laptop) window in step.
 * Works fully offline: BroadcastChannel talks between tabs/windows of the
 * same origin inside one browser, no server or network involved.
 */

export type Role = "audience" | "speaker";

type Message =
	| { type: "state"; state: DeckState; origin: string }
	| { type: "hello"; origin: string }
	| { type: "beat"; origin: string };

const CHANNEL = "chainpilot-pitch";
const windowId = Math.random().toString(36).slice(2);

export function useSyncedDeck(role: Role, initial: DeckState) {
	const [state, setState] = useState(initial);
	/** Local time of the last change seen in either window (drives idle return). */
	const [changedAt, setChangedAt] = useState(() => Date.now());
	const [peerSeenAt, setPeerSeenAt] = useState<number | null>(null);
	const channel = useRef<BroadcastChannel | null>(null);
	const stateRef = useRef(state);
	stateRef.current = state;

	useEffect(() => {
		const ch = new BroadcastChannel(CHANNEL);
		channel.current = ch;
		ch.onmessage = (e: MessageEvent<Message>) => {
			const msg = e.data;
			if (msg.origin === windowId) return;
			setPeerSeenAt(Date.now());
			if (msg.type === "state") {
				setState(msg.state);
				setChangedAt(Date.now());
			} else if (msg.type === "hello" && role === "audience") {
				ch.postMessage({ type: "state", state: stateRef.current, origin: windowId });
			}
		};
		if (role === "speaker") ch.postMessage({ type: "hello", origin: windowId });
		const beat =
			role === "audience"
				? window.setInterval(() => ch.postMessage({ type: "beat", origin: windowId }), 2000)
				: undefined;
		return () => {
			window.clearInterval(beat);
			ch.close();
			channel.current = null;
		};
	}, [role]);

	const update = useCallback((fn: (s: DeckState) => DeckState) => {
		const prev = stateRef.current;
		const nextState = fn(prev);
		if (nextState === prev) return;
		stateRef.current = nextState;
		setState(nextState);
		setChangedAt(Date.now());
		channel.current?.postMessage({ type: "state", state: nextState, origin: windowId });
	}, []);

	return { state, update, changedAt, peerSeenAt };
}
