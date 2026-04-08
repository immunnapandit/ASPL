import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Dynamics 365',
  subtitle: 'Unified business applications for modern enterprises',
  category: 'solution',
  focus: 'ERP, CRM, automation, reporting, and connected business operations',
  summary:
    'Connect finance, operations, sales, and customer engagement on one Microsoft platform designed for visibility, collaboration, and scalable growth.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'ERP and CRM implementation aligned to business goals',
    'Process automation, integration, and reporting enablement',
    'Role-based configuration for sales, service, finance, and operations',
    'Continuous optimization and support after go-live'
  ],
};

export { pageConfig };

export default function MicrosoftDynamics365() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

