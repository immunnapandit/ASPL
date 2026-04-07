interface SubMenuType {
  title: string;
  link: string;
  img?: string;
  buttonText?: string;
  sub_menus?: SubMenuType[];
}

interface MenuDataType {
  title: string;
  link: string;
  has_dropdown?: boolean;
  sub_menus?: SubMenuType[];
}

const menu_data: MenuDataType[] = [
  {
    title: 'Home',
    link: '/', // ✅ direct homepage (no dropdown)
  },

  {
    title: 'About Us',
    link: '/about',
  },

  {
    title: 'Solutions',
    link: '#',
    has_dropdown: true,
    sub_menus: [
      {
        title: 'Microsoft Dynamics 365',
        link: '/solutions/microsoft-dynamics-365',
        sub_menus: [
          {
            title: 'Dynamics 365 Finance',
            link: '/solutions/d365-for-finance-and-operations',
          },
          {
            title: 'Dynamics 365 Supply Chain Management',
            link: '/solutions/d365-for-supply-chain-management',
          },
          {
            title: 'Dynamics 365 Commerce',
            link: '/solutions/d365-for-retail',
          },
          {
            title: 'Dynamics 365 Human Resources',
            link: '/solutions/d365-for-talent',
          },
          {
            title: 'Dynamics 365 Sales',
            link: '/solutions/d365-for-sales',
          },
          {
            title: 'Dynamics 365 Customer Insights',
            link: '/solutions/d365-for-customer-insights',
          },
          {
            title: 'Dynamics 365 Marketing',
            link: '/solutions/d365-for-marketing',
          },
          {
            title: 'Dynamics 365 Field Service',
            link: '/solutions/d365-for-field-service',
          },
          {
            title: 'Dynamics 365 Project Service Automation',
            link: '/solutions/d365-for-project-service-automation',
          }
        ],
      },
      {
        title: 'AI Solutions',
        link: '/ai-solutions',
      },
      {
        title: 'Microsoft Dynamics AX',
        link: '/solutions/microsoft-dynamics-ax',
        sub_menus: [
          {
            title: 'Dynamics AX 7',
            link: '/solutions/microsoft-dynamics-ax/ax-7',
          },
        ]
      },
      {
        title: 'Microsoft Dynamics CRM',
        link: '/solutions/microsoft-dynamics-crm',
        sub_menus: [
          {
            title: 'CRM 2015',
            link: '/solutions/microsoft-dynamics-crm/crm-2015',
          },
          {
            title: 'CRM 2016',
            link: '/solutions/microsoft-dynamics-crm/crm-2016',
          },
        ]
      },
      {
        title: 'Microsoft Dynamics NAV',
        link: '/solutions/microsoft-dynamics-nav',
        sub_menus: [
          {
            title: 'Dynamics NAV 2017',
            link: '/solutions/microsoft-dynamics-nav/dynamics-nav-2017',
          },
          {
            title: 'Dynamics NAV 2018',
            link: '/solutions/microsoft-dynamics-nav/dynamics-nav-2018',
          },
        ]
      },
      {
        title: 'Microsoft Power Platform',
        link: '/solutions/microsoft-power-platform',
        sub_menus: [
          {
            title: 'Power Automate Solutions',
            link: '/solutions/microsoft-power-platform/power-automate-solutions',
          },
        ]
      }
    ],
  },

  {
    title: 'What We Do',
    link: '#',
    has_dropdown: true,
    sub_menus: [
      { title: 'ERP Implementation', link: '/what-we-do/erp-implementation' },
      { title: 'CRM Implementation', link: '/what-we-do/crm-implementation' },
      { title: 'BI & Analytics', link: '/what-we-do/bi-analytics' },
      { title: 'App Development', link: '/what-we-do/app-development' },
      { title: 'Support & Managed Services', link: '/what-we-do/support-managed-services' },
      { title: 'Enterprise Management', link: '/what-we-do/enterprise-management' },
      { title: 'Digital Transformation', link: '/what-we-do/digital-transformation' },
      { title: 'Become MCT', link: '/become-mct' },
      { title: 'Consulting', link: '/what-we-do/consulting' },
      { title: 'Product Engineering', link: '/what-we-do/product-engineering' },
      { title: 'Training', link: '/what-we-do/training' },
      { title: 'Microsoft Certified Training Readiness Training', link: '/microsoft-certified-trainer-readiness-training' },
    ],
  },

  {
    title: 'Insights',
    link: '#',
    has_dropdown: true,
    sub_menus: [
      { title: 'Blog', link: '/blog' },
      { title: 'Webinar & Events', link: '/insights/webinars-events' },
      { title: 'Success Stories', link: '/insights/success-stories' },
    ],
  },
  {
    title: 'Careers',
    link: '/careers',
  },
  {
    title: 'Become MCT',
    link: '/become-mct',
  }

];

export default menu_data;
