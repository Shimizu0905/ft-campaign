// FAQアコーディオンの初期化
function initFAQ() {
  const faqItems = document.querySelectorAll('.p-faq__content-item');
  faqItems.forEach(item => {
    const title = item.querySelector('.p-faq__content-item-title');
    const button = item.querySelector('.p-faq__content-item-title-icon');
    if (!title || !button) return;
    
    // item全体（タイトル部分）をクリック可能にする
    title.addEventListener('click', (e) => {
      // ボタン自体をクリックした場合は、イベントの重複を防ぐ
      if (e.target === button || button.contains(e.target)) {
        e.stopPropagation();
      }
      
      const isOpen = item.classList.contains('p-faq__content-item--open');
      if (isOpen) {
        item.classList.remove('p-faq__content-item--open');
        button.setAttribute('aria-label', '開く');
      } else {
        item.classList.add('p-faq__content-item--open');
        button.setAttribute('aria-label', '閉じる');
      }
    });
    
    // ボタンにもクリックイベントを残す（念のため）
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = item.classList.contains('p-faq__content-item--open');
      if (isOpen) {
        item.classList.remove('p-faq__content-item--open');
        button.setAttribute('aria-label', '開く');
      } else {
        item.classList.add('p-faq__content-item--open');
        button.setAttribute('aria-label', '閉じる');
      }
    });
  });
}

// DOMContentLoaded時にFAQを初期化
document.addEventListener('DOMContentLoaded', function() {
  initFAQ();
});
