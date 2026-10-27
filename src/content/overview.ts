import {
	Banknote,
	Coffee,
	Factory,
	Handshake,
	type LucideIcon,
	Milk,
	Pill,
	ShieldCheck,
	Sparkles,
	Store,
	Users,
	Warehouse,
} from "lucide-react";

/**
 * The overview page (key O, or the /#/overview link).
 * Every tile has a business face and a tech face (key T flips between them).
 * `tagline` is always visible; `details` appear when the tile is highlighted.
 */

export interface Face {
	title: string;
	tagline: string;
	details: string[];
}

export interface OverviewTile {
	id: string;
	Icon: LucideIcon;
	business: Face;
	tech: Face;
}

/** Colour per tech layer, used in the hero flow, the rotating tile and the stack band. */
export type LayerTone = "sky" | "sun" | "white" | "green" | "orange";

export const hero = {
	business: {
		headline: "Buying, stock, production and sales. Connected, in real time.",
		flow: ["Supplier", "Stock", "Production", "Sales", "Paid"],
	},
	tech: {
		headline: "6 React web apps. 5 Spring Boot services. One passwordless sign-in.",
		flow: [
			{ label: "Browser", tone: "sky" },
			{ label: "REST + live events", tone: "sun" },
			{ label: "Spring Boot", tone: "green" },
			{ label: "PostgreSQL", tone: "green" },
			{ label: "AWS", tone: "orange" },
		] as { label: string; tone: LayerTone }[],
	},
};

/** Highlight order when auto-rotating. */
export const tiles: OverviewTile[] = [
	{
		id: "inventory",
		Icon: Warehouse,
		business: {
			title: "Inventory",
			tagline: "Your storeroom, always up to date",
			details: [
				"Every batch, its location and expiry date",
				"Alerts before stock expires or runs low",
				"Every movement recorded: who and when",
			],
		},
		tech: {
			title: "Inventory service",
			tagline: "The stock ledger every app builds on",
			details: [
				"Audit journal written in the same transaction",
				"Live alerts pushed with Server-Sent Events",
				"Daily scheduled expiry scan",
			],
		},
	},
	{
		id: "production",
		Icon: Factory,
		business: {
			title: "Production",
			tagline: "What goes in, what comes out",
			details: [
				"Inputs vs outputs for every run",
				"Waste recorded, with the reason",
				"Stock updates automatically",
			],
		},
		tech: {
			title: "Production service",
			tagline: "Converts stock through Inventory's API",
			details: [
				"Consume and produce in one transaction",
				"Idempotent requests: safe to retry",
				"Compensating undo if a run is reverted",
			],
		},
	},
	{
		id: "sales",
		Icon: Banknote,
		business: {
			title: "Sales",
			tagline: "From order to cash",
			details: [
				"VAT and commission worked out for you",
				"Payments recorded with proof",
				"No dispatch before payment is confirmed",
			],
		},
		tech: {
			title: "Sales service",
			tagline: "Payment-gated dispatch",
			details: [
				"Dispatch creates a stock-out in Inventory",
				"Idempotency keys prevent double dispatch",
				"Proof-of-payment file uploads",
			],
		},
	},
	{
		id: "procurement",
		Icon: Handshake,
		business: {
			title: "Procurement",
			tagline: "Who you buy from, what you spend",
			details: ["Approved suppliers and their materials", "Spending tracked over time"],
		},
		tech: {
			title: "Procurement service",
			tagline: "Suppliers and spend analytics",
			details: ["Materials validated against Inventory", "Cached fallback if a service is down"],
		},
	},
	{
		id: "console",
		Icon: Users,
		business: {
			title: "Management Console",
			tagline: "Your team, your rules",
			details: ["Invite staff, choose their access", "Email code sign-in, no passwords"],
		},
		tech: {
			title: "Identity & access",
			tagline: "Single sign-on for every app",
			details: ["HttpOnly session cookie shared by all apps", "Short-lived access token per app (10 min)"],
		},
	},
	{
		id: "why",
		Icon: ShieldCheck,
		business: {
			title: "Why ChainPilot",
			tagline: "Problems find you",
			details: ["Live dashboard for every department", "Full audit trail, ready for inspection"],
		},
		tech: {
			title: "Architecture",
			tagline: "Services that talk safely",
			details: [
				"REST between services, live updates over SSE",
				"Safe retries: idempotency keys, compensating undo",
			],
		},
	},
	{
		id: "sectors",
		Icon: Sparkles,
		business: {
			title: "Built for",
			tagline: "Any business that buys, stores, makes and sells",
			details: ["Switch production off if you only buy, store and sell."],
		},
		tech: {
			title: "Tech stack",
			tagline: "Four layers, one platform",
			details: [
				"React and TypeScript web apps",
				"Java Spring Boot services on PostgreSQL",
				"Passwordless cookie sign-in, live Server-Sent Events",
				"Docker, AWS, Jenkins, SonarQube",
			],
		},
	},
];

export const sectors: { Icon: LucideIcon; label: string }[] = [
	{ Icon: Factory, label: "Manufacturing" },
	{ Icon: Coffee, label: "Agriculture" },
	{ Icon: Pill, label: "Health" },
	{ Icon: Milk, label: "Food" },
	{ Icon: Store, label: "Distribution" },
];

/**
 * The tech stack in four layers. Shown in the bottom band, and cycled one
 * layer at a time in the "Built for" tile when the tech view is on.
 */
export const techLayers: {
	layer: string;
	tone: LayerTone;
	title: string;
	tagline: string;
	items: string[];
	line: string;
}[] = [
	{
		layer: "Frontend",
		tone: "sky",
		title: "Frontend",
		tagline: "6 single-page web apps",
		items: ["React 19", "TypeScript", "Vite", "TanStack", "Tailwind CSS"],
		line: "One shared UI library across every app.",
	},
	{
		layer: "Backend",
		tone: "green",
		title: "Backend",
		tagline: "5 Spring Boot services",
		items: ["Java 21", "Spring Boot 4", "PostgreSQL 16", "Flyway"],
		line: "Each service owns its own database.",
	},
	{
		layer: "Security & live data",
		tone: "sun",
		title: "Security & live data",
		tagline: "One sign-in, live updates",
		items: ["Session cookie SSO", "Passwordless login", "Server-Sent Events"],
		line: "Alerts are pushed to the browser instantly.",
	},
	{
		layer: "DevOps",
		tone: "orange",
		title: "DevOps",
		tagline: "Tested, scanned, shipped",
		items: ["Docker", "AWS", "Jenkins", "SonarQube", "Trivy"],
		line: "Every release passes quality and security gates.",
	},
];

/** Seconds each tile stays highlighted while auto-rotating. */
export const ROTATE_SECONDS = 6;

/** Seconds each layer shows in the rotating tech-stack tile. */
export const LAYER_SECONDS = 3;
