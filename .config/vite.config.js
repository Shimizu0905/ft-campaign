import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import { readFileSync, statSync } from 'fs';
import { watch } from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// プロジェクトルートへのパス（.configフォルダの親ディレクトリ）
const projectRoot = resolve(__dirname, '..');

// SCSS glob構文を展開する関数
function expandScssGlob(content, filePath) {
  const dir = resolve(filePath, '..');
  let expanded = content;
  
  // @use "./foundation/**" のようなglob構文を展開
  const globPattern = /@use\s+["']([^"']+\*\*[^"']*)["']/g;
  let match;
  const matches = [];
  
  // すべてのマッチを収集
  while ((match = globPattern.exec(content)) !== null) {
    matches.push(match);
  }
  
  // 後ろから前へ置換（インデックスがずれないように）
  for (let i = matches.length - 1; i >= 0; i--) {
    match = matches[i];
    const pattern = match[1];
    const fullPattern = resolve(dir, pattern);
    const allMatches = glob.sync(fullPattern.replace(/\\/g, '/'), {
      ignore: ['**/node_modules/**']
    });
    
    // ファイルのみをフィルタリング（ディレクトリを除外）
    const files = allMatches.filter(f => {
      try {
        return statSync(f).isFile() && f.endsWith('.scss');
      } catch {
        return false;
      }
    });
    
    // _index.scssがある場合は、そのファイルのみをインポート
    const indexFiles = files.filter(f => f.includes('_index'));
    
    let imports;
    if (indexFiles.length > 0) {
      // _index.scssがある場合は、そのファイルのみをインポート
      const indexFile = indexFiles[0];
      const relativePath = indexFile.replace(dir + '/', './').replace(/\\/g, '/');
      const pathWithoutExt = relativePath.replace(/\.scss$/, '');
      // ディレクトリ名を取得（例: ./foundation/_index -> foundation）
      const dirName = pathWithoutExt.split('/').slice(-2, -1)[0];
      imports = `@use "${pathWithoutExt}" as ${dirName};`;
    } else {
      // _index.scssがない場合は、すべてのファイルをインポート
      const otherFiles = files.filter(f => !f.includes('_index'));
      if (otherFiles.length === 0) {
        console.warn(`globパターン "${pattern}" に一致するファイルが見つかりません`);
        continue;
      }
      imports = otherFiles
        .map(file => {
          const relativePath = file.replace(dir + '/', './').replace(/\\/g, '/');
          const pathWithoutExt = relativePath.replace(/\.scss$/, '');
          return `@use "${pathWithoutExt}";`;
        })
        .join('\n');
    }
    
    expanded = expanded.substring(0, match.index) + imports + expanded.substring(match.index + match[0].length);
  }
  
  return expanded;
}

export default defineConfig({
  // ルートディレクトリ
  root: projectRoot,
  
  // PostCSS設定ファイルのパス
  css: {
    postcss: resolve(__dirname, 'postcss.config.js'),
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        // SCSSのグローバル設定
        additionalData: `@use "sass:math";`,
      },
    },
  },
  
  // ビルド設定
  build: {
    outDir: 'assets',
    emptyOutDir: false, // assetsフォルダ内の既存ファイルを保持
    manifest: true,
    minify: false, // 非圧縮版を出力（圧縮版は後で作成）
    rollupOptions: {
      input: {
        style: resolve(projectRoot, 'src/scss/style.scss'), // main → style に変更
        script: resolve(projectRoot, 'src/js/script.js'),
      },
      output: {
        // CSSはassets/cssに出力
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name][extname]';
          }
          return '[name][extname]';
        },
        // JSはassets/jsに出力（script.jsとして出力）
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
      },
    },
  },
  
  // 開発サーバー設定（WordPressローカル環境用）
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    // WordPressのローカルサーバーをプロキシ
    proxy: {
      '/': {
        target: 'http://localhost:8000', // WordPressのローカルサーバーURLに変更してください
        changeOrigin: true,
        secure: false,
      },
    },
    // ファイル変更時のリロード
    watch: {
      usePolling: true,
    },
  },
  
  // プラグイン設定
  plugins: [
    // SCSS glob構文を展開するプラグイン
    {
      name: 'scss-glob',
      load(id) {
        if (!id.endsWith('.scss')) return null;
        
        try {
          const content = readFileSync(id, 'utf-8');
          // glob構文が含まれている場合のみ展開
          if (content.includes('**')) {
            const expanded = expandScssGlob(content, id);
            return expanded;
          }
          return content;
        } catch (error) {
          console.warn(`SCSS glob展開エラー (${id}):`, error.message);
          return null;
        }
      },
      transform(code, id) {
        if (!id.endsWith('.scss')) return null;
        
        try {
          // glob構文が含まれている場合のみ展開
          if (code.includes('**')) {
            const expanded = expandScssGlob(code, id);
            return { code: expanded, map: null };
          }
          return null;
        } catch (error) {
          console.warn(`SCSS glob展開エラー (${id}):`, error.message);
          return null;
        }
      },
    },
    // PHPファイルの変更監視とリロード
    {
      name: 'php-reload',
      configureServer(server) {
        const watcher = watch([
          resolve(projectRoot, '**/*.php'),
        ], {
          ignored: /node_modules/,
          persistent: true,
        });

        watcher.on('change', (path) => {
          console.log(`PHPファイル変更検知: ${path}`);
          // クライアントにリロードを通知
          server.ws.send({
            type: 'full-reload',
          });
        });
      },
    },
  ],
});

