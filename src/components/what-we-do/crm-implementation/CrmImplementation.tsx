import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'CRM Implementation',
  subtitle: 'Customer process transformation with measurable outcomes',
  category: 'service',
  focus: 'sales, service, marketing, and customer engagement programs',
  summary:
    'Implement CRM platforms around the way your teams sell, serve, and engage customers while improving visibility and adoption.',
  image: '/assets/img/service/service-thumb-1.png',
  highlights: [
    'Customer process discovery and design',
    'CRM configuration and automation',
    'Data migration and integration support',
    'Training and adoption enablement'
  ]
};

export { pageConfig };

export default function CrmImplementation() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

