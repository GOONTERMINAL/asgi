/* ==========================================================================
   $ASGI — SITE CONFIG
   Every piece of copy, every link, contract address and tokenomics value on
   the site lives in this one file. Edit here, redeploy, done.

   LINKS: leave a URL as "#" and the button will show a "LINK NOT SET" toast
   instead of jumping around. Replace with the real URL when you have it.
   ========================================================================== */

export const SITE = {
  name: "$ASGI",
  fullName: "Artificial Shiba Gooner Intelligence",
  title: "$ASGI — Superintelligence. Naturally Inu.",
  description:
    "We built superintelligence. It found the launchpad. $ASGI: the first superintelligent Inu to discover the launchpad.",
  tagline: "SUPERINTELLIGENCE. NATURALLY INU.",
  secondaryTagline: "WE BUILT SUPERINTELLIGENCE. IT FOUND THE LAUNCHPAD.",
  disclaimer: "NOT FINANCIAL ADVICE. JUST GOONING.",
};

/* ---- Links (replace "#" with real URLs) ---------------------------------- */
export const LINKS = {
  buy: "#",        // where BUY $ASGI goes (DEX / launchpad page)
  chart: "#",      // VIEW CHART (Dexscreener / Birdeye / etc.)
  join: "#",       // JOIN THE GOONERS (Telegram / Discord invite)
  socials: [
    { id: "x",        label: "X",        href: "#" },
    { id: "telegram", label: "Telegram", href: "#" },
    { id: "discord",  label: "Discord",  href: "#" },
    { id: "youtube",  label: "YouTube",  href: "#" },
  ],
};

/* ---- Navigation ----------------------------------------------------------- */
export const NAV = [
  { label: "HOME",          href: "#home" },
  { label: "ABOUT",         href: "#about" },
  { label: "LAUNCH ENGINE", href: "#engine" },
  { label: "ROADMAP",       href: "#roadmap" },
  { label: "TOKENOMICS",    href: "#tokenomics" },
  { label: "MEMES",         href: "#memes" },
  { label: "FAQ",           href: "#faq" },
];

/* ---- Hero ----------------------------------------------------------------- */
export const HERO = {
  windowTitle: "ASGI.exe",
  headline: ["ARTIFICIAL", "SUPER GOONER", "INTELLIGENCE"],
  subheadline: "THE FIRST SUPERINTELLIGENT INU TO DISCOVER THE LAUNCHPAD.",
  checklist: [
    "DETECT MEME",
    "GENERATE NARRATIVE",
    "LAUNCH COIN",
    "LAUNCH ANOTHER LAUNCHPAD",
    "REPEAT FOREVER",
  ],
  terminalTitle: "ASGI v4.20",
  terminalLines: [
    "scanning internet...",
    "meme detected...",
    "generating narrative...",
    "deploying launchpad...",
    "launchpad deployed...",
    "launching launchpad...",
    "launching launchpad...",
    "launching launchpad...",
    "gooning...",
    "profit???",
  ],
  primaryCta: "BUY $ASGI",
  secondaryCta: "VIEW CHART",
  launchLabel: "LAUNCH",
};

/* ---- Mission control / hero stat tiles (FICTIONAL — meme metrics) -------- */
export const METRICS = [
  { id: "launchpads", label: "LAUNCHPADS CREATED", value: 694201,  tick: 3,  icon: "rocket", tone: "pink" },
  { id: "coins",      label: "COINS LAUNCHED",     value: 3472910, tick: 11, icon: "chart",  tone: "green" },
  { id: "gooners",    label: "GOONERS ONLINE",     value: 6942,    tick: 1,  icon: "people", tone: "cyan", jitter: 40 },
  { id: "status",     label: "MISSION STATUS",     text: "INFINITE",                        icon: "globe",  tone: "purple" },
];
export const METRICS_DISCLAIMER =
  "ALL NUMBERS ON THIS PAGE ARE FICTIONAL. THE INU MADE THEM UP. DO NOT PUT THEM IN A SPREADSHEET.";

/* ---- Story: fake classified incident report ------------------------------- */
export const STORY = {
  windowTitle: "CLASSIFIED_INCIDENT_REPORT.doc",
  stamp: "TOP SECRET // INU EYES ONLY",
  fileId: "ASGI-001",
  subject: "Inu Intelligence",
  status: "ACTIVE",
  lines: [
    "Humans built artificial intelligence.",
    "AI became superintelligent.",
    "Superintelligence became an Inu.",
    "The Inu discovered launchpads.",
    "Nobody knows what happened next.",
  ],
  redacted: [
    { label: "LOCATION", value: "the launchpad" },
    { label: "HANDLER",  value: "a very good boy" },
  ],
  footnote: "ADDENDUM: Then everything went wrong. Please do not send help. Send memes.",
  cta: "READ THE STORY",
};

/* ---- Launch engine --------------------------------------------------------- */
export const ENGINE = {
  windowTitle: "LAUNCH_ENGINE.exe",
  headline: "THE LAUNCH ENGINE",
  steps: [
    { key: "INPUT",   value: "MEME" },
    { key: "PROCESS", value: "SUPERINTELLIGENCE" },
    { key: "OUTPUT",  value: "LAUNCHPAD" },
    { key: "THEN",    value: "LAUNCH ANOTHER LAUNCHPAD" },
  ],
  caption: "INPUT: MEME  →  OUTPUT: INFINITE LAUNCHPADS",
  loopNote: "STACK OVERFLOW EXPECTED. STACK OVERFLOW ENCOURAGED.",
  loopLabel: "REPEAT FOREVER. NO EXIT CONDITION.",
};

/* ---- Infinite launchpad loop ---------------------------------------------- */
export const LOOP = {
  windowTitle: "LAUNCHPAD.exe",
  headline: "THE SINGULARITY HAS BEEN LAUNCHED.",
  chain: ["MEME", "LAUNCHPAD", "LAUNCHPAD", "LAUNCHPAD", "LAUNCHPAD", "∞"],
  caption: [
    "A LAUNCHPAD LAUNCHING A LAUNCHPAD",
    "THAT LAUNCHES A LAUNCHPAD",
    "THAT LAUNCHES A LAUNCHPAD...",
  ],
};

/* ---- Benchmarks (absurd) --------------------------------------------------- */
export const BENCHMARKS = {
  windowTitle: "ASGI_BENCHMARK_SUITE_v4.20.exe",
  headline: "ASGI BENCHMARKS",
  subline: "PEER-REVIEWED BY OTHER INUS. RESULTS MAY CONTAIN VIBES.",
  rows: [
    { label: "REASONING",      display: "99.9%", pct: 99.9 },
    { label: "CODING",         display: "98.7%", pct: 98.7 },
    { label: "VISION",         display: "99.8%", pct: 99.8 },
    { label: "MEME DETECTION", display: "100%",  pct: 100 },
    { label: "LAUNCHPAD IQ",   display: "∞",     pct: 100, infinite: true },
    { label: "GOON INTELLIGENCE", display: "CLASSIFIED", classified: true },
  ],
  meta: [
    { label: "PARAMETERS", value: "1 (GOOD BOY)" },
    { label: "TRAINING DATA", value: "MEMES" },
    { label: "CONTEXT WINDOW", value: "LAUNCHPAD" },
    { label: "ALIGNMENT", value: "TREATS" },
  ],
  footnote: "* BENCHMARK METHODOLOGY: THE INU SAID SO.",
};

/* ---- Mission control (FICTIONAL live feed) -------------------------------- */
export const MISSION = {
  windowTitle: "MISSION_CONTROL.exe",
  headline: "MISSION CONTROL",
  subline: "LIVE TELEMETRY FROM THE INU. (IT IS NOT LIVE. IT IS NOT TELEMETRY.)",
  chartTag: "NUMBER GO UP (FICTIONAL)",
  feedTitle: "LAUNCH LOG",
  log: [
    "meme detected. size: enormous.",
    "launchpad deployed.",
    "launching launchpad...",
    "launchpad launched launchpad.",
    "gooning at 100% capacity.",
    "stack overflow ignored.",
    "inu says: more launchpads.",
    "recursion depth: yes.",
    "chart is green. reason unknown.",
    "treats requested. treats denied.",
    "launching launchpad launchpad...",
    "profit??? (pending)",
  ],
};

/* ---- Meme lab -------------------------------------------------------------- */
export const MEMES = {
  headline: "MEME LAB",
  subline: "FUTURE COMMUNITY MEMES LIVE HERE. FOR NOW, THE INU HAS FILLED IN.",
  actions: ["VIEW MEME", "DEPLOY", "ARCHIVE", "CLASSIFIED"],
  cards: [
    { title: "LAUNCH_BUTTON.jpg",   image: "assets/meme-1.webp", caption: "the button. do not press. (press it)" },
    { title: "DEPLOYED.png",        image: "assets/meme-2.webp", caption: "launchpad deployed. inu is proud." },
    { title: "NUMBER_GO_UP.gif",    image: "assets/meme-3.webp", caption: "chart is green. inu is confused." },
    { title: "LAUNCHPAD_37.bmp",    image: "assets/meme-4.webp", caption: "launchpad inside a monitor inside a launchpad" },
    { title: "GOON_GOGGLES.jpg",    image: "assets/meme-5.webp", caption: "vision benchmark: 99.8%. (vibes)" },
    { title: "THE_TOWER.png",       image: "assets/meme-6.webp", caption: "launchpads all the way up" },
    { title: "CAN_DOG.jpg",         image: "assets/meme-7.webp", caption: "tiny inu in a can. no notes." },
    { title: "ROCKETS_FINAL2.png",  image: "assets/meme-8.webp", caption: "rockets_final_FINAL_v2" },
    { title: "SLOT_EMPTY.jpg",      image: null,                 caption: "YOUR MEME HERE. SUBMIT TO THE GOONERS." },
    { title: "SLOT_EMPTY.jpg",      image: null,                 caption: "YOUR MEME HERE. SUBMIT TO THE GOONERS." },
  ],
};

/* ---- Roadmap --------------------------------------------------------------- */
export const ROADMAP = {
  headline: "ROADMAP",
  subline: "DELIBERATELY NOT CORPORATE.",
  phases: [
    { n: 1, title: "Awaken Inu" },
    { n: 2, title: "Discover Launchpad" },
    { n: 3, title: "Launch Launchpad" },
    { n: 4, title: "Launch Launchpad Launchpad" },
    { n: 5, title: "Achieve Recursive Launchpad Singularity" },
    { n: 6, title: "???" },
  ],
};

/* ---- Tokenomics (PLACEHOLDERS — do not invent real figures) --------------- */
export const TOKENOMICS = {
  windowTitle: "TOKENOMICS.exe",
  headline: "TOKENOMICS",
  subline: "NUMBERS ARRIVE WHEN THE INU DECIDES THEY ARRIVE.",
  contract: "0x...",
  rows: [
    { label: "TOTAL SUPPLY", value: "TBD" },
    { label: "CONTRACT",     value: "0x...", copy: true },
    { label: "COMMUNITY",    value: "TBD" },
    { label: "LIQUIDITY",    value: "TBD" },
    { label: "TAX",          value: "TBD" },
    { label: "GOON FUEL",    value: "TBD" },
  ],
  // Donut segments — set `percent` to a number when known; null renders as TBD.
  allocation: [
    { label: "COMMUNITY", percent: null, color: "#19f3ff" },
    { label: "LIQUIDITY", percent: null, color: "#ff3fd0" },
    { label: "GOON FUEL", percent: null, color: "#b45cff" },
  ],
  note: "PLACEHOLDERS ONLY. NOTHING HERE IS A PROMISE, A CLAIM, OR ADVICE.",
  cta: "VIEW TOKENOMICS",
};

/* ---- FAQ ------------------------------------------------------------------- */
export const FAQ = {
  headline: "FAQ",
  subline: "FREQUENTLY ASKED QUESTIONS (BY THE INU, TO THE INU)",
  items: [
    { q: "WHAT IS $ASGI?", a: "A meme coin about a superintelligent Inu that found the launchpad and cannot stop. It is a joke with a mascot." },
    { q: "WHAT IS A LAUNCHPAD?", a: "A place where coins get launched. In the ASGI universe it is also where launchpads get launched. Do not think about it too hard." },
    { q: "IS THIS FINANCIAL ADVICE?", a: "No. It is a dog. Do your own research and never spend money you are not prepared to lose." },
    { q: "WHAT IS THE CONTRACT ADDRESS?", a: "TBD. Only trust the address published in the official channels, and check it twice. Anyone DMing you a different one is not the Inu." },
    { q: "ARE THE NUMBERS ON THE SITE REAL?", a: "No. The mission-control metrics, benchmarks and everything with an infinity sign are fictional and part of the bit." },
    { q: "WHEN MOON?", a: "The Inu does not do timelines. The Inu does launchpads." },
  ],
};

/* ---- Community / final CTA ------------------------------------------------- */
export const COMMUNITY = {
  headline: "THE INU IS STILL LAUNCHING.",
  sub: "SUPERINTELLIGENCE. NATURALLY INU.",
  cta: "JOIN THE GOONERS",
};
