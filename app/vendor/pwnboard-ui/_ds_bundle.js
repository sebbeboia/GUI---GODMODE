/* @ds-bundle: {"namespace":"PwnboardUI","components":[{"name":"ArcReactor","sourcePath":"components/general/ArcReactor/ArcReactor.jsx"},{"name":"Button","sourcePath":"components/general/Button/Button.jsx"},{"name":"Card","sourcePath":"components/general/Card/Card.jsx"},{"name":"DataTable","sourcePath":"components/general/DataTable/DataTable.jsx"},{"name":"GlowText","sourcePath":"components/general/GlowText/GlowText.jsx"},{"name":"HudPanel","sourcePath":"components/general/HudPanel/HudPanel.jsx"},{"name":"Input","sourcePath":"components/general/Input/Input.jsx"},{"name":"ProgressBar","sourcePath":"components/general/ProgressBar/ProgressBar.jsx"},{"name":"SeverityBadge","sourcePath":"components/general/SeverityBadge/SeverityBadge.jsx"},{"name":"Spinner","sourcePath":"components/general/Spinner/Spinner.jsx"},{"name":"StatCard","sourcePath":"components/general/StatCard/StatCard.jsx"},{"name":"StatusBadge","sourcePath":"components/general/StatusBadge/StatusBadge.jsx"},{"name":"Tabs","sourcePath":"components/general/Tabs/Tabs.jsx"},{"name":"Waveform","sourcePath":"components/general/Waveform/Waveform.jsx"}],"sourceHashes":{"components/general/ArcReactor/ArcReactor.jsx":"7d511835945d","components/general/ArcReactor/ArcReactor.d.ts":"9e458401e412","components/general/ArcReactor/ArcReactor.prompt.md":"2453a69ff609","components/general/Button/Button.jsx":"8265bea5fcc1","components/general/Button/Button.d.ts":"3b159852a423","components/general/Button/Button.prompt.md":"5161ce0b6497","components/general/Card/Card.jsx":"760e65503a1d","components/general/Card/Card.d.ts":"40e0fe1554c9","components/general/Card/Card.prompt.md":"a95262ef408c","components/general/DataTable/DataTable.jsx":"d29fd20027d8","components/general/DataTable/DataTable.d.ts":"b6b519ca8de2","components/general/DataTable/DataTable.prompt.md":"5d2bfd3f01de","components/general/GlowText/GlowText.jsx":"9cd416fdf5f1","components/general/GlowText/GlowText.d.ts":"0607d1a047a3","components/general/GlowText/GlowText.prompt.md":"5fdfff2e3ecb","components/general/HudPanel/HudPanel.jsx":"77b36a8b83e4","components/general/HudPanel/HudPanel.d.ts":"6915542650e9","components/general/HudPanel/HudPanel.prompt.md":"7fbac66f7244","components/general/Input/Input.jsx":"129e31437089","components/general/Input/Input.d.ts":"3e4dbb35f198","components/general/Input/Input.prompt.md":"2d678012f165","components/general/ProgressBar/ProgressBar.jsx":"28c8c20e2510","components/general/ProgressBar/ProgressBar.d.ts":"b62121a95075","components/general/ProgressBar/ProgressBar.prompt.md":"374597d38ceb","components/general/SeverityBadge/SeverityBadge.jsx":"fe9371186a1b","components/general/SeverityBadge/SeverityBadge.d.ts":"3ce53c203479","components/general/SeverityBadge/SeverityBadge.prompt.md":"2f527f0a7426","components/general/Spinner/Spinner.jsx":"696b747b566a","components/general/Spinner/Spinner.d.ts":"153ae0acdbbc","components/general/Spinner/Spinner.prompt.md":"94c85ac6725a","components/general/StatCard/StatCard.jsx":"60b6d231d0a2","components/general/StatCard/StatCard.d.ts":"2ea89387c9e5","components/general/StatCard/StatCard.prompt.md":"f88f1f2c46ca","components/general/StatusBadge/StatusBadge.jsx":"94fd16407adc","components/general/StatusBadge/StatusBadge.d.ts":"64b7ca8b5d73","components/general/StatusBadge/StatusBadge.prompt.md":"503c0fc6a62c","components/general/Tabs/Tabs.jsx":"16fa76e906c2","components/general/Tabs/Tabs.d.ts":"8bd27b376ffb","components/general/Tabs/Tabs.prompt.md":"96e6cc59996a","components/general/Waveform/Waveform.jsx":"31396c833981","components/general/Waveform/Waveform.d.ts":"e4abd69d90e4","components/general/Waveform/Waveform.prompt.md":"8588b4aebee7"},"inlinedExternals":["clsx"],"builtBy":"cc-design-sync"} */
"use strict";
var PwnboardUI = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      var R = window.React;
      function np(p, k) {
        var o = {};
        for (var x in p) if (x !== "children") o[x] = p[x];
        if (k !== void 0) o.key = k;
        return o;
      }
      function jsx2(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs2(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsxs2;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs2 : jsx2)(t, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // dist/index.js
  var index_exports = {};
  __export(index_exports, {
    ArcReactor: () => ArcReactor,
    Button: () => Button,
    Card: () => Card,
    DataTable: () => DataTable,
    GlowText: () => GlowText,
    HudPanel: () => HudPanel,
    Input: () => Input,
    ProgressBar: () => ProgressBar,
    SeverityBadge: () => SeverityBadge,
    Spinner: () => Spinner,
    StatCard: () => StatCard,
    StatusBadge: () => StatusBadge,
    Tabs: () => Tabs,
    Waveform: () => Waveform,
    cn: () => cn
  });
  init_define_import_meta_env();

  // node_modules/clsx/dist/clsx.mjs
  init_define_import_meta_env();
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }

  // dist/index.js
  var import_jsx_runtime = __toESM(require_react_shim(), 1);
  function cn(...inputs) {
    return clsx(inputs);
  }
  var PAD = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-8"
  };
  function Card({ children, padding = "md", className, ...rest }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("jarvis-card", PAD[padding], className), ...rest, children });
  }
  function Button({ variant = "primary", children, className, type = "button", ...rest }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type,
        className: cn("btn-jarvis", variant === "danger" && "btn-jarvis-danger", className),
        ...rest,
        children
      }
    );
  }
  function Input({ className, type = "text", ...rest }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type, className: cn("input-jarvis", className), ...rest });
  }
  function SeverityBadge({ severity, label, className }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("jarvis-badge", `severity-${severity}`, className), children: label ?? severity });
  }
  function StatusBadge({ status, label, className }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("jarvis-badge", `status-${status}`, className), children: label ?? status });
  }
  function ProgressBar({ value, className }) {
    const pct = Math.max(0, Math.min(100, value));
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("progress-jarvis", className), role: "progressbar", "aria-valuenow": pct, "aria-valuemin": 0, "aria-valuemax": 100, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "progress-jarvis-fill", style: { width: `${pct}%` } }) });
  }
  function Tabs({ items, value, onChange, className }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("flex items-center gap-1 border-b border-jarvis-light", className), role: "tablist", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        role: "tab",
        "aria-selected": item.id === value,
        className: cn("tab-jarvis", item.id === value && "active"),
        onClick: () => onChange(item.id),
        children: item.label
      },
      item.id
    )) });
  }
  function DataTable({
    columns,
    rows,
    rowKey,
    emptyMessage = "NO DATA",
    className
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: cn("table-jarvis", className), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: columns.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: c.header }, i)) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { colSpan: columns.length, className: "text-center text-jarvis-cyan/30 font-mono tracking-widest", children: emptyMessage }) }) : rows.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: columns.map((c, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: c.className, children: c.cell(row) }, ci)) }, rowKey ? rowKey(row, ri) : ri)) })
    ] });
  }
  function Spinner({ size = 40, className }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: cn("spinner-jarvis", className),
        style: { width: size, height: size },
        role: "status",
        "aria-label": "Loading"
      }
    );
  }
  function StatCard({ label, value, icon: Icon, color = "#C8F04B", className }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: cn("jarvis-card p-5 relative overflow-hidden group", className), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          style: { background: `radial-gradient(circle at 80% 20%, ${color}10 0%, transparent 60%)` }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-mono text-[10px] tracking-[2px] text-jarvis-cyan/40 uppercase", children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-3xl font-bold text-white font-mono mt-2", style: { textShadow: `0 0 20px ${color}40` }, children: value })
        ] }),
        Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-8 h-8", style: { color: `${color}60` } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 blur-md", style: { background: `${color}20` } })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "absolute bottom-0 left-0 right-0 h-px",
          style: { background: `linear-gradient(90deg, ${color}40, transparent)` }
        }
      )
    ] });
  }
  function ArcReactor({ size = 48 }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", style: { width: size, height: size }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "absolute inset-0 rounded-full",
          style: { border: "2px solid #C8F04B40", animation: "arcPulse 3s ease-in-out infinite" }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "absolute inset-1 rounded-full",
          style: { border: "1px dashed #C8F04B30", animation: "arcRotate 8s linear infinite" }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "absolute rounded-full",
          style: { inset: "6px", border: "2px solid #C8F04B60", boxShadow: "0 0 15px #C8F04B40, inset 0 0 10px #C8F04B20" }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "absolute rounded-full",
          style: { inset: "12px", background: "radial-gradient(circle, #C8F04B60 0%, #C8F04B20 50%, transparent 70%)", animation: "arcPulse 2s ease-in-out infinite" }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "absolute rounded-full",
          style: { inset: `${size / 2 - 3}px`, background: "#C8F04B", boxShadow: "0 0 10px #C8F04B" }
        }
      )
    ] });
  }
  function HudPanel({ children, className }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: cn("relative", className), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-jarvis-cyan/40" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-jarvis-cyan/40" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-jarvis-cyan/40" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-jarvis-cyan/40" }),
      children
    ] });
  }
  function GlowText({ color = "cyan", as: Tag = "span", children, className }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: cn(`glow-${color}`, className), children });
  }
  function Waveform({ bars = 5, className }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("waveform", className), "aria-hidden": "true", children: Array.from({ length: bars }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "waveform-bar" }, i)) });
  }
  return __toCommonJS(index_exports);
})();
window.PwnboardUI=PwnboardUI.__dsMainNs?Object.assign({},PwnboardUI,PwnboardUI.__dsMainNs,{__dsMainNs:undefined}):PwnboardUI;
