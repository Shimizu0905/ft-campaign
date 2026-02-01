/**
 * Locations Modal
 * 店舗マップ画像をライトボックスで表示
 */

document.addEventListener('DOMContentLoaded', () => {
  const mapLink = document.getElementById('locations-map-link');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('gallery-lightbox-img');
  const lightboxClose = document.getElementById('gallery-lightbox-close');
  const lightboxOverlay = document.getElementById('gallery-lightbox-overlay');

  if (!mapLink || !lightbox || !lightboxImg) return;

  // マップリンクをクリックしたときの処理
  mapLink.addEventListener('click', (e) => {
    e.preventDefault();
    const imageUrl = mapLink.dataset.image;
    
    if (imageUrl) {
      // 画像を設定
      lightboxImg.src = imageUrl;
      lightboxImg.alt = 'FITNESS24 店舗マップ';
      
      // ライトボックスを表示（gallery-slider.jsと同じクラス名を使用）
      lightbox.classList.add('is-open');
      document.body.classList.add('is-gallery-lightbox-open');
    }
  });

  // 閉じるボタン
  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      closeLightbox();
    });
  }

  // オーバーレイをクリックで閉じる
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', () => {
      closeLightbox();
    });
  }

  // ESCキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('is-gallery-lightbox-open');
    // 画像をクリア
    setTimeout(() => {
      lightboxImg.src = '';
      lightboxImg.alt = '';
    }, 300);
  }
});
