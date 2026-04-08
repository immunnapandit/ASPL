import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../../solutions/generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'Training',
  subtitle: 'Role-based enablement that improves adoption and outcomes',
  category: 'service',
  focus: 'functional training, user readiness, and capability building',
  summary:
    'Equip teams with practical training programs that improve confidence, consistency, and performance across business platforms.',
  image: '/assets/img/service/Training.png',
  highlights: [
    'Role-based learning plans',
    'Functional and platform training',
    'Admin and support knowledge transfer',
    'Adoption reinforcement and readiness',
  ],
};

export { pageConfig };

export default function Training() {
  return <GenericServiceArea page={pageConfig} />;
}
