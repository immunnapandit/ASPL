import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../../solutions/generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'ERP Implementation',
  subtitle: 'Structured ERP delivery from discovery to go-live',
  category: 'service',
  focus: 'planning, design, rollout, and adoption for ERP programs',
  summary:
    'Deliver ERP programs with the right mix of process design, configuration, testing, change management, and post-go-live support.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'Program planning and fit-gap workshops',
    'Configuration, testing, and deployment',
    'Change management and adoption',
    'Stabilization after go-live'
  ]
};

export { pageConfig };

export default function ErpImplementation() {
  return <GenericServiceArea page={pageConfig} />;
}

