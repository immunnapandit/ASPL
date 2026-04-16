import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Salesforce',
  subtitle: 'CRM delivery focused on growth, automation, and customer engagement',
  category: 'solution',
  focus: 'customer lifecycle management, automation, analytics, and scalable CRM operations',
  summary:
    'Support sales, service, and customer engagement teams with Salesforce solutions that improve visibility, streamline workflows, and create a more connected customer experience.',
  image: '/assets/img/service/Salesforce.png',
  highlights: [
    'Salesforce implementation shaped around customer and revenue goals',
    'Workflow automation for lead management, service, and business processes',
    'Reporting and pipeline visibility for better decision-making',
    'Enhancement, governance, and support for long-term CRM maturity'
  ],
};

export { pageConfig };

export default function Salesforce() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
