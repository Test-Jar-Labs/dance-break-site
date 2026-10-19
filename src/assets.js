// Every image used on the site. `npm run optimize-images` downloads each `remote`
// original into source-images/ (once) and writes resized WebP files to public/images.
//
//   photo(name, remote, widths)  for images that scale with the layout. One WebP per
//                                width, used as a srcset; the largest is ~2x the biggest
//                                size the image is ever shown at, so it stays sharp on
//                                retina screens.
//   logo(name, remote, height)   for images shown at a fixed height. One WebP at 3x
//                                that height.
//
// `remote` is also the fallback if a local file is missing.
const SQ = 'https://images.squarespace-cdn.com/content/v1/68e99499b21c442fceea1771';

const photo = (name, remote, widths) => ({
  name,
  remote,
  widths,
  local: `/images/${name}-${widths[widths.length - 1]}.webp`,
  srcSet: widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', '),
});
const logo = (name, remote, height) => ({ name, remote, height: height * 3, local: `/images/${name}.webp` });

export const ASSETS = {
  logo:         logo('logo', `${SQ}/1760138426992-NYGG4VW8MMHNZV1PVW89/Dance+Break+Logo+New+4x.png`, 38),
  logoWhite:    logo('logo-white', `${SQ}/1760138433099-O6ZKPNRKJXYF132XAU6D/LogoWhite%404x.png`, 36),

  heroPhones:   photo('hero-phones', `${SQ}/8e22e466-eece-43fa-a5ec-1668d30e5b4f/Group+968.png`, [600, 900, 1200]),
  photobooth:   photo('photobooth', `${SQ}/b8f990b7-f85a-4d93-9ed5-0f0e474ec83f/Asset+1+2.png`, [400, 800]),
  corporate:    photo('corporate', `${SQ}/bc0d20a6-e4d1-42f2-9750-d378c30a166a/Group+821.png`, [360, 603]),
  parties:      photo('parties', `${SQ}/095c1081-11d6-48c9-9b55-6987c55d4aaa/Group+823.png`, [360, 603]),
  weddings:     photo('weddings', `${SQ}/56cb137f-4047-459e-a145-5b22779ac362/Group+822.png`, [360, 712]),

  brandAlibaba: logo('brands/alibaba', `${SQ}/1760138427043-UDI4XJW59FG78Z6NJ6GK/alibaba.com.png`, 36),
  brandPixi:    logo('brands/pixi-beauty', `${SQ}/1760138427050-QZT89IGFDYRL57ZW43I7/pixi+beauty.png`, 36),
  brandAkp:     logo('brands/akp-sports', `${SQ}/1760138427060-6LH320T175DKUIIC33AW/akp+sports+foundation.png`, 36),
  brandWorld:   logo('brands/world-peace', `${SQ}/1760138427076-Y6HDF6GYNU68PKC3VHZM/world+peace+classic.png`, 36),
  brandWombo:   logo('brands/wombo', `${SQ}/1760138427084-JUZXFW0DUR6ZZG5LKYNS/wombo.ai.png`, 36),
  brandYmca:    logo('brands/ymca', `${SQ}/1760138427091-DX7P64I3CTGDRCQQEZ5Q/ymca.png`, 36),
  brandCresci:  logo('brands/cresci-labs', `${SQ}/1760138427099-UGZQ1VBC79K7RJZ7J1MM/cresci+labs.png`, 36),

  igManila:     photo('instagram/manila', `${SQ}/1760139291264-45SEU9AM8O2ZVN9XYG5V/image-asset.jpeg`, [400, 800]),
  igEdc:        photo('instagram/edc', `${SQ}/1760139293378-FNS3VQ14XD2Z8GW8GSN6/image-asset.jpeg`, [400, 800]),
  igMommy:      photo('instagram/mommy-and-me', `${SQ}/1760139295309-CNR7833GU0NP1CVUOWP5/image-asset.jpeg`, [400, 800]),
  igGlow:       photo('instagram/glow-x-play', `${SQ}/1760139297341-5P8TQBOGD8PN8OLN6N3Q/image-asset.jpeg`, [400, 800]),
};

// Used only in index.html (link previews and the browser tab icon), so they stay PNG/JPEG,
// which every social site and browser accepts.
const STATIC = 'https://static1.squarespace.com/static/68e99499b21c442fceea1771/t';
export const META_IMAGES = [
  { file: 'og-image.jpg', remote: `${STATIC}/68e994bab21c442fceea1c00/1746758179359/bggg.png` },
  // The disco-ball mark (source-images/favicon-mark.src, a PNG), on a transparent square so its
  // aspect ratio is kept. Its drop shadow hangs 33px below the badge, so the same space is added
  // on top to center the badge itself rather than badge + shadow.
  { file: 'favicon.png', source: 'favicon-mark', square: 192, padTop: 33 },
];

// The promo video, built from source-images/video/dance-break-original.mp4 with ffmpeg
// (see README). Phones get the 720p file, bigger screens the 1080p one.
export const VIDEO = {
  sources: [
    { src: '/video/dance-break-720.mp4', media: '(max-width: 860px)' },
    { src: '/video/dance-break-1080.mp4' },
  ],
  poster: '/video/poster.webp',
};

export const LINKS = {
  instagram: 'https://www.instagram.com/playdancebreak/',
  linkedin: 'https://www.linkedin.com/company/playdancebreak/',
  email: 'dancebreak@testjarlabs.com',
};

