import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'CRM 2016',
  subtitle: 'Stable operations with room for modernization',
  category: 'solution',
  focus: 'CRM 2016 support, process tuning, and extension planning',
  summary:
    'Maintain CRM 2016 performance while extending key capabilities, improving adoption, and preparing for future platform decisions.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'CRM 2016 support and monitoring',
    'Process tuning and productivity improvements',
    'Integration and data quality support',
    'Roadmap planning for modernization'
  ]
};

export { pageConfig };

export default function Crm2016() {
  return <GenericServiceArea page={pageConfig} />;
}

