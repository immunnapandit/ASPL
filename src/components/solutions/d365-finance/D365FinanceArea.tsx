import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Finance',
  subtitle: 'Modern finance operations with visibility, control, and scalability',
  category: 'solution',
  focus: 'financial processes, compliance, reporting, automation, and operational control',
  summary:
    'Support finance teams with a connected Dynamics 365 Finance solution that improves reporting, strengthens controls, and keeps operations ready for growth.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'Finance process design and ERP configuration',
    'Reporting, compliance, and control visibility',
    'Integrations, automation, and workflow improvements',
    'Optimization, support, and future-state planning'
  ]
};

export { pageConfig };

export default function D365FinanceArea() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
