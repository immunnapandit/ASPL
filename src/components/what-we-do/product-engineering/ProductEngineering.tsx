import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../../solutions/generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'Product Engineering',
  subtitle: 'Build scalable digital products with speed and confidence',
  category: 'service',
  focus: 'product design, engineering execution, and iteration',
  summary:
    'Support product-led teams with planning, architecture, development, quality, and continuous improvement across the product lifecycle.',
  image: '/assets/img/service/service-thumb-3.png',
  highlights: [
    'Product discovery and architecture',
    'Engineering delivery and quality',
    'Release planning and iteration',
    'Scale, reliability, and improvement'
  ]
};

export { pageConfig };

export default function ProductEngineering() {
  return <GenericServiceArea page={pageConfig} />;
}

