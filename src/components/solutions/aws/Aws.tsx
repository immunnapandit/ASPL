import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'AWS',
  subtitle: 'Cloud architecture, migration, and operational scalability on AWS',
  category: 'solution',
  focus: 'cloud migration, architecture, security, automation, and application scalability',
  summary:
    'Design and improve AWS environments that support secure growth, faster delivery, and reliable application performance across modern cloud workloads.',
  image: '/assets/img/service/saas-concept-collage.jpg',
  highlights: [
    'AWS migration planning and cloud architecture design',
    'Infrastructure setup, security controls, and environment readiness',
    'Automation, monitoring, and reliability improvements for operations',
    'Cost optimization, governance, and continuous cloud support'
  ],
};

export { pageConfig };

export default function Aws() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
