# Grey Wave Church — website brief

The prompt that produced this build, rewritten the way a design studio would
scope it. Keep it with the repo so the next round of edits starts from the same
picture.

## The one-sentence job

Build a website that makes a 55-to-80-year-old in Chicago's south suburbs, who
has not been inside a church in decades, feel two things in under ten seconds:
**"this was built for me"** and **"I'm not done yet."**

## Who it's for (in priority order)

1. **The outsider.** Retired or nearly, living within twenty minutes of the
   meeting place. Maybe widowed. Maybe raised in church and quietly left after
   a divorce, a move, a bad pastor, or plain drift. Reads the news, watches
   grandkids, feels the phone ringing less. Suspicious of hype, allergic to
   guilt, and has never once been the target audience of a church launch.
2. **Their adult kids and friends**, who will send them the link.
3. **The future core team**, believers who want their retirement to count.
4. Lance's partners and Ignite Church Planting (they already believe; the site
   only needs to not embarrass them).

The site is **not** for current members. There are twelve of them. Anything
that only a member would care about (announcements, volunteer schedules,
internal news) belongs in an email, not on the home page.

## What the site has to do

- **Answer three questions above the fold:** who is this for, when and where,
  and what do I do next. The next step is always the same: *come to one
  preview Sunday.*
- **Reframe aging.** The name is a wave, not a decline. Every section should
  carry the feel of "thriving later in life through your God-given design and
  gospel-centered disciple-making," without ever using that sentence. Say it
  in plain words: you were made on purpose, you are still needed, Jesus is
  worth hearing about plainly, and there is a table with your name on it.
- **Tell the truth about where the church is.** It has not launched. It is
  running twelve preview Sundays (Sept 13 – Nov 29, 2026) at a borrowed
  building. Twelve people came the first week. Say that with pride; a new
  thing you can still shape is more inviting than a polished institution.
- **Feel alive.** Motion, real faces, warmth. Interactive pieces that let a
  visitor do something (see the next Sunday count down, pick what they're
  good at and see where it fits, walk through a Sunday minute by minute, watch
  the twelve-week tracker fill up). Motion respects `prefers-reduced-motion`.
- **Stay readable at 75.** 19px base, a text-size control, AA contrast,
  58px buttons, no thin grey type on cream, no hover-only information, no
  autoplaying video, nothing that requires a steady hand.
- **Lead with people who look like the audience.** Warm, candid, natural
  light, mid-laugh or mid-conversation, in modern rooms and outdoors. Older
  adults front and center, never as patients. Stock until real photos exist;
  real photos win the moment Lance sends them.

## Voice

Warm, direct, a little funny, never cute. Second person. Short sentences.
Church words only when they're the plainest word available ("communion" is
fine; explain it once). No "vibrant," no "authentic," no "doing life
together," no exclamation points doing the work a sentence should do. The
test for every headline: would a skeptical 68-year-old former engineer read it
and think "fair enough"?

## Pages and the job of each

| Page | Job |
|---|---|
| Home | Convince an outsider to come once. Everything else is a footnote. |
| Start Here (`/im-new/`) | Remove every reason not to come: what happens, what to wear, parking, hearing, who's there, and the Plan-a-Visit form. |
| Our Story (`/about/`) | Lance, Darla, why now, what we believe in plain language, and Ignite. |
| Messages (`/messages/`) | Let someone press play before they'd ever walk in. |
| What's Happening (`/events/`) | The twelve preview Sundays, generated from one date, plus a few proposed events. |
| Get Connected (`/connect/`) | Groups, ways to help, care, and a prayer form that reaches the church, not one person's phone. |
| Give (`/give/`) | "You don't have to. Here's how, if you want to." |
| Contact (`/contact/`) | One email, one phone, one map. |

## Constraints

- Static HTML, one stylesheet, one script, no build step. Deploys on Vercel
  from the repo root. Lance or a volunteer should be able to edit copy in a
  text editor.
- One place to change service time, dates, and the form endpoint
  (`site.js` → `GW` config). No `[TIME]`-style placeholders visible to
  visitors; unknowns degrade to honest defaults ("Sunday mornings").
- Nothing invented is presented as fact. Proposed events are labeled
  proposed. No fabricated testimonials. See `RESEARCH.md` for what is sourced.

## Open items for Lance

Confirm: spelling (Grey/Gray), service time, meeting address, domain, a
church email and phone that aren't his personal cell, a giving link, and the
first real photos.
