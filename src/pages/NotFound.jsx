import { Link } from 'react-router-dom';
import usePageMeta from '../components/usePageMeta.js';

export default function NotFound() {
  usePageMeta('Dance Break | Page Not Found');
  return (
    <section className="section not-found">
      <div className="container">
        <h1>Wrong move!</h1>
        <p className="lead">We couldn’t find that page.</p>
        <Link to="/" className="btn btn-primary">Back to the dance floor</Link>
      </div>
    </section>
  );
}
