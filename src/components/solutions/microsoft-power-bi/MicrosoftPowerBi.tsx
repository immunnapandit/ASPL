import ServiceDetailsArea from '../../service-details/ServiceDetailsArea';
import type { ServiceDetailsPageConfig } from '../../service-details/service-details-data';

const pageConfig: ServiceDetailsPageConfig = {
  title: 'Microsoft Power BI',
  subtitle: 'Interactive dashboards and reporting that support faster decisions',
  heroImage: 'assets/img/service/power-bi-icon.svg',
  introParagraphs: [
    'Microsoft Power BI helps organizations turn raw data into clear dashboards, reports, and insights that teams can actually use in daily operations. We design reporting solutions that are aligned to KPIs, business roles, and decision cycles.',
    'From dashboard planning to data modeling and rollout support, we focus on making Power BI useful, reliable, and easy to adopt across functions and leadership teams.'
  ],
  checklist: [
    'Power BI dashboard strategy and design',
    'Data modeling and report development',
    'KPI tracking and decision-ready insights',
    'User adoption, governance, and enhancement support'
  ],
  galleryImages: [
    'assets/img/service/power-bi-icon.svg',
    'assets/img/service/PowerPlatform.svg'
  ]
  ,
  closingParagraph:
    'A strong analytics setup is not only about visuals. It is about trusted data, relevant metrics, and a reporting experience that helps teams respond faster and plan better.',
  faqs: [
    {
      id: 1,
      question: 'Can you build custom Power BI dashboards?',
      answer:
        'Yes, we create role-based dashboards and reports based on business objectives, KPI needs, and the decision patterns of operational and leadership teams.'
    },
    {
      id: 2,
      question: 'Do you help with data preparation and modeling?',
      answer:
        'Yes, we support data structuring, modeling, cleanup, and reporting design so the final dashboards are accurate, useful, and maintainable.'
    },
    {
      id: 3,
      question: 'Can Power BI be integrated with other Microsoft solutions?',
      answer:
        'Yes, Power BI can be integrated with Dynamics 365, Power Platform, Azure-based data sources, and many other systems depending on your reporting architecture.'
    }
  ]
};

export { pageConfig };

export default function MicrosoftPowerBi() {
  return <ServiceDetailsArea page={pageConfig} />;
}
