import { Link } from 'react-router-dom';
import Img from './Img.jsx';
import { ASSETS, LINKS } from '../assets.js';
import { InstagramIcon, LinkedInIcon } from './Icons.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link to="/" className="footer-logo" aria-label="Dance Break home">
            <Img asset={ASSETS.logoWhite} alt="Dance Break" />
          </Link>
          <nav className="footer-nav" aria-label="Footer">
            <Link to="/book-now">Get a quote</Link>
            <Link to="/partner-referral-program">Partner program</Link>
            <Link to="/contact-us">Contact</Link>
            <span>{LINKS.email}</span>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Test Jar Labs Inc. · Los Angeles, CA</p>
          <div className="footer-social">
            <a href={LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Dance Break on Instagram (opens in a new tab)"><InstagramIcon /></a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="Dance Break on LinkedIn (opens in a new tab)"><LinkedInIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
