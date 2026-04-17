import { useLocation } from 'react-router-dom';
import Seo, { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, type SeoProps } from './Seo';

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
    logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    email: 'info@atisunya.co',
    sameAs: [
      'https://www.facebook.com/AtiSunya.co/',
      'https://www.instagram.com/atisunyaerpai/',
      'https://www.linkedin.com/company/atisunyaprivatelimited/',
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
    areaServed: 'Global',
    url: `${SITE_URL}${path}`,
  };
}

function buildSeoForPath(pathname: string): SeoProps {
  const organizationSchema = buildOrganizationSchema();

  const pageMap: Record<string, SeoProps> = {
    '/': {
      title: 'AtiSunya | Microsoft Dynamics 365, Azure Cloud and AI Solutions',
      description:
        'AtiSunya helps businesses modernize with Microsoft Dynamics 365, Azure cloud, Power Platform, AI solutions, training, and managed services.',
      schema: [organizationSchema, buildWebsiteSchema()],
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
    '/working-process': {
      title: 'Our Working Process | AtiSunya',
      description:
        'See how AtiSunya plans, delivers, and supports digital transformation projects across ERP, CRM, cloud, analytics, and AI services.',
      schema: organizationSchema,
    },
    '/become-mct': {
      title: 'Become an MCT with AtiSunya',
      description:
        'Start your Microsoft Certified Trainer readiness journey with AtiSunya through structured guidance, training support, and practical enablement.',
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

  const isServicePage =
    pathname === '/ai-solutions' ||
    pathname === '/microsoft-certified-trainer-readiness-training' ||
    pathname.startsWith('/solutions/') ||
    pathname.startsWith('/what-we-do/') ||
    pathname.startsWith('/insights/');

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
      schema: [organizationSchema, buildServiceSchema(pageName, description, pathname)],
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
