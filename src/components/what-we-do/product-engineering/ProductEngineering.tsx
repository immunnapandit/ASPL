import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Product Engineering',
  subtitle: 'Microsoft Dynamics 365 Finance and Supply Chain Management',
  category: 'service',
  focus: 'enterprise operations, finance workflows, and supply chain visibility',
  summary:
    'Implement a connected operations platform that helps teams streamline finance, procurement, manufacturing, warehousing, and reporting.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'Financial, sales and procurement management',
    'Planning and advanced warehouse management',
    'Discrete, process and lean manufacturing',
    'Retail, project accounting and field service'
  ]
};

export { pageConfig };

export default function ProductEngineering() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

