import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Field Service',
  subtitle: 'Service delivery with scheduling and mobile enablement',
  category: 'solution',
  focus: 'work orders, dispatching, asset service, and technician productivity',
  summary:
    'Coordinate field teams more effectively with connected scheduling, service visibility, inventory readiness, and customer communication.',
  image: '/assets/img/service/service-thumb-2.png',
  highlights: [
    'Work order and service process design',
    'Scheduling and dispatch optimization',
    'Asset and service inventory visibility',
    'Mobile workforce enablement'
  ]
};

export { pageConfig };

export default function D365FieldService() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

