/**
 * Optional Google reCAPTCHA v2 (checkbox) site key.
 *
 * Only the SITE key may live on the client — the secret stays on the backend
 * (`backend/.env` → `RECAPTCHA_SECRET`). When the key is empty the contact
 * form skips the widget and relies on the backend's validation + rate limits.
 *
 * `import.meta.env.VITE_RECAPTCHA_SITE_KEY` is inlined at build time.
 */
export const RECAPTCHA_SITE_KEY: string = (import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '').trim();

/** True when the reCAPTCHA widget should be rendered. */
export const isRecaptchaEnabled = (): boolean =>
  RECAPTCHA_SITE_KEY.length > 0 && !RECAPTCHA_SITE_KEY.includes('${');

/**
 * Feature flag for the AI assistant (chat FAB). Defaults to enabled.
 * Set `VITE_ENABLE_AI=false` to hide it entirely.
 */
export const isAIEnabled = (): boolean => false;

/**
 * Feature flag for GitHub stats section. Disabled until GITHUB_TOKEN is configured.
 * GitHub API GraphQL requires authentication token in backend/.env.
 * Set `VITE_ENABLE_GITHUB=true` after adding token to enable.
 */
export const isGithubEnabled = (): boolean => {
  const raw = String(import.meta.env.VITE_ENABLE_GITHUB ?? 'false').trim().toLowerCase();
  return raw === 'true' || raw === '1' || raw === 'on';
};
