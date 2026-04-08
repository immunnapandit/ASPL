import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Digital Transformation',
  subtitle: 'Practical transformation programs with business-first execution',
  category: 'service',
  focus: 'modernization, process redesign, and change enablement',
  summary:
    'Transform business operations with a realistic roadmap that connects technology change, process redesign, and user adoption.',
  image: '/assets/img/service/service-thumb-1.png',
  highlights: [
    'Transformation roadmap creation',
    'Process redesign and prioritization',
    'Technology and data modernization',
    'Change leadership and adoption'
  ]
};

export { pageConfig };

export default function DigitalTransformation() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

