import { readdirSync, readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { basename, extname, relative, resolve, sep } from 'node:path';

const envPath = process.argv[2] || 'backend/.env';
const cloudinaryFolder = process.argv[3] || 'aspl/assets/img';
const sourceFolder = process.argv[4] || 'public/assets/img';
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg']);

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

function walkImageFiles(folder) {
  return readdirSync(folder)
    .flatMap((entry) => {
      const path = resolve(folder, entry);
      const stats = statSync(path);

      if (stats.isDirectory()) {
        return walkImageFiles(path);
      }

      return allowedExtensions.has(extname(path).toLowerCase()) ? [path] : [];
    })
    .sort((a, b) => a.localeCompare(b));
}

function getPublicId(path, rootFolder) {
  return relative(rootFolder, path)
    .split(sep)
    .join('/')
    .replace(/\.([^/.]+)$/, '_$1');
}

const env = readEnv(envPath);
const cloudName = env.CLOUDINARY_CLOUD_NAME;
const apiKey = env.CLOUDINARY_API_KEY;
const apiSecret = env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error(`Cloudinary settings are missing in ${envPath}.`);
}

const resolvedSourceFolder = resolve(sourceFolder);
const images = walkImageFiles(resolvedSourceFolder);

console.log(
  `Uploading ${images.length} image assets from ${sourceFolder} to ${cloudinaryFolder}...`
);

for (const path of images) {
  const publicId = getPublicId(path, resolvedSourceFolder);
  const timestamp = Math.floor(Date.now() / 1000);
  const signatureParams = {
    folder: cloudinaryFolder,
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
  formData.set('folder', cloudinaryFolder);
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
