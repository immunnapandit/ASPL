export interface ServiceDetailsFaq {
  id: number;
  question: string;
  answer: string;
}

export interface ServiceSidebarLink {
  label: string;
  href: string;
}

export interface ServiceDetailsPageConfig {
  title: string;
  subtitle: string;
  heroImage: string;
  introParagraphs: string[];
  checklist: string[];
  galleryImages: [string, string];
  closingParagraph: string;
  faqs: ServiceDetailsFaq[];
  sidebarLinks?: ServiceSidebarLink[];
}

export const defaultServiceDetailsPage: ServiceDetailsPageConfig = {
  title: 'Data Security',
  subtitle: 'Service Details',
  heroImage: 'assets/img/service/single-service.png',
  introParagraphs: [
    'When an unknown printer took ar galley offer type year anddey scrambled make aewer specimen a book bethas survived not only five when anner year unknown printer eed little help from friend from time to time. Although we offer the one-stop convenience. unknown printer took galley type year anddey unknown printer took scrambled.',
    'When an unknown printer took ar galley offer type year anddey scrambled make aewer specimen a book bethas survived not only five when anner year unknown printer eed little help from friend from time to time. Although we offer the one-stop convenience. unknown printer took galley type year unknown printer took galley anddey scrambled.'
  ],
  checklist: [
    'Sed nisl fusce est consequat mollis habitasse facilisi rutrum nisle.',
    'Cubilia quisque ad accumsan lorem platea elementum nisl curabitur dapibus.',
    'Egestas magnis sapien hack vehicula condimentum dui enim justo site.'
  ],
  galleryImages: [
    'assets/img/blog/blog-details-thumb-1-2.png',
    'assets/img/blog/blog-details-thumb-1-3.png'
  ],
  closingParagraph:
    'When an unknown printer took ar galley offer type year anddey scrambled make aewer specimen a book bethas survived not only five when anner year unknown printer eed little help from friend from time to time. Although we offer the one-stop convenience. unknown printer took galley type year anddey unknown printer took scrambled.',
  faqs: [
    {
      id: 1,
      question: 'What is vision for the future?',
      answer:
        'Augue enim ut sem vulputate nunc eu ultrices nec bibendum. Nullam non at eu tincidunt non purus vitae.leo nam quam elit imperdiet. Sit malesuada massa scelerisque tincidunt. faucibus Sit dolor ultricie phasellus viverra feugiat enim nisl.'
    },
    {
      id: 2,
      question: 'Do you offer free resources?',
      answer:
        'Logo design costs vary based on project complexity and requirements. We offer packages starting from $499 for basic logos to $1999+ for comprehensive branding solutions with multiple concepts and revisions.'
    },
    {
      id: 3,
      question: 'Can help to find investors?',
      answer:
        'Project timelines depend on scope and complexity. Typical projects take 2-4 weeks from initial consultation to final delivery. We provide detailed timelines during our project kickoff meeting.'
    },
    {
      id: 4,
      question: 'Can help to find investors?',
      answer:
        'Project timelines depend on scope and complexity. Typical projects take 2-4 weeks from initial consultation to final delivery. We provide detailed timelines during our project kickoff meeting.'
    },
    {
      id: 5,
      question: 'What services do you offer?',
      answer:
        'Project timelines depend on scope and complexity. Typical projects take 2-4 weeks from initial consultation to final delivery. We provide detailed timelines during our project kickoff meeting.'
    }
  ]
};
