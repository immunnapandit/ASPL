const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';

interface CloudinaryImageOptions {
  fallback: string;
  publicId: string;
  transformations?: string;
}

export function getCloudinaryImageUrl({
  fallback,
  publicId,
  transformations = 'f_auto,q_auto',
}: CloudinaryImageOptions) {
  if (!CLOUDINARY_CLOUD_NAME) {
    return fallback;
  }

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}
