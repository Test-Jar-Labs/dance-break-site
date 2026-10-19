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
npm run dev            # http://localhost:5173
```

### Images

Images are self-hosted WebP files in `public/images`, built from the originals in `source-images/`
(kept in the repo so they survive cancelling Squarespace). Sizes are set in `src/assets.js`: photos
get several widths for `srcset` (the largest is ~2x their biggest on-screen size, so they stay sharp
on retina screens) and logos get one file at 3x their display height.

To add or replace an image, put the original in `source-images/` (or add its URL to `src/assets.js`),
then run:

```bash
npm run optimize-images
```

### Promo video

`public/video` holds a 1080p and a 720p H.264 mp4 (phones get the 720p one) and a WebP poster,
built from `source-images/video/dance-break-original.mp4`. The video only downloads once a visitor
scrolls near it. To replace it, swap the original and rebuild with [ffmpeg](https://ffmpeg.org):

```bash
S=source-images/video/dance-break-original.mp4
ffmpeg -y -i $S -c:v libx264 -preset slower -crf 27 -tune film -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart public/video/dance-break-1080.mp4
ffmpeg -y -i $S -vf scale=-2:720:flags=lanczos -c:v libx264 -preset slower -crf 27 -tune film -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart public/video/dance-break-720.mp4
ffmpeg -y -ss 2 -i $S -frames:v 1 -vf scale=1280:-2 -c:v libwebp -quality 78 public/video/poster.webp
```

## 2. Push to GitHub

```bash
git add -A && git commit -m "Update site"
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

- Copy lives in `src/pages/*.jsx`; images are listed in `src/assets.js` (see **Images** above).
- Colors and fonts are tokens at the top of `src/styles.css`.
- Instagram posts on the home page are the `POSTS` list in `src/pages/Home.jsx` (Squarespace's live Instagram feed doesn't carry over; update the list when you want new posts featured).
