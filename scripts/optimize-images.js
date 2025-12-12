import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
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
        imageminMozjpeg({ quality: 80 }),
        imageminPngquant({ quality: [0.65, 0.8] }),
        imageminSvgo({ plugins: [{ removeViewBox: false }] }),
      ],
    });

    console.log(`✅ 画像最適化完了: ${files.length}ファイルを処理しました`);
  } catch (error) {
    console.error('❌ 画像最適化エラー:', error);
    process.exit(1);
  }
})();


