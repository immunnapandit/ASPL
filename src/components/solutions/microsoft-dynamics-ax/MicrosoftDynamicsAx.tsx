import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Dynamics AX',
  subtitle: 'Legacy ERP modernization and support strategy',
  category: 'solution',
  focus: 'AX support, optimization, upgrade planning, and continuity',
  summary:
    'Keep Microsoft Dynamics AX stable while improving processes, managing technical debt, and planning the right modernization path forward.',
  image: '/assets/img/service/cloud.png',
  highlights: [
    'AX support and enhancement services',
    'Performance and process optimization',
    'Upgrade and migration planning',
    'Risk-managed continuity strategy'
  ]
};

export { pageConfig };

export default function MicrosoftDynamicsAx() {
  return <GenericServiceArea page={pageConfig} />;
}

