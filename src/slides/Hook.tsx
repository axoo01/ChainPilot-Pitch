import { motion } from "motion/react";
import { Eyebrow, Reveal, SlideShell, easeBrand } from "../components/ui";
import type { SlideProps } from "./types";

const questions = [
	"What is expiring or running low right now?",
	"How much did we produce today, versus what went to waste?",
	"Which orders left the warehouse before the client paid?",
];

const cost = [
	{ n: "3", label: "phone calls" },
	{ n: "4", label: "people" },
	{ n: "1 hr", label: "digging in Excel" },
];

export function Hook({ step }: SlideProps) {
	return (
		<SlideShell tone="dark" label="01">
			<Eyebrow>Three simple questions</Eyebrow>
			<Reveal show className="mt-8 max-w-[1240px]">
				<p className="font-display text-[54px] font-medium leading-[1.15] text-white/85">
					If a business owner walked into their company right now and asked…
				</p>
			</Reveal>

			<div className="mt-14 flex gap-[90px]">
				<ol className="flex w-[1010px] flex-col gap-8">
					{questions.map((q, i) => (
						<Reveal key={q} show={step >= i + 1} x={-48} y={0}>
							<li
								className={`flex items-baseline gap-8 transition-opacity duration-500 ${
									step >= 4 ? "opacity-60" : "opacity-100"
								}`}
							>
								<span className="font-display text-[40px] font-semibold text-orange">
									0{i + 1}
								</span>
								<span className="font-display text-[46px] font-medium leading-[1.2]">{q}</span>
							</li>
						</Reveal>
					))}
				</ol>

				<div className="flex flex-col justify-center gap-8 border-l-2 border-white/10 pl-[70px]">
					{cost.map((c, i) => (
						<Reveal key={c.label} show={step >= 4} delay={i * 0.18}>
							<div className="flex items-baseline gap-5">
								<span className="font-display text-[84px] font-semibold leading-none">{c.n}</span>
								<span className="text-[32px] text-sky">{c.label}</span>
							</div>
						</Reveal>
					))}
				</div>
			</div>

			<Reveal show={step >= 5} className="absolute bottom-[120px] left-[140px] right-[140px]">
				<p className="font-display text-[58px] font-semibold leading-tight">
					Can't answer in 10 seconds? You're running on{" "}
					<span className="relative inline-block">
						guesswork.
						<motion.span
							className="absolute -bottom-2 left-0 h-[8px] w-full origin-left rounded-full bg-orange"
							initial={false}
							animate={{ scaleX: step >= 5 ? 1 : 0 }}
							transition={{ duration: 0.7, delay: step >= 5 ? 0.5 : 0, ease: easeBrand }}
						/>
					</span>
				</p>
			</Reveal>
		</SlideShell>
	);
}
