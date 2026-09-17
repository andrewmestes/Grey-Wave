# Grey Wave Church — website

A static site (plain HTML, one `styles.css`, one `site.js`, no framework) for
Lance Hurley's new church for people 55 and better, south of Chicago. It is
written for outsiders: people who haven't been to church in years and need a
reason to come once. See `BRIEF.md` for the full creative brief and
`RESEARCH.md` for what is sourced versus proposed.

## Pages

| Path | Job |
|---|---|
| `/` | Convince an outsider to come once. Hero, "Is this for me?" cards, why-this-generation stats, "pick three" gifts picker, minute-by-minute Sunday, 12-week preview tracker, Lance's story, honest FAQ. |
| `/im-new/` | Start Here. What to expect, practical details, **Plan a Visit form** (`#plan`), map, FAQ. |
| `/about/` | Our Story. Why now, Lance and Darla, purpose, beliefs (`#believe`), leadership (`#leadership`), Ignite. |
| `/messages/` | Lance's existing messages, the fall series plan (`#series`), Monday email signup. |
| `/events/` | Tracker plus the twelve preview Sundays, generated from one date. Proposed weekday groups. |
| `/connect/` | Gifts picker (`#gifts`), groups, care, **prayer form** (`#prayer`), interest form (`#interest`). |
| `/give/` | Ways to give, where it goes, giving FAQ. |
| `/contact/` | Email, contact form, map. |

## Editing

**Settings that change often** live at the top of `site.js` in the `GW`
object: service time, first preview Sunday, number of weeks, launch note,
form endpoint, email, phone. Leave a value blank and the site shows an honest
default ("Sunday mornings") or hides the line. Nothing like `[TIME]` is ever
shown to visitors.

**Page content** lives in `_build/pages/*.html`. The shared header, footer,
and `<head>` live in `_build/build.py`. After editing either, rebuild:

```bash
python3 _build/build.py
```

That writes every `index.html` and stamps a new version on the CSS and JS
links so browsers pick up changes. Don't hand-edit the generated
`index.html` files; the next build overwrites them.

`_build/`, `BRIEF.md`, `RESEARCH.md`, and this README are excluded from the
deployed site by `.vercelignore`.

## Interactive pieces

- **Next Sunday countdown** and **12-week tracker** compute from
  `GW.previewStart` and today's date. After the last preview Sunday they fall
  back to "next Sunday."
- **"Is this for me?" cards** expand on tap.
- **Gifts picker** (home and Connect): pick up to three strengths, see where
  each fits. The list lives in `GIFTS` inside `site.js`.
- **Minute-by-minute Sunday**: tabbed on desktop, a swipeable row on phones.
  Arrow keys work.
- **Count-up stats, scroll reveals, slow hero zoom, gold ribbon.** All of it
  switches off for anyone with "reduce motion" turned on.
- **Text size button** in the header cycles normal, larger, largest and
  remembers the choice.

## Forms

All five forms (plan a visit, prayer, interest, contact, newsletter) use
`data-form`. With `GW.formEndpoint` blank they open the visitor's email app
addressed to `GW.email`. Before launch, create a free Formspree (or Basin)
form, paste its URL into `GW.formEndpoint`, and submissions arrive in an inbox
with no email app needed.

## Photos

Stock photos are in `assets/img/`, all from Unsplash (free for commercial
use, no attribution required). They were picked for older adults, candid,
natural light, never clinical. Real photos of real Grey Wave people will beat
every one of them. Replace a file with the same name and it updates
everywhere.

| File | Used for |
|---|---|
| `hero-friends.jpg` | Home hero, Give background |
| `women-talking.jpg`, `grandpa-tablet.jpg`, `church-pews.jpg` | Home "what we're about" |
| `coffee-mugs.jpg`, `dancing.jpg`, `cafe-couple.jpg`, `laugh-outdoors.jpg`, `cards-outdoors.jpg` | Minute-by-minute Sunday |
| `chicago-skyline.jpg` | Home "why", About partners |
| `bench-men.jpg`, `portrait-*.jpg`, `friends-bench.jpg`, `grandpa-baby.jpg`, `chess.jpg` | Interior page heroes and sections |

**Lance and Darla** currently show an "L&D" placeholder card on Home and
About, and initials on the leadership cards. Drop in a photo by adding an
`<img>` inside the `.story-ph` or `.person .ph` element.

## Before launch

- Confirm with Lance: Grey vs. Gray, service time, the meeting address, the domain.
- Set `GW.serviceTime`, `GW.phone`, `GW.email`, and `GW.formEndpoint` in `site.js`.
- Add real links for Facebook and YouTube in the footer (currently `#`).
- Set up online giving and link it on the Give page. Confirm tax status and
  the finance-team description.
- When Grey Wave's own videos exist, swap the Messages hero link for the
  YouTube embed (instructions are in an HTML comment there).
- Real photos, starting with Lance and Darla.

## Deploy

Vercel project `grey-wave-church-planting` is connected to this repo. Every
push to `main` goes live. Other branches get a preview URL. Framework
preset "Other", no build command, output directory `.`.
