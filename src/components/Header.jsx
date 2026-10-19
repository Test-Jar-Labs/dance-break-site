import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Img from './Img.jsx';
import { ASSETS } from '../assets.js';

const NAV = [
  { to: '/partner-referral-program', label: 'Partner program' },
  { to: '/contact-us', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname, hash]);

  // Escape, or a tap on the dimmed page outside the header, closes the mobile menu.
  const headerRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onPointer = (e) => { if (!headerRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  // On phones the header button would repeat the hero's own "Get a quote" right below it, so it
  // stays tucked away until the hero buttons scroll out of view (see .is-tucked in styles.css).
  const [heroCtaVisible, setHeroCtaVisible] = useState(false);
  useEffect(() => {
    const heroCta = document.querySelector('.hero-actions');
    if (!heroCta || !('IntersectionObserver' in window)) {
      setHeroCtaVisible(false);
      return;
    }
    const io = new IntersectionObserver(([e]) => setHeroCtaVisible(e.isIntersecting), { rootMargin: '-72px 0px 0px 0px' });
    io.observe(heroCta);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <header ref={headerRef} className={`site-header ${open ? 'is-open' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="header-logo" aria-label="Dance Break home">
          <Img asset={ASSETS.logo} alt="Dance Break" loading="eager" />
        </Link>

        <nav className="header-nav" aria-label="Main">
          {NAV.map((n) => <NavLink key={n.to} to={n.to}>{n.label}</NavLink>)}
        </nav>

        {/* Not shown on the quote page itself. */}
        {pathname !== '/book-now' && (
          <Link to="/book-now" className={`btn btn-primary btn-sm header-cta ${heroCtaVisible ? 'is-tucked' : ''}`}>
            Get a quote
          </Link>
        )}

        <button
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </div>

      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" hidden={!open}>
        {NAV.map((n) => <NavLink key={n.to} to={n.to}>{n.label}</NavLink>)}
      </nav>
    </header>
  );
}
