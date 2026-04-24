const PRODUCTION_API_BASE_URL = 'https://aspl-server-1.onrender.com';
const DEVELOPMENT_API_BASE_URL = 'http://localhost:5001';

const API_BASE_URL = import.meta.env.PROD
  ? PRODUCTION_API_BASE_URL
  : DEVELOPMENT_API_BASE_URL;

function buildApiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

export const CONTACT_API_URL =
  import.meta.env.VITE_CONTACT_API_URL || buildApiUrl('/api/contact');

export const CAREER_API_URL =
  import.meta.env.VITE_CAREER_API_URL || buildApiUrl('/api/careers');

export const CAREER_OPENINGS_API_URL =
  import.meta.env.VITE_CAREER_OPENINGS_API_URL || buildApiUrl('/api/careers/openings');

export const ADMIN_CAREER_OPENINGS_API_URL =
  import.meta.env.VITE_ADMIN_CAREER_OPENINGS_API_URL ||
  buildApiUrl('/api/admin/careers/openings');

export const ADMIN_CAREER_APPLICATIONS_API_URL =
  import.meta.env.VITE_ADMIN_CAREER_APPLICATIONS_API_URL ||
  buildApiUrl('/api/admin/careers/applications');

export const ADMIN_CAREERS_SETTINGS_API_URL =
  import.meta.env.VITE_ADMIN_CAREERS_SETTINGS_API_URL ||
  buildApiUrl('/api/admin/careers/settings');

export const NEWSLETTER_API_URL =
  import.meta.env.VITE_NEWSLETTER_API_URL ||
  buildApiUrl('/api/newsletter/subscribe');
