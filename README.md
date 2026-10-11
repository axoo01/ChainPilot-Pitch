# ChainPilot Pitch Presentation

An interactive, browser-based pitch deck for **ChainPilot**, a platform that connects buying, stock, production and sales for businesses that turn raw materials into finished products.

It runs in two modes:

- **Stand loop:** a self-running sequence that draws attention when nobody is presenting.
- **Pitch:** an animated slide deck that builds step by step with the presenter.

A separate **speaker view** gives the presenter the script, previews, a timer and full control. It stays in sync with the audience screen.

## Features

- **Stand loop.** Short scenes with large type cycle on their own. Any key or click starts the pitch.
- **Step-by-step slides.** Each key press reveals the next point, so the screen follows the speaker.
- **Demo slides.** Real product screenshots in a browser frame. Each step zooms into the part that matters, and a new screenshot cross-fades in when the screen changes.
- **Speaker view:**
  - live preview of the audience screen
  - preview of the next step
  - the script, with the current line highlighted
  - pitch timer against a 5-minute target
  - one-click jump to any slide
- **Two-window sync.** Uses the browser's `BroadcastChannel`, so no server or internet connection is needed between the windows.
- **Scales to any screen.** Designed on a 16:9 canvas and letterboxed to fit any display or window size without distortion.
- **Auto-return.** After 2 minutes without input on a pitch slide, the deck returns to the stand loop. The speaker view warns 20 seconds before. Demo slides are exempt.
- **Works offline.** Fonts and images are bundled; nothing loads from external services.
- **Accessible motion.** Respects the operating system's "reduce motion" setting.

## Getting started

Requires Node.js 20.19 or later.

```bash
npm install
npm run dev       # development server
npm run build     # production build in dist/
npm run preview   # serve the production build locally
npm start         # build, then preview
```

## Presenting

1. Open the deck in a browser. This is the audience window.
2. Press **S** to open the speaker view in a second window.
3. Move the audience window to the display your audience sees, then press **F** for fullscreen.
4. Control the deck from either window. The speaker view shows whether it is connected to the audience window.

The speaker view can also be opened directly by adding `#/speaker` to the deck's URL.

### Keyboard shortcuts

| Key | Action |
|---|---|
| → / Space / Enter | Next step (starts the pitch from the stand loop) |
| ← | Previous step |
| D | Jump to the demo slides |
| L / Esc | Return to the stand loop |
| B | Black out the audience screen (press again to restore) |
| K | Keep: cancel the pending auto-return |
| R | Reset the timer |
| F | Toggle fullscreen (audience window) |
| S | Open the speaker view (audience window) |
| Home / End | First / last slide |

Presentation clickers work too, because they send the same keys.

## Customising content

| What | Where |
|---|---|
| Speaker script | `src/content/script.ts`. One line is one step, and each slide needs as many lines as it has steps. |
| Slide text and layout | `src/slides/*.tsx` |
| Demo screenshots, captions and zoom areas | `src/content/assets.ts`, with images in `public/assets/` |
| Icon animation speed and angle | `iconMotion` in `src/components/ui.tsx` |
| Brand colours and fonts | `src/styles.css` |

## Project structure

```
src/
  Audience.tsx        audience window: stand loop, slides, idle return
  Speaker.tsx         speaker view
  components/         stage scaling, brand elements, stand loop, shared UI
  slides/             one file per slide, plus the running order (index.ts)
  content/            script and asset configuration
  lib/                deck navigation, window sync, keyboard shortcuts
```

## Tech stack

- [Vite](https://vite.dev) with React and TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- [Motion](https://motion.dev) for animation
- [Lucide](https://lucide.dev) icons
- Poppins and Inter fonts, bundled through [Fontsource](https://fontsource.org)

## Deployment

The build output is a static site, so any static host works. On Vercel, the framework preset is detected automatically (build command `npm run build`, output directory `dist`).
