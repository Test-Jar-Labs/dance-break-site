import InquiryForm from '../components/InquiryForm.jsx';
import usePageMeta from '../components/usePageMeta.js';

const FIELDS = [
  { name: 'name', type: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'subject', label: 'Subject', type: 'text', required: true },
  { name: 'message', label: 'Message', type: 'textarea', required: true },
];

export default function Contact() {
  usePageMeta('Dance Break | Request More Info', 'Tell us about your event and we’ll help you plan the best Dance Break experience.');
  return (
    <section className="section section-white form-page">
      <div className="container form-layout">
        <div className="form-intro">
          <h1 className="page-title">Request more info</h1>
          <p>Tell us about your event and we’ll work with you to provide the best experience for your event.</p>
        </div>
        <InquiryForm formName="Contact / Request Info" fields={FIELDS} />
      </div>
    </section>
  );
}
