import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServicePage from '../generic';

const pageConfig: ServicePageConfig = {
  title: 'Cyber Security',
  subtitle: 'Security hardening, resilience, and risk-aware digital operations',
  category: 'solution',
  focus: 'security posture, identity protection, endpoint security, governance, and monitoring',
  summary:
    'Strengthen your digital environment with practical cyber security services focused on prevention, visibility, control, and business continuity.',
  image: '/assets/img/service/Azure.png',
  highlights: [
    'Security assessment and posture improvement planning',
    'Identity, access, and endpoint protection support',
    'Monitoring readiness and incident response alignment',
    'Governance, compliance, and security optimization'
  ]
};

export { pageConfig };

export default function CyberSecurity() {
  return <GenericServicePage page={pageConfig} />;
}
