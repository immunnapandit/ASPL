import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Azure',
  subtitle: 'Secure cloud infrastructure, modernization, and scalable delivery',
  category: 'solution',
  focus: 'cloud migration, infrastructure design, DevOps, security, and governance',
  summary:
    'Plan and deliver Azure environments that improve reliability, scalability, and operational control across modern cloud workloads.',
  image: '/assets/img/service/Azure.png',
  highlights: [
    'Azure migration and cloud adoption planning',
    'Infrastructure setup, security, and environment design',
    'Monitoring, automation, and DevOps support',
    'Performance, cost, and governance optimization'
  ],
};

export { pageConfig };

export default function MicrosoftAzure() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
