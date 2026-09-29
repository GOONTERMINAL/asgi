/* Section renderers. All copy comes from config.js — nothing is hard-coded here. */
import * as C from "./config.js";
import { ROCKET, PILL, ARROW_UR, ARROW_R, TILE_ICONS, SOCIAL_ICONS } from "./icons.js";
import { win, esc, fmt } from "./ui.js";

export const LOOP_K = 0.72;      // must match the 1.388889 (=1/K) scale in styles.css @keyframes loopzoom
export const LOOP_LAYERS = 18;

const socialLinks = (cls) =>
  C.LINKS.socials.map((s) => `<a class="${cls}" data-link="${s.id}" href="#" aria-label="${esc(s.label)}">${SOCIAL_ICONS[s.id] || esc(s.label)}</a>`).join("");

/* ---- Nav / footer ---------------------------------------------------------- */
export function nav() {
  return `
  <a class="brand" href="#home" aria-label="${esc(C.SITE.name)} home">
    <img class="brand__face" src="assets/face.webp" alt="" width="54" height="54" />
    <span><div class="brand__name chrome-text">${esc(C.SITE.name)}</div><div class="brand__sub">${esc(C.SITE.fullName.toUpperCase())}</div></span>
  </a>
  <nav class="nav__links" aria-label="Primary">
    ${C.NAV.map((n, i) => `<a class="nav__link${i === 0 ? " active" : ""}" href="${n.href}">${esc(n.label)}</a>`).join("")}
  </nav>
  <button class="btn btn--ghost btn--sm nav__burger" id="menuBtn" aria-label="Open menu">MENU</button>
  <a class="btn btn--pink nav__buy" data-link="buy" href="#">BUY ${esc(C.SITE.name)} ${PILL}</a>`;
}

export function footer() {
  return `
  <div class="footer__bar">
    <span class="footer__brand"><img src="assets/face.webp" alt="" width="40" height="40" loading="lazy" /><b class="chrome-text">${esc(C.SITE.name)}</b></span>
    <span class="footer__tag">${esc(C.SITE.fullName.toUpperCase())}</span>
    <span class="footer__disc">${esc(C.SITE.disclaimer)}</span>
    <span class="footer__soc">${socialLinks("")}</span>
    <a class="btn btn--lime" data-link="join" href="#">${esc(C.COMMUNITY.cta)} ${ARROW_R}</a>
  </div>`;
}

/* ---- Hero ------------------------------------------------------------------ */
function tile(m) {
  const value = m.text ? esc(m.text) : fmt(m.value);
  return `
  <div class="tile tile--${m.tone}" data-metric="${m.id}">
    <span class="tile__ico">${TILE_ICONS[m.icon]}</span>
    <span><div class="tile__label">${esc(m.label)}</div><div class="tile__value">${value}</div></span>
  </div>`;
}

export function hero() {
  const H = C.HERO;
  const rockets = [
    { x: "62%", y: "40%", d: "6.5s", delay: "0s", dx: "50px", r: "14deg" },
    { x: "78%", y: "34%", d: "8s", delay: "1.6s", dx: "70px", r: "18deg" },
    { x: "88%", y: "22%", d: "7s", delay: "3.1s", dx: "40px", r: "12deg" },
    { x: "70%", y: "52%", d: "9s", delay: "4.6s", dx: "80px", r: "20deg" },
    { x: "94%", y: "48%", d: "7.5s", delay: "2.2s", dx: "30px", r: "8deg" },
    { x: "54%", y: "30%", d: "8.5s", delay: "5.4s", dx: "60px", r: "16deg" },
  ].map((r) => `<span class="rocket" style="--x:${r.x};--y:${r.y};--d:${r.d};--delay:${r.delay};--dx:${r.dx};--r:${r.r}">${ROCKET}</span>`).join("");

  const strip = [
    win({
      id: "strip-engine", title: C.ENGINE.headline, cls: "reveal",
      body: `<div class="shot"><img src="assets/engine-strip.webp" alt="The ASGI Shiba at a row of monitors launching launchpads" width="1032" height="416" loading="lazy" /></div>
             <div class="strip__caption strip__caption--dark" style="text-align:center;background:#02040f;color:#ffd23f;padding:6px;border:1px solid #1c2a6a">${esc(C.ENGINE.caption)}</div>`,
    }),
    win({
      id: "strip-about", title: `ABOUT ${C.SITE.name.replace("$", "")}`, cls: "reveal",
      body: `<div class="about-mini"><div class="shot"><img src="assets/portrait.webp" alt="Close-up of the ASGI Shiba grinning" width="312" height="615" loading="lazy" /></div>
             <p>${C.STORY.lines.map(esc).join("<br>")}</p></div>
             <a class="linkbtn" href="#about">${esc(C.STORY.cta)} ${ARROW_R.replace("<svg", '<svg width="16" height="16"')}</a>`,
    }),
    win({
      id: "strip-tok", title: C.TOKENOMICS.headline, cls: "reveal",
      body: `<div class="mini-tok">${donut()}<ul>${C.TOKENOMICS.allocation.map((a) => `<li>${a.percent == null ? "TBD" : a.percent + "%"} ${esc(a.label)}</li>`).join("")}<li>TAX: TBD</li></ul></div>
             <a class="linkbtn" href="#tokenomics">${esc(C.TOKENOMICS.cta)} ${ARROW_R.replace("<svg", '<svg width="16" height="16"')}</a>`,
    }),
    win({
      id: "strip-loop", title: "INFINITE LAUNCHPAD LOOP", cls: "reveal",
      body: `<div class="shot"><img src="assets/loop-preview.webp" alt="Launchpad windows nested inside launchpad windows" width="574" height="290" loading="lazy" /></div>
             <div style="display:flex;align-items:center;gap:8px"><div class="strip__caption">${C.LOOP.caption.map(esc).join("<br>")}</div><span class="infinity">∞</span></div>`,
    }),
  ].join("");

  return `
  <section id="home" class="hero" aria-label="Home">
    <div class="hero__main">
      <div class="hero__stage">
      <div class="hero__art" data-par="0.03">
        <img src="assets/hero.webp" width="1516" height="795" fetchpriority="high" alt="The ASGI Shiba in cyber goggles with a paw on a giant red LAUNCH button, beside a planet covered in stacked launchpads" />
      </div>
      <div class="hero__fx" aria-hidden="false">
        ${rockets}
        <button class="launch-btn" id="launchBtn" aria-label="${esc(H.launchLabel)} — press the big red button"><span class="launch-btn__tag">▲ PRESS ME</span></button>
      </div>
      </div>
      <div class="hero__stack">
        ${win({
          id: "hero-main", title: H.windowTitle, cls: "win--dark hero__win is-open",
          body: `<h1 class="hero__title">${H.headline.map((l, i) => `<span class="l${i + 1}">${esc(l)}</span>`).join("")}</h1>
                 <p class="hero__sub">${esc(H.subheadline)}</p>
                 <ul class="hero__list">${H.checklist.map((c, i) => `<li style="--i:${i}">${esc(c)}</li>`).join("")}</ul>`,
        })}
        <div class="terminal" data-par="0.05">
          ${win({ id: "hero-term", title: H.terminalTitle, cls: "win--dark is-open", body: `<div id="term" aria-live="off"></div>` })}
        </div>
      </div>
      <div class="hero__cta">
        <a class="btn btn--pink" data-link="buy" href="#">${esc(H.primaryCta)} ${PILL}</a>
        <a class="btn btn--cyan" data-link="chart" href="#">${esc(H.secondaryCta)} ${ARROW_UR}</a>
      </div>
    </div>
    <div class="tiles reveal">${C.METRICS.map(tile).join("")}</div>
    <div class="strip">${strip}</div>
  </section>`;
}

/* ---- Section wrapper ------------------------------------------------------- */
const head = (eyebrow, title, sub) => `
  <div class="section__head reveal">
    ${eyebrow ? `<div class="section__eyebrow">${esc(eyebrow)}</div>` : ""}
    <h2 class="section__title chrome-text">${esc(title)}</h2>
    ${sub ? `<p class="section__sub">${esc(sub)}</p>` : ""}
  </div>`;

/* ---- Story ----------------------------------------------------------------- */
export function story() {
  const S = C.STORY;
  return `
  <section id="about" class="section" aria-label="The story">
    ${head("// THE STORY", "THE INCIDENT", "DECLASSIFIED BY ACCIDENT")}
    <div class="story reveal">
      ${win({
        id: "story-doc", title: S.windowTitle, cls: "win--pink",
        body: `<div class="doc">
          <div class="doc__stamp">${esc(S.stamp)}</div>
          <div class="doc__meta">
            <b>FILE</b><span>${esc(S.fileId)}</span>
            <b>SUBJECT</b><span>${esc(S.subject)}</span>
            <b>STATUS</b><span class="doc__status">${esc(S.status)}</span>
            ${(S.redacted || []).map((r) => `<b>${esc(r.label)}</b><span><span class="redact">${esc(r.value)}</span></span>`).join("")}
          </div>
          ${S.lines.map((l, i) => `<p class="doc__line" style="--i:${i}">${esc(l)}</p>`).join("")}
          <p class="doc__foot">${esc(S.footnote)}</p>
        </div>`,
      })}
      <div class="portrait">
        <div class="shot" style="box-shadow:0 0 0 3px var(--hot),0 0 40px rgba(255,43,214,.5)"><img src="assets/portrait.webp" alt="Portrait of the ASGI Shiba, grinning in cyber goggles" width="312" height="615" loading="lazy" /></div>
        <div class="portrait__cap">SUBJECT: ${esc(S.subject.toUpperCase())}. GOOD BOY: CONFIRMED.</div>
      </div>
    </div>
  </section>`;
}

/* ---- Launch engine --------------------------------------------------------- */
export function engine() {
  const E = C.ENGINE;
  return `
  <section id="engine" class="section" aria-label="The launch engine">
    ${head("// PROCESS", E.headline, C.SITE.secondaryTagline)}
    <div class="engine">
      ${win({
        id: "engine-banner", title: E.windowTitle, cls: "reveal",
        body: `<div class="shot engine__banner"><img src="assets/engine-strip.webp" alt="The ASGI Shiba operating a row of monitors that each launch a launchpad" width="1032" height="416" loading="lazy" /></div>`,
      })}
      <div class="stages reveal" id="stages">
        ${E.steps.map((s) => `<div class="stage"><div class="stage__key">${esc(s.key)}</div><div class="stage__val">${esc(s.value)}</div></div>`).join("")}
      </div>
      <div class="loopback reveal"><span>${esc(E.loopLabel)}</span></div>
      <div class="recur reveal">
        <div class="recur__chain" id="recurChain">
          ${C.LOOP.chain.map((c, i) => `${i ? '<span class="arrow">▶</span>' : ""}<span class="chip${i === 0 ? " chip--meme" : ""}">${esc(c)}</span>`).join("")}
        </div>
        <div class="recur__note">${esc(E.loopNote)}</div>
      </div>
    </div>
  </section>`;
}

/* ---- Infinite launchpad loop ----------------------------------------------- */
export function loop() {
  const L = C.LOOP;
  const layers = Array.from({ length: LOOP_LAYERS }, (_, i) => {
    const w = (100 * Math.pow(LOOP_K, i)).toFixed(4);
    return `<div class="lp" style="--w:${w}">
      <div class="lp__bar"><span>${esc(L.windowTitle)}</span><span class="lp__x">×</span></div>
      <div class="lp__body">
        <span class="lp__rocket" style="top:34%">${ROCKET}</span>
        <span class="lp__rocket2" style="top:34%">${ROCKET}</span>
        <img class="lp__face" src="assets/face.webp" alt="" />
        <span class="lp__label">LAUNCHPAD</span>
      </div>
    </div>`;
  }).join("");
  return `
  <section id="loop" class="section loopsec" aria-label="Infinite launchpad loop">
    ${head("// RECURSION", L.headline, "")}
    <div class="loopwrap reveal">
      <div class="loop__hud"><span>RECURSION DEPTH: <span class="loop__depth"></span></span><span>STACK: OVERFLOWING</span></div>
      <div class="loop" role="img" aria-label="An endlessly zooming stack of launchpad windows, each containing another launchpad window">
        <div class="loop__zoom">${layers}</div>
      </div>
      <div class="loopchain" aria-label="Sequence">${L.chain.map((c, i) => `${i ? "<i>▼</i>" : ""}<b>${esc(c)}</b>`).join("")}</div>
      <p class="loopcap">${L.caption.map(esc).join("<br>")}</p>
    </div>
  </section>`;
}

/* ---- Benchmarks ------------------------------------------------------------ */
export function benchmarks() {
  const B = C.BENCHMARKS;
  return `
  <section id="benchmarks" class="section bench" aria-label="Benchmarks">
    ${head("// EVALUATION", B.headline, B.subline)}
    <div class="reveal">
    ${win({
      id: "bench", title: B.windowTitle, cls: "win--dark win--green",
      body: `${B.rows.map((r) => `
        <div class="bench__row ${r.infinite ? "inf" : ""} ${r.classified ? "cls" : ""}">
          <div class="bench__label">${esc(r.label)}</div>
          <div class="bench__bar"><div class="bench__fill" data-pct="${r.pct ?? 100}"></div></div>
          <div class="bench__val">${esc(r.display)}</div>
        </div>`).join("")}
        <div class="bench__meta">${(B.meta || []).map((m) => `<span>${esc(m.label)}:<b>${esc(m.value)}</b></span>`).join("")}</div>
        <div class="bench__foot"><span>${esc(B.footnote)}</span></div>`,
    })}
    </div>
  </section>`;
}

/* ---- Mission control ------------------------------------------------------- */
export function mission() {
  const M = C.MISSION;
  return `
  <section id="mission" class="section" aria-label="Mission control">
    ${head("// TELEMETRY", M.headline, M.subline)}
    <div class="reveal">
    ${win({
      id: "mission", title: M.windowTitle, cls: "win--dark",
      body: `<div class="mission__grid">${C.METRICS.map(tile).join("")}</div>
             <div class="mission__lower">
               <div class="chartbox"><span class="chartbox__tag">${esc(M.chartTag)}</span><canvas id="chart" aria-label="A fictional chart that only goes up and down at random"></canvas></div>
               <div class="feed" id="feed" aria-label="${esc(M.feedTitle)}"></div>
             </div>
             <div class="mission__disc">${esc(C.METRICS_DISCLAIMER)}</div>`,
    })}
    </div>
  </section>`;
}

/* ---- Meme lab -------------------------------------------------------------- */
export function memes() {
  const M = C.MEMES;
  return `
  <section id="memes" class="section" aria-label="Meme lab">
    ${head("// ARCHIVE", M.headline, M.subline)}
    <div class="memes">
      ${M.cards.map((c, i) => win({
        id: `meme-${i}`, title: c.title, cls: "meme reveal",
        body: `<div class="meme__img">${c.image
          ? `<img src="${c.image}" alt="${esc(c.caption)}" loading="lazy" />`
          : `<div class="meme__empty"><span><b>?</b>${esc(c.title)}</span></div>`}</div>
          <div class="meme__cap">${esc(c.caption)}</div>
          <div class="meme__acts">${M.actions.map((a) => `<button class="meme__act" data-act="${esc(a)}" data-i="${i}">${esc(a)}</button>`).join("")}</div>`,
      })).join("")}
    </div>
  </section>`;
}

/* ---- Roadmap --------------------------------------------------------------- */
export function roadmap() {
  const R = C.ROADMAP;
  return `
  <section id="roadmap" class="section" aria-label="Roadmap">
    ${head("// FLIGHT PLAN", R.headline, R.subline)}
    <div class="roadmap" id="roadmapList">
      <div class="roadmap__rail"></div>
      <span class="roadmap__rocket" id="roadmapRocket">${ROCKET}</span>
      ${R.phases.map((p) => `<div class="phase phase--${p.n} reveal" data-n="${p.n}">${win({
        id: `phase-${p.n}`, title: `PHASE_${p.n}.exe`, cls: "win--pink",
        body: `<div><div class="phase__tag">PHASE ${p.n}</div><div class="phase__title">${esc(p.title)}</div></div>`,
      })}</div>`).join("")}
    </div>
  </section>`;
}

/* ---- Tokenomics ------------------------------------------------------------ */
export function donut() {
  const [a, b, c] = C.TOKENOMICS.allocation;
  return `<div class="donut" style="--c1:${a.color};--c2:${b.color};--c3:${c.color}">
    <div class="donut__ring"></div>
    <div class="donut__face"><img src="assets/donut-face.webp" alt="" loading="lazy" /></div>
  </div>`;
}
export function tokenomics() {
  const T = C.TOKENOMICS;
  return `
  <section id="tokenomics" class="section" aria-label="Tokenomics">
    ${head("// ECONOMICS", T.headline, T.subline)}
    <div class="reveal">
    ${win({
      id: "tokenomics", title: T.windowTitle, cls: "win--dark",
      body: `<div class="tok">
        <div style="position:relative">${donut()}<div class="donut__tbd">ALLOCATION: TBD</div></div>
        <div>
          <div class="tok__rows">
            ${T.rows.map((r) => `<div class="tok__row"><span>${esc(r.label)}</span><span>${esc(r.value)}${r.copy ? `<button class="copy" data-copy="${esc(r.value)}">COPY</button>` : ""}</span></div>`).join("")}
          </div>
          <p class="tok__note">${esc(T.note)}</p>
        </div></div>`,
    })}
    </div>
  </section>`;
}

/* ---- FAQ ------------------------------------------------------------------- */
export function faq() {
  const F = C.FAQ;
  return `
  <section id="faq" class="section" aria-label="FAQ">
    ${head("// HELP", F.headline, F.subline)}
    <div class="faq reveal">
      ${F.items.map((it, i) => `<details${i === 0 ? " open" : ""}><summary>${esc(it.q)}</summary><div class="faq__a">${esc(it.a)}</div></details>`).join("")}
    </div>
  </section>`;
}

/* ---- Community ------------------------------------------------------------- */
export function community() {
  const M = C.COMMUNITY;
  return `
  <section id="join" class="section community" aria-label="Join the gooners">
    <img class="community__face reveal" src="assets/face.webp" alt="The ASGI Shiba" width="150" height="150" loading="lazy" />
    <h2 class="community__title reveal"><span class="glitch chrome-text" data-text="${esc(M.headline)}">${esc(M.headline)}</span></h2>
    <p class="community__sub reveal">${esc(M.sub)}</p>
    <a class="btn btn--pink btn--xl reveal" data-link="join" href="#">${esc(M.cta)} ${ARROW_R}</a>
    <div class="socials reveal">${socialLinks("social")}</div>
  </section>`;
}
