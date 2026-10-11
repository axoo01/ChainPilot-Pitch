import { LayoutDashboard, Recycle, ShieldCheck } from "lucide-react";
import { Eyebrow, IconTile, Reveal, SlideShell } from "../components/ui";
import type { SlideProps } from "./types";

const outcomes = [
	{
		Icon: Recycle,
		title: "Less waste",
		body: "You're warned before stock expires, not after.",
	},
	{
		Icon: ShieldCheck,
		title: "Full accountability",
		body: "Every movement has a name and a time. Ready for any audit.",
	},
	{
		Icon: LayoutDashboard,
		title: "Problems find you",
		body: "Every manager gets a live dashboard of what needs attention today.",
	},
];

export function Value({ step }: SlideProps) {
	return (
		<SlideShell tone="dark" label="06">
			<Eyebrow>What it means for you</Eyebrow>
			<Reveal show className="mt-8">
				<h2 className="text-[84px]">So what does that mean for a business?</h2>
			</Reveal>

			<div className="mt-24 grid grid-cols-3 gap-[72px]">
				{outcomes.map(({ Icon, title, body }, i) => (
					<Reveal key={title} show={step >= i + 1} y={48}>
						<div className="flex flex-col">
							<IconTile size={120} spin={step === i + 1}>
								<Icon className="size-16" strokeWidth={1.6} />
							</IconTile>
							<div className="mt-12 h-[6px] w-16 rounded-full bg-orange" />
							<h3 className="mt-8 text-[68px]">{title}</h3>
							<p className="mt-6 text-[34px] leading-snug text-white/75">{body}</p>
						</div>
					</Reveal>
				))}
			</div>
		</SlideShell>
	);
}
