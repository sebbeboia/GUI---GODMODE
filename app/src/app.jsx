/*
 * PWNBOARD — JARVIS-style pentest command HUD.
 * A faithful, real-React port of PWNBOARD.dc.html (Claude Design handoff).
 *
 * Globals expected on the page (loaded before this bundle):
 *   - React, ReactDOM  (UMD)
 *   - PwnboardUI       (the exported design-system bundle → window.PwnboardUI)
 *
 * All behaviour here is SIMULATED — fake jobs, canned OSINT results, a scripted
 * terminal. It is a visual prototype, exactly as the design specifies.
 */

const {
  ArcReactor,
  Waveform,
  StatCard,
  Card,
  ProgressBar,
  Input,
  Button,
  Spinner,
  DataTable,
  StatusBadge,
  SeverityBadge,
} = window.PwnboardUI;

// ---- small style helpers (ported from the design's inline-string builders) ----
const dotStyle = (c) => ({
  width: 7,
  height: 7,
  borderRadius: '50%',
  flex: '0 0 7px',
  marginTop: 6,
  background: c,
  boxShadow: `0 0 7px ${c}`,
});

const tagStyle = (c) => ({
  fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
  fontSize: 9,
  letterSpacing: 1.5,
  padding: '3px 7px',
  border: `1px solid ${c}55`,
  color: c,
  background: `${c}12`,
});

const accentStyle = (c) => ({
  position: 'absolute',
  left: 0,
  bottom: 0,
  height: 2,
  width: '100%',
  background: `linear-gradient(90deg, ${c}, transparent)`,
});

const lineStyle = (t) => {
  let c = '#667283';
  if (t.startsWith('[+]')) c = '#C8F04B';
  else if (t.startsWith('[!]')) c = '#FF7A45';
  else if (t.startsWith('[-]') || /error|denied|fail/i.test(t)) c = '#FF4D6D';
  else if (t.startsWith('[*]')) c = '#C8F04B';
  else if (t.startsWith('>')) c = '#E7EBF0';
  else if (t === 'ready.') c = '#C8F04B';
  return { color: c, whiteSpace: 'pre-wrap', wordBreak: 'break-word' };
};

const swTrack = (on, c) => ({
  width: 42,
  height: 22,
  borderRadius: 999,
  position: 'relative',
  transition: 'background .2s, box-shadow .2s',
  background: on ? c : '#242C38',
  boxShadow: on ? `0 0 10px ${c}55` : 'none',
  flex: '0 0 42px',
});

const swKnob = (on) => ({
  position: 'absolute',
  top: 2,
  left: on ? 22 : 2,
  width: 18,
  height: 18,
  borderRadius: '50%',
  background: '#0A0C10',
  transition: 'left .2s',
});

const SECTION_LABEL = {
  fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
  fontSize: 11,
  letterSpacing: 2.5,
  textTransform: 'uppercase',
  color: '#C8F04B',
};

// Reset applied to the custom controls that are real <button>s so they inherit
// the surrounding typography and layout instead of the browser's button chrome.
// Each control's own style object (set after this) overrides where it needs to.
const BTN_RESET = {
  appearance: 'none',
  WebkitAppearance: 'none',
  font: 'inherit',
  color: 'inherit',
  textAlign: 'left',
  border: 'none',
  background: 'transparent',
  margin: 0,
  width: '100%',
};

const TARGET = '10.10.14.7';

// ---- live backend bridge ----------------------------------------------------
// When the git-ignored local backend (backend/server.mjs) serves the app, it
// answers /api/* and the HUD runs against real tooling. With no backend (e.g. a
// plain clone of the public repo), every call below simply never fires and the
// app stays in its original simulated mode.
const API_KEY = new URLSearchParams(typeof location !== 'undefined' ? location.search : '').get('key') || '';
const api = (path, body) =>
  fetch(path + (path.includes('?') ? '&' : '?') + 'key=' + encodeURIComponent(API_KEY), {
    method: body ? 'POST' : 'GET',
    headers: { 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  }).then((r) => r.json());
const RECON_TOOLS = ['nmap', 'Nikto', 'Gobuster', 'Wireshark'];

const KALI = [
  ['nmap', 'Network mapper — service & version detection', '#C8F04B', 'nmap -sV -sC -p- {t}'],
  ['Metasploit', 'Exploit framework & payload delivery', '#FF7A45', 'msfconsole -q'],
  ['Burp Suite', 'Intercepting web proxy & scanner', '#FF7A45', 'burpsuite --project {t}'],
  ['Hydra', 'Parallelised login brute-forcer', '#FF4D6D', 'hydra -L users.txt -P rock.txt {t} ssh'],
  ['sqlmap', 'Automated SQL injection & takeover', '#FF7A45', 'sqlmap -u {t} --batch --dbs'],
  ['Aircrack-ng', '802.11 WEP/WPA key cracking', '#C8F04B', 'aircrack-ng capture.cap'],
  ['John the Ripper', 'Offline password cracker', '#FF7A45', 'john --wordlist=rock.txt hash.txt'],
  ['Wireshark', 'Deep packet capture & analysis', '#C8F04B', 'tshark -i eth0 -w cap.pcap'],
  ['Nikto', 'Web server vulnerability scan', '#FF7A45', 'nikto -h {t}'],
  ['Gobuster', 'Directory & DNS brute-forcing', '#C8F04B', 'gobuster dir -u {t} -w big.txt'],
  ['Hashcat', 'GPU-accelerated hash recovery', '#FF4D6D', 'hashcat -m 22000 hash.hc22000'],
  ['Responder', 'LLMNR/NBT-NS/MDNS poisoner', '#FF7A45', 'responder -I eth0 -wrf'],
// NOTE: the source prototype mapped `color:x[1], desc:x[2]` here, which swapped the
// description and the hex colour (the KALI data lists description at index 1, hex at
// index 2 — the opposite order the map assumed). That made every KALI tile print
// "#C8F04B" as its description and use the description string as an invalid colour.
// Corrected to match the AI/OSINT convention so the designed copy and palette show.
].map((x, i) => ({ id: 'k' + i, name: x[0], cat: 'KALI', color: x[2], desc: x[1] || '', cmd: x[3] }));

const OSINT = [
  ['mail', 'Mail access / breach lookup', 'Breach exposure (HaveIBeenPwned) plus the domain’s mail-security posture — MX, SPF, DMARC.', 'target@domain.com'],
  ['ipcam', 'IP camera finder', 'Finds internet-exposed cameras/devices via Shodan. Reports exposure only, never accesses streams.', 'city or net filter'],
  ['username', 'Username / social recon', 'Checks whether a handle exists on GitHub, GitLab, Reddit, Instagram, TikTok, Keybase, Telegram and X.', '@handle'],
  ['domain', 'Domain / WHOIS', 'WHOIS registration, live DNS (A/NS/MX) and certificate-transparency subdomains from crt.sh.', 'example.com'],
  ['phone', 'Phone number lookup', 'Line type, carrier and region via numverify; otherwise country resolved from the dial code.', '+4712345678'],
  ['geo', 'Geolocation / IP intel', 'IP geolocation, ASN/ISP, hosting and proxy/VPN flags (ip-api), plus reverse DNS.', '8.8.8.8'],
  ['shodan', 'Shodan-style host search', 'Host intelligence from Shodan: open ports, service banners and known CVEs.', '1.2.3.4'],
  ['meta', 'Metadata extractor', 'Extracts EXIF / document metadata — author, software, GPS, device — from a file path or URL via exiftool.', 'https://… or /path/file.jpg'],
].map((x) => ({ id: x[0], name: x[1], cat: 'OSINT', color: '#C8F04B', desc: x[2], hint: x[3] }));

const AI = [
  ['ollama', 'Quantized Ollama — pentest reasoning core', '#C8F04B', 'ollama run llama3-pentest-q4'],
  ['adb', 'ADB device bridge — enumerate, root-check, push frida-server', '#FF7A45', 'adb devices -l'],
  ['ios', 'iOS device info — libimobiledevice (ideviceinfo)', '#C8F04B', 'ideviceinfo'],
  ['exploit', 'AI exploit suggester (CVE → PoC)', '#FF7A45', 'pwn-ai suggest --target {t}'],
  ['report', 'AI report writer — PTES / OWASP', '#C8F04B', 'pwn-ai report --format pdf'],
].map((x, i) => ({
  id: 'a' + i,
  name:
    x[0] === 'ollama'
      ? 'Quantized Ollama'
      : x[0] === 'adb'
      ? 'ADB Device Bridge'
      : x[0] === 'ios'
      ? 'iOS Device Info'
      : x[0] === 'exploit'
      ? 'AI Exploit Suggester'
      : 'AI Report Writer',
  cat: 'AI',
  color: x[2],
  desc: x[1],
  cmd: x[3],
}));

const TITLES = {
  command: ['COMMAND CENTER', 'operational overview · real-time'],
  launcher: ['TOOL LAUNCHER', '25 modules · one-tap deployment'],
  osint: ['OSINT WORKSPACE', 'passive intelligence gathering'],
  monitor: ['OPERATION MONITOR', 'live scan & job telemetry'],
  settings: ['SYSTEM CONFIG', 'engagement & ai core'],
  terminal: ['CONSOLE', 'root shell · godmode'],
};

const NAV_DEF = [
  ['command', 'Command', '◱'],
  ['launcher', 'Launcher', '▦'],
  ['osint', 'OSINT', '◈'],
  ['monitor', 'Monitor', '◉'],
  ['settings', 'Settings', '⚙'],
  ['terminal', 'Terminal', '›_'],
];

const MODELS = ['llama3-pentest-q4', 'qwen2.5-coder-q5', 'deepseek-r1-q4', 'mistral-nemo-q6'];

const TOGGLE_DEF = [
  ['safeMode', 'Safe mode', 'block destructive payloads', '#C8F04B'],
  ['tor', 'Tor routing', 'anonymise all outbound traffic', '#C8F04B'],
  ['autoExploit', 'Auto-exploit', 'chain PoCs without confirmation', '#FF4D6D'],
  ['telemetry', 'Telemetry', 'phone home usage stats', '#FF7A45'],
];

class Pwnboard extends React.Component {
  constructor(props) {
    super(props);
    this.jid = 0;
    this.termRef = React.createRef();
    this.inputRef = React.createRef();
    this.history = [];       // command history (newest last)
    this.histIdx = -1;       // -1 = editing a fresh line
    this.histDraft = '';     // in-progress line stashed when browsing history
    this.state = {
      screen: 'command',
      jobs: [],
      terminal: [],
      activity: [],
      findings: 3,
      vitals: { cpu: 34, gpu: 61, tor: 92 },
      clock: this._now(),
      osintTool: 'mail',
      osintQuery: '',
      osintResults: null,
      osintRunning: false,
      settings: { safeMode: true, tor: true, autoExploit: false, telemetry: false },
      model: 'llama3-pentest-q4',
      models: MODELS,
      osintInfo: null,
      proxy: '127.0.0.1:9050',
      scope: '10.10.14.0/24',
      cmd: '',
      live: false,
      cwd: '~',
      busy: false,
    };
  }

  _now() {
    return new Date().toLocaleTimeString('en-GB', { hour12: false });
  }

  componentDidMount() {
    this._seed();
    this._timer = setInterval(() => this._tick(), 850);
    // Only probe for the backend when opened via its keyed URL (?key=…).
    // A plain clone of the public repo has no key and stays fully simulated.
    if (API_KEY) this._detectBackend();
  }
  _detectBackend() {
    api('/api/health')
      .then((h) => {
        if (!h || !h.live) return;
        this.live = true;
        const models = h.models && h.models.length ? h.models : this.state.models;
        this.setState({
          live: true,
          jobs: [],
          models,
          model: models[0],
          osintInfo: h.osintInfo || null,
          terminal: [
            { text: 'PWNBOARD OS v4.4.4 — GODMODE kernel · LIVE' },
            { text: '[+] local backend connected — real tooling armed' },
            { text: `[*] recon: nmap ${h.tools.nmap ? 'ok' : 'off'} · nikto ${h.tools.nikto ? 'ok' : 'off'} · gobuster ${h.tools.gobuster ? 'ok' : 'off'}` },
            { text: `[*] ollama online · ${models.length} models · osint shodan:${h.osint.shodan ? 'key' : 'none'} hibp:${h.osint.hibp ? 'key' : 'none'}` },
            { text: 'ready.' },
          ],
          activity: [{ t: this._now(), msg: 'live backend connected', color: '#C8F04B' }],
        });
      })
      .catch(() => {}); // no backend → stay simulated
  }
  componentWillUnmount() {
    clearInterval(this._timer);
  }
  componentDidUpdate(prevProps, prevState) {
    const el = this.termRef.current;
    if (el && this.state.screen === 'terminal') el.scrollTop = el.scrollHeight;
    // Focus the prompt when the terminal opens.
    if (this.state.screen === 'terminal' && prevState.screen !== 'terminal' && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  _seed() {
    const boot = [
      'PWNBOARD OS v4.4.4 — GODMODE kernel',
      '[*] mounting quantized ollama · llama3-pentest-q4 … ok',
      '[*] tor circuit established · 3 hops · exit DE',
      '[+] 25 tool modules registered',
      '[*] operator sebbeboia authenticated',
      'ready.',
    ];
    this.setState({
      terminal: boot.map((t) => ({ text: t })),
      jobs: [
        { id: ++this.jid, tool: 'nmap', cat: 'KALI', color: '#C8F04B', target: TARGET, cmd: 'nmap -sV -sC -p- ' + TARGET, progress: 44, status: 'running' },
        { id: ++this.jid, tool: 'Quantized Ollama', cat: 'AI', color: '#C8F04B', target: 'local', cmd: 'ollama run llama3-pentest-q4', progress: 100, status: 'completed' },
      ],
      activity: [
        { t: this._now(), msg: 'nmap scan started on ' + TARGET, color: '#C8F04B' },
        { t: this._now(), msg: 'ollama core warmed — 41 tok/s', color: '#C8F04B' },
        { t: this._now(), msg: 'tor exit rotated to DE-frankfurt-03', color: '#FF7A45' },
      ],
    });
  }

  _pushTerm(lines) {
    const arr = Array.isArray(lines) ? lines : [lines];
    this.setState((s) => ({ terminal: [...s.terminal, ...arr.map((t) => ({ text: t }))].slice(-160) }));
  }
  _pushActivity(msg, color) {
    this.setState((s) => ({ activity: [{ t: this._now(), msg, color }, ...s.activity].slice(0, 9) }));
  }
  _device(action) {
    return api('/api/device', { action })
      .then((r) => this._pushTerm((r && r.lines) || ['(no output)']))
      .catch((e) => this._pushTerm('[-] device error: ' + e.message));
  }

  setScreen(s) {
    this.setState({ screen: s });
  }

  launchTool(tool) {
    if (tool.cat === 'OSINT') {
      this.setState({ screen: 'osint', osintTool: tool.id, osintResults: null, osintRunning: false });
      return;
    }
    const target = tool.target || TARGET;
    if (this.live) {
      // AI core tile: warm the local model and point at the console.
      if (tool.name === 'Quantized Ollama') {
        this.setState({ screen: 'terminal' });
        this._pushTerm([`[*] warming ollama · ${this.state.model} …`]);
        api('/api/ai', { model: this.state.model, prompt: 'Reply with exactly: ready' })
          .then((r) => this._pushTerm([`[+] AI core ready — ${this.state.model}`, 'type `ai <prompt>` here to query the model']))
          .catch((e) => this._pushTerm('[-] ollama error: ' + e.message));
        return;
      }
      // Mobile device tooling (ported from the earlier pentest GUI).
      if (tool.name === 'ADB Device Bridge') {
        this.setState({ screen: 'terminal' });
        this._pushTerm('[*] adb: enumerating devices + root check …');
        this._device('adb-devices');
        this._device('adb-root');
        this._pushTerm('    console: `frida-push`, `adb-root`, `logcat`, or any `adb …` command');
        return;
      }
      if (tool.name === 'iOS Device Info') {
        this.setState({ screen: 'terminal' });
        this._pushTerm('[*] ios: querying libimobiledevice …');
        this._device('ios-info');
        return;
      }
      if (!RECON_TOOLS.includes(tool.name)) {
        this.setState({ screen: 'terminal' });
        this._pushTerm(`[!] ${tool.name} is not wired in live mode — run it manually from the console`);
        return;
      }
      this.setState({ screen: 'monitor' });
      this._pushTerm([`[*] launching ${tool.name} → ${target}`]);
      this._pushActivity(`${tool.name} launched on ${target}`, tool.color);
      api('/api/scan', { tool: tool.name, target }).then((r) => {
        if (r && r.error) this._pushTerm(`[-] ${r.error}`);
      });
      return;
    }
    const job = {
      id: ++this.jid,
      tool: tool.name,
      cat: tool.cat,
      color: tool.color,
      target,
      cmd: (tool.cmd || 'run').replace('{t}', target),
      progress: 2,
      status: 'running',
    };
    this.setState((s) => ({ jobs: [job, ...s.jobs], screen: 'monitor' }));
    this._pushTerm([`[*] launching ${tool.name} → ${target}`, `> ${job.cmd}`]);
    this._pushActivity(`${tool.name} launched on ${target}`, tool.color);
  }
  abort(id) {
    const j = this.state.jobs.find((x) => x.id === id);
    if (this.live) {
      api('/api/scan/abort', { id });
      if (j) this._pushTerm(`[!] operation aborted — ${j.tool}`);
      return;
    }
    this.setState((s) => ({ jobs: s.jobs.map((jb) => (jb.id === id ? { ...jb, status: 'cancelled' } : jb)) }));
    if (j) this._pushTerm(`[!] operation aborted — ${j.tool}`);
  }
  clearDone() {
    this.setState((s) => ({ jobs: s.jobs.filter((j) => j.status === 'running') }));
  }

  _tick() {
    if (this.live) {
      this.setState({ clock: this._now() });
      this._pollJobs();
      return;
    }
    this.setState((s) => {
      const v = s.vitals;
      const rw = (x, lo, hi) => Math.max(lo, Math.min(hi, x + (Math.random() * 10 - 5)));
      const jobs = s.jobs.map((j) => {
        if (j.status !== 'running') return j;
        const np = j.progress + (2 + Math.random() * 9);
        if (np >= 100) {
          this._afterComplete(j);
          return { ...j, progress: 100, status: 'completed' };
        }
        if (Math.random() < 0.35) this._pushTerm(`[*] ${j.tool}: ${this._scanLine(j)}`);
        return { ...j, progress: np };
      });
      return {
        clock: this._now(),
        vitals: {
          cpu: Math.round(rw(v.cpu, s.jobs.some((j) => j.status === 'running') ? 38 : 12, 88)),
          gpu: Math.round(rw(v.gpu, 30, 95)),
          tor: Math.round(rw(v.tor, 70, 99)),
        },
        jobs,
      };
    });
  }
  _afterComplete(j) {
    const n = 1 + Math.floor(Math.random() * 4);
    setTimeout(() => {
      this._pushTerm(`[+] ${j.tool} finished — ${n} finding${n > 1 ? 's' : ''}`);
      this._pushActivity(`${j.tool} completed · ${n} findings`, j.color);
      this.setState((s) => ({ findings: s.findings + n }));
    }, 0);
  }
  _pollJobs() {
    if (this._polling) return;
    this._polling = true;
    this._seen = this._seen || {};
    api('/api/jobs')
      .then((r) => {
        this._polling = false;
        if (!r || !Array.isArray(r.jobs)) return;
        // Stream any new output lines from each job into the terminal.
        const newLines = [];
        for (const j of r.jobs) {
          const seen = this._seen[j.id] || 0;
          const fresh = (j.lines || []).slice(seen);
          if (fresh.length) {
            newLines.push(...fresh.map((t) => `[${j.tool}] ${t}`));
            this._seen[j.id] = (j.lines || []).length;
          }
        }
        const completed = r.jobs.filter((j) => j.status === 'completed').length;
        this.setState((s) => ({
          jobs: r.jobs.map(({ lines, ...rest }) => ({ ...rest, progress: Math.round(rest.progress) })),
          findings: completed,
          terminal: newLines.length ? [...s.terminal, ...newLines.map((t) => ({ text: t }))].slice(-400) : s.terminal,
        }));
      })
      .catch(() => { this._polling = false; });
  }
  _scanLine() {
    const opts = [
      'discovered open port 443/tcp',
      'fingerprinted OpenSSH 8.9p1',
      'testing template 1204/10332',
      '204/tcp filtered — retrying',
      'banner grab: nginx/1.24.0',
      'candidate credential match',
      'handshake captured',
    ];
    return opts[Math.floor(Math.random() * opts.length)];
  }

  onOsintQuery(e) {
    this.setState({ osintQuery: e.target.value });
  }
  runOsint() {
    const q = (this.state.osintQuery || '').trim();
    if (!q) {
      this._pushTerm('[!] osint: no target supplied');
      return;
    }
    const mod = OSINT.find((o) => o.id === this.state.osintTool);
    this.setState({ osintRunning: true, osintResults: null });
    this._pushTerm([`[*] osint ${mod.id} trace → ${q}`]);
    if (this.live) {
      api('/api/osint', { tool: this.state.osintTool, query: q }).then((r) => {
        const rows = ((r && r.rows) || []).map((row, i) => ({ id: mod.id + i, ...row }));
        this.setState({ osintRunning: false, osintResults: rows });
        this._pushTerm(`[+] osint ${mod.id}: ${rows.length} signals resolved`);
        this._pushActivity(`${mod.name} → ${rows.length} signals on ${q}`, '#C8F04B');
      }).catch((e) => {
        this.setState({ osintRunning: false, osintResults: [] });
        this._pushTerm(`[-] osint error: ${e.message}`);
      });
      return;
    }
    setTimeout(() => {
      const rows = this._osintRows(this.state.osintTool, q);
      this.setState({ osintRunning: false, osintResults: rows });
      this._pushTerm(`[+] osint ${mod.id}: ${rows.length} signals resolved`);
      this._pushActivity(`${mod.name} → ${rows.length} signals on ${q}`, '#C8F04B');
    }, 1200);
  }
  _osintRows(tool, q) {
    const M = {
      mail: [
        ['breach: Collection#1', 'plaintext password recovered', 'critical'],
        ['breach: LinkedIn 2021', 'bcrypt hash exposed', 'high'],
        ['MX record', q.includes('@') ? 'mail.' + q.split('@')[1] : 'mx.' + q, 'info'],
        ['SPF', 'soft-fail — spoofable', 'medium'],
        ['pwned count', '7 breaches', 'high'],
      ],
      ipcam: [
        ['device', 'Hikvision DS-2CD', 'high'],
        ['port 554/rtsp', 'stream open · no auth', 'critical'],
        ['firmware', 'V5.4.5 — CVE-2021-36260', 'critical'],
        ['geo', '52.52, 13.40', 'info'],
        ['snapshot', '/onvif/snapshot reachable', 'high'],
      ],
      username: [
        ['github', 'sebbeboia · 42 repos', 'info'],
        ['reddit', 'u/' + q + ' · 3y old', 'low'],
        ['reuse', 'same handle · 6 platforms', 'medium'],
        ['email guess', '' + q + '@proton.me', 'medium'],
        ['avatar hash', 'matched on 2 sites', 'low'],
      ],
      domain: [
        ['registrar', 'NameCheap Inc', 'info'],
        ['created', '2019-04-11', 'info'],
        ['NS', 'ns1.cloudflare.com', 'info'],
        ['subdomains', '14 resolved', 'medium'],
        ['expired cert', 'staging.' + q, 'high'],
      ],
      phone: [
        ['carrier', 'Telenor NO', 'info'],
        ['type', 'mobile · VoLTE', 'info'],
        ['region', 'Oslo', 'low'],
        ['leaks', '1 SMS-2FA breach', 'high'],
        ['linked', '2 messaging apps', 'medium'],
      ],
      geo: [
        ['asn', 'AS15169 Google', 'info'],
        ['country', 'US · Mountain View', 'info'],
        ['proxy', 'none detected', 'low'],
        ['open ports', '53, 443', 'medium'],
        ['rdns', 'dns.google', 'info'],
      ],
      shodan: [
        ['host', q, 'info'],
        ['os', 'Ubuntu 22.04', 'info'],
        ['ports', '22,80,443,3306', 'high'],
        ['3306/mysql', 'banner exposed', 'critical'],
        ['tags', 'cloud, self-signed', 'medium'],
      ],
      meta: [
        ['author', 'j.doe', 'low'],
        ['software', 'Adobe Photoshop 25.1', 'info'],
        ['gps', '48.85, 2.35', 'high'],
        ['created', '2024-11-02', 'info'],
        ['device', 'iPhone 15 Pro', 'medium'],
      ],
    };
    return (M[tool] || []).map((r, i) => ({ id: tool + i, k: r[0], v: r[1], sev: r[2] }));
  }

  toggle(key) {
    this.setState((s) => ({ settings: { ...s.settings, [key]: !s.settings[key] } }));
  }
  onModel(e) {
    this.setState({ model: e.target.value });
    this._pushTerm('[*] model set → ' + e.target.value);
  }
  onProxy(e) {
    this.setState({ proxy: e.target.value });
  }
  onScope(e) {
    this.setState({ scope: e.target.value });
  }

  onCmd(e) {
    this.setState({ cmd: e.target.value });
  }
  _focus() { if (this.inputRef.current) this.inputRef.current.focus(); }
  _histNav(dir) {
    const h = this.history;
    if (!h.length) return;
    if (this.histIdx === -1) this.histDraft = this.state.cmd;
    if (dir < 0) {
      this.histIdx = this.histIdx === -1 ? h.length - 1 : Math.max(0, this.histIdx - 1);
    } else {
      if (this.histIdx === -1) return;
      this.histIdx += 1;
      if (this.histIdx >= h.length) { this.histIdx = -1; this.setState({ cmd: this.histDraft }); return; }
    }
    this.setState({ cmd: h[this.histIdx] });
  }
  onCmdKey(e) {
    if ((e.key === 'l' || e.key === 'L') && e.ctrlKey) { e.preventDefault(); this.setState({ terminal: [] }); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); this._histNav(-1); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); this._histNav(1); return; }
    if (e.key !== 'Enter') return;
    if (this.state.busy) return; // one command at a time
    const c = (this.state.cmd || '').trim();
    this.setState({ cmd: '' });
    this.histIdx = -1; this.histDraft = '';
    if (!c) return;
    if (this.history[this.history.length - 1] !== c) this.history.push(c);
    if (this.history.length > 100) this.history.shift();
    this._pushTerm('> ' + c);
    this._dispatch(c);
  }
  _await(promise) {
    this.setState({ busy: true });
    Promise.resolve(promise).finally(() => { this.setState({ busy: false }); this._focus(); });
  }
  _dispatch(c) {
    const parts = c.split(/\s+/);
    if (c === 'clear') { this.setState({ terminal: [] }); return; }
    if (this.live) {
      if (c === 'help') {
        this._pushTerm([
          'LIVE console — commands:',
          '  scan <target>     real nmap against a target',
          '  ai <prompt>       ask the local ollama model',
          '  devices           list adb devices',
          '  adb-root          root / magisk check',
          '  logcat            dump last 200 logcat lines',
          '  frida-push        push + start frida-server (rooted device)',
          '  ios-info          libimobiledevice info',
          '  clear  (Ctrl+L)   clear the console · ↑/↓ history',
          '  … anything else runs as a real shell command.',
        ]);
        return;
      }
      if (parts[0] === 'scan') {
        const t = parts[1] || TARGET;
        this.launchTool({ name: 'nmap', cat: 'KALI', color: '#C8F04B', target: t });
        return;
      }
      if (parts[0] === 'ai') {
        const prompt = c.slice(2).trim();
        if (!prompt) { this._pushTerm('[!] ai: no prompt'); return; }
        this._pushTerm('[*] ollama · thinking…');
        this._await(
          api('/api/ai', { model: this.state.model, prompt })
            .then((r) => this._pushTerm(((r && r.response) || '(no response)').split('\n')))
            .catch((err) => this._pushTerm('[-] ai error: ' + err.message))
        );
        return;
      }
      const DEV = { 'frida-push': 'frida-push', 'adb-root': 'adb-root', logcat: 'adb-logcat', devices: 'adb-devices', 'ios-info': 'ios-info' };
      if (DEV[c]) { this._pushTerm(`[*] device: ${c} …`); this._await(this._device(DEV[c])); return; }
      // Everything else runs as a real command in the backend shell.
      this._await(
        api('/api/exec', { cmd: c })
          .then((r) => {
            const lines = (r && r.lines) || [];
            if (lines.length) this._pushTerm(lines);
            if (r && r.cwd) this.setState({ cwd: r.cwd });
          })
          .catch((err) => this._pushTerm('[-] exec error: ' + err.message))
      );
      return;
    }
    if (c === 'help') {
      this._pushTerm(['available: help, whoami, tools, scan <ip>, clear  ·  ↑/↓ history · Ctrl+L clear', 'pipe anything else to the ai core with `ai <prompt>`']);
      return;
    }
    if (c === 'whoami') { this._pushTerm('sebbeboia — uid=0(root) godmode'); return; }
    if (c === 'tools') { this._pushTerm('[+] 12 kali · 8 osint · 5 ai modules online'); return; }
    if (parts[0] === 'scan') {
      const t = parts[1] || TARGET;
      this.launchTool({ name: 'nmap', cat: 'KALI', color: '#C8F04B', cmd: 'nmap -sV -sC -p- {t}', target: t });
      return;
    }
    if (parts[0] === 'ai') {
      this._pushTerm(['[*] ollama · thinking…', '[+] suggestion: try CVE-2021-36260 against the rtsp endpoint']);
      return;
    }
    this._pushTerm('[-] command not found: ' + parts[0]);
  }

  // ------------------------------- render pieces -------------------------------

  renderSidebar(running) {
    const s = this.state;
    return (
      <aside
        style={{
          width: 238,
          flex: '0 0 238px',
          borderRight: '1px solid #242C38',
          background: 'linear-gradient(180deg, #0F131A, #0A0C10)',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        <div style={{ padding: '20px 18px', borderBottom: '1px solid #242C38', display: 'flex', alignItems: 'center', gap: 12 }}>
          <ArcReactor size={34} />
          <div>
            <div style={{ fontFamily: "'Bricolage Grotesque', 'IBM Plex Sans', sans-serif", fontSize: 17, fontWeight: 800, letterSpacing: 1, color: '#C8F04B' }}>PWNBOARD</div>
            <div style={{ fontSize: 9.5, letterSpacing: 2.5, color: '#667283', marginTop: 2 }}>v4.4.4 · GODMODE</div>
          </div>
        </div>
        <nav style={{ padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
          {NAV_DEF.map(([id, label, glyph]) => {
            const active = s.screen === id;
            const badge = id === 'monitor' ? running : 0;
            return (
              <button
                key={id}
                type="button"
                className="pwn-clickable"
                aria-current={active ? 'page' : undefined}
                aria-label={`${label} screen`}
                onClick={() => this.setScreen(id)}
                style={{
                  ...BTN_RESET,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  cursor: 'pointer',
                  fontSize: 12.5,
                  letterSpacing: 0.5,
                  transition: 'background .15s, color .15s, border-color .15s',
                  borderLeft: `2px solid ${active ? '#C8F04B' : 'transparent'}`,
                  background: active ? 'rgba(200,240,75,.09)' : 'transparent',
                  color: active ? '#C8F04B' : '#97A2B2',
                }}
              >
                <span style={{ width: 20, textAlign: 'center', fontSize: 15 }}>{glyph}</span>
                <span style={{ flex: 1 }}>{label}</span>
                {badge ? (
                  <span
                    style={{
                      minWidth: 18,
                      height: 18,
                      padding: '0 5px',
                      borderRadius: 999,
                      background: '#C8F04B',
                      color: '#0A0C10',
                      fontSize: 10,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
        <div
          style={{
            padding: '14px 18px',
            borderTop: '1px solid #242C38',
            fontSize: 10,
            letterSpacing: 0.5,
            color: '#667283',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#C8F04B', boxShadow: '0 0 8px #C8F04B' }}></span>
          operator: sebbeboia
        </div>
      </aside>
    );
  }

  renderHeader(threat) {
    const s = this.state;
    const [title, sub] = TITLES[s.screen];
    return (
      <header
        style={{
          height: 60,
          flex: '0 0 60px',
          borderBottom: '1px solid #242C38',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          background: 'rgba(15,19,26,.55)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ margin: 0, fontFamily: "'Bricolage Grotesque', 'IBM Plex Sans', sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: 1.5, color: '#E7EBF0' }}>{title}</h1>
          <span style={{ fontSize: 10, letterSpacing: 1, color: '#667283', marginTop: 2 }}>{sub}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <Waveform bars={14} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 13, color: '#C8F04B', letterSpacing: 1, fontVariantNumeric: 'tabular-nums' }}>{s.clock}</span>
            <span style={{ fontSize: 9.5, letterSpacing: 1, color: s.live ? '#C8F04B' : '#667283' }}>{s.live ? 'LIVE · REAL TOOLING' : 'UTC · TOR ACTIVE'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 11px', border: '1px solid #2A1A22', background: 'rgba(255,77,109,.06)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF4D6D', boxShadow: '0 0 8px #FF4D6D' }}></span>
            <span style={{ fontSize: 10, letterSpacing: 1.5, color: '#FF4D6D' }}>THREAT: {threat}</span>
          </div>
        </div>
      </header>
    );
  }

  renderCommand(running) {
    const s = this.state;
    const v = s.vitals;
    const vitalRow = (label, val) => (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#97A2B2', marginBottom: 5 }}>
          <span>{label}</span>
          <span style={{ color: '#C8F04B', fontVariantNumeric: 'tabular-nums' }}>{val}%</span>
        </div>
        <ProgressBar value={val} />
      </div>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 }}>
          <StatCard label="Active operations" value={running} color="#C8F04B" />
          <StatCard label="Findings" value={s.findings} color="#FF7A45" />
          <StatCard label="Tools online" value={25} color="#C8F04B" />
          <StatCard label="Assets mapped" value={47} color="#FF7A45" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)', gap: 20 }}>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <span style={{ ...SECTION_LABEL, alignSelf: 'flex-start' }}>Core status</span>
              <div style={{ margin: '14px 0 6px' }}>
                <ArcReactor size={140} />
              </div>
              <div style={{ fontSize: 20, letterSpacing: 3, color: '#C8F04B', textShadow: '0 0 12px rgba(200,240,75,.5)' }}>ALL SYSTEMS GO</div>
              <div style={{ fontSize: 11, color: '#667283', letterSpacing: 1, marginTop: 4 }}>quantized ollama · llama3-pentest-q4 · loaded</div>
              <div style={{ width: '100%', marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {vitalRow('GPU · inference', v.gpu)}
                {vitalRow('CPU · scans', v.cpu)}
                {vitalRow('TOR · circuit health', v.tor)}
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={SECTION_LABEL}>Activity stream</span>
              <span style={{ fontSize: 10, color: '#667283', letterSpacing: 1 }}>live</span>
            </div>
            <div role="log" aria-live="polite" aria-label="Activity stream" style={{ display: 'flex', flexDirection: 'column', gap: 9, maxHeight: 290, overflow: 'auto' }}>
              {s.activity.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, fontSize: 12, lineHeight: 1.5 }}>
                  <span style={{ color: '#667283', flex: '0 0 62px' }}>{a.t}</span>
                  <span style={dotStyle(a.color)}></span>
                  <span style={{ color: '#97A2B2', flex: 1 }}>{a.msg}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  renderLauncher() {
    const sections = [
      { title: 'Kali offensive suite', count: KALI.length, tools: KALI },
      { title: 'OSINT recon modules', count: OSINT.length, tools: OSINT },
      { title: 'AI & device exploitation', count: AI.length, tools: AI },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        {sections.map((sec) => (
          <div key={sec.title}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span style={SECTION_LABEL}>{sec.title}</span>
              <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #242C38, transparent)' }}></span>
              <span style={{ fontSize: 10, color: '#667283', letterSpacing: 1 }}>{sec.count} modules</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
              {sec.tools.map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  className="pwn-tool pwn-clickable"
                  aria-label={`Launch ${tool.name} — ${tool.desc}`}
                  onClick={() => this.launchTool(tool)}
                  style={{
                    ...BTN_RESET,
                    display: 'block',
                    position: 'relative',
                    border: '1px solid #242C38',
                    background: 'linear-gradient(160deg, #151A23, #0F131A)',
                    padding: '15px 15px 17px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    transition: 'border-color .2s, transform .2s, background .2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
                    <span style={tagStyle(tool.color)}>{tool.cat}</span>
                    <span style={{ fontSize: 13, color: '#667283' }}>▸</span>
                  </div>
                  <div style={{ fontSize: 14.5, color: '#E7EBF0', letterSpacing: 0.5, marginBottom: 5 }}>{tool.name}</div>
                  <div style={{ fontSize: 11, color: '#97A2B2', lineHeight: 1.5, minHeight: 32 }}>{tool.desc}</div>
                  <div style={accentStyle(tool.color)}></div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  renderOsint() {
    const s = this.state;
    const activeMod = OSINT.find((o) => o.id === s.osintTool) || OSINT[0];
    const P = window.PwnboardUI;
    const columns = [
      { header: 'Signal', cell: (r) => React.createElement('span', { style: { color: '#C8F04B', fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace", fontSize: 12 } }, r.k) },
      { header: 'Detail', cell: (r) => React.createElement('span', { style: { color: '#97A2B2', fontSize: 12 } }, r.v) },
      { header: 'Risk', cell: (r) => (P.SeverityBadge ? React.createElement(P.SeverityBadge, { severity: r.sev }) : r.sev) },
    ];
    const showResults = !s.osintRunning && Array.isArray(s.osintResults);
    const idle = !s.osintRunning && !Array.isArray(s.osintResults);
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '290px minmax(0, 1fr)', gap: 20 }}>
        <Card>
          <div style={{ ...SECTION_LABEL, marginBottom: 14 }}>OSINT modules</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {OSINT.map((o) => {
              const active = s.osintTool === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  className="pwn-clickable"
                  aria-pressed={active}
                  aria-label={`${o.name} OSINT module`}
                  onClick={() => this.setState({ osintTool: o.id, osintResults: null, osintRunning: false })}
                  style={{
                    ...BTN_RESET,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 11px',
                    cursor: 'pointer',
                    fontSize: 12,
                    letterSpacing: 0.5,
                    transition: 'background .15s, color .15s, border-color .15s',
                    border: `1px solid ${active ? '#C8F04B55' : 'transparent'}`,
                    background: active ? 'rgba(200,240,75,.08)' : 'transparent',
                    color: active ? '#C8F04B' : '#97A2B2',
                  }}
                >
                  <span style={{ width: 16 }}>›</span>
                  <span style={{ flex: 1 }}>{o.name}</span>
                </button>
              );
            })}
          </div>
        </Card>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 15, color: '#E7EBF0', letterSpacing: 1 }}>{activeMod.name}</span>
            <span style={{ fontSize: 10, letterSpacing: 2, color: '#667283', textTransform: 'uppercase' }}>OSINT · passive</span>
          </div>
          <div style={{ fontSize: 11.5, color: '#97A2B2', lineHeight: 1.5, marginBottom: 16 }}>
            {(s.osintInfo && s.osintInfo[activeMod.id]) || activeMod.desc}
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            <div style={{ flex: 1 }}>
              <Input
                value={s.osintQuery}
                onChange={(e) => this.onOsintQuery(e)}
                placeholder={`e.g. ${activeMod.hint}…`}
                aria-label={`${activeMod.name} — target to trace`}
                name="osint-target"
                autoComplete="off"
                spellCheck={false}
                style={{ width: '100%' }}
              />
            </div>
            <Button onClick={() => this.runOsint()}>Run trace</Button>
          </div>
          <div aria-live="polite">
            {s.osintRunning && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '46px 0' }}>
                <Spinner size={38} />
                <span style={{ fontSize: 12, color: '#C8F04B', letterSpacing: 1.5 }}>QUERYING SOURCES…</span>
              </div>
            )}
            {showResults && (
              <DataTable columns={columns} rows={s.osintResults || []} rowKey={(r) => r.id} emptyMessage="NO SIGNALS" />
            )}
            {idle && (
              <div style={{ padding: '46px 0', textAlign: 'center', color: '#667283', fontSize: 12, letterSpacing: 1 }}>— enter a target and run a trace —</div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  renderMonitor() {
    const s = this.state;
    const jobsView = s.jobs.map((j) => ({
      ...j,
      progress: Math.round(j.progress),
      progressLabel:
        j.status === 'running'
          ? `${Math.round(j.progress)}% · streaming`
          : j.status === 'completed'
          ? 'complete · results ready'
          : 'aborted by operator',
      abortable: j.status === 'running',
    }));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={SECTION_LABEL}>Active operations · {s.jobs.length}</span>
          <Button onClick={() => this.clearDone()}>Clear completed</Button>
        </div>
        {s.jobs.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {jobsView.map((j) => (
              <Card key={j.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 14, color: '#E7EBF0', letterSpacing: 0.5 }}>{j.tool}</span>
                    <span style={tagStyle(j.color)}>{j.cat}</span>
                  </div>
                  <StatusBadge status={j.status} />
                </div>
                <div style={{ fontSize: 11.5, color: '#97A2B2', marginBottom: 11, letterSpacing: 0.5 }}>
                  target {j.target}  ·  {j.cmd}
                </div>
                <ProgressBar value={j.progress} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 11 }}>
                  <span style={{ fontSize: 11, color: '#97A2B2' }}>{j.progressLabel}</span>
                  {j.abortable && (
                    <Button variant="danger" onClick={() => this.abort(j.id)}>Abort</Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
        {s.jobs.length === 0 && (
          <Card>
            <div style={{ padding: '34px 0', textAlign: 'center', color: '#667283', fontSize: 12, letterSpacing: 1 }}>
              no operations running — launch a tool from the grid
            </div>
          </Card>
        )}
      </div>
    );
  }

  renderSettings() {
    const s = this.state;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        <Card>
          <div style={{ ...SECTION_LABEL, marginBottom: 16 }}>Engagement</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {TOGGLE_DEF.map(([key, name, desc, c]) => {
              const on = s.settings[key];
              return (
                <button
                  key={key}
                  type="button"
                  className="pwn-clickable"
                  role="switch"
                  aria-checked={on}
                  aria-label={`${name} — ${desc}`}
                  onClick={() => this.toggle(key)}
                  style={{ ...BTN_RESET, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 13, color: '#E7EBF0' }}>{name}</span>
                    <span style={{ fontSize: 10.5, color: '#667283' }}>{desc}</span>
                  </div>
                  <div style={swTrack(on, c)}>
                    <div style={swKnob(on)}></div>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>
        <Card>
          <div style={{ ...SECTION_LABEL, marginBottom: 16 }}>AI core</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span style={{ fontSize: 11, letterSpacing: 1, color: '#97A2B2' }}>Local model</span>
              <select className="pwn-native" aria-label="Local AI model" name="ai-model" value={s.model} onChange={(e) => this.onModel(e)}>
                {(s.models || MODELS).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span style={{ fontSize: 11, letterSpacing: 1, color: '#97A2B2' }}>SOCKS proxy</span>
              <input className="pwn-native" aria-label="SOCKS proxy address" name="socks-proxy" autoComplete="off" spellCheck={false} style={{ padding: '9px 11px', fontSize: 12 }} value={s.proxy} onChange={(e) => this.onProxy(e)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span style={{ fontSize: 11, letterSpacing: 1, color: '#97A2B2' }}>Engagement scope (CIDR)</span>
              <input className="pwn-native" aria-label="Engagement scope (CIDR)" name="engagement-scope" autoComplete="off" spellCheck={false} style={{ padding: '9px 11px', fontSize: 12 }} value={s.scope} onChange={(e) => this.onScope(e)} />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  renderTerminal() {
    const s = this.state;
    return (
      <Card padding="none">
        <div style={{ background: '#0A0C10', padding: '8px 14px', borderBottom: '1px solid #242C38', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF4D6D' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF7A45' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#C8F04B' }}></span>
          <span style={{ marginLeft: 8, fontSize: 11, color: '#667283', letterSpacing: 1, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>root@pwnboard — {s.live ? s.cwd : '/opt/pwnboard'}</span>
          <span style={{ fontSize: 9.5, letterSpacing: 1.5, color: s.live ? '#C8F04B' : '#667283' }}>{s.live ? 'LIVE' : 'SIM'}</span>
        </div>
        <div ref={this.termRef} style={{ background: '#0A0C10', height: 452, overflow: 'auto', padding: '14px 16px', fontSize: 12.5, lineHeight: 1.65 }}>
          <div role="log" aria-live="polite" aria-label="Terminal output">
            {s.terminal.map((line, i) => (
              <div key={i} style={lineStyle(line.text)}>
                {line.text}
              </div>
            ))}
          </div>
          {s.busy && (
            <div style={{ color: '#667283', marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Spinner size={12} /> running…
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, opacity: s.busy ? 0.4 : 1 }}>
            <span style={{ color: '#C8F04B' }}>root@pwnboard</span>
            <span style={{ color: '#667283' }}>:</span>
            <span style={{ color: '#97A2B2' }}>{s.live ? s.cwd : '~'}</span>
            <span style={{ color: '#C8F04B' }}>#</span>
            <input
              ref={this.inputRef}
              className="pwn-native"
              aria-label="Terminal command input"
              name="terminal-command"
              autoComplete="off"
              spellCheck={false}
              readOnly={s.busy}
              style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 12.5, padding: '2px 0' }}
              value={s.cmd}
              onChange={(e) => this.onCmd(e)}
              onKeyDown={(e) => this.onCmdKey(e)}
              placeholder={s.busy ? 'running… (one command at a time)' : 'type a command — try help · ↑/↓ history · Ctrl+L clear'}
            />
          </div>
        </div>
      </Card>
    );
  }

  render() {
    const s = this.state;
    const running = s.jobs.filter((j) => j.status === 'running').length;
    const threat = s.settings.autoExploit ? 'ELEVATED' : 'NOMINAL';
    return (
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          background: 'radial-gradient(1200px 600px at 80% -10%, rgba(200,240,75,.06), transparent 60%), #0A0C10',
          fontFamily: "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace",
          color: '#E7EBF0',
        }}
      >
        {this.renderSidebar(running)}
        <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {this.renderHeader(threat)}
          <main id="main" tabIndex={-1} style={{ flex: 1, overflow: 'auto', padding: '26px 28px', outline: 'none' }}>
            {s.screen === 'command' && this.renderCommand(running)}
            {s.screen === 'launcher' && this.renderLauncher()}
            {s.screen === 'osint' && this.renderOsint()}
            {s.screen === 'monitor' && this.renderMonitor()}
            {s.screen === 'settings' && this.renderSettings()}
            {s.screen === 'terminal' && this.renderTerminal()}
          </main>
        </div>
      </div>
    );
  }
}

const rootEl = document.getElementById('root');
ReactDOM.createRoot(rootEl).render(React.createElement(Pwnboard));
