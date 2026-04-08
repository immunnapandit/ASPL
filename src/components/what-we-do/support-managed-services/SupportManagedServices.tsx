import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Support & Managed Services',
  subtitle: 'Ongoing support that protects uptime and user confidence',
  category: 'service',
  focus: 'application support, monitoring, optimization, and governance',
  summary:
    'Extend your team with dependable support services that improve system reliability, reduce business disruption, and keep change under control.',
  image: '/assets/img/service/Support-management.png',
  highlights: [
    'L1 to L3 support coverage',
    'Monitoring and issue management',
    'Enhancement and release support',
    'Operational governance and reporting',
  ],
};

export { pageConfig };

export default function SupportManagedServices() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
