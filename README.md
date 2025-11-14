# aidev-

Portfolio site for Bilal — Media Buyer & Growth Marketer.

## Structure

- `index.html` — single-page site
- `styles/styles.css` — main styling
- `scripts/script.js` — small JS for UX
- `assets/` — add images and fonts here

## Local run

Open `index.html` in a browser. For best results serve it from a local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

You can deploy this static site to GitHub Pages, Netlify, or Vercel. The project is Netlify-ready and the contact form uses Netlify Forms by default.

Netlify (recommended for forms and fast deploy):

1. Push this repo to GitHub.
2. Create an account at https://app.netlify.com and click "Add new site" → "Import from Git" and connect your GitHub repo.
3. Netlify will detect the site as static. Build command: *leave blank* (this is static HTML). Publish directory: `.`
4. After deploy, go to your site dashboard → Forms to see submissions. To test forms locally, install the Netlify CLI and run `netlify dev`.

Netlify CLI (optional):

```bash
npm install -g netlify-cli
netlify dev
# follow the printed local URL to test forms and site behavior
```

GitHub Pages / Vercel: These also work for static hosting, but Netlify has built-in form handling that requires no server.

If you prefer Formspree instead of Netlify Forms, revert the form in `index.html` to include a Formspree `action` URL (replace the current form attributes with the Formspree action URL) and remove the `data-netlify` attributes.
