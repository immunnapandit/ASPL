import {
  fallbackCareerOpenings,
  generalApplication,
  type JobOpening,
} from '../data/career-openings';
import { CAREER_OPENINGS_API_URL } from '../config/api';

type CareerOpeningsResponse = {
  ok?: boolean;
  openings?: JobOpening[];
};

export async function fetchCareerOpenings(): Promise<JobOpening[]> {
  try {
    const response = await fetch(CAREER_OPENINGS_API_URL);
    const payload = (await response.json().catch(() => null)) as CareerOpeningsResponse | null;

    if (!response.ok || !Array.isArray(payload?.openings)) {
      throw new Error('Unable to load career openings.');
    }

    return payload.openings;
  } catch {
    return fallbackCareerOpenings;
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
