import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Power BI',
  subtitle: 'Interactive dashboards and reporting that support faster decisions',
  category: 'solution',
  focus: 'dashboards, data modeling, KPI visibility, and reporting adoption',
  summary:
    'Turn business data into clear dashboards and decision-ready reporting that teams can trust and use in daily operations.',
  image: '/assets/img/service/power-bi-icon.svg',
  highlights: [
    'Power BI dashboard strategy and design',
    'Data modeling and report development',
    'KPI tracking and decision-ready insights',
    'User adoption, governance, and enhancement support'
  ],
};

export { pageConfig };

export default function MicrosoftPowerBi() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
