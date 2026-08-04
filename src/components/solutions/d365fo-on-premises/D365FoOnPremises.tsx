import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Finance & Operations (On-Premises)',
  subtitle: 'On-premises ERP deployment with full infrastructure control',
  category: 'solution',
  focus: 'on-premises deployment, data residency, infrastructure control, and compliance',
  summary:
    'Deploy and run Dynamics 365 Finance and Operations in your own data center or private cloud, keeping full control over infrastructure, security, and compliance while retaining modern ERP capabilities.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'On-premises deployment planning and infrastructure setup',
    'Data residency, security, and compliance control',
    'Migration from AX 2012, AX 2009, or cloud to on-premises F&O',
    'Ongoing support, patching, and environment management'
  ]
};

export { pageConfig };

export default function D365FoOnPremises() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
