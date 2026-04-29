import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { resolve } from 'node:path';

const rootDir = process.cwd();
const viteEntry = resolve(rootDir, 'node_modules', 'vite', 'bin', 'vite.js');
const backendEntry = resolve(rootDir, 'backend', 'server.js');
const envPaths = [
  resolve(rootDir, 'Server_payment', '.env.local'),
  resolve(rootDir, 'Server_payment', '.env'),
  resolve(rootDir, 'backend', '.env.local'),
  resolve(rootDir, 'backend', '.env'),
  resolve(rootDir, '.env.local'),
  resolve(rootDir, '.env'),
];

let shuttingDown = false;
let shutdownCode = 0;
const children = [];

function readEnvValue(key) {
  for (const envPath of envPaths) {
    if (!existsSync(envPath)) {
      continue;
    }

    const content = readFileSync(envPath, 'utf8');

    for (const line of content.split(/\r?\n/)) {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith('#')) {
        continue;
      }

      const separatorIndex = trimmedLine.indexOf('=');

      if (separatorIndex === -1) {
        continue;
      }

      const currentKey = trimmedLine.slice(0, separatorIndex).trim();

      if (currentKey !== key) {
        continue;
      }

      return trimmedLine.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    }
  }

  return process.env[key] || '';
}

function resolveBackendPort() {
  const port = Number.parseInt(readEnvValue('PORT') || '5001', 10);
  return Number.isFinite(port) && port > 0 ? port : 5001;
}

function isPortAvailable(port) {
  return new Promise((resolvePort) => {
    const tester = createServer();

    tester.once('error', () => {
      resolvePort(false);
    });

    tester.once('listening', () => {
      tester.close(() => resolvePort(true));
    });

    tester.listen(port);
  });
}

function stopChildren() {
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }
}

function shutdown(code = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  shutdownCode = code;
  stopChildren();
  setTimeout(() => {
    process.exit(shutdownCode);
  }, 500).unref();
}

function spawnProcess(name, command, args) {
  const child = spawn(command, args, {
    cwd: rootDir,
    env: process.env,
    stdio: 'inherit',
  });

  children.push(child);

  child.on('error', (error) => {
    console.error(`[start] ${name} failed to launch: ${error.message}`);
    shutdown(1);
  });

  child.on('exit', (code, signal) => {
    if (shuttingDown) {
      if (children.every((runningChild) => runningChild.exitCode !== null || runningChild.signalCode)) {
        process.exit(shutdownCode);
      }
      return;
    }

    const detail = signal ? `signal ${signal}` : `code ${code ?? 0}`;
    console.error(`[start] ${name} stopped with ${detail}.`);
    shutdown(code ?? 1);
  });

  return child;
}

const backendPort = resolveBackendPort();

console.log(`[start] Launching frontend on http://localhost:5173 and backend on http://localhost:${backendPort}`);
console.log('[start] Press Ctrl+C to stop both servers.');

spawnProcess('frontend', process.execPath, [viteEntry]);

if (await isPortAvailable(backendPort)) {
  spawnProcess('backend', process.execPath, [backendEntry]);
} else {
  console.warn(
    `[start] Backend port ${backendPort} is already in use. Assuming the backend is already running and continuing with frontend only.`
  );
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
