import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Power Platform',
  subtitle: 'Low-code automation, apps, and analytics at scale',
  category: 'solution',
  focus: 'low-code apps, workflow automation, reporting integration, and governance',
  summary:
    'Build apps, automate repetitive work, and connect data into usable reporting with a Power Platform approach aligned to real business processes.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'Power Apps development for business workflows',
    'Power Automate process automation and approvals',
    'Power BI connectivity and reporting support',
    'Governance, adoption, and platform best practices'
  ],
};

export { pageConfig };

export default function MicrosoftPowerPlatform() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

