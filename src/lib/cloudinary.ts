const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const DEFAULT_ASSET_FOLDER = 'aspl/assets/img';

export const CLOUDINARY_TRANSFORMS = {
  hero: 'f_auto,q_auto:good,c_fill,w_1920,h_900,dpr_auto',
  card: 'f_auto,q_auto:good,c_fill,w_900,h_620,dpr_auto',
  blogCard: 'f_auto,q_auto:good,c_fill,w_900,h_620,dpr_auto',
  largeVisual: 'f_auto,q_auto:good,c_limit,w_1400,dpr_auto',
  logo: 'f_auto,q_auto:good,dpr_auto',
  avatar: 'f_auto,q_auto:good,c_fill,w_160,h_160,dpr_auto',
  decorative: 'f_auto,q_auto:good,dpr_auto',
} as const;

interface CloudinaryImageOptions {
  fallback: string;
  publicId: string;
  transformations?: string;
}

export function getCloudinaryImageUrl({
  fallback,
  publicId,
  transformations = CLOUDINARY_TRANSFORMS.decorative,
}: CloudinaryImageOptions) {
  if (!CLOUDINARY_CLOUD_NAME) {
    return fallback;
  }

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

export function getCloudinaryAssetUrl(
  src: string,
  transformations: string = CLOUDINARY_TRANSFORMS.decorative,
) {
  if (!src || /^https?:\/\//i.test(src) || src.startsWith('data:')) {
    return src;
  }

  if (!CLOUDINARY_CLOUD_NAME) {
    return src;
  }

  const normalizedSrc = src.replace(/\\/g, '/').replace(/^\/+/, '');
  const assetPath = normalizedSrc.replace(/^public\//, '');
  const imagePath = assetPath.replace(/^assets\/img\//, '');

  if (imagePath === assetPath) {
    return src;
  }

  const extension = imagePath.match(/\.([^/.]+)$/)?.[1] || '';
  const publicId = imagePath.replace(/\.([^/.]+)$/, '_$1');
  const formatSuffix = extension ? `.${extension}` : '';
  const deliveryPath = encodeURI(`${DEFAULT_ASSET_FOLDER}/${publicId}${formatSuffix}`);

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${deliveryPath}`;
}

export function getCloudinaryBackgroundImage(
  src: string,
  transformations: string = CLOUDINARY_TRANSFORMS.decorative,
) {
  return `url(${getCloudinaryAssetUrl(src, transformations)})`;
}
