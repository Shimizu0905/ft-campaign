import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import cssnano from 'cssnano';
import postcss from 'postcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const cssPath = resolve(projectRoot, 'assets/css/style.css');
const minCssPath = resolve(projectRoot, 'assets/css/min-style.css');

try {
  console.log('CSS圧縮版を作成中...');
  const css = readFileSync(cssPath, 'utf-8');
  
  const result = await postcss([
    cssnano({
      preset: ['default', {
        discardComments: {
          removeAll: true, // すべてのコメントを削除
        },
      }],
    }),
  ]).process(css, { from: cssPath, to: minCssPath });

  writeFileSync(minCssPath, result.css);
  console.log(`✓ CSS圧縮版を作成しました: ${minCssPath}`);
} catch (error) {
  console.error('CSS圧縮エラー:', error);
  process.exit(1);
}

