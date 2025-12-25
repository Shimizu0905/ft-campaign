import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const plugins = [
  autoprefixer,
];

// ビルド時のみコメントを削除（整形は維持）
// Viteのビルド時は NODE_ENV=production になる
if (process.env.NODE_ENV === 'production' || process.env.VITE_BUILD === 'true') {
  plugins.push(
    cssnano({
      preset: ['default', {
        discardComments: {
          removeAll: true, // すべてのコメントを削除
        },
        // その他の圧縮は無効化（整形は維持）
        normalizeWhitespace: false,
        minifyFontValues: false,
        minifySelectors: false,
        minifyParams: false,
      }],
    })
  );
}

export default {
  plugins,
};


