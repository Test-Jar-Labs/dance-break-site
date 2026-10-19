import InquiryForm from '../components/InquiryForm.jsx';
import usePageMeta from '../components/usePageMeta.js';

const FIELDS = [
  { name: 'name', type: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'eventDate', label: 'Event Date', type: 'date' },
  { name: 'eventLocation', label: 'Event City, State', type: 'text', required: true },
  { name: 'eventDetails', label: 'Event Details', type: 'textarea', required: true },
];

export default function BookNow() {
  usePageMeta('Dance Break | Events | Book Now', 'Book Dance Break now.');
  return (
    <section className="section section-white form-page">
      <div className="container form-layout">
        <div className="form-intro">
          <h1 className="page-title">Book Now</h1>
          <p>Turn your guests into the life of the party with Dance Break.</p>
          <p>Submit the form to get a customized quote for your event.</p>
        </div>
        <InquiryForm
          formName="Book Now"
          fields={FIELDS}
          successMessage="Thanks! We got your event details and will send a custom quote soon."
        />
      </div>
    </section>
  );
}
