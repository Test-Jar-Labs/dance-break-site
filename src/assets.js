// Every image used on the site. `local` is the self-hosted copy in /public;
// `remote` is the original Squarespace URL, used as a fallback until
// `npm run fetch-assets` has downloaded the local copies.
const SQ = 'https://images.squarespace-cdn.com/content/v1/68e99499b21c442fceea1771';
const STATIC = 'https://static1.squarespace.com/static/68e99499b21c442fceea1771/t';

export const ASSETS = {
  logo:          { local: '/images/logo.png',          remote: `${SQ}/1760138426992-NYGG4VW8MMHNZV1PVW89/Dance+Break+Logo+New+4x.png` },
  logoWhite:     { local: '/images/logo-white.png',    remote: `${SQ}/1760138433099-O6ZKPNRKJXYF132XAU6D/LogoWhite%404x.png` },
  heroPhones:    { local: '/images/hero-phones.png',   remote: `${SQ}/8e22e466-eece-43fa-a5ec-1668d30e5b4f/Group+968.png` },
  photobooth:    { local: '/images/photobooth.png',    remote: `${SQ}/b8f990b7-f85a-4d93-9ed5-0f0e474ec83f/Asset+1+2.png` },
  corporate:     { local: '/images/corporate.png',     remote: `${SQ}/bc0d20a6-e4d1-42f2-9750-d378c30a166a/Group+821.png` },
  parties:       { local: '/images/parties.png',       remote: `${SQ}/095c1081-11d6-48c9-9b55-6987c55d4aaa/Group+823.png` },
  weddings:      { local: '/images/weddings.png',      remote: `${SQ}/56cb137f-4047-459e-a145-5b22779ac362/Group+822.png` },
  testimonials:  { local: '/images/testimonials.png',  remote: `${SQ}/1760138427108-T04XHL0DN3RIVQE2M3Q2/messages+from+brands.png` },
  ogImage:       { local: '/images/og-image.png',      remote: `${STATIC}/68e994bab21c442fceea1c00/1746758179359/bggg.png` },
  appIcon:       { local: '/images/app-icon.png',      remote: `${STATIC}/68e99acdcde00b741d353686/1760139981172/App+Icon+2.png` },

  brandAlibaba:  { local: '/images/brands/alibaba.png',        remote: `${SQ}/1760138427043-UDI4XJW59FG78Z6NJ6GK/alibaba.com.png` },
  brandPixi:     { local: '/images/brands/pixi-beauty.png',    remote: `${SQ}/1760138427050-QZT89IGFDYRL57ZW43I7/pixi+beauty.png` },
  brandAkp:      { local: '/images/brands/akp-sports.png',     remote: `${SQ}/1760138427060-6LH320T175DKUIIC33AW/akp+sports+foundation.png` },
  brandImage77:  { local: '/images/brands/brand-77.png',       remote: `${SQ}/1760138427068-3TOZHF44YHALFIS61C3L/image+77.png` },
  brandWorld:    { local: '/images/brands/world-peace.png',    remote: `${SQ}/1760138427076-Y6HDF6GYNU68PKC3VHZM/world+peace+classic.png` },
  brandWombo:    { local: '/images/brands/wombo.png',          remote: `${SQ}/1760138427084-JUZXFW0DUR6ZZG5LKYNS/wombo.ai.png` },
  brandYmca:     { local: '/images/brands/ymca.png',           remote: `${SQ}/1760138427091-DX7P64I3CTGDRCQQEZ5Q/ymca.png` },
  brandCresci:   { local: '/images/brands/cresci-labs.png',    remote: `${SQ}/1760138427099-UGZQ1VBC79K7RJZ7J1MM/cresci+labs.png` },

  igManila:      { local: '/images/instagram/manila.jpg',      remote: `${SQ}/1760139291264-45SEU9AM8O2ZVN9XYG5V/image-asset.jpeg` },
  igEdc:         { local: '/images/instagram/edc.jpg',         remote: `${SQ}/1760139293378-FNS3VQ14XD2Z8GW8GSN6/image-asset.jpeg` },
  igMommy:       { local: '/images/instagram/mommy-and-me.jpg',remote: `${SQ}/1760139295309-CNR7833GU0NP1CVUOWP5/image-asset.jpeg` },
  igGlow:        { local: '/images/instagram/glow-x-play.jpg', remote: `${SQ}/1760139297341-5P8TQBOGD8PN8OLN6N3Q/image-asset.jpeg` },
};

// The promo video. Squarespace serves it as an HLS stream; the fetch script
// tries to save it as an mp4, otherwise drop the original DBAd1_Horizontal.mp4
// into public/video/dance-break.mp4.
export const VIDEO = {
  local: '/video/dance-break.mp4',
  hls: 'https://video.squarespace-cdn.com/content/v1/68e99499b21c442fceea1771/b657f3c9-6e06-44d6-bd45-0aa21227581b/playlist.m3u8',
};

export const LINKS = {
  instagram: 'https://www.instagram.com/playdancebreak/',
  linkedin: 'https://www.linkedin.com/company/playdancebreak/',
  email: 'dancebreak@testjarlabs.com',
};

