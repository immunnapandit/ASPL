import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Human Resources',
  subtitle: 'People operations built for growth and compliance',
  category: 'solution',
  focus: 'HR processes, employee experience, and workforce visibility',
  summary:
    'Improve employee lifecycle management, organizational planning, policy consistency, and workforce insight with connected HR operations.',
  image: '/assets/img/service/cloud.png',
  highlights: [
    'Employee lifecycle process setup',
    'Leave, benefits, and policy workflows',
    'Organization and workforce planning',
    'HR reporting and process automation'
  ]
};

export { pageConfig };

export default function D365Talent() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

