/**
 * Images live in `public/assets/`.
 *
 * Demo slides are a sequence of "views", one per press of →. A view shows a
 * screenshot, optionally zoomed into a `focus` box (fractions of the image:
 * x, y = top-left corner; w, h = size). Consecutive views can use the same
 * screenshot (it just zooms) or a different one (it cross-fades, shows the
 * whole page for a moment, then zooms in).
 */

export interface AssetDef {
	src: string;
	label: string;
}

export interface LogoDef extends AssetDef {
	/** Image height ÷ visible logo height (the files have different padding). */
	padRatio: number;
}

export interface FocusBox {
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface DemoView {
	src: string;
	caption: string;
	focus?: FocusBox;
}

export interface Demo {
	module: string;
	views: DemoView[];
}

export const logos = {
	/** For white backgrounds (charcoal letters, orange E). */
	amalitechOnLight: { src: "assets/logo.png", label: "AmaliTech", padRatio: 106 / 57 },
	/** For dark-blue backgrounds (white letters, orange E). */
	amalitechOnDark: { src: "assets/logo-dark.png", label: "AmaliTech", padRatio: 106 / 44 },
} satisfies Record<string, LogoDef>;

/** All screenshots are 3246 × 1888 MacBook captures. */
export const SHOT_ASPECT = 3246 / 1888;

export const demos = {
	inventory: {
		module: "Inventory",
		views: [
			{
				src: "assets/Inventory-Dashboard.png",
				caption: "The Inventory dashboard, as a store manager sees it every morning",
			},
			{
				src: "assets/Inventory-Dashboard.png",
				caption: "Low stock and expiring batches, counted for you",
				focus: { x: 0.195, y: 0.18, w: 0.795, h: 0.16 },
			},
			{
				src: "assets/Inventory-Dashboard.png",
				caption: "Stock in vs out over time: see exactly where materials go",
				focus: { x: 0.195, y: 0.34, w: 0.61, h: 0.5 },
			},
		],
	},
	production: {
		module: "Production",
		views: [
			{
				src: "assets/production-run-finishedGoods-outputs.png",
				caption: "A production run: name it, set when it starts and ends",
			},
			{
				src: "assets/production-run-rawMaterials-inputs.png",
				caption: "Raw materials consumed, batch by batch",
				focus: { x: 0.2, y: 0.43, w: 0.78, h: 0.35 },
			},
			{
				src: "assets/production-run.png",
				caption: "Finished goods produced, straight into stock",
				focus: { x: 0.185, y: 0.38, w: 0.8, h: 0.42 },
			},
		],
	},
	sales: {
		module: "Sales",
		views: [
			{
				src: "assets/sales-order.png",
				caption: "A sales order, with VAT and commission worked out for you",
			},
			{
				src: "assets/sales-payment-recorded.png",
				caption: "Payment recorded with proof, EBM and invoice reference",
				focus: { x: 0.205, y: 0.3, w: 0.775, h: 0.63 },
			},
			{
				src: "assets/sales-dispatched.png",
				caption: "Payment verified, then dispatched. Nothing leaves before you're paid",
				focus: { x: 0.195, y: 0.09, w: 0.79, h: 0.57 },
			},
		],
	},
} satisfies Record<string, Demo>;

export const allAssetSrcs = [
	...Object.values(logos).map((a) => a.src),
	...new Set(Object.values(demos).flatMap((d) => d.views.map((v) => v.src))),
];
