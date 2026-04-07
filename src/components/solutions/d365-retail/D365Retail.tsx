import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Commerce',
  subtitle: 'Unified retail experiences across channels',
  category: 'solution',
  focus: 'store operations, digital commerce, and customer experience',
  summary:
    'Create consistent retail journeys across stores, ecommerce, fulfillment, and loyalty programs using a single commerce foundation.',
  image: '/assets/img/service/service-thumb-2.png',
  highlights: [
    'Omnichannel retail process design',
    'POS, ecommerce, and fulfillment alignment',
    'Customer experience and loyalty enablement',
    'Merchandising and pricing support'
  ]
};

export { pageConfig };

export default function D365Retail() {
  return <GenericServiceArea page={pageConfig} />;
}

