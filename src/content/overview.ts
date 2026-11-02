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
 * On screen: `tagline` and `details`. In the speaker view: `say`, the
 * spoken script for that card on that side.
 */

export interface Face {
	title: string;
	tagline: string;
	details: string[];
	/** What to say about this card (speaker view only). */
	say: string;
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

/** Speaker view, before any card is highlighted. */
export const intro = {
	business: [
		"This is ChainPilot in a nutshell. At the top, you can see what it brings together: buying, stock, production and sales, connected through five applications in real time.",
		"And here's the flow: a supplier delivers materials, we stock them, production turns them into finished goods, and sales takes it from the order all the way to a verified payment.",
		"Let me take you quickly through each part.",
	],
	tech: [
		"On the tech side, ChainPilot is six React web applications and five Spring Boot services, and you sign in to all of them once, without a password.",
		"Follow the flow at the top: the browser talks to the services over REST, with live events pushed back in real time. Each request reaches a Spring Boot service, which stores its data in PostgreSQL, all running on AWS.",
		"In the top right, you can see the stack at every level: the frontend, the backend, how we kept sign-in secure and passed live data between the apps, and the DevOps behind every release.",
		"And each card now shows what that service does technically.",
	],
	/** Shown at the bottom of the business side: the bridge into the tech view. */
	toTech:
		"That's the business side of ChainPilot. Since some of you are technical, there's also a tech side. Let me flip to it.",
};

/** Highlight order when auto-rotating. */
export const tiles: OverviewTile[] = [
	{
		id: "inventory",
		Icon: Warehouse,
		business: {
			title: "Inventory",
			tagline: "Your storeroom, always up to date",
			say: "Inventory is your storeroom on screen, always up to date. For every item, it knows which batch it came from, where it's stored and when it expires, and it warns you before something expires or runs low. Every time stock moves, it records who moved it and when, so nothing can disappear without a trace.",
			details: [
				"Every batch, its location and expiry date",
				"Alerts before stock expires or runs low",
				"Every movement recorded: who and when",
			],
		},
		tech: {
			title: "Inventory service",
			tagline: "The stock ledger every app builds on",
			say: "Inventory is the central record of stock, and every other app relies on it. Whenever stock changes, the change and its history entry are saved together in one step, so the history always matches the real stock. Alerts appear on the user's screen instantly, without refreshing the page, and every morning an automatic check looks for batches close to expiry.",
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
			say: "Production records every production run: which raw materials went in, which finished products came out, and what was wasted, and why. Stock updates automatically, so nobody has to adjust it by hand.",
			details: [
				"Inputs vs outputs for every run",
				"Waste recorded, with the reason",
				"Stock updates automatically",
			],
		},
		tech: {
			title: "Production service",
			tagline: "Converts stock through Inventory's API",
			say: "The Production service doesn't change stock itself. It asks Inventory to take out the raw materials and add the finished goods in one single step, so it either all happens or none of it does. If the request is accidentally sent twice, the system recognises it and doesn't count the stock twice. And if a run is cancelled, it can be undone cleanly.",
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
			say: "Sales follows an order from start to cash. VAT and commission are calculated for you, every payment is recorded with proof, and the goods can't leave the warehouse until the payment is confirmed, except for clients you choose to trust.",
			details: [
				"VAT and commission worked out for you",
				"Payments recorded with proof",
				"No dispatch before payment is confirmed",
			],
		},
		tech: {
			title: "Sales service",
			tagline: "Payment-gated dispatch",
			say: "When goods are dispatched, the Sales service tells Inventory to remove them from stock. Each dispatch carries a unique reference, so even if someone clicks twice or the network repeats the request, the order only goes out once. The proof of payment is uploaded and kept with the payment record.",
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
			say: "Procurement keeps your list of approved suppliers and exactly which materials each one is allowed to supply. It also shows where your money goes: how much you spend, and how that changes over time.",
			details: ["Approved suppliers and their materials", "Spending tracked over time"],
		},
		tech: {
			title: "Procurement service",
			tagline: "Suppliers and spend analytics",
			say: "When you link a material to a supplier, Procurement first checks with Inventory that the item really exists. Its spending charts are calculated from the deliveries recorded in stock. And if another service is briefly unavailable, it uses the last saved copy of the data instead of showing an error.",
			details: ["Materials validated against Inventory", "Cached fallback if a service is down"],
		},
	},
	{
		id: "console",
		Icon: Users,
		business: {
			title: "Management Console",
			tagline: "Your team, your rules",
			say: "The Management Console is where you invite your team and decide who can use which app. Staff sign in with a code sent to their email, so there are no passwords to forget or share.",
			details: ["Invite staff, choose their access", "Email code sign-in, no passwords"],
		},
		tech: {
			title: "Identity & access",
			tagline: "Single sign-on for every app",
			say: "This handles sign-in for the whole platform. When you log in once, the browser keeps a secure cookie that every ChainPilot app recognises; that's why you don't log in again for each app. Behind the scenes, each app gets its own short-lived pass, valid for ten minutes, which the server checks on every request.",
			details: ["HttpOnly session cookie shared by all apps", "Short-lived access token per app (10 min)"],
		},
	},
	{
		id: "why",
		Icon: ShieldCheck,
		business: {
			title: "Why ChainPilot",
			tagline: "Problems find you",
			say: "Why ChainPilot? Because problems come to you. Every department has a live dashboard showing what needs attention today, and a complete history of every action, ready for any audit or inspection.",
			details: ["Live dashboard for every department", "Full audit trail, ready for inspection"],
		},
		tech: {
			title: "Architecture",
			tagline: "Services that talk safely",
			say: "Architecturally, the services talk to each other through standard web requests, and live updates are pushed straight to the user's screen. Requests between services are safe to repeat, so a network hiccup never creates duplicates, and if a multi-step action fails halfway, the earlier steps can be reversed.",
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
			say: "ChainPilot isn't built for one industry. Manufacturing, agriculture, health, food or distribution: if a business buys, stores, makes and sells, it fits. And if you don't manufacture, you simply switch production off.",
			details: ["Switch production off if you only buy, store and sell."],
		},
		tech: {
			title: "Tech stack",
			tagline: "Four layers, one platform",
			say: "This card goes through the technology layer by layer. The frontend is React and TypeScript, built with Vite and styled with Tailwind, across six web apps. The backend is Java with Spring Boot and a PostgreSQL database. For security, there's one passwordless sign-in shared by all apps, plus live updates pushed to the screen. And for DevOps, everything is packaged with Docker, deployed to AWS through Jenkins, and checked for quality and security with SonarQube and Trivy before every release.",
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
