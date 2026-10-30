import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';
import pageConfig from './pageConfig';

export default function AiSolutions() {
  return (
    <WhatWeDoServiceLayout
      page={pageConfig}
      relatedServices={[
        {
          title: 'Azure AI Production-Readiness Assessment',
          description: 'Review Azure AI architecture, data protection, evaluation, responsible AI controls, and production operations.',
          href: '/solutions/microsoft-azure/azure-ai-production-readiness-assessment'
        }
      ]}
    />
  );
}

