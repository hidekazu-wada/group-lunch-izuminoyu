# いずみの湯 団体昼食LP

西湖畔・最大250名・ひと組貸切。HAMAYOUリゾート Wonder Child Park／日帰り温泉「いずみの湯」の
**団体昼食 問い合わせ獲得**を目的とした単独ページLP（Astro + SCSS）。

- 企画／コピー／デザインの根拠：`企画設計書_…md`／`コピー原稿_…md`／`HANDOFF.md`
- デザイントークン：`src/styles/_design-tokens.scss`（Izuminoyu UI Kit）
- 本文フォント：**Zen Maru Gothic**（Google Fonts）。Noto Serif JP は不使用

## 🧞 コマンド

| Command           | Action                                  |
| :---------------- | :-------------------------------------- |
| `npm install`     | 依存関係のインストール                  |
| `npm run dev`     | 開発サーバー（http://localhost:4321）   |
| `npm run build`   | 本番ビルド（`./dist/`）                 |
| `npm run preview` | ビルドのローカルプレビュー              |

> ※ ビルド時に出る `slash-div` / `global-builtin` / `@import` の DEPRECATION WARNING は
> 既存の `_functions.scss` と Sass の仕様変更予告によるもので、現状は正常に動作します。

## 📁 構成

```
src/
├── consts.ts                  # 🔴 含む全サイト定数を集約（差し替えはまずここ）
├── env.d.ts                   # 環境変数の型
├── pages/index.astro          # ページ本体（各セクションを順に配置）
├── components/
│   ├── layout/
│   │   ├── Head.astro         # meta / OGP / フォント / GA4 / 構造化データ
│   │   ├── CvBar.astro        # スマホ追従CVバー（tablet-up で非表示）
│   │   ├── CtaBand.astro      # 中盤CTAバンド
│   │   └── Footer.astro       # ⑭ フッター
│   └── sections/              # ①〜⑬ 各セクション
│       ├── Hero.astro         # ① ②Scarcity ③UseCases ④Reasons ⑤Venue
│       ├── Menu.astro         # ⑥ ⑦PlusAlpha ⑧Onsen ⑨Pricing ⑩Downloads
│       └── …                  # ⑪Access ⑫Faq ⑬Contact
└── styles/
    ├── _variables / _functions / _mixins / reset（既存）
    ├── _design-tokens.scss    # UIキットのトークン（CSS変数）
    ├── _base / _layout / _components.scss  # グローバル土台・共通UI（c-/l- prefix）
    └── main.scss              # 取りまとめ（import順：変数→関数/mixin→tokens→reset→base/layout/components）
```

- マークアップは **BEM**、スタイルは各 `.astro` の `<style lang="scss">`（スコープド／SP-first）
- 共通UIは `_components.scss`（`c-btn` `c-head` `c-card` `c-tag` `c-ph` `c-figure` `c-stat` …）と
  `_layout.scss`（`l-section` `l-container`）に集約。各セクションはこれらを組み合わせる
- 色運用：ゴールドは CTA/hover/数字アクセント専用、西湖ブルーは自然・水ブロック限定、角は丸く

---

## 🔧 公開前にやること（ID差し込み手順）

確定値は基本 `src/consts.ts` を編集すれば全体へ反映されます。
**Formspree と GA4 の ID だけは環境変数**から読み込みます。

### 1. 環境変数（`.env`）

`.env.example` を `.env` にコピーして値を入れてください。

```sh
cp .env.example .env
```

```dotenv
# GA4 Measurement ID（例: G-ABCDE12345）
PUBLIC_GA4_ID=

# Formspree フォームID（https://formspree.io/ で発行。URL "https://formspree.io/f/abcd1234" の "abcd1234"）
PUBLIC_FORMSPREE_ID=
```

- 未設定時は `src/consts.ts` のダミー（GA4=`G-XXXXXXXXXX` / Formspree=`xxxxxxxx`）にフォールバックします。
- 値を入れたら `npm run build`（または `npm run dev`）で反映。

### 2. Formspree（問い合わせフォーム）

1. Formspree で新規フォームを作成し、フォームID（`f/` 以降）を取得
2. `.env` の `PUBLIC_FORMSPREE_ID` に設定
3. 送信は `src/components/sections/Contact.astro` 内の JS が `fetch` で非同期POST →
   成功時に GA4 `form_submit` 計測＋インラインのサンクス表示。スパム対策の **honeypot（`_gotcha`）** 実装済み
4. フォールバックのメール（`mailto:`）は `consts.ts` の `email` を使用（🔴 末尾ドメイン要確定）

### 3. GA4（計測）

- `src/components/layout/Head.astro` に gtag スニペット実装済み（`PUBLIC_GA4_ID` を使用）
- 計測イベント：
  - `tel_tap` … 電話リンクのタップ（FV・中盤バンド・問い合わせ・フッター・スマホCVバーの計5箇所）
  - `form_submit` … 問い合わせ送信成功
  - `pdf_download` … ⑩資料DLの原材料表／アレルギー対応表
- 仕組み：`data-ga-event="…"`（任意で `data-ga-label="…"`）を持つ要素のクリックを Head 内の
  デリゲーションで一括計測。CTAを増やすときは同属性を付けるだけでOK

---

## 🔴 残プレースホルダ一覧（確定後に差し替え）

差し替え先は原則 `src/consts.ts`。各セクションのソースには `<!-- 🔴 … -->` コメントを残しています。

| 区分 | 内容 | ダミー値 | 差し替え場所 |
| :-- | :-- | :-- | :-- |
| 人数下限 | 利用人数の下限 | `20`名 | `consts.ts: capacityMin`（⑨Pricing・⑫Faq・⑬フォーム説明に波及） |
| 時間帯 | 提供可能時間帯／営業時間 | `10:00〜17:00` | `consts.ts: openHours`（⑨⑪） |
| 営業日 | 営業日 | `通年（不定休）` | `consts.ts: openDays`（⑨⑪） |
| 電話受付 | 電話受付時間 | `受付時間 9:00〜18:00` | `consts.ts: telReception`（⑬） |
| メール | 末尾ドメイン | `…@hamayouresort.jp` | `consts.ts: email / emailHref`（⑬・⑭） |
| 入浴 | 団体入浴料金・タオル | 文言で「確定しだいご案内」 | ⑧ `Onsen.astro`（確定後に追記） |
| PDF | 原材料表／アレルギー対応表 | `/docs/ingredients.pdf` `/docs/allergy.pdf` | `public/docs/` に設置＋`consts.ts` |
| FORM_ID | Formspree | `xxxxxxxx` | `.env: PUBLIC_FORMSPREE_ID` |
| GA4 ID | Measurement ID | `G-XXXXXXXXXX` | `.env: PUBLIC_GA4_ID` |
| 写真 | 料理3種（⑥） | プレースホルダ箱表示 | `public/images/flyer/` に設置し⑥`Menu.astro`を画像へ差し替え |
| 写真 | その他本番写真 | フライヤー流用の仮素材 | `public/images/flyer/`（同名で差し替え推奨） |
| 動画（任意） | イメージ動画URL | 未実装 | ①or⑦に埋め込み可 |

> ⑥お食事メニューは料理写真が未支給のため、各カードに「料理写真（準備中）」のプレースホルダ箱を
> 表示しています（本番写真到着後に `Menu.astro` の `c-ph` を `<img>` へ差し替え）。

### 画像（仮素材）について

`public/images/flyer/` はフライヤーPDFからの流用仮素材です（`public/images/flyer/README.md` 参照）。
帯の写り込み・見切れがあるため、本番写真ができ次第 **同名で差し替え** が推奨です。

---

## ✅ 実装メモ

- 公開形態：単独ページ（`index`）
- CTA動線：FV・中盤・最後＋スマホ追従CVバー。電話 `tel:070-1318-2837` ／ フォーム（`#contact`）
- アクセス地図：Googleマップ埋め込み（APIキー不要の住所クエリ）。住所＝〒401-0332 西湖987
- 企画書の社内事情（割引・赤字など ⚠️）は LP表面に一切出していません
