import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'AI Automation',
  subtitle: 'Intelligent automation for repetitive, high-volume work',
  category: 'solution',
  focus: 'AI-driven process automation, copilots, and intelligent decisioning',
  summary:
    'Combine AI with process automation to handle repetitive, rule-based, and judgment-heavy work, reducing manual effort while improving speed and accuracy.',
  image: '/assets/img/service/AI1.jpg',
  highlights: [
    'Automation opportunity assessment across business processes',
    'AI-assisted decisioning and exception handling',
    'Copilot and agent-driven task automation',
    'Monitoring, governance, and continuous improvement'
  ]
};

export { pageConfig };

export default function AiAutomation() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
