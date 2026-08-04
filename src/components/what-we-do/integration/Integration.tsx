import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Integration',
  subtitle: 'Connected systems across ERP, CRM, and legacy platforms',
  category: 'service',
  focus: 'system integration, data flow, and process automation across platforms',
  summary:
    'Connect Dynamics 365, legacy applications, and third-party systems so data and processes flow reliably across the business.',
  image: '/assets/img/service/App-development.png',
  highlights: [
    'Integration design across ERP, CRM, and legacy systems',
    'Data mapping, migration, and synchronization',
    'Integration via ESB, APIs, and Power Automate',
    'Monitoring and support for integrated workflows',
  ],
};

export { pageConfig };

export default function Integration() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
