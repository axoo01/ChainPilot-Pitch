import { BadgeCheck, Boxes, Factory, Handshake, Package, ShoppingCart, Truck, Warehouse } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Eyebrow, IconTile, Reveal, SlideShell, easeBrand } from "../components/ui";
import type { SlideProps } from "./types";

const nodes = [
	{ Icon: Handshake, label: "Supplier", module: "Procurement" },
	{ Icon: Warehouse, label: "Raw stock", module: "Inventory" },
	{ Icon: Factory, label: "Production", module: "Production" },
	{ Icon: Boxes, label: "Finished goods", module: "Inventory" },
	{ Icon: ShoppingCart, label: "Client order", module: "Sales" },
	{ Icon: BadgeCheck, label: "Payment confirmed", module: "Sales" },
	{ Icon: Truck, label: "Dispatched", module: "Inventory" },
];

/** Which node the package has reached on each beat. */
const reached = [1, 3, 5, 6, 6];

/** On-screen subtitles: the venue is loud, so the key line is always readable. */
const captions = [
	"Raw materials arrive from an approved supplier, and go into stock.",
	"They're turned into finished products, straight back into stock.",
	"A client orders and pays. The payment is confirmed.",
	"The goods go out, and stock updates itself.",
	"Nobody re-types anything. Every department sees the same numbers.",
];

const TRACK_W = 1640;
const NODE = 140;
const gap = (TRACK_W - NODE) / (nodes.length - 1);
const centerX = (i: number) => NODE / 2 + i * gap;

export function Connect({ step }: SlideProps) {
	const at = reached[Math.min(step, reached.length - 1)];
	const done = step >= captions.length - 1;
	return (
		<SlideShell tone="light" label="05" strokes="left">
			<Eyebrow tone="light">How it connects</Eyebrow>
			<Reveal show className="mt-8">
				<h2 className="text-[68px]">From the first delivery to the final payment.</h2>
			</Reveal>

			<div className="relative mt-[120px] h-[300px]" style={{ width: TRACK_W }}>
				<div
					className="absolute h-[6px] rounded-full bg-navy/10"
					style={{ left: centerX(0), width: centerX(nodes.length - 1) - centerX(0), top: 90 + NODE / 2 - 3 }}
				/>
				<motion.div
					className="absolute h-[6px] origin-left rounded-full bg-orange"
					style={{ left: centerX(0), width: centerX(nodes.length - 1) - centerX(0), top: 90 + NODE / 2 - 3 }}
					initial={false}
					animate={{ scaleX: at / (nodes.length - 1) }}
					transition={{ duration: 1.1, ease: easeBrand }}
				/>

				{/* the travelling package */}
				<motion.div
					className="absolute top-0 flex size-[64px] items-center justify-center rounded-full bg-orange text-white shadow-lg"
					initial={false}
					animate={{ x: centerX(at) - 32 }}
					transition={{ duration: 1.1, ease: easeBrand }}
				>
					<Package className="size-8" strokeWidth={2} />
				</motion.div>

				{nodes.map(({ Icon, label, module }, i) => {
					const lit = i <= at;
					return (
						<div
							key={label}
							className="absolute flex w-[220px] flex-col items-center text-center"
							style={{ left: centerX(i) - 110, top: 90 }}
						>
							<motion.div
								initial={false}
								animate={{ scale: i === at && !done ? 1.08 : 1 }}
								transition={{ duration: 0.5, ease: easeBrand }}
							>
								<IconTile tone="light" active={lit} spin={i === at && !done} spinStyle="turn" size={NODE}>
									<Icon className="size-16" strokeWidth={1.6} />
								</IconTile>
							</motion.div>
							<p
								className={`mt-6 font-display text-[28px] font-semibold leading-tight transition-colors duration-500 ${
									lit ? "text-navy" : "text-navy/30"
								}`}
							>
								{label}
							</p>
							<p
								className={`mt-1 text-[20px] uppercase tracking-[0.14em] transition-colors duration-500 ${
									lit ? "text-navy/55" : "text-navy/20"
								}`}
							>
								{module}
							</p>
						</div>
					);
				})}
			</div>

			<div className="relative mt-16 h-[120px]">
				<AnimatePresence mode="wait" initial={false}>
					<motion.p
						key={step}
						className={`absolute inset-x-0 text-center leading-tight ${
							done ? "font-display text-[52px] font-semibold" : "text-[42px] text-navy/80"
						}`}
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -16 }}
						transition={{ duration: 0.4, ease: easeBrand }}
					>
						{captions[Math.min(step, captions.length - 1)]}
					</motion.p>
				</AnimatePresence>
			</div>
		</SlideShell>
	);
}
