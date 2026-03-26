interface SubMenuType {
  title: string;
  link: string;
  img?: string;
  buttonText?: string;
  sub_menus?: SubMenuType[]; // 👈 nested support
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
    link: '#',
    has_dropdown: true,
    sub_menus: [
      {
        title: 'Home 01',
        img: 'assets/img/menu/home-1.jpg',
        link: '/',
        buttonText: 'View Page',
      },
      {
        title: 'Home 02',
        img: 'assets/img/menu/home-2.jpg',
        link: '/home-2',
        buttonText: 'View Page',
      },
      {
        title: 'Home 03',
        img: 'assets/img/menu/home-3.jpg',
        link: '/home-3',
        buttonText: 'View Demo',
      },
      {
        title: 'Comming Soon',
        img: 'assets/img/menu/home-4.jpg',
        link: '#',
        buttonText: 'Comming Soon',
      },
      {
        title: 'Comming Soon',
        img: 'assets/img/menu/home-5.jpg',
        link: '#',
        buttonText: 'Comming Soon',
      },
    ],
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
    title: 'Pages',
    link: '#',
    has_dropdown: true,
    sub_menus: [
      { title: 'Team', link: '/team' },
      { title: 'Team Details', link: '/team-details' },
      { title: 'Price', link: '/price' },
      { title: 'Projects', link: '/project' },
      { title: 'Project Details', link: '/project-details' },
      { title: 'Faq', link: '/faq' },
      { title: '404', link: '/404' },
      { title: 'Become MCT', link: '/become-mct' },
    ],
  },

  {
    title: 'Blog',
    link: '#',
    has_dropdown: true,
    sub_menus: [
      { title: 'Blog Grid', link: '/blog-grid' },
      { title: 'Blog List', link: '/blog-list' },
      { title: 'Blog Details', link: '/blog-details' },
    ],
  },

  {
    title: 'Contact',
    link: '/contact',
  },
];

export default menu_data;