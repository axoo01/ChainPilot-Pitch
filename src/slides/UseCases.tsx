import { Coffee, Milk, Pill, Store } from "lucide-react";
import { motion } from "motion/react";
import { Eyebrow, IconTile, Reveal, SlideShell, easeBrand } from "../components/ui";
import type { SlideProps } from "./types";

const sectors = [
	{
		Icon: Coffee,
		sector: "Agriculture",
		title: "Coffee washing stations",
		body: "Trace every export bag back to the cooperative and batch it came from.",
	},
	{
		Icon: Pill,
		sector: "Health",
		title: "Pharmacies & hospitals",
		body: "See every medicine batch and its expiry date, before the inspector does.",
	},
	{
		Icon: Milk,
		sector: "Food processing",
		title: "Dairies & bakeries",
		body: "Compare produced against wasted, and never ship an expired batch.",
	},
];

export function UseCases({ step }: SlideProps) {
	return (
		<SlideShell tone="light" label="07" strokes="left">
			<Eyebrow tone="light">Beyond one industry</Eyebrow>
			<Reveal show className="mt-8 max-w-[1500px]">
				<h2 className="text-[58px] leading-[1.1]">
					If it comes in, gets stored, maybe transformed, and goes out, ChainPilot fits.
				</h2>
				<p className="mt-5 text-[30px] text-navy/60">
					First built for a timber company turning wood into MDF boards.
				</p>
			</Reveal>

			<div className="mt-12 grid grid-cols-3 gap-10" style={{ perspective: 1600 }}>
				{sectors.map(({ Icon, sector, title, body }, i) => {
					const shown = step >= i + 1;
					return (
						<motion.div
							key={sector}
							className="flex h-[370px] flex-col rounded-[40px] bg-mist p-10"
							style={{ transformOrigin: "left center" }}
							initial={false}
							animate={{ rotateY: shown ? 0 : -75, opacity: shown ? 1 : 0 }}
							transition={{ duration: 0.8, ease: easeBrand }}
						>
							<div className="flex items-center gap-6">
								<IconTile tone="light" size={84} spin={step === i + 1}>
									<Icon className="size-10" strokeWidth={1.75} />
								</IconTile>
								<span className="text-[22px] font-medium uppercase tracking-[0.16em] text-navy/55">
									{sector}
								</span>
							</div>
							<h3 className="mt-7 text-[34px] leading-tight">{title}</h3>
							<p className="mt-4 text-[24px] leading-snug text-navy/70">{body}</p>
						</motion.div>
					);
				})}
			</div>

			<Reveal show={step >= 4} className="mt-8">
				<div className="flex items-center gap-8 rounded-[40px] bg-navy px-10 py-6 text-white">
					<IconTile size={68} spin={step >= 4}>
						<Store className="size-10" strokeWidth={1.75} />
					</IconTile>
					<p className="text-[34px]">
						<span className="font-display font-semibold">Don't manufacture?</span> Distributors and
						wholesalers simply switch production off.
					</p>
				</div>
			</Reveal>
		</SlideShell>
	);
}
