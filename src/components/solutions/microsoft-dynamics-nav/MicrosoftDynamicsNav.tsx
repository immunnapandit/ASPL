import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Dynamics NAV',
  subtitle: 'Reliable business management for evolving operations',
  category: 'solution',
  focus: 'NAV support, process improvements, and modernization readiness',
  summary:
    'Keep Dynamics NAV aligned to current business needs with dependable support, extension planning, and a thoughtful future-state roadmap.',
  image: '/assets/img/service/cloud.png',
  highlights: [
    'NAV support and stabilization',
    'Business process optimization',
    'Extension and reporting improvements',
    'Migration planning and advisory'
  ]
};

export { pageConfig };

export default function MicrosoftDynamicsNav() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

