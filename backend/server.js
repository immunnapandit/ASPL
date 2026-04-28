import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPaths = [
  join(__dirname, '.env.local'),
  join(__dirname, '.env'),
  join(__dirname, '..', '.env.local'),
  join(__dirname, '..', '.env'),
];
const dataDir = join(__dirname, 'data');
const paymentsFile = join(dataDir, 'payments.json');

loadEnvFiles(envPaths);
ensureDataStore();

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

const CONTACT_TO_EMAIL = (process.env.CONTACT_TO_EMAIL || 'munna@atisunya.co').trim();
const CONTACT_FROM_EMAIL = (
  process.env.CONTACT_FROM_EMAIL ||
  process.env.SMTP_USER ||
  CONTACT_TO_EMAIL
).trim();

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

let contactTransporter = null;
let contactTransporterVerified = false;
const exchangeRateCache = new Map();

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
  const isAllowedLocalhostOrigin =
    typeof requestOrigin === 'string' &&
    /^http:\/\/localhost:\d+$/.test(requestOrigin);

  const allowOrigin =
    requestOrigin && (ALLOWED_ORIGINS.includes(requestOrigin) || isAllowedLocalhostOrigin)
      ? requestOrigin
      : ALLOWED_ORIGINS[0] || 'http://localhost:5173';

  nextHeaders.set('Access-Control-Allow-Origin', allowOrigin);
  nextHeaders.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  nextHeaders.set('Access-Control-Allow-Headers', 'Content-Type,x-razorpay-signature');
  nextHeaders.set('Vary', 'Origin');

  return new Response(response.body, {
    status: response.status,
    headers: nextHeaders,
  });
}

function ensureDataStore() {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  if (!existsSync(paymentsFile)) {
    writeFileSync(paymentsFile, JSON.stringify({ payments: [] }, null, 2));
  }
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
