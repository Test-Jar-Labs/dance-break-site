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
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#page">Skip to Content</a>
      <ScrollToTop />
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
