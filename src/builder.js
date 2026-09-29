/* Launchpad factory: create a launchpad, then a launchpad inside it, then another…
   Real nested DOM windows. Purely a simulation — nothing is created on-chain. */
import { BUILDER as B } from "./config.js";
import { ROCKET } from "./icons.js";
import { $, esc, fmt, toast, reduceMotion } from "./ui.js";
import { bump } from "./fx.js";

let depth = 0, total = 0, coins = 0, overflows = 0;
let meme = "", auto = null, over = false;

const stage = () => $("#lpStage");
const log = () => $("#lpLog");

function ticker(raw) {
  const t = String(raw || "").replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 12);
  return t || B.defaultMemes[(Math.random() * B.defaultMemes.length) | 0];
}
const levelName = (d) => d === 1 ? `$${meme}` : d === 2 ? `$${meme} LAUNCHPAD` : `${"LAUNCHPAD ".repeat(d - 1).trim()}`;

function say(text, tone = "") {
  const l = log(), d = document.createElement("div");
  if (tone) d.className = tone;
  d.textContent = text;
  l.appendChild(d);
  while (l.children.length > 40) l.firstChild.remove();
  l.scrollTop = l.scrollHeight;
}

function paintStats() {
  $("#lpDepth").textContent = String(depth);
  $("#lpTotal").textContent = fmt(total);
  $("#lpCoins").textContent = fmt(coins);
  $("#lpOver").textContent = String(overflows);
  $("#lpNext").disabled = depth === 0 || over;
  $("#lpAuto").textContent = auto ? B.stopLabel : B.autoLabel;
}

function windowEl(d) {
  const el = document.createElement("div");
  el.className = "lpw lpw--deepest";
  el.style.setProperty("--d", d);
  el.dataset.depth = d;
  el.innerHTML = `
    <div class="lpw__bar"><span>LAUNCHPAD_${d}.exe</span><span class="lpw__x">×</span></div>
    <div class="lpw__body">
      <div class="lpw__meta">
        <span class="lpw__rocket">${ROCKET}</span>
        <span class="lpw__name">${esc(levelName(d))}</span>
        <span class="lpw__status">DEPLOYING…</span>
      </div>
      <div class="lpw__child"></div>
      <button class="btn btn--pink btn--sm lpw__next" type="button">${esc(B.nextLabel)} ▶</button>
    </div>`;
  return el;
}

function addLevel(first = false) {
  if (over) return false;
  if (depth >= B.maxDepth) { overflow(); return false; }
  depth++; total++; coins += 1 + ((Math.random() * 4) | 0);
  bump("launchpads", 1); bump("coins", 1);
  const s = stage();
  s.querySelector(".lpw__empty")?.remove();
  const el = windowEl(depth);
  if (!reduceMotion) el.classList.add("lpw--in");
  let host = s;
  if (!first) {
    const prev = s.querySelector(".lpw--deepest");
    prev.classList.remove("lpw--deepest");
    const pn = prev.querySelector(".lpw__next"); if (pn) pn.remove();
    host = prev.querySelector(".lpw__child");
  }
  host.appendChild(el);
  const status = el.querySelector(".lpw__status");
  setTimeout(() => { status.textContent = "DEPLOYED ✔"; status.classList.add("ok"); }, reduceMotion ? 0 : 450);
  say(`[LP-${String(total).padStart(4, "0")}] ${B.lines[(depth - 1) % B.lines.length]}`, depth > 8 ? "hot" : "");
  el.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
  paintStats();
  return true;
}

function stopAuto() { if (auto) { clearInterval(auto); auto = null; } paintStats(); }

function overflow() {
  if (over) return;
  over = true; stopAuto();
  overflows++;
  B.overflowLines.forEach((l, i) => setTimeout(() => say(l, "bad"), reduceMotion ? 0 : i * 350));
  const s = stage();
  s.classList.add("lpstage--over");
  setTimeout(() => {
    s.classList.remove("lpstage--over");
    s.innerHTML = `
      <div class="lpw lpw--inf lpw--in">
        <div class="lpw__bar"><span>${esc(B.infinityTitle)}</span><span class="lpw__x">×</span></div>
        <div class="lpw__body lpw__body--inf">
          <div class="lpw__big">∞</div>
          <p>${esc(B.infinityText)}</p>
          <button class="btn btn--cyan btn--sm" type="button" id="lpReboot">${esc(B.rebootLabel)}</button>
        </div>
      </div>`;
    $("#lpReboot").addEventListener("click", reset);
    toast("STACK OVERFLOW. THE INU IS PROUD.", "pink");
    paintStats();
  }, reduceMotion ? 0 : 1100);
  paintStats();
}

function reset() {
  stopAuto();
  depth = 0; over = false;
  stage().innerHTML = `<div class="lpw__empty">${esc(B.emptyText)}</div>`;
  log().innerHTML = "";
  say("factory rebooted. inu is ready.");
  paintStats();
}

function create() {
  if (over) reset();
  if (depth === 0) {
    meme = ticker($("#lpMeme").value);
    $("#lpMeme").value = meme;
    addLevel(true);
  } else addLevel();
}

export function initBuilder() {
  if (!stage()) return;
  reset();
  log().innerHTML = "";
  say("factory online. awaiting meme.");
  $("#lpForm").addEventListener("submit", (e) => { e.preventDefault(); create(); });
  $("#lpNext").addEventListener("click", () => { if (depth) addLevel(); });
  stage().addEventListener("click", (e) => { if (e.target.closest(".lpw__next")) addLevel(); });
  $("#lpReset").addEventListener("click", () => { reset(); });
  $("#lpAuto").addEventListener("click", () => {
    if (auto) { stopAuto(); say("recursion interrupted. coward."); return; }
    if (over) reset();
    if (depth === 0) create();
    say("auto-recurse engaged.");
    auto = setInterval(() => { if (!addLevel()) stopAuto(); }, B.autoDelayMs);
    paintStats();
  });
}
