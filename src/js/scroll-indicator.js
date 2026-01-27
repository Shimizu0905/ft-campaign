// スクロールインジケーターの制御
function initScrollIndicator() {
  const indicator = document.getElementById('scroll-indicator');
  if (!indicator) return;

  const scrollThreshold = 100; // 100px以上スクロールしたら非表示

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY >= scrollThreshold) {
      indicator.classList.add('is-hidden');
    } else {
      indicator.classList.remove('is-hidden');
    }
  }

  // スクロールイベント
  window.addEventListener('scroll', handleScroll, { passive: true });

  // 初期状態をチェック
  handleScroll();
}

document.addEventListener('DOMContentLoaded', initScrollIndicator);
