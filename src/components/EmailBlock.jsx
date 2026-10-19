import { useState } from 'react';
import { LINKS } from '../assets.js';

// Shows the email address as selectable text with a copy button. No mailto link,
// so nothing tries to open an email app.
export default function EmailBlock() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address is still on screen to select by hand.
    }
  }

  return (
    <div className="email-block">
      <span className="email-address">{LINKS.email}</span>
      <button type="button" className="btn btn-outline btn-sm" onClick={copy}>
        {copied ? 'Copied' : 'Copy email'}
      </button>
      <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
    </div>
  );
}
