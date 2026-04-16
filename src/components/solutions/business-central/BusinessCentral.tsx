import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Business Central',
  subtitle: 'Connected finance, operations, and reporting for growing businesses',
  category: 'solution',
  focus: 'finance management, inventory, operations, reporting, and business visibility',
  summary:
    'Use Dynamics 365 Business Central to connect day-to-day operations, improve financial control, and give teams better visibility across sales, purchasing, inventory, and service.',
  image: '/assets/img/service/Business Central.avif',
  highlights: [
    'Financial management and reporting aligned to business performance',
    'Inventory, purchasing, and operations workflows in one connected system',
    'Integrated data visibility across sales, service, and back-office teams',
    'Process optimization, user adoption, and ongoing support after rollout'
  ],
};

export { pageConfig };

export default function BusinessCentral() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
