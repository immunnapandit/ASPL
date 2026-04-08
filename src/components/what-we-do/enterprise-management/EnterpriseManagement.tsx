import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Enterprise Management',
  subtitle: 'Operational alignment for growing and complex organizations',
  category: 'service',
  focus: 'governance, process control, and business management visibility',
  summary:
    'Support enterprise-scale operations with better governance, connected processes, and management visibility across functions.',
  image: '/assets/img/service/Enterprises-managements.jpg',
  highlights: [
    'Governance and operating model design',
    'Process standardization support',
    'Cross-functional visibility improvement',
    'Management reporting and controls',
  ],
};

export { pageConfig };

export default function EnterpriseManagement() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
