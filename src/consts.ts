// =============================================================
// サイト共通定数 ／ 🔴 = 未確定（ダミー値）。確定後はここを差し替える
// 環境変数（PUBLIC_*）が設定されていればそれを優先し、無ければダミーにフォールバック
// =============================================================

const env = import.meta.env;

// 🔴 Formspree FORM_ID 未発行（ダミー）。環境変数 PUBLIC_FORMSPREE_ID で差し替え
const FORMSPREE_ID = env.PUBLIC_FORMSPREE_ID ?? 'xxxxxxxx';

export const SITE = {
  // --- 施設・会社 ---
  facility: 'HAMAYOUリゾート Wonder Child Park ／ 日帰り温泉 いずみの湯',
  company: '株式会社HAMAYOUリゾート',

  // --- 連絡先 ---
  tel: '070-1318-2837',
  telHref: 'tel:070-1318-2837',
  telReception: '受付時間 9:00〜18:00', // 🔴 電話受付時間 未確定（ダミー）

  // 🔴 メール末尾ドメイン未確定（ダミー）。確定後 .jp を正式表記へ
  email: 'izuminoyu@hamayouresort.jp',
  emailHref: 'mailto:izuminoyu@hamayouresort.jp', // 🔴 末尾ドメイン未確定

  // --- 住所・地図 ---
  zip: '401-0332',
  address: '山梨県南都留郡富士河口湖町西湖987',
  // APIキー不要の埋め込み（住所クエリ）。本番は正式な埋め込みURLに差し替え可
  mapEmbedSrc:
    'https://maps.google.com/maps?q=' +
    encodeURIComponent('山梨県南都留郡富士河口湖町西湖987') +
    '&z=15&hl=ja&output=embed',
  // 現在地からいずみの湯までの経路案内（origin省略＝現在地起点。スマホはマップアプリでルート起動）
  mapLink:
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent('山梨県南都留郡富士河口湖町西湖987'),
  // 🔴 アクセス経路の目安 未確定（ダミー）。大型バス手配者向けの高速経路目安
  accessRoute: '中央自動車道・河口湖ICから約25分（西湖方面）',

  // --- 規模・条件 ---
  capacityMax: 250,
  capacityMin: 20, // 🔴 利用人数の下限 未確定（ダミー）
  busCount: 6,
  siteAreaSqm: 1800,
  openHours: '10:00〜17:00', // 🔴 提供可能時間帯・営業日 未確定（ダミー）
  openDays: '通年（不定休）', // 🔴 営業日 未確定（ダミー）

  // --- フォーム（Formspree） ---
  formspreeId: FORMSPREE_ID,
  formspreeAction: `https://formspree.io/f/${FORMSPREE_ID}`,

  // --- 計測（GA4） ---
  // 🔴 Measurement ID 未発行（ダミー）。環境変数 PUBLIC_GA4_ID で差し替え
  ga4Id: env.PUBLIC_GA4_ID ?? 'G-XXXXXXXXXX',

  // --- 資料DL（🔴 PDF未用意：空文字＝「準備中」表示。確定後に public/docs/ のパスを入れると自動で有効化） ---
  ingredientsPdf: '', // 🔴 原材料表PDF 未用意。例: '/docs/ingredients.pdf'
  allergyPdf: '', // 🔴 アレルギー対応表PDF 未用意。例: '/docs/allergy.pdf'
} as const;

// SEO 既定値
export const SEO = {
  title: 'いずみの湯 団体昼食｜西湖畔・最大250名・ひと組貸切（HAMAYOUリゾート）',
  description:
    '団体250名まで貸切。大型バス6台・温泉併設・アレルギー対応。河口湖／西湖の団体昼食処。立寄り昼食・教育旅行・チェックアウト後の食事手配をまるごとサポートします。',
  siteName: 'いずみの湯 団体昼食（HAMAYOUリゾート）',
  // 🔴 公開準備中は true（検索エンジンにインデックスさせない）。一般公開のタイミングで false にする
  noindex: true,
  // OGP画像は Head.astro で src/assets のヒーロー画像から getImage で生成（このパスは未使用）
} as const;
