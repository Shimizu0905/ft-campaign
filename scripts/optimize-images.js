import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminOptipng from 'imagemin-optipng';
import imageminSvgo from 'imagemin-svgo';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

(async () => {
  try {
    const files = await imagemin([`${projectRoot}/src/images/**/*`], {
      destination: `${projectRoot}/assets/images`,
      plugins: [
        imageminMozjpeg({ quality: 75 }),
        imageminOptipng({ 
          optimizationLevel: 7
        }),
        imageminPngquant({ 
          quality: [0.5, 0.7],
          speed: 1
        }),
        imageminSvgo({
          plugins: [
            {
              name: 'removeViewBox',
              active: false,
            },
          ],
        }),
      ],
    });

    console.log(`✅ 画像最適化完了: ${files.length}ファイルを処理しました`);
  } catch (error) {
    console.error('❌ 画像最適化エラー:', error);
    process.exit(1);
  }
})();


