import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Dynamics 365',
  subtitle: 'Unified business applications for modern enterprises',
  category: 'solution',
  focus: 'ERP, CRM, automation, and intelligence on one platform',
  summary:
    'Bring finance, operations, sales, service, and customer engagement together with a connected Microsoft business application strategy.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'Connected ERP and CRM processes',
    'Scalable cloud transformation roadmap',
    'Microsoft-first integrations and reporting',
    'Support for continuous optimization'
  ]
};

export { pageConfig };

export default function MicrosoftDynamics365() {
  return <GenericServiceArea page={pageConfig} />;
}

