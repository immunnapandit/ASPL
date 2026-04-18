export interface IndustryPageConfig {
  slug: string;
  title: string;
  cardTitle: string;
  subtitle: string;
  summary: string;
  cardDescription: string;
  image: string;
  focus: string;
  highlights: [string, string, string, string];
  capabilities: string[];
}

export const industryPages: IndustryPageConfig[] = [
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    cardTitle: 'Manufacturing',
    subtitle: 'Smart operations for modern manufacturing teams',
    summary:
      'Connect production, procurement, inventory, quality control, and reporting with solutions built to improve visibility and keep operations moving efficiently.',
    cardDescription:
      'Streamline production planning, inventory visibility, vendor coordination, and plant-level reporting with connected business systems designed for manufacturing growth.',
    image: '/assets/img/service/ERP_H.jpg',
    focus: 'Production planning, procurement, inventory, quality, and plant operations',
    highlights: [
      'Production visibility',
      'Inventory accuracy',
      'Procurement workflows',
      'Operational reporting'
    ],
    capabilities: [
      'Plan production schedules with better control over materials and capacity.',
      'Track procurement, vendors, and warehouse movement in one connected workflow.',
      'Improve quality checks, approvals, and operational reporting for faster decisions.',
      'Reduce manual work across finance, supply chain, and manufacturing teams.'
    ]
  },
  {
    slug: 'retail-ecommerce',
    title: 'Retail & E-Commerce',
    cardTitle: 'Retail & E-Commerce',
    subtitle: 'Connected commerce experiences across channels',
    summary:
      'Support online and offline retail operations with centralized inventory, customer insights, order orchestration, and connected reporting.',
    cardDescription:
      'Provide an unparalleled shopping experience with solutions that optimize orders, inventory, customer engagement, and multi-channel retail operations.',
    image: '/assets/img/shop/shop-big-1-1.png',
    focus: 'Order management, customer experience, inventory, and omni-channel retail',
    highlights: [
      'Omni-channel sales',
      'Order orchestration',
      'Inventory sync',
      'Customer insights'
    ],
    capabilities: [
      'Unify online and offline sales data for a more connected customer journey.',
      'Improve order accuracy, fulfillment speed, and inventory synchronization.',
      'Use customer and sales insights to support better campaigns and retention.',
      'Simplify retail operations with integrated reporting and workflow automation.'
    ]
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    cardTitle: 'Healthcare',
    subtitle: 'Operational efficiency for healthcare organizations',
    summary:
      'Enable healthcare providers and administrators with secure process automation, connected data visibility, and workflow support for day-to-day operations.',
    cardDescription:
      'Transform healthcare management with tailored solutions for patient data visibility, administrative efficiency, and streamlined workflows.',
    image: '/assets/img/service/Consulting1.png',
    focus: 'Administrative workflows, patient data coordination, reporting, and process automation',
    highlights: [
      'Process automation',
      'Data visibility',
      'Administrative efficiency',
      'Service coordination'
    ],
    capabilities: [
      'Streamline scheduling, case handling, and administrative coordination.',
      'Improve visibility into operational data for faster, better-informed decisions.',
      'Reduce repetitive manual work with approvals, alerts, and workflow automation.',
      'Support scalable service delivery with connected business systems.'
    ]
  },
  {
    slug: 'food-beverages',
    title: 'Food & Beverages',
    cardTitle: 'Food & Beverages',
    subtitle: 'Better control across supply, production, and distribution',
    summary:
      'Manage purchasing, batches, production workflows, inventory movement, and reporting with systems that support quality and operational consistency.',
    cardDescription:
      'Strengthen food and beverage operations with connected workflows for production, inventory movement, vendor coordination, and delivery planning.',
    image: '/assets/img/service/service-thumb-2.png',
    focus: 'Batch operations, supply planning, inventory movement, and delivery coordination',
    highlights: [
      'Batch management',
      'Supply planning',
      'Inventory flow',
      'Distribution visibility'
    ],
    capabilities: [
      'Coordinate procurement, warehousing, and production with fewer blind spots.',
      'Monitor inventory and batch-level movement more effectively across facilities.',
      'Support quality-focused operations with clearer process visibility and reporting.',
      'Improve distribution planning and operational responsiveness.'
    ]
  },
  {
    slug: 'engineering',
    title: 'Engineering',
    cardTitle: 'Engineering',
    subtitle: 'Structured delivery for engineering-driven businesses',
    summary:
      'Bring project planning, procurement, resource coordination, and reporting together so engineering teams can execute with greater control.',
    cardDescription:
      'Coordinate engineering delivery with systems that support project execution, resource planning, procurement tracking, and progress reporting.',
    image: '/assets/img/service/Product-engineering.png',
    focus: 'Project delivery, resource planning, procurement, and engineering operations',
    highlights: [
      'Project control',
      'Resource planning',
      'Procurement tracking',
      'Delivery reporting'
    ],
    capabilities: [
      'Improve project visibility across timelines, budgets, and execution stages.',
      'Coordinate teams, vendors, and procurement from a single operational view.',
      'Support engineering workflows with better reporting and status tracking.',
      'Reduce operational friction through connected approvals and planning.'
    ]
  },
  {
    slug: 'education',
    title: 'Education',
    cardTitle: 'Education',
    subtitle: 'Smarter administration and learner-focused workflows',
    summary:
      'Support institutions with systems for admissions, communication, exams, certifications, and ongoing engagement across teams and learners.',
    cardDescription:
      'Manage your institution, optimize exams and certifications, and simplify student or member workflows with intuitive and personalized solutions.',
    image: '/assets/img/service/Training.png',
    focus: 'Admissions, learner workflows, certifications, communication, and institutional reporting',
    highlights: [
      'Admissions support',
      'Exam workflows',
      'Certification tracking',
      'Institutional reporting'
    ],
    capabilities: [
      'Streamline admissions, approvals, and learner communication processes.',
      'Support exams, certifications, and recurring academic workflows more efficiently.',
      'Improve visibility across operations, reporting, and stakeholder coordination.',
      'Create connected digital experiences for students, faculty, and administrators.'
    ]
  },
  {
    slug: 'telecommunication',
    title: 'Telecommunication',
    cardTitle: 'Telecommunication',
    subtitle: 'Operational support for fast-moving telecom environments',
    summary:
      'Improve service coordination, internal workflows, partner processes, and reporting with scalable solutions designed for operational speed.',
    cardDescription:
      'Strengthen telecom operations with better service coordination, process automation, partner workflows, and connected reporting across teams.',
    image: '/assets/img/service/cloud.png',
    focus: 'Service operations, internal coordination, partner processes, and reporting',
    highlights: [
      'Service workflows',
      'Partner coordination',
      'Process automation',
      'Operational dashboards'
    ],
    capabilities: [
      'Manage internal operations with clearer workflow ownership and visibility.',
      'Coordinate service, billing-adjacent, and partner processes more effectively.',
      'Automate repetitive approvals and operational tasks across teams.',
      'Use reporting dashboards to support faster service and operational decisions.'
    ]
  },
  {
    slug: 'technology',
    title: 'Technology',
    cardTitle: 'Technology',
    subtitle: 'Flexible systems for scaling technology businesses',
    summary:
      'Support fast-growing technology teams with connected operations, project workflows, reporting, automation, and scalable digital processes.',
    cardDescription:
      'Build scalable business operations with connected systems for delivery, collaboration, reporting, automation, and service management.',
    image: '/assets/img/service/AI1.jpg',
    focus: 'Project delivery, service workflows, automation, reporting, and scalable operations',
    highlights: [
      'Scalable workflows',
      'Automation',
      'Service visibility',
      'Growth reporting'
    ],
    capabilities: [
      'Create scalable delivery and support workflows across growing teams.',
      'Improve reporting, ownership, and operational visibility for leaders.',
      'Automate manual processes to keep execution faster and more consistent.',
      'Connect internal systems to support collaboration and long-term growth.'
    ]
  },
  {
    slug: 'many-more',
    title: 'Many More Industries',
    cardTitle: 'Many More',
    subtitle: 'Adaptable business solutions for diverse sectors',
    summary:
      'Our approach extends beyond a single vertical, helping businesses across multiple sectors improve operations, visibility, and digital execution.',
    cardDescription:
      'Extend the same structured, scalable approach to additional sectors with business solutions tailored to operational needs and growth goals.',
    image: '/assets/img/service/service-thumb-3.png',
    focus: 'Adaptable workflows, reporting, automation, and operational support across sectors',
    highlights: [
      'Flexible approach',
      'Cross-industry delivery',
      'Scalable systems',
      'Business visibility'
    ],
    capabilities: [
      'Adapt proven delivery methods for different operational models and teams.',
      'Support cross-functional workflows with reporting and process visibility.',
      'Enable better control, automation, and coordination across business units.',
      'Scale solutions based on growth stage, complexity, and industry requirements.'
    ]
  }
];

export function getIndustryPageBySlug(slug: string) {
  return industryPages.find((item) => item.slug === slug);
}
