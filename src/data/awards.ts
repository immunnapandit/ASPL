export interface AwardItem {
  id: string;
  title: string;
  /** Populate once the real award/certification artwork is available. */
  image?: string;
}

export const awardsAndCertifications: AwardItem[] = [
  { id: 'award-1', title: 'Award / Certification 01', image: '/assets/img/awards/1.png' },
  { id: 'award-2', title: 'Award / Certification 02', image: '/assets/img/awards/2.png' },
  { id: 'award-3', title: 'Award / Certification 03', image: '/assets/img/awards/3.png' },
  { id: 'award-4', title: 'Award / Certification 04', image: '/assets/img/awards/4.png' },
  { id: 'award-5', title: 'Award / Certification 05', image: '/assets/img/awards/5.png' },
  { id: 'award-6', title: 'Award / Certification 06', image: '/assets/img/awards/6.png' },
];
