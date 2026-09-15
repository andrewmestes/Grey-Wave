# Grey Wave Church — website

Static, multi-page site (plain HTML + one shared `styles.css` + one tiny
`site.js`, no build step) for Lance Hurley's new church for people 55 and
better. Working name: **Grey Wave**. Domain still unconfirmed (see RESEARCH.md).

## Pages

| Path | What it does |
|---|---|
| `/` | Home: who we are, when and where, next step. Purpose, "New here?", latest message, three upcoming events, connect grid, story, CTA band. |
| `/im-new/` | What to expect, "Good to know", **Plan a Visit form** (`#plan`), directions, FAQ. The primary call to action everywhere points here. |
| `/about/` | Story, purpose, beliefs (`#believe`), leadership (`#leadership`), Ignite partnership. |
| `/messages/` | Latest message (video slot), current series with the 12-week list, archive, Lance's earlier sermons, subscribe. |
| `/events/` | Weekly regulars, fall calendar, printable PDF slot. |
| `/connect/` | Groups (`#groups`), serve teams (`#serve`), care (`#care`), **prayer request form** (`#prayer`), interest form. |
| `/give/` | Online giving button, checks, IRA/QCD and estate note, where it goes, giving FAQ. |
| `/contact/` | General email + church phone, form, address, embedded map. |

Every page shares the same header (logo, Watch button, text-size control,
seven nav links, "Plan a Visit" button), footer (times, quick links,
newsletter signup, contact), and a Watch / Plan a Visit bar pinned to the
bottom on phones.

## Church-website practices this follows

- The homepage answers **who, when/where, and what's my next step** above the fold and in the navy strip right under the hero.
- **Plan a Visit** is the one primary call to action, repeated in the nav, hero, bands, and mobile bar. It lands on a form, not a person's cell phone.
- Standard doors people look for: I'm New, About, Messages, Events, Connect, Give, Contact.
- **Give** is in the nav and has its own page, with online, check, and IRA options and a "where it goes" panel.
- **Messages** are watchable online with a subscribe path (YouTube, podcast, Monday email).
- **Prayer request** and **care** have their own forms, so the church, not one pastor, receives them.
- General church email and office phone in the footer and contact page. Lance's email appears only on his leadership card.
- Newsletter signup in every footer.
- Service time and address in the header strip, footer, I'm New, and Contact. Google Maps link everywhere the address appears.
- Built for 55+ readers: 19px base type with an A/A/A control, Atkinson Hyperlegible body, Fraunces headings, 58px buttons, AA contrast, no motion, printable.

## Deploy on Vercel

The folder is self-contained. Either copy it into its own repo and import it
(framework preset "Other", no build command, output directory `.`), or import
`RunFree-co-Lab` and set *Root Directory* to `grey-wave`. Folder-style URLs
(`/im-new/`) work without any config. Add the domain under Project → Domains.

## Photos

Real photos of real people are the biggest upgrade this site can get. Ten
slots are wired up with labeled placeholders (`assets/ph-*.svg`). Drop
finished photos into the shared Google Drive folder **Grey Wave Photos** and
they get pulled in, resized, and committed.

| Slot | File to replace | Best subject | Shape |
|---|---|---|---|
| Home hero | `ph-hero.svg` | A full table of older friends laughing, coffee in hand, natural light | 4:3, 1600px wide |
| Home "New here?" | `ph-coffee.svg` | Coffee and conversation after a service, modern lobby | 4:3 |
| Home story | `ph-lance-darla.svg` | Lance and Darla, candid, outdoors or in the lobby | 4:5 portrait |
| About | `ph-worship.svg` | Older adults singing in a bright, modern auditorium with screens | 4:3 |
| About partners / Connect serve | `ph-serve.svg` | Greeters at the door, handshakes and name tags | 4:3 |
| Leadership | `ph-lance.svg`, `ph-darla.svg`, `ph-elder.svg` | Head-and-shoulders, same background and light for all | 1:1, 900px |
| Connect groups | `ph-group.svg` | A small group around a table with open Bibles and coffee | 4:3 |
| Messages | `ph-message.svg` | A still from the latest message (replaced by the video embed) | 16:9 |

**Where to find them, free and legal for a church website:**

- Unsplash and Pexels: no attribution required, commercial use allowed.
  Search "senior friends laughing", "older couple coffee", "grandparents
  candid", "senior bible study", "modern church worship", "church lobby
  welcome", "older adults volunteering". Skip anything that looks like a
  pharmaceutical ad.
- Canva (Free content license covers use in a website): the photo library
  under Elements → Photos with the same searches.
- Best of all: a friend with a decent phone at the next few Sundays. Real
  Grey Wave faces beat stock every time, and nobody else has them.

Aim for warm, candid, natural light, people mid-laugh or mid-conversation,
never posed at the camera. Modern room, not stained glass.

## Placeholders to fill before launch

Search for these strings:

- `[TIME]` — Sunday service time (appears in every header strip, footer, and form page).
- `[CHURCH PHONE]` — an office or Google Voice number that goes to voicemail, not a personal cell.
- `hello@greywavechurch.org` — swap for the real address once the domain is settled.
- `[MAILING ADDRESS]` on the Give page.
- `href="#"` on: the **Give online** buttons (point at Tithe.ly, Pushpay, Planning Center Giving, etc.), the **Watch / Listen / Notes** buttons on Messages, the **YouTube / Podcast** buttons, the **fall calendar PDF**, and the Facebook / YouTube icons in the footer.
- `assets/ph-*.svg` — placeholder photo slots, each labeled with the photo that belongs there. Replace with real photos of real people; that is the single biggest upgrade this site can get.
- The video block on Messages has an HTML comment showing where the YouTube embed goes.
- All forms post via `mailto:`. Before launch, point them at a form service (Formspree, Basin, Netlify/Vercel forms, or your church management system's connect card) so submissions land in an inbox reliably.

## Content that is proposed, not confirmed

Weekday groups (Tuesday coffee, Wednesday Bible study, grief group), the
special Sundays on the events page, sermon titles other than Lance's real
ones, the finance-team description on Give, and the "Elders coming 2027"
card are all proposals for Lance to keep, edit, or cut. RESEARCH.md separates
what is sourced from what is drafted.
