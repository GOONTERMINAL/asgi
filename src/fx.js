/* Effects & behaviour: stars, parallax, reveals, terminal, metrics, chart, feed, launch sequence. */
import * as C from "./config.js";
import { ROCKET } from "./icons.js";
import { $, $$, fmt, toast, openModal, reduceMotion } from "./ui.js";

/* ---- Stars ---------------------------------------------------------------- */
export function initStars() {
  const W = Math.max(screen.width || 1440, 1600), H = Math.max((screen.height || 900) * 2.2, 2000);
  const colors = ["#ffffff", "#ffffff", "#9fe9ff", "#ffb8f2", "#c9a8ff"];
  const layer = (n, size) => Array.from({ length: n }, () => {
    const c = colors[(Math.random() * colors.length) | 0];
    return `${(Math.random() * W) | 0}px ${(Math.random() * H) | 0}px 0 ${size}px ${c}`;
  }).join(",");
  $(".stars--1").style.boxShadow = layer(140, 0);
  $(".stars--2").style.boxShadow = layer(70, 0.6);
  $(".stars--3").style.boxShadow = layer(26, 1.3);
}

/* ---- Parallax (scroll + mouse) --------------------------------------------- */
export function initParallax() {
  if (reduceMotion) return;
  const layers = [
    [$(".stars--1"), 0.02], [$(".stars--2"), 0.05], [$(".stars--3"), 0.09],
    [$(".planet--a"), 0.06], [$(".planet--b"), 0.14],
  ];
  const ui = $$("[data-par]").map((el) => [el, parseFloat(el.dataset.par)]);
  let mx = 0, my = 0, ticking = false;
  const apply = () => {
    ticking = false;
    const y = window.scrollY;
    for (const [el, f] of layers) el.style.transform = `translate3d(${mx * f * 400}px, ${-y * f}px, 0)`;
    for (const [el, f] of ui) el.style.translate = `${mx * f * -60}px ${-(y * f) + my * f * -30}px`;
  };
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } };
  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("pointermove", (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; req(); }, { passive: true });
  apply();
}

/* ---- Scroll reveal + live-section toggling --------------------------------- */
export function initReveal() {
  const revealables = $$(".reveal, .story");
  if (reduceMotion || !("IntersectionObserver" in window)) { revealables.forEach((e) => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) {
      en.target.classList.add("in");
      if (en.target.classList.contains("win")) en.target.classList.add("is-open");
      io.unobserve(en.target);
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  revealables.forEach((e) => io.observe(e));
}
export function initLive(sel, cb) {
  const el = $(sel);
  if (!el) return;
  if (!("IntersectionObserver" in window)) { cb(true, el); return; }
  new IntersectionObserver((es) => cb(es[0].isIntersecting, el), { threshold: 0.05 }).observe(el);
}

/* ---- Scrollspy --------------------------------------------------------------- */
export function initSpy() {
  const links = $$(".nav__link");
  const targets = links.map((l) => $(l.getAttribute("href")));
  let ticking = false;
  const run = () => {
    ticking = false;
    const line = innerHeight * 0.35;
    let idx = 0;
    targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top < line) idx = i; });
    links.forEach((l, i) => l.classList.toggle("active", i === idx));
  };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
  run();
}

/* ---- Hero terminal typing ---------------------------------------------------- */
let termApi = null;
export function initTerminal() {
  const box = $("#term");
  if (!box) return;
  const lines = C.HERO.terminalLines;
  const MAX = 10;
  const mk = () => { const d = document.createElement("div"); d.className = "term-line"; box.appendChild(d); while (box.children.length > MAX) box.firstChild.remove(); return d; };
  const cursor = document.createElement("span"); cursor.className = "term-cursor";
  let stopped = false;

  termApi = { push(text) { const d = mk(); d.textContent = text; d.appendChild(cursor); } };

  if (reduceMotion) { lines.slice(0, MAX).forEach((t) => { mk().textContent = t; }); return; }

  const typeLine = (text) => new Promise((res) => {
    const d = mk(); let i = 0;
    const step = () => {
      if (stopped) return;
      d.textContent = text.slice(0, ++i); d.appendChild(cursor);
      if (i < text.length) setTimeout(step, 26 + Math.random() * 30); else setTimeout(res, 260);
    };
    step();
  });
  (async function run() {
    while (!stopped) {
      for (const l of lines) await typeLine(l);
      await new Promise((r) => setTimeout(r, 2600));
      box.innerHTML = "";
    }
  })();
}

/* ---- Metrics ------------------------------------------------------------------ */
const state = Object.fromEntries(C.METRICS.filter((m) => m.value != null).map((m) => [m.id, m.value]));
const paint = () => $$("[data-metric]").forEach((t) => {
  const id = t.dataset.metric;
  if (id in state) t.querySelector(".tile__value").textContent = fmt(state[id]);
});
export function initMetrics() {
  if (reduceMotion) return;
  setInterval(() => {
    if (document.hidden) return;
    for (const m of C.METRICS) {
      if (m.value == null) continue;
      if (m.jitter) state[m.id] = Math.max(1, m.value + Math.round((Math.random() - 0.5) * 2 * m.jitter));
      else state[m.id] += Math.ceil(Math.random() * m.tick * 2);
    }
    paint();
  }, 1400);
}

/* ---- Benchmarks --------------------------------------------------------------- */
export function initBenchmarks() {
  initLive("#benchmarks", (on, el) => {
    if (!on) return;
    $$(".bench__fill", el).forEach((f, i) => setTimeout(() => { f.style.width = `${f.dataset.pct}%`; }, reduceMotion ? 0 : i * 180));
  });
}

/* ---- Engine highlight cycle ---------------------------------------------------- */
export function initEngine() {
  const stages = $$("#stages .stage"), chips = $$("#recurChain .chip");
  if (!stages.length) return;
  let i = 0, on = true;
  const total = stages.length + chips.length;
  const step = () => {
    stages.forEach((s, k) => s.classList.toggle("on", i < stages.length && k === i));
    chips.forEach((c, k) => c.classList.toggle("on", i >= stages.length && k <= i - stages.length));
    i = (i + 1) % (total + 2);
  };
  if (reduceMotion) { stages.forEach((s) => s.classList.add("on")); chips.forEach((c) => c.classList.add("on")); return; }
  initLive("#engine", (v) => { on = v; });
  step();
  setInterval(() => { if (on) step(); }, 950);
}

/* ---- Infinite loop: only animate while visible -------------------------------- */
export function initLoop() {
  initLive("#loop", (on, el) => el.classList.toggle("live", on));
}

/* ---- Mission chart + feed -------------------------------------------------------- */
export function initMission() {
  const canvas = $("#chart"), feed = $("#feed");
  if (!canvas || !feed) return;
  const ctx = canvas.getContext("2d");
  const pts = Array.from({ length: 70 }, (_, i) => 40 + Math.sin(i / 5) * 8 + i * 0.3);
  const size = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2), r = canvas.getBoundingClientRect();
    canvas.width = r.width * dpr; canvas.height = r.height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const draw = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(25,243,255,.12)"; ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    const min = Math.min(...pts), max = Math.max(...pts), span = Math.max(1, max - min);
    const X = (i) => (i / (pts.length - 1)) * w, Y = (v) => h - 24 - ((v - min) / span) * (h - 60);
    const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, "rgba(57,255,136,.35)"); g.addColorStop(1, "rgba(57,255,136,0)");
    ctx.beginPath(); pts.forEach((v, i) => (i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v))));
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); pts.forEach((v, i) => (i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v))));
    ctx.strokeStyle = "#39ff88"; ctx.lineWidth = 3; ctx.shadowColor = "#39ff88"; ctx.shadowBlur = 14; ctx.stroke(); ctx.shadowBlur = 0;
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(w, Y(pts[pts.length - 1]), 4, 0, 7); ctx.fill();
  };
  size(); draw();
  addEventListener("resize", () => { size(); draw(); });

  const log = C.MISSION.log;
  let li = 0;
  const addLine = () => {
    const d = document.createElement("div");
    const t = new Date().toLocaleTimeString([], { hour12: false });
    d.textContent = `[${t}] ${log[li++ % log.length]}`;
    feed.appendChild(d);
    while (feed.children.length > 12) feed.firstChild.remove();
  };
  for (let k = 0; k < 6; k++) addLine();
  if (reduceMotion) return;

  let on = false;
  initLive("#mission", (v) => { on = v; });
  setInterval(() => { if (!on) return; pts.push(Math.max(5, pts[pts.length - 1] + (Math.random() - 0.42) * 9)); pts.shift(); draw(); }, 260);
  setInterval(() => { if (on) addLine(); }, 1500);
}

/* ---- Roadmap rocket follows scroll ------------------------------------------------ */
export function initRoadmap() {
  const list = $("#roadmapList"), rocket = $("#roadmapRocket");
  if (!list || !rocket) return;
  let ticking = false;
  const run = () => {
    ticking = false;
    const r = list.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.55 - r.top) / r.height));
    rocket.style.setProperty("--ry", `${p * (r.height - 60)}px`);
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
  run();
}

/* ---- Meme lab buttons + copy buttons ------------------------------------------------ */
export function initMemes() {
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".meme__act");
    if (b) {
      const card = C.MEMES.cards[+b.dataset.i];
      switch (b.dataset.act) {
        case "VIEW MEME":
          openModal(card.title, card.image
            ? `<div class="modal__img"><img src="${card.image}" alt="${card.caption}" /></div><div class="modal__text">${card.caption}</div>`
            : `<div class="modal__redact"><b>EMPTY</b>NO MEME HERE YET. BE THE FIRST GOONER.</div>`); break;
        case "DEPLOY": toast(`DEPLOYING ${card.title}... LAUNCHPAD CREATED. LAUNCHING LAUNCHPAD...`, "pink"); bump("launchpads", 1); break;
        case "ARCHIVE": toast(`${card.title} ARCHIVED. NOBODY WILL EVER LOOK IN THERE.`); break;
        case "CLASSIFIED": openModal("ACCESS_DENIED.exe", `<div class="modal__redact"><b>CLASSIFIED</b>CLEARANCE REQUIRED: GOOD BOY</div>`, "win--pink"); break;
      }
      return;
    }
    const c = e.target.closest(".copy");
    if (c) {
      const v = c.dataset.copy;
      if (!v || v === "0x..." || v === "TBD") { toast("CONTRACT NOT SET YET. DO NOT TRUST ANYONE WHO SAYS OTHERWISE."); return; }
      navigator.clipboard?.writeText(v).then(() => toast("CONTRACT COPIED. VERIFY IT IN OFFICIAL CHANNELS."), () => toast("COPY FAILED. THE INU IS SORRY."));
    }
  });
}

function bump(id, n) { if (id in state) { state[id] += n; paint(); } }

/* ---- Launch sequence ---------------------------------------------------------------------- */
let launching = false;
export function initLaunch() {
  const btn = $("#launchBtn"), ov = $("#launchOverlay");
  if (!btn) return;
  btn.addEventListener("click", () => {
    if (launching) return;
    launching = true;
    const n = (state.launchpads ?? 0) + 1;
    bump("launchpads", 1);
    termApi?.push("LAUNCH INITIATED");
    const rockets = reduceMotion ? "" : Array.from({ length: 9 }, () => `<span class="mini-rocket" style="left:${5 + Math.random() * 88}%;--dl:${(1.4 + Math.random() * 1.1).toFixed(2)}s">${ROCKET}</span>`).join("");
    ov.innerHTML = `<div class="launch-overlay__flash"></div><div class="launch-overlay__count">3</div><div class="launch-overlay__msg"></div>${reduceMotion ? "" : `<span class="big-rocket">${ROCKET}</span>`}${rockets}`;
    ov.classList.add("go");
    ov.setAttribute("aria-hidden", "false");
    const count = $(".launch-overlay__count", ov), msg = $(".launch-overlay__msg", ov);
    const T = reduceMotion ? 0.35 : 1;
    if (!reduceMotion) document.body.classList.add("shaking");
    const at = (ms, fn) => setTimeout(fn, ms * T);
    if (!reduceMotion) { at(600, () => (count.textContent = "2")); at(1200, () => (count.textContent = "1")); at(1750, () => (count.textContent = "")); }
    at(1900, () => { msg.textContent = `LAUNCHPAD #${fmt(n)} LAUNCHED. NOW LAUNCHING ANOTHER LAUNCHPAD.`; if (reduceMotion) count.textContent = ""; });
    at(4700, () => {
      ov.classList.remove("go"); ov.innerHTML = ""; ov.setAttribute("aria-hidden", "true");
      document.body.classList.remove("shaking");
      launching = false;
      toast(`LAUNCHPAD #${fmt(n)} DEPLOYED. THE INU IS PROUD.`, "pink");
    });
  });
}
