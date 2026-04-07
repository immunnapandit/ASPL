import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFilePath = path.join(__dirname, '.env');

if (existsSync(envFilePath)) {
  const envFileContent = readFileSync(envFilePath, 'utf8');

  envFileContent.split(/\r?\n/).forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      return;
    }

    const separatorIndex = trimmedLine.indexOf('=');

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();

    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  });
}

const PORT = Number(process.env.PORT || 5001);
const dataDirectory = path.join(__dirname, 'data');
const submissionsFile = path.join(dataDirectory, 'contact-submissions.json');
const contactRecipient = process.env.CONTACT_TO_EMAIL || 'info@atisunya.co';
const smtpHost = process.env.SMTP_HOST || '';
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = process.env.SMTP_SECURE === 'true';
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';
const smtpFrom = process.env.SMTP_FROM || smtpUser;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  response.end(JSON.stringify(payload));
};

const readRequestBody = (request) =>
  new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error('Payload too large.'));
      }
    });

    request.on('end', () => resolve(body));
    request.on('error', reject);
  });

const ensureStorage = async () => {
  await mkdir(dataDirectory, { recursive: true });

  if (!existsSync(submissionsFile)) {
    await writeFile(submissionsFile, '[]', 'utf8');
  }
};

const saveSubmission = async (submission) => {
  await ensureStorage();

  const existingContent = await readFile(submissionsFile, 'utf8');
  const submissions = JSON.parse(existingContent);

  submissions.push(submission);

  await writeFile(submissionsFile, JSON.stringify(submissions, null, 2), 'utf8');
};

const getMailTransporter = () => {
  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
};

const sendContactEmail = async (submission) => {
  const transporter = getMailTransporter();

  if (!transporter) {
    throw new Error(
      'SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, and SMTP_FROM.',
    );
  }

  await transporter.sendMail({
    from: smtpFrom,
    to: contactRecipient,
    replyTo: submission.email,
    subject: `New contact form submission: ${submission.subject}`,
    text: [
      'A new contact form was submitted.',
      '',
      `Full name: ${submission.fullName}`,
      `Email: ${submission.email}`,
      `Subject: ${submission.subject}`,
      '',
      'Message:',
      submission.message,
      '',
      `Submitted at: ${submission.submittedAt}`,
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; color: #172426; line-height: 1.6;">
        <h2 style="margin-bottom: 16px;">New Contact Form Submission</h2>
        <p><strong>Full name:</strong> ${submission.fullName}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Subject:</strong> ${submission.subject}</p>
        <p><strong>Submitted at:</strong> ${submission.submittedAt}</p>
        <div style="margin-top: 20px;">
          <strong>Message:</strong>
          <p style="white-space: pre-line;">${submission.message}</p>
        </div>
      </div>
    `,
  });
};

const validateSubmission = (payload) => {
  const fullName = typeof payload.fullName === 'string' ? payload.fullName.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const subject = typeof payload.subject === 'string' ? payload.subject.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!fullName || !email || !subject || !message) {
    return {
      valid: false,
      message: 'All fields are required.',
    };
  }

  if (!emailPattern.test(email)) {
    return {
      valid: false,
      message: 'Please enter a valid email address.',
    };
  }

  return {
    valid: true,
    data: {
      fullName,
      email,
      subject,
      message,
    },
  };
};

const server = createServer(async (request, response) => {
  if (!request.url) {
    sendJson(response, 404, { message: 'Not found.' });
    return;
  }

  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  if (request.method === 'POST' && request.url === '/api/contact') {
    try {
      const rawBody = await readRequestBody(request);
      const payload = rawBody ? JSON.parse(rawBody) : {};
      const validation = validateSubmission(payload);

      if (!validation.valid) {
        sendJson(response, 400, { message: validation.message });
        return;
      }

      const submission = {
        id: `contact_${Date.now()}`,
        ...validation.data,
        submittedAt: new Date().toISOString(),
      };

      try {
        await sendContactEmail(submission);

        await saveSubmission({
          ...submission,
          emailStatus: 'sent',
        });
      } catch (error) {
        await saveSubmission({
          ...submission,
          emailStatus: 'failed',
          emailError: error instanceof Error ? error.message : 'Unknown email error',
        });

        sendJson(response, 500, {
          message:
            'Your message was saved, but the email could not be sent. Please check the backend email configuration.',
        });
        return;
      }

      sendJson(response, 201, {
        message: 'Thank you. Your message has been received.',
      });
      return;
    } catch (error) {
      const isJsonError = error instanceof SyntaxError;

      sendJson(response, isJsonError ? 400 : 500, {
        message: isJsonError
          ? 'Invalid request payload.'
          : 'Unable to process your request right now.',
      });
      return;
    }
  }

  sendJson(response, 404, { message: 'Not found.' });
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(
      `Port ${PORT} is already in use. Stop the existing process or run with a different PORT.`,
    );
    return;
  }

  console.error('Unable to start contact backend.', error);
});

server.listen(PORT, () => {
  console.log(`Contact backend running on http://localhost:${PORT}`);
});
