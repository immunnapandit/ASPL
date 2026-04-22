import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '.env');
const dataDir = join(__dirname, 'data');
const paymentsFile = join(dataDir, 'payments.json');

loadEnvFile(envPath);
ensureDataStore();

const PORT = Number(process.env.PORT || 5001);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const ALLOWED_ORIGINS = FRONTEND_URL.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || '';

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

const supportedCurrencies = new Set(['INR', 'USD', 'EUR', 'GBP']);
const supportedPaymentMethods = new Set(['card', 'bank_transfer', 'qr_upi']);

let contactTransporter = null;
let contactTransporterVerified = false;

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
      return handlePaymentLookup(paymentId);
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
  });

  return json(
    200,
    {
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt,
      verifyUrl: `${ALLOWED_ORIGINS[0] || 'http://localhost:5173'}/pay-now`,
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

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return json(400, { error: 'Missing payment verification fields.' }, req);
  }

  const generatedSignature = createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  const verified = safeEqual(generatedSignature, razorpay_signature);

  if (!verified) {
    upsertPaymentRecord({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      status: 'verification_failed',
      verifiedAt: new Date().toISOString(),
    });

    return json(400, { verified: false, error: 'Invalid Razorpay signature.' }, req);
  }

  const paymentDetails = await fetchRazorpayPayment(razorpay_payment_id);

  upsertPaymentRecord({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
    status: paymentDetails?.status || 'paid',
    paymentDetails,
    verifiedAt: new Date().toISOString(),
  });

  return json(
    200,
    {
      verified: true,
      payment: paymentDetails,
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

async function handlePaymentLookup(paymentId) {
  if (!paymentId) {
    return json(400, { error: 'Missing payment id.' });
  }

  const payment = await fetchRazorpayPayment(paymentId);

  if (!payment) {
    return json(404, { error: 'Payment not found.' });
  }

  return json(200, { payment });
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

  if (!supportedCurrencies.has(currency)) {
    return { ok: false, error: 'Unsupported currency.' };
  }

  if (!course || typeof course !== 'string') {
    return { ok: false, error: 'Course is required.' };
  }

  if (!customer || typeof customer !== 'object') {
    return { ok: false, error: 'Customer details are required.' };
  }

  const requiredFields = [
    'firstName',
    'lastName',
    'fullName',
    'email',
    'phone',
    'address',
    'state',
    'pincode',
  ];

  for (const field of requiredFields) {
    if (!customer[field] || typeof customer[field] !== 'string') {
      return { ok: false, error: `Customer field "${field}" is required.` };
    }
  }

  if (!supportedPaymentMethods.has(customer.paymentMethod)) {
    return { ok: false, error: 'Unsupported payment method.' };
  }

  return {
    ok: true,
    data: {
      amount,
      currency,
      course,
      customer,
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

function parseBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  return ['1', 'true', 'yes', 'on'].includes(String(value).trim().toLowerCase());
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