import { createHash, createHmac, timingSafeEqual, randomUUID } from 'node:crypto';
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPaths = [
  // Keep payment-specific overrides highest priority when present.
  join(__dirname, '..', 'Server_payment', '.env.local'),
  join(__dirname, '..', 'Server_payment', '.env'),
  join(__dirname, '.env.local'),
  join(__dirname, '.env'),
  join(__dirname, '..', '.env.local'),
  join(__dirname, '..', '.env'),
];

loadEnvFiles(envPaths);

let dataDir = normalizeDataDir(process.env.CMS_DATA_DIR);
let paymentsFile;
let careerOpeningsFile;
let careerApplicationsFile;
let careersSettingsFile;
let blogPostsFile;
let blogCommentsFile;
let newsletterStoreFile;

setDataStorePaths(dataDir);

const PORT = Number(process.env.PORT || 5001);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const ALLOWED_ORIGINS = FRONTEND_URL.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || '';
const RAZORPAY_CAPTURE_AUTHORIZED_PAYMENTS = parseBoolean(
  process.env.RAZORPAY_CAPTURE_AUTHORIZED_PAYMENTS,
  true
);

const PAYMENT_BRAND_NAME = (process.env.PAYMENT_BRAND_NAME || 'AtiSunya').trim();
const PAYMENT_BRAND_DESCRIPTION = (
  process.env.PAYMENT_BRAND_DESCRIPTION ||
  'Microsoft Certified Trainer Readiness Program'
).trim();
const PAYMENT_DEFAULT_COURSE = (
  process.env.PAYMENT_DEFAULT_COURSE ||
  'Microsoft Certified Trainer Readiness'
).trim();
const PAYMENT_DEFAULT_AMOUNT = Number.parseInt(process.env.PAYMENT_DEFAULT_AMOUNT || '', 10) || 35400;
const PAYMENT_THEME_COLOR = (process.env.PAYMENT_THEME_COLOR || '#0f52ba').trim();
const PAYMENT_LOGO_URL = (process.env.PAYMENT_LOGO_URL || '').trim();
const PAYMENT_SUPPORT_EMAIL = (
  process.env.PAYMENT_SUPPORT_EMAIL ||
  process.env.CONTACT_TO_EMAIL ||
  'info@atisunya.co'
).trim();
const PAYMENT_SUPPORT_PHONE = (process.env.PAYMENT_SUPPORT_PHONE || '+91-80-8181-0673').trim();
const PAYMENT_SUPPORT_URL = (process.env.PAYMENT_SUPPORT_URL || '').trim();
const PAYMENT_COMPANY_PAN = (process.env.PAYMENT_COMPANY_PAN || '').trim().toUpperCase();
const PAYMENT_COMPANY_GSTIN = (process.env.PAYMENT_COMPANY_GSTIN || '').trim().toUpperCase();
const PAYMENT_UPI_ID = (process.env.PAYMENT_UPI_ID || '').trim();
const PAYMENT_UPI_QR_IMAGE_URL = (process.env.PAYMENT_UPI_QR_IMAGE_URL || '').trim();
const PAYMENT_UPI_INTENT_URL = (process.env.PAYMENT_UPI_INTENT_URL || '').trim();
const PAYMENT_BANK_ACCOUNT_NAME = (process.env.PAYMENT_BANK_ACCOUNT_NAME || '').trim();
const PAYMENT_BANK_ACCOUNT_NUMBER = (process.env.PAYMENT_BANK_ACCOUNT_NUMBER || '').trim();
const PAYMENT_BANK_IFSC = (process.env.PAYMENT_BANK_IFSC || '').trim().toUpperCase();
const PAYMENT_BANK_NAME = (process.env.PAYMENT_BANK_NAME || '').trim();
const PAYMENT_BANK_BRANCH = (process.env.PAYMENT_BANK_BRANCH || '').trim();
const PAYMENT_BANK_ACCOUNT_TYPE = (process.env.PAYMENT_BANK_ACCOUNT_TYPE || '').trim();
const PAYMENT_BANK_MICR = (process.env.PAYMENT_BANK_MICR || '').trim();
const PAYMENT_BANK_SWIFT_CODE = (process.env.PAYMENT_BANK_SWIFT_CODE || '').trim().toUpperCase();

const CONTACT_TO_EMAIL = (process.env.CONTACT_TO_EMAIL || 'info@atisunya.co').trim();
const CONTACT_FROM_EMAIL = (
  process.env.CONTACT_FROM_EMAIL ||
  process.env.SMTP_USER ||
  CONTACT_TO_EMAIL
).trim();
const HR_TO_EMAIL = (process.env.HR_TO_EMAIL || CONTACT_TO_EMAIL).trim();
const NEWSLETTER_TO_EMAIL = (process.env.NEWSLETTER_TO_EMAIL || CONTACT_TO_EMAIL).trim();
const CAREERS_ADMIN_TOKEN = (
  process.env.CAREERS_ADMIN_TOKEN || 'change-me-careers-admin-token'
).trim();
const BLOG_ADMIN_TOKEN = (
  process.env.BLOG_ADMIN_TOKEN || 'change-me-blog-admin-token'
).trim();
const CLOUDINARY_CLOUD_NAME = (process.env.CLOUDINARY_CLOUD_NAME || '').trim();
const CLOUDINARY_API_KEY = (process.env.CLOUDINARY_API_KEY || '').trim();
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';
const CLOUDINARY_FOLDER = (process.env.CLOUDINARY_FOLDER || 'aspl/blog').trim();

const SMTP_HOST = (process.env.SMTP_HOST || '').trim();
const SMTP_PORT = Number.parseInt(process.env.SMTP_PORT || '', 10) || 587;
const SMTP_SECURE = parseBoolean(process.env.SMTP_SECURE, SMTP_PORT === 465);
const SMTP_USER = (process.env.SMTP_USER || '').trim();
const SMTP_PASS = process.env.SMTP_PASS || '';

const DEFAULT_SUPPORTED_CURRENCIES = [
  'INR',
  'USD',
  'AUD',
  'EUR',
  'GBP',
  'AED',
];

const supportedCurrencies = new Set(
  parseCsvList(process.env.PAYMENT_SUPPORTED_CURRENCIES, DEFAULT_SUPPORTED_CURRENCIES).map((currency) =>
    currency.toUpperCase()
  )
);
const supportedPaymentMethods = new Set(['card', 'upi', 'netbanking']);
const EXCHANGE_RATE_API_BASE_URL = (
  process.env.EXCHANGE_RATE_API_BASE_URL || 'https://api.frankfurter.dev/v1'
)
  .trim()
  .replace(/\/+$/, '');
const EXCHANGE_RATE_CACHE_TTL_MS =
  Number.parseInt(process.env.EXCHANGE_RATE_CACHE_TTL_MS || '', 10) || 1000 * 60 * 60;

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

let contactTransporter = null;
let contactTransporterVerified = false;
const exchangeRateCache = new Map();

ensureDataStore();

const server = BunLikeServe({
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
          service: 'aspl-razorpay-backend',
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

    if (req.method === 'GET' && url.pathname === '/api/blog/posts') {
      return handleBlogPostsRequest(req);
    }

    if (url.pathname.startsWith('/api/blog/posts/') && url.pathname.endsWith('/comments')) {
      const slug = decodeURIComponent(
        url.pathname.replace('/api/blog/posts/', '').replace(/\/comments$/, '')
      );

      if (req.method === 'GET') {
        return handleBlogCommentsList(req, slug);
      }

      if (req.method === 'POST') {
        return handleBlogCommentCreate(req, slug);
      }
    }

    if (req.method === 'GET' && url.pathname.startsWith('/api/blog/posts/')) {
      const slug = decodeURIComponent(url.pathname.replace('/api/blog/posts/', ''));
      return handleBlogPostDetailsRequest(req, slug);
    }

    if (url.pathname === '/api/admin/blog/posts') {
      if (req.method === 'GET') {
        return handleAdminBlogPostsList(req);
      }

      if (req.method === 'POST') {
        return handleAdminBlogPostCreate(req);
      }
    }

    if (url.pathname === '/api/admin/blog/upload-image' && req.method === 'POST') {
      return handleAdminBlogImageUpload(req);
    }

    if (url.pathname.startsWith('/api/admin/blog/posts/')) {
      const postId = decodeURIComponent(url.pathname.replace('/api/admin/blog/posts/', ''));

      if (req.method === 'PATCH' || req.method === 'PUT') {
        return handleAdminBlogPostUpdate(req, postId);
      }

      if (req.method === 'DELETE') {
        return handleAdminBlogPostDelete(req, postId);
      }
    }

    if (url.pathname === '/api/admin/careers/openings') {
      if (req.method === 'GET') {
        return handleAdminCareerOpeningsList(req);
      }

      if (req.method === 'POST') {
        return handleAdminCareerOpeningCreate(req);
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

      if (req.method === 'PATCH' || req.method === 'PUT') {
        return handleAdminCareersSettingsUpdate(req);
      }
    }

    if (req.method === 'POST' && url.pathname === '/api/newsletter/subscribe') {
      return handleNewsletterSubscribe(req);
    }

    if (req.method === 'GET' && url.pathname === '/api/razorpay/config') {
      return handlePublicPaymentConfig(req);
    }

    if (req.method === 'GET' && url.pathname === '/api/razorpay/exchange-rates') {
      return handleExchangeRates(req);
    }

    if (req.method === 'POST' && url.pathname === '/api/razorpay/order') {
      return handleCreateOrder(req);
    }

    if (req.method === 'POST' && url.pathname === '/api/razorpay/verify') {
      return handleVerifyPayment(req);
    }

    if (req.method === 'POST' && url.pathname === '/api/razorpay/webhook') {
      return handleWebhook(req);
    }

    if (req.method === 'GET' && url.pathname.startsWith('/api/razorpay/payment/')) {
      const paymentId = url.pathname.split('/').pop();
      return handlePaymentLookup(paymentId, req);
    }

    return json(404, { error: 'Not found' }, req);
  },
});

server.start();

function BunLikeServe({ port, fetch }) {
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

            request.rawBody = bodyBuffer;

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

        httpServer.listen(port, async () => {
          console.log(`ASPL backend listening on http://localhost:${port}`);

          try {
            if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
              const transporter = getContactTransporter();
              await verifyContactTransporter(transporter);
            } else {
              console.warn(
                'SMTP is not fully configured yet. Contact form email sending will not work until SMTP settings are added.'
              );
            }
          } catch (error) {
            console.error('SMTP startup verification failed:', error);
          }
        });
      });
    },
  };
}

function handlePublicPaymentConfig(req) {
  return json(
    200,
    {
      keyId: RAZORPAY_KEY_ID,
      isConfigured: Boolean(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET),
      missingConfiguration: getMissingPaymentConfiguration(),
      merchantName: PAYMENT_BRAND_NAME,
      merchantDescription: PAYMENT_BRAND_DESCRIPTION,
      defaultCourse: PAYMENT_DEFAULT_COURSE,
      defaultAmount: PAYMENT_DEFAULT_AMOUNT,
      defaultCurrency: [...supportedCurrencies][0] || 'INR',
      supportedCurrencies: [...supportedCurrencies],
      supportedMethods: [...supportedPaymentMethods],
      themeColor: PAYMENT_THEME_COLOR,
      logoUrl: PAYMENT_LOGO_URL,
      supportEmail: PAYMENT_SUPPORT_EMAIL,
      supportPhone: PAYMENT_SUPPORT_PHONE,
      supportUrl: PAYMENT_SUPPORT_URL,
      companyPan: PAYMENT_COMPANY_PAN,
      companyGstin: PAYMENT_COMPANY_GSTIN,
      upiDetails:
        PAYMENT_UPI_ID || PAYMENT_UPI_QR_IMAGE_URL || PAYMENT_UPI_INTENT_URL
          ? {
              id: PAYMENT_UPI_ID,
              qrImageUrl: PAYMENT_UPI_QR_IMAGE_URL,
              intentUrl: PAYMENT_UPI_INTENT_URL,
            }
          : null,
      bankDetails:
        PAYMENT_BANK_ACCOUNT_NAME ||
        PAYMENT_BANK_ACCOUNT_NUMBER ||
        PAYMENT_BANK_IFSC ||
        PAYMENT_BANK_NAME ||
        PAYMENT_BANK_BRANCH ||
        PAYMENT_BANK_ACCOUNT_TYPE ||
        PAYMENT_BANK_MICR ||
        PAYMENT_BANK_SWIFT_CODE
          ? {
              accountName: PAYMENT_BANK_ACCOUNT_NAME,
              accountNumber: PAYMENT_BANK_ACCOUNT_NUMBER,
              ifsc: PAYMENT_BANK_IFSC,
              bankName: PAYMENT_BANK_NAME,
              branch: PAYMENT_BANK_BRANCH,
              accountType: PAYMENT_BANK_ACCOUNT_TYPE,
              micr: PAYMENT_BANK_MICR,
              swiftCode: PAYMENT_BANK_SWIFT_CODE,
            }
          : null,
    },
    req
  );
}

function getMissingPaymentConfiguration() {
  const missing = [];

  if (!RAZORPAY_KEY_ID) {
    missing.push('RAZORPAY_KEY_ID');
  }

  if (!RAZORPAY_KEY_SECRET) {
    missing.push('RAZORPAY_KEY_SECRET');
  }

  return missing;
}

async function handleExchangeRates(req) {
  const url = new URL(req.url);
  const requestedBase = normalizeString(url.searchParams.get('base')).toUpperCase() || 'INR';
  const requestedQuotes = parseCsvList(url.searchParams.get('quotes'))
    .map((currency) => currency.toUpperCase())
    .filter(Boolean);

  if (!supportedCurrencies.has(requestedBase)) {
    return json(400, { error: 'Unsupported base currency.' }, req);
  }

  const quotes = Array.from(
    new Set(
      (requestedQuotes.length ? requestedQuotes : [...supportedCurrencies])
        .map((currency) => currency.toUpperCase())
        .filter((currency) => currency !== requestedBase && supportedCurrencies.has(currency))
    )
  );

  if (!quotes.length) {
    return json(
      200,
      {
        base: requestedBase,
        date: new Date().toISOString().slice(0, 10),
        rates: {},
        source: 'Frankfurter reference rates',
        stale: false,
      },
      req
    );
  }

  try {
    const snapshot = await fetchExchangeRates({
      base: requestedBase,
      quotes,
    });

    return json(200, snapshot, req);
  } catch (error) {
    return json(
      502,
      {
        error: error instanceof Error ? error.message : 'Unable to load exchange rates.',
      },
      req
    );
  }
}

async function handleCreateOrder(req) {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return json(500, { error: 'Missing Razorpay server credentials.' }, req);
  }

  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateCreateOrderPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  const payload = validation.data;
  const receipt = `aspl_${Date.now()}_${randomUUID().slice(0, 8)}`;

  const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`
      ).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: payload.amount,
      currency: payload.currency,
      receipt,
      notes: {
        course: payload.course,
        fullName: payload.customer.fullName,
        email: payload.customer.email,
        phone: payload.customer.phone,
        paymentMethod: payload.customer.paymentMethod,
        address:
          [
            payload.customer.addressLine1,
            payload.customer.addressLine2,
            payload.customer.state,
            payload.customer.pincode,
          ]
            .filter(Boolean)
            .join(', ') || 'NA',
        region: payload.customer.state || 'NA',
        postalCode: payload.customer.pincode || 'NA',
        pan: payload.customer.pan || 'NA',
        gstn: payload.customer.gstn || 'NA',
      },
    }),
  });

  if (!razorpayResponse.ok) {
    const errorBody = await razorpayResponse.text();
    return json(
      502,
      {
        error: 'Failed to create Razorpay order.',
        details: errorBody,
      },
      req
    );
  }

  const razorpayOrder = await razorpayResponse.json();

  upsertPaymentRecord({
    orderId: razorpayOrder.id,
    receipt,
    status: 'created',
    course: payload.course,
    amount: payload.amount,
    currency: payload.currency,
    customer: payload.customer,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  return json(
    200,
    {
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt,
      merchantName: PAYMENT_BRAND_NAME,
      merchantDescription: PAYMENT_BRAND_DESCRIPTION,
    },
    req
  );
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

    const message = isContactEmailConfigError(error)
      ? error.message
      : error?.message || 'Unable to send your message right now.';

    return json(
      isContactEmailConfigError(error) ? 500 : 502,
      { error: message },
      req
    );
  }
}

async function handleVerifyPayment(req) {
  if (!RAZORPAY_KEY_SECRET) {
    return json(500, { error: 'Missing Razorpay key secret.' }, req);
  }

  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body.data ?? {};
  const orderRecord = findPaymentRecord({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return json(400, { error: 'Missing payment verification fields.' }, req);
  }

  const orderIdForVerification = orderRecord?.orderId || razorpay_order_id;
  const generatedSignature = createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${orderIdForVerification}|${razorpay_payment_id}`)
    .digest('hex');

  const verified = safeEqual(generatedSignature, razorpay_signature);

  if (!verified) {
    upsertPaymentRecord({
      orderId: orderIdForVerification,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      status: 'verification_failed',
      verifiedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return json(400, { verified: false, error: 'Invalid Razorpay signature.' }, req);
  }

  let paymentDetails = await fetchRazorpayPayment(razorpay_payment_id);

  if (
    RAZORPAY_CAPTURE_AUTHORIZED_PAYMENTS &&
    paymentDetails?.status === 'authorized' &&
    Number.isInteger(paymentDetails.amount) &&
    typeof paymentDetails.currency === 'string'
  ) {
    const capturedPayment = await captureRazorpayPayment({
      paymentId: razorpay_payment_id,
      amount: paymentDetails.amount,
      currency: paymentDetails.currency,
    });

    if (capturedPayment) {
      paymentDetails = capturedPayment;
    }
  }

  upsertPaymentRecord({
    orderId: orderIdForVerification,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
    status: paymentDetails?.status || 'paid',
    paymentDetails,
    verifiedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  return json(
    200,
    {
      verified: true,
      payment: buildPublicPaymentSummary(paymentDetails, {
        id: razorpay_payment_id,
        orderId: orderIdForVerification,
        status: paymentDetails?.status || 'paid',
      }),
      order: {
        id: orderIdForVerification,
        receipt: orderRecord?.receipt || null,
        course: orderRecord?.course || null,
      },
    },
    req
  );
}

async function handleWebhook(req) {
  if (!RAZORPAY_WEBHOOK_SECRET) {
    return json(500, { error: 'Missing Razorpay webhook secret.' }, req);
  }

  const signature = req.headers.get('x-razorpay-signature');
  const rawBody = req.rawBody;

  if (!signature || !rawBody) {
    return json(400, { error: 'Missing webhook signature or body.' }, req);
  }

  const expectedSignature = createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');

  if (!safeEqual(expectedSignature, signature)) {
    return json(400, { error: 'Invalid webhook signature.' }, req);
  }

  const payload = JSON.parse(rawBody.toString('utf8'));
  const event = payload.event;
  const paymentEntity = payload.payload?.payment?.entity;
  const orderEntity = payload.payload?.order?.entity;

  upsertPaymentRecord({
    orderId: orderEntity?.id || paymentEntity?.order_id,
    paymentId: paymentEntity?.id,
    status: paymentEntity?.status || event || 'webhook_received',
    webhookEvent: event,
    webhookPayload: payload,
    updatedAt: new Date().toISOString(),
  });

  return json(200, { ok: true }, req);
}

async function handlePaymentLookup(paymentId, req) {
  if (!paymentId) {
    return json(400, { error: 'Missing payment id.' }, req);
  }

  const payment = await fetchRazorpayPayment(paymentId);

  if (!payment) {
    return json(404, { error: 'Payment not found.' }, req);
  }

  return json(200, { payment: buildPublicPaymentSummary(payment) }, req);
}

async function fetchRazorpayPayment(paymentId) {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return null;
  }

  const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`
      ).toString('base64')}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function captureRazorpayPayment({ paymentId, amount, currency }) {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return null;
  }

  const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`
      ).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      currency,
    }),
  });

  if (!response.ok) {
    console.warn(`Unable to capture payment ${paymentId}.`, await response.text());
    return null;
  }

  return response.json();
}

async function fetchExchangeRates({ base, quotes }) {
  const cacheKey = `${base}:${quotes.join(',')}`;
  const cached = exchangeRateCache.get(cacheKey);
  const now = Date.now();

  if (cached && now - cached.cachedAt < EXCHANGE_RATE_CACHE_TTL_MS) {
    return cached.payload;
  }

  const searchParams = new URLSearchParams({
    base,
    symbols: quotes.join(','),
  });
  const response = await fetch(`${EXCHANGE_RATE_API_BASE_URL}/latest?${searchParams.toString()}`);

  if (!response.ok) {
    if (cached) {
      return {
        ...cached.payload,
        stale: true,
      };
    }

    throw new Error(`Exchange rate service returned ${response.status}.`);
  }

  const payload = await response.json();
  const rates =
    payload && typeof payload === 'object' && payload.rates && typeof payload.rates === 'object'
      ? payload.rates
      : null;

  if (!rates) {
    throw new Error('Exchange rate response was invalid.');
  }

  const snapshot = {
    base,
    date: typeof payload.date === 'string' ? payload.date : new Date().toISOString().slice(0, 10),
    rates,
    source: 'Frankfurter reference rates',
    stale: false,
  };

  exchangeRateCache.set(cacheKey, {
    cachedAt: now,
    payload: snapshot,
  });

  return snapshot;
}

async function sendContactEmail(contact) {
  const transporter = getContactTransporter();
  await verifyContactTransporter(transporter);

  const submittedAt = new Date().toISOString();

  await transporter.sendMail({
    from: {
      name: 'AtiSunya Website',
      address: CONTACT_FROM_EMAIL,
    },
    to: CONTACT_TO_EMAIL,
    replyTo: {
      name: sanitizeEmailHeaderValue(contact.fullName),
      address: contact.email,
    },
    subject: `New contact request from ${sanitizeEmailHeaderValue(contact.fullName)}`,
    text: buildContactEmailText(contact, submittedAt),
    html: buildContactEmailHtml(contact, submittedAt),
  });
}

function getContactTransporter() {
  if (!SMTP_HOST) {
    throw createContactEmailConfigError('Missing SMTP_HOST.');
  }

  if (!SMTP_USER) {
    throw createContactEmailConfigError('Missing SMTP_USER.');
  }

  if (!SMTP_PASS) {
    throw createContactEmailConfigError('Missing SMTP_PASS.');
  }

  if (!CONTACT_TO_EMAIL) {
    throw createContactEmailConfigError('Missing CONTACT_TO_EMAIL.');
  }

  if (!CONTACT_FROM_EMAIL) {
    throw createContactEmailConfigError('Missing CONTACT_FROM_EMAIL.');
  }

  if (!contactTransporter) {
    contactTransporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });
  }

  return contactTransporter;
}

async function verifyContactTransporter(transporter) {
  if (contactTransporterVerified) {
    return;
  }

  await transporter.verify();
  contactTransporterVerified = true;
  console.log('SMTP server is ready to send emails.');
}

function buildContactEmailText(contact, submittedAt) {
  return [
    'New contact form submission',
    '',
    `Name: ${contact.fullName}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone || 'NA'}`,
    `Service: ${contact.service}`,
    `Submitted at: ${submittedAt}`,
    '',
    'Message:',
    contact.message,
  ].join('\n');
}

function buildContactEmailHtml(contact, submittedAt) {
  const rows = [
    ['Name', contact.fullName],
    ['Email', contact.email],
    ['Phone', contact.phone || 'NA'],
    ['Service', contact.service],
    ['Submitted at', submittedAt],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding: 8px 12px; border: 1px solid #ddd; background: #f7f7f7;">${escapeHtml(label)}</th>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  return `
    <!doctype html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
        <h2 style="margin: 0 0 16px;">New contact form submission</h2>
        <table style="border-collapse: collapse; margin-bottom: 18px;">
          ${rows}
        </table>
        <p style="margin: 0 0 8px;"><strong>Message</strong></p>
        <div style="white-space: pre-wrap; border: 1px solid #ddd; padding: 12px;">${escapeHtml(
          contact.message
        )}</div>
      </body>
    </html>`;
}

function createContactEmailConfigError(message) {
  const error = new Error(message);
  error.code = 'CONTACT_EMAIL_CONFIG_ERROR';
  return error;
}

function isContactEmailConfigError(error) {
  return Boolean(
    error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'CONTACT_EMAIL_CONFIG_ERROR'
  );
}

function validateCreateOrderPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Request body is required.' };
  }

  const { amount, currency, course, customer } = data;

  if (!Number.isInteger(amount) || amount <= 0) {
    return { ok: false, error: 'Amount must be a positive integer in the smallest currency unit.' };
  }

  if (!supportedCurrencies.has(String(currency).toUpperCase())) {
    return { ok: false, error: 'Unsupported currency.' };
  }

  if (!course || typeof course !== 'string') {
    return { ok: false, error: 'Course is required.' };
  }

  if (!customer || typeof customer !== 'object') {
    return { ok: false, error: 'Customer details are required.' };
  }

  const normalizedCustomer = {
    firstName: normalizeString(customer.firstName),
    lastName: normalizeString(customer.lastName),
    fullName:
      normalizeString(customer.fullName) ||
      [normalizeString(customer.firstName), normalizeString(customer.lastName)]
        .filter(Boolean)
        .join(' '),
    email: normalizeString(customer.email),
    phone: normalizeString(customer.phone),
    company: normalizeString(customer.company),
    addressLine1: normalizeString(customer.addressLine1 || customer.address),
    addressLine2: normalizeString(customer.addressLine2),
    city: normalizeString(customer.city),
    state: normalizeString(customer.state),
    pincode: normalizeString(customer.pincode),
    pan: normalizeString(customer.pan).toUpperCase(),
    gstn: normalizeString(customer.gstn).toUpperCase(),
    paymentMethod: normalizePaymentMethod(customer.paymentMethod),
  };

  const requiredFields = [
    'firstName',
    'lastName',
    'fullName',
    'email',
    'phone',
    'addressLine1',
    'state',
    'pincode',
  ];

  for (const field of requiredFields) {
    if (!normalizedCustomer[field]) {
      return { ok: false, error: `Customer field "${field}" is required.` };
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedCustomer.email)) {
    return { ok: false, error: 'Customer email is invalid.' };
  }

  if (normalizedCustomer.phone.replace(/\D/g, '').length < 10) {
    return { ok: false, error: 'Customer phone number is invalid.' };
  }

  if (
    normalizedCustomer.pincode &&
    !/^[A-Z0-9][A-Z0-9\s-]{2,11}$/i.test(normalizedCustomer.pincode)
  ) {
    return { ok: false, error: 'Customer pincode or postal code is invalid.' };
  }

  if (normalizedCustomer.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(normalizedCustomer.pan)) {
    return { ok: false, error: 'Customer PAN format is invalid.' };
  }

  if (
    normalizedCustomer.gstn &&
    !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]Z[A-Z0-9]$/.test(normalizedCustomer.gstn)
  ) {
    return { ok: false, error: 'Customer GSTIN format is invalid.' };
  }

  if (!supportedPaymentMethods.has(normalizedCustomer.paymentMethod)) {
    return { ok: false, error: 'Unsupported payment method.' };
  }

  return {
    ok: true,
    data: {
      amount,
      currency: String(currency).toUpperCase(),
      course: String(course).trim(),
      customer: normalizedCustomer,
    },
  };
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

function ensureDataStore() {
  if (!existsSync(dataDir)) {
    try {
      mkdirSync(dataDir, { recursive: true });
    } catch (error) {
      if (!isPermissionError(error)) {
        throw error;
      }

      const fallbackDataDir = join(__dirname, 'data');

      if (dataDir === fallbackDataDir) {
        throw error;
      }

      console.warn(
        `Cannot write to CMS_DATA_DIR "${dataDir}". Falling back to "${fallbackDataDir}".`
      );

      dataDir = fallbackDataDir;
      setDataStorePaths(dataDir);
      mkdirSync(dataDir, { recursive: true });
    }
  }

  ensureJsonFile(paymentsFile, { payments: [] });
  ensureJsonFile(careerOpeningsFile, DEFAULT_CAREER_OPENINGS);
  ensureJsonFile(careerApplicationsFile, []);
  ensureJsonFile(careersSettingsFile, DEFAULT_CAREERS_SETTINGS);
  ensureJsonFile(blogPostsFile, []);
  ensureJsonFile(blogCommentsFile, []);

  if (!existsSync(newsletterStoreFile)) {
    writeFileSync(newsletterStoreFile, '', 'utf8');
  }
}

function setDataStorePaths(directory) {
  paymentsFile = join(directory, 'payments.json');
  careerOpeningsFile = join(directory, 'career-openings.json');
  careerApplicationsFile = join(directory, 'career-applications.json');
  careersSettingsFile = join(directory, 'careers-settings.json');
  blogPostsFile = join(directory, 'blog-posts.json');
  blogCommentsFile = join(directory, 'blog-comments.json');
  newsletterStoreFile = join(directory, 'newsletter-subscribers.jsonl');
}

function readPayments() {
  return JSON.parse(readFileSync(paymentsFile, 'utf8'));
}

function writePayments(data) {
  writeFileSync(paymentsFile, JSON.stringify(data, null, 2));
}

function findPaymentRecord({ orderId, paymentId }) {
  const store = readPayments();
  return (
    store.payments.find(
      (payment) =>
        (orderId && payment.orderId === orderId) || (paymentId && payment.paymentId === paymentId)
    ) || null
  );
}

function upsertPaymentRecord(partial) {
  const store = readPayments();
  const index = store.payments.findIndex(
    (payment) =>
      payment.orderId === partial.orderId ||
      (partial.paymentId && payment.paymentId === partial.paymentId)
  );

  if (index >= 0) {
    store.payments[index] = {
      ...store.payments[index],
      ...partial,
    };
  } else {
    store.payments.push(partial);
  }

  writePayments(store);
}

function safeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

function buildPublicPaymentSummary(payment, fallback = {}) {
  const entity = payment && typeof payment === 'object' ? payment : {};
  const cardEntity =
    entity.card && typeof entity.card === 'object'
      ? {
          network: entity.card.network || null,
          last4: entity.card.last4 || null,
          type: entity.card.type || null,
        }
      : null;

  return {
    id: entity.id || fallback.id || null,
    orderId: entity.order_id || fallback.orderId || null,
    status: entity.status || fallback.status || 'unknown',
    method: entity.method || null,
    amount: Number.isInteger(entity.amount) ? entity.amount : null,
    currency: entity.currency || null,
    captured: typeof entity.captured === 'boolean' ? entity.captured : null,
    email: entity.email || null,
    contact: entity.contact || null,
    bank: entity.bank || null,
    wallet: entity.wallet || null,
    vpa: entity.vpa || null,
    fee: Number.isInteger(entity.fee) ? entity.fee : null,
    tax: Number.isInteger(entity.tax) ? entity.tax : null,
    card: cardEntity,
    createdAt:
      typeof entity.created_at === 'number'
        ? new Date(entity.created_at * 1000).toISOString()
        : null,
  };
}

function parseBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  return ['1', 'true', 'yes', 'on'].includes(String(value).trim().toLowerCase());
}

function parseCsvList(value, fallback = []) {
  if (!value || typeof value !== 'string') {
    return fallback;
  }

  const items = value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

  return items.length ? items : fallback;
}

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isPermissionError(error) {
  return error?.code === 'EACCES' || error?.code === 'EPERM';
}

function normalizePaymentMethod(value) {
  const normalized = normalizeString(value).toLowerCase();

  if (normalized === 'qr_upi') {
    return 'upi';
  }

  if (normalized === 'bank_transfer') {
    return 'netbanking';
  }

  return normalized;
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

function loadEnvFiles(filePaths) {
  for (const filePath of filePaths) {
    loadEnvFile(filePath);
  }
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
    const record = persistCareerApplicationRecord(validation.data);

    try {
      await sendCareerApplicationEmail(validation.data, record);
    } catch (error) {
      console.error('Career application email delivery failed:', error);
    }

    return json(
      200,
      {
        ok: true,
        message: 'Thank you for applying. Our HR team will review your details and contact you soon.',
      },
      req
    );
  } catch (error) {
    console.error('Career application persistence failed:', error);
    return json(500, { error: 'Unable to save your application right now.' }, req);
  }
}

function handleCareerOpeningsRequest(req) {
  const openings = readCareerOpenings()
    .filter((opening) => opening.status === 'active')
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));

  return json(200, { ok: true, openings }, req);
}

function handleAdminCareerOpeningsList(req) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  const openings = readCareerOpenings().sort((left, right) =>
    right.updatedAt.localeCompare(left.updatedAt)
  );
  return json(200, { ok: true, openings }, req);
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

  const openings = readCareerOpenings();
  const now = new Date().toISOString();
  const opening = {
    id: randomUUID(),
    ...validation.data,
    postedAt: now,
    updatedAt: now,
  };

  writeCareerOpenings([opening, ...openings]);
  return json(200, { ok: true, opening }, req);
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

  const openings = readCareerOpenings();
  const currentOpening = openings.find((opening) => opening.id === openingId);

  if (!currentOpening) {
    return json(404, { error: 'Opening not found.' }, req);
  }

  const opening = {
    ...currentOpening,
    ...validation.data,
    updatedAt: new Date().toISOString(),
  };

  writeCareerOpenings(
    openings.map((item) => (item.id === openingId ? opening : item))
  );

  return json(200, { ok: true, opening }, req);
}

function handleAdminCareerOpeningDelete(req, openingId) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  const openings = readCareerOpenings();

  if (!openings.some((opening) => opening.id === openingId)) {
    return json(404, { error: 'Opening not found.' }, req);
  }

  writeCareerOpenings(openings.filter((opening) => opening.id !== openingId));
  return json(200, { ok: true }, req);
}

function handleAdminCareerApplicationsList(req) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  const applications = readCareerApplications().sort((left, right) =>
    right.submittedAt.localeCompare(left.submittedAt)
  );
  return json(200, { ok: true, applications }, req);
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

  const applications = readCareerApplications();
  const currentApplication = applications.find((item) => item.id === applicationId);

  if (!currentApplication) {
    return json(404, { error: 'Application not found.' }, req);
  }

  const application = {
    ...currentApplication,
    status: validation.data.status,
    updatedAt: new Date().toISOString(),
  };

  writeCareerApplications(
    applications.map((item) => (item.id === applicationId ? application : item))
  );

  return json(200, { ok: true, application }, req);
}

function handleAdminCareersSettingsGet(req) {
  const authError = validateAdminRequest(req);

  if (authError) {
    return authError;
  }

  return json(200, { ok: true, settings: readCareersSettings() }, req);
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

  writeCareersSettings(validation.data);
  return json(200, { ok: true, settings: validation.data }, req);
}

function handleBlogPostsRequest(req) {
  const posts = readBlogPosts()
    .filter((post) => post.status === 'published')
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

  return json(200, { ok: true, posts }, req);
}

function handleBlogPostDetailsRequest(req, slug) {
  const post = readBlogPosts().find(
    (item) => item.slug === slug && item.status === 'published'
  );

  if (!post) {
    return json(404, { error: 'Blog post not found.' }, req);
  }

  return json(200, { ok: true, post }, req);
}

function handleBlogCommentsList(req, slug) {
  const post = readBlogPosts().find(
    (item) => item.slug === slug && item.status === 'published'
  );

  if (!post) {
    return json(404, { error: 'Blog post not found.' }, req);
  }

  const comments = readBlogComments()
    .filter((comment) => comment.postSlug === slug && comment.status === 'approved')
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));

  return json(200, { ok: true, comments }, req);
}

async function handleBlogCommentCreate(req, slug) {
  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateBlogCommentPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  const post = readBlogPosts().find(
    (item) => item.slug === slug && item.status === 'published'
  );

  if (!post) {
    return json(404, { error: 'Blog post not found.' }, req);
  }

  const now = new Date().toISOString();
  const comment = {
    id: randomUUID(),
    postSlug: slug,
    firstName: validation.data.firstName,
    lastName: validation.data.lastName,
    fullName: `${validation.data.firstName} ${validation.data.lastName}`.trim(),
    email: validation.data.email,
    phone: validation.data.phone,
    message: validation.data.message,
    status: 'approved',
    createdAt: now,
    updatedAt: now,
  };

  writeBlogComments([comment, ...readBlogComments()]);
  return json(201, { ok: true, comment }, req);
}

function handleAdminBlogPostsList(req) {
  const authError = validateAdminRequest(req, 'blog');

  if (authError) {
    return authError;
  }

  const posts = readBlogPosts().sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  return json(200, { ok: true, posts }, req);
}

async function handleAdminBlogPostCreate(req) {
  const authError = validateAdminRequest(req, 'blog');

  if (authError) {
    return authError;
  }

  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateBlogPostPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  const posts = readBlogPosts();
  const now = new Date().toISOString();
  const post = {
    id: randomUUID(),
    ...validation.data,
    publishedAt: validation.data.status === 'published' ? now : '',
    createdAt: now,
    updatedAt: now,
  };

  writeBlogPosts([post, ...posts]);
  return json(200, { ok: true, post }, req);
}

async function handleAdminBlogPostUpdate(req, postId) {
  const authError = validateAdminRequest(req, 'blog');

  if (authError) {
    return authError;
  }

  const body = await safeJson(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid JSON body.' }, req);
  }

  const validation = validateBlogPostPayload(body.data);

  if (!validation.ok) {
    return json(400, { error: validation.error }, req);
  }

  const posts = readBlogPosts();
  const currentPost = posts.find((post) => post.id === postId);

  if (!currentPost) {
    return json(404, { error: 'Post not found.' }, req);
  }

  const now = new Date().toISOString();
  const post = {
    ...currentPost,
    ...validation.data,
    publishedAt:
      validation.data.status === 'published'
        ? currentPost.publishedAt || now
        : currentPost.publishedAt,
    updatedAt: now,
  };

  writeBlogPosts(posts.map((item) => (item.id === postId ? post : item)));
  return json(200, { ok: true, post }, req);
}

function handleAdminBlogPostDelete(req, postId) {
  const authError = validateAdminRequest(req, 'blog');

  if (authError) {
    return authError;
  }

  const posts = readBlogPosts();

  if (!posts.some((post) => post.id === postId)) {
    return json(404, { error: 'Post not found.' }, req);
  }

  writeBlogPosts(posts.filter((post) => post.id !== postId));
  return json(200, { ok: true }, req);
}

async function handleAdminBlogImageUpload(req) {
  const authError = validateAdminRequest(req, 'blog');

  if (authError) {
    return authError;
  }

  const body = await safeFormData(req);

  if (!body.ok) {
    return json(400, { error: 'Invalid upload request.' }, req);
  }

  const imageFile = body.data.get('image');

  if (!isUploadedFile(imageFile)) {
    return json(400, { error: 'A blog image is required.' }, req);
  }

  try {
    const image = await uploadBlogImageToCloudinary(imageFile);
    return json(200, { ok: true, image }, req);
  } catch (error) {
    return json(
      500,
      {
        error: error instanceof Error ? error.message : 'Unable to upload this image right now.',
      },
      req
    );
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

  persistNewsletterSubscription(subscription);

  try {
    await sendNewsletterSubscriptionEmail(subscription);
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

async function sendCareerApplicationEmail(application, record) {
  const transporter = getContactTransporter();
  await verifyContactTransporter(transporter);

  const settings = readCareersSettings();
  const submittedAt = new Date(record.submittedAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const targetEmail = settings.notificationEmail || HR_TO_EMAIL;

  await transporter.sendMail({
    from: {
      name: 'AtiSunya Careers',
      address: CONTACT_FROM_EMAIL,
    },
    to: targetEmail,
    replyTo: {
      name: sanitizeEmailHeaderValue(application.fullName),
      address: application.email,
    },
    subject: `Career application for ${sanitizeEmailHeaderValue(
      application.appliedPosition || application.roleTitle
    )}`,
    text: buildCareerApplicationEmailText(application, submittedAt),
    html: buildCareerApplicationEmailHtml(application, submittedAt),
    attachments: [
      {
        filename: application.resume.name,
        content: Buffer.from(application.resume.contentBytes, 'base64'),
        contentType: application.resume.contentType,
      },
    ],
  });
}

async function sendNewsletterSubscriptionEmail(subscription) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NEWSLETTER_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return;
  }

  const transporter = getContactTransporter();
  await verifyContactTransporter(transporter);

  const subscribedAt = new Date(subscription.subscribedAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  await transporter.sendMail({
    from: {
      name: 'AtiSunya Website',
      address: CONTACT_FROM_EMAIL,
    },
    to: NEWSLETTER_TO_EMAIL,
    subject: `New newsletter subscription: ${sanitizeEmailHeaderValue(subscription.email)}`,
    text: buildNewsletterSubscriptionEmailText(subscription, subscribedAt),
    html: buildNewsletterSubscriptionEmailHtml(subscription, subscribedAt),
  });
}

function buildCareerApplicationEmailText(application, submittedAt) {
  return [
    'New career application received',
    '',
    `Name: ${application.fullName}`,
    `Email: ${application.email}`,
    `Phone: ${application.phone}`,
    `Role: ${application.roleTitle}`,
    `Role slug: ${application.roleSlug}`,
    `Applied position: ${application.appliedPosition || 'NA'}`,
    `Submitted at: ${submittedAt}`,
    '',
    'Message:',
    application.message || 'NA',
  ].join('\n');
}

function buildCareerApplicationEmailHtml(application, submittedAt) {
  const rows = [
    ['Name', application.fullName],
    ['Email', application.email],
    ['Phone', application.phone],
    ['Role', application.roleTitle],
    ['Role slug', application.roleSlug],
    ['Applied position', application.appliedPosition || 'NA'],
    ['Submitted at', submittedAt],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding: 8px 12px; border: 1px solid #ddd; background: #f7f7f7;">${escapeHtml(label)}</th>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  return `
    <!doctype html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
        <h2 style="margin: 0 0 16px;">New career application received</h2>
        <table style="border-collapse: collapse; margin-bottom: 18px;">
          ${rows}
        </table>
        <p style="margin: 0 0 8px;"><strong>Message</strong></p>
        <div style="white-space: pre-wrap; border: 1px solid #ddd; padding: 12px;">${escapeHtml(
          application.message || 'NA'
        )}</div>
      </body>
    </html>`;
}

function buildNewsletterSubscriptionEmailText(subscription, subscribedAt) {
  return [
    'New newsletter subscription',
    '',
    `Email: ${subscription.email}`,
    `Source: ${subscription.source}`,
    `Subscribed at: ${subscribedAt}`,
  ].join('\n');
}

function buildNewsletterSubscriptionEmailHtml(subscription, subscribedAt) {
  const rows = [
    ['Email', subscription.email],
    ['Source', subscription.source],
    ['Subscribed at', subscribedAt],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding: 8px 12px; border: 1px solid #ddd; background: #f7f7f7;">${escapeHtml(label)}</th>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  return `
    <!doctype html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
        <h2 style="margin: 0 0 16px;">New newsletter subscription</h2>
        <table style="border-collapse: collapse;">${rows}</table>
      </body>
    </html>`;
}

function validateNewsletterPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Request body is required.' };
  }

  const email = getObjectString(data, 'email').toLowerCase();
  const source = getObjectString(data, 'source') || 'website-footer';
  const website = getObjectString(data, 'website');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'A valid email address is required.' };
  }

  return {
    ok: true,
    data: {
      email,
      source,
      isBotSubmission: Boolean(website),
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

  if (!title || !slug || !type || !location || !department || !experience) {
    return { ok: false, error: 'All job overview fields are required.' };
  }

  if (!description || !fullDescription) {
    return { ok: false, error: 'Job description fields are required.' };
  }

  if (!responsibilities.length || !requirements.length) {
    return { ok: false, error: 'Responsibilities and requirements are required.' };
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

  if (!careersPageTitle || !careersPageSubtitle || !generalCtaTitle || !generalCtaDescription) {
    return { ok: false, error: 'All careers settings fields are required.' };
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
  const email = getFormString(data, 'email').toLowerCase();
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

  if (!phone) {
    return { ok: false, error: 'Phone number is required.' };
  }

  if (!roleTitle) {
    return { ok: false, error: 'Role title is required.' };
  }

  if (!roleSlug) {
    return { ok: false, error: 'Role slug is required.' };
  }

  if (roleSlug === 'general-application' && !appliedPosition) {
    return { ok: false, error: 'Please enter the position you want to apply for.' };
  }

  if (!isUploadedFile(resumeFile)) {
    return { ok: false, error: 'Resume/CV is required.' };
  }

  const maxResumeBytes = 10 * 1024 * 1024;

  if (resumeFile.size > maxResumeBytes) {
    return { ok: false, error: 'Resume must be 10 MB or smaller.' };
  }

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
      resume: {
        name: sanitizeAttachmentName(resumeFile.name || 'resume'),
        contentType: resumeFile.type || 'application/octet-stream',
        contentBytes: Buffer.from(await resumeFile.arrayBuffer()).toString('base64'),
      },
    },
  };
}

function validateBlogPostPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Request body is required.' };
  }

  const title = getObjectString(data, 'title');
  const slug = sanitizeSlug(getObjectString(data, 'slug') || title);
  const excerpt = getObjectString(data, 'excerpt');
  const content = getObjectString(data, 'content');
  const category = getObjectString(data, 'category');
  const authorName = getObjectString(data, 'authorName');
  const imageUrl = getObjectString(data, 'imageUrl');
  const imagePublicId = getObjectString(data, 'imagePublicId');
  const seoTitle = getObjectString(data, 'seoTitle');
  const seoDescription = getObjectString(data, 'seoDescription');
  const status = getObjectString(data, 'status') === 'draft' ? 'draft' : 'published';
  const featured = Boolean(data.featured);
  const tags = normalizeStringArray(data.tags);

  if (!title || !slug || !excerpt || !content || !category || !authorName || !imageUrl) {
    return { ok: false, error: 'All required blog post fields must be filled in.' };
  }

  return {
    ok: true,
    data: {
      slug,
      title,
      excerpt,
      content,
      category,
      tags,
      authorName,
      imageUrl,
      imagePublicId,
      seoTitle,
      seoDescription,
      status,
      featured,
    },
  };
}

function validateBlogCommentPayload(data) {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Request body is required.' };
  }

  const firstName = getObjectString(data, 'firstName');
  const lastName = getObjectString(data, 'lastName');
  const email = getObjectString(data, 'email').toLowerCase();
  const phone = getObjectString(data, 'phone');
  const message = getObjectString(data, 'message');
  const website = getObjectString(data, 'website');

  if (website) {
    return { ok: false, error: 'Invalid comment submission.' };
  }

  if (!firstName || !lastName) {
    return { ok: false, error: 'First and last name are required.' };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'A valid email address is required.' };
  }

  if (!message) {
    return { ok: false, error: 'Comment is required.' };
  }

  if (message.length > 2000) {
    return { ok: false, error: 'Comment must be 2000 characters or fewer.' };
  }

  return {
    ok: true,
    data: {
      firstName: firstName.slice(0, 80),
      lastName: lastName.slice(0, 80),
      email: email.slice(0, 254),
      phone: phone.slice(0, 40),
      message: message.slice(0, 2000),
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
  return String(value).replace(/[\\/:*?"<>|]+/g, '-').trim() || 'attachment';
}

function validateAdminRequest(req, scope = 'careers') {
  const authorization = req.headers.get('authorization') || '';
  const tokenFromHeader = req.headers.get('x-admin-token') || '';
  const bearerToken = authorization.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length).trim()
    : '';
  const token = bearerToken || tokenFromHeader.trim();
  const expectedToken = scope === 'blog' ? BLOG_ADMIN_TOKEN : CAREERS_ADMIN_TOKEN;
  const label = scope === 'blog' ? 'blog' : 'careers';

  if (!token || !expectedToken || token !== expectedToken) {
    return json(401, { error: `Unauthorized ${label} CMS request.` }, req);
  }

  return null;
}

function readCareerOpenings() {
  return readJsonArrayFile(careerOpeningsFile, DEFAULT_CAREER_OPENINGS);
}

function writeCareerOpenings(openings) {
  writeJsonFile(careerOpeningsFile, openings);
}

function readCareerApplications() {
  return readJsonArrayFile(careerApplicationsFile, []);
}

function writeCareerApplications(applications) {
  writeJsonFile(careerApplicationsFile, applications);
}

function persistCareerApplicationRecord(application) {
  const applications = readCareerApplications();
  const now = new Date().toISOString();
  const record = {
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

  writeCareerApplications([record, ...applications]);
  return record;
}

function readCareersSettings() {
  return {
    ...DEFAULT_CAREERS_SETTINGS,
    ...readJsonObjectFile(careersSettingsFile, DEFAULT_CAREERS_SETTINGS),
  };
}

function writeCareersSettings(settings) {
  writeJsonFile(careersSettingsFile, settings);
}

function readBlogPosts() {
  return readJsonArrayFile(blogPostsFile, []);
}

function writeBlogPosts(posts) {
  writeJsonFile(blogPostsFile, posts);
}

function readBlogComments() {
  return readJsonArrayFile(blogCommentsFile, []);
}

function writeBlogComments(comments) {
  writeJsonFile(blogCommentsFile, comments);
}

function readJsonArrayFile(filePath, fallback) {
  try {
    const parsed = JSON.parse(readFileSync(filePath, 'utf8'));

    if (!Array.isArray(parsed)) {
      throw new Error('Expected an array.');
    }

    return parsed;
  } catch (error) {
    console.error(`Unable to read ${filePath}, restoring fallback array:`, error);
    writeJsonFile(filePath, fallback);
    return fallback;
  }
}

function readJsonObjectFile(filePath, fallback) {
  try {
    const parsed = JSON.parse(readFileSync(filePath, 'utf8'));

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Expected an object.');
    }

    return parsed;
  } catch (error) {
    console.error(`Unable to read ${filePath}, restoring fallback object:`, error);
    writeJsonFile(filePath, fallback);
    return fallback;
  }
}

function writeJsonFile(filePath, data) {
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function getExistingNewsletterSubscription(email) {
  if (!existsSync(newsletterStoreFile)) {
    return null;
  }

  const records = readFileSync(newsletterStoreFile, 'utf8')
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

function persistNewsletterSubscription(subscription) {
  appendFileSync(newsletterStoreFile, `${JSON.stringify(subscription)}\n`, 'utf8');
}

async function uploadBlogImageToCloudinary(imageFile) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error(
      'Cloudinary is not fully configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signCloudinaryParams({
    folder: CLOUDINARY_FOLDER,
    timestamp,
  });
  const formData = new FormData();
  const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
  const imageBlob = new Blob([imageBuffer], {
    type: imageFile.type || 'application/octet-stream',
  });

  formData.set('file', imageBlob, sanitizeAttachmentName(imageFile.name || 'blog-image'));
  formData.set('api_key', CLOUDINARY_API_KEY);
  formData.set('timestamp', String(timestamp));
  formData.set('folder', CLOUDINARY_FOLDER);
  formData.set('signature', signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );
  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.secure_url) {
    throw new Error(result?.error?.message || 'Cloudinary upload failed.');
  }

  return {
    url: result.secure_url,
    publicId: result.public_id || '',
    width: result.width || null,
    height: result.height || null,
  };
}

function signCloudinaryParams(params) {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return createHash('sha1')
    .update(`${payload}${CLOUDINARY_API_SECRET}`)
    .digest('hex');
}

function buildAllowedCorsHeaders(requestHeaders) {
  const defaults = [
    'Content-Type',
    'Authorization',
    'X-Admin-Token',
    'X-Razorpay-Signature',
  ];
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

function ensureJsonFile(filePath, defaultValue) {
  if (!existsSync(filePath)) {
    writeJsonFile(filePath, defaultValue);
  }
}

function normalizeDataDir(value) {
  const normalized = normalizeString(value);

  if (!normalized) {
    return join(__dirname, 'data');
  }

  return isAbsolute(normalized) ? normalized : join(__dirname, normalized);
}
