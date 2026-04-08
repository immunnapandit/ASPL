import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Consulting',
  subtitle: 'Advisory support that turns direction into delivery',
  category: 'service',
  focus: 'strategy, assessments, roadmap planning, and transformation guidance',
  summary:
    'Get advisory support on platform choices, delivery strategy, operating models, and execution planning across business applications.',
  image: '/assets/img/service/service-thumb-2.png',
  highlights: [
    'Assessments and current-state reviews',
    'Roadmap and business case development',
    'Solution and delivery strategy',
    'Execution guidance and governance'
  ]
};

export { pageConfig };

export default function Consulting() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

