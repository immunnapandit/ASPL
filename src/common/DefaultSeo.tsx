import { useLocation } from 'react-router-dom';
import { fallbackPublishedBlogPosts } from '../data/published-blog-posts';
import { industryPages } from '../data/industry-pages';
import Seo, { DEFAULT_OG_IMAGE, ORGANIZATION_LOGO, SITE_NAME, SITE_URL, type SeoProps } from './Seo';

function titleFromSegment(segment: string) {
  const wordMap: Record<string, string> = {
    ai: 'AI',
    bi: 'BI',
    crm: 'CRM',
    d365: 'Dynamics 365',
    erp: 'ERP',
    mct: 'MCT',
    nav: 'NAV',
    aws: 'AWS',
    ax: 'AX',
  };

  return segment
    .split('-')
    .map((part) => wordMap[part.toLowerCase()] ?? `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${ORGANIZATION_LOGO}`,
    description: 'Microsoft Dynamics 365, Azure Cloud, AI and Power Platform Consulting Services.',
    email: 'info@atisunya.co',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    areaServed: ['India', 'Global'],
    sameAs: [
      'https://www.facebook.com/AtiSunya.co/',
      'https://www.instagram.com/atisunyaerpai/',
      'https://www.linkedin.com/company/atisunyaprivatelimited/',
    ],
  };
}

function buildProfessionalServiceSchema(path = '/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: `${SITE_URL}${path}`,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    description: 'Microsoft Dynamics 365, Azure Cloud, AI, Copilot, Power Platform, Managed Services, Consulting, Training and Implementation Partner.',
    email: 'info@atisunya.co',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.5355,
      longitude: 77.391,
    },
    areaServed: ['Noida', 'Delhi NCR', 'India', 'Global'],
    serviceType: [
      'Microsoft Dynamics 365',
      'Azure Cloud Consulting',
      'Microsoft Copilot Consulting',
      'Power Platform Development',
      'AI Solutions',
      'Managed Services',
      'Microsoft Training',
    ],
  };
}

function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

function buildServiceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: ['Noida', 'Delhi NCR', 'India', 'Global'],
    url: `${SITE_URL}${path}`,
  };
}

function buildServiceFaqSchema(name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What ${name} services does AtiSunya provide?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `AtiSunya provides consulting, implementation, integration, support, upgrades, training, and managed services for ${name}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Does AtiSunya serve clients in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. AtiSunya serves organizations in Noida, Delhi NCR, across India, and globally.',
        },
      },
    ],
  };
}

function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

function buildCollectionSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

const solutionSeo: Record<string, { name: string; description: string; image?: string }> = {
  '/ai-solutions': {
    name: 'AI Solutions',
    description:
      'Build practical AI automation, intelligent workflows, analytics, and enterprise copilots with AtiSunya for faster, smarter business operations.',
    image: '/assets/img/service/AI.png',
  },
  '/solutions/microsoft-dynamics-365': {
    name: 'Microsoft Dynamics 365',
    description:
      'Implement Microsoft Dynamics 365 with AtiSunya to connect ERP, CRM, finance, sales, operations, service, and reporting on one business platform.',
    image: '/assets/img/service/MicrosoftD365.jpg',
  },
  '/microsoft-dynamics-365-consulting': {
    name: 'Microsoft Dynamics 365 Consulting',
    description:
      'Work with a Dynamics 365 Partner in India for ERP, CRM, finance, operations, migration, support, and managed services from AtiSunya.',
    image: '/assets/img/service/MicrosoftD365.jpg',
  },
  '/solutions/business-central': {
    name: 'Dynamics 365 Business Central',
    description:
      'Modernize finance, operations, inventory, purchasing, sales, and reporting with Microsoft Dynamics 365 Business Central implementation services.',
    image: '/assets/img/service/Business Central.avif',
  },
  '/solutions/d365-for-finance-and-operations': {
    name: 'Dynamics 365 Finance and Operations',
    description:
      'Improve financial control, supply chain visibility, reporting, and enterprise operations with Dynamics 365 Finance and Operations consulting.',
    image: '/assets/img/d365-finance/finance-hero-dashboard.svg',
  },
  '/d365-finance-operations': {
    name: 'D365 Finance and Operations',
    description:
      'Get D365 Finance and Operations consulting for financial control, supply chain visibility, reporting, implementation, and support.',
    image: '/assets/img/d365-finance/finance-hero-dashboard.svg',
  },
  '/solutions/d365-for-supply-chain-management': {
    name: 'Dynamics 365 Supply Chain Management',
    description:
      'Optimize procurement, production, inventory, warehousing, fulfillment, and planning with Dynamics 365 Supply Chain Management services.',
  },
  '/solutions/d365-for-retail': {
    name: 'Dynamics 365 Commerce',
    description:
      'Create connected retail and e-commerce operations with Dynamics 365 Commerce for sales, inventory, customer experience, and order visibility.',
  },
  '/solutions/d365-for-talent': {
    name: 'Dynamics 365 Human Resources',
    description:
      'Streamline employee records, HR workflows, approvals, workforce reporting, and people operations with Dynamics 365 Human Resources.',
  },
  '/solutions/d365-for-sales': {
    name: 'Dynamics 365 Sales',
    description:
      'Strengthen lead management, pipeline visibility, customer engagement, and sales forecasting with Microsoft Dynamics 365 Sales.',
  },
  '/solutions/d365-for-customer-insights': {
    name: 'Dynamics 365 Customer Insights',
    description:
      'Unify customer data, improve segmentation, and personalize engagement with Dynamics 365 Customer Insights consulting from AtiSunya.',
  },
  '/solutions/d365-for-marketing': {
    name: 'Dynamics 365 Marketing',
    description:
      'Plan campaigns, automate journeys, and improve marketing engagement using Microsoft Dynamics 365 Marketing solutions.',
  },
  '/solutions/d365-for-field-service': {
    name: 'Dynamics 365 Field Service',
    description:
      'Improve field operations, work orders, scheduling, technician productivity, and service visibility with Dynamics 365 Field Service.',
  },
  '/solutions/d365-for-project-service-automation': {
    name: 'Dynamics 365 Project Service Automation',
    description:
      'Manage project planning, resources, delivery, approvals, and reporting with Dynamics 365 Project Service Automation support.',
  },
  '/solutions/microsoft-azure': {
    name: 'Microsoft Azure',
    description:
      'Plan, migrate, secure, and modernize cloud workloads with Microsoft Azure consulting, architecture, automation, and managed cloud services.',
    image: '/assets/img/service/Azure.png',
  },
  '/azure-cloud-services': {
    name: 'Azure Cloud Services',
    description:
      'Plan Azure cloud migration, modernization, architecture, security, automation, and managed cloud services with AtiSunya consultants in India.',
    image: '/assets/img/service/Azure.png',
  },
  '/solutions/aws': {
    name: 'AWS Cloud Solutions',
    description:
      'Build secure, scalable AWS cloud environments with AtiSunya for migration, modernization, infrastructure, and operational support.',
    image: '/assets/img/service/aws.png',
  },
  '/solutions/cloud-technology': {
    name: 'Cloud Technology',
    description:
      'Modernize infrastructure, applications, security, monitoring, and cloud operations with AtiSunya cloud technology services.',
  },
  '/solutions/microsoft-power-platform': {
    name: 'Microsoft Power Platform',
    description:
      'Automate processes, build low-code apps, create dashboards, and connect data with Microsoft Power Platform solutions.',
    image: '/assets/img/service/PowerPlatform.svg',
  },
  '/power-platform-services': {
    name: 'Power Platform Services',
    description:
      'Build Power Apps, Power Automate workflows, Power BI dashboards, and low-code business automation with AtiSunya Power Platform experts.',
    image: '/assets/img/service/PowerPlatform.svg',
  },
  '/microsoft-copilot-services': {
    name: 'Microsoft Copilot Consulting',
    description:
      'Adopt Microsoft Copilot with practical consulting, AI readiness, workflow automation, governance, and enterprise enablement from AtiSunya.',
    image: '/assets/img/service/AI.png',
  },
  '/solutions/microsoft-power-platform/power-automate-solutions': {
    name: 'Power Automate Solutions',
    description:
      'Reduce manual work with Microsoft Power Automate workflows for approvals, alerts, integrations, and business process automation.',
  },
  '/solutions/microsoft-power-bi': {
    name: 'Microsoft Power BI',
    description:
      'Turn business data into dashboards, reports, and actionable insights with Microsoft Power BI consulting and implementation.',
    image: '/assets/img/service/power-bi-icon.svg',
  },
  '/solutions/office-365': {
    name: 'Office 365',
    description:
      'Improve collaboration, productivity, email, document management, and secure work with Microsoft Office 365 services.',
    image: '/assets/img/service/Office365.png',
  },
  '/solutions/microsoft-dynamics-ax': {
    name: 'Microsoft Dynamics AX',
    description:
      'Support, upgrade, and modernize Microsoft Dynamics AX environments with AtiSunya consulting, migration, and managed services.',
  },
  '/solutions/microsoft-dynamics-ax/ax-7': {
    name: 'Dynamics AX 7',
    description:
      'Get implementation, support, upgrade, and integration guidance for Microsoft Dynamics AX 7 enterprise operations.',
  },
  '/solutions/microsoft-dynamics-crm': {
    name: 'Microsoft Dynamics CRM',
    description:
      'Improve sales, service, marketing, and customer relationship processes with Microsoft Dynamics CRM consulting and support.',
    image: '/assets/img/service/CRM.png',
  },
  '/solutions/microsoft-dynamics-crm/crm-2015': {
    name: 'Microsoft Dynamics CRM 2015',
    description:
      'Support and modernize Microsoft Dynamics CRM 2015 with consulting, maintenance, integrations, and upgrade planning.',
  },
  '/solutions/microsoft-dynamics-crm/crm-2016': {
    name: 'Microsoft Dynamics CRM 2016',
    description:
      'Maintain, integrate, and upgrade Microsoft Dynamics CRM 2016 with practical consulting and managed support from AtiSunya.',
  },
  '/solutions/microsoft-dynamics-nav': {
    name: 'Microsoft Dynamics NAV',
    description:
      'Support, customize, and migrate Microsoft Dynamics NAV for finance, inventory, sales, purchasing, and operations.',
  },
  '/solutions/microsoft-dynamics-nav/dynamics-nav-2017': {
    name: 'Dynamics NAV 2017',
    description:
      'Get Microsoft Dynamics NAV 2017 support, customization, integration, reporting, and upgrade planning services.',
  },
  '/solutions/microsoft-dynamics-nav/dynamics-nav-2018': {
    name: 'Dynamics NAV 2018',
    description:
      'Modernize and support Microsoft Dynamics NAV 2018 with integrations, reporting, customization, and migration planning.',
  },
  '/solutions/salesforce': {
    name: 'Salesforce',
    description:
      'Implement and optimize Salesforce CRM for sales, service, automation, customer engagement, and business reporting.',
    image: '/assets/img/service/Salesforce.png',
  },
  '/solutions/cyber-security': {
    name: 'Cyber Security',
    description:
      'Protect users, systems, applications, and cloud environments with cybersecurity consulting, monitoring, controls, and risk reduction services.',
  },
};

const serviceSeo: Record<string, { name: string; description: string; image?: string }> = {
  '/what-we-do/erp-implementation': {
    name: 'ERP Implementation',
    description:
      'Deliver ERP implementation projects with process mapping, configuration, migration, integrations, reporting, training, and go-live support.',
    image: '/assets/img/service/ERP_H.jpg',
  },
  '/what-we-do/crm-implementation': {
    name: 'CRM Implementation',
    description:
      'Implement CRM systems that improve lead management, customer service, sales visibility, automation, and relationship management.',
    image: '/assets/img/service/CRM.png',
  },
  '/what-we-do/bi-analytics': {
    name: 'BI and Analytics',
    description:
      'Create BI dashboards, analytics models, reports, and data pipelines that help leaders make faster business decisions.',
    image: '/assets/img/service/analytics.png',
  },
  '/what-we-do/app-development': {
    name: 'App Development',
    description:
      'Build business applications, portals, integrations, and workflow tools that support scalable digital operations.',
    image: '/assets/img/service/App-development.png',
  },
  '/what-we-do/support-managed-services': {
    name: 'Support and Managed Services',
    description:
      'Keep business systems reliable with AtiSunya support, managed services, issue resolution, optimization, and ongoing improvements.',
    image: '/assets/img/service/Support-management.png',
  },
  '/managed-services': {
    name: 'Managed Services',
    description:
      'Keep Microsoft Dynamics 365, Azure, Power Platform, AI, ERP, CRM, and cloud systems reliable with AtiSunya managed services.',
    image: '/assets/img/service/Support-management.png',
  },
  '/what-we-do/enterprise-management': {
    name: 'Enterprise Management',
    description:
      'Connect enterprise teams, processes, reporting, and operations with business technology solutions built for visibility and control.',
    image: '/assets/img/service/Enterprises-management.png',
  },
  '/what-we-do/digital-transformation': {
    name: 'Digital Transformation',
    description:
      'Modernize operations through cloud, ERP, CRM, automation, analytics, AI, and practical digital transformation delivery.',
    image: '/assets/img/service/Digital-transformation.png',
  },
  '/what-we-do/consulting': {
    name: 'Technology Consulting',
    description:
      'Plan technology roadmaps, business applications, cloud architecture, integrations, and transformation programs with AtiSunya consultants.',
    image: '/assets/img/service/Consulting.png',
  },
  '/what-we-do/product-engineering': {
    name: 'Product Engineering',
    description:
      'Design and build scalable software products, platforms, integrations, and digital experiences with AtiSunya product engineering.',
    image: '/assets/img/service/Product-engineering.png',
  },
  '/what-we-do/training': {
    name: 'Technology Training',
    description:
      'Upskill teams with Microsoft technology training across Dynamics 365, Azure, Power Platform, cloud, and enterprise applications.',
    image: '/assets/img/service/Training.png',
  },
  '/microsoft-training': {
    name: 'Microsoft Training',
    description:
      'Upskill teams with Microsoft Dynamics 365, Azure, Power Platform, AI, Copilot, and enterprise technology training from AtiSunya.',
    image: '/assets/img/service/Training.png',
  },
  '/what-we-do/web-development': {
    name: 'Web Development',
    description:
      'Create responsive websites, web applications, portals, and digital experiences with AtiSunya web development services.',
    image: '/assets/img/service/webdevelopment.svg',
  },
  '/microsoft-certified-trainer': {
    name: 'Microsoft Certified Trainers',
    description:
      'Discover Microsoft Certified Trainers: profiles, expertise, and contact details. Find the right trainer for Microsoft Dynamics, Azure, Power Platform, and more.',
    image: '/assets/img/service/MCTRT.png',
  },
};

const insightSeo: Record<string, { name: string; description: string }> = {
  '/insights/gallery': {
    name: 'Gallery',
    description:
      'Explore the AtiSunya gallery featuring team moments, events, workshops, training programs, and business technology activities.',
  },
  '/insights/webinars-events': {
    name: 'Webinars and Events',
    description:
      'See AtiSunya webinars, events, sessions, and learning opportunities across Microsoft technologies, cloud, AI, and business applications.',
  },
  '/insights/success-stories': {
    name: 'Success Stories',
    description:
      'Read AtiSunya success stories showing practical ERP, CRM, cloud, analytics, AI, and digital transformation outcomes.',
  },
};

function buildSeoForPath(pathname: string): SeoProps {
  const organizationSchema = buildOrganizationSchema();

  const pageMap: Record<string, SeoProps> = {
    '/': {
      title: 'Microsoft Dynamics 365, Azure Cloud, AI & Power Platform Experts | AtiSunya',
      description:
        'Microsoft Dynamics 365, Azure Cloud, AI, Copilot, Power Platform, Managed Services, Consulting, Training and Implementation Partner. Transform your business with AtiSunya experts.',
      schema: [organizationSchema, buildWebsiteSchema(), buildProfessionalServiceSchema()],
    },
    '/about': {
      title: 'About AtiSunya | Microsoft Dynamics 365 and Cloud Experts',
      description:
        'Learn about AtiSunya, a technology partner focused on Dynamics 365, Azure, ERP, CRM, digital transformation, and enterprise delivery.',
      schema: organizationSchema,
    },
    '/contact': {
      title: 'Contact AtiSunya | Talk to Our ERP, CRM and Cloud Team',
      description:
        'Contact AtiSunya to discuss Microsoft Dynamics 365, Azure cloud, AI solutions, enterprise applications, training, and support services.',
      schema: organizationSchema,
    },
    '/blog': {
      title: 'AtiSunya Blog | ERP, CRM, Cloud and AI Insights',
      description:
        'Read AtiSunya insights on Microsoft Dynamics 365, ERP, CRM, cloud modernization, automation, analytics, and AI-led business transformation.',
      canonicalPath: '/blog',
      schema: [organizationSchema, buildWebsiteSchema()],
    },
    '/blog-grid': {
      title: 'AtiSunya Blog | ERP, CRM, Cloud and AI Insights',
      description:
        'Read AtiSunya insights on Microsoft Dynamics 365, ERP, CRM, cloud modernization, automation, analytics, and AI-led business transformation.',
      canonicalPath: '/blog',
      schema: [organizationSchema, buildWebsiteSchema()],
    },
    '/blog-list': {
      title: 'AtiSunya Blog | ERP, CRM, Cloud and AI Insights',
      description:
        'Read AtiSunya insights on Microsoft Dynamics 365, ERP, CRM, cloud modernization, automation, analytics, and AI-led business transformation.',
      canonicalPath: '/blog',
      noindex: true,
      schema: [organizationSchema, buildWebsiteSchema()],
    },
    '/faq': {
      title: 'FAQ | AtiSunya',
      description:
        'Find answers to common questions about AtiSunya services, Microsoft Dynamics 365 implementations, support, and technology consulting.',
      schema: organizationSchema,
    },
    '/careers': {
      title: 'Careers at AtiSunya',
      description:
        'Explore career opportunities at AtiSunya and join a team building solutions across Microsoft Dynamics 365, Azure, enterprise apps, and AI.',
      schema: organizationSchema,
    },
    '/careers/general-application': {
      title: 'General Application | Careers at AtiSunya',
      description:
        'Share your profile with AtiSunya for future roles in Microsoft business applications, cloud, ERP, CRM, support, and technology consulting.',
      schema: organizationSchema,
    },
    '/working-process': {
      title: 'Our Working Process | AtiSunya',
      description:
        'See how AtiSunya plans, delivers, and supports digital transformation projects across ERP, CRM, cloud, analytics, and AI services.',
      schema: organizationSchema,
    },
    
    '/privacy-policy': {
      title: 'Privacy Policy | AtiSunya',
      description: 'Read the AtiSunya privacy policy and learn how we collect, use, and protect your information.',
      noindex: true,
      schema: organizationSchema,
    },
    '/terms-and-conditions': {
      title: 'Terms and Conditions | AtiSunya',
      description: 'Review the terms and conditions for using the AtiSunya website and services.',
      noindex: true,
      schema: organizationSchema,
    },
    '/pay-now': {
      title: 'Pay Now | AtiSunya',
      description: 'Securely complete your payment for AtiSunya services and training.',
      noindex: true,
      schema: organizationSchema,
    },
    '/service': {
      title: 'Services | ERP, CRM, Cloud, AI and Managed Services | AtiSunya',
      description:
        'Explore AtiSunya services for ERP implementation, CRM, cloud modernization, BI analytics, AI, training, support, and managed services.',
      schema: [organizationSchema, buildCollectionSchema('AtiSunya Services', 'ERP, CRM, cloud, AI, analytics, training, and managed services from AtiSunya.', '/service')],
    },
    '/service-details': {
      title: 'Service Details | AtiSunya',
      description:
        'Learn more about AtiSunya technology services across Microsoft Dynamics 365, cloud, AI, analytics, training, and support.',
      canonicalPath: '/service',
      noindex: true,
      schema: organizationSchema,
    },
    '/team': {
      title: 'Team | AtiSunya',
      description:
        'Meet the AtiSunya team delivering Microsoft Dynamics 365, Azure, AI, ERP, CRM, analytics, and technology consulting solutions.',
      schema: organizationSchema,
    },
    '/team-details': {
      title: 'Team Details | AtiSunya',
      description: 'Learn more about AtiSunya team members and technology expertise.',
      canonicalPath: '/team',
      noindex: true,
      schema: organizationSchema,
    },
    '/price': {
      title: 'Pricing | AtiSunya',
      description:
        'Explore AtiSunya service and training pricing information for technology consulting, implementation, and support needs.',
      schema: organizationSchema,
    },
    '/project': {
      title: 'Projects | AtiSunya',
      description:
        'Explore AtiSunya project work across ERP, CRM, Microsoft Dynamics 365, cloud, analytics, AI, and enterprise technology.',
      schema: [organizationSchema, buildCollectionSchema('AtiSunya Projects', 'AtiSunya project work across ERP, CRM, cloud, AI, analytics, and enterprise technology.', '/project')],
    },
    '/project-details': {
      title: 'Project Details | AtiSunya',
      description: 'Learn more about AtiSunya enterprise technology project delivery and outcomes.',
      canonicalPath: '/project',
      noindex: true,
      schema: organizationSchema,
    },
    '/home-2': {
      title: 'AtiSunya Home Variant 2',
      description: 'Alternate home page variant for AtiSunya.',
      noindex: true,
      schema: organizationSchema,
    },
    '/home-3': {
      title: 'AtiSunya Home Variant 3',
      description: 'Alternate home page variant for AtiSunya.',
      noindex: true,
      schema: organizationSchema,
    },
  };

  const mappedPage = pageMap[pathname];
  if (mappedPage) {
    return mappedPage;
  }

  const solutionPage = solutionSeo[pathname];
  if (solutionPage) {
    const title = `${solutionPage.name} Services | ${SITE_NAME}`;
    return {
      title,
      description: solutionPage.description,
      image: solutionPage.image,
      schema: [
        organizationSchema,
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions/microsoft-dynamics-365' },
          { name: solutionPage.name, path: pathname },
        ]),
        buildServiceSchema(solutionPage.name, solutionPage.description, pathname),
        buildServiceFaqSchema(solutionPage.name),
      ],
    };
  }

  const servicePage = serviceSeo[pathname];
  if (servicePage) {
    return {
      title: `${servicePage.name} Services | ${SITE_NAME}`,
      description: servicePage.description,
      image: servicePage.image,
      schema: [
        organizationSchema,
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'What We Do', path: '/what-we-do/erp-implementation' },
          { name: servicePage.name, path: pathname },
        ]),
        buildServiceSchema(servicePage.name, servicePage.description, pathname),
        buildServiceFaqSchema(servicePage.name),
      ],
    };
  }

  const insightPage = insightSeo[pathname];
  if (insightPage) {
    return {
      title: `${insightPage.name} | Insights | ${SITE_NAME}`,
      description: insightPage.description,
      schema: [
        organizationSchema,
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/blog' },
          { name: insightPage.name, path: pathname },
        ]),
        buildCollectionSchema(insightPage.name, insightPage.description, pathname),
      ],
    };
  }

  const industryMatch = pathname.match(/^\/industries\/([^/]+)$/);
  if (industryMatch) {
    const industryPage = industryPages.find((page) => page.slug === industryMatch[1]);

    if (industryPage) {
      const description = `${industryPage.summary} AtiSunya helps ${industryPage.title.toLowerCase()} teams improve ${industryPage.focus.toLowerCase()}.`;

      return {
        title: `${industryPage.title} Solutions | ${SITE_NAME}`,
        description,
        image: industryPage.image,
        schema: [
          organizationSchema,
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Industries', path: '/#industries' },
            { name: industryPage.title, path: pathname },
          ]),
          buildServiceSchema(`${industryPage.title} Solutions`, description, pathname),
          buildServiceFaqSchema(`${industryPage.title} Solutions`),
        ],
      };
    }
  }

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const post = fallbackPublishedBlogPosts.find((item) => item.slug === blogMatch[1]);

    if (post) {
      const title = post.seoTitle || `${post.title} | ${SITE_NAME} Blog`;
      const description = post.seoDescription || post.excerpt;

      return {
        title,
        description,
        image: post.imageUrl,
        type: 'article',
        schema: [
          organizationSchema,
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description,
            image: post.imageUrl,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            author: {
              '@type': 'Person',
              name: post.authorName,
            },
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}${ORGANIZATION_LOGO}`,
              },
            },
            mainEntityOfPage: `${SITE_URL}${pathname}`,
          },
        ],
      };
    }
  }

  if (pathname.startsWith('/admin/') || pathname.startsWith('/blog-preview/')) {
    return {
      title: `Private Page | ${SITE_NAME}`,
      description: 'Private AtiSunya website area.',
      noindex: true,
      schema: organizationSchema,
    };
  }

  if (pathname.startsWith('/careers/')) {
    const roleName = titleFromSegment(pathname.split('/').filter(Boolean).pop() || 'career');

    return {
      title: `${roleName} | Careers at ${SITE_NAME}`,
      description:
        'Review this AtiSunya career opportunity and apply to work on Microsoft business applications, cloud, ERP, CRM, AI, and technology services.',
      schema: organizationSchema,
    };
  }

  const isServicePage =
    pathname === '/ai-solutions' ||
    pathname === '/microsoft-certified-trainer' ||
    pathname.startsWith('/solutions/') ||
    pathname.startsWith('/what-we-do/') ||
    pathname.startsWith('/insights/') ||
    pathname.startsWith('/industries/');

  if (isServicePage) {
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] ?? '';
    const pageName = titleFromSegment(lastSegment);
    const section =
      pathname.startsWith('/what-we-do/') ? 'service' : pathname.startsWith('/insights/') ? 'insight' : 'solution';
    const description =
      section === 'insight'
        ? `Explore ${pageName} insights from AtiSunya covering Microsoft technologies, enterprise delivery, and practical business transformation.`
        : `Discover ${pageName} ${section}s from AtiSunya for Microsoft Dynamics 365, Azure, automation, analytics, and scalable business transformation.`;

    return {
      title: `${pageName} | ${SITE_NAME}`,
      description,
      schema: [organizationSchema, buildServiceSchema(pageName, description, pathname), buildServiceFaqSchema(pageName)],
      type: section === 'insight' ? 'article' : 'website',
    };
  }

  return {
    title: `${SITE_NAME} | Technology Solutions and Consulting`,
    description:
      'AtiSunya delivers Microsoft Dynamics 365, cloud, analytics, AI, and enterprise technology services for growing businesses.',
    noindex: pathname === '*',
    schema: organizationSchema,
  };
}

export default function DefaultSeo() {
  const location = useLocation();
  const seo = buildSeoForPath(location.pathname);

  return <Seo {...seo} path={location.pathname} />;
}

