# Abrar Portfolio — Local VS Code Prototype

This is a static HTML/CSS/JavaScript portfolio prototype intended to be reviewed locally in VS Code before moving to GitHub and Vercel.

## Run locally

1. Extract/open this folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html`.
4. Choose **Open with Live Server**.

A local URL such as `http://127.0.0.1:5500/` should open in your browser.

## File structure

- `index.html` — page structure, dashboard navigation panel, lightbox markup
- `styles.css` — visual design, blue theme, layout, navigation, lightbox, responsive styles
- `content.js` — portfolio text/content, social URLs, and image references
- `script.js` — renders content and controls navigation + gallery lightbox
- `assets/images/` — portfolio photos and project screenshots

## Editing content

Most text and links can be edited from `content.js` without changing the layout.

## Current revision notes — v0.5

- Replaced the previous “Explore sections” dropdown with a compact dashboard-style Menu button and right-side navigation panel.
- Gallery thumbnails are clickable and open a full-size lightbox without cropping the original photo.
- Lightbox includes close, previous/next navigation, outside-click close, Escape key, and keyboard arrows.
- Contact/social buttons have a more engaging card treatment with hover interactions.
- `@asnmedioker` now links directly to `https://tiktok.com/@asnmedioker`.
- All prior revisions remain: full hero photo, readable formal typography, larger section headings, aligned gallery grid, updated Presentation 1 photo, and the blue hi-tech/playful visual theme.

This version is still for local review only. GitHub and Vercel deployment should be done after final approval.
