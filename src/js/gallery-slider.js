// Gym Gallery 流れるループスライダー
function initGallerySlider() {
  const track = document.getElementById('gallery-track');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('gallery-lightbox-img');
  const lightboxOverlay = document.getElementById('gallery-lightbox-overlay');
  const lightboxClose = document.getElementById('gallery-lightbox-close');

  if (!track) return;

  // 要素を複製して無限ループを実現
  function duplicateItems() {
    const items = Array.from(track.querySelectorAll('.p-gallery__item'));
    if (items.length === 0) return;

    // 既存の複製を削除
    const existingClones = track.querySelectorAll('.p-gallery__item--clone');
    existingClones.forEach(clone => clone.remove());

    // 全アイテムを複製
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('p-gallery__item--clone');
      track.appendChild(clone);
    });
  }

  // 初期化時に複製
  duplicateItems();

  // リサイズ時に再計算
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      duplicateItems();
    }, 250);
  });

  // 画像クリックでLightbox表示
  function openLightbox(imgSrc, imgAlt) {
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt || 'ジム設備';
    lightbox.classList.add('is-open');
    document.body.classList.add('is-gallery-lightbox-open');
  }

  // Lightboxを閉じる
  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove('is-open');
    document.body.classList.remove('is-gallery-lightbox-open');
  }

  // 画像クリックイベント（イベント委譲）
  track.addEventListener('click', (e) => {
    const img = e.target.closest('.p-gallery__img');
    if (!img) return;

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

  // スマホスワイプ対応（横スクロール）
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let initialTransform = 0;

  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    // 現在のアニメーション位置を取得
    const computedStyle = window.getComputedStyle(track);
    const matrix = new DOMMatrix(computedStyle.transform);
    initialTransform = matrix.e; // translateXの値
    track.style.animationPlayState = 'paused';
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.touches[0].pageX;
    const diffX = currentX - startX;
    // 現在のtransform位置にdiffXを加算
    track.style.transform = `translateX(${initialTransform + diffX}px)`;
  }, { passive: false });

  track.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    // transformをリセットしてアニメーションを再開
    track.style.transform = '';
    setTimeout(() => {
      track.style.animationPlayState = 'running';
    }, 100);
  }, { passive: true });

  // マウスドラッグ対応（PC）
  let mouseStartX = 0;
  let mouseInitialTransform = 0;
  let isMouseDragging = false;

  track.addEventListener('mousedown', (e) => {
    isMouseDragging = true;
    mouseStartX = e.pageX;
    const computedStyle = window.getComputedStyle(track);
    const matrix = new DOMMatrix(computedStyle.transform);
    mouseInitialTransform = matrix.e;
    track.style.animationPlayState = 'paused';
    track.style.cursor = 'grabbing';
  });

  track.addEventListener('mousemove', (e) => {
    if (!isMouseDragging) return;
    e.preventDefault();
    const diffX = e.pageX - mouseStartX;
    track.style.transform = `translateX(${mouseInitialTransform + diffX}px)`;
  });

  track.addEventListener('mouseup', () => {
    if (!isMouseDragging) return;
    isMouseDragging = false;
    track.style.cursor = '';
    track.style.transform = '';
    setTimeout(() => {
      track.style.animationPlayState = 'running';
    }, 100);
  });

  track.addEventListener('mouseleave', () => {
    if (isMouseDragging) {
      isMouseDragging = false;
      track.style.cursor = '';
      track.style.transform = '';
      setTimeout(() => {
        track.style.animationPlayState = 'running';
      }, 100);
    }
  });
}

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', function() {
  initGallerySlider();
});
