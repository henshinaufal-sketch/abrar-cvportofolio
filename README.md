# Abrar Portfolio

A static HTML/CSS/JavaScript portfolio site, deployed via GitHub + Vercel.

## Run locally

1. Extract/open this folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html`.
4. Choose **Open with Live Server**.

A local URL such as `http://127.0.0.1:5500/` should open in your browser.

## File structure

- `index.html` — page structure, dashboard navigation panel, lightbox and mini-game markup, SEO/social meta tags
- `styles.css` — visual design (geology/GIS "rock strata" theme), layout, navigation, lightbox, mini-game, responsive styles
- `content.js` — portfolio text/content, social URLs, and image references
- `script.js` — renders content and controls navigation + gallery lightbox
- `game.js` — "Stack the Strata" mini-game, opened from the footer's Play button
- `assets/images/` — portfolio photos and project screenshots (WebP)
- `assets/meta/` — favicon, app icons, and the Open Graph/Twitter share image
- `assets/Abrar-Naufal-Prasetya-CV.pdf` — downloadable CV, linked from the hero section
- `scripts/generate_cv_pdf.py` — regenerates the downloadable CV PDF from `content.js`
- `robots.txt`, `sitemap.xml` — basic SEO config (update the domain in both, plus in the `<head>` of `index.html`, if the production URL changes)

## Editing content

Most text and links can be edited from `content.js` without changing the layout. If you update career/education/highlights, re-run `python3 scripts/generate_cv_pdf.py` (requires `pip install reportlab`) to keep the downloadable CV in sync.

## Current revision notes — v0.9

- Added a light/dark theme toggle (top-left of the topbar) that persists via `localStorage` and defaults to the visitor's OS preference on first visit; an inline script in `<head>` sets it before first paint to avoid a flash of the wrong theme.
- Added scrollspy to the nav panel: the link for whichever section is currently in view gets highlighted as you scroll.

## Previous revision notes — v0.8

- Added scroll-reveal animations (fade + rise into view via `IntersectionObserver`) for section headings, cards, and other content below the hero, with a staggered cascade for grids/lists. Respects `prefers-reduced-motion`.

## Previous revision notes — v0.7

- Added a "Stack the Strata" mini-game (a Stack-style block-stacking game themed on the site's rock-strata palette), opened from a "Play mini-game" button in the footer.

## Previous revision notes — v0.6

- Compressed all photos to WebP (~65% smaller) and added explicit `width`/`height` to every `<img>` to avoid layout shift.
- Added Open Graph/Twitter Card meta tags, favicon/app icons, `<link rel="canonical">`, `robots.txt`, and `sitemap.xml`.
- Added a "Download CV" button in the hero section, linking to an auto-generated PDF résumé.
- Added a focus trap (Tab/Shift+Tab cycling) to the nav panel and lightbox overlays.
- Footer year is now generated at runtime instead of hardcoded.

## Previous revision notes — v0.5

- Replaced the previous “Explore sections” dropdown with a compact dashboard-style Menu button and right-side navigation panel.
- Gallery thumbnails are clickable and open a full-size lightbox without cropping the original photo.
- Lightbox includes close, previous/next navigation, outside-click close, Escape key, and keyboard arrows.
- Contact/social buttons have a more engaging card treatment with hover interactions.
- `@asnmedioker` now links directly to `https://tiktok.com/@asnmedioker`.
- All prior revisions remain: full hero photo, readable formal typography, larger section headings, aligned gallery grid, updated Presentation 1 photo, and the blue hi-tech/playful visual theme.
