import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import BookNow from './pages/BookNow.jsx';
import Contact from './pages/Contact.jsx';
import Referral from './pages/Referral.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Links like /#how scroll to that section; everything else starts at the top.
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

// Fades [data-reveal] elements in as they scroll into view. The hiding CSS only
// applies once <html> has the "motion" class, so content never stays hidden if
// this doesn't run, and visitors who prefer reduced motion see everything at once.
function RevealOnScroll() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('motion');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }),
      { rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#page">Skip to Content</a>
      <ScrollToTop />
      <RevealOnScroll />
      <Header />
      <main id="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-now" element={<BookNow />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/partner-referral-program" element={<Referral />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
