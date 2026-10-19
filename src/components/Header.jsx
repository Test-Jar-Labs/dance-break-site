import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Img from './Img.jsx';
import { ASSETS, LINKS } from '../assets.js';
import { InstagramIcon, LinkedInIcon } from './Icons.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-header ${open ? 'is-open' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="header-logo" aria-label="Dance Break home">
          <Img asset={ASSETS.logo} alt="Dance Break" loading="eager" />
        </Link>

        <nav className="header-nav" aria-label="Main">
          <NavLink to="/" end>Dance Break</NavLink>
          <NavLink to="/partner-referral-program">Referral Program</NavLink>
          <a href={LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
        </nav>

        <button
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </div>

      <div className="mobile-menu" hidden={!open}>
        <NavLink to="/" end>Dance Break</NavLink>
        <NavLink to="/partner-referral-program">Referral Program</NavLink>
        <div className="mobile-social">
          <a href={LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon width="26" height="26" /></a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon width="26" height="26" /></a>
        </div>
      </div>
    </header>
  );
}
