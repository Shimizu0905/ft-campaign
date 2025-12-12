# Gulp から Vite への移行ガイド

## 📋 移行内容

このプロジェクトを Gulp から Vite に移行しました。

## 🚀 セットアップ手順

### 1. 依存関係のインストール

プロジェクトルートで以下を実行：

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

Vite の開発サーバーが起動します（http://localhost:3000）

### 3. ビルド（本番用）

```bash
npm run build
```

`assets/css/style.css`と`assets/js/script.js`が生成されます。

### 4. 画像最適化

```bash
npm run optimize-images
```

`src/images/`内の画像を最適化して`assets/images/`に出力します。

## ⚙️ 設定ファイル

### vite.config.js

- Vite のメイン設定ファイル
- SCSS の glob 構文（`@use "./foundation/**"`）を自動展開
- WordPress ローカルサーバーへのプロキシ設定
- PHP ファイルの変更監視と自動リロード機能

### postcss.config.js

- Autoprefixer の設定

### package.json

- スクリプトと依存関係の定義

## 📁 ファイル構成

```
プロジェクトルート/
├── vite.config.js          # Vite設定
├── postcss.config.js        # PostCSS設定
├── package.json             # 依存関係
├── scripts/
│   └── optimize-images.js  # 画像最適化スクリプト
├── src/
│   ├── scss/
│   │   └── style.scss       # メインSCSS（glob構文使用可能）
│   ├── js/
│   │   └── script.js        # JavaScript
│   └── images/              # 元画像
└── assets/                  # ビルド出力先
    ├── css/
    ├── js/
    └── images/
```

## 🔄 Gulp との違い

### Gulp

- タスクランナー
- プラグインで機能拡張
- 設定が複雑になりやすい

### Vite

- ビルドツール（Rollup ベース）
- 高速な HMR（Hot Module Replacement）
- 設定がシンプル
- モダンな開発体験

## ⚠️ 注意事項

1. **WordPress ローカルサーバーの URL**

   - `vite.config.js`の`server.proxy`で WordPress のローカルサーバー URL を設定してください
   - デフォルト: `http://localhost:8000`

2. **SCSS glob 構文**

   - `@use "./foundation/**"`のような glob 構文が使用可能です
   - Vite プラグインで自動展開されます

3. **画像最適化**

   - Gulp の`imagemin`タスクは`npm run optimize-images`に置き換えました
   - 開発中は手動で実行してください

4. **PHP ファイルの変更監視**
   - PHP ファイルを変更すると、自動的にブラウザがリロードされます
   - Gulp の BrowserSync と同様の機能を実装しています

## 🎯 主なコマンド

| コマンド                  | 説明                         |
| ------------------------- | ---------------------------- |
| `npm run dev`             | 開発サーバー起動（HMR 有効） |
| `npm run build`           | 本番用ビルド                 |
| `npm run preview`         | ビルド結果のプレビュー       |
| `npm run optimize-images` | 画像最適化                   |

## 📝 移行チェックリスト

- [x] Vite 設定ファイル作成
- [x] package.json 更新
- [x] PostCSS 設定追加
- [x] 画像最適化スクリプト作成
- [x] SCSS glob 構文対応
- [x] PHP ファイルの変更監視機能追加
- [x] Gulp フォルダの削除
- [ ] WordPress ローカルサーバー URL 設定
- [ ] 動作確認

## ✅ 移行完了

Gulp から Vite への移行が完了しました。`gulp`フォルダは削除され、すべての機能が Vite で実装されています。

## 🔗 参考リンク

- [Vite 公式ドキュメント](https://vitejs.dev/)
- [Sass 公式ドキュメント](https://sass-lang.com/)
- [PostCSS 公式ドキュメント](https://postcss.org/)
