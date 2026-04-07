import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'AI Solutions',
  subtitle: 'Applied AI for automation, insight, and modern operations',
  category: 'solution',
  focus: 'AI copilots, process automation, and intelligent decision support',
  summary:
    'Use practical AI solutions to automate repetitive work, improve decision quality, and create better experiences across the enterprise.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'AI use-case discovery and prioritization',
    'Copilot and workflow automation design',
    'Insight generation from business data',
    'Responsible rollout and adoption support'
  ]
};

export { pageConfig };

export default function AiSolutions() {
  return <GenericServiceArea page={pageConfig} />;
}

