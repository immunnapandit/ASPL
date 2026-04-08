import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Project Service Automation',
  subtitle: 'Project delivery, resourcing, and profitability control',
  category: 'solution',
  focus: 'project planning, execution, utilization, and billing',
  summary:
    'Manage project operations with stronger planning, better resource visibility, improved delivery governance, and faster commercial control.',
  image: '/assets/img/service/service-thumb-3.png',
  highlights: [
    'Project lifecycle and governance setup',
    'Resource planning and utilization visibility',
    'Time, expense, and billing workflows',
    'Project reporting and profitability insight'
  ]
};

export { pageConfig };

export default function D365ProjectServiceAutomation() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

