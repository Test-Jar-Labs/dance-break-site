import { Link } from 'react-router-dom';
import EmailBlock from '../components/EmailBlock.jsx';
import usePageMeta from '../components/usePageMeta.js';

export default function Contact() {
  usePageMeta('Dance Break | Contact', 'Email Dance Break with any questions about your event.');
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Contact us</h1>
          <p className="lead">Have a question? Email us and we’ll get back to you.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="contact">
            <EmailBlock />
            <p>
              Planning an event? See <Link to="/book-now">what to include</Link> so we can send your quote faster.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
