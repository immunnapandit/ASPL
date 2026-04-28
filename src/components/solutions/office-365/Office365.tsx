import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Office 365',
  subtitle: 'Productivity, collaboration, and secure workplace modernization',
  category: 'solution',
  focus: 'mail migration, collaboration tools, identity, security, and user adoption',
  summary:
    'Modernize communication and teamwork with Office 365 services that improve collaboration, simplify administration, and support secure hybrid work.',
  image: '/assets/img/service/Microsoft.svg',
  highlights: [
    'Exchange Online and email migration planning',
    'Microsoft Teams, SharePoint, and OneDrive rollout',
    'Identity, access, and security configuration',
    'User enablement, governance, and adoption support'
  ]
};

export { pageConfig };

export default function Office365() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
