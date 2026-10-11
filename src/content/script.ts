/**
 * Speaker notes: the pitch script, split into "beats".
 * One beat = one press of → / Space. Each slide animates one step per beat,
 * so the number of beats per slide must match what that slide reveals.
 * Edit the wording freely; keep the number of beats per slide the same.
 */
export const script = {
	hook: [
		"If a business owner or Managing Director walks into their company right now and asks three simple questions:",
		"One: What is expiring or running low right now?",
		"Two: How much did we actually produce today versus what went to waste?",
		"Three: Which orders left the warehouse before the client actually paid?",
		"The truth is: in most growing businesses, answering those takes three phone calls, four people, and an hour of digging through Excel sheets.",
		"And if you can't answer those three questions in ten seconds, you aren't running your business on data, you're running it on guesswork. And that means losing money somewhere, somehow, every single day.",
	],
	problem: [
		"When we looked at how growing companies here in Kigali manage their day-to-day operations, we kept seeing the exact same pattern.",
		"The business has outgrown simple spreadsheets, but nothing has replaced them.",
		"Materials sit on shelves and expire before anyone notices.",
		"The factory floor uses up materials, but the spreadsheet still shows they're available in stock.",
		"And when something goes missing, nobody can tell you who moved it, or when.",
	],
	bridge: [
		"None of this is the staff's fault. They probably don't have a single tool to monitor and manage everything going on.",
		"That is exactly why we built ChainPilot: a single platform that connects buying, stock, production, and sales in real time, giving you instant alerts for all those missing pieces we just talked about.",
	],
	inside: [
		"ChainPilot is made of five connected parts, and you sign in once to use all of them.",
		"Inventory, your storeroom, always up to date. It knows every item, which batch it came from, and all about its properties, such as when to alert you if something expires or runs low. And every movement is recorded with a name and a time, so nothing disappears quietly. That's accountability.",
		"Procurement: who you buy from and what you spend. It keeps your list of approved suppliers and exactly which materials each one supplies. And it shows where your money is going: how much you're spending and how it changes over time.",
		"Production: what goes in, what comes out. It records every production run: which materials went in, which finished products came out, and what was lost or damaged, and why. Materials used are taken out of stock, and finished products are added in, automatically.",
		"Sales: from order to cash. Sales manages your clients and their orders, with VAT and commission worked out for you. Payments are recorded with proof, and goods cannot leave the warehouse until that payment is confirmed. Trusted clients are the only exception, and you decide who they are. When goods are dispatched, stock updates on its own.",
		"And the Management Console is where you invite your team and decide who works in which part. Your staff sign in with a code sent to their email, so there are no passwords to forget or share.",
	],
	connect: [
		"Raw materials arrive from an approved supplier, and they're recorded in stock.",
		"They go into production, and finished products come out, straight into stock.",
		"A client orders, pays, and the payment is confirmed.",
		"The goods are dispatched, and the stock updates itself.",
		"From the first delivery to the final payment, nobody re-types anything, and every department sees the same numbers.",
	],
	value: [
		"So what does that mean for a business?",
		"Less waste, because you're warned before stock expires.",
		"Full accountability, because every movement has a name and a time, ready for any audit.",
		"And every manager gets a live dashboard showing what needs attention today. Problems find you, instead of you hunting for them.",
	],
	useCases: [
		"We first built ChainPilot for a timber company turning wood into MDF boards. But it isn't built for one industry. If something comes in, gets stored, maybe gets transformed, and goes out, ChainPilot fits.",
		"In agriculture, a coffee washing station can record the coffee cherries it receives from each cooperative, turn them into green coffee, and trace every export bag back to its batch.",
		"In health, a pharmacy or hospital store sees every medicine batch and its expiry date before the inspector does.",
		"In food processing, a dairy or bakery tracks perishable ingredients, compares what it produced against what it wasted, and never ships an expired batch.",
		"And businesses that don't manufacture at all, like distributors and wholesalers, simply switch the production part off.",
	],
	close: [
		"At the start, we asked three simple questions: What's expiring or running low? What went to waste? And who got their goods before they paid?",
		"With ChainPilot, there are no phone calls, no chasing four people, and no waiting for Monday's Excel report.",
		"You open ChainPilot, and the answers are already there. Zero guesswork.",
		"That's ChainPilot, and we'd love to show you how it works.",
	],
	// Demo slides: talking points, not a script. Speak naturally here.
	demoExpiry: [
		"[Demo] This is the Inventory dashboard, exactly as a store manager sees it every morning.",
		"[Zoom] These cards answer question one instantly: what's low on stock and which batches are about to expire. Each one clicks through to the exact items.",
		"[Zoom] Stock in versus stock out over time, so you see exactly where your materials go.",
	],
	demoProduction: [
		"[Demo] This is a production run. You name it and set when it starts and ends.",
		"[Next screen] Inputs: which raw materials were used, from which batch. They come out of stock automatically.",
		"[Next screen] Outputs: the finished goods that came out, straight into stock. Compare the two, and you know exactly what was produced and what was lost. That's question two.",
	],
	demoDispatch: [
		"[Demo] And this is a sales order. VAT and commission are worked out as you build it.",
		"[Next screen] The client pays: the payment is recorded with proof, the EBM and the invoice reference.",
		"[Next screen] Once the payment is verified, the goods are dispatched. Until then, dispatch stays locked. Nothing leaves before you're paid. That's question three.",
	],
} satisfies Record<string, string[]>;
