export type JobOpeningStatus = 'active' | 'draft';

export type JobOpening = {
  id: string;
  slug: string;
  title: string;
  type: string;
  location: string;
  department: string;
  experience: string;
  description: string;
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
  status: JobOpeningStatus;
  featured: boolean;
  postedAt: string;
  updatedAt: string;
  linkedinUrl?: string;
};

export const generalApplication = {
  slug: 'general-application',
  title: 'General Application',
  type: 'Open Application',
  location: 'Flexible',
  department: 'Talent Pool',
  experience: 'All levels',
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
