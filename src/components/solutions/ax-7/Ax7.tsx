import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics AX 7',
  subtitle: 'Transition-ready ERP foundation for evolving businesses',
  category: 'solution',
  focus: 'AX 7 support, rollout stabilization, and roadmap planning',
  summary:
    'Support AX 7 environments with governance, enhancements, integrations, and a clear strategy for future platform evolution.',
  image: '/assets/img/service/service-thumb-1.png',
  highlights: [
    'AX 7 environment stabilization',
    'Enhancements and business fit improvements',
    'Integration and reporting support',
    'Transition planning for future growth'
  ]
};

export { pageConfig };

export default function Ax7() {
  return <GenericServiceArea page={pageConfig} />;
}

