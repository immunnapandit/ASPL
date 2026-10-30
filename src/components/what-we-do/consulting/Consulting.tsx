import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';
import pageConfig from './pageConfig';

export default function Consulting() {
  return (
    <WhatWeDoServiceLayout
      page={pageConfig}
      relatedServices={[
        {
          title: 'Cloud Architecture Second-Opinion Review',
          description: 'Get an independent review of cloud design assumptions, risks, options, and operational trade-offs.',
          href: '/solutions/microsoft-azure/cloud-architecture-second-opinion-review'
        },
        {
          title: 'Enterprise Azure Landing Zone Blueprint',
          description: 'Define a governed foundation for enterprise subscriptions, identity, networking, security, and operations.',
          href: '/solutions/microsoft-azure/enterprise-azure-landing-zone-blueprint'
        }
      ]}
    />
  );
}
