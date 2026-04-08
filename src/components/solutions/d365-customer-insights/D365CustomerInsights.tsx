import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Customer Insights',
  subtitle: 'Customer intelligence for data-driven engagement',
  category: 'solution',
  focus: 'customer data unification, segmentation, and insights',
  summary:
    'Turn fragmented customer data into actionable insight so teams can personalize journeys, identify opportunities, and improve retention.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'Customer data consolidation strategy',
    'Segmentation and audience intelligence',
    'Engagement analytics and activation',
    'Connected insights across teams'
  ]
};

export { pageConfig };

export default function D365CustomerInsights() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

