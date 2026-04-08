import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics NAV 2017',
  subtitle: 'Operational continuity with targeted modernization support',
  category: 'solution',
  focus: 'NAV 2017 support, upgrades, and business fit enhancement',
  summary:
    'Support NAV 2017 with practical improvements across finance, supply chain, reporting, and environment health.',
  image: '/assets/img/service/service-thumb-1.png',
  highlights: [
    'NAV 2017 support services',
    'Functional and technical optimization',
    'Reporting and integration improvements',
    'Upgrade path planning'
  ]
};

export { pageConfig };

export default function DynamicsNav2017() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

