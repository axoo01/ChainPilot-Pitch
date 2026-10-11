import {
	BadgeCheck,
	Coffee,
	Factory,
	Handshake,
	Milk,
	Pill,
	ShoppingCart,
	Shirt,
	Store,
	Warehouse,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { AmaliTechLogo, ChainPilotLogo, EStrokes } from "./brand";
import { IconTile, easeBrand } from "./ui";

/**
 * The stand loop: plays on its own while nobody is being pitched, built to
 * stop people walking past. Readable from a distance: few words, huge type.
 */

type Scene =
	| { kind: "question"; n: number; text: string; ms: number }
	| { kind: "answer" | "flow" | "sectors" | "invite"; ms: number };

const scenes: Scene[] = [
	{ kind: "question", n: 1, text: "What's expiring?", ms: 3400 },
	{ kind: "question", n: 2, text: "What went to waste?", ms: 3400 },
	{ kind: "question", n: 3, text: "Who hasn't paid yet?", ms: 3400 },
	{ kind: "answer", ms: 5000 },
	{ kind: "flow", ms: 6500 },
	{ kind: "sectors", ms: 5500 },
	{ kind: "invite", ms: 5000 },
];

const flow = [
	{ Icon: Handshake, label: "Supplier" },
	{ Icon: Warehouse, label: "Stock" },
	{ Icon: Factory, label: "Production" },
	{ Icon: ShoppingCart, label: "Sales" },
	{ Icon: BadgeCheck, label: "Paid" },
];

const sectors = [
	{ Icon: Factory, label: "Manufacturing" },
	{ Icon: Coffee, label: "Agriculture" },
	{ Icon: Pill, label: "Health" },
	{ Icon: Milk, label: "Food" },
	{ Icon: Shirt, label: "Textiles" },
	{ Icon: Store, label: "Distribution" },
];

const enter = { opacity: 0, y: 40 };
const shown = { opacity: 1, y: 0 };
const leave = { opacity: 0, y: -40 };

function Words({ text, size }: { text: string; size: number }) {
	return (
		<h1 className="flex flex-wrap gap-x-[0.28em]" style={{ fontSize: size }}>
			{text.split(" ").map((w, i) => (
				<motion.span
					key={w + i}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: easeBrand }}
				>
					{w}
				</motion.span>
			))}
		</h1>
	);
}

function SceneBody({ scene }: { scene: Scene }) {
	switch (scene.kind) {
		case "question":
			return (
				<div>
					<p className="font-display text-[34px] font-medium uppercase tracking-[0.2em] text-sky">
						Can you answer this in 10 seconds?
					</p>
					<div className="mt-10">
						<Words text={scene.text} size={168} />
					</div>
					<div className="mt-14 flex gap-4">
						{[1, 2, 3].map((n) => (
							<span
								key={n}
								className={`h-[10px] rounded-full ${n === scene.n ? "w-20 bg-orange" : "w-[10px] bg-white/30"}`}
							/>
						))}
					</div>
				</div>
			);
		case "answer":
			return (
				<div>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, ease: easeBrand }}
					>
						<ChainPilotLogo size={150} />
					</motion.div>
					<div className="mt-14">
						<Words text="answers all three. In real time." size={96} />
					</div>
				</div>
			);
		case "flow":
			return (
				<div>
					<Words text="From the first delivery to the final payment." size={84} />
					<div className="relative mt-24 flex w-[1500px] justify-between">
						<div className="absolute left-[70px] right-[70px] top-[68px] h-[6px] rounded-full bg-white/10" />
						<motion.div
							className="absolute left-[70px] right-[70px] top-[68px] h-[6px] origin-left rounded-full bg-orange"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ duration: 3.2, delay: 0.8, ease: "linear" }}
						/>
						{flow.map(({ Icon, label }, i) => (
							<motion.div
								key={label}
								className="relative flex w-[140px] flex-col items-center"
								initial={{ opacity: 0.25 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.4, delay: 0.8 + i * 0.8 }}
							>
								<IconTile size={140}>
									<Icon className="size-16" strokeWidth={1.6} />
								</IconTile>
								<span className="mt-6 whitespace-nowrap font-display text-[34px] font-semibold">
									{label}
								</span>
							</motion.div>
						))}
					</div>
				</div>
			);
		case "sectors":
			return (
				<div>
					<Words text="Built for any business that buys, stores, makes and sells." size={84} />
					<div className="mt-20 flex gap-10">
						{sectors.map(({ Icon, label }, i) => (
							<motion.div
								key={label}
								className="flex flex-col items-center gap-5"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.9 + i * 0.15, ease: easeBrand }}
							>
								<IconTile size={150}>
									<Icon className="size-[72px]" strokeWidth={1.5} />
								</IconTile>
								<span className="text-[30px] text-white/80">{label}</span>
							</motion.div>
						))}
					</div>
				</div>
			);
		case "invite":
			return (
				<div>
					<Words text="Ask us for the 5-minute tour." size={120} />
					<motion.div
						className="mt-14 inline-flex items-center gap-4 rounded-full bg-white/10 px-10 py-5 text-[38px]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 1 }}
					>
						<span className="size-4 rounded-full bg-sky" />
						Live and ready to use today
					</motion.div>
				</div>
			);
	}
}

export function Attract() {
	const [i, setI] = useState(0);
	const scene = scenes[i];

	useEffect(() => {
		const t = window.setTimeout(() => setI((n) => (n + 1) % scenes.length), scene.ms);
		return () => window.clearTimeout(t);
	}, [scene]);

	return (
		<div className="absolute inset-0 bg-navy text-white">
			<EStrokes drift size={1500} className="-right-[420px] -top-[260px]" />
			<AmaliTechLogo className="absolute right-[80px] top-[64px]" height={34} />

			<div className="absolute inset-0 flex items-center px-[160px]">
				<AnimatePresence mode="wait">
					<motion.div
						key={i}
						initial={enter}
						animate={shown}
						exit={leave}
						transition={{ duration: 0.5, ease: easeBrand }}
					>
						<SceneBody scene={scene} />
					</motion.div>
				</AnimatePresence>
			</div>

			<div className="absolute bottom-[64px] left-[160px] right-[160px] flex items-center justify-between">
				<ChainPilotLogo size={48} />
				<div className="h-[4px] w-[420px] overflow-hidden rounded-full bg-white/10">
					<motion.div
						key={i}
						className="h-full origin-left bg-white/50"
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: scene.ms / 1000, ease: "linear" }}
					/>
				</div>
			</div>
		</div>
	);
}
