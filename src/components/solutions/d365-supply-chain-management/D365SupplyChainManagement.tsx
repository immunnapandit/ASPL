import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Supply Chain Management',
  subtitle: 'Resilient planning, inventory, and operations control',
  category: 'solution',
  focus: 'procurement, warehousing, production, and logistics visibility',
  summary:
    'Strengthen supply chain execution with better planning, warehouse efficiency, procurement control, and real-time operational insight.',
  image: '/assets/img/service/service-thumb-1.png',
  highlights: [
    'Demand and supply planning alignment',
    'Warehouse and inventory optimization',
    'Procurement and vendor collaboration',
    'Operational dashboards and governance'
  ]
};

export { pageConfig };

export default function D365SupplyChainManagement() {
  return <GenericServiceArea page={pageConfig} />;
}

