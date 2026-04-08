import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Cloud Technology',
  subtitle: 'Cloud services built for reliability, agility, and controlled growth',
  category: 'solution',
  focus: 'cloud modernization, infrastructure reliability, automation, and governance',
  summary:
    'Build a practical cloud foundation that improves resilience, deployment speed, and operational visibility without adding unnecessary complexity.',
  image: '/assets/img/service/Cloud.svg',
  highlights: [
    'Cloud readiness reviews and migration planning',
    'Infrastructure deployment and operational support',
    'Automation, monitoring, and release enablement',
    'Governance, optimization, and long-term scaling'
  ],
};

export { pageConfig };

export default function CloudTechnology() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
