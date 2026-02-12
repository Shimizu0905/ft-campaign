# WordPress FLOCSS Theme with Vite

WordPressテーマ用のFLOCSSアーキテクチャとViteを使用した開発環境テンプレートです。

## 環境

- Node.js: 20.11.0（Volta推奨）
- npm: 10.2.4
- Vite: 5.0.0
- Sass: 1.69.0

## セットアップ

```bash
# 依存パッケージのインストール
npm install
```

## 使い方

### 開発サーバーの起動

```bash
npm run dev
```

開発サーバーが起動します（デフォルト: http://localhost:3000）

### ビルド

```bash
npm run build
```

本番用にビルドします。`dist/`ディレクトリに成果物が出力されます。

### CSS/SCSSのリント

```bash
# リントチェック
npm run lint:css

# 自動修正
npm run lint:css:fix
```

## ディレクトリ構造

```
├── .config/          # 設定ファイル（Vite、PostCSS、Stylelint）
├── dist/             # ビルド成果物（gitignore対象）
├── public/           # 静的ファイル（画像など）
├── scripts/          # ビルドスクリプト
└── src/
    ├── js/           # JavaScriptファイル
    └── scss/         # SCSSファイル（FLOCSS構成）
        ├── foundation/  # リセット、変数、関数、ミックスイン
        ├── layout/      # レイアウト
        └── object/      # コンポーネント、プロジェクト、ユーティリティ
            ├── component/  # 再利用可能なコンポーネント
            ├── project/    # プロジェクト固有のスタイル
            │   └── pages/  # ページ固有のスタイル
            └── utility/    # ユーティリティクラス
```

## FLOCSS構成

このテンプレートはFLOCSS（Foundation, Layout, Object）アーキテクチャに基づいています。

- **Foundation**: リセットCSS、変数、関数、ミックスイン
- **Layout**: ページレイアウト
- **Object**: 
  - **Component**: 再利用可能なコンポーネント（`c-`プレフィックス）
  - **Project**: プロジェクト固有のスタイル（`p-`プレフィックス）
  - **Utility**: ユーティリティクラス（`u-`プレフィックス）

## 特徴

- ✅ Viteによる高速なビルド
- ✅ FLOCSSアーキテクチャによる保守性の高いSCSS構成
- ✅ 複数ページ対応のSCSS構造
- ✅ Sassモジュールシステム（`@use`、`@forward`）を使用
- ✅ 自動リント・フォーマット（Stylelint）
- ✅ レスポンシブ対応のミックスイン
- ✅ 最新のSass APIを使用（非推奨警告なし）

## 注意事項

- `dist/`ディレクトリはビルドで生成されるため、gitignore対象です
- 画像は`public/assets/images/`に配置してください
- SCSSファイルは`src/scss/`内で編集してください
