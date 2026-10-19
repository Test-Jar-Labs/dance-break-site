import { Link } from 'react-router-dom';
import usePageMeta from '../components/usePageMeta.js';

export default function NotFound() {
  usePageMeta('Dance Break | Page Not Found');
  return (
    <section className="section section-white form-page">
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 className="page-title">Wrong move!</h1>
        <p>We couldn’t find that page.</p>
        <Link to="/" className="btn btn-primary">Back to the dance floor</Link>
      </div>
    </section>
  );
}
