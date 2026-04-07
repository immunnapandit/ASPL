import ServiceDetailsArea from '../../service-details/ServiceDetailsArea';
import type { ServiceDetailsPageConfig } from '../../service-details/service-details-data';

const pageConfig: ServiceDetailsPageConfig = {
  title: 'Cloud Technology',
  subtitle: 'Cloud services built for reliability, agility, and controlled growth',
  heroImage: 'assets/img/service/Cloud.svg',
  introParagraphs: [
    'Cloud technology services help businesses modernize infrastructure, improve flexibility, and support faster delivery across applications and operations. We work with teams to define a realistic cloud path that matches performance, security, and business goals.',
    'Our support covers planning, deployment, modernization, and optimization so cloud investments stay practical, scalable, and aligned to day-to-day business operations.'
  ],
  checklist: [
    'Cloud readiness reviews and migration planning',
    'Infrastructure deployment and operational support',
    'Automation, monitoring, and release enablement',
    'Governance, optimization, and long-term scaling'
  ],
  galleryImages: [
    'assets/img/service/Cloud.svg',
    'assets/img/service/azure-icon.svg'
  ]
  ,
  closingParagraph:
    'We focus on making cloud programs manageable and outcome-driven, so teams can improve resilience, speed, and visibility without adding unnecessary complexity.',
  faqs: [
    {
      id: 1,
      question: 'What is included in your cloud technology support?',
      answer:
        'We support cloud planning, migration, infrastructure setup, automation, monitoring, optimization, and ongoing operational improvements based on business needs.'
    },
    {
      id: 2,
      question: 'Do you work only with new cloud environments?',
      answer:
        'No, we also help improve and modernize existing environments, including governance, reliability, performance, and deployment workflows.'
    },
    {
      id: 3,
      question: 'Can you support hybrid or phased cloud adoption?',
      answer:
        'Yes, we can work with phased migration strategies and hybrid setups when businesses need controlled transition plans rather than an all-at-once move.'
    }
  ]
};

export { pageConfig };

export default function CloudTechnology() {
  return <ServiceDetailsArea page={pageConfig} />;
}
