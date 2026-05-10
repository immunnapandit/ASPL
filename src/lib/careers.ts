import { generalApplication, type JobOpening } from '../data/career-openings';
import { CAREER_OPENINGS_API_URL } from '../config/api';

type CareerOpeningsResponse = {
  ok?: boolean;
  openings?: JobOpening[];
};

const CAREERS_FETCH_TIMEOUT_MS = 8000;

function sortActiveOpenings(openings: JobOpening[]) {
  return openings
    .filter((opening) => opening.status === 'active')
    .sort((left, right) => {
      const rightDate = right.postedAt || right.updatedAt || '';
      const leftDate = left.postedAt || left.updatedAt || '';

      return rightDate.localeCompare(leftDate);
    });
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), CAREERS_FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function fetchCareerOpenings(): Promise<JobOpening[]> {
  try {
    const response = await fetchWithTimeout(CAREER_OPENINGS_API_URL);
    const payload = (await response.json().catch(() => null)) as CareerOpeningsResponse | null;

    if (!response.ok || !Array.isArray(payload?.openings)) {
      throw new Error('Unable to load career openings.');
    }

    const openings = sortActiveOpenings(payload.openings);
    return openings;
  } catch {
    return [];
  }
}

export async function fetchCareerOpeningBySlug(
  slug?: string
): Promise<JobOpening | typeof generalApplication | undefined> {
  if (!slug) {
    return undefined;
  }

  if (slug === generalApplication.slug) {
    return generalApplication;
  }

  const openings = await fetchCareerOpenings();
  return openings.find((opening) => opening.slug === slug);
}
