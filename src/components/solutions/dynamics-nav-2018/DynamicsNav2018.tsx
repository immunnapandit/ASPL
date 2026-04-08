import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics NAV 2018',
  subtitle: 'Business-ready NAV support for modern operational needs',
  category: 'solution',
  focus: 'NAV 2018 support, integration, and controlled transformation',
  summary:
    'Get a stable NAV 2018 operating model with better visibility, improved business fit, and guidance for the next phase of change.',
  image: '/assets/img/service/service-thumb-2.png',
  highlights: [
    'NAV 2018 stabilization and support',
    'Business-specific process improvements',
    'Integration and data visibility enablement',
    'Transformation planning and advisory'
  ]
};

export { pageConfig };

export default function DynamicsNav2018() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

