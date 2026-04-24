import { appendFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '.env');

loadEnvFile(envPath);

const PORT = Number(process.env.PORT || 5001);
const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  'https://aspl.vercel.app,http://localhost:5173,http://localhost:3002';
const ALLOWED_ORIGINS = FRONTEND_URL.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const CONTACT_TO_EMAIL = (process.env.CONTACT_TO_EMAIL || 'info@atisunya.co').trim();
const HR_TO_EMAIL = (process.env.HR_TO_EMAIL || 'hr@atisunya.co').trim();
const NEWSLETTER_TO_EMAIL = (
  process.env.NEWSLETTER_TO_EMAIL ||
  CONTACT_TO_EMAIL
).trim();
const NEWSLETTER_STORE_FILE = join(__dirname, 'data', 'newsletter-subscribers.jsonl');
const CAREERS_STORE_FILE = join(__dirname, 'data', 'career-openings.json');
const CAREER_APPLICATIONS_STORE_FILE = join(__dirname, 'data', 'career-applications.json');
const CAREERS_SETTINGS_STORE_FILE = join(__dirname, 'data', 'careers-settings.json');
const GRAPH_TENANT_ID = (process.env.GRAPH_TENANT_ID || '').trim();
const GRAPH_CLIENT_ID = (process.env.GRAPH_CLIENT_ID || '').trim();
const GRAPH_CLIENT_SECRET = process.env.GRAPH_CLIENT_SECRET || '';
const GRAPH_FROM_EMAIL = (
  process.env.GRAPH_FROM_EMAIL ||
  process.env.CONTACT_FROM_EMAIL ||
  'info@atisunya.co'
).trim();
const CAREERS_ADMIN_TOKEN = (
  process.env.CAREERS_ADMIN_TOKEN || 'change-me-careers-admin-token'
).trim();

let graphTokenCache = null;

const DEFAULT_CAREER_OPENINGS = [
  {
    id: 'job-d365-functional-consultant',
    slug: 'dynamics-365-functional-consultant',
    title: 'Dynamics 365 Functional Consultant',
    type: 'Full Time',
    location: 'Noida / Hybrid',
    department: 'Consulting',
    experience: '5+ years',
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
    status: 'active',
    featured: true,
    postedAt: '2026-04-24T09:00:00.000Z',
    updatedAt: '2026-04-24T09:00:00.000Z',
  },
  {
    id: 'job-power-platform-developer',
    slug: 'power-platform-developer',
    title: 'Power Platform Developer',
    type: 'Full Time',
    location: 'Remote / Hybrid',
    department: 'Engineering',
    experience: '3+ years',
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
    status: 'active',
    featured: true,
    postedAt: '2026-04-24T09:00:00.000Z',
    updatedAt: '2026-04-24T09:00:00.000Z',
  },
  {
    id: 'job-erp-support-specialist',
    slug: 'erp-support-specialist',
    title: 'ERP Support Specialist',
    type: 'Full Time',
    location: 'Noida',
    department: 'Support',
    experience: '2+ years',
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
    status: 'active',
    featured: false,
    postedAt: '2026-04-24T09:00:00.000Z',
    updatedAt: '2026-04-24T09:00:00.000Z',
  },
];

const DEFAULT_CAREERS_SETTINGS = {
  careersPageTitle: 'Careers',
  careersPageSubtitle: 'Build your future with ASPL',
  generalCtaTitle: 'Send Us Your Resume',
  generalCtaDescription:
    'Share your profile with us and tell us what kind of role you are looking for. If a matching opportunity opens up, our team will get in touch.',
  notificationEmail: HR_TO_EMAIL,
};

const server = createHttpApp({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === 'OPTIONS') {
      return withCors(req, new Response(null, { status: 204 }));
    }

    if (req.method === 'GET' && url.pathname === '/api/health') {
      return json(
        200,
        {
          ok: true,
          service: 'aspl-contact-backend',
          mailProvider: 'microsoft-graph',
          timestamp: new Date().toISOString(),
        },
        req
      );
    }

    if (req.method === 'POST' && url.pathname === '/api/contact') {
      return handleContactForm(req);
    }

    if (req.method === 'POST' && url.pathname === '/api/careers') {
      return handleCareerApplication(req);
    }

    if (req.method === 'GET' && url.pathname === '/api/careers/openings') {
      return handleCareerOpeningsRequest(req);
    }

    if (url.pathname === '/api/admin/careers/openings') {
      if (req.method === 'GET') {
        return handleAdminCareerOpeningsList(req);
      }

      if (req.method === 'POST') {
        return handleAdminCareerOpeningCreate(req);
      }
    }

    if (url.pathname === '/api/admin/careers/applications') {
      if (req.method === 'GET') {
        return handleAdminCareerApplicationsList(req);
      }
    }

    if (url.pathname.startsWith('/api/admin/careers/applications/')) {
      const applicationId = decodeURIComponent(
        url.pathname.replace('/api/admin/careers/applications/', '')
      );

      if (req.method === 'PATCH' || req.method === 'PUT') {
        return handleAdminCareerApplicationUpdate(req, applicationId);
      }
    }

    if (url.pathname === '/api/admin/careers/settings') {
      if (req.method === 'GET') {
        return handleAdminCareersSettingsGet(req);
      }

      if (req.method === 'PUT' || req.method === 'PATCH') {
        return handleAdminCareersSettingsUpdate(req);
      }
    }

    if (url.pathname.startsWith('/api/admin/careers/openings/')) {
      const openingId = decodeURIComponent(
        url.pathname.replace('/api/admin/careers/openings/', '')
      );

      if (req.method === 'PATCH' || req.method === 'PUT') {
        return handleAdminCareerOpeningUpdate(req, openingId);
      }

      if (req.method === 'DELETE') {
        return handleAdminCareerOpeningDelete(req, openingId);
      }
    }

    if (req.method === 'POST' && url.pathname === '/api/newsletter/subscribe') {
      return handleNewsletterSubscribe(req);
    }

    return json(404, { error: 'Not found' }, req);
  },
});

server.start();

function createHttpApp({ port, fetch }) {
  return {
    start() {
      import('node:http').then(({ createServer }) => {
        const httpServer = createServer(async (req, res) => {
          const chunks = [];

          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', async () => {
            const bodyBuffer = Buffer.concat(chunks);
            const request = new Request(`http://${req.headers.host}${req.url}`, {
              method: req.method,
              headers: req.headers,
              body:
                req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS'
                  ? undefined
                  : bodyBuffer,
            });

            let response;

            try {
              response = await fetch(request);
            } catch (error) {
              console.error('Unhandled backend error:', error);
              response = json(
                500,
                {
                  error: 'Server error while processing the request.',
                },
                request
              );
            }

            res.statusCode = response.status;
            response.headers.forEach((value, key) => {
              res.setHeader(key, value);
            });

            const responseBuffer = Buffer.from(await response.arrayBuffer());
            res.end(responseBuffer);
          });
        });

        httpServer.listen(port, () => {
          console.log(`ASPL contact backend listening on http://localhost:${port}`);

          if (GRAPH_TENANT_ID && GRAPH_CLIENT_ID && GRAPH_CLIENT_SECRET && GRAPH_FROM_EMAIL) {
            console.log('Microsoft Graph settings loaded. Contact emails will be sent on form submission.');
          } else {
            console.warn(
              'Microsoft Graph is not fully configured. Contact form email sending needs GRAPH_TENANT_ID, GRAPH_CLIENT_ID, GRAPH_CLIENT_SECRET, and GRAPH_FROM_EMAIL.'
            );
          }
        });
      });
    },
  };
}

async function handleContactForm(req) {
  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateContactPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  try {
    await sendContactEmail(validation.data);
    return json(200, { ok: true, message: 'Message sent successfully.' }, req);
  } catch (error) {
    console.error('Contact email delivery failed:', error);

    return json(
      getContactEmailErrorStatus(error),
      { error: getContactEmailErrorMessage(error) },
      req
    );
  }
}

async function handleCareerApplication(req) {
  const body = await safeFormData(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid application form submission.' }, req);
  }

  const validation = await validateCareerApplicationPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  try {
    await persistCareerApplicationRecord(validation.data);
    await sendCareerApplicationEmail(validation.data);
    return json(
      200,
      {
        ok: true,
        message: 'Thank you for applying. Our HR team will review your details and contact you soon.',
      },
      req
    );
  } catch (error) {
    console.error('Career application email delivery failed:', error);

    return json(
      getContactEmailErrorStatus(error),
      { error: getContactEmailErrorMessage(error) },
      req
    );
  }
}

async function handleAdminCareerApplicationsList(req) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  try {
    const applications = await readCareerApplications();
    return json(200, { ok: true, applications }, req);
  } catch (error) {
    console.error('Failed to load career applications:', error);
    return json(500, { error: 'Unable to load applications right now.' }, req);
  }
}

async function handleAdminCareerApplicationUpdate(req, applicationId) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateCareerApplicationStatusPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  try {
    const applications = await readCareerApplications();
    const currentApplication = applications.find((item) => item.id === applicationId);

    if (!currentApplication) {
      return json(404, { error: 'Application not found.' }, req);
    }

    const nextApplication = {
      ...currentApplication,
      status: validation.data.status,
      updatedAt: new Date().toISOString(),
    };

    const nextApplications = applications.map((item) =>
      item.id === applicationId ? nextApplication : item
    );

    await writeCareerApplications(nextApplications);

    return json(200, { ok: true, application: nextApplication }, req);
  } catch (error) {
    console.error('Failed to update career application:', error);
    return json(500, { error: 'Unable to update this application right now.' }, req);
  }
}

async function handleAdminCareersSettingsGet(req) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  try {
    const settings = await readCareersSettings();
    return json(200, { ok: true, settings }, req);
  } catch (error) {
    console.error('Failed to load careers settings:', error);
    return json(500, { error: 'Unable to load settings right now.' }, req);
  }
}

async function handleAdminCareersSettingsUpdate(req) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateCareersSettingsPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  try {
    const settings = validation.data;
    await writeCareersSettings(settings);
    return json(200, { ok: true, settings }, req);
  } catch (error) {
    console.error('Failed to update careers settings:', error);
    return json(500, { error: 'Unable to update settings right now.' }, req);
  }
}

async function handleNewsletterSubscribe(req) {
  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateNewsletterPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  if (validation.data.isBotSubmission) {
    return json(
      200,
      {
        ok: true,
        message: 'Thank you for subscribing to the AtiSunya newsletter.',
      },
      req
    );
  }

  const existingSubscription = getExistingNewsletterSubscription(validation.data.email);

  if (existingSubscription?.status === 'subscribed') {
    return json(
      200,
      {
        ok: true,
        alreadySubscribed: true,
        message: 'You are already subscribed to the AtiSunya newsletter.',
      },
      req
    );
  }

  const subscription = {
    id: randomUUID(),
    email: validation.data.email,
    source: validation.data.source,
    status: 'subscribed',
    subscribedAt: new Date().toISOString(),
  };

  try {
    await persistNewsletterSubscription(subscription);
  } catch (error) {
    console.error('Newsletter subscription failed:', error);

    return json(500, { error: 'Unable to save your subscription right now.' }, req);
  }

  try {
    await sendNewsletterSubscriptionEmails(subscription);
  } catch (error) {
    console.error('Newsletter email delivery failed:', error);
  }

  return json(
    200,
    {
      ok: true,
      message: 'Thank you for subscribing to the AtiSunya newsletter.',
    },
    req
  );
}

async function handleCareerOpeningsRequest(req) {
  try {
    const openings = await readCareerOpenings();
    return json(
      200,
      {
        ok: true,
        openings: openings.filter((opening) => opening.status === 'active'),
      },
      req
    );
  } catch (error) {
    console.error('Failed to load career openings:', error);
    return json(500, { error: 'Unable to load career openings right now.' }, req);
  }
}

async function handleAdminCareerOpeningsList(req) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  try {
    const openings = await readCareerOpenings();
    return json(200, { ok: true, openings }, req);
  } catch (error) {
    console.error('Failed to load admin career openings:', error);
    return json(500, { error: 'Unable to load careers CMS data.' }, req);
  }
}

async function handleAdminCareerOpeningCreate(req) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateCareerOpeningPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  try {
    const openings = await readCareerOpenings();

    if (openings.some((opening) => opening.slug === validation.data.slug)) {
      return json(409, { error: 'Another job already uses this slug.' }, req);
    }

    const now = new Date().toISOString();
    const opening = {
      id: randomUUID(),
      ...validation.data,
      postedAt: now,
      updatedAt: now,
    };

    const nextOpenings = [opening, ...openings];
    await writeCareerOpenings(nextOpenings);

    return json(201, { ok: true, opening }, req);
  } catch (error) {
    console.error('Failed to create career opening:', error);
    return json(500, { error: 'Unable to create this job opening right now.' }, req);
  }
}

async function handleAdminCareerOpeningUpdate(req, openingId) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateCareerOpeningPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  try {
    const openings = await readCareerOpenings();
    const currentOpening = openings.find((opening) => opening.id === openingId);

    if (!currentOpening) {
      return json(404, { error: 'Job opening not found.' }, req);
    }

    if (
      openings.some(
        (opening) => opening.slug === validation.data.slug && opening.id !== openingId
      )
    ) {
      return json(409, { error: 'Another job already uses this slug.' }, req);
    }

    const opening = {
      ...currentOpening,
      ...validation.data,
      updatedAt: new Date().toISOString(),
    };

    const nextOpenings = openings.map((item) => (item.id === openingId ? opening : item));
    await writeCareerOpenings(nextOpenings);

    return json(200, { ok: true, opening }, req);
  } catch (error) {
    console.error('Failed to update career opening:', error);
    return json(500, { error: 'Unable to update this job opening right now.' }, req);
  }
}

async function handleAdminCareerOpeningDelete(req, openingId) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  try {
    const openings = await readCareerOpenings();
    const nextOpenings = openings.filter((opening) => opening.id !== openingId);

    if (nextOpenings.length === openings.length) {
      return json(404, { error: 'Job opening not found.' }, req);
    }

    await writeCareerOpenings(nextOpenings);

    return json(200, { ok: true }, req);
  } catch (error) {
    console.error('Failed to delete career opening:', error);
    return json(500, { error: 'Unable to delete this job opening right now.' }, req);
  }
}

async function sendContactEmail(contact) {
  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  await sendGraphEmail({
    subject: `New contact request from ${sanitizeEmailHeaderValue(contact.fullName)}`,
    html: buildContactEmailHtml(contact, submittedAt),
    to: [
      {
        address: CONTACT_TO_EMAIL,
      },
    ],
    replyTo: [
      {
        name: sanitizeEmailHeaderValue(contact.fullName),
        address: contact.email,
      },
    ],
  });
  console.log(`Contact notification sent to ${CONTACT_TO_EMAIL}.`);

  await sendGraphEmail({
    subject: 'Thank you for contacting AtiSunya',
    html: buildThankYouEmailHtml(contact),
    to: [
      {
        name: sanitizeEmailHeaderValue(contact.fullName),
        address: contact.email,
      },
    ],
    replyTo: [
      {
        name: 'AtiSunya',
        address: CONTACT_TO_EMAIL,
      },
    ],
  });
  console.log(`Contact thank-you email sent to ${contact.email}.`);
}

async function sendCareerApplicationEmail(application) {
  const careersSettings = await readCareersSettings();
  const notificationEmail = careersSettings.notificationEmail || HR_TO_EMAIL;
  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });
  const isGeneralApplication = application.roleSlug === 'general-application';
  const hrSubject = isGeneralApplication
    ? `General resume submission for ${sanitizeEmailHeaderValue(application.appliedPosition)} - ${sanitizeEmailHeaderValue(application.fullName)}`
    : `Job application for ${sanitizeEmailHeaderValue(application.roleTitle)} - ${sanitizeEmailHeaderValue(application.fullName)}`;

  await sendGraphEmail({
    subject: hrSubject,
    html: buildCareerApplicationEmailHtml(application, submittedAt),
    to: [
      {
        address: notificationEmail,
      },
    ],
    replyTo: [
      {
        name: sanitizeEmailHeaderValue(application.fullName),
        address: application.email,
      },
    ],
    attachments: application.resume ? [application.resume] : [],
  });
  console.log(`Career application notification sent to ${notificationEmail}.`);

  await sendGraphEmail({
    subject: isGeneralApplication
      ? 'Thank you for sharing your resume with AtiSunya'
      : `Thank you for applying for ${sanitizeEmailHeaderValue(application.roleTitle)}`,
    html: buildCareerThankYouEmailHtml(application),
    fromEmail: notificationEmail,
    to: [
      {
        name: sanitizeEmailHeaderValue(application.fullName),
        address: application.email,
      },
    ],
    replyTo: [
      {
        name: 'AtiSunya HR',
        address: notificationEmail,
      },
    ],
  });
  console.log(`Career thank-you email sent to ${application.email}.`);
}

async function sendNewsletterSubscriptionEmails(subscription) {
  const subscribedAt = new Date(subscription.subscribedAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  await sendGraphEmail({
    subject: `New newsletter subscriber - ${sanitizeEmailHeaderValue(subscription.email)}`,
    html: buildNewsletterAdminEmailHtml(subscription, subscribedAt),
    to: [
      {
        address: NEWSLETTER_TO_EMAIL,
      },
    ],
    replyTo: [
      {
        address: subscription.email,
      },
    ],
  });
  console.log(`Newsletter notification sent to ${NEWSLETTER_TO_EMAIL}.`);

  await sendGraphEmail({
    subject: 'Welcome to the AtiSunya newsletter',
    html: buildNewsletterWelcomeEmailHtml(subscription),
    to: [
      {
        address: subscription.email,
      },
    ],
    replyTo: [
      {
        name: 'AtiSunya',
        address: NEWSLETTER_TO_EMAIL,
      },
    ],
  });
  console.log(`Newsletter welcome email sent to ${subscription.email}.`);
}

async function sendGraphEmail({
  subject,
  html,
  fromEmail = GRAPH_FROM_EMAIL,
  to,
  replyTo = [],
  attachments = [],
}) {
  const accessToken = await getGraphAccessToken();
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(fromEmail)}/sendMail`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          subject,
          body: {
            contentType: 'HTML',
            content: html,
          },
          toRecipients: to.map(toGraphEmailAddress),
          replyTo: replyTo.map(toGraphEmailAddress),
          ...(attachments.length
            ? {
                attachments: attachments.map(toGraphFileAttachment),
              }
            : {}),
        },
        saveToSentItems: true,
      }),
    }
  );

  if (!response.ok) {
    throw await createGraphApiError(response, 'Microsoft Graph could not send the email.');
  }
}

function toGraphFileAttachment(file) {
  return {
    '@odata.type': '#microsoft.graph.fileAttachment',
    name: file.name,
    contentType: file.contentType,
    contentBytes: file.contentBytes,
  };
}

function toGraphEmailAddress(recipient) {
  return {
    emailAddress: {
      ...(recipient.name ? { name: recipient.name } : {}),
      address: recipient.address,
    },
  };
}

async function getGraphAccessToken() {
  validateGraphConfig();

  if (graphTokenCache && graphTokenCache.expiresAt > Date.now() + 60_000) {
    return graphTokenCache.accessToken;
  }

  const response = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(
      GRAPH_TENANT_ID
    )}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: GRAPH_CLIENT_ID,
        client_secret: GRAPH_CLIENT_SECRET,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
    }
  );

  const tokenResponse = await response.json().catch(() => null);

  if (!response.ok || !tokenResponse?.access_token) {
    throw createGraphConfigError(
      tokenResponse?.error_description ||
        tokenResponse?.error ||
        'Unable to get Microsoft Graph access token.'
    );
  }

  validateGraphTokenPermissions(tokenResponse.access_token);

  const expiresInSeconds = Number(tokenResponse.expires_in || 3599);
  graphTokenCache = {
    accessToken: tokenResponse.access_token,
    expiresAt: Date.now() + expiresInSeconds * 1000,
  };

  return graphTokenCache.accessToken;
}

function validateGraphTokenPermissions(accessToken) {
  const payload = decodeJwtPayload(accessToken);
  const roles = Array.isArray(payload?.roles) ? payload.roles : [];
  const scopes = typeof payload?.scp === 'string' ? payload.scp.split(' ') : [];

  if (!roles.includes('Mail.Send') && !scopes.includes('Mail.Send')) {
    throw createGraphConfigError(
      'Microsoft Graph Mail.Send permission is missing or admin consent has not been granted.'
    );
  }
}

function decodeJwtPayload(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
}

function validateGraphConfig() {
  if (!GRAPH_TENANT_ID) {
    throw createGraphConfigError('Missing GRAPH_TENANT_ID.');
  }

  if (!GRAPH_CLIENT_ID) {
    throw createGraphConfigError('Missing GRAPH_CLIENT_ID.');
  }

  if (!GRAPH_CLIENT_SECRET) {
    throw createGraphConfigError('Missing GRAPH_CLIENT_SECRET.');
  }

  if (!GRAPH_FROM_EMAIL) {
    throw createGraphConfigError('Missing GRAPH_FROM_EMAIL.');
  }

  if (!CONTACT_TO_EMAIL) {
    throw createGraphConfigError('Missing CONTACT_TO_EMAIL.');
  }

  if (!HR_TO_EMAIL) {
    throw createGraphConfigError('Missing HR_TO_EMAIL.');
  }

  if (!NEWSLETTER_TO_EMAIL) {
    throw createGraphConfigError('Missing NEWSLETTER_TO_EMAIL.');
  }
}

async function createGraphApiError(response, fallbackMessage) {
  const bodyText = await response.text().catch(() => '');
  let graphMessage = '';

  try {
    const parsed = JSON.parse(bodyText);
    graphMessage = parsed?.error?.message || parsed?.error_description || '';
  } catch {
    graphMessage = bodyText;
  }

  const error = new Error(graphMessage || fallbackMessage);
  error.code = 'GRAPH_EMAIL_ERROR';
  error.status = response.status;
  error.details = bodyText;
  return error;
}

function createGraphConfigError(message) {
  const error = new Error(message);
  error.code = 'GRAPH_EMAIL_CONFIG_ERROR';
  return error;
}

function isGraphEmailConfigError(error) {
  return Boolean(
    error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'GRAPH_EMAIL_CONFIG_ERROR'
  );
}

function isGraphEmailError(error) {
  return Boolean(
    error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'GRAPH_EMAIL_ERROR'
  );
}

function getContactEmailErrorStatus(error) {
  if (isGraphEmailConfigError(error)) {
    return 500;
  }

  if (isGraphEmailError(error)) {
    return 502;
  }

  return 502;
}

function getContactEmailErrorMessage(error) {
  if (isGraphEmailConfigError(error)) {
    return error.message;
  }

  if (isGraphEmailError(error)) {
    return `Microsoft Graph email failed: ${error.message}`;
  }

  return error?.message || 'Unable to send your message right now.';
}

function buildContactEmailText(contact, submittedAt) {
  return [
    'New contact form submission',
    '',
    `Name: ${contact.fullName}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone}`,
    `Service: ${contact.service}`,
    `Submitted at: ${submittedAt}`,
    '',
    'Message:',
    contact.message,
  ].join('\n');
}

function buildContactEmailHtml(contact, submittedAt) {
  const plainText = escapeHtml(buildContactEmailText(contact, submittedAt)).replace(
    /\n/g,
    '<br>'
  );

  return `
    <!doctype html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
        <h2 style="margin: 0 0 16px;">New contact form submission</h2>
        <div>${plainText}</div>
      </body>
    </html>`;
}

function buildThankYouEmailHtml(contact) {
  const safeName = escapeHtml(contact.fullName);
  const safeService = escapeHtml(contact.service);

  return `
    <!doctype html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.6;">
        <p>Hi ${safeName},</p>
        <p>Thank you for contacting AtiSunya. We have received your request for <strong>${safeService}</strong>.</p>
        <p>Our team will review your message and get back to you shortly.</p>
        <p style="margin-top: 24px;">Regards,<br>AtiSunya Team</p>
      </body>
    </html>`;
}

function buildCareerApplicationEmailText(application, submittedAt) {
  return [
    application.roleSlug === 'general-application'
      ? 'New general resume submission'
      : 'New career application',
    '',
    `Role: ${application.roleTitle}`,
    ...(application.appliedPosition
      ? [`Apply for: ${application.appliedPosition}`]
      : []),
    `Name: ${application.fullName}`,
    `Email: ${application.email}`,
    `Phone: ${application.phone || 'Not provided'}`,
    `Submitted at: ${submittedAt}`,
    `Resume: ${application.resume ? application.resume.name : 'Not attached'}`,
    '',
    'Message:',
    application.message || 'Not provided',
  ].join('\n');
}

function buildCareerApplicationEmailHtml(application, submittedAt) {
  const plainText = escapeHtml(
    buildCareerApplicationEmailText(application, submittedAt)
  ).replace(/\n/g, '<br>');

  return `
    <!doctype html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
        <h2 style="margin: 0 0 16px;">Career application received</h2>
        <div>${plainText}</div>
      </body>
    </html>`;
}

function buildCareerThankYouEmailHtml(application) {
  const safeName = escapeHtml(application.fullName);
  const safeRole = escapeHtml(application.appliedPosition || application.roleTitle);

  return `
    <!doctype html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.6;">
        <p>Hi ${safeName},</p>
        <p>Thank you for your interest in AtiSunya. We have received your application for <strong>${safeRole}</strong>.</p>
        <p>Our HR team will review your details and contact you if your profile matches the role.</p>
        <p style="margin-top: 24px;">Regards,<br>AtiSunya HR Team</p>
      </body>
    </html>`;
}

function buildNewsletterAdminEmailText(subscription, subscribedAt) {
  return [
    'New newsletter subscription',
    '',
    `Email: ${subscription.email}`,
    `Source: ${subscription.source}`,
    `Subscribed at: ${subscribedAt}`,
    `Subscription ID: ${subscription.id}`,
  ].join('\n');
}

function buildNewsletterAdminEmailHtml(subscription, subscribedAt) {
  const plainText = escapeHtml(
    buildNewsletterAdminEmailText(subscription, subscribedAt)
  ).replace(/\n/g, '<br>');

  return `
    <!doctype html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
        <h2 style="margin: 0 0 16px;">New newsletter subscription</h2>
        <div>${plainText}</div>
      </body>
    </html>`;
}

function buildNewsletterWelcomeEmailHtml(subscription) {
  const safeEmail = escapeHtml(subscription.email);

  return `
    <!doctype html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.6;">
        <p>Hi,</p>
        <p>Thank you for subscribing to the AtiSunya newsletter with <strong>${safeEmail}</strong>.</p>
        <p>You will receive practical updates on technology, Microsoft Dynamics, cloud, training, and business transformation from our team.</p>
        <p style="margin-top: 24px;">Regards,<br>AtiSunya Team</p>
      </body>
    </html>`;
}

function validateContactPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Request body is required.' };
  }

  const fullName = typeof data.fullName === 'string' ? data.fullName.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const phone = typeof data.phone === 'string' ? data.phone.trim() : '';
  const service = typeof data.service === 'string' ? data.service.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';

  if (!fullName) {
    return { ok: false, error: 'Full name is required.' };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'A valid email address is required.' };
  }

  if (!phone) {
    return { ok: false, error: 'Phone number is required.' };
  }

  if (!service) {
    return { ok: false, error: 'Service is required.' };
  }

  if (!message) {
    return { ok: false, error: 'Message is required.' };
  }

  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      service,
      message,
    },
  };
}

function validateNewsletterPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Request body is required.' };
  }

  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  const source = typeof data.source === 'string' ? data.source.trim() : 'website-footer';
  const website = typeof data.website === 'string' ? data.website.trim() : '';

  if (website) {
    return {
      ok: true,
      data: {
        email: email || 'bot@example.com',
        source,
        isBotSubmission: true,
      },
    };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'A valid email address is required.' };
  }

  if (email.length > 254) {
    return { ok: false, error: 'Email address is too long.' };
  }

  return {
    ok: true,
    data: {
      email,
      source: source.slice(0, 120) || 'website-footer',
      isBotSubmission: false,
    },
  };
}

function validateCareerOpeningPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Request body is required.' };
  }

  const title = getObjectString(data, 'title');
  const slug = sanitizeSlug(getObjectString(data, 'slug') || title);
  const type = getObjectString(data, 'type');
  const location = getObjectString(data, 'location');
  const department = getObjectString(data, 'department');
  const experience = getObjectString(data, 'experience');
  const description = getObjectString(data, 'description');
  const fullDescription = getObjectString(data, 'fullDescription');
  const responsibilities = normalizeStringArray(data.responsibilities);
  const requirements = normalizeStringArray(data.requirements);
  const status = getObjectString(data, 'status') === 'draft' ? 'draft' : 'active';
  const featured = Boolean(data.featured);

  if (!title) {
    return { ok: false, error: 'Job title is required.' };
  }

  if (!slug) {
    return { ok: false, error: 'Slug is required.' };
  }

  if (!type) {
    return { ok: false, error: 'Job type is required.' };
  }

  if (!location) {
    return { ok: false, error: 'Location is required.' };
  }

  if (!department) {
    return { ok: false, error: 'Department is required.' };
  }

  if (!experience) {
    return { ok: false, error: 'Experience is required.' };
  }

  if (!description) {
    return { ok: false, error: 'Short description is required.' };
  }

  if (!fullDescription) {
    return { ok: false, error: 'Full description is required.' };
  }

  if (!responsibilities.length) {
    return { ok: false, error: 'Add at least one responsibility.' };
  }

  if (!requirements.length) {
    return { ok: false, error: 'Add at least one requirement.' };
  }

  return {
    ok: true,
    data: {
      slug,
      title,
      type,
      location,
      department,
      experience,
      description,
      fullDescription,
      responsibilities,
      requirements,
      status,
      featured,
    },
  };
}

function validateCareerApplicationStatusPayload(data) {
  const status = getObjectString(data, 'status');
  const allowedStatuses = new Set(['new', 'reviewed', 'contacted', 'archived']);

  if (!allowedStatuses.has(status)) {
    return { ok: false, error: 'A valid application status is required.' };
  }

  return {
    ok: true,
    data: {
      status,
    },
  };
}

function validateCareersSettingsPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Settings payload is required.' };
  }

  const careersPageTitle = getObjectString(data, 'careersPageTitle');
  const careersPageSubtitle = getObjectString(data, 'careersPageSubtitle');
  const generalCtaTitle = getObjectString(data, 'generalCtaTitle');
  const generalCtaDescription = getObjectString(data, 'generalCtaDescription');
  const notificationEmail = getObjectString(data, 'notificationEmail');

  if (!careersPageTitle) {
    return { ok: false, error: 'Careers page title is required.' };
  }

  if (!careersPageSubtitle) {
    return { ok: false, error: 'Careers page subtitle is required.' };
  }

  if (!generalCtaTitle) {
    return { ok: false, error: 'CTA title is required.' };
  }

  if (!generalCtaDescription) {
    return { ok: false, error: 'CTA description is required.' };
  }

  if (!notificationEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(notificationEmail)) {
    return { ok: false, error: 'A valid notification email is required.' };
  }

  return {
    ok: true,
    data: {
      careersPageTitle,
      careersPageSubtitle,
      generalCtaTitle,
      generalCtaDescription,
      notificationEmail,
    },
  };
}

async function validateCareerApplicationPayload(data) {
  const fullName = getFormString(data, 'fullName');
  const email = getFormString(data, 'email');
  const phone = getFormString(data, 'phone');
  const roleTitle = getFormString(data, 'roleTitle');
  const roleSlug = getFormString(data, 'roleSlug');
  const appliedPosition = getFormString(data, 'appliedPosition');
  const message = getFormString(data, 'message');
  const resumeFile = data.get('resume');

  if (!fullName) {
    return { ok: false, error: 'Full name is required.' };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'A valid email address is required.' };
  }

  if (!roleTitle) {
    return { ok: false, error: 'Role title is required.' };
  }

  if (roleSlug === 'general-application' && !appliedPosition) {
    return { ok: false, error: 'Please enter the position you want to apply for.' };
  }

  if (!phone) {
    return { ok: false, error: 'Phone number is required.' };
  }

  if (!isUploadedFile(resumeFile)) {
    return { ok: false, error: 'Resume/CV is required.' };
  }

  const maxResumeBytes = 10 * 1024 * 1024;

  if (resumeFile.size > maxResumeBytes) {
    return { ok: false, error: 'Resume must be 10 MB or smaller.' };
  }

  const resume = {
    name: sanitizeAttachmentName(resumeFile.name || 'resume'),
    contentType: resumeFile.type || 'application/octet-stream',
    contentBytes: Buffer.from(await resumeFile.arrayBuffer()).toString('base64'),
  };

  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      roleTitle,
      roleSlug,
      appliedPosition,
      message,
      resume,
    },
  };
}

function getObjectString(data, key) {
  const value = data?.[key];
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeStringArray(value) {
  return Array.isArray(value)
    ? value
        .map((item) => (typeof item === 'string' ? item.trim() : ''))
        .filter(Boolean)
    : [];
}

function sanitizeSlug(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

function getFormString(formData, key) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function isUploadedFile(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof value.arrayBuffer === 'function' &&
      typeof value.size === 'number' &&
      value.size > 0
  );
}

function sanitizeAttachmentName(value) {
  return String(value).replace(/[\\/:*?"<>|]+/g, '-').trim() || 'resume';
}

function getExistingNewsletterSubscription(email) {
  if (!existsSync(NEWSLETTER_STORE_FILE)) {
    return null;
  }

  const records = readFileSync(NEWSLETTER_STORE_FILE, 'utf8')
    .split(/\r?\n/)
    .filter(Boolean);

  for (let index = records.length - 1; index >= 0; index -= 1) {
    try {
      const record = JSON.parse(records[index]);

      if (record?.email === email) {
        return record;
      }
    } catch {
      continue;
    }
  }

  return null;
}

function validateAdminRequest(req) {
  const authorization = req.headers.get('authorization') || '';
  const tokenFromHeader = req.headers.get('x-admin-token') || '';
  const bearerToken = authorization.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length).trim()
    : '';
  const token = bearerToken || tokenFromHeader.trim();

  if (!token || token !== CAREERS_ADMIN_TOKEN) {
    return json(401, { error: 'Unauthorized careers CMS request.' }, req);
  }

  return null;
}

async function readCareerOpenings() {
  if (!existsSync(CAREERS_STORE_FILE)) {
    await writeCareerOpenings(DEFAULT_CAREER_OPENINGS);
    return DEFAULT_CAREER_OPENINGS;
  }

  try {
    const raw = readFileSync(CAREERS_STORE_FILE, 'utf8');
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      throw new Error('Career openings store is invalid.');
    }

    return parsed;
  } catch (error) {
    console.error('Career openings store invalid, restoring defaults:', error);
    await writeCareerOpenings(DEFAULT_CAREER_OPENINGS);
    return DEFAULT_CAREER_OPENINGS;
  }
}

async function writeCareerOpenings(openings) {
  await mkdir(dirname(CAREERS_STORE_FILE), { recursive: true });
  await writeFile(CAREERS_STORE_FILE, `${JSON.stringify(openings, null, 2)}\n`, 'utf8');
}

async function readCareerApplications() {
  if (!existsSync(CAREER_APPLICATIONS_STORE_FILE)) {
    await writeCareerApplications([]);
    return [];
  }

  try {
    const raw = readFileSync(CAREER_APPLICATIONS_STORE_FILE, 'utf8');
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      throw new Error('Career applications store is invalid.');
    }

    return parsed;
  } catch (error) {
    console.error('Career applications store invalid, restoring empty list:', error);
    await writeCareerApplications([]);
    return [];
  }
}

async function writeCareerApplications(applications) {
  await mkdir(dirname(CAREER_APPLICATIONS_STORE_FILE), { recursive: true });
  await writeFile(
    CAREER_APPLICATIONS_STORE_FILE,
    `${JSON.stringify(applications, null, 2)}\n`,
    'utf8'
  );
}

async function persistCareerApplicationRecord(application) {
  const applications = await readCareerApplications();
  const now = new Date().toISOString();
  const nextRecord = {
    id: randomUUID(),
    fullName: application.fullName,
    email: application.email,
    phone: application.phone,
    roleTitle: application.roleTitle,
    roleSlug: application.roleSlug,
    appliedPosition: application.appliedPosition,
    message: application.message,
    resumeFileName: application.resume.name,
    resumeContentType: application.resume.contentType,
    status: 'new',
    submittedAt: now,
    updatedAt: now,
  };

  await writeCareerApplications([nextRecord, ...applications]);
}

async function readCareersSettings() {
  if (!existsSync(CAREERS_SETTINGS_STORE_FILE)) {
    await writeCareersSettings(DEFAULT_CAREERS_SETTINGS);
    return DEFAULT_CAREERS_SETTINGS;
  }

  try {
    const raw = readFileSync(CAREERS_SETTINGS_STORE_FILE, 'utf8');
    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Careers settings store is invalid.');
    }

    return {
      ...DEFAULT_CAREERS_SETTINGS,
      ...parsed,
    };
  } catch (error) {
    console.error('Careers settings store invalid, restoring defaults:', error);
    await writeCareersSettings(DEFAULT_CAREERS_SETTINGS);
    return DEFAULT_CAREERS_SETTINGS;
  }
}

async function writeCareersSettings(settings) {
  await mkdir(dirname(CAREERS_SETTINGS_STORE_FILE), { recursive: true });
  await writeFile(
    CAREERS_SETTINGS_STORE_FILE,
    `${JSON.stringify(settings, null, 2)}\n`,
    'utf8'
  );
}

async function persistNewsletterSubscription(subscription) {
  await mkdir(dirname(NEWSLETTER_STORE_FILE), { recursive: true });
  await appendFile(NEWSLETTER_STORE_FILE, `${JSON.stringify(subscription)}\n`, 'utf8');
}

function safeJson(req) {
  return req
    .json()
    .then((data) => ({ ok: true, data }))
    .catch(() => ({ ok: false }));
}

function safeFormData(req) {
  return req
    .formData()
    .then((data) => ({ ok: true, data }))
    .catch(() => ({ ok: false }));
}

function json(status, data, req = null) {
  return withCors(
    req,
    new Response(JSON.stringify(data, null, 2), {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  );
}

function withCors(req, response) {
  const nextHeaders = new Headers(response.headers);
  const requestOrigin = req?.headers.get('origin');
  const requestHeaders = req?.headers.get('access-control-request-headers');
  const isAllowedLocalhostOrigin =
    typeof requestOrigin === 'string' &&
    /^http:\/\/localhost:\d+$/.test(requestOrigin);

  const allowOrigin =
    requestOrigin && (ALLOWED_ORIGINS.includes(requestOrigin) || isAllowedLocalhostOrigin)
      ? requestOrigin
      : ALLOWED_ORIGINS[0] || 'http://localhost:5173';

  nextHeaders.set('Access-Control-Allow-Origin', allowOrigin);
  nextHeaders.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  nextHeaders.set('Access-Control-Allow-Headers', buildAllowedCorsHeaders(requestHeaders));
  nextHeaders.set('Vary', 'Origin');

  return new Response(response.body, {
    status: response.status,
    headers: nextHeaders,
  });
}

function buildAllowedCorsHeaders(requestHeaders) {
  const defaults = ['Content-Type', 'Authorization', 'X-Admin-Token'];
  const normalizedHeaders = new Map(
    defaults.map((header) => [header.toLowerCase(), header])
  );

  if (requestHeaders) {
    requestHeaders
      .split(',')
      .map((header) => header.trim())
      .filter(Boolean)
      .forEach((header) => {
        const normalizedHeader = header.toLowerCase();

        if (!normalizedHeaders.has(normalizedHeader)) {
          normalizedHeaders.set(normalizedHeader, header);
        }
      });
  }

  return Array.from(normalizedHeaders.values()).join(', ');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[char];
  });
}

function sanitizeEmailHeaderValue(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim();
}

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const lines = readFileSync(filePath, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = unquoteEnvValue(trimmed.slice(separatorIndex + 1).trim());

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function unquoteEnvValue(value) {
  const first = value.at(0);
  const last = value.at(-1);

  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    return value.slice(1, -1);
  }

  return value;
}
