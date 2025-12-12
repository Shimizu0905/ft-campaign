import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { minify } from 'terser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const scriptPath = resolve(projectRoot, 'assets/js/script.js');
const minScriptPath = resolve(projectRoot, 'assets/js/min-script.js');

try {
  console.log('圧縮版を作成中...');
  const code = readFileSync(scriptPath, 'utf-8');
  
  const result = await minify(code, {
    compress: {
      drop_console: false, // console.logを保持
      drop_debugger: true,
    },
    format: {
      comments: false, // コメントを削除
    },
    mangle: {
      reserved: ['jQuery', '$'], // jQueryと$を保護
    },
  });

  if (result.error) {
    throw result.error;
  }

  writeFileSync(minScriptPath, result.code);
  console.log(`✓ 圧縮版を作成しました: ${minScriptPath}`);
} catch (error) {
  console.error('圧縮エラー:', error);
  process.exit(1);
}

