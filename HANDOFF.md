# 実装引き継ぎ資料（Claude Code 向け）

いずみの湯 団体昼食LP ／ 企画フェーズ完了 → 実装フェーズへ
*作成: 2026-06-02*

このファイルは「企画・デザイン・コピーが確定したLPを、Astroで実装する」ための指示書です。
**まず下記の参照ドキュメントを読み込んでから着手してください。**

---

## 0. 参照ドキュメント（必読・このリポジトリ内）

1. `企画設計書_いずみの湯_団体昼食LP.md` … 企画全体（v0.7）。背景・ターゲット・料金・構成の根拠
2. `コピー原稿_いずみの湯_団体昼食LP.md` … LP全14セクションの**確定コピー**（v1.0）。文言はこれをそのまま使う
3. `src/styles/_design-tokens.scss` … **Izuminoyu UI Kit** のデザイントークン（色/タイポ/角丸/余白/モーション）
4. `public/images/flyer/README.md` … 流用画像（仮placeholder）の一覧
5. `CLAUDE.md` … SCSS規約・mixin・px→vw関数・ディレクトリ構成

> ⚠️ `企画設計書` 内の ⚠️印（社内事情・赤字/割引の背景）は**LP表面に出さない**。

---

## 1. ゴールと確定方針

- **目的**：団体予約の**問い合わせ獲得**（個人向けではない）
- **公開形態**：**単独ページ** → `src/pages/index.astro`
- **問い合わせフォーム**：**送信フォーム（Formspree 等）**で実装（§5）
- **計測**：**GA4 を導入**（§6）
- **写真**：**フライヤー流用の仮素材**（`public/images/flyer/`）で組み、本番は公開後に随時差し替え
- **フォント**：本文は **Zen Maru Gothic**（丸ゴシック）に変更。※CLAUDE.md既定の Noto Serif JP は本LPでは不使用
- **景観**：富士山は控えめ、**西湖（湖）の景観を主役**に（現場意向）

---

## 2. デザインシステム適用ルール

`_design-tokens.scss` を読み込み、CSSカスタムプロパティで全体を統一。

- **インポート順**（CLAUDE.md準拠）：変数 → 関数/mixin → `_design-tokens` → reset → 各スタイル
- **カラー運用**：
  - 茶 `--main_color_1 #7c6351`＝本文・ロゴ・電話番号
  - ゴールド `--main_color_2 #d6b156`＝**hover・CTAハイライト専用**（多用しない）
  - クリーム `--main_color_3 #f1eae4`＝明るい背景・茶背景上の文字
  - 西湖ブルー `--blue_1 #5a8aad`＝**リード／自然・水のブロック限定**
  - ページ背景 `--surface-page #f0f0f0`
- **タイポ**：`--font-base`（Zen Maru Gothic）。サイズは `--fs-*`（clamp）。`--lh-*` / `--ls-*`
  - フォント読込：`<head>` に Google Fonts
    `https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=swap`
- **シェイプ**：角は丸く（card 20 / tag 30 / filter 40 / pill 9999）。影 `--shadow-soft/-card`
- **余白**：`--space-1..8`（8の倍数）
- **モーション**：`--ease-soft` / `--dur-*`
- **レスポンシブ**：CLAUDE.mdの `@include tablet-up` / `desktop-up`、px→vw（ppx/tpx/spx）を併用可。型はトークンの clamp() を優先
- **アクセシビリティ**：シニア手配者も読む前提で文字大きめ・高コントラスト

---

## 3. ファイル構成（提案）

```
src/
├── pages/
│   └── index.astro              # ページ本体（各セクションを順に配置）
├── components/
│   ├── layout/
│   │   ├── Head.astro           # meta/OGP/GA4/フォント
│   │   ├── CvBar.astro          # スマホ追従CVバー（電話/フォーム）
│   │   └── Footer.astro
│   └── sections/
│       ├── Hero.astro           # ①
│       ├── Scarcity.astro       # ②
│       ├── UseCases.astro       # ③ 3パターン
│       ├── Reasons.astro        # ④ 選ばれる理由
│       ├── Venue.astro          # ⑤ 会場・設備
│       ├── Menu.astro           # ⑥ メニュー
│       ├── PlusAlpha.astro      # ⑦ 休憩・体験
│       ├── Onsen.astro          # ⑧ 温泉・お土産
│       ├── Pricing.astro        # ⑨ ご利用案内・料金
│       ├── Downloads.astro      # ⑩ 資料DL
│       ├── Access.astro         # ⑪ アクセス（地図）
│       ├── Faq.astro            # ⑫ FAQ
│       └── Contact.astro        # ⑬ 問い合わせ（フォーム）
└── styles/
    ├── _variables.scss / _functions.scss / _mixins.scss / reset.scss（既存）
    ├── _design-tokens.scss（取込済み）
    └── main.scss
```

---

## 4. セクション実装一覧

各セクションの**文言はコピー原稿をそのまま**。画像は下記を割当（仮）。

| # | セクション | 主な要素 | 画像（仮） |
|---|---|---|---|
| ① | Hero | メイン「団体250名を、ひと組貸切で。／西湖のほとりの、貸切ランチ処。」要点帯・CTA2つ | `hero_saiko_lakeside.png` |
| ② | Scarcity | 「団体が一度に入れる場所」希少性・250名/1,800㎡を大きく | `facility_3_group_lakeside.png` |
| ③ | UseCases | 3パターン（立寄/CO後/入替受け皿）カード | アイコン |
| ④ | Reasons | 強み6点（貸切250名/西湖/温泉/手ぶら/雨天/体験） | facility各種 |
| ⑤ | Venue | 1,800㎡/ゆのわ堂/炊事場(伏流水)/トイレ・設備リスト | `facilities_strip.png` ほか |
| ⑥ | Menu | カレー¥1,100/牛丼¥1,100/ほうとう¥1,400(税込)＋貸切¥500/名・アレルギー注記 | **料理写真なし→placeholderボックス** |
| ⑦ | PlusAlpha | 体験（モルック/クニマス/樹海/カヌー・SUP/キャンプファイア） | `activity_1..3` / `rec_field_strip` |
| ⑧ | Onsen | 食事→そのまま入浴・お土産 | `facility_5_onsen_bath.png` |
| ⑨ | Pricing | 料金表（休憩¥800・体験/食事¥500・延長¥400）＋例1,600円・利用条件 | — |
| ⑩ | Downloads | 原材料表/アレルギー表PDF（🔴未用意） | — |
| ⑪ | Access | 〒401-0332 西湖987・Googleマップ・バス6台 | `facility_1_bus_parking.png` |
| ⑫ | FAQ | 人数/バス/雨天/アレルギー/温泉/予約 | — |
| ⑬ | Contact | フォーム＋電話・予約3ステップ | — |

CV動線：CTA（電話 `tel:070-1318-2837` ／ フォーム）を **FV・中盤・最後**に固定＋**スマホ追従CVバー**。ゴールドを主ボタンhoverに。

---

## 5. 問い合わせフォーム（Formspree）

- 送信先：Formspree エンドポイント `https://formspree.io/f/🔴FORM_ID`（要発行・環境変数 `PUBLIC_FORMSPREE_ID` 推奨）
- 項目（団体予約の見積りに必要十分）：
  - 団体名・ご担当者名（必須）
  - 連絡先（電話／メール）（必須）
  - 希望日・時間帯
  - 予定人数（必須）
  - 利用内容（昼食／温泉／休憩／体験 …複数選択）
  - ご希望メニュー（カレー/牛丼/ほうとう）
  - アレルギー・ご要望（自由記述）
- 送信後：サンクス表示（インライン or `/thanks`）。バリデーション・**honeypotでスパム対策**
- フォールバック：`mailto:izuminoyu@hamayouresort.🔴` も併記（末尾ドメイン要確認）

---

## 6. 計測（GA4）

- `Head.astro` に gtag スニペット。Measurement ID は `🔴G-XXXXXXX`（環境変数 `PUBLIC_GA4_ID` 推奨）
- イベント計測：
  - `tel_tap`（電話リンクのクリック）
  - `form_submit`（問い合わせ送信成功）
  - `pdf_download`（原材料表/アレルギー表）
- CV＝`form_submit` ＋ `tel_tap` を主要指標に

---

## 7. SEO / OGP

- `<title>` 例：いずみの湯 団体昼食｜西湖畔・最大250名・ひと組貸切（HAMAYOUリゾート）
- meta description：団体250名まで貸切。大型バス6台・温泉併設・アレルギー対応。河口湖/西湖の団体昼食処
- OGP/Twitterカード：ヒーロー画像＋「西湖・貸切250名・温泉併設」
- 画像 `alt` 必須。構造化データ `LocalBusiness`（住所/電話/地図）は任意で加点
- 住所：〒401-0332 山梨県南都留郡富士河口湖町西湖987

---

## 8. 🔴 残プレースホルダ（実装はダミーで進め、確定後に差し替え）

- 利用人数の下限・上限（FV/⑨/⑫/フォーム）
- 営業日・提供可能時間帯・電話受付時間
- メールアドレス末尾ドメイン `izuminoyu@hamayouresort.🔴`
- 団体入浴料金・タオル（⑧）
- 原材料表PDF・アレルギー対応表PDF（⑩）
- Formspree FORM_ID（§5）／ GA4 Measurement ID（§6）
- イメージ動画URL（任意・①or⑦に埋め込み）
- 本番写真（料理3種ほか）

---

## 9. 受入基準（Definition of Done）

- [ ] 14セクションがコピー原稿どおりに実装され、トークン（色/型/角丸/余白）が適用されている
- [ ] FV・中盤・最後にCTA、スマホで追従CVバーが動作
- [ ] 電話 `tel:` タップ発信、フォーム送信（Formspree）が動作し、GA4イベントが飛ぶ
- [ ] スマホ/タブレット/PCでレイアウト崩れなし（tablet-up/desktop-up）
- [ ] Googleマップ（西湖987）が表示、住所・電話が正しい
- [ ] OGP/title/description/alt 設定済み
- [ ] 🔴箇所はダミー値で組み、差し替え箇所がコメントで明示されている
- [ ] `npm run build` が通る

---

## 10. 開発コマンド

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
npm run preview
```

---

*この資料・コピー原稿・トークンに沿えば、確定情報だけで実装着手できます。🔴は後日差し替え前提でダミー実装してください。*
