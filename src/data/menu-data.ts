interface MenuDataType {
  title: string;
  link: string;
  has_dropdown?: boolean;
  sub_menus?: {
    title: string;
    link: string;
    img?: string;
    buttonText?: string;
  }[];
}
[];

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
    title: 'Services',
    link: '#',
    has_dropdown: true,
    sub_menus: [
      { title: 'Service', link: '/service' },
      { title: 'Services Details', link: '/service-details' },
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
