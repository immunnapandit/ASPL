import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../../solutions/generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'Support & Managed Services',
  subtitle: 'Ongoing support that protects uptime and user confidence',
  category: 'service',
  focus: 'application support, monitoring, optimization, and governance',
  summary:
    'Extend your team with dependable support services that improve system reliability, reduce business disruption, and keep change under control.',
  image: '/assets/img/service/cloud.png',
  highlights: [
    'L1 to L3 support coverage',
    'Monitoring and issue management',
    'Enhancement and release support',
    'Operational governance and reporting'
  ]
};

export { pageConfig };

export default function SupportManagedServices() {
  return <GenericServiceArea page={pageConfig} />;
}

