import { Check } from "lucide-react";
import { motion } from "motion/react";
import { AmaliTechLogo, ChainPilotLogo } from "../components/brand";
import { Eyebrow, Reveal, SlideShell, easeBrand } from "../components/ui";
import type { SlideProps } from "./types";

const questions = [
	"What's expiring or running low?",
	"What went to waste?",
	"Who got their goods before they paid?",
];

const gone = ["No phone calls", "No chasing four people", "No waiting for Monday's Excel report"];

export function Close({ step }: SlideProps) {
	return (
		<SlideShell tone="dark" label="08" badge={false}>
			<Eyebrow>Back to our three questions</Eyebrow>

			<ul className="mt-10 flex flex-col gap-6">
				{questions.map((q, i) => (
					<li key={q} className="flex items-center gap-8">
						<motion.span
							className="flex size-[68px] shrink-0 items-center justify-center rounded-full bg-sky text-navy"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.5 + i * 0.45 }}
						>
							<Check className="size-10" strokeWidth={3} />
						</motion.span>
						<span className="font-display text-[54px] font-medium">{q}</span>
					</li>
				))}
			</ul>

			<div className="mt-12 flex gap-12">
				{gone.map((g, i) => (
					<Reveal key={g} show={step >= 1} delay={i * 0.15} y={16}>
						<span className="relative text-[32px] text-white/60">
							{g}
							<motion.span
								className="absolute left-0 top-1/2 h-[3px] w-full origin-left bg-white/70"
								initial={false}
								animate={{ scaleX: step >= 1 ? 1 : 0 }}
								transition={{ duration: 0.5, delay: step >= 1 ? 0.4 + i * 0.15 : 0, ease: easeBrand }}
							/>
						</span>
					</Reveal>
				))}
			</div>

			<Reveal show={step >= 2} className="mt-14">
				<p className="text-[42px] text-sky">You open ChainPilot, and the answers are already there.</p>
				<h2 className="mt-4 text-[120px]">Zero guesswork.</h2>
			</Reveal>

			<Reveal
				show={step >= 3}
				className="absolute bottom-[96px] left-[140px] right-[140px] flex items-center justify-between"
			>
				<div className="flex items-center gap-10">
					<ChainPilotLogo size={58} />
					<span className="h-[56px] w-[2px] bg-white/20" />
					<AmaliTechLogo height={34} />
				</div>
				<p className="font-display text-[36px] font-medium">
					Let us show you how it works <span className="text-orange">→</span>
				</p>
			</Reveal>
		</SlideShell>
	);
}
