interface ProjectDataType {
  id: number;
  image: string;
  category: string;
  title: string;
  link?: string;
  animation: {
    duration: number;
    delay: number;
  };
  colClass: string;
}

const project_data: ProjectDataType[] = [
  {
    id: 1,
    image: 'assets/img/project/project-2-1.png',
    category: 'Analytics',
    title: 'Data Tracking & Analysis',
    link: '/project-details',
    animation: {
      duration: 0.9,
      delay: 0.3,
    },
    colClass: 'col-xl-6 col-lg-6 col-md-6',
  },
  {
    id: 2,
    image: 'assets/img/project/project-2-2.png',
    category: 'Analytics',
    title: 'Data Tracking & Analysis',
    link: '/project-details',
    animation: {
      duration: 0.9,
      delay: 0.5,
    },
    colClass: 'col-xl-6 col-lg-6 col-md-6',
  },
  {
    id: 3,
    image: 'assets/img/project/project-2-3.png',
    category: 'Analytics',
    title: 'Data Tracking & Analysis',
    link: '/project-details',
    animation: {
      duration: 0.9,
      delay: 0.7,
    },
    colClass: 'col-xl-6 col-lg-6 col-md-6',
  },
  {
    id: 4,
    image: 'assets/img/project/project-2-4.png',
    category: 'Analytics',
    title: 'Data Tracking & Analysis',
    link: '/project-details',
    animation: {
      duration: 0.9,
      delay: 0.9,
    },
    colClass: 'col-xl-6 col-lg-6 col-md-6',
  },
  {
    id: 5,
    image: 'assets/img/project/project-2-5.png',
    category: 'Analytics',
    title: 'Data Tracking & Analysis',
    link: '/project-details',
    animation: {
      duration: 0.9,
      delay: 0.1,
    },
    colClass: 'col-12',
  },
];

export default project_data;
