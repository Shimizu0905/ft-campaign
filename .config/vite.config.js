import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import { readFileSync, statSync } from 'fs';
import { watch } from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// プロジェクトルート（.config の1つ上 = テーマ直下）
const projectRoot = resolve(__dirname, '..');

// SCSS glob構文を展開する関数
function expandScssGlob(content, filePath) {
  const dir = resolve(filePath, '..');
  let expanded = content;

  // @use "./foundation/**" のようなglob構文を展開
  const globPattern = /@use\s+["']([^"']+\*\*[^"']*)["']/g;
  let match;
  const matches = [];

  while ((match = globPattern.exec(content)) !== null) {
    matches.push(match);
  }

  for (let i = matches.length - 1; i >= 0; i--) {
    match = matches[i];
    const pattern = match[1];
    const fullPattern = resolve(dir, pattern);

    const allMatches = glob.sync(fullPattern.replace(/\\/g, '/'), {
      ignore: ['**/node_modules/**'],
    });

    const files = allMatches.filter((f) => {
      try {
        return statSync(f).isFile() && f.endsWith('.scss');
      } catch {
        return false;
      }
    });

    const indexFiles = files.filter((f) => f.includes('_index'));

    let imports;
    if (indexFiles.length > 0) {
      const indexFile = indexFiles[0];
      const relativePath = indexFile
        .replace(dir + '/', './')
        .replace(/\\/g, '/');
      const pathWithoutExt = relativePath.replace(/\.scss$/, '');
      const dirName = pathWithoutExt.split('/').slice(-2, -1)[0];
      imports = `@use "${pathWithoutExt}" as ${dirName};`;
    } else {
      const otherFiles = files.filter((f) => !f.includes('_index'));
      if (otherFiles.length === 0) {
        console.warn(`globパターン "${pattern}" に一致するSCSSが見つかりません`);
        continue;
      }
      imports = otherFiles
        .map((file) => {
          const relativePath = file
            .replace(dir + '/', './')
            .replace(/\\/g, '/');
          const pathWithoutExt = relativePath.replace(/\.scss$/, '');
          return `@use "${pathWithoutExt}";`;
        })
        .join('\n');
    }

    expanded =
      expanded.substring(0, match.index) +
      imports +
      expanded.substring(match.index + match[0].length);
  }

  return expanded;
}

export default defineConfig({
  // root は指定しない（←これが安定化の要点）

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
    outDir: 'assets',
    emptyOutDir: false,
    manifest: true,
    minify: true,
    rollupOptions: {
      input: {
        // JSだけをentryにする（SCSSはJSからimport）
        script: resolve(projectRoot, 'src/js/script.js'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'css/[name][extname]';
          }
          return '[name][extname]';
        },
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
      },
    },
  },

  server: {
    host: true,
    port: 3000,
    strictPort: true,
    cors: true,
    hmr: { host: 'localhost', port: 3000 },
  },

  plugins: [
    // SCSS glob構文を展開するプラグイン
    {
      name: 'scss-glob',
      load(id) {
        if (!id.endsWith('.scss')) return null;

        try {
          const content = readFileSync(id, 'utf-8');
          if (content.includes('**')) {
            return expandScssGlob(content, id);
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
        const watcher = watch([resolve(projectRoot, '**/*.php')], {
          ignored: /node_modules/,
          persistent: true,
        });

        watcher.on('change', (path) => {
          console.log(`PHPファイル変更検知: ${path}`);
          server.ws.send({ type: 'full-reload' });
        });
      },
    },
  ],
});
