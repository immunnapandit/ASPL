export const customerIndustries = [
  'All',
  'Healthcare',
  'Banking & Finance',
  'Retail & E-commerce',
  'Manufacturing',
  'Education',
  'Logistics',
  'IT & Software',
  'Government',
  'Real Estate',
  'Hospitality',
] as const;

export type Industry = (typeof customerIndustries)[number];
export type CustomerIndustry = Exclude<Industry, 'All'>;

export interface Customer {
  id: string;
  name: string;
  logo: string;
  industry: CustomerIndustry;
  businessType: string;
  services: string[];
  location: string;
  featured: boolean;
}

export interface CustomerTestimonial {
  id: string;
  clientName: string;
  company: string;
  designation: string;
  avatar: string;
  quote: string;
  rating: number;
}

export const customers: Customer[] = [
  {
    id: 'alpha-variance',
    name: 'Alpha Variance Solutions',
    logo: '/assets/img/brand/alpha-variance-solutions.svg',
    industry: 'IT & Software',
    businessType: 'Technology Consulting',
    services: ['Cloud Strategy', 'Power Platform', 'Managed Services'],
    location: 'United States',
    featured: true,
  },
  {
    id: 'adcb',
    name: 'ADCB',
    logo: '/assets/img/brand/adcb.svg',
    industry: 'Banking & Finance',
    businessType: 'Commercial Bank',
    services: ['Dynamics 365', 'Security Advisory'],
    location: 'United Arab Emirates',
    featured: true,
  },
  {
    id: 'daikin',
    name: 'Daikin',
    logo: '/assets/img/brand/daikin.svg',
    industry: 'Manufacturing',
    businessType: 'Industrial Manufacturing',
    services: ['ERP Implementation', 'Analytics'],
    location: 'India',
    featured: true,
  },
  {
    id: 'nmb-bank',
    name: 'NMB Bank',
    logo: '/assets/img/brand/nmb-bank.png',
    industry: 'Banking & Finance',
    businessType: 'Retail Bank',
    services: ['CRM Implementation', 'Data Migration'],
    location: 'Nepal',
    featured: false,
  },
  {
    id: 'hdfc-bank',
    name: 'HDFC Bank',
    logo: '/assets/img/brand/HDFC_Bank.png',
    industry: 'Banking & Finance',
    businessType: 'Financial Services',
    services: ['Training', 'Cloud Advisory'],
    location: 'India',
    featured: false,
  },
  {
    id: 'icici-bank',
    name: 'ICICI Bank',
    logo: '/assets/img/brand/icici-bank.png',
    industry: 'Banking & Finance',
    businessType: 'Financial Institution',
    services: ['Microsoft Training', 'Process Consulting'],
    location: 'India',
    featured: false,
  },
  {
    id: 'bharat-seats',
    name: 'Bharat Seats Limited',
    logo: '/assets/img/brand/bharat-seats-limited.svg',
    industry: 'Manufacturing',
    businessType: 'Automotive Components',
    services: ['ERP Implementation', 'Reporting'],
    location: 'India',
    featured: false,
  },
  {
    id: 'hitachi',
    name: 'Hitachi',
    logo: '/assets/img/brand/hitachi.svg',
    industry: 'Manufacturing',
    businessType: 'Industrial Enterprise',
    services: ['Enterprise Management', 'BI & Analytics'],
    location: 'Japan',
    featured: false,
  },
  {
    id: 'brunswick',
    name: 'Brunswick',
    logo: '/assets/img/brand/brunswick_corporation_logo.jpg',
    industry: 'Manufacturing',
    businessType: 'Consumer Products',
    services: ['Dynamics Support', 'Data Services'],
    location: 'United States',
    featured: false,
  },
  {
    id: 'brown-bites',
    name: 'Brown Bites',
    logo: '/assets/img/brand/brown-bites.svg',
    industry: 'Retail & E-commerce',
    businessType: 'Food Retail',
    services: ['E-commerce Platform', 'CRM'],
    location: 'India',
    featured: false,
  },
  {
    id: 'grandmasters',
    name: 'Grandmasters',
    logo: '/assets/img/brand/grandmasters.svg',
    industry: 'Education',
    businessType: 'Learning Platform',
    services: ['Web Development', 'Learning Systems'],
    location: 'India',
    featured: false,
  },
  {
    id: 'global-knowledge',
    name: 'Global Knowledge',
    logo: '/assets/img/brand/global-knowledge.svg',
    industry: 'Education',
    businessType: 'Professional Training',
    services: ['Microsoft Training', 'Cloud Enablement'],
    location: 'United States',
    featured: false,
  },
  {
    id: 'netcom-learning',
    name: 'NetCom Learning',
    logo: '/assets/img/brand/netcom-learning.svg',
    industry: 'Education',
    businessType: 'Training Provider',
    services: ['Trainer Enablement', 'Certification Programs'],
    location: 'United States',
    featured: false,
  },
  {
    id: 'queen-logistics',
    name: 'Queen Logistics',
    logo: '/assets/img/brand/queen-logistics.png',
    industry: 'Logistics',
    businessType: 'Freight & Logistics',
    services: ['Supply Chain Systems', 'Cloud Support'],
    location: 'India',
    featured: false,
  },
  {
    id: 'ksquare99',
    name: 'Ksquare99 Web Services',
    logo: '/assets/img/brand/ksquare99-web-services.png',
    industry: 'IT & Software',
    businessType: 'Web Services',
    services: ['App Development', 'Managed Services'],
    location: 'India',
    featured: false,
  },
  {
    id: 'syscom',
    name: 'SYSCOM',
    logo: '/assets/img/brand/syscom.svg',
    industry: 'IT & Software',
    businessType: 'Technology Services',
    services: ['Cloud Technology', 'Microsoft 365'],
    location: 'India',
    featured: false,
  },
  {
    id: 'dakhila-campus',
    name: 'Dakhila Campus',
    logo: '/assets/img/brand/dakhila-campus.png',
    industry: 'Education',
    businessType: 'Education Services',
    services: ['Portal Development', 'Analytics'],
    location: 'India',
    featured: false,
  },
  {
    id: 'verdant-enterprises',
    name: 'Verdant Enterprises',
    logo: '/assets/img/brand/verdant-enterprises.png',
    industry: 'Real Estate',
    businessType: 'Property Services',
    services: ['CRM', 'Automation'],
    location: 'India',
    featured: false,
  },
  {
    id: 'alfahhad',
    name: 'Alfahhad Holding Group',
    logo: '/assets/img/brand/alfahhad-holding-group.svg',
    industry: 'Hospitality',
    businessType: 'Holding Company',
    services: ['ERP Advisory', 'Digital Transformation'],
    location: 'Saudi Arabia',
    featured: false,
  },
  {
    id: 'chartered-hightech',
    name: 'Chartered HighTech',
    logo: '/assets/img/brand/chartered-hightech.svg',
    industry: 'Government',
    businessType: 'Public Sector Technology',
    services: ['Secure Platforms', 'Workflow Automation'],
    location: 'India',
    featured: false,
  },
  {
    id: 'orient-electric',
    name: 'Orient Electric',
    logo: '/assets/img/brand/orient-electric.png',
    industry: 'Retail & E-commerce',
    businessType: 'Consumer Electronics',
    services: ['Commerce Systems', 'BI & Analytics'],
    location: 'India',
    featured: false,
  },
];

export const customerTestimonials: CustomerTestimonial[] = [
  {
    id: 'testimonial-1',
    clientName: 'Rizwan Ul Haq',
    company: 'Global Knowledge',
    designation: 'Training Lead',
    avatar: '/assets/img/testimonial/Rizuan.png',
    quote:
      'AtiSunya brought clarity, responsiveness, and deep Microsoft expertise to every stage of the engagement.',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    clientName: 'Nishit Parikh',
    company: 'NetCom Learning',
    designation: 'Program Manager',
    avatar: '/assets/img/testimonial/test-avatar-2-2.png',
    quote:
      'The team understood our goals quickly and helped us deliver a smooth, professional customer experience.',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    clientName: 'Aarav Mehta',
    company: 'Alpha Variance Solutions',
    designation: 'Technology Director',
    avatar: '/assets/img/testimonial/test-avatar-2-1.png',
    quote:
      'Their consulting approach combines practical delivery discipline with thoughtful technology recommendations.',
    rating: 5,
  },
];
