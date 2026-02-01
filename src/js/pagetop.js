/**
 * Page Top Button
 * ページトップへスムーススクロール
 */

document.addEventListener('DOMContentLoaded', () => {
  const pagetopBtn = document.getElementById('pagetop');

  if (!pagetopBtn) return;

  pagetopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
