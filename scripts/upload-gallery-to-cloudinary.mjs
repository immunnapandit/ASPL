import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { basename, extname, resolve } from 'node:path';

const envPath = process.argv[2] || 'backend/.env';
const galleryFolder = process.argv[3] || 'aspl/gallery';

function readEnv(path) {
  return Object.fromEntries(
    readFileSync(path, 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const [key, ...valueParts] = line.split('=');
        return [key.trim(), valueParts.join('=').trim()];
      })
  );
}

function signCloudinaryParams(params, apiSecret) {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return createHash('sha1')
    .update(`${payload}${apiSecret}`)
    .digest('hex');
}

function getMimeType(path) {
  switch (extname(path).toLowerCase()) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.avif':
      return 'image/avif';
    default:
      return 'application/octet-stream';
  }
}

const env = readEnv(envPath);
const cloudName = env.CLOUDINARY_CLOUD_NAME;
const apiKey = env.CLOUDINARY_API_KEY;
const apiSecret = env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error(`Cloudinary settings are missing in ${envPath}.`);
}

const images = [
  ['public/assets/img/slider/Businees.jpg', 'business-consulting'],
  ['public/assets/img/slider/financilabuilding.jpg', 'corporate-office-building'],
  ['public/assets/img/slider/Cloud1.jpg', 'cloud-consulting-workspace'],
  ['public/assets/img/slider/Cloud2.jpg', 'cloud-infrastructure-planning'],
  ['public/assets/img/service/Consulting.png', 'professional-consulting-team'],
  ['public/assets/img/service/App-development.png', 'application-development-workspace'],
  ['public/assets/img/service/analytics.png', 'business-analytics-dashboard'],
  ['public/assets/img/service/Support-management.png', 'support-managed-services'],
  ['public/assets/img/service/MicrosoftD365.jpg', 'microsoft-dynamics-365-workspace'],
  ['public/assets/img/service/Training.png', 'professional-training-program'],
  ['public/assets/img/slider/slider-1-1.jpg', 'business-transformation-session'],
  ['public/assets/img/slider/slider-1-2.jpg', 'technology-consulting-discussion'],
  ['public/assets/img/project/project-4-1.png', 'project-showcase'],
  ['public/assets/img/project/project-4-2.png', 'project-delivery-showcase'],
  ['public/assets/img/project/project-4-3.png', 'digital-project-showcase'],
];

for (const [path, publicId] of images) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signatureParams = {
    folder: galleryFolder,
    overwrite: 'true',
    public_id: publicId,
    timestamp,
  };
  const signature = signCloudinaryParams(signatureParams, apiSecret);
  const fileBuffer = readFileSync(resolve(path));
  const fileBlob = new Blob([fileBuffer], { type: getMimeType(path) });
  const formData = new FormData();

  formData.set('file', fileBlob, basename(path));
  formData.set('api_key', apiKey);
  formData.set('timestamp', String(timestamp));
  formData.set('folder', galleryFolder);
  formData.set('public_id', publicId);
  formData.set('overwrite', 'true');
  formData.set('signature', signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );
  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.secure_url) {
    throw new Error(
      `Cloudinary upload failed for ${path}: ${
        result?.error?.message || response.statusText
      }`
    );
  }

  console.log(`${result.public_id} -> ${result.secure_url}`);
}
