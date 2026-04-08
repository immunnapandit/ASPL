import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'App Development',
  subtitle: 'Business applications designed around real operational needs',
  category: 'service',
  focus: 'custom apps, workflow support, and user-focused digital tools',
  summary:
    'Create business applications that streamline operations, improve usability, and connect data across teams and systems.',
  image: '/assets/img/service/App-development.png',
  highlights: [
    'Solution discovery and UX planning',
    'Custom app design and development',
    'Integration and workflow support',
    'Release management and enhancement',
  ],
};

export { pageConfig };

export default function AppDevelopment() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
