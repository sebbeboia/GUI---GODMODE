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
  fontFamily: "'JetBrains Mono', monospace",
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
  let c = '#6b8299';
  if (t.startsWith('[+]')) c = '#00ff88';
  else if (t.startsWith('[!]')) c = '#ff6b35';
  else if (t.startsWith('[-]') || /error|denied|fail/i.test(t)) c = '#ff0040';
  else if (t.startsWith('[*]')) c = '#00d4ff';
  else if (t.startsWith('>')) c = '#dbe6f0';
  else if (t === 'ready.') c = '#00ff88';
  return { color: c, whiteSpace: 'pre-wrap', wordBreak: 'break-word' };
};

const swTrack = (on, c) => ({
  width: 42,
  height: 22,
  borderRadius: 999,
  position: 'relative',
  transition: 'all .2s',
  background: on ? c : '#16283a',
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
  background: '#04080e',
  transition: 'all .2s',
});

const SECTION_LABEL = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  letterSpacing: 2.5,
  textTransform: 'uppercase',
  color: '#00d4ff',
};

const TARGET = '10.10.14.7';

const KALI = [
  ['nmap', 'Network mapper — service & version detection', '#00d4ff', 'nmap -sV -sC -p- {t}'],
  ['Metasploit', 'Exploit framework & payload delivery', '#ff6b35', 'msfconsole -q'],
  ['Burp Suite', 'Intercepting web proxy & scanner', '#ffd700', 'burpsuite --project {t}'],
  ['Hydra', 'Parallelised login brute-forcer', '#ff0040', 'hydra -L users.txt -P rock.txt {t} ssh'],
  ['sqlmap', 'Automated SQL injection & takeover', '#ff6b35', 'sqlmap -u {t} --batch --dbs'],
  ['Aircrack-ng', '802.11 WEP/WPA key cracking', '#00d4ff', 'aircrack-ng capture.cap'],
  ['John the Ripper', 'Offline password cracker', '#ffd700', 'john --wordlist=rock.txt hash.txt'],
  ['Wireshark', 'Deep packet capture & analysis', '#00d4ff', 'tshark -i eth0 -w cap.pcap'],
  ['Nikto', 'Web server vulnerability scan', '#ffd700', 'nikto -h {t}'],
  ['Gobuster', 'Directory & DNS brute-forcing', '#00d4ff', 'gobuster dir -u {t} -w big.txt'],
  ['Hashcat', 'GPU-accelerated hash recovery', '#ff0040', 'hashcat -m 22000 hash.hc22000'],
  ['Responder', 'LLMNR/NBT-NS/MDNS poisoner', '#ff6b35', 'responder -I eth0 -wrf'],
// NOTE: the source prototype mapped `color:x[1], desc:x[2]` here, which swapped the
// description and the hex colour (the KALI data lists description at index 1, hex at
// index 2 — the opposite order the map assumed). That made every KALI tile print
// "#00d4ff" as its description and use the description string as an invalid colour.
// Corrected to match the AI/OSINT convention so the designed copy and palette show.
].map((x, i) => ({ id: 'k' + i, name: x[0], cat: 'KALI', color: x[2], desc: x[1] || '', cmd: x[3] }));

const OSINT = [
  ['mail', 'Mail access / breach lookup'],
  ['ipcam', 'IP camera finder'],
  ['username', 'Username / social recon'],
  ['domain', 'Domain / WHOIS'],
  ['phone', 'Phone number lookup'],
  ['geo', 'Geolocation / IP intel'],
  ['shodan', 'Shodan-style host search'],
  ['meta', 'Metadata extractor'],
].map((x) => ({ id: x[0], name: x[1], cat: 'OSINT', color: '#00ff88', desc: x[1] }));

const AI = [
  ['ollama', 'Quantized Ollama — pentest reasoning core', '#00ff88', 'ollama run llama3-pentest-q4'],
  ['adb', 'ADB advanced jailbreak / device root', '#ff6b35', 'adb shell su -c "magisk --install"'],
  ['ios', 'iOS jailbreak — AI-assisted exploit chain', '#ff0040', 'palera1n --ai-chain {t}'],
  ['exploit', 'AI exploit suggester (CVE → PoC)', '#ffd700', 'pwn-ai suggest --target {t}'],
  ['report', 'AI report writer — PTES / OWASP', '#00d4ff', 'pwn-ai report --format pdf'],
].map((x, i) => ({
  id: 'a' + i,
  name:
    x[0] === 'ollama'
      ? 'Quantized Ollama'
      : x[0] === 'adb'
      ? 'ADB Jailbreak'
      : x[0] === 'ios'
      ? 'iOS Jailbreak AI'
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
  ['safeMode', 'Safe mode', 'block destructive payloads', '#00ff88'],
  ['tor', 'Tor routing', 'anonymise all outbound traffic', '#00d4ff'],
  ['autoExploit', 'Auto-exploit', 'chain PoCs without confirmation', '#ff0040'],
  ['telemetry', 'Telemetry', 'phone home usage stats', '#ffd700'],
];

class Pwnboard extends React.Component {
  constructor(props) {
    super(props);
    this.jid = 0;
    this.termRef = React.createRef();
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
      proxy: '127.0.0.1:9050',
      scope: '10.10.14.0/24',
      cmd: '',
    };
  }

  _now() {
    return new Date().toLocaleTimeString('en-GB', { hour12: false });
  }

  componentDidMount() {
    this._seed();
    this._timer = setInterval(() => this._tick(), 850);
  }
  componentWillUnmount() {
    clearInterval(this._timer);
  }
  componentDidUpdate() {
    const el = this.termRef.current;
    if (el && this.state.screen === 'terminal') el.scrollTop = el.scrollHeight;
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
        { id: ++this.jid, tool: 'nmap', cat: 'KALI', color: '#00d4ff', target: TARGET, cmd: 'nmap -sV -sC -p- ' + TARGET, progress: 44, status: 'running' },
        { id: ++this.jid, tool: 'Quantized Ollama', cat: 'AI', color: '#00ff88', target: 'local', cmd: 'ollama run llama3-pentest-q4', progress: 100, status: 'completed' },
      ],
      activity: [
        { t: this._now(), msg: 'nmap scan started on ' + TARGET, color: '#00d4ff' },
        { t: this._now(), msg: 'ollama core warmed — 41 tok/s', color: '#00ff88' },
        { t: this._now(), msg: 'tor exit rotated to DE-frankfurt-03', color: '#ffd700' },
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

  setScreen(s) {
    this.setState({ screen: s });
  }

  launchTool(tool) {
    if (tool.cat === 'OSINT') {
      this.setState({ screen: 'osint', osintTool: tool.id, osintResults: null, osintRunning: false });
      return;
    }
    const target = tool.target || TARGET;
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
    this.setState((s) => ({ jobs: s.jobs.map((jb) => (jb.id === id ? { ...jb, status: 'cancelled' } : jb)) }));
    if (j) this._pushTerm(`[!] operation aborted — ${j.tool}`);
  }
  clearDone() {
    this.setState((s) => ({ jobs: s.jobs.filter((j) => j.status === 'running') }));
  }

  _tick() {
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
    setTimeout(() => {
      const rows = this._osintRows(this.state.osintTool, q);
      this.setState({ osintRunning: false, osintResults: rows });
      this._pushTerm(`[+] osint ${mod.id}: ${rows.length} signals resolved`);
      this._pushActivity(`${mod.name} → ${rows.length} signals on ${q}`, '#00ff88');
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
  onCmdKey(e) {
    if (e.key !== 'Enter') return;
    const c = (this.state.cmd || '').trim();
    this.setState({ cmd: '' });
    if (!c) return;
    this._pushTerm('> ' + c);
    const parts = c.split(/\s+/);
    if (c === 'clear') {
      this.setState({ terminal: [] });
      return;
    }
    if (c === 'help') {
      this._pushTerm(['available: help, whoami, tools, scan <ip>, clear', 'pipe anything else to the ai core with `ai <prompt>`']);
      return;
    }
    if (c === 'whoami') {
      this._pushTerm('sebbeboia — uid=0(root) godmode');
      return;
    }
    if (c === 'tools') {
      this._pushTerm('[+] 12 kali · 8 osint · 5 ai modules online');
      return;
    }
    if (parts[0] === 'scan') {
      const t = parts[1] || TARGET;
      this.launchTool({ name: 'nmap', cat: 'KALI', color: '#00d4ff', cmd: 'nmap -sV -sC -p- {t}', target: t });
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
          borderRight: '1px solid #12202e',
          background: 'linear-gradient(180deg, #070d16, #050a12)',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        <div style={{ padding: '20px 18px', borderBottom: '1px solid #12202e', display: 'flex', alignItems: 'center', gap: 12 }}>
          <ArcReactor size={34} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 2, color: '#00d4ff' }}>PWNBOARD</div>
            <div style={{ fontSize: 9.5, letterSpacing: 2.5, color: '#4a6a8a', marginTop: 2 }}>v4.4.4 · GODMODE</div>
          </div>
        </div>
        <nav style={{ padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
          {NAV_DEF.map(([id, label, glyph]) => {
            const active = s.screen === id;
            const badge = id === 'monitor' ? running : 0;
            return (
              <div
                key={id}
                onClick={() => this.setScreen(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  cursor: 'pointer',
                  fontSize: 12.5,
                  letterSpacing: 0.5,
                  transition: 'all .15s',
                  borderLeft: `2px solid ${active ? '#00d4ff' : 'transparent'}`,
                  background: active ? 'rgba(0,212,255,.09)' : 'transparent',
                  color: active ? '#00d4ff' : '#8aa0b8',
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
                      background: '#00d4ff',
                      color: '#04080e',
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
              </div>
            );
          })}
        </nav>
        <div
          style={{
            padding: '14px 18px',
            borderTop: '1px solid #12202e',
            fontSize: 10,
            letterSpacing: 0.5,
            color: '#4a6a8a',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88' }}></span>
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
          borderBottom: '1px solid #12202e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          background: 'rgba(7,13,22,.55)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 13, letterSpacing: 2, color: '#c8d6e4' }}>{title}</span>
          <span style={{ fontSize: 10, letterSpacing: 1, color: '#4a6a8a', marginTop: 2 }}>{sub}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <Waveform bars={14} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 13, color: '#00d4ff', letterSpacing: 1 }}>{s.clock}</span>
            <span style={{ fontSize: 9.5, letterSpacing: 1, color: '#4a6a8a' }}>UTC · TOR ACTIVE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 11px', border: '1px solid #3a1520', background: 'rgba(255,0,64,.06)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff0040', boxShadow: '0 0 8px #ff0040' }}></span>
            <span style={{ fontSize: 10, letterSpacing: 1.5, color: '#ff5a7a' }}>THREAT: {threat}</span>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#8aa0b8', marginBottom: 5 }}>
          <span>{label}</span>
          <span style={{ color: '#00d4ff' }}>{val}%</span>
        </div>
        <ProgressBar value={val} />
      </div>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 }}>
          <StatCard label="Active operations" value={running} color="#00d4ff" />
          <StatCard label="Findings" value={s.findings} color="#ffd700" />
          <StatCard label="Tools online" value={25} color="#00ff88" />
          <StatCard label="Assets mapped" value={47} color="#ff6b35" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)', gap: 20 }}>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <span style={{ ...SECTION_LABEL, alignSelf: 'flex-start' }}>Core status</span>
              <div style={{ margin: '14px 0 6px' }}>
                <ArcReactor size={140} />
              </div>
              <div style={{ fontSize: 20, letterSpacing: 3, color: '#00ff88', textShadow: '0 0 12px rgba(0,255,136,.5)' }}>ALL SYSTEMS GO</div>
              <div style={{ fontSize: 11, color: '#4a6a8a', letterSpacing: 1, marginTop: 4 }}>quantized ollama · llama3-pentest-q4 · loaded</div>
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
              <span style={{ fontSize: 10, color: '#4a6a8a', letterSpacing: 1 }}>live</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, maxHeight: 290, overflow: 'auto' }}>
              {s.activity.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, fontSize: 12, lineHeight: 1.5 }}>
                  <span style={{ color: '#4a6a8a', flex: '0 0 62px' }}>{a.t}</span>
                  <span style={dotStyle(a.color)}></span>
                  <span style={{ color: '#a9bccb', flex: 1 }}>{a.msg}</span>
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
              <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #16283a, transparent)' }}></span>
              <span style={{ fontSize: 10, color: '#4a6a8a', letterSpacing: 1 }}>{sec.count} modules</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
              {sec.tools.map((tool) => (
                <div
                  key={tool.id}
                  className="pwn-tool"
                  onClick={() => this.launchTool(tool)}
                  style={{
                    position: 'relative',
                    border: '1px solid #16283a',
                    background: 'linear-gradient(160deg, #0a121d, #070d16)',
                    padding: '15px 15px 17px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    transition: 'border-color .2s, transform .2s, background .2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
                    <span style={tagStyle(tool.color)}>{tool.cat}</span>
                    <span style={{ fontSize: 13, color: '#4a6a8a' }}>▸</span>
                  </div>
                  <div style={{ fontSize: 14.5, color: '#dbe6f0', letterSpacing: 0.5, marginBottom: 5 }}>{tool.name}</div>
                  <div style={{ fontSize: 11, color: '#7f95a8', lineHeight: 1.5, minHeight: 32 }}>{tool.desc}</div>
                  <div style={accentStyle(tool.color)}></div>
                </div>
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
      { header: 'Signal', cell: (r) => React.createElement('span', { style: { color: '#00d4ff', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 } }, r.k) },
      { header: 'Detail', cell: (r) => React.createElement('span', { style: { color: '#8aa0b8', fontSize: 12 } }, r.v) },
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
                <div
                  key={o.id}
                  onClick={() => this.setState({ osintTool: o.id, osintResults: null, osintRunning: false })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 11px',
                    cursor: 'pointer',
                    fontSize: 12,
                    letterSpacing: 0.5,
                    transition: 'all .15s',
                    border: `1px solid ${active ? '#00ff8855' : 'transparent'}`,
                    background: active ? 'rgba(0,255,136,.08)' : 'transparent',
                    color: active ? '#00ff88' : '#8aa0b8',
                  }}
                >
                  <span style={{ width: 16 }}>›</span>
                  <span style={{ flex: 1 }}>{o.name}</span>
                </div>
              );
            })}
          </div>
        </Card>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 15, color: '#dbe6f0', letterSpacing: 1 }}>{activeMod.name}</span>
            <span style={{ fontSize: 10, letterSpacing: 2, color: '#4a6a8a', textTransform: 'uppercase' }}>OSINT · passive</span>
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            <div style={{ flex: 1 }}>
              <Input
                value={s.osintQuery}
                onChange={(e) => this.onOsintQuery(e)}
                placeholder="target@domain.com  ·  8.8.8.8  ·  @handle"
                style={{ width: '100%' }}
              />
            </div>
            <div onClick={() => this.runOsint()} style={{ display: 'inline-block', cursor: 'pointer' }}>
              <Button>Run trace</Button>
            </div>
          </div>
          {s.osintRunning && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '46px 0' }}>
              <Spinner size={38} />
              <span style={{ fontSize: 12, color: '#00d4ff', letterSpacing: 1.5 }}>QUERYING SOURCES…</span>
            </div>
          )}
          {showResults && (
            <DataTable columns={columns} rows={s.osintResults || []} rowKey={(r) => r.id} emptyMessage="NO SIGNALS" />
          )}
          {idle && (
            <div style={{ padding: '46px 0', textAlign: 'center', color: '#3f5a72', fontSize: 12, letterSpacing: 1 }}>— enter a target and run a trace —</div>
          )}
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
          <div onClick={() => this.clearDone()} style={{ display: 'inline-block', cursor: 'pointer' }}>
            <Button>Clear completed</Button>
          </div>
        </div>
        {s.jobs.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {jobsView.map((j) => (
              <Card key={j.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 14, color: '#dbe6f0', letterSpacing: 0.5 }}>{j.tool}</span>
                    <span style={tagStyle(j.color)}>{j.cat}</span>
                  </div>
                  <StatusBadge status={j.status} />
                </div>
                <div style={{ fontSize: 11.5, color: '#7f95a8', marginBottom: 11, letterSpacing: 0.5 }}>
                  target {j.target}  ·  {j.cmd}
                </div>
                <ProgressBar value={j.progress} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 11 }}>
                  <span style={{ fontSize: 11, color: '#8aa0b8' }}>{j.progressLabel}</span>
                  {j.abortable && (
                    <div onClick={() => this.abort(j.id)} style={{ display: 'inline-block', cursor: 'pointer' }}>
                      <Button variant="danger">Abort</Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
        {s.jobs.length === 0 && (
          <Card>
            <div style={{ padding: '34px 0', textAlign: 'center', color: '#3f5a72', fontSize: 12, letterSpacing: 1 }}>
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
                <div key={key} onClick={() => this.toggle(key)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 13, color: '#c8d6e4' }}>{name}</span>
                    <span style={{ fontSize: 10.5, color: '#5a7286' }}>{desc}</span>
                  </div>
                  <div style={swTrack(on, c)}>
                    <div style={swKnob(on)}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        <Card>
          <div style={{ ...SECTION_LABEL, marginBottom: 16 }}>AI core</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span style={{ fontSize: 11, letterSpacing: 1, color: '#7f95a8' }}>Local model</span>
              <select className="pwn-native" value={s.model} onChange={(e) => this.onModel(e)}>
                {MODELS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span style={{ fontSize: 11, letterSpacing: 1, color: '#7f95a8' }}>SOCKS proxy</span>
              <input className="pwn-native" style={{ padding: '9px 11px', fontSize: 12 }} value={s.proxy} onChange={(e) => this.onProxy(e)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span style={{ fontSize: 11, letterSpacing: 1, color: '#7f95a8' }}>Engagement scope (CIDR)</span>
              <input className="pwn-native" style={{ padding: '9px 11px', fontSize: 12 }} value={s.scope} onChange={(e) => this.onScope(e)} />
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
        <div style={{ background: '#04080e', padding: '8px 14px', borderBottom: '1px solid #12202e', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff0040' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffd700' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#00ff88' }}></span>
          <span style={{ marginLeft: 8, fontSize: 11, color: '#4a6a8a', letterSpacing: 1 }}>root@pwnboard — /opt/pwnboard</span>
        </div>
        <div ref={this.termRef} style={{ background: '#04080e', height: 452, overflow: 'auto', padding: '14px 16px', fontSize: 12.5, lineHeight: 1.65 }}>
          {s.terminal.map((line, i) => (
            <div key={i} style={lineStyle(line.text)}>
              {line.text}
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span style={{ color: '#00ff88' }}>root@pwnboard</span>
            <span style={{ color: '#4a6a8a' }}>:</span>
            <span style={{ color: '#00d4ff' }}>~#</span>
            <input
              className="pwn-native"
              style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 12.5, padding: '2px 0' }}
              value={s.cmd}
              onChange={(e) => this.onCmd(e)}
              onKeyDown={(e) => this.onCmdKey(e)}
              placeholder="type a command — try: help, scan 10.10.14.7, clear"
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
          background: 'radial-gradient(1200px 600px at 80% -10%, rgba(0,212,255,.06), transparent 60%), #050a12',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          color: '#c0d0e0',
        }}
      >
        {this.renderSidebar(running)}
        <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {this.renderHeader(threat)}
          <main style={{ flex: 1, overflow: 'auto', padding: '26px 28px' }}>
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
