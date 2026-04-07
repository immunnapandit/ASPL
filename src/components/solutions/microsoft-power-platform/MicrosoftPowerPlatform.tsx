import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Power Platform',
  subtitle: 'Low-code automation, apps, and analytics at scale',
  category: 'solution',
  focus: 'Power Apps, Power Automate, Power BI, and business acceleration',
  summary:
    'Turn manual processes into connected digital workflows with low-code apps, automation, reporting, and governance that scale.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'Low-code solution design and delivery',
    'Workflow automation and approvals',
    'Reporting and dashboard enablement',
    'Platform governance and adoption'
  ]
};

export { pageConfig };

export default function MicrosoftPowerPlatform() {
  return <GenericServiceArea page={pageConfig} />;
}

