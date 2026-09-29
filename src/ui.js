/* UI primitives: windows, taskbar, toasts, modal, link handling, ripples. */
import { LINKS, NAV } from "./config.js";

export const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const fmt = (n) => Math.round(n).toLocaleString("en-US");

/* ---- Window factory ------------------------------------------------------- */
let winSeq = 0;
export function win({ title, body, cls = "", icon = "assets/face.webp", closable = true, id }) {
  const wid = id || `w${++winSeq}`;
  return `
  <section class="win ${cls}" data-win="${wid}" data-title="${esc(title)}">
    <div class="win__bar">
      <img class="win__ico" src="${icon}" alt="" width="16" height="16" loading="lazy" />
      <span class="win__title">${esc(title)}</span>
      <span class="win__btns">
        <button class="win__btn" data-w="min" aria-label="Minimise window">_</button>
        <button class="win__btn" data-w="max" aria-label="Maximise window">□</button>
        ${closable ? `<button class="win__btn" data-w="close" aria-label="Close window">×</button>` : ""}
      </span>
    </div>
    <div class="win__body">${body}</div>
  </section>`;
}

/* ---- Toasts --------------------------------------------------------------- */
export function toast(msg, tone = "") {
  const root = $("#toasts");
  const t = document.createElement("div");
  t.className = `toast ${tone ? "toast--" + tone : ""}`;
  t.textContent = msg;
  root.appendChild(t);
  while (root.children.length > 4) root.firstChild.remove();
  setTimeout(() => t.remove(), 3900);
}

/* ---- Modal ---------------------------------------------------------------- */
export function openModal(title, bodyHTML, cls = "") {
  const m = $("#modal");
  m.innerHTML = win({ title, body: bodyHTML, cls: `is-open ${cls}`, id: "modal-win" });
  m.hidden = false;
  m.dataset.open = "1";
  $(".win__btn[data-w='close']", m)?.focus();
}
export function closeModal() {
  const m = $("#modal");
  m.hidden = true;
  m.innerHTML = "";
  delete m.dataset.open;
}

/* ---- Taskbar + start menu ------------------------------------------------- */
const chips = new Map(); // win id -> {el, title}

export function renderTaskbar() {
  const bar = $("#taskbar");
  bar.innerHTML = `
    <button class="tb tb--start" id="startBtn" aria-haspopup="true" aria-expanded="false"><img src="assets/face.webp" alt="" width="18" height="18" /> START</button>
    <div id="chips" style="display:flex;gap:6px;min-width:0;overflow:hidden"></div>
    <span class="tb__spacer"></span>
    <button class="tb" id="crtBtn" aria-pressed="true" title="Toggle CRT effect">CRT: ON</button>
    <span class="tb__clock" id="clock">--:--</span>
    <nav class="startmenu" id="startMenu" aria-label="Start menu">
      ${NAV.map((n) => `<a href="${n.href}">${esc(n.label)}</a>`).join("")}
      <hr />
      <a href="#" data-restore>RESTORE ALL WINDOWS</a>
    </nav>`;

  const start = $("#startBtn"), menu = $("#startMenu");
  const setMenu = (open) => {
    menu.classList.toggle("open", open);
    start.classList.toggle("pressed", open);
    start.setAttribute("aria-expanded", String(open));
  };
  start.addEventListener("click", (e) => { e.stopPropagation(); setMenu(!menu.classList.contains("open")); });
  document.addEventListener("click", (e) => { if (!menu.contains(e.target)) setMenu(false); });
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    if (a.hasAttribute("data-restore")) { e.preventDefault(); restoreAll(); }
    setMenu(false);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setMenu(false); closeModal(); } });
  window.__openMenu = () => setMenu(!menu.classList.contains("open"));

  $("#crtBtn").addEventListener("click", (e) => {
    const off = document.body.classList.toggle("crt-off");
    e.currentTarget.textContent = `CRT: ${off ? "OFF" : "ON"}`;
    e.currentTarget.setAttribute("aria-pressed", String(!off));
  });

  const tick = () => { $("#clock").textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); };
  tick(); setInterval(tick, 20000);
}

function addChip(winEl) {
  const id = winEl.dataset.win;
  if (chips.has(id)) return;
  const b = document.createElement("button");
  b.className = "tb tb--chip";
  b.textContent = winEl.dataset.title;
  b.title = `Restore ${winEl.dataset.title}`;
  b.addEventListener("click", () => restore(id));
  $("#chips").appendChild(b);
  chips.set(id, { el: b, win: winEl });
}
function restore(id) {
  const c = chips.get(id);
  if (!c) return;
  c.el.remove();
  chips.delete(id);
  c.win.classList.remove("closing", "is-gone");
  void c.win.offsetWidth;
  c.win.classList.add("is-open");
}
function restoreAll() { [...chips.keys()].forEach(restore); toast("ALL WINDOWS RESTORED. THE INU APPROVES."); }

/* ---- Window chrome behaviour (delegated) ---------------------------------- */
export function initWindows() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".win__btn");
    if (!btn) return;
    const w = btn.closest(".win");
    const act = btn.dataset.w;
    if (w.dataset.win === "modal-win") { if (act === "close") closeModal(); return; }
    if (act === "close") {
      w.classList.remove("is-open");
      w.classList.add("closing");
      const done = () => { w.classList.add("is-gone"); addChip(w); };
      reduceMotion ? done() : setTimeout(done, 320);
    } else if (act === "min") {
      w.classList.toggle("is-min");
    } else if (act === "max") {
      w.classList.remove("shake"); void w.offsetWidth; w.classList.add("shake");
      toast("ERROR: WINDOW IS ALREADY MAXIMUM INU.", "pink");
    }
  });
  $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });
}

/* ---- Links from config ---------------------------------------------------- */
export function linkHref(key) {
  return key === "buy" || key === "chart" || key === "join" ? LINKS[key] : LINKS.socials.find((s) => s.id === key)?.href;
}
export function initLinks() {
  $$("[data-link]").forEach((a) => {
    const href = linkHref(a.dataset.link) || "#";
    a.setAttribute("href", href);
    if (href !== "#") { a.target = "_blank"; a.rel = "noopener noreferrer"; }
  });
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-link]");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || href === "#") {
      e.preventDefault();
      toast("LINK NOT SET YET. THE INU IS WORKING ON IT. (edit src/config.js)");
    }
  });
}

/* ---- Button ripple -------------------------------------------------------- */
export function initRipples() {
  document.addEventListener("pointerdown", (e) => {
    const b = e.target.closest(".btn");
    if (!b || reduceMotion) return;
    const r = b.getBoundingClientRect();
    b.style.setProperty("--rx", `${e.clientX - r.left}px`);
    b.style.setProperty("--ry", `${e.clientY - r.top}px`);
    b.classList.remove("rip"); void b.offsetWidth; b.classList.add("rip");
  });
}
