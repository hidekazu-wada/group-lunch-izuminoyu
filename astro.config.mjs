// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 本番URL（canonical / OGP の絶対URL生成に使用）。🔴 独自ドメイン確定後に差し替え
  site: 'https://group-lunch-izuminoyu.vercel.app',
  // Astro 7 で compressHTML の既定が 'jsx'（タグ間の空白を詰める）に変わったため、
  // 見た目を変えないよう v5 までの挙動（true）を明示する
  compressHTML: true,
  // Astro 7（Vite 8）は CSS の既定の対象を Safari 16.4 以上に上げ、メディアクエリを範囲構文で出すため、
  // iOS 16.4 未満でも崩れないよう v5 までと同じ対象に戻す（build.target は Astro と競合するので触らない）
  vite: {
    build: {
      cssTarget: ['edge88', 'firefox78', 'chrome87', 'safari14'],
    },
  },
});
