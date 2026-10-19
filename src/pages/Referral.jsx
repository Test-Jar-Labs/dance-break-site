import InquiryForm from '../components/InquiryForm.jsx';
import usePageMeta from '../components/usePageMeta.js';

const FIELDS = [
  { name: 'name', type: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'business', label: 'Business / Organization Name', type: 'text' },
  { name: 'website', label: 'Website / Social Media', type: 'text' },
  {
    name: 'role',
    label: 'What best describes you?',
    type: 'select',
    required: true,
    options: [
      'Event planner',
      'Venue operator',
      'DJ / Entertainment Provider',
      'Photo Booth Company',
      'Creator / Influencer',
      'Agency / Corporate Events',
      'Other',
    ],
  },
  { name: 'eventTypes', label: 'What types of events do you typically work?', type: 'text' },
  { name: 'eventsPerMonth', label: 'How many events do you typically handle per month?', type: 'text' },
];

export default function Referral() {
  usePageMeta(
    'Dance Break | Partner Referral Program',
    'Earn $500+ for every event you refer to Dance Break. Built for planners, venues, agencies, and creators.'
  );

  return (
    <>
      <section className="section section-purple referral-hero">
        <div className="container">
          <h1 className="page-title light">Become a partner</h1>
          <h2 className="referral-headline">Earn <span className="highlight">$500+</span> for Every Event You Refer</h2>
          <p><em>(No equipment, no operations, no obligations)</em></p>
          <p className="lead">
            Our referral program is built for planners, venues, agencies, and creators who want to recommend
            something unforgettable and get rewarded every time they do.
          </p>
        </div>
      </section>

      <section className="section section-white">
        <div className="container referral-grid">
          <div className="referral-info">
            <h4>How it works</h4>
            <p>
              This is a <strong>referral program</strong>. Partners do <strong>not</strong> own hardware, operate
              the activation, or handle event logistics.
            </p>
            <ol className="steps">
              <li><strong>You refer a client to us.</strong><br />Use an email intro, your partner code, or simply have them mention your name.</li>
              <li><strong>We handle everything.</strong><br />Sales, planning, setup, staffing, delivery, and client support.</li>
              <li><strong>The client books Dance Break.</strong><br />Once we receive full payment for the activation, the referral is officially counted.</li>
              <li><strong>You get paid.</strong><br />Choose ACH, PayPal, or mailed check.</li>
            </ol>

            <h4>What you earn</h4>
            <p className="earn">$500 or 10%, whichever is higher</p>

            <h4>Who this is for</h4>
            <ul className="who-list">
              <li>Wedding planners &amp; venues</li>
              <li>Corporate event planners</li>
              <li>Photo booth companies</li>
              <li>Marketing &amp; experiential agencies</li>
              <li>DJs, MCs, production crews</li>
              <li>Creators &amp; influencers</li>
            </ul>
            <p>If your clients book events, you can earn from Dance Break.</p>
          </div>

          <div className="referral-form">
            <h2 className="section-title dark small">Fill out the form to apply</h2>
            <InquiryForm
              formName="Partner Referral Application"
              fields={FIELDS}
              submitLabel="Apply"
              successMessage="Thanks for applying! We’ll review your info and reach out with your partner details."
            />
          </div>
        </div>
      </section>
    </>
  );
}
