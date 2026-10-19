import { useEffect, useState } from 'react';
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

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`site-header ${open ? 'is-open' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="header-logo" aria-label="Dance Break home">
          <Img asset={ASSETS.logo} alt="Dance Break" loading="eager" />
        </Link>

        <nav className="header-nav" aria-label="Main">
          {NAV.map((n) => <NavLink key={n.to} to={n.to}>{n.label}</NavLink>)}
        </nav>

        <Link to="/book-now" className="btn btn-primary btn-sm">Get a quote</Link>

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
