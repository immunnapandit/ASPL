import ServiceDetailsArea from '../../service-details/ServiceDetailsArea';
import type { ServiceDetailsPageConfig } from '../../service-details/service-details-data';

const pageConfig: ServiceDetailsPageConfig = {
  title: 'Microsoft Azure',
  subtitle: 'Secure cloud infrastructure, modernization, and scalable delivery',
  heroImage: 'assets/img/service/Azure.png',
  introParagraphs: [
    'Microsoft Azure gives businesses a flexible foundation for application hosting, infrastructure modernization, storage, security, and scalable growth. We help plan and deliver Azure environments that fit both technical and business priorities.',
    'Whether you are moving workloads to the cloud, improving reliability, or building new digital services, our approach focuses on structure, governance, and long-term maintainability.'
  ],
  checklist: [
    'Azure migration and cloud adoption planning',
    'Infrastructure setup, security, and environment design',
    'Monitoring, automation, and DevOps support',
    'Performance, cost, and governance optimization'
  ],
  galleryImages: [
    'assets/img/service/azure-icon.svg',
    'assets/img/service/Azure.png'
  ]
  ,
  closingParagraph:
    'We work to make Azure practical and business-ready by aligning the platform to uptime, cost control, deployment speed, and operational confidence across your teams.',
  faqs: [
    {
      id: 1,
      question: 'Do you support Azure migration projects?',
      answer:
        'Yes, we support planning, migration, environment setup, workload modernization, and post-migration optimization based on business and technical requirements.'
    },
    {
      id: 2,
      question: 'Can you help manage Azure costs and governance?',
      answer:
        'Yes, we help define governance controls, environment structure, monitoring, and optimization practices to keep Azure efficient and manageable over time.'
    },
    {
      id: 3,
      question: 'Do you work with DevOps and automation in Azure?',
      answer:
        'Yes, we support deployment pipelines, automation workflows, monitoring, and operational improvements to make Azure delivery more reliable and repeatable.'
    }
  ]
};

export { pageConfig };

export default function MicrosoftAzure() {
  return <ServiceDetailsArea page={pageConfig} />;
}
