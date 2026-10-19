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

  return (
    <header ref={headerRef} className={`site-header ${open ? 'is-open' : ''}`}>
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
