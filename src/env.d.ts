/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** GA4 Measurement ID（🔴 未発行時は consts.ts でダミーにフォールバック） */
  readonly PUBLIC_GA4_ID?: string;
  /** Formspree フォームID（🔴 未発行時は consts.ts でダミーにフォールバック） */
  readonly PUBLIC_FORMSPREE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
