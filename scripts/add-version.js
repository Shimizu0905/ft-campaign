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

  // dist/index.html: 開発用パスを本番用に書き換え + CSS linkタグ追加
  let distContent = readFileSync(distHtml, 'utf-8');

  // /src/js/main.js → ./assets/js/main.js?v=バージョン に変更
  distContent = distContent.replace(
    /(<script type="module" src=")\/src\/js\/main\.js(\?v=\d+)?(")/g,
    `$1./assets/js/main.js?v=${version}$3`
  );

  // CSS linkタグが無ければ追加、あれば既存のバージョン番号を更新（scriptタグの直前に）
  if (!distContent.includes('./assets/css/style.css')) {
    // scriptタグ（バージョン番号付きも含む）の直前にCSS linkタグを追加
    distContent = distContent.replace(
      /(<script type="module" src="\.\/assets\/js\/main\.js(?:\?v=\d+)?")/,
      `<link rel="stylesheet" href="./assets/css/style.css?v=${version}">\n    $1`
    );
  } else {
    // 既存のCSS linkタグのバージョン番号を更新
    distContent = distContent.replace(
      /(<link rel="stylesheet" href="\.\/assets\/css\/style\.css)(\?v=\d+)?(">)/g,
      `$1?v=${version}$3`
    );
  }

  writeFileSync(distHtml, distContent, 'utf-8');
  console.log('🔧 dist/index.html のパスを本番用に変換しました');
}

// 対象ファイル（dist/index.htmlのみバージョン付与）
const targetFiles = [
  'dist/index.html'
];

// バージョンを付与するパターン
const patterns = [
  // ローカルのCSS/JSファイル（./assets/で始まるもの）
  // 既存のバージョン番号があれば更新、なければ追加
  {
    regex: /(["']\.\/assets\/(?:css|js)\/[^"']+\.(css|js))(\?v=\d+)?(["'])/g,
    replacement: `$1?v=${version}$4`
  },
  // custom.cssも対象
  {
    regex: /(["']\.\/assets\/css\/custom\.css)(\?v=\d+)?(["'])/g,
    replacement: `$1?v=${version}$3`
  },
  // scriptタグのsrc属性も対象
  {
    regex: /(<script[^>]+src=["']\.\/assets\/js\/[^"']+\.js)(\?v=\d+)?(["'])/g,
    replacement: `$1?v=${version}$3`
  },
  // 画像ファイル（svg, webp, png, jpg, gif）にもバージョン付与
  {
    regex: /(["']\.\/assets\/images\/[^"']+\.(?:svg|webp|png|jpe?g|gif))(\?v=\d+)?(["'])/g,
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
