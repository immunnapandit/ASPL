import ServiceDetailsArea from '../../service-details/ServiceDetailsArea';
import type { ServiceDetailsPageConfig } from '../../service-details/service-details-data';

const pageConfig: ServiceDetailsPageConfig = {
  title: 'Microsoft Power Platform',
  subtitle: 'Low-code automation, apps, and analytics at scale',
  heroImage: 'assets/img/service/MicrosoftD365.jpg',
  introParagraphs: [
    'Microsoft Power Platform helps teams build apps, automate repetitive work, and bring data into usable dashboards without slowing down delivery. We design solutions that match real business processes and user needs.',
    'From Power Apps and Power Automate to Power BI integration and governance, we help organizations get more value from low-code tools while keeping scale, security, and maintainability in view.'
  ],
  checklist: [
    'Power Apps development for business workflows',
    'Power Automate process automation and approvals',
    'Power BI connectivity and reporting support',
    'Governance, adoption, and platform best practices'
  ],
  galleryImages: [
    'assets/img/service/PowerPlatform.svg',
    'assets/img/service/power-bi-icon.svg'
  ]
  ,
  closingParagraph:
    'Our goal is to make Power Platform useful in day-to-day operations, not just technically functional. That means cleaner processes, measurable time savings, and solutions your teams actually use.',
  faqs: [
    {
      id: 1,
      question: 'What can be built with Power Platform?',
      answer:
        'Power Platform can be used to build internal business apps, automate approvals and repetitive tasks, connect data sources, and create dashboards for reporting and insights.'
    },
    {
      id: 2,
      question: 'Is Power Platform suitable for enterprise teams?',
      answer:
        'Yes, with the right governance, security, and solution design, Power Platform can support enterprise use cases across departments and business units.'
    },
    {
      id: 3,
      question: 'Do you help optimize existing Power Platform solutions?',
      answer:
        'Yes, we can review existing apps and automations, improve performance, simplify flows, strengthen governance, and support future enhancements.'
    }
  ]
};

export { pageConfig };

export default function MicrosoftPowerPlatform() {
  return <ServiceDetailsArea page={pageConfig} />;
}

