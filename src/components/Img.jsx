import { useState } from 'react';

// Renders a self-hosted WebP from src/assets.js. Photos get a srcset so the browser picks the
// smallest file that's still sharp for the screen; pass `sizes` to say how wide the image is
// shown. Falls back to the original remote URL if the local file is missing.
export default function Img({ asset, alt = '', sizes = '100vw', ...rest }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? asset.remote : asset.local}
      srcSet={!failed && asset.srcSet ? asset.srcSet : undefined}
      sizes={!failed && asset.srcSet ? sizes : undefined}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
