import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'CRM 2015',
  subtitle: 'Support and enhancement for established CRM environments',
  category: 'solution',
  focus: 'legacy CRM support, configuration, and controlled change',
  summary:
    'Protect business continuity in CRM 2015 through structured support, targeted enhancements, and upgrade-aware delivery practices.',
  image: '/assets/img/service/service-thumb-3.png',
  highlights: [
    'Legacy CRM support coverage',
    'Configuration and workflow enhancements',
    'Reporting and usability improvements',
    'Upgrade-aware change management'
  ]
};

export { pageConfig };

export default function Crm2015() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

