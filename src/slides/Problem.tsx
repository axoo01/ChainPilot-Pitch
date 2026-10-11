import { CalendarX, FileSpreadsheet, PackageX, SearchX } from "lucide-react";
import { Eyebrow, IconTile, Reveal, SlideShell } from "../components/ui";
import type { SlideProps } from "./types";

const findings = [
	{
		Icon: FileSpreadsheet,
		title: "Outgrown spreadsheets",
		body: "The business grew. Nothing replaced the spreadsheets.",
	},
	{
		Icon: CalendarX,
		title: "Expiring unnoticed",
		body: "Materials sit on shelves and expire before anyone notices.",
	},
	{
		Icon: PackageX,
		title: "Stock that isn't there",
		body: "The factory used it up. The spreadsheet still says it's in stock.",
	},
	{
		Icon: SearchX,
		title: "No trail",
		body: "Something goes missing, and nobody knows who moved it, or when.",
	},
];

export function Problem({ step }: SlideProps) {
	return (
		<SlideShell tone="light" label="02" strokes="left">
			<Eyebrow tone="light">What we found in Kigali</Eyebrow>
			<Reveal show className="mt-8">
				<h2 className="text-[84px]">Growing businesses. The same pattern.</h2>
			</Reveal>

			<div className="mt-16 grid grid-cols-2 gap-10">
				{findings.map(({ Icon, title, body }, i) => (
					<Reveal key={title} show={step >= i + 1} delay={0.05}>
						<div
							className={`flex h-[230px] items-center gap-10 rounded-[40px] bg-mist px-12 transition-shadow duration-500 ${
								step === i + 1 ? "shadow-[inset_8px_0_0_var(--color-orange)]" : ""
							}`}
						>
							<IconTile tone="light" size={112} spin={step === i + 1}>
								<Icon className="size-14" strokeWidth={1.75} />
							</IconTile>
							<div>
								<h3 className="text-[44px]">{title}</h3>
								<p className="mt-3 text-[30px] leading-snug text-navy/70">{body}</p>
							</div>
						</div>
					</Reveal>
				))}
			</div>
		</SlideShell>
	);
}
