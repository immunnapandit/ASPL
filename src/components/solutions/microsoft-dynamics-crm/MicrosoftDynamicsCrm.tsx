import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Dynamics CRM',
  subtitle: 'Customer relationship management with a practical roadmap',
  category: 'solution',
  focus: 'sales, service, process automation, and CRM modernization',
  summary:
    'Improve customer-facing processes and maintain CRM value while planning modernization, support, and user adoption with confidence.',
  image: '/assets/img/service/service-thumb-2.png',
  highlights: [
    'CRM process and workflow optimization',
    'Support for legacy and evolving use cases',
    'User adoption and reporting improvement',
    'Modernization planning and delivery'
  ]
};

export { pageConfig };

export default function MicrosoftDynamicsCrm() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

