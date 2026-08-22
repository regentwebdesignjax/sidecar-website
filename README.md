# Sidecar — marketing website

The marketing site for [Sidecar](https://sidecar.regentmediagroup.com), an
envelope budgeting app for iOS. Built with Next.js, exported as a static site,
and hosted on Netlify.

The site also carries three pages App Store Connect requires to resolve publicly
before review: `/privacy`, `/terms` and `/support`.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build     # static export into ./out
npx serve out     # preview exactly what Netlify will serve
```

## Deploying to Netlify

Connect the repository and Netlify picks up `netlify.toml`:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `out` |
| Node version | 22 (set in `netlify.toml`) |

No Next.js runtime plugin is needed — `next.config.ts` sets `output: "export"`,
so the whole site is static HTML, CSS and JS.

### The contact form

The form uses **Netlify Forms**, which registers a form by parsing the deployed
HTML for `data-netlify` at build time. It is declared in two places, both named
`contact` and carrying identical fields:

1. **The real form on `/contact`.** The static export prerenders it, so the
   crawler sees `name`, `method="POST"`, `data-netlify="true"`,
   `netlify-honeypot="bot-field"` and the hidden `form-name` input in the
   output. (`data-netlify` is the JSX-safe spelling of the bare `netlify`
   attribute in Netlify's docs — they are equivalent, and a valueless attribute
   cannot be written in JSX.)
2. **`public/__forms.html`**, a static declaration of the same form. This is the
   documented fallback for a framework that renders its forms with JavaScript,
   and it is what the submit handler POSTs to.

Keeping both is deliberate: if the form ever stops being prerendered, detection
would otherwise fail silently. **Don't delete `public/__forms.html`** — the
submit handler posts to it.

If you change the form's fields, change them in both places, or Netlify's
recorded schema will disagree with what is actually submitted.

After the first deploy: open **Netlify → Forms → contact**, turn on email
notifications, and send one real test submission to confirm it arrives.

## Before launch

- [ ] **`appStoreUrl` in `lib/site.config.ts`.** It's empty, so every download
      button renders a "Coming soon to the App Store" state. Paste the real App
      Store link there and every button across the site goes live. It's the only
      edit needed.
- [ ] Enable form notifications in Netlify and send a test submission.
- [ ] Read the `{/* EDIT ME */}` founder story on `/about` and adjust the wording.

## Where this repo lives

The working copy is at `~/Developer/sidecar-website` on the internal drive, and
is symlinked back into the client folder on the external drive as
`Sidecar Website/Website`. Both paths work; they are the same directory.

This is deliberate. The external drive is exFAT, which cannot store macOS
extended attributes natively, so macOS writes a `._name` companion beside every
file. That broke three separate things while this site was being built:
Turbopack's cache refused to open, an accidental `node_modules` upload, and — the
serious one — `._main` and `._HEAD` files inside `.git/refs/`, which git rejects
as invalid ref names and which stopped GitHub Desktop from loading the repo at
all.

On APFS none of those companions are created. A full `npm ci` and build produces
zero of them.

## A note on this volume

Kept as a safety net in case the repo is ever worked on from an exFAT volume
again (see above). On APFS it finds nothing and exits immediately.

On exFAT, macOS writes a companion `._name` file beside every real file.

Turbopack's persistent cache names its files numerically (`00000001.sst`) and
parses those names as integers when it opens the store. It would hit
`._00000001.sst` and fail on startup with:

```
Failed to open database
Caused by: Loading persistence directory failed
           invalid digit found in string
```

`scripts/strip-appledouble.mjs` removes those companions from `.next` and `out`,
and runs automatically from `predev` and `prebuild`. It keeps the cache itself
(the companions only hold extended attributes, which the build output does not
use), never fails the build, and is a no-op on Netlify's Linux builders.

If you ever run `next dev` directly instead of `npm run dev`, the hook won't
fire — run `node scripts/strip-appledouble.mjs` first, or just use `npm run dev`.

## How it's put together

```
app/                 one folder per route, plus sitemap.ts and robots.ts
components/
  motion/            GSAP setup, Lenis smooth scroll, reveal primitives
  sections/          homepage sections and the envelope stage
  site/              nav, footer, logo, App Store badge, legal layout
  three/             the WebGL envelope field
  ui/                button, Hero10, FeatureCarousel
lib/                 site config, feature and pricing data, cn()
public/              images, device crops, logos, icons, __forms.html
scripts/             one-time asset preparation (see below)
```

### Design tokens

Colours and type in `app/globals.css` are lifted directly from the iOS app's own
stylesheet (`Sidecar.dc.html` in the design handoff) so the app and the site are
one system rather than two. The core pair is `#035352` Authentic Teal and
`#F3E8BC` Sidecar Yellow.

### Light and dark

There is a toggle in the nav, and three states:

| State | Behaviour |
| --- | --- |
| No `data-theme` on `<html>` | Follow the operating system. This is what a visitor with JavaScript disabled always gets. |
| `data-theme="light"` | Explicit choice — beats a dark system. |
| `data-theme="dark"` | Explicit choice — beats a light system. |

`components/theme/theme.ts` holds the whole mechanism. `THEME_SCRIPT` is inlined
render-blocking into `<head>` by the root layout: it resolves the stored choice
(or the system preference) onto `<html data-theme>` before the first paint, so
there is no flash of the wrong theme. The choice persists in `localStorage` and
syncs across tabs. If the visitor has never chosen, the site keeps following the
system setting live.

The palette appears twice in `globals.css` — once inside the
`prefers-color-scheme` media block, scoped with `:not([data-theme="light"])`,
and once under `:root[data-theme="dark"]`. **Keep the two in sync.**

Theme-dependent artwork (the logo lockups, the toggle's sun and moon) ships both
versions and lets CSS pick via `[data-theme-show]`, so the right one is painted
on the first frame with no hydration flash. The WebGL scene reads the effective
theme through `useTheme()` and relights itself to match.

Three typefaces, each with one job:

- **Instrument Serif** — display headings and every figure, as in the app
- **Plus Jakarta Sans** — UI and body copy
- **Alan Sans** — the `sidecar` logotype only, self-hosted from
  `app/fonts/` because it isn't in `next/font/google` yet

### The envelope scene

`components/three/` renders instanced 3D envelopes on a single WebGL canvas that
is sticky across the hero and the "how it works" act. A GSAP ScrollTrigger
writes scroll progress into a ref that the render loop reads, so scrolling never
causes a React re-render. The envelopes rest in a ring sized to the visible
viewport — which keeps them clear of the copy at any aspect ratio — and assemble
into a grid as the act scrolls past.

It degrades in two steps: without WebGL, or under `prefers-reduced-motion`, the
canvas is skipped and Lenis is never started. Every page is complete and
readable with JavaScript disabled entirely.

### Assets

Source artwork is **not** committed. It lives with the rest of the client files
on the external drive, in `Sidecar Website/` alongside `Screenshots/`, `Images/`,
`Logos/` and `App Icon/`.

`scripts/assets-dir.mjs` locates that folder: it honours `$SIDECAR_ASSETS`
first, then looks beside the repo, then falls back to the known path on the
drive. If it cannot find the artwork it says so and tells you how to point at
it, rather than failing obscurely:

```bash
SIDECAR_ASSETS="/path/to/Sidecar Website" node scripts/build-device-images.mjs
```

Two scripts turn that artwork into what `public/` serves. Both read from the
source and write into `public/`, so they are safe to re-run — re-run them only
if the source artwork changes:

```bash
node scripts/optimize-assets.mjs       # WebP conversion, resizing, PWA icons
node scripts/build-device-images.mjs   # app screenshots, from ../Screenshots/RAW
node scripts/build-favicon.mjs         # favicon.ico + favicon PNGs
```

`build-favicon.mjs` is the exception to "source lives on the external drive":
its source, `public/sidecar-favicon.png`, is checked into the repo, because
it's a favicon-specific mark rather than a crop of a larger asset — the app
icon (`icon-1024.png`) is the wordmark, which is legible at app-icon size but
turns into a smear at 16–32px, so a dedicated car-only glyph is used for the
browser tab instead. `next build` picks up `app/favicon.ico` automatically by
file convention; sharp can't write `.ico` directly, so the script packs
PNG-compressed frames into one by hand, which every modern browser accepts.

The app screenshots come from `../Screenshots/RAW` — clean full-bleed 1320x2868
device captures with square corners. The corner radius is applied in CSS by the
`.screen-radius` utility rather than baked into the image, which keeps it a true
circular arc at every rendered size:

> Apple's display corner radius is 12.5% of the screen's width — 55pt across a
> 440pt screen. Expressed as a percentage pair (`12.5% / 5.7531%`, the second
> figure being the first scaled by the image's aspect ratio), both axes resolve
> to the same number of pixels at any size. A fixed `rem` radius cannot do this:
> the value that looks right at 290px wide is far too round at 180px on a phone.

`.screen-radius` is calibrated to the 1320:2868 ratio, so pair it with
`aspect-[660/1434]` — a different ratio makes the corners elliptical. Any
container holding one must also be tall enough for that ratio; if it is short,
the aspect ratio gives way and the corners distort with it.

Static export disables the Next.js image optimizer, which is why sizes are baked
in ahead of time rather than negotiated at request time.
