# Dance Break — playdancebreak.com

React (Vite) rebuild of the Squarespace site, deployed on Vercel from GitHub.

| Route | Page |
|---|---|
| `/` | Home |
| `/book-now` | Get a quote (email + what to include) |
| `/contact-us` | Contact (email) |
| `/partner-referral-program` | Referral program (apply by email) |

There are no forms. Quote, contact and partner pages show dancebreak@testjarlabs.com with a "Copy email" button (`src/components/EmailBlock.jsx`); the site never opens an email app.

---

## 1. Run it locally

```bash
npm install
npm run fetch-assets   # downloads all images (and the promo video, if ffmpeg is installed) from Squarespace into public/
npm run dev            # http://localhost:5173
```

Run `fetch-assets` **before you cancel Squarespace** — afterwards those URLs stop working. Until it's run, images fall back to the Squarespace URLs automatically.

**Promo video:** if the script can't save it (needs `ffmpeg`, e.g. `brew install ffmpeg`), copy your original `DBAd1_Horizontal.mp4` to `public/video/dance-break.mp4`. Keep it under ~20 MB for fast loading.

## 2. Push to GitHub

```bash
git add -A && git commit -m "Add self-hosted images and video"
git remote add origin https://github.com/<you>/dancebreak-site.git
git push -u origin main
```

## 3. Deploy on Vercel

1. vercel.com → **Add New → Project** → import the GitHub repo. Framework is detected as **Vite**; leave the defaults.
2. Deploy, then open the `*.vercel.app` URL to check every page.

Every push to `main` redeploys automatically; other branches get preview URLs.

## 4. Move the domain

1. Vercel → Project → **Settings → Domains** → add `www.playdancebreak.com` and `playdancebreak.com` (set the apex to redirect to `www`, matching the current canonical URL).
2. Vercel shows the exact DNS records to create. At your registrar (Squarespace Domains if you bought it through Squarespace: **Domains → playdancebreak.com → DNS**):
   - Delete Squarespace's default **A** records (`198.185.159.x`, `198.49.23.x`) and the `www` **CNAME** to `ext-cust.squarespace.com`.
   - Add the **A** record for `@` and the **CNAME** for `www` exactly as Vercel displays them.
   - Leave any **MX / TXT** records (email, verification) alone.
3. Wait for Vercel to show both domains as **Valid** (minutes to a few hours). SSL is issued automatically.
4. Once the live domain serves the new site, cancel the Squarespace *website* plan — keep the *domain* registration (or transfer it).

## Editing content

- Copy lives in `src/pages/*.jsx`; images are listed in `src/assets.js`.
- Colors and fonts are tokens at the top of `src/styles.css`.
- Instagram posts on the home page are the `POSTS` list in `src/pages/Home.jsx` (Squarespace's live Instagram feed doesn't carry over; update the list when you want new posts featured).
