import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'Power Automate Solutions',
  subtitle: 'Workflow automation that removes friction from operations',
  category: 'solution',
  focus: 'approvals, alerts, task automation, and system orchestration',
  summary:
    'Automate repetitive business steps with reliable workflow design, alerting, integration logic, and governance for long-term value.',
  image: '/assets/img/service/service-thumb-3.png',
  highlights: [
    'Automation opportunity mapping',
    'Approval and notification workflows',
    'System-to-system orchestration',
    'Governed rollout and optimization'
  ]
};

export { pageConfig };

export default function PowerAutomateSolutions() {
  return <GenericServiceArea page={pageConfig} />;
}

