import { Link } from 'react-router-dom';
import Img from '../components/Img.jsx';
import usePageMeta from '../components/usePageMeta.js';
import { ASSETS, VIDEO, LINKS } from '../assets.js';

const EVENT_TYPES = [
  {
    title: 'Corporate Events & Expos',
    image: ASSETS.corporate,
    body: 'Drive engagement, foot traffic, and branded content. Ideal for conferences, trade shows, retail activations, and internal culture events.',
    cta: 'Request corporate event details',
  },
  {
    title: 'Parties & Celebrations',
    image: ASSETS.parties,
    body: 'Birthdays, mitzvahs, school events, community gatherings. Dance Break turns any celebration into a fun, high-energy memory factory.',
    cta: 'Request party details',
  },
  {
    title: 'Weddings',
    image: ASSETS.weddings,
    body: 'Bring hype, laughter, and unforgettable moments to your reception. Custom dances, special couple features, and videos your guests will cherish.',
    cta: 'Request wedding details',
  },
];

const BRANDS = [
  { asset: ASSETS.brandAlibaba, name: 'Alibaba' },
  { asset: ASSETS.brandPixi, name: 'Pixi Beauty' },
  { asset: ASSETS.brandAkp, name: 'AKP Sports Foundation' },
  { asset: ASSETS.brandImage77, name: 'Partner brand' },
  { asset: ASSETS.brandWorld, name: 'World Peace Classic' },
  { asset: ASSETS.brandWombo, name: 'Wombo.ai' },
  { asset: ASSETS.brandYmca, name: 'YMCA' },
  { asset: ASSETS.brandCresci, name: 'Cresci Labs' },
];

const POSTS = [
  {
    asset: ASSETS.igManila,
    href: 'https://www.instagram.com/p/DKA8VtFS_J2/',
    title: '🎉 Dance Break is going to Manila @ &FRIENDS 🎉',
    excerpt: 'Bringing the groove to the Philippines for the first time — catch us at the Crystal Pavilion, Okada Hotel, May 30–31.',
  },
  {
    asset: ASSETS.igEdc,
    href: 'https://www.instagram.com/p/DJ-IDSbBFP2/',
    title: 'Before the lights. Before the crowd.',
    excerpt: 'Bringing Dance Break to EDC Las Vegas, for the love of movement. See you on the dance floor 💃 🕺',
  },
  {
    asset: ASSETS.igMommy,
    href: 'https://www.instagram.com/p/DJFNIMjzmgH/',
    title: 'Mommy and Me Dance Event',
    excerpt: 'With @2bstudiosla — a dance class, arts and crafts, and a panel of mompreneurs. ✨',
  },
  {
    asset: ASSETS.igGlow,
    href: 'https://www.instagram.com/p/DHMcmj3SPqr/',
    title: 'Glow X Play with Pixi Beauty',
    excerpt: 'Beauty meets dance at Westfield Century City — makeovers in the Glow Zone, Dance Break in the Play Zone.',
  },
];

export default function Home() {
  usePageMeta(
    'Dance Break | Book Now',
    'Book Dance Break for interactive dance experiences and challenges. The next-gen photobooth. Perfect for all skill levels. Elevate your event today.'
  );

  return (
    <>
      {/* HERO */}
      <section className="section section-white hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Img asset={ASSETS.logo} alt="Dance Break" className="hero-logo" loading="eager" />
            <h1 className="hero-title">
              <span className="accent">Unforgettable entertainment</span> for Weddings, Corporate Events &amp; Parties
            </h1>
            <p>
              Dance Break is an interactive dance game that gets guests moving, laughing, and competing while
              creating instant viral-style videos they’ll replay forever.
            </p>
            <p className="location">📍Los Angeles, CA</p>
            <div className="hero-cta">
              <Link to="/book-now" className="btn btn-primary btn-wide">Book Now</Link>
              <p className="fine-print"><em>Starts at $2,500. All quotes are custom.</em></p>
            </div>
            <p className="trusted"><em>Trusted by brands like EDC • Alibaba • Databricks • Pixi Beauty • YMCA</em></p>
          </div>
          <div className="hero-media">
            <Img asset={ASSETS.heroPhones} alt="Guests playing Dance Break and their shareable videos" loading="eager" />
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="section section-purple">
        <div className="container split">
          <div>
            <ul className="sparkle-list">
              <li>✨ <strong>30–60 second</strong> sessions</li>
              <li>✨ <strong>No dance skills</strong> needed</li>
              <li>✨ <strong>Live leaderboard</strong> + score</li>
              <li>✨ Designed to generate <strong>shareable content</strong></li>
            </ul>
            <p>
              Dance Break blends real-time dancing, scoring, and instant video creation into one high-energy
              attraction. Guests follow the on-screen moves, earn a score, and automatically receive a short video
              of their performance.
            </p>
            <p>Perfect for all ages, crowds, and event types.</p>
            <h3 className="mixed-heading">
              <em>next-gen</em> photobooth meets TikTok <em>dance challenge</em>
            </h3>
          </div>
          <div className="split-media">
            <Img asset={ASSETS.photobooth} alt="The Dance Break kiosk" />
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="section section-dark video-section">
        <div className="container">
          <video
            className="promo-video"
            src={VIDEO.local}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={ASSETS.photobooth.local}
            aria-label="Dance Break promo video"
          />
        </div>
      </section>

      {/* EVENT TYPES */}
      <section className="section section-white">
        <div className="container event-grid">
          {EVENT_TYPES.map((e) => (
            <article className="event-card" key={e.title}>
              <Img asset={e.image} alt="" />
              <h4>{e.title}</h4>
              <p>{e.body}</p>
              <Link to="/contact-us" className="btn btn-primary">{e.cta}</Link>
            </article>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section className="section section-dark">
        <div className="container">
          <h2 className="section-title">Brands we grooved with</h2>
          <div className="brand-grid">
            {BRANDS.map((b) => (
              <Img key={b.name + b.asset.local} asset={b.asset} alt={b.name} />
            ))}
          </div>
          <Img asset={ASSETS.testimonials} alt="Messages from brands we’ve worked with" className="testimonials" />
        </div>
      </section>

      {/* LET'S PARTY + INSTAGRAM */}
      <section className="section section-white">
        <div className="container">
          <div className="party-cta">
            <h2 className="section-title dark">Let’s party</h2>
            <Link to="/book-now" className="btn btn-primary btn-wide">Book Now</Link>
          </div>
          <div className="ig-grid">
            {POSTS.map((p) => (
              <a className="ig-card" href={p.href} target="_blank" rel="noreferrer" key={p.href}>
                <Img asset={p.asset} alt="" />
                <div className="ig-text">
                  <strong>{p.title}</strong>
                  <span>{p.excerpt}</span>
                </div>
              </a>
            ))}
          </div>
          <p className="ig-follow">
            <a href={LINKS.instagram} target="_blank" rel="noreferrer">Follow @playdancebreak on Instagram →</a>
          </p>
        </div>
      </section>
    </>
  );
}
