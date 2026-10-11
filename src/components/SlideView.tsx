import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { slides } from "../slides";
import { easeBrand } from "./ui";

const BG = { dark: "#08283b", light: "#ffffff" } as const;

const variants = {
	enter: (dir: number) => ({ opacity: 0, x: 90 * dir }),
	center: { opacity: 1, x: 0 },
	exit: (dir: number) => ({ opacity: 0, x: -90 * dir }),
};

/** Renders one slide at a given beat, with direction-aware transitions. */
export function SlideView({ slide, step }: { slide: number; step: number }) {
	const [shown, setShown] = useState(slide);
	const [dir, setDir] = useState(1);
	if (slide !== shown) {
		setDir(slide > shown ? 1 : -1);
		setShown(slide);
	}
	const def = slides[slide];

	return (
		<motion.div
			className="absolute inset-0"
			initial={false}
			animate={{ backgroundColor: BG[def.tone] }}
			transition={{ duration: 0.6, ease: easeBrand }}
		>
			<AnimatePresence initial={false} custom={dir}>
				<motion.div
					key={slide}
					className="absolute inset-0"
					custom={dir}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{ duration: 0.55, ease: easeBrand }}
				>
					<def.Component step={step} />
				</motion.div>
			</AnimatePresence>
		</motion.div>
	);
}
