// Vercel serverless function: receives form submissions from the site and
// emails them to the Dance Break inbox via Resend (https://resend.com).
//
// Required environment variables (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY   – API key from resend.com
//   FORM_TO_EMAIL    – where submissions go (e.g. dancebreak@testjarlabs.com)
//   FORM_FROM_EMAIL  – a sender on a domain verified in Resend, e.g. "Dance Break <forms@playdancebreak.com>"

const LABELS = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  newsletter: 'Newsletter opt-in',
  eventDate: 'Event date',
  eventLocation: 'Event city, state',
  eventDetails: 'Event details',
  subject: 'Subject',
  message: 'Message',
  business: 'Business / organization',
  website: 'Website / social',
  role: 'What best describes them',
  eventTypes: 'Event types',
  eventsPerMonth: 'Events per month',
};

const ALLOWED_FORMS = ['Book Now', 'Contact / Request Info', 'Partner Referral Application'];

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const { form, data = {} } = body;

  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if (data.company_website) return res.status(200).json({ ok: true });
  delete data.company_website;

  if (!ALLOWED_FORMS.includes(form)) return res.status(400).json({ error: 'Unknown form.' });
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!data.firstName || !data.lastName) return res.status(400).json({ error: 'Please enter your name.' });

  const { RESEND_API_KEY, FORM_TO_EMAIL, FORM_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !FORM_TO_EMAIL || !FORM_FROM_EMAIL) {
    console.error('Form email is not configured: set RESEND_API_KEY, FORM_TO_EMAIL and FORM_FROM_EMAIL.');
    return res.status(500).json({ error: `Our form is temporarily unavailable — please email us at dancebreak@testjarlabs.com.` });
  }

  const rows = Object.entries(data)
    .filter(([, v]) => v !== '' && v != null)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">${escapeHtml(LABELS[k] || k)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(String(v).slice(0, 5000))}</td></tr>`)
    .join('');

  const name = `${data.firstName} ${data.lastName}`.trim();

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FORM_FROM_EMAIL,
      to: FORM_TO_EMAIL.split(',').map((s) => s.trim()),
      reply_to: data.email,
      subject: `[${form}] ${name}${data.subject ? ` — ${data.subject}` : ''}`,
      html: `<h2 style="font-family:sans-serif">New ${escapeHtml(form)} submission</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
    }),
  });

  if (!r.ok) {
    console.error('Resend error', r.status, await r.text());
    return res.status(502).json({ error: 'We couldn’t send your message. Please try again or email dancebreak@testjarlabs.com.' });
  }

  return res.status(200).json({ ok: true });
}
