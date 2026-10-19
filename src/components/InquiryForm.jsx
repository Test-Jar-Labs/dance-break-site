import { useState } from 'react';

/**
 * Generic form that posts to /api/submit (a Vercel serverless function that
 * emails the submission). `fields` describes the inputs:
 *   { name, label, type: 'text'|'email'|'date'|'textarea'|'select'|'name', required, options }
 */
export default function InquiryForm({ formName, fields, submitLabel = 'Submit', successMessage }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data.newsletter = form.newsletter?.checked ? 'Yes' : 'No';
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: formName, data }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Something went wrong.');
      setStatus('sent');
      form.reset();
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success" role="status">
        {successMessage || 'Thank you! We’ll be in touch soon.'}
      </div>
    );
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit} noValidate={false}>
      {/* Honeypot: humans never see or fill this */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      {fields.map((f) => (
        <Field key={f.name} field={f} />
      ))}

      {error && <p className="form-error" role="alert">{error}</p>}

      <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
}

function Req() {
  return <span className="req">(required)</span>;
}

function Field({ field: f }) {
  if (f.type === 'name') {
    return (
      <fieldset className="form-item">
        <legend>Name</legend>
        <div className="name-row">
          <label>
            <span className="sub-label">First Name <Req /></span>
            <input type="text" name="firstName" required autoComplete="given-name" />
          </label>
          <label>
            <span className="sub-label">Last Name <Req /></span>
            <input type="text" name="lastName" required autoComplete="family-name" />
          </label>
        </div>
      </fieldset>
    );
  }

  if (f.type === 'email') {
    return (
      <div className="form-item">
        <label>
          <span className="label">{f.label} {f.required && <Req />}</span>
          <input type="email" name={f.name} required={f.required} autoComplete="email" />
        </label>
        <label className="checkbox">
          <input type="checkbox" name="newsletter" /> Sign up for news and updates
        </label>
      </div>
    );
  }

  const label = <span className="label">{f.label} {f.required && <Req />}</span>;

  return (
    <div className="form-item">
      <label>
        {label}
        {f.type === 'textarea' ? (
          <textarea name={f.name} required={f.required} rows={5} />
        ) : f.type === 'select' ? (
          <select name={f.name} required={f.required} defaultValue="">
            <option value="" disabled>Select an option</option>
            {f.options.map((o) => <option key={o}>{o}</option>)}
          </select>
        ) : (
          <input type={f.type || 'text'} name={f.name} required={f.required} />
        )}
      </label>
    </div>
  );
}
