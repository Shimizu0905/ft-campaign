/**
 * CSS/JSファイルにバージョン（タイムスタンプ）を自動付与するスクリプト
 * ビルド後に実行し、キャッシュバスティングを行う
 * また、index.htmlをdistフォルダにコピーする
 */

import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

// バージョン文字列（タイムスタンプ）
const version = Date.now();

// index.htmlをdistにコピー
const srcHtml = resolve(projectRoot, 'index.html');
const distHtml = resolve(projectRoot, 'dist/index.html');

if (existsSync(srcHtml)) {
  copyFileSync(srcHtml, distHtml);
  console.log('📄 index.html を dist/ にコピーしました');
}

// 対象ファイル
const targetFiles = [
  'index.html',
  'dist/index.html'
];

// バージョンを付与するパターン
const patterns = [
  // ローカルのCSS/JSファイル（./assets/で始まるもの）
  {
    regex: /(["']\.\/assets\/(?:css|js)\/[^"']+\.(css|js))(\?v=\d+)?(["'])/g,
    replacement: `$1?v=${version}$4`
  },
  // custom.cssも対象
  {
    regex: /(["']\.\/assets\/css\/custom\.css)(\?v=\d+)?(["'])/g,
    replacement: `$1?v=${version}$3`
  }
];

console.log(`\n🔄 バージョン付与開始: v=${version}\n`);

targetFiles.forEach(file => {
  const filePath = resolve(projectRoot, file);
  
  try {
    let content = readFileSync(filePath, 'utf-8');
    let modified = false;
    
    patterns.forEach(({ regex, replacement }) => {
      const newContent = content.replace(regex, replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });
    
    if (modified) {
      writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ ${file} - バージョン付与完了`);
    } else {
      console.log(`⏭️  ${file} - 変更なし（パターンにマッチせず）`);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`⚠️  ${file} - ファイルが見つかりません（スキップ）`);
    } else {
      console.error(`❌ ${file} - エラー:`, error.message);
    }
  }
});

console.log(`\n✨ バージョン付与完了!\n`);
