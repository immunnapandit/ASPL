export type JobOpening = {
  slug: string;
  title: string;
  type: string;
  location: string;
  description: string;
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
};

export const careerOpenings: JobOpening[] = [
  {
    slug: 'dynamics-365-functional-consultant',
    title: 'Dynamics 365 Functional Consultant',
    type: 'Full Time',
    location: 'Noida / Hybrid',
    description:
      'Lead requirement discovery, process mapping, solution design, and stakeholder coordination for enterprise implementations.',
    fullDescription:
      'We are looking for an experienced Dynamics 365 Functional Consultant to join our team. You will work with enterprise clients to understand their business processes, design comprehensive solutions, and oversee successful implementations.',
    responsibilities: [
      'Conduct requirement gathering and process mapping with stakeholders',
      'Design scalable and efficient Dynamics 365 solutions',
      'Lead solution design workshops and documentation',
      'Coordinate with technical teams for implementation',
      'Provide post-implementation support and training',
      'Stay updated with latest D365 features and best practices',
    ],
    requirements: [
      '5+ years of experience with Dynamics 365 implementations',
      'Strong knowledge of ERP processes and best practices',
      'Excellent communication and stakeholder management skills',
      'Experience with project management methodologies',
      'Microsoft Dynamics 365 certification preferred',
      "Bachelor's degree in IT, Business, or related field",
    ],
  },
  {
    slug: 'power-platform-developer',
    title: 'Power Platform Developer',
    type: 'Full Time',
    location: 'Remote / Hybrid',
    description:
      'Design scalable apps, automations, and integrations using Power Apps, Power Automate, and related Microsoft services.',
    fullDescription:
      "Join our development team to create innovative solutions using Microsoft Power Platform. You'll design and develop custom applications, workflows, and integrations that solve real business problems.",
    responsibilities: [
      'Develop custom Power Apps based on business requirements',
      'Create and optimize Power Automate workflows',
      'Design and implement integrations with external systems',
      'Write clean, maintainable code following best practices',
      'Conduct code reviews and provide technical mentorship',
      'Debug and resolve technical issues and performance bottlenecks',
      'Document solutions and create technical specifications',
    ],
    requirements: [
      '3+ years of development experience with Power Platform',
      'Strong proficiency in Power Apps and Power Automate',
      'Experience with Power BI and data modeling',
      'Knowledge of C# or JavaScript',
      'Understanding of API integrations and REST services',
      'Excellent problem-solving and analytical skills',
      'Industry certifications in Power Platform are a plus',
    ],
  },
  {
    slug: 'erp-support-specialist',
    title: 'ERP Support Specialist',
    type: 'Full Time',
    location: 'Noida',
    description:
      'Support live business systems, troubleshoot incidents, and help clients maintain smooth day-to-day operations.',
    fullDescription:
      'We are seeking a dedicated ERP Support Specialist to provide Tier-2 technical support for our ERP implementations. You will work with clients to resolve issues, optimize system performance, and ensure continuous business operations.',
    responsibilities: [
      'Provide technical support to end-users and clients',
      'Troubleshoot and resolve ERP system incidents',
      'Perform system analysis and root cause analysis',
      'Deploy patches, fixes, and system updates',
      'Maintain documentation of issues and resolutions',
      'Collaborate with development teams for issue resolution',
      'Monitor system performance and identify optimization opportunities',
    ],
    requirements: [
      '2+ years of ERP support experience (Dynamics 365 or similar)',
      'Strong troubleshooting and technical analysis skills',
      'Knowledge of database management and SQL basics',
      'Excellent customer service and communication skills',
      'Ability to work in shifts if required',
      'Certification in relevant ERP systems is a plus',
      "Bachelor's degree in IT or related field",
    ],
  },
];

export const generalApplication: JobOpening = {
  slug: 'general-application',
  title: 'General Application',
  type: 'Open Application',
  location: 'Flexible',
  description:
    'Share your profile with us for future opportunities that match your skills.',
  fullDescription:
    'If you do not see a current opening that fits your profile, send us your resume. Our team will review your experience and reach out when a suitable role opens.',
  responsibilities: [
    'Tell us about the kind of role you are looking for',
    'Share relevant project experience and technology skills',
    'Keep your resume and contact details updated',
  ],
  requirements: [
    'Relevant experience in Microsoft business applications, cloud, ERP, CRM, support, or related domains',
    'Strong communication and ownership mindset',
    'Interest in solving practical enterprise technology problems',
  ],
};

export function getCareerOpeningBySlug(slug?: string) {
  if (!slug) {
    return undefined;
  }

  if (slug === generalApplication.slug) {
    return generalApplication;
  }

  return careerOpenings.find((opening) => opening.slug === slug);
}
