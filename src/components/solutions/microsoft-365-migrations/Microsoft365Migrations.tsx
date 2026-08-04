import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft 365 Migrations',
  subtitle: 'Reliable migration to Microsoft 365 with minimal disruption',
  category: 'solution',
  focus: 'mailbox, tenant, and data migration planning and execution',
  summary:
    'Move mailboxes, files, and workloads to Microsoft 365 from on-premises Exchange, legacy email hosting, other tenants, or Google Workspace with a structured, low-risk migration approach.',
  image: '/assets/img/service/Microsoft.svg',
  highlights: [
    'Mailbox and Exchange migration planning and cutover',
    'Tenant-to-tenant and cross-domain migration support',
    'SharePoint, OneDrive, and Teams data migration',
    'Post-migration validation, coexistence, and support'
  ]
};

export { pageConfig };

export default function Microsoft365Migrations() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
