import { BellRing } from "lucide-react";
import { motion } from "motion/react";
import { ChainPilotLogo } from "../components/brand";
import { Reveal, SlideShell, easeBrand } from "../components/ui";
import type { SlideProps } from "./types";

const parts = ["Buying", "Stock", "Production", "Sales"];

export function Bridge({ step }: SlideProps) {
	const revealed = step >= 1;
	return (
		<SlideShell tone="dark" label="03">
			<div className="flex h-full flex-col items-center justify-center text-center">
				<motion.div
					initial={false}
					animate={{ y: revealed ? -10 : 120, scale: revealed ? 0.72 : 1, opacity: revealed ? 0.45 : 1 }}
					transition={{ duration: 0.8, ease: easeBrand }}
				>
					<h2 className="text-[96px]">None of this is the staff's fault.</h2>
					<p className="mt-6 text-[44px] text-sky">
						They just don't have one tool to see everything going on.
					</p>
				</motion.div>

				<Reveal show={revealed} delay={0.25} className="mt-16 flex flex-col items-center">
					<ChainPilotLogo size={112} />
					<p className="mt-10 max-w-[1300px] font-display text-[48px] font-medium leading-tight">
						One platform connecting buying, stock, production and sales.{" "}
						<span className="text-sky">In real time.</span>
					</p>
					<div className="mt-12 flex items-center gap-5">
						{parts.map((p, i) => (
							<Reveal key={p} show={revealed} delay={0.6 + i * 0.1} y={16}>
								<span className="rounded-full border-2 border-white/20 px-9 py-4 text-[30px] font-medium">
									{p}
								</span>
							</Reveal>
						))}
						<Reveal show={revealed} delay={1.05} y={16}>
							<span className="flex items-center gap-3 rounded-full bg-orange px-9 py-4 text-[30px] font-medium">
								<BellRing className="size-8" /> Instant alerts
							</span>
						</Reveal>
					</div>
				</Reveal>
			</div>
		</SlideShell>
	);
}
