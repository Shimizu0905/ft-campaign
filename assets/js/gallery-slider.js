// ============================================================
// Gym Gallery - CSSアニメーション版（iOS安定化対応）
// ============================================================

function initGallerySlider() {
  const track = document.getElementById('gallery-track');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('gallery-lightbox-img');
  const lightboxOverlay = document.getElementById('gallery-lightbox-overlay');
  const lightboxClose = document.getElementById('gallery-lightbox-close');

  if (!track) return;

  // ============================================================
  // slick旧実装（コメントアウト - 参考用に残す）
  // ============================================================
  /*
  const $slider = $('#gallery-track');

  $slider.slick({
    autoplay: true,
    autoplaySpeed: 0,           // 止まらずに連続
    speed: 5000,                // 5秒かけてスライド
    cssEase: 'linear',          // 等速で流れる
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    pauseOnHover: false,        // ホバーでも止めない
    pauseOnFocus: false,        // フォーカスでも止めない
    draggable: false,
    swipe: false,
    touchMove: false,
    variableWidth: true,
    waitForAnimate: false,
    useCSS: true,
    useTransform: true,
    accessibility: false
  });
  */

  // ============================================================
  // CSS無限スクロール実装（slick不使用）
  // ============================================================

  // アイテムを複製して無限ループを実現
  const items = Array.from(track.querySelectorAll('.p-gallery__item'));
  if (items.length > 0) {
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('p-gallery__item--clone'); // 複製識別用
      track.appendChild(clone);
    });
  }

  // ============================================================
  // Lightbox機能（引き続き使用）
  // ============================================================

  // 画像クリックでLightbox表示
  function openLightbox(imgSrc, imgAlt) {
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt || 'ジム設備';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  // Lightboxを閉じる
  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // 画像クリックイベント（イベント委譲）
  track.addEventListener('click', (e) => {
    const img = e.target.closest('.p-gallery__img');
    if (!img) return;

    e.preventDefault();
    const imgSrc = img.src;
    const imgAlt = img.alt;
    openLightbox(imgSrc, imgAlt);
  });

  // 閉じるボタン
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // オーバーレイクリック
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', closeLightbox);
  }

  // ESCキー
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('is-open')) {
      closeLightbox();
    }
  });
}

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', function() {
  initGallerySlider();
});
