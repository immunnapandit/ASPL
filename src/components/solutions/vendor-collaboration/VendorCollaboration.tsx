import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Vendor Collaboration',
  subtitle: 'Direct vendor engagement across purchasing, RFQs, and invoicing',
  category: 'solution',
  focus: 'vendor portals, procurement collaboration, RFQ management, and invoice visibility',
  summary:
    'Enable vendors to engage directly with purchase orders, requests for quotation, and invoices through Dynamics 365 Supply Chain Management, reducing manual coordination and improving procurement accuracy.',
  image: '/assets/img/service/service-thumb-1.png',
  highlights: [
    'Vendor portal setup for purchase orders and confirmations',
    'RFQ collaboration and vendor response management',
    'Invoice submission, matching, and status visibility',
    'Reduced manual coordination between procurement and vendors'
  ]
};

export { pageConfig };

export default function VendorCollaboration() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
