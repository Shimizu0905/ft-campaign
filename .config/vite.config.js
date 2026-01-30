import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { watch } from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// プロジェクトルート（.config の1つ上 = テーマ直下）
const projectRoot = resolve(__dirname, '..');

export default defineConfig({
  root: projectRoot,
  base: './', // 相対パス化。サブディレクトリ配布でも崩れにくい
  publicDir: 'public', // publicフォルダを指定（デフォルトは'public'）

  css: {
    postcss: resolve(__dirname, 'postcss.config.js'),
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math";`,
      },
    },
  },

  build: {
    outDir: 'dist', // 静的運用ではdistが安全
    emptyOutDir: true, // 古い成果物を削除
    manifest: false, // 静的だけなら不要
    minify: true, // 圧縮を有効化
    rollupOptions: {
      // 複数のエントリーポイントを設定（JSファイルを分割）
      input: {
        main: resolve(projectRoot, 'src/js/main.js'),
        header: resolve(projectRoot, 'src/js/header.js'),
        slider: resolve(projectRoot, 'src/js/slider.js'),
        experience: resolve(projectRoot, 'src/js/experience.js'),
        'crew-slider': resolve(projectRoot, 'src/js/crew-slider.js'),
        'gallery-slider': resolve(projectRoot, 'src/js/gallery-slider.js'),
        faq: resolve(projectRoot, 'src/js/faq.js'),
        'join-accordion': resolve(projectRoot, 'src/js/join-accordion.js'),
        'privacy-modal': resolve(projectRoot, 'src/js/privacy-modal.js'),
        // HTMLもエントリーポイントとして含める
        index: resolve(projectRoot, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name]-[hash].js', // ハッシュ付きで衝突回避
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            // LP用：CSSは1本固定でOK（SCSSはmain.jsから1回だけimport）
            return 'assets/css/style.css';
          }
          // 画像/フォントは衝突回避のためにハッシュ付き推奨
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },

  server: {
    host: true,
    port: 3000,
    strictPort: true,
    cors: true,
    // hmrは削除（ViteデフォルトでOK。LAN越しでスマホ確認する場合は削除が安定）
  },

  plugins: [
    // SCSS glob展開プラグインは削除（Sass公式推奨の@forward方式を使用）

    // HTMLファイルの変更監視とリロード（静的サイト用）
    // root配下のHTMLならViteは普通にHMR/リロード効くことが多いが、
    // 確実性を取るなら残しておく（害は少ない）
    {
      name: 'html-reload',
      configureServer(server) {
        const watcher = watch([resolve(projectRoot, '**/*.html')], {
          ignored: [/node_modules/, /dist/, /assets/],
          persistent: true,
        });

        watcher.on('change', (path) => {
          console.log(`HTMLファイル変更検知: ${path}`);
          server.ws.send({ type: 'full-reload' });
        });
      },
    },
  ],
});
