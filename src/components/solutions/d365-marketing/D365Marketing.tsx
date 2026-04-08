import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Marketing',
  subtitle: 'Journey orchestration and measurable campaign execution',
  category: 'solution',
  focus: 'campaigns, nurture journeys, and marketing performance',
  summary:
    'Design and optimize marketing journeys that connect data, automation, campaign planning, and measurable customer engagement.',
  image: '/assets/img/service/service-thumb-1.png',
  highlights: [
    'Journey design and campaign workflows',
    'Lead nurturing and marketing automation',
    'Sales and marketing handoff alignment',
    'Performance measurement and refinement'
  ]
};

export { pageConfig };

export default function D365Marketing() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

