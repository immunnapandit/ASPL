import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Sales',
  subtitle: 'Pipeline visibility and high-performance selling',
  category: 'solution',
  focus: 'lead management, opportunity execution, and forecasting',
  summary:
    'Equip sales teams with structured pipelines, stronger account management, better forecasting, and Microsoft-powered productivity.',
  image: '/assets/img/service/service-thumb-3.png',
  highlights: [
    'Lead-to-opportunity process alignment',
    'Forecasting and pipeline visibility',
    'Sales productivity with Microsoft tools',
    'Customer engagement and reporting'
  ]
};

export { pageConfig };

export default function D365Sales() {
  return <GenericServiceArea page={pageConfig} />;
}

