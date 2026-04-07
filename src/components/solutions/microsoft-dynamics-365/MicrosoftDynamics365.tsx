import ServiceDetailsArea from '../../service-details/ServiceDetailsArea';
import type { ServiceDetailsPageConfig } from '../../service-details/service-details-data';

const pageConfig: ServiceDetailsPageConfig = {
  title: 'Microsoft Dynamics 365',
  subtitle: 'Unified business applications for modern enterprises',
  heroImage: 'assets/img/service/MicrosoftD365.jpg',
  introParagraphs: [
    'Microsoft Dynamics 365 helps businesses connect finance, operations, sales, and customer engagement on one intelligent platform. We help you shape the right solution based on your operating model, reporting needs, and growth plans.',
    'From implementation to process refinement, our team supports organizations that want clearer visibility, stronger collaboration, and better control across departments using Microsoft business applications.'
  ],
  checklist: [
    'ERP and CRM implementation aligned to business goals',
    'Process automation, integration, and reporting enablement',
    'Role-based configuration for sales, service, finance, and operations',
    'Continuous optimization and support after go-live'
  ],
  galleryImages: [
    'assets/img/service/Dynamics365.svg',
    'assets/img/service/MicrosoftD365.jpg'
  ]
  ,
  closingParagraph:
    'Whether you are modernizing legacy systems or expanding an existing setup, we help keep Dynamics 365 practical, scalable, and adoption-focused so your teams can work with confidence.',
  faqs: [
    {
      id: 1,
      question: 'What can Dynamics 365 improve in a business?',
      answer:
        'Dynamics 365 can improve visibility across departments, reduce manual work, streamline customer and operational processes, and provide better reporting for decision-making.'
    },
    {
      id: 2,
      question: 'Do you support both ERP and CRM modules?',
      answer:
        'Yes, we support ERP and CRM-focused implementations, enhancements, integrations, and optimization programs depending on the needs of your teams and workflows.'
    },
    {
      id: 3,
      question: 'Can you help after go-live?',
      answer:
        'Yes, we provide post-launch support, enhancements, issue resolution, reporting improvements, and roadmap planning for ongoing business growth.'
    }
  ]
};

export { pageConfig };

export default function MicrosoftDynamics365() {
  return <ServiceDetailsArea page={pageConfig} />;
}

