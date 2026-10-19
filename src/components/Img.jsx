import { useState } from 'react';

// Renders the self-hosted image, falling back to the original Squarespace
// URL if the local copy hasn't been downloaded yet.
export default function Img({ asset, alt = '', ...rest }) {
  const [src, setSrc] = useState(asset.local);
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => src !== asset.remote && setSrc(asset.remote)}
      {...rest}
    />
  );
}
