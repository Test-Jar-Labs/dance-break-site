import { useEffect, useRef } from 'react';
import Img from '../components/Img.jsx';
import usePageMeta from '../components/usePageMeta.js';
import { Link } from 'react-router-dom';
import { ASSETS, VIDEO, LINKS } from '../assets.js';

const EVENT_TYPES = [
  {
    type: 'corporate',
    title: 'Corporate events & expos',
    image: ASSETS.corporate,
    size: [603, 634],
    body: 'Drive foot traffic and branded content at conferences, trade shows, retail activations and team events.',
  },
  {
    type: 'party',
    title: 'Parties & celebrations',
    image: ASSETS.parties,
    size: [603, 616],
    body: 'Birthdays, mitzvahs, school and community events. A high-energy hit with every age group.',
  },
  {
    type: 'wedding',
    title: 'Weddings',
    image: ASSETS.weddings,
    size: [712, 604],
    body: 'Custom dances and couple features that bring hype to your reception, and videos guests will keep.',
  },
];

const BRANDS = [
  { asset: ASSETS.brandAlibaba, name: 'Alibaba' },
  { asset: ASSETS.brandPixi, name: 'Pixi Beauty' },
  { asset: ASSETS.brandYmca, name: 'YMCA' },
  { asset: ASSETS.brandWombo, name: 'Wombo.ai' },
  { asset: ASSETS.brandAkp, name: 'AKP Sports Foundation' },
  { asset: ASSETS.brandWorld, name: 'World Peace Classic' },
  { asset: ASSETS.brandCresci, name: 'Cresci Labs' },
];

const POSTS = [
  { asset: ASSETS.igEdc, href: 'https://www.instagram.com/p/DJ-IDSbBFP2/', title: 'EDC Las Vegas' },
  { asset: ASSETS.igManila, href: 'https://www.instagram.com/p/DKA8VtFS_J2/', title: '&FRIENDS, Manila' },
  { asset: ASSETS.igGlow, href: 'https://www.instagram.com/p/DHMcmj3SPqr/', title: 'Glow X Play with Pixi Beauty' },
  { asset: ASSETS.igMommy, href: 'https://www.instagram.com/p/DJFNIMjzmgH/', title: 'Mommy and Me Dance' },
];

export default function Home() {
  usePageMeta(
    'Dance Break | Interactive Dance Game for Events',
    'Dance Break is an interactive dance game for weddings, corporate events and parties. Guests dance, get scored and leave with a shareable video. From $2,500.'
  );

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>Get every guest on the dance floor</h1>
            <p className="lead">
              Dance Break is an interactive dance game for weddings, corporate events and parties. Guests
              dance, get scored, and leave with a video they’ll want to share.
            </p>
            <div className="hero-actions">
              <Link to="/book-now" className="btn btn-primary">Get a quote</Link>
              <a href="#how" className="btn btn-outline">See how it works</a>
            </div>
            <p className="small">From $2,500. Every quote is custom. Based in Los Angeles.</p>
          </div>
          <div className="hero-media">
            <Img asset={ASSETS.heroPhones} alt="Guests playing Dance Break and the videos they received" width="2403" height="1867"
              sizes="(max-width: 860px) min(560px, calc(100vw - 32px)), 600px" loading="eager" fetchpriority="high" />
          </div>
        </div>
      </section>

      <section className="logos" aria-label="Brands we’ve worked with">
        <div className="container">
          <p>Trusted at events for EDC, Alibaba, Databricks and more</p>
          {/* On phones this becomes one slowly scrolling row. The second copy makes the loop seamless;
              it's hidden from screen readers and only shown on phones. */}
          <div className="logo-track">
            <ul className="logo-row">
              {BRANDS.map((b) => <li key={b.name}><Img asset={b.asset} alt={b.name} /></li>)}
              {BRANDS.map((b) => (
                <li key={b.name + '-loop'} className="logo-loop" aria-hidden="true"><Img asset={b.asset} alt="" /></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-purple how" id="how">
        <div className="container how-grid">
          <div className="how-copy">
            <h2 className="display">
              {['Dance.', 'Score.', 'Share.'].map((w, i) => (
                <span key={w} data-reveal style={{ '--delay': `${i * 140}ms` }}>{w}</span>
              ))}
            </h2>
            <p data-reveal style={{ '--delay': '420ms' }}>
              Guests follow the moves on screen, see their score land on the live leaderboard, and walk away
              with a short video of their performance.
            </p>
            <p data-reveal style={{ '--delay': '500ms' }}>
              Each round takes 30–60 seconds and nobody needs to know how to dance. We bring the setup and
              run it, so you can enjoy your own event.
            </p>
          </div>
          <div className="how-media" data-reveal>
            <Img asset={ASSETS.photobooth} alt="The Dance Break kiosk" width="860" height="1323" sizes="(max-width: 860px) 260px, 400px" />
          </div>
        </div>
      </section>

      <PromoVideo />

      <section className="section" id="events">
        <div className="container">
          <h2 className="section-title" data-reveal>For every kind of event</h2>
          <div className="event-grid">
            {EVENT_TYPES.map((e, i) => (
              <article className="event" key={e.type} data-reveal style={{ '--delay': `${i * 100}ms` }}>
                <div className="event-media">
                  <Img asset={e.image} alt="" width={e.size[0]} height={e.size[1]} sizes="(max-width: 900px) min(520px, calc(100vw - 32px)), 340px" />
                </div>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
                <Link to="/book-now" className="btn btn-outline btn-sm">
                  Get a quote<span className="sr-only"> for {e.title.toLowerCase()}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight-top">
        <div className="container">
          <div className="recent-head" data-reveal>
            <h2>Recent events</h2>
            <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">Follow @playdancebreak<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
          <ul className="ig-grid">
            {POSTS.map((p, i) => (
              <li key={p.href} data-reveal style={{ '--delay': `${i * 80}ms` }}>
                <a className="ig-card" href={p.href} target="_blank" rel="noreferrer">
                  <div className="ig-media">
                    <Img asset={p.asset} alt="" width="800" height="1000" sizes="(max-width: 900px) 50vw, 260px" />
                  </div>
                  <span>{p.title}<span className="sr-only"> on Instagram (opens in a new tab)</span></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-purple cta-band">
        <div className="container">
          <h2 className="display" data-reveal>Let’s party</h2>
          <p data-reveal style={{ '--delay': '120ms' }}>Tell us about your event and we’ll send a custom quote.</p>
          <div data-reveal style={{ '--delay': '200ms' }}>
            <Link to="/book-now" className="btn btn-light">Get a quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Doesn't download until it's about to scroll into view, then autoplays muted (unless the
// visitor prefers reduced motion, in which case it waits for them to press play).
function PromoVideo() {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !('IntersectionObserver' in window)) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      video.preload = 'auto';
      if (!reduce) video.play().catch(() => {});
    }, { rootMargin: '300px 0px' });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <section className="video-section">
      <div className="container">
        <video
          ref={ref}
          className="promo-video"
          muted
          loop
          playsInline
          controls
          preload="none"
          poster={VIDEO.poster}
          width="1920"
          height="1080"
          aria-label="Dance Break promo video"
        >
          {VIDEO.sources.map((v) => <source key={v.src} src={v.src} media={v.media} type="video/mp4" />)}
        </video>
      </div>
    </section>
  );
}
