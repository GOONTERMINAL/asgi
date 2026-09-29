import { SITE } from "./config.js";
import * as S from "./sections.js";
import * as UI from "./ui.js";
import * as FX from "./fx.js";
import { initBuilder } from "./builder.js";

document.title = SITE.title;

const $ = UI.$;
$("#nav").innerHTML = S.nav();
$("#app").innerHTML = [
  S.hero(), S.story(), S.engine(), S.loop(), S.builder(), S.benchmarks(),
  S.mission(), S.memes(), S.roadmap(), S.tokenomics(), S.faq(), S.community(),
].join("");
$("#footer").innerHTML = S.footer();

UI.renderTaskbar();
UI.initWindows();
UI.initLinks();
UI.initRipples();
$("#menuBtn")?.addEventListener("click", (e) => { e.stopPropagation(); window.__openMenu?.(); });

FX.initStars();
FX.initParallax();
FX.initReveal();
FX.initSpy();
FX.initTerminal();
FX.initMetrics();
FX.initBenchmarks();
FX.initEngine();
FX.initLoop();
FX.initMission();
FX.initRoadmap();
FX.initMemes();
FX.initLaunch();
initBuilder();

// tagline in the console, because of course
console.log(`%c${SITE.tagline}\n%c${SITE.secondaryTagline}`, "color:#ff3fd0;font:700 16px monospace", "color:#19f3ff;font:12px monospace");
