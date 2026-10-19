import { Link } from 'react-router-dom';
import Img from './Img.jsx';
import { ASSETS, LINKS } from '../assets.js';
import { InstagramIcon, LinkedInIcon } from './Icons.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link to="/" className="footer-logo" aria-label="Dance Break home">
          <Img asset={ASSETS.logoWhite} alt="Dance Break" />
        </Link>
        <p className="footer-copy">©️ {new Date().getFullYear()} Test Jar Labs Inc. All Rights Reserved.</p>
        <a className="footer-email" href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
        <div className="footer-social">
          <a href={LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
        </div>
      </div>
    </footer>
  );
}
