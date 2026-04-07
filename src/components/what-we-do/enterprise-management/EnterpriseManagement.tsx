import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../../solutions/generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'Enterprise Management',
  subtitle: 'Operational alignment for growing and complex organizations',
  category: 'service',
  focus: 'governance, process control, and business management visibility',
  summary:
    'Support enterprise-scale operations with better governance, connected processes, and management visibility across functions.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'Governance and operating model design',
    'Process standardization support',
    'Cross-functional visibility improvement',
    'Management reporting and controls'
  ]
};

export { pageConfig };

export default function EnterpriseManagement() {
  return <GenericServiceArea page={pageConfig} />;
}

