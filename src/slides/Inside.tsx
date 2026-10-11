import { Banknote, Factory, Handshake, Users, Warehouse } from "lucide-react";
import { motion } from "motion/react";
import { Eyebrow, IconTile, Reveal, SlideShell, easeBrand } from "../components/ui";
import type { SlideProps } from "./types";

const modules = [
	{
		Icon: Warehouse,
		name: "Inventory",
		tagline: "Your storeroom, always up to date",
		points: ["Every batch and its expiry date", "Alerts before stock expires or runs low", "Every movement: who and when"],
	},
	{
		Icon: Handshake,
		name: "Procurement",
		tagline: "Who you buy from, what you spend",
		points: ["Approved suppliers and their materials", "Spending tracked over time"],
	},
	{
		Icon: Factory,
		name: "Production",
		tagline: "What goes in, what comes out",
		points: ["Inputs vs outputs for every run", "Waste recorded, with the reason", "Stock updates automatically"],
	},
	{
		Icon: Banknote,
		name: "Sales",
		tagline: "From order to cash",
		points: ["VAT and commission worked out", "No dispatch before payment is confirmed", "Trusted clients: your call"],
	},
	{
		Icon: Users,
		name: "Management Console",
		tagline: "Your team, your rules",
		points: ["Invite staff, choose their access", "Email code sign-in, no passwords"],
	},
];

export function Inside({ step }: SlideProps) {
	return (
		<SlideShell tone="dark" label="04">
			<Eyebrow>What's inside</Eyebrow>
			<Reveal show className="mt-8">
				<h2 className="text-[84px]">
					Five connected parts. <span className="text-sky">One sign-in.</span>
				</h2>
			</Reveal>

			<div className="relative mt-20 grid grid-cols-5 gap-6">
				{/* the "connected" line running through every module */}
				<div className="absolute left-[60px] right-[60px] top-[92px] h-[4px] rounded-full bg-white/10" />
				<motion.div
					className="absolute left-[60px] right-[60px] top-[92px] h-[4px] origin-left rounded-full bg-sky/60"
					initial={false}
					animate={{ scaleX: Math.max(0, step - 1) / 4 }}
					transition={{ duration: 0.8, ease: easeBrand }}
				/>
				{modules.map(({ Icon, name, tagline, points }, i) => {
					const shown = step >= i + 1;
					const current = step === i + 1;
					return (
						<Reveal key={name} show={shown} y={40}>
							<div
								className={`relative flex h-[620px] flex-col rounded-[36px] px-7 pb-8 pt-12 transition-colors duration-500 ${
									current ? "bg-white/12" : "bg-white/5"
								}`}
							>
								<motion.div
									className="absolute left-8 right-8 top-0 h-[6px] origin-left rounded-b-full bg-orange"
									initial={false}
									animate={{ scaleX: current ? 1 : 0 }}
									transition={{ duration: 0.5, ease: easeBrand }}
								/>
								<IconTile size={88} spin={current}>
									<Icon className="size-11" strokeWidth={1.75} />
								</IconTile>
								<h3 className="mt-8 text-[34px]">{name}</h3>
								<p className="mt-3 text-[23px] leading-snug text-sky">{tagline}</p>
								<ul className="mt-6 flex flex-col gap-3">
									{points.map((p) => (
										<li key={p} className="flex gap-3 text-[21px] leading-snug text-white/80">
											<span className="mt-[10px] size-[7px] shrink-0 rounded-full bg-white/50" />
											{p}
										</li>
									))}
								</ul>
							</div>
						</Reveal>
					);
				})}
			</div>
		</SlideShell>
	);
}
