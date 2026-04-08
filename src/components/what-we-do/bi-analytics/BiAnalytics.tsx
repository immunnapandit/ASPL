import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'BI & Analytics',
  subtitle: 'Reporting, dashboards, and insight that drive action',
  category: 'service',
  focus: 'business reporting, data visibility, and decision intelligence',
  summary:
    'Build reporting ecosystems that make it easier to track performance, identify trends, and support timely business decisions.',
  image: '/assets/img/service/service-thumb-2.png',
  highlights: [
    'KPI and reporting framework design',
    'Dashboard and analytics delivery',
    'Data modeling and quality alignment',
    'Decision-ready business insight'
  ]
};

export { pageConfig };

export default function BiAnalytics() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

