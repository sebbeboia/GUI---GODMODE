/* @ds-bundle: {"format":4,"namespace":"YEETUZXDesignSystem_4e7424","components":[{"name":"AmbientBackground","sourcePath":"components/brand/AmbientBackground.jsx"},{"name":"Brand","sourcePath":"components/brand/Brand.jsx"},{"name":"Grain","sourcePath":"components/brand/Grain.jsx"},{"name":"Orb","sourcePath":"components/brand/Orb.jsx"},{"name":"CapabilityCard","sourcePath":"components/content/CapabilityCard.jsx"},{"name":"Stat","sourcePath":"components/content/Stat.jsx"},{"name":"WorkRow","sourcePath":"components/content/WorkRow.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"MailLink","sourcePath":"components/core/MailLink.jsx"},{"name":"SectionHead","sourcePath":"components/core/SectionHead.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"CustomCursor","sourcePath":"components/navigation/CustomCursor.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Reveal","sourcePath":"components/navigation/Reveal.jsx"},{"name":"ScrollCue","sourcePath":"components/navigation/ScrollCue.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"}],"sourceHashes":{"components/brand/AmbientBackground.jsx":"c9ea865c0274","components/brand/Brand.jsx":"7c4241c361e1","components/brand/Grain.jsx":"7ed057e9782c","components/brand/Orb.jsx":"0484e90ee28f","components/content/CapabilityCard.jsx":"77092220cac3","components/content/Stat.jsx":"82048932f1eb","components/content/WorkRow.jsx":"d529038d6935","components/core/Button.jsx":"db551d2b7642","components/core/Eyebrow.jsx":"d48068f6d40f","components/core/MailLink.jsx":"fa118401a359","components/core/SectionHead.jsx":"089a3f5d7da8","components/core/Tag.jsx":"dd61cf8f78ab","components/navigation/CustomCursor.jsx":"4d5d3623e31d","components/navigation/NavBar.jsx":"9b6553ebb987","components/navigation/Reveal.jsx":"5a60e4d8f1ae","components/navigation/ScrollCue.jsx":"608bbb96d593","components/navigation/SiteFooter.jsx":"9f13736205af","ui_kits/website/hero.screen.jsx":"fc6d46bb406c","ui_kits/website/sections.screen.jsx":"6fd4ebc11701"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.YEETUZXDesignSystem_4e7424 = window.YEETUZXDesignSystem_4e7424 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/AmbientBackground.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Fixed page ground: cool base gradient + warm brass bloom top-right + cool bloom bottom-left. */
function AmbientBackground({
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      background: "var(--bloom), var(--bloom-cool), var(--ground-fade)",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { AmbientBackground });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/AmbientBackground.jsx", error: String((e && e.message) || e) }); }

// components/brand/Brand.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Wordmark: pulsing brass dot + non-breaking "YEETUZ-X" in mono. */
function Brand({
  href = "#top",
  label = "YEETUZ\u2011X",
  dot = true,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: {
      fontFamily: "var(--f-mono)",
      fontWeight: 500,
      letterSpacing: "var(--ls-brand)",
      fontSize: "var(--step--1)",
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      color: "var(--text)",
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 8,
      height: 8,
      borderRadius: "var(--radius-circle)",
      background: "var(--accent)",
      boxShadow: "0 0 0 0 var(--accent)",
      animation: "yx-pulse var(--dur-pulse) var(--ease) infinite"
    }
  }), label);
}
Object.assign(__ds_scope, { Brand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Brand.jsx", error: String((e && e.message) || e) }); }

// components/brand/Grain.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Fixed full-viewport film grain — fractal-noise tile, overlay blend, 6-step jitter. */
function Grain({
  opacity = 0.5,
  asset = "assets/grain.svg",
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      position: "fixed",
      inset: "-50%",
      zIndex: 1,
      pointerEvents: "none",
      opacity,
      mixBlendMode: "overlay",
      backgroundImage: `url(${asset})`,
      animation: "yx-grain 6s steps(6) infinite",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Grain });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Grain.jsx", error: String((e && e.message) || e) }); }

// components/brand/Orb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Wireframe geodesic sphere — the YEETUZ-X hero orb.
   Ported verbatim from the site's inline WebGL: subdivided icosahedron,
   unique edges drawn as GL_LINES + vertex glow points, additive blending,
   brass-near / slate-far depth ramp, pointer parallax, slow auto-spin. */

function buildIco(subdiv) {
  const t = (1 + Math.sqrt(5)) / 2;
  let verts = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
  let faces = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];
  verts = verts.map(v => {
    const l = Math.hypot(v[0], v[1], v[2]);
    return [v[0] / l, v[1] / l, v[2] / l];
  });
  const cache = {};
  const mid = (a, b) => {
    const key = a < b ? a + "_" + b : b + "_" + a;
    if (cache[key] !== undefined) return cache[key];
    const va = verts[a],
      vb = verts[b];
    let m = [(va[0] + vb[0]) / 2, (va[1] + vb[1]) / 2, (va[2] + vb[2]) / 2];
    const l = Math.hypot(m[0], m[1], m[2]);
    m = [m[0] / l, m[1] / l, m[2] / l];
    verts.push(m);
    cache[key] = verts.length - 1;
    return cache[key];
  };
  for (let s = 0; s < subdiv; s++) {
    const nf = [];
    for (const f of faces) {
      const a = mid(f[0], f[1]),
        b = mid(f[1], f[2]),
        c = mid(f[2], f[0]);
      nf.push([f[0], a, c], [f[1], b, a], [f[2], c, b], [a, b, c]);
    }
    faces = nf;
  }
  const eset = {},
    edges = [];
  for (const fc of faces) {
    const pairs = [[fc[0], fc[1]], [fc[1], fc[2]], [fc[2], fc[0]]];
    for (const [x, y] of pairs) {
      const k = x < y ? x + "_" + y : y + "_" + x;
      if (!eset[k]) {
        eset[k] = 1;
        edges.push(x, y);
      }
    }
  }
  return {
    verts,
    edges
  };
}
const VS = "attribute vec3 p;uniform mat4 u_mv;uniform mat4 u_proj;uniform float u_time;uniform float u_size;varying float v_depth;" + "void main(){vec3 pos=p;float n=sin(pos.x*3.0+u_time)*0.5+cos(pos.y*3.0-u_time*0.8)*0.5+sin(pos.z*3.0+u_time*0.6)*0.5;" + "pos*=1.0+n*0.028;vec4 mv=u_mv*vec4(pos,1.0);v_depth=-mv.z;gl_Position=u_proj*mv;gl_PointSize=u_size*(2.6/v_depth);}";
const FS = "precision mediump float;varying float v_depth;uniform vec3 u_near;uniform vec3 u_far;uniform float u_alpha;" + "void main(){float d=clamp((v_depth-2.0)/3.2,0.0,1.0);vec3 col=mix(u_near,u_far,d);float a=mix(0.95,0.12,d)*u_alpha;gl_FragColor=vec4(col*a,a);}";
const perspective = (fov, aspect, near, far) => {
  const f = 1 / Math.tan(fov / 2),
    nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
};
const mul = (a, b) => {
  const o = new Float32Array(16);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) o[r * 4 + c] = a[c] * b[r * 4] + a[4 + c] * b[r * 4 + 1] + a[8 + c] * b[r * 4 + 2] + a[12 + c] * b[r * 4 + 3];
  return o;
};
const rotY = a => {
  const s = Math.sin(a),
    c = Math.cos(a);
  return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
};
const rotX = a => {
  const s = Math.sin(a),
    c = Math.cos(a);
  return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
};
const trans = (x, y, z) => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
const hexToRgb = hex => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return new Float32Array([(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]);
};
const PRESETS = {
  hero: {
    subdiv: 3,
    distance: 3.7,
    tiltX: -0.15,
    parallax: true,
    lineAlpha: 0.62,
    pointAlpha: 0.9,
    pointSize: 3.2
  },
  contained: {
    subdiv: 3,
    distance: 3.2,
    tiltX: -0.1,
    parallax: false,
    lineAlpha: 0.7,
    pointAlpha: 0.95,
    pointSize: 3.0
  },
  indicator: {
    subdiv: 2,
    distance: 3.0,
    tiltX: 0,
    parallax: false,
    lineAlpha: 0.75,
    pointAlpha: 1.0,
    pointSize: 2.6
  },
  mark: {
    subdiv: 1,
    distance: 2.9,
    tiltX: 0,
    parallax: false,
    lineAlpha: 0.9,
    pointAlpha: 1.0,
    pointSize: 2.2
  }
};
function Orb({
  variant = "hero",
  size,
  spin = 0.12,
  pulse = false,
  pulseAmount = 0.06,
  pulseSpeed = 2.6,
  nearColor = "#f5c76b",
  farColor = "#8c99b8",
  subdiv,
  parallax,
  className = "",
  style = {},
  ...rest
}) {
  const canvasRef = React.useRef(null);
  const cfg = PRESETS[variant] || PRESETS.hero;
  const useParallax = parallax === undefined ? cfg.parallax : parallax;
  const detail = subdiv === undefined ? cfg.subdiv : subdiv;
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gl = null;
    try {
      gl = canvas.getContext("webgl", {
        antialias: true,
        alpha: true,
        premultipliedAlpha: false
      });
    } catch (e) {
      gl = null;
    }
    if (!gl) {
      canvas.style.display = "none";
      return;
    }
    const geo = buildIco(detail);
    const lineArr = [];
    for (const i of geo.edges) {
      const v = geo.verts[i];
      lineArr.push(v[0], v[1], v[2]);
    }
    const pointArr = [];
    for (const v of geo.verts) pointArr.push(v[0], v[1], v[2]);
    const lineData = new Float32Array(lineArr),
      pointData = new Float32Array(pointArr);
    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const aP = gl.getAttribLocation(prog, "p");
    const u = n => gl.getUniformLocation(prog, n);
    const uMV = u("u_mv"),
      uProj = u("u_proj"),
      uTime = u("u_time"),
      uSize = u("u_size"),
      uNear = u("u_near"),
      uFar = u("u_far"),
      uAlpha = u("u_alpha");
    const lineBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, lineBuf);
    gl.bufferData(gl.ARRAY_BUFFER, lineData, gl.STATIC_DRAW);
    const pointBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointBuf);
    gl.bufferData(gl.ARRAY_BUFFER, pointData, gl.STATIC_DRAW);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.disable(gl.DEPTH_TEST);
    const nearCol = hexToRgb(nearColor),
      farCol = hexToRgb(farColor);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let proj = null;
    const resize = () => {
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      proj = perspective(0.72, w / h, 0.1, 100);
    };
    window.addEventListener("resize", resize);
    resize();
    let tgx = 0,
      tgy = 0,
      cgx = 0,
      cgy = 0;
    const onMove = e => {
      tgx = (e.clientX / window.innerWidth - 0.5) * 0.9;
      tgy = (e.clientY / window.innerHeight - 0.5) * 0.7;
    };
    if (useParallax) window.addEventListener("mousemove", onMove);
    let raf = 0,
      running = true;
    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);
    const t0 = performance.now();
    function frame(now) {
      if (!running || !proj) {
        if (running) raf = requestAnimationFrame(frame);
        return;
      }
      const t = (now - t0) / 1000;
      cgx += (tgx - cgx) * 0.05;
      cgy += (tgy - cgy) * 0.05;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const breathe = pulse && !reduced ? 1 + Math.sin(t / pulseSpeed * Math.PI * 2) * pulseAmount : 1;
      const autospin = reduced ? 0 : t * spin;
      const mv = mul(trans(0, 0, -cfg.distance / breathe), mul(rotX(cgy * 0.9 + cfg.tiltX), rotY(autospin + cgx * 1.2)));
      gl.useProgram(prog);
      gl.uniformMatrix4fv(uProj, false, proj);
      gl.uniformMatrix4fv(uMV, false, mv);
      gl.uniform1f(uTime, reduced ? 0 : t);
      gl.uniform3fv(uNear, nearCol);
      gl.uniform3fv(uFar, farCol);
      gl.bindBuffer(gl.ARRAY_BUFFER, lineBuf);
      gl.enableVertexAttribArray(aP);
      gl.vertexAttribPointer(aP, 3, gl.FLOAT, false, 0, 0);
      gl.uniform1f(uAlpha, cfg.lineAlpha * (pulse ? 0.85 + 0.15 * breathe : 1));
      gl.uniform1f(uSize, 0);
      gl.drawArrays(gl.LINES, 0, lineData.length / 3);
      gl.bindBuffer(gl.ARRAY_BUFFER, pointBuf);
      gl.vertexAttribPointer(aP, 3, gl.FLOAT, false, 0, 0);
      gl.uniform1f(uAlpha, cfg.pointAlpha);
      gl.uniform1f(uSize, cfg.pointSize * dpr);
      gl.drawArrays(gl.POINTS, 0, pointData.length / 3);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [detail, spin, pulse, pulseAmount, pulseSpeed, nearColor, farColor, useParallax, cfg.distance, cfg.tiltX, cfg.lineAlpha, cfg.pointAlpha, cfg.pointSize]);
  const box = variant === "hero" ? {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%"
  } : {
    width: size || (variant === "mark" ? 32 : variant === "indicator" ? 48 : 420),
    height: size || (variant === "mark" ? 32 : variant === "indicator" ? 48 : 420)
  };
  return /*#__PURE__*/React.createElement("canvas", _extends({
    ref: canvasRef,
    "aria-hidden": "true",
    className: className,
    style: {
      display: "block",
      ...box,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Orb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Orb.jsx", error: String((e && e.message) || e) }); }

// components/content/CapabilityCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Grid cell listing a capability area: brass mono caps heading, em-dash bulleted list. */
function CapabilityCard({
  title,
  items = [],
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: hover ? "var(--surface)" : "var(--ground)",
      padding: "30px 26px 34px",
      transition: "background var(--dur-slow) var(--ease)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: "var(--step--1)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase",
      color: "var(--accent)",
      fontWeight: 500,
      marginBottom: 18
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "grid",
      gap: 9
    }
  }, items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it,
    style: {
      color: "var(--muted)",
      fontSize: "var(--step-0)",
      display: "flex",
      alignItems: "baseline",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--faint)",
      fontFamily: "var(--f-mono)"
    }
  }, "\u2014"), it))));
}
Object.assign(__ds_scope, { CapabilityCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CapabilityCard.jsx", error: String((e && e.message) || e) }); }

// components/content/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Brass display numeral over a mono label, with a rule above. */
function Stat({
  value,
  label,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderTop: "1px solid var(--line)",
      paddingTop: 14,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-display)",
      fontSize: "var(--step-2)",
      fontWeight: 500,
      color: "var(--accent)",
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: "var(--step--1)",
      color: "var(--muted)",
      letterSpacing: "var(--ls-mono)",
      marginTop: 8
    }
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Stat.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BASE = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  fontFamily: "var(--f-mono)",
  fontSize: "var(--step--1)",
  letterSpacing: "0.05em",
  padding: "14px 22px",
  borderRadius: "var(--radius-pill)",
  border: "1px solid var(--line)",
  color: "var(--text)",
  background: "transparent",
  cursor: "pointer",
  transition: "transform var(--dur-fast) var(--ease),border-color 0.3s var(--ease),background 0.3s var(--ease),color 0.3s var(--ease)",
  willChange: "transform",
  textDecoration: "none"
};

/** Pill button, mono label. Two variants: solid brass and hairline ghost. */
function Button({
  variant = "ghost",
  href,
  arrow,
  magnetic = false,
  children,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [offset, setOffset] = React.useState(null);
  const primary = variant === "primary";
  const s = {
    ...BASE,
    ...(primary ? {
      background: hover ? "var(--accent-bright)" : "var(--accent)",
      color: "var(--on-accent)",
      borderColor: hover ? "var(--accent-bright)" : "var(--accent)",
      fontWeight: 500
    } : {
      borderColor: hover ? "var(--accent)" : "var(--line)",
      color: hover ? "var(--accent-bright)" : "var(--text)"
    }),
    ...(offset ? {
      transform: `translate(${offset[0]}px,${offset[1]}px)`
    } : null),
    ...style
  };
  const onMove = magnetic ? e => {
    const r = e.currentTarget.getBoundingClientRect();
    setOffset([(e.clientX - (r.left + r.width / 2)) * 0.3, (e.clientY - (r.top + r.height / 2)) * 0.3]);
  } : undefined;
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, children, arrow && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      transition: "transform 0.3s var(--ease)",
      transform: hover ? "translateX(4px)" : "none"
    }
  }, arrow === "up" ? "\u2197" : "\u2192"));
  const props = {
    style: s,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setOffset(null);
    },
    onMouseMove: onMove,
    ...rest
  };
  return href ? /*#__PURE__*/React.createElement("a", _extends({
    href: href
  }, props), inner) : /*#__PURE__*/React.createElement("button", _extends({
    type: "button"
  }, props), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Uppercase mono kicker with a 26px brass rule before it — every section opens with one. */
function Eyebrow({
  children,
  rule = true,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: "var(--step--1)",
      letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase",
      color: "var(--accent)",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.7em",
      margin: 0,
      ...style
    }
  }, rest), rule && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 26,
      height: 1,
      background: "var(--accent)",
      opacity: 0.7
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/MailLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Display-face email link with a hairline underline that warms on hover. */
function MailLink({
  email,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: `mailto:${email}`,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: "var(--f-display)",
      fontSize: "var(--step-1)",
      color: hover ? "var(--accent-bright)" : "var(--text)",
      borderBottom: `1px solid ${hover ? "var(--accent)" : "var(--line)"}`,
      paddingBottom: 3,
      transition: "color 0.3s var(--ease),border-color 0.3s var(--ease)",
      ...style
    }
  }, rest), email);
}
Object.assign(__ds_scope, { MailLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MailLink.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHead.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Section header: eyebrow on the left, "01 / 04" counter on the right, baseline-aligned. */
function SectionHead({
  label,
  index,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 24,
      flexWrap: "wrap",
      marginBottom: "var(--sec-head-gap)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, label), index && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: "var(--step--1)",
      color: "var(--faint)",
      letterSpacing: "0.1em"
    }
  }, index));
}
Object.assign(__ds_scope, { SectionHead });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHead.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hairline pill for a technology or category label. */
function Tag({
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: "var(--size-tag)",
      letterSpacing: "0.06em",
      color: "var(--muted)",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius-pill)",
      padding: "5px 12px",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/content/WorkRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** One row of the work index: number, name + description + tags, meta column with a rotating go-circle. */
function WorkRow({
  num,
  name,
  desc,
  tags = [],
  meta,
  href = "#",
  external = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: external ? "_blank" : undefined,
    rel: external ? "noopener" : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "grid",
      gridTemplateColumns: "44px 1fr auto",
      alignItems: "center",
      gap: "var(--grid-gap)",
      padding: "var(--work-y) 0",
      borderTop: "1px solid var(--line)",
      position: "relative",
      transition: "color 0.3s var(--ease)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--row-wash)",
      opacity: hover ? 1 : 0,
      transition: "opacity var(--dur-slow) var(--ease)",
      zIndex: -1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-mono)",
      fontSize: "var(--step--1)",
      color: "var(--faint)"
    }
  }, num), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--f-display)",
      fontSize: "var(--step-2)",
      fontWeight: 500,
      letterSpacing: "var(--ls-display)",
      lineHeight: "var(--lh-tight)",
      display: "inline-flex",
      alignItems: "center",
      gap: 14,
      transition: "transform var(--dur-slow) var(--ease),color 0.3s var(--ease)",
      color: hover ? "var(--accent-bright)" : "var(--text)",
      transform: hover ? "translateX(6px)" : "none"
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--muted)",
      margin: "10px 0 0",
      maxWidth: "var(--measure-desc)",
      fontSize: "var(--step-0)"
    }
  }, desc), tags.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 16
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t
  }, t)))), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right",
      fontFamily: "var(--f-mono)",
      fontSize: "var(--step--1)",
      color: "var(--faint)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "inline-flex",
      width: "var(--hit)",
      height: "var(--hit)",
      alignItems: "center",
      justifyContent: "center",
      border: `1px solid ${hover ? "var(--accent)" : "var(--line)"}`,
      borderRadius: "var(--radius-circle)",
      color: hover ? "var(--on-accent)" : "var(--muted)",
      background: hover ? "var(--accent)" : "transparent",
      transform: hover ? "rotate(-45deg)" : "none",
      transition: "transform var(--dur-slow) var(--ease),border-color 0.3s var(--ease),color 0.3s var(--ease),background 0.3s var(--ease)"
    }
  }, "\u2192"), /*#__PURE__*/React.createElement("span", null, meta)));
}
Object.assign(__ds_scope, { WorkRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/WorkRow.jsx", error: String((e && e.message) || e) }); }

// components/navigation/CustomCursor.jsx
try { (() => {
/** Difference-blend cursor: 6px dot tracking exactly, 34px ring lagging at 0.18 easing. */
function CustomCursor({
  enabled = true
}) {
  const dot = React.useRef(null),
    ring = React.useRef(null);
  const [active, setActive] = React.useState(false);
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    if (!enabled) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setOn(true);
    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2,
      rx = mx,
      ry = my,
      raf = 0;
    const move = e => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      const t = e.target;
      setActive(!!(t && t.closest && t.closest("a,button,[data-magnetic]")));
    };
    window.addEventListener("mousemove", move);
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);
  const base = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 300,
    borderRadius: "var(--radius-circle)",
    mixBlendMode: "difference",
    opacity: on ? 1 : 0,
    transition: "opacity 0.3s ease"
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: dot,
    "aria-hidden": "true",
    style: {
      ...base,
      width: 6,
      height: 6,
      background: "#fff"
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: ring,
    "aria-hidden": "true",
    style: {
      ...base,
      width: active ? 54 : 34,
      height: active ? 54 : 34,
      border: "1px solid #fff",
      background: active ? "rgba(255,255,255,0.08)" : "transparent",
      transition: "width 0.3s var(--ease),height 0.3s var(--ease),opacity 0.3s ease,background 0.3s var(--ease)"
    }
  }));
}
Object.assign(__ds_scope, { CustomCursor });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/CustomCursor.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Fixed top nav — transparent at rest, blurred scrim once scrolled past 24px. */
function NavBar({
  links = [],
  cta,
  forceScrolled = false,
  style = {},
  ...rest
}) {
  const [scrolled, setScrolled] = React.useState(forceScrolled);
  React.useEffect(() => {
    if (forceScrolled) return;
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, {
      passive: true
    });
    return () => window.removeEventListener("scroll", on);
  }, [forceScrolled]);
  const pad = scrolled ? "var(--nav-y-scrolled)" : "var(--nav-y)";
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      position: "fixed",
      inset: "0 0 auto 0",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `${pad} var(--gut)`,
      transition: "background var(--dur-slow) var(--ease),border-color var(--dur-slow) var(--ease),padding var(--dur-slow) var(--ease)",
      borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
      background: scrolled ? "var(--scrim-nav)" : "transparent",
      backdropFilter: scrolled ? "var(--blur-nav)" : "none",
      WebkitBackdropFilter: scrolled ? "var(--blur-nav)" : "none",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Brand, null), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Primary",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(14px,3vw,34px)",
      fontFamily: "var(--f-mono)",
      fontSize: "var(--step--1)",
      letterSpacing: "var(--ls-mono)"
    }
  }, links.map(l => /*#__PURE__*/React.createElement(NavLink, _extends({
    key: l.href
  }, l))), cta && /*#__PURE__*/React.createElement(NavCta, cta)));
}
function NavLink({
  href,
  label,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      color: hover ? "var(--text)" : "var(--muted)",
      transition: "color var(--dur-fast) var(--ease)",
      position: "relative"
    }
  }, label, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: 0,
      bottom: -5,
      width: "100%",
      height: 1,
      background: "var(--accent)",
      transform: hover ? "scaleX(1)" : "scaleX(0)",
      transformOrigin: "left",
      transition: "transform var(--dur-mid) var(--ease)"
    }
  }));
}
function NavCta({
  href,
  label,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      color: hover ? "var(--accent-bright)" : "var(--text)",
      border: `1px solid ${hover ? "var(--accent)" : "var(--line)"}`,
      padding: "8px 16px",
      borderRadius: "var(--radius-pill)",
      transition: "border-color 0.3s var(--ease),color 0.3s var(--ease),background 0.3s var(--ease)"
    }
  }, label);
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Reveal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Scroll-in wrapper: 26px rise + fade, once, with an optional stagger delay. */
function Reveal({
  delay = 0,
  as = "div",
  children,
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    /* already on screen at mount (or inside a clipped preview frame where the
       observer never fires) — resolve immediately rather than stay invisible */
    const r = el.getBoundingClientRect();
    if (r.bottom > 0 && r.top < (window.innerHeight || 0)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setInView(true);
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    });
    io.observe(el);
    /* embedded/clipped frames (card thumbnails, capture) never fire the observer */
    const embedded = window.self !== window.top;
    const safety = embedded ? setTimeout(() => setInView(true), 800) : 0;
    return () => {
      io.disconnect();
      if (safety) clearTimeout(safety);
    };
  }, []);
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(26px)",
      transition: `opacity var(--dur-reveal) var(--ease-out) ${delay}ms,transform var(--dur-reveal) var(--ease-out) ${delay}ms`,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Reveal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Reveal.jsx", error: String((e && e.message) || e) }); }

// components/navigation/ScrollCue.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Bottom-left scroll hint: a 1px brass track with a travelling highlight. */
function ScrollCue({
  label = "Scroll",
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "var(--gut)",
      bottom: 26,
      zIndex: 3,
      fontFamily: "var(--f-mono)",
      fontSize: "var(--size-cue)",
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: "var(--faint)",
      display: "flex",
      alignItems: "center",
      gap: 12,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 42,
      background: "linear-gradient(var(--accent),transparent)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "40%",
      background: "var(--accent-bright)",
      animation: "yx-cue 2.2s var(--ease) infinite"
    }
  })), label);
}
Object.assign(__ds_scope, { ScrollCue });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/ScrollCue.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Footer: copyright, social row, sign-off — all mono, faint, one hairline above. */
function SiteFooter({
  copyright,
  links = [],
  signoff,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      borderTop: "1px solid var(--line)",
      paddingBlock: 40,
      position: "relative",
      zIndex: 2,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: "var(--maxw)",
      marginInline: "auto",
      paddingInline: "var(--gut)",
      display: "flex",
      flexWrap: "wrap",
      gap: 18,
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: "var(--f-mono)",
      fontSize: "var(--step--1)",
      color: "var(--faint)",
      letterSpacing: "var(--ls-mono)"
    }
  }, /*#__PURE__*/React.createElement("span", null, copyright), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 22
    }
  }, links.map(l => /*#__PURE__*/React.createElement(FootLink, _extends({
    key: l.href
  }, l)))), /*#__PURE__*/React.createElement("span", null, signoff)));
}
function FootLink({
  href,
  label
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    target: "_blank",
    rel: "noopener",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      color: hover ? "var(--accent-bright)" : "var(--muted)",
      transition: "color var(--dur-fast) var(--ease)"
    }
  }, label);
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/hero.screen.jsx
try { (() => {
const {
  Orb,
  Button,
  Eyebrow,
  ScrollCue,
  Reveal
} = window.YX;
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      minHeight: "100svh",
      display: "grid",
      alignItems: "center",
      paddingTop: 96,
      paddingBottom: 64
    },
    "aria-label": "Intro"
  }, /*#__PURE__*/React.createElement(Orb, {
    variant: "hero",
    style: {
      zIndex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "min(92vw,720px)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    as: "div"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Security engineer \xB7 Systems builder")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--step-4)",
      fontWeight: 500,
      margin: "22px 0 0",
      letterSpacing: "var(--ls-hero)"
    }
  }, "I build the systems", /*#__PURE__*/React.createElement("br", null), "that ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: "italic",
      fontWeight: 400,
      color: "var(--accent)"
    }
  }, "break"), " systems.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "26px 0 0",
      fontSize: "var(--step-1)",
      color: "var(--muted)",
      maxWidth: "var(--measure-lede)",
      lineHeight: 1.5
    }
  }, "Custom operating systems, offensive-security tooling, and autonomous automation \u2014 engineered end to end. From kernel to interface.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 320,
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 14,
      marginTop: 38
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    href: "#work",
    arrow: "right",
    magnetic: true
  }, "See the work"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    href: "#contact",
    magnetic: true
  }, "Get in touch")))), /*#__PURE__*/React.createElement(ScrollCue, null));
}
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/hero.screen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections.screen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  SectionHead,
  Stat,
  WorkRow,
  CapabilityCard,
  MailLink,
  Button,
  Reveal
} = window.YX;
const WORK = [{
  num: "001",
  name: "YEETUZ-X OS",
  desc: "A custom Kali-based operating system, tuned for offensive-security work — a live amd64 image plus a Raspberry Pi 5 build. Opinionated defaults, hardened, and mine.",
  tags: ["Linux", "Kali", "Live ISO", "Pi 5"],
  meta: "OS · 2026",
  href: "#"
}, {
  num: "002",
  name: "YEETUZ-X444 · GODMODE",
  desc: "An autonomous pentest suite with a GUI — recon, exploitation, and reporting orchestrated from one control surface. Built for authorized engagements, end to end.",
  tags: ["Python", "Offensive", "Automation", "GUI"],
  meta: "Tooling · 2026",
  href: "#"
}, {
  num: "003",
  name: "ReproForge",
  desc: "Findings-reporter infrastructure for bug-bounty and pentest work — turns raw findings into clean, reproducible reports. A product, not a side project.",
  tags: ["SaaS", "Security", "Reporting"],
  meta: "Product · live",
  href: "https://reproforge.com",
  external: true
}, {
  num: "004",
  name: "Pentest Methodology",
  desc: "A reusable engagement framework mapping PTES, OWASP, and MITRE ATT&CK into a phase-by-phase checklist — so nothing gets skipped under pressure.",
  tags: ["PTES", "OWASP", "ATT&CK"],
  meta: "Framework",
  href: "#"
}, {
  num: "005",
  name: "OSINT Toolkit",
  desc: "A curated stack of open-source-intelligence tooling — mail, dark-web, and recon workflows wired together for fast, repeatable investigation.",
  tags: ["OSINT", "Recon", "Tor"],
  meta: "Toolkit",
  href: "#"
}];
const STACK = [{
  title: "Offensive Security",
  items: ["Web & network pentest", "Exploit development", "OSINT & recon", "Bug bounty"]
}, {
  title: "Systems & OS",
  items: ["Custom Linux distros", "Kali / Debian internals", "Raspberry Pi builds", "Shell & automation"]
}, {
  title: "Automation & AI",
  items: ["Agentic tooling", "Python pipelines", "Local LLM deploys", "Workflow orchestration"]
}, {
  title: "Product & Web",
  items: ["Full-stack SaaS", "Interactive front-ends", "WebGL & motion", "Ship-it mindset"]
}];
function About() {
  return /*#__PURE__*/React.createElement("section", {
    className: "band",
    id: "about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHead, {
    label: "About",
    index: "01 / 04"
  })), /*#__PURE__*/React.createElement("div", {
    className: "intro-grid"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--f-display)",
      fontWeight: 400,
      fontSize: "var(--step-2)",
      lineHeight: "var(--lh-lead)",
      letterSpacing: "-0.015em",
      margin: 0
    }
  }, "I'm an independent security engineer who ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text)",
      fontWeight: 600
    }
  }, "ships whole systems"), " \u2014 not just scripts. I build the tools I wished existed: a hardened, custom Linux distro; an autonomous pentest platform; and reporting infrastructure for bug-bounty work. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--faint)"
    }
  }, "Low-level enough to trust, polished enough to ship."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 22,
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 60
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "5+",
    label: "Shipped products & platforms"
  })), /*#__PURE__*/React.createElement(Reveal, {
    delay: 140
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "2",
    label: "Custom OS builds (amd64 + Pi\u00a05)"
  })), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "\u221e",
    label: "Root shells, responsibly obtained"
  }))))));
}
function Work() {
  return /*#__PURE__*/React.createElement("section", {
    className: "band",
    id: "work"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHead, {
    label: "Selected work",
    index: "02 / 04"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, WORK.map((w, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: w.num,
    delay: i * 40,
    style: i === WORK.length - 1 ? {
      borderBottom: "1px solid var(--line)"
    } : undefined
  }, /*#__PURE__*/React.createElement(WorkRow, w))))));
}
function Stack() {
  return /*#__PURE__*/React.createElement("section", {
    className: "band",
    id: "stack"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHead, {
    label: "Stack & capabilities",
    index: "03 / 04"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stack-grid"
  }, STACK.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.title,
    delay: i * 70
  }, /*#__PURE__*/React.createElement(CapabilityCard, _extends({}, s, {
    style: {
      height: "100%"
    }
  })))))));
}
function Contact() {
  return /*#__PURE__*/React.createElement("section", {
    className: "band",
    id: "contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHead, {
    label: "Contact",
    index: "04 / 04"
  })), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--step-3)",
      fontWeight: 500,
      maxWidth: "16ch",
      marginBottom: 34
    }
  }, "Let's build something ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: "italic",
      fontWeight: 400,
      color: "var(--accent)"
    }
  }, "dangerous"), " \u2014 legally.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120,
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 14,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(MailLink, {
    email: "sebbeboiah@gmail.com",
    "data-magnetic": true
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    href: "https://github.com/sebbeboia",
    arrow: "up",
    magnetic: true
  }, "GitHub"))));
}
Object.assign(window, {
  About,
  Work,
  Stack,
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections.screen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AmbientBackground = __ds_scope.AmbientBackground;

__ds_ns.Brand = __ds_scope.Brand;

__ds_ns.Grain = __ds_scope.Grain;

__ds_ns.Orb = __ds_scope.Orb;

__ds_ns.CapabilityCard = __ds_scope.CapabilityCard;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.WorkRow = __ds_scope.WorkRow;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.MailLink = __ds_scope.MailLink;

__ds_ns.SectionHead = __ds_scope.SectionHead;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.CustomCursor = __ds_scope.CustomCursor;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Reveal = __ds_scope.Reveal;

__ds_ns.ScrollCue = __ds_scope.ScrollCue;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

})();
