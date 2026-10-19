import { useEffect } from 'react';

export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', 'https://www.playdancebreak.com' + window.location.pathname.replace(/\/$/, ''));
  }, [title, description]);
}
