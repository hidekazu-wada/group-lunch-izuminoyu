// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 本番URL（canonical / OGP の絶対URL生成に使用）。🔴 独自ドメイン確定後に差し替え
  site: 'https://group-lunch-izuminoyu.vercel.app',
});
