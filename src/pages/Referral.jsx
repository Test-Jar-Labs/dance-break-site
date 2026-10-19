import EmailBlock from '../components/EmailBlock.jsx';
import usePageMeta from '../components/usePageMeta.js';

const APPLY_INCLUDE = [
  'Your name and business',
  'Website or social',
  'What you do (planner, venue, DJ, photo booth, creator, agency or other)',
  'The kinds of events you work, and how many per month',
];

const STEPS = [
  { title: 'Refer a client', body: 'Send an email intro, share your partner code, or have them mention your name.' },
  { title: 'We handle everything', body: 'Sales, planning, setup, staffing and client support.' },
  { title: 'Get paid', body: 'Once the client pays in full, you’re paid by ACH, PayPal or check.' },
];

const WHO = [
  'Wedding planners and venues',
  'corporate event planners',
  'photo booth companies',
  'marketing and experiential agencies',
  'DJs, MCs and production crews',
  'creators and influencers',
];

export default function Referral() {
  usePageMeta(
    'Dance Break | Partner Referral Program',
    'Earn $500+ for every event you refer to Dance Break. Built for planners, venues, agencies, and creators.'
  );

  return (
    <>
      <section className="page-head page-head-purple">
        <div className="container">
          <h1>Earn $500+ for every event you refer</h1>
          <p className="lead">
            For planners, venues, agencies and creators. No equipment, no operations, no obligations.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split-layout">
          <aside className="info">
            <p className="earn">You earn $500 or 10% of each booking, whichever is higher.</p>

            <h2>How it works</h2>
            <ol className="plain-steps">
              {STEPS.map((s) => (
                <li key={s.title}><strong>{s.title}.</strong> {s.body}</li>
              ))}
            </ol>

            <h2>Who it’s for</h2>
            <p>{WHO.join(', ')}. If your clients book events, you can earn from Dance Break.</p>
          </aside>

          <div className="panel apply">
            <h2>Apply by email</h2>
            <p>Email us with the subject “Partner program” and include:</p>
            <ul className="include-list">{APPLY_INCLUDE.map((i) => <li key={i}>{i}</li>)}</ul>
            <EmailBlock />
            <p className="small">We’ll reply with your partner details.</p>
          </div>
        </div>
      </section>
    </>
  );
}
