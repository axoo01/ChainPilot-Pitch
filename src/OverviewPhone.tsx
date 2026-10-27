import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AmaliTechLogo, ChainPilotLogo } from "./components/brand";
import { IconTile, easeBrand, layerTone } from "./components/ui";
import { hero, sectors, techLayers, tiles } from "./content/overview";

/**
 * /#/overview on a phone: the same content as the TV overview, stacked in a
 * scrolling page. Tap a card to open it; the switch flips business ↔ tech.
 * No auto-rotation: people read at their own pace.
 */
export function OverviewPhone() {
	const [tech, setTech] = useState(false);
	const [open, setOpen] = useState<number | null>(0);
	const headline = tech ? hero.tech.headline : hero.business.headline;
	const flow = tech
		? hero.tech.flow
		: hero.business.flow.map((label) => ({ label, tone: null }));

	return (
		<div className="h-full overflow-y-auto bg-navy text-white">
			<div className="mx-auto max-w-xl px-5 pb-12 pt-6">
				<header className="flex items-center justify-between">
					<ChainPilotLogo size={24} />
					<AmaliTechLogo height={12} />
				</header>

				<div className="mt-6 flex rounded-full bg-white/10 p-1 text-sm font-medium">
					{(["Business", "Tech"] as const).map((v, i) => (
						<button
							key={v}
							type="button"
							onClick={() => setTech(i === 1)}
							className={`flex-1 rounded-full py-2 transition-colors ${
								(i === 1) === tech ? "bg-white text-navy" : "text-white/70"
							}`}
						>
							{v} view
						</button>
					))}
				</div>

				<AnimatePresence mode="wait" initial={false}>
					<motion.section
						key={String(tech)}
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -12 }}
						transition={{ duration: 0.3, ease: easeBrand }}
					>
						<h1 className="mt-7 text-[30px] leading-[1.15]">{headline}</h1>
						<div className="mt-5 flex flex-wrap items-center gap-2">
							{flow.map(({ label, tone }, i) => (
								<span key={label} className="flex items-center gap-2">
									{i > 0 && <ArrowRight className="size-3.5 text-white/40" />}
									<span
										className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm ${
											tone ? `border ${layerTone[tone].chip}` : "bg-white/10"
										}`}
									>
										{tone && <span className={`size-1.5 rounded-full ${layerTone[tone].dot}`} />}
										{label}
									</span>
								</span>
							))}
						</div>

						<ul className="mt-8 space-y-3">
							{tiles.map((t, i) => {
								const face = tech ? t.tech : t.business;
								const isOpen = open === i;
								return (
									<li key={t.id} className="overflow-hidden rounded-2xl bg-white/[0.06]">
										<button
											type="button"
											onClick={() => setOpen(isOpen ? null : i)}
											className="flex w-full items-center gap-4 p-4 text-left"
											aria-expanded={isOpen}
										>
											<IconTile size={44}>
												<t.Icon className="size-6" strokeWidth={1.75} />
											</IconTile>
											<span className="min-w-0 flex-1">
												<span className="block font-display text-lg font-semibold">{face.title}</span>
												<span className="block text-sm text-sky">{face.tagline}</span>
											</span>
											<ChevronDown
												className={`size-5 shrink-0 text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
											/>
										</button>
										<AnimatePresence initial={false}>
											{isOpen && (
												<motion.div
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: "auto", opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{ duration: 0.3, ease: easeBrand }}
												>
													{t.id === "sectors" && !tech && (
														<div className="flex flex-wrap gap-2 px-4">
															{sectors.map(({ Icon, label }) => (
																<span
																	key={label}
																	className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm"
																>
																	<Icon className="size-4 text-sky" /> {label}
																</span>
															))}
														</div>
													)}
													<ul className="space-y-2 px-4 pb-4 pt-3">
														{face.details.map((d) => (
															<li key={d} className="flex gap-2.5 text-[15px] leading-snug text-white/85">
																<span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-orange" />
																{d}
															</li>
														))}
													</ul>
												</motion.div>
											)}
										</AnimatePresence>
									</li>
								);
							})}
						</ul>
					</motion.section>
				</AnimatePresence>

				<section className="mt-10">
					<h2 className="text-xl">Tech stack</h2>
					<div className="mt-4 space-y-4">
						{techLayers.map(({ layer, tone, items }) => (
							<div key={layer}>
								<p
									className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] ${layerTone[tone].text}`}
								>
									<span className={`size-1.5 rounded-full ${layerTone[tone].dot}`} />
									{layer}
								</p>
								<div className="mt-2 flex flex-wrap gap-2">
									{items.map((it) => (
										<span key={it} className="rounded-full bg-white/[0.08] px-3 py-1 text-sm">
											{it}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
