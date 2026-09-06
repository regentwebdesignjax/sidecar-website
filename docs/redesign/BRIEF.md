# BRIEF: Sidecar homepage redesign

Interviewed, not self-authored. User answers are verbatim under each topic.
Authored decisions are labelled. Signature move: option A, chosen by the user
("Option A is good").

Date: 2026-09-05. Build folder: scrollcraft/builds/sidecar-home.

## Context carried in from the existing site (evidence, not assumption)

- Product: Sidecar, envelope budgeting for iOS. Free. No bank connection, no
  ads, no analytics. Built for two people sharing one budget. Live on the App
  Store since 2026-08-29 (v1.0.1, id 6802113235), verified via Apple lookup.
- Design system stays: Authentic Teal #035352, Sidecar Yellow #F3E8BC, paper
  #F7F0DB, deep #04201E; Instrument Serif (display + figures), Plus Jakarta
  Sans (UI/body), Alan Sans (wordmark only). Real logos, app icon, 10 raw
  1320x2868 device screenshots, 3 photographs.
- Brand hard rules: no invented statistics (no verified public figures exist,
  so no counters). Terms promise existing free functionality stays free; the
  planned paid tier (Sidecar Plus) gates only new accounts.
- CTA everywhere: "Download on the App Store" -> live App Store link.
- Reference the user supplied: a light fintech landing page (person cutout
  floating among UI cards, one highlighted headline word, trust strip, bento
  of stats, feature cards). Taken for mood and moves, not layout.

## 1. Vibe

> "I want it to feel contemporary, modern, simple"

No non-web references supplied. Authored reading of the supplied web
reference: light, airy, product-forward, one highlighted word, real UI
floating in space. Premium-minimal family (uniqueness.md §5), chosen by the
user's words and reference, not by default.

## 2. The scroll journey, in the user's words

> "The visitor is welcomed by an eye-catching hero, and in many similar to
> the current website. What I mainly want to capture is a more premium look
> and feel. First they see an eye-catching hero, then they realize how much
> they need Sidecar to help keep their finances organized, then they see how
> it works, then they see a showcase of UI samples, then emphasize the
> priority of privacy when using the app, then how the app helps couples
> manage one household budget from two phones, and then they see a
> call-to-action to download the app while it's currently a free download
> (but won't be for long)."

Authored note on the close: the user's own Terms and pricing page promise
that what free users rely on stays free (Plus gates new accounts only). The
close will say "free today" and point at Plus honestly; it will not imply the
app stops being free. Flagged to the user.

## 3. Energy

> "It should feel calming throughout but the motions should feel smooth and
> airy, like a metaphor for how the users will feel when using the app."

## 4. Feeling, and the one moment

> "I think once the users see the UI interface this is the 'light bulb'
> moment where they're supposed to say, 'Wow! This looks like it's incredibly
> simple to setup and use. No more bloated apps. Just a straightforward,
> plain and simple app to manage our household budget.'"

## 5. One thing no site does (signature move seed)

> "I'd like you to propose some options based on your grasp of the brand
> system, and brand voice."

Delegated. Three options proposed to the user (see Open decisions).

## 6. Aesthetic range

Premium-minimal, light-led, per §1. Not brutalist, maximalist, playful,
retro, dense, or editorial.

## 7. One world or distinct scenes

> "Definitely distinct scenes"

## 8. Assets

> "I have a kie.ai API key. Let me know how you'd like me to provide that. I
> would prefer you to generate the appropriate and relevant images you think
> would be best."

Real assets: logos, app icon, 10 device screenshots, 3 photos (two of a couple
at a table, one hand holding the phone in a cafe). Generation: kie.ai stills
for the hero planes and scene grounds. No video (no ffmpeg on this machine,
and the brief's "calm, airy" asks for planes, not footage).

## Scope and site structure (question 7 of the first pass)

> "Yes, I think the story should live on the homepage, but don't be afraid
> to apply some of the full story experience from the homepage to the
> interior pages, even subtly."

Homepage is the story page. Inner pages keep their structure and are
restyled to the same floor, with one or two of the story's moves echoed.

## Light and dark (question 9)

> "I kind of like a healthy mixture of light and dark."

Authored: the mixture is structural. Scenes alternate paper and teal grounds
with hard cuts. The homepage grounds are authored constants, not themed; the
site's light/dark toggle keeps governing chrome and inner pages.

## The one belief (question 10)

> "Honey, I think we need to give this app a try. It looks so easy!"

## Grammar (authored)

None of the eight fits without breaking the interview: filmic one-shot
forbids the hard cuts the user chose; chaptered editorial forbids media
above the fold and the eye-catching hero they asked for; cutlist is loud;
split stage forces two columns for the whole page; live surface forbids
marketing chrome; gallery forbids persuasion; poster forbids media;
continuous world is the opposite of "distinct scenes."

New grammar: **Scene stack.**
- Unit: a scene. Each owns an opaque ground (paper or teal), hard-cut edges,
  one device, one idea. Grounds alternate; the light/dark mixture is the
  sequence.
- Nav: a fixed minimal bar that re-inks on every cut, taking the ink of the
  scene beneath it. The bar is a mirror of where you are.
- Hero: dimensional layered composition (hero-depth.md): clean plate, alpha
  subject, real UI cards as floating planes, type between planes.
- Close: resolves on the App Store CTA as an object in the last scene and
  holds. No fade-out.
- Bans: no drift interpolation (cuts only); no scrub video; no counters (no
  verified figures); no eyebrow on every heading; no centred copy in every
  scene; no em dashes; no scroll cue.

## Journey beats (authored from §2)

1. Recognition   the hero: a hand, a phone, real envelopes on the screen
2. Tension       the mess they have now, named plainly, on the dark ground
3. Turn          how it works: money in, every dollar gets a job, spend
4. PEAK          the real app, screen by screen, under their own hand
5. Trust         privacy: what the app refuses to do
6. Intimacy      one budget, two phones: the partner's screen catching up
7. Commitment    free today, one button, and it stays on screen

## Feeling curve (authored; one line per scene, emotion then cause)

1. Calm          paper ground, a hand holding the phone, planes barely moving
2. Recognition   teal ground, their own Sunday-night spreadsheet feeling, named
3. Relief        paper again, three plain steps, the arithmetic done for you
4. Light bulb    the phone fills the frame and the wheel flips real screens
5. Trust         teal, quiet, four refusals, the smallest type on the page
6. Warmth        paper, two phones, the second one catching up a beat later
7. Resolve       teal, everything stops, one button, and it stays

Adjacent scenes never share a feeling. Silence before the peak: scene 3 is
plain and short by design; the peak has the largest span on the page.

## The peak

Scene 4. The visitor would say: "you scroll and it flips through the actual
app, screen by screen, like you're already using it."

## Tell-someone sentence

It's the site where you flip through the real app with your scroll wheel
before you've downloaded it.

## Authored silence

Scene 3 ends on a held plain frame with no new content for its last quarter,
so the peak has something to arrive from. That gap is intended.

## Decisions closed with the user

- Signature move: **A, scroll-flip the real app.** One pinned phone at the
  peak; each notch of the wheel turns to the next real screen with its real
  App Store caption; stopping on a screen for 700ms brings a one-line detail
  in. Page-local JS reading `--sc-p`; the engine is untouched. B survives in a
  quieter form in scene 6 (a paper cover over the newest row on the partner's
  phone, wiped away by `--sc-p`).
- Chromium installed for the harness (user approved the download).
- KIE_AI_API_KEY placed in the repo's gitignored .env; never printed.
- Close wording approved: "Free today. Sidecar Plus is coming, and what you
  use now stays free."

## Score (device per scene)

| Scene | Ground | Device | Span | Why this one |
|---|---|---|---|---|
| 1 Calm | paper | `parallax` (5 planes) + pointer tilt on cards | 1.8vh pin | Depth is the cheapest premium signal; the hero must be dimensional |
| 2 Recognition | deep | `pin` + kinetic lines | 1.9vh | The frame holds still while the mess is named |
| 3 Relief | paper | `flow` + `in`, one `reveal` | flow | Plain steps read as a document, which is the point after a pin |
| 4 Light bulb | deep | `pin` + signature flip | 4.6vh | The peak gets the most scroll room by a visible margin |
| 5 Trust | paper | `flow` + `in` | flow | Administrative; compressed, smallest type |
| 6 Warmth | teal | `pin` + `--sc-p` wipe (reveal family) | 1.5vh | A change of state on the partner's phone |
| 7 Resolve | sun | `flow` (last act) + `magnet` + `spotlight` | flow | Holds; the CTA is an object in the scene, not a fade |

Families used: parallax, pin, flow, reveal, pointer (5). No family twice in a
row. No scrub. Measured act heights at 1440x900: 1620 / 1710 / 911 / 4140 /
636 / 1350 / 900 px = 11267 px = 12.5vh over 7 acts, outside the 13.6 to
13.8vh band.

## Assets generated (kie.ai, seedream 5 pro)

Five stills, no rerolls: hero plate 16:9, hero plate 3:4, hand with blank
phone on chroma green, envelope on chroma green, night tension plate. Per-call
planning sum 140 credits at the published rate; balance 1080 before, checked
after in the report. Hand and envelope keyed to real alpha in scripts/key.mjs;
the phone's glass measured at 51.5% x 60.2% of the cutout so the real Home
screenshot sits inside the photographed phone.

## Feel check (cold scroll of the built page, one word per scene, then diffed)

| Scene | Felt | Intended | Match |
|---|---|---|---|
| 1 | Settled | Calm | yes |
| 2 | Seen | Recognition | yes |
| 3 | Plain | Relief | yes (reads as relief because it follows the dark scene) |
| 4 | Curious, then "oh" | Light bulb | yes; the flip is the largest visual change on the sheet and holds 4.6vh |
| 5 | Quiet | Trust | yes |
| 6 | Warm | Warmth | yes |
| 7 | Done | Resolve | yes; the last frame holds the CTA and footer, nothing fades |

No two adjacent scenes felt the same. The peak is the largest change on the
contact sheet (a full screen swap on every notch) and has the widest span.

## Verified

Static export served on :4500, headless Chromium 1440x900, 390x844, and
1440x900 with prefers-reduced-motion. All three: 40 frames, no dead scroll, no
console errors, every measured line at or above 4.5:1 (worst 5.59:1, the
tension resolve line over the lit desk; mobile worst 7.23:1). No horizontal
overflow at six scroll positions per viewport. Keyboard: 18 focus stops on
desktop and 14 on mobile, all visible, in reading order. Reduced motion keeps
all seven hero planes at full opacity with no transforms, so depth stays.
Interior pages: the bar re-inks over teal bands on Features, About and Pricing
and over the footer; no data-ground is set elsewhere so the theme cascade
holds. kie.ai balance 1080 before, 1010 after (70 credits for five stills).

## Not verified

A real iPhone (only the 390x844 emulation). Lenis + engine feel under a
physical trackpad (harness scrolls programmatically). The skill's ffmpeg
contact sheet (no ffmpeg on this machine; scripts/sheet.mjs uses sharp
instead). Netlify build of this exact tree (the previous tree deployed fine
and nothing about the build pipeline changed).

## Revision, 2026-09-06 (after the user's first review)

Fifteen notes from the user, all applied:
- Hero rebuilt on GSAP ScrollTrigger + Lenis (the user's parallax reference):
  four lag rates, headline between planes, hand flush to the floor with the
  wrist bleeding off, the Home screen masked into the glass by the hand's own
  alpha (no corner bleed at any size). Envelope and note card removed.
- Theme system removed: light-only, per the design system ("no dark mode").
  This also fixed the dark-on-teal button text and the cream logo on cream:
  the engine's unlayered `:where(a){color:inherit}` was beating Tailwind's
  layered colour utilities, and the theme cascade was picking the wrong lockup.
- Copy: scene 2 lines 3 and 4, scene 3 heading and step titles, verbatim.
- Peak replaced: two wheels (names left, real screens right) meeting at full
  size in the middle, over a generated still of a woman at a kitchen table
  (kie.ai, 14 credits) under the deep-teal overlay. Items that would pass
  behind the heading fade out first. Below 1025px: one flipping phone.
- Icons: bespoke SVGs in the app's icon idiom (24px grid, 2px stroke, round
  caps, single colour) above every heading in scenes 2 to 7, plus one per
  step in scene 3 and the car mark at the close; the bank is struck through.
- Two phones pulled into a 64rem container next to the copy.
- Responsive pass: all 8 routes at 375/390/430/768/1024, no horizontal
  overflow anywhere; privacy provider table stacks on phones; portrait
  tablets get a larger hero hand.

## Revision 2, 2026-09-06 (second review)

Nine notes, all applied:
- Retired homepage components and the three.js / react-three dependencies deleted.
- Hero hand scales with the viewport (92% of the hero on desktop, capped at 88vw; 62% on phones; 68% on portrait tablets). The screen is now laid on the measured glass quad with a perspective matrix (the photographed phone is sheared by 0.018), scaled by the rendered hand width.
- Scene 3 phone: the wipe reveal that never finished replaced with the flow fade.
- Peak: only the previous, current and next item show on each wheel, spread 60 degrees apart on wider rings; mobile spacing tightened.
- Privacy: "We value your privacy.", shield above, a struck-through icon per refusal (bank, megaphone, eye; export arrow for the last), each strike drawing itself in sequence as the list arrives.
- Two phones at 300px, a teal ring and "Just now" tag on the row that arrives.
- Apple's official App Store badges (black on paper, white on teal) from Apple's badge service, unmodified.
- Nav re-ink no longer sticks: the watcher was matching <html> itself.
- Features: the screenshot grid replaced with a five-card fan (adapted from 21st.dev's card-fan-carousel) with the centre screen's caption, arrows and dots.
Verified again: three harness passes green, 40 route/viewport combos with no overflow.

## Revision 3, 2026-09-06 (third review)

- Hero screen lowered inside the bezel (18px top/bottom, 16px sides in cutout
  pixels) and re-fitted; two more envelopes (Total on hand, Eating Out) in the
  middle distance on wide viewports, hidden below 1280px.
- Privacy foot fills the list width; the close's opening quote no longer clips
  (the split-line masks get 0.08em of room on the left).
- Features on phones: the fan gives way to a swipeable stack (adapted from the
  Motion card-stack example) with dots and the current caption.
- Hero plate: the paper wash was a radial blob that hid the middle of the desk
  and left its angled front edge showing at the bottom left, so the one photo
  read as two. The wash is now a left-to-right gradient plus a bottom fade, and
  the plate is cropped a little higher, so the desk reads as one surface.
