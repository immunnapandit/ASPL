import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Web Development',
  subtitle: 'Modern websites and web applications built for business growth',
  category: 'service',
  focus: 'responsive websites, portals, integrations, performance, and ongoing enhancement',
  summary:
    'Create fast, scalable web experiences that support lead generation, customer engagement, internal workflows, and long-term digital growth.',
  image: '/assets/img/service/App-development.png',
  highlights: [
    'Business websites and custom web application delivery',
    'Responsive frontend development and UX refinement',
    'API integrations, portals, and business workflows',
    'Performance optimization, support, and continuous improvement'
  ]
};

export { pageConfig };

export default function WebDevelopment() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
