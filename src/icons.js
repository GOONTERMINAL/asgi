/* Inline SVG icons (no icon-font / no extra requests). */

export const ROCKET = `<svg viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 1c4 4 6 10 6 17v10H6V18C6 11 8 5 12 1z" fill="#fff"/><path d="M12 1c4 4 6 10 6 17h-6z" fill="#e6d6ff"/><circle cx="12" cy="15" r="3.2" fill="#19f3ff" stroke="#0a2a5a" stroke-width="1"/><path d="M6 22l-5 8v5l5-3zM18 22l5 8v5l-5-3z" fill="#ff3fd0"/><path d="M8 29h8l-4 10z" fill="#ffd23f"/><path d="M10 29h4l-2 6z" fill="#fff"/></svg>`;

export const PILL = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="rotate(-45 16 16)"><rect x="3" y="10" width="26" height="12" rx="6" fill="#19f3ff" stroke="#053a55" stroke-width="1.5"/><path d="M16 10h7a6 6 0 010 12h-7z" fill="#ff3fd0" stroke="#053a55" stroke-width="1.5"/><rect x="6" y="12" width="9" height="2.5" rx="1.2" fill="#fff" opacity=".6"/></g></svg>`;

export const ARROW_UR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" aria-hidden="true"><path d="M6 18L18 6M8 6h10v10"/></svg>`;
export const ARROW_R = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>`;

const S = 'viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
export const TILE_ICONS = {
  rocket: `<svg ${S}><path d="M24 4c7 6 9 15 9 24H15c0-9 2-18 9-24z"/><circle cx="24" cy="18" r="3.5"/><path d="M15 26l-7 9 7-2M33 26l7 9-7-2M20 33l4 10 4-10"/></svg>`,
  chart: `<svg ${S}><path d="M6 42h36"/><rect x="8" y="28" width="7" height="12" fill="currentColor"/><rect x="20" y="20" width="7" height="20" fill="currentColor"/><rect x="32" y="12" width="7" height="28" fill="currentColor"/><path d="M8 20l10-8 8 5 14-11M32 6h8v8"/></svg>`,
  people: `<svg ${S}><circle cx="17" cy="15" r="6" fill="currentColor"/><circle cx="33" cy="17" r="5" fill="currentColor"/><path d="M5 40c0-8 6-13 12-13s12 5 12 13zM30 30c6-2 13 2 13 10h-9" fill="currentColor"/></svg>`,
  globe: `<svg ${S}><circle cx="24" cy="24" r="18"/><ellipse cx="24" cy="24" rx="8" ry="18"/><path d="M6 24h36M9 14h30M9 34h30"/></svg>`,
};

const B = 'viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"';
export const SOCIAL_ICONS = {
  x: `<svg ${B}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  telegram: `<svg ${B}><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>`,
  discord: `<svg ${B}><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  youtube: `<svg ${B}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
};
