// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 本番URL（canonical / OGP の絶対URL生成に使用）。🔴 独自ドメイン確定後に差し替え
  site: 'https://group-lunch-izuminoyu.vercel.app',
  // Astro 7 で compressHTML の既定が 'jsx'（タグ間の空白を詰める）に変わったため、
  // 見た目を変えないよう v5 までの挙動（true）を明示する
  compressHTML: true,
});
