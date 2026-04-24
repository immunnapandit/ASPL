import { appendFile, mkdir } from 'node:fs/promises';
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
const GRAPH_TENANT_ID = (process.env.GRAPH_TENANT_ID || '').trim();
const GRAPH_CLIENT_ID = (process.env.GRAPH_CLIENT_ID || '').trim();
const GRAPH_CLIENT_SECRET = process.env.GRAPH_CLIENT_SECRET || '';
const GRAPH_FROM_EMAIL = (
  process.env.GRAPH_FROM_EMAIL ||
  process.env.CONTACT_FROM_EMAIL ||
  'info@atisunya.co'
).trim();

let graphTokenCache = null;

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
        address: HR_TO_EMAIL,
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
  console.log(`Career application notification sent to ${HR_TO_EMAIL}.`);

  await sendGraphEmail({
    subject: isGeneralApplication
      ? 'Thank you for sharing your resume with AtiSunya'
      : `Thank you for applying for ${sanitizeEmailHeaderValue(application.roleTitle)}`,
    html: buildCareerThankYouEmailHtml(application),
    to: [
      {
        name: sanitizeEmailHeaderValue(application.fullName),
        address: application.email,
      },
    ],
    replyTo: [
      {
        name: 'AtiSunya HR',
        address: HR_TO_EMAIL,
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

async function sendGraphEmail({ subject, html, to, replyTo = [], attachments = [] }) {
  const accessToken = await getGraphAccessToken();
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(GRAPH_FROM_EMAIL)}/sendMail`,
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
  const isAllowedLocalhostOrigin =
    typeof requestOrigin === 'string' &&
    /^http:\/\/localhost:\d+$/.test(requestOrigin);

  const allowOrigin =
    requestOrigin && (ALLOWED_ORIGINS.includes(requestOrigin) || isAllowedLocalhostOrigin)
      ? requestOrigin
      : ALLOWED_ORIGINS[0] || 'http://localhost:5173';

  nextHeaders.set('Access-Control-Allow-Origin', allowOrigin);
  nextHeaders.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  nextHeaders.set('Access-Control-Allow-Headers', 'Content-Type');
  nextHeaders.set('Vary', 'Origin');

  return new Response(response.body, {
    status: response.status,
    headers: nextHeaders,
  });
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
