import '../scss/style.scss';
jQuery(function ($) { // $はjQueryを表す
// この中にコードを書く

// 例：クラスがc-btnのcolorを黒色にする
// $(".c-btn").css("color","black")

// 例：idがbuttonのテキストを変更
// $("#button").text("ボタンのテキストを変更");

// 例：クラスがc-btnをクリックした場合、コンソールログを出力
// $(".c-btn").click(function() {
//   console.log("ボタンがクリックされました！");
// });


});

jQuery(function ($) {
  $(function () {
    // ハンバーガーメニューのクリックイベント
    $(".js-hamburger").on('click', function () {
      $(".js-hamburger").toggleClass("is-active");
      $(".js-overlay").toggleClass("is-active");
      $(".js-drawer").toggleClass("is-active");
      $(".js-header").toggleClass("is-active");
      $("body").toggleClass("no-scroll");
    });

    // オーバーレイのクリックイベント（メニューを閉じる）
    $(".js-overlay").on('click', function () {
      $(".js-hamburger").removeClass("is-active");
      $(".js-overlay").removeClass("is-active");
      $(".js-drawer").removeClass("is-active");
      $(".js-header").removeClass("is-active");
      $("body").removeClass("no-scroll");
    });

    // ドロワーメニュー内のリンククリック時（メニューを閉じる）
    $(".js-drawer .drawer__nav-item a").on('click', function () {
      $(".js-hamburger").removeClass("is-active");
      $(".js-overlay").removeClass("is-active");
      $(".js-drawer").removeClass("is-active");
      $(".js-header").removeClass("is-active");
      $("body").removeClass("no-scroll");
    });
  });


  //リサイズ
  $(window).on('resize', function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-drawer").fadeOut().removeClass("is-active");
    }
  });
});
let lastScrollTop = 0;

jQuery(function ($) {
  const mv_swiper = new Swiper(".js-mv-swiper", {
    loop: true,
    speed: 2000,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
});

//fadeUP
$(window).on('scroll', function () {
  $('.js-fadeUP').each(function () {
    var elemPos = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll > elemPos - windowHeight + 100) {
      $(this).addClass('is-show');
    }
  });
});

$(document).ready(function() {
  $(window).scroll(function() {
    $(".underline-expand").each(function() {
      var position = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > position - windowHeight) {
        $(this).addClass('is-active');
      }
    });
  });
});

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

// 募集要項タブ切り替え機能
function initRecruitTabs() {
  const tabs = document.querySelectorAll('.p-recruit__tab');
  const panels = document.querySelectorAll('.p-recruit__content-panel');
  const content = document.querySelector('.p-recruit__content');

  // 両方のパネルの高さを計算して、より高い方の高さを設定
  // これにより、一番多い文字数に合わせてコンテンツエリアが広がります
  function setContentMinHeight() {
    if (!content) return;
    
    // 画面幅を取得（mdブレークポイント: 767px以下）
    const isMobile = window.innerWidth <= 767;
    
    let maxHeight = 0;
    panels.forEach(panel => {
      // 一時的に表示して高さを測定
      const originalDisplay = panel.style.display;
      panel.style.display = 'block';
      const height = panel.offsetHeight;
      panel.style.display = originalDisplay || '';
      
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    
    if (maxHeight > 0) {
      // スマホサイズの時は、測定した高さに少し余分な値を加える（約100px）
      const minHeight = isMobile ? maxHeight + 50 : maxHeight;
      content.style.minHeight = minHeight + 'px';
    }
  }

  // 初期化時に高さを設定
  setContentMinHeight();
  
  // リサイズ時にも高さを再計算
  window.addEventListener('resize', setContentMinHeight);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      // すべてのタブからアクティブクラスを削除
      tabs.forEach(t => t.classList.remove('p-recruit__tab--active'));
      // クリックされたタブにアクティブクラスを追加
      tab.classList.add('p-recruit__tab--active');

      // すべてのパネルを非表示
      panels.forEach(panel => {
        panel.classList.remove('p-recruit__content-panel--active');
      });
      // 対応するパネルを表示
      const targetPanel = document.querySelector(`[data-content="${targetTab}"]`);
      if (targetPanel) {
        targetPanel.classList.add('p-recruit__content-panel--active');
      }
    });
  });
}

// DOMContentLoaded時にタブ機能を初期化
document.addEventListener('DOMContentLoaded', function() {
  initRecruitTabs();
  initPrivacyModal();
});

// プライバシーポリシーモーダル機能
function initPrivacyModal() {
  const modal = document.getElementById('privacy-modal');
  const modalBody = document.getElementById('privacy-modal-body');
  const closeBtn = modal?.querySelector('.c-privacy-modal__close');
  const overlay = modal?.querySelector('.c-privacy-modal__overlay');
  const agreeBtn = modal?.querySelector('.c-privacy-modal__agree-btn');
  
  if (!modal || !modalBody || !closeBtn || !overlay || !agreeBtn) return;

  // プライバシーポリシーのリンクにクリックイベントを追加
  const privacyLink = document.getElementById('privacy-link');
  if (privacyLink) {
    privacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  // モーダルを開く
  function openModal() {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    // スクロール位置をリセット
    modalBody.scrollTop = 0;
    // ボタンを無効化
    agreeBtn.disabled = true;
    checkScroll();
  }

  // モーダルを閉じる
  function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  // スクロールをチェックして、下まで読んだらボタンを有効化
  function checkScroll() {
    const scrollTop = modalBody.scrollTop;
    const scrollHeight = modalBody.scrollHeight;
    const clientHeight = modalBody.clientHeight;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    // 下から10px以内に到達したら有効化
    if (scrollBottom <= 10) {
      agreeBtn.disabled = false;
    } else {
      agreeBtn.disabled = true;
    }
  }

  // スクロールイベント
  modalBody.addEventListener('scroll', checkScroll);

  // 閉じるボタン
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // 同意するボタン
  agreeBtn.addEventListener('click', () => {
    // チェックボックスを探してチェック
    const checkbox = document.getElementById('privacy_agree') || document.querySelector('.c-form__acceptance-checkbox');
    if (checkbox) {
      checkbox.checked = true;
      // changeイベントを発火
      const event = new Event('change', { bubbles: true });
      checkbox.dispatchEvent(event);
    }
    closeModal();
  });

  // ESCキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}