import EmailBlock from '../components/EmailBlock.jsx';
import usePageMeta from '../components/usePageMeta.js';

const INCLUDE = ['Event date', 'City and state', 'Type of event', 'Guest count', 'Anything else we should know, like venue or hours'];

export default function BookNow() {
  usePageMeta('Dance Break | Get a Quote', 'Email Dance Break with your event details for a custom quote.');
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Get a quote</h1>
          <p className="lead">Email us about your event and we’ll send a custom quote. Packages start at $2,500.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="contact">
            <EmailBlock />
            <h2>What to include</h2>
            <ul className="include-list">{INCLUDE.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        </div>
      </section>
    </>
  );
}
