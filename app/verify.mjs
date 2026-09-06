import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };

const server = http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/index.html';
    const file = join(ROOT, normalize(p));
    const buf = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(buf);
  } catch {
    res.writeHead(404); res.end('not found');
  }
});
await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;

const errors = [];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

await page.goto(base, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);

const check = async (label) => {
  const txt = await page.textContent('body');
  return txt;
};

// Command center should render on load.
const body0 = await check();
const has = (t) => body0.includes(t);
const report = {};
report.command = has('COMMAND CENTER') && has('ALL SYSTEMS GO') && has('Activity stream');

// Navigate each screen by clicking the nav labels.
const nav = async (label) => {
  await page.click(`nav div:has-text("${label}")`);
  await page.waitForTimeout(150);
  return page.textContent('body');
};

let b = await nav('Launcher');
report.launcher = b.includes('Kali offensive suite') && b.includes('nmap') && b.includes('Quantized Ollama');

b = await nav('OSINT');
report.osint = b.includes('OSINT modules') && b.includes('Mail access / breach lookup');
// run a trace
await page.fill('input.input-jarvis', 'target@example.com');
await page.click('text=Run trace');
await page.waitForTimeout(1500);
b = await page.textContent('body');
report.osintResults = b.includes('breach: Collection#1') || b.includes('critical');

b = await nav('Monitor');
report.monitor = b.includes('Active operations') && (b.includes('nmap') || b.includes('running') || b.includes('completed'));

b = await nav('Settings');
report.settings = b.includes('Engagement') && b.includes('Safe mode') && b.includes('AI core');

b = await nav('Terminal');
report.terminal = b.includes('root@pwnboard') && b.includes('GODMODE kernel');
// type a command
await page.fill('div[style*="452"] input.pwn-native, input[placeholder*="type a command"]', 'whoami');
await page.press('input[placeholder*="type a command"]', 'Enter');
await page.waitForTimeout(150);
b = await page.textContent('body');
report.terminalCmd = b.includes('uid=0(root) godmode');

await page.screenshot({ path: 'verify-terminal.png' });
await nav('Command');
await page.screenshot({ path: 'verify-command.png' });
await nav('Launcher');
await page.screenshot({ path: 'verify-launcher.png' });
await nav('OSINT');
await page.fill('input.input-jarvis', '8.8.8.8');
await page.click('text=Run trace');
await page.waitForTimeout(1500);
await page.screenshot({ path: 'verify-osint.png' });
await nav('Monitor');
await page.screenshot({ path: 'verify-monitor.png' });
await nav('Settings');
await page.screenshot({ path: 'verify-settings.png' });

await browser.close();
server.close();

console.log('SCREEN CHECKS:', JSON.stringify(report, null, 2));
console.log('ERRORS:', errors.length ? JSON.stringify(errors, null, 2) : 'none');
const allPass = Object.values(report).every(Boolean) && errors.length === 0;
console.log(allPass ? 'ALL GOOD' : 'PROBLEMS FOUND');
process.exit(allPass ? 0 : 1);
