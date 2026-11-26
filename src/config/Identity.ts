/**
 * Identity / branding — the single source of truth for who the site is about.
 *
 * Values are mirrored from the previous frontend's `src/config/Identity.ts`.
 *
 * This module is intentionally PURE (no `import.meta.env`) so it can also be
 * imported from `vite.config.ts` (which generates the <head>, sitemap.xml and
 * robots.txt at build time).
 */

/**
 * The name used everywhere in the UI, metadata and navigation is simply
 * "Maskani". The legal / real name is intentionally NOT used as a display name;
 * it only appears in the About section, inside the résumé PDFs, and — for
 * machine-readable identity only — in structured data.
 */
export const BRAND_NAME = 'Maskani';

/** Public display name. This is the name shown to visitors. */
export const OWNER_NAME = 'Maskani';

/** Legal name. Rendered ONLY in the About section and in structured data. */
export const LEGAL_NAME = 'Maskani';

/** Owner's online alias / handle (without the leading @). */
export const OWNER_ALIAS = 'Maskani';

/** Job title / role. */
export const JOB_TITLE = 'QA Manual Tester & Junior IT Support';

/** Short headline / tagline used in metadata. */
export const HEADLINE =
  'Software Quality Assurance and Junior IT Support & Network Support. Testing, tracing, and resolving issues, from application bugs to network faults.';

/** Years of professional experience. */
export const YEARS_OF_EXPERIENCE = 0;

/**
 * Number of satisfied clients, shown in the hero quick-facts row.
 * Rounded down on purpose: the hero renders it as `${CLIENTS_SATISFIED}+`.
 */
export const CLIENTS_SATISFIED = 0;

/** Country of origin / operation. */
export const COUNTRY = 'Indonesia';
export const COUNTRY_CODE = 'ID';

/** Spoken languages. */
export const LANGUAGES = ['Bahasa Indonesia', 'English'];

/** Founder of the company below — used for credentials and "known as". */
export const FOUNDER_OF = '';

/** Public contact email. */
export const CONTACT_EMAIL = 'maskani180104@gmail.com';
/** Secondary / business email. */
export const BUSINESS_EMAIL = 'maskani180104@gmail.com';

/** Public phone (E.164). */
export const CONTACT_PHONE = '+62 895-1013-4186';
/** WhatsApp number without the "+" (for wa.me links). */
export const WHATSAPP_NUMBER = '6289510134186';

/** X / Twitter handle. */
export const TWITTER_HANDLE = '';

/**
 * Canonical Google Analytics 4 measurement ID.
 *
 * This is the DEFAULT the site ships with. It is overridable per build by
 * setting `VITE_GA_ID` (see `.env.example`) — useful for staging or for
 * turning analytics off entirely without a code change — but it is no longer
 * inert: the value is injected into `<head>` by `src/config/Seo.ts` and loaded
 * by `src/lib/analytics.ts`. Set `VITE_GA_ID=` to an empty string to disable.
 */
export const GA_MEASUREMENT_ID = '';

/** Canonical site origin (no trailing slash). */
export const SITE_ORIGIN = 'https://maskani.my.id';

/** Social profile URLs. */
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/m_skn18',
  linkedin: 'https://www.linkedin.com/in/mas-kani18',
  github: 'https://github.com/Maskani18',
  tiktok: 'https://www.tiktok.com/@maskani18',
  youtube: 'https://www.youtube.com/@maskani18',
  threads: 'https://threads.net/@maskani18',
} as const;

/** GitHub username. */
export const GITHUB_USERNAME = 'Maskani18';

/** WakaTime username — not used (no data). */
export const WAKATIME_USERNAME = '';

/** Timezone used by the footer clock. */
export const TIMEZONE = 'Asia/Jakarta';
export const TIMEZONE_LABEL = 'WIB';

/** Resume PDF paths (served from /public). */
export const RESUME = {
  qa: '/cv/CV_Maskani_Quality_Assurance.pdf',
  it: '/cv/CV_Maskani_IT_Support.pdf',
  /** Legacy: kept for backward compat, points to QA */
  creativeEn: '/cv/CV_Maskani_Quality_Assurance.pdf',
  creativeId: '/cv/CV_Maskani_Quality_Assurance.pdf',
  atsEn: '/cv/CV_Maskani_Quality_Assurance.pdf',
  atsId: '/cv/CV_Maskani_IT_Support.pdf',
} as const;

/** Portrait image path. */
export const PORTRAIT_IMAGE = '/icon.webp';

/** Company / business brand details. */
export const COMPANY = {
  name: '',
  url: '',
  aiUrl: '',
  educationUrl: '',
  marketplaceUrl: '',
  templatesUrl: '',
  image: '',
} as const;

/** Build a wa.me link for the configured number. */
export const whatsappUrl = (message?: string): string => {
  const base = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/** Build a mailto: link. */
export const mailtoUrl = (email: string = CONTACT_EMAIL): string => `mailto:${email}`;
