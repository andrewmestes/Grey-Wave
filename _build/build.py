#!/usr/bin/env python3
"""Stitch head + page body + foot into the Grey Wave repo. Run from anywhere."""
import json, os, glob, re, time
VER = time.strftime("%Y%m%d%H%M")
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)

LOGO = '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="23" fill="{bg}"/><path d="M6 27c5-6 9-6 14 0s9 6 14 0 9-6 14 0" fill="none" stroke="#D9A441" stroke-width="3.2" stroke-linecap="round"/><path d="M6 34c5-6 9-6 14 0s9 6 14 0 9-6 14 0" fill="none" stroke="#9DB9D9" stroke-width="3.2" stroke-linecap="round"/><circle cx="34" cy="15" r="4.5" fill="{sun}"/></svg>'

HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#0F1B2D">
<link rel="canonical" href="https://grey-wave-church-planting.vercel.app{path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Grey Wave Church">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="https://grey-wave-church-planting.vercel.app/assets/og-grey-wave.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css?v={ver}">
{extra_head}
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
<header>
  <div class="wrap topbar">
    <a class="brand" href="/" aria-label="Grey Wave Church home">""" + LOGO.format(bg="#0F1B2D", sun="#F6E7C4") + """<span><b>Grey Wave</b><small>A church for people 55 and better</small></span></a>
    <nav class="main" aria-label="Main"><ul>
      <li><a href="/im-new/">Start Here</a></li>
      <li><a href="/about/">Our Story</a></li>
      <li><a href="/messages/">Messages</a></li>
      <li><a href="/events/">Events</a></li>
      <li><a href="/connect/">Connect</a></li>
      <li class="give"><a href="/give/">Give</a></li>
      <li><a href="/contact/">Contact</a></li>
    </ul></nav>
    <div class="tools">
      <button class="sizer-btn" type="button" aria-label="Text size: normal. Click to make text larger." title="Make text larger"><span class="s1">A</span><span class="s2">A</span><span class="lbl">Text size</span></button>
      <a class="btn btn-primary btn-sm cta" href="/im-new/#plan">Plan a Visit</a>
      <button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>
    </div>
  </div>
</header>

<main id="main">
"""

FOOT = """
</main>
<footer>
  <div class="wrap">
    <div class="cols">
      <div>
        <a class="brand" href="/" style="color:#fff;white-space:normal">""" + LOGO.format(bg="#fff", sun="#0F1B2D") + """<span><b style="color:#fff">Grey Wave</b><small style="color:#8FA0B8">A church for people 55 and better</small></span></a>
        <p style="margin-top:1rem;color:#C3CCDA;max-width:26em">A brand-new church south of Chicago for people who suspect the second half of life was meant for more than waiting.</p>
        <div class="social">
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4V14h2.8v8z"/></svg></a>
          <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 8.2a2.6 2.6 0 0 0-1.8-1.8C18.6 6 12 6 12 6s-6.6 0-8.2.4A2.6 2.6 0 0 0 2 8.2 27 27 0 0 0 1.6 12 27 27 0 0 0 2 15.8a2.6 2.6 0 0 0 1.8 1.8C5.4 18 12 18 12 18s6.6 0 8.2-.4a2.6 2.6 0 0 0 1.8-1.8 27 27 0 0 0 .4-3.8 27 27 0 0 0-.4-3.8zM10 15V9l5.2 3z"/></svg></a>
        </div>
      </div>
      <div>
        <h3>Sundays</h3>
        <ul><li data-gw="time">Sunday mornings</li><li>Adventure Christian Church</li><li>70 Ken Hayes Dr, Bourbonnais, IL 60914</li><li><a href="https://www.google.com/maps/search/?api=1&query=70+Ken+Hayes+Dr+Bourbonnais+IL+60914" target="_blank" rel="noopener">Directions</a></li></ul>
      </div>
      <div>
        <h3>Quick links</h3>
        <ul><li><a href="/im-new/">Start here</a></li><li><a href="/messages/">Watch a message</a></li><li><a href="/events/">What's happening</a></li><li><a href="/connect/#prayer">Ask for prayer</a></li><li><a href="/give/">Give</a></li></ul>
      </div>
      <div>
        <h3>One email a week</h3>
        <p style="color:#C3CCDA;font-size:.95rem">This Sunday's talk, what's coming up, and who to pray for. No spam, ever.</p>
        <form class="inline-form" data-form="Newsletter signup">
          <label for="nl-1" class="sr-only">Email address</label>
          <input id="nl-1" type="email" name="email" placeholder="Your email" required>
          <button class="btn btn-gold btn-sm" type="submit">Sign up</button>
          <div class="form-ok" tabindex="-1">Thanks. You're on the list.</div>
        </form>
        <ul style="margin-top:1rem"><li><a data-gw="email" href="mailto:hello@greywavechurch.org">hello@greywavechurch.org</a></li><li><a data-gw="phone" href="#"></a></li></ul>
      </div>
    </div>
    <div class="legal"><span>&copy; 2026 Grey Wave Church</span><span>Started with <a href="https://www.ignitechurchplanting.com/" target="_blank" rel="noopener">Ignite Church Planting</a></span></div>
  </div>
</footer>
<div class="callbar" aria-label="Quick actions">
  <a class="btn btn-outline" href="/messages/"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>Watch</a>
  <a class="btn btn-primary" href="/im-new/#plan">Plan a Visit</a>
</div>
<script src="/site.js?v={ver}"></script>
</body>
</html>
"""

for f in sorted(glob.glob(os.path.join(HERE, "pages", "*.html"))):
    src = open(f).read()
    m = re.match(r"<!--META(.*?)-->", src, re.S)
    meta = json.loads(m.group(1))
    body = src[m.end():].strip("\n")
    out = HEAD.format(title=meta["title"], desc=meta["desc"], path=meta["path"], extra_head=meta.get("head", ""), ver=VER) + body + FOOT.replace("{ver}", VER)
    dest = os.path.join(REPO, meta["path"].lstrip("/"), "index.html")
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    open(dest, "w").write(out)
    print("wrote", dest.replace(REPO, ""), len(out))
