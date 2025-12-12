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

//Newsセクション ナビゲーション
//WP化した時にカテゴリーに ■ がつくように is-active を付与させる
document.addEventListener('DOMContentLoaded', function () {
  const currentPath = window.location.pathname; // 現在のパスを取得
  const links = document.querySelectorAll('.side-navigation-link');

  links.forEach(link => {
    if (link.href.includes(currentPath)) {
      link.parentNode.classList.add('is-active'); // パスが一致するリンクの親にis-activeを設定
    }
  });

  links.forEach(link => {
    link.addEventListener('click', function () {
      links.forEach(item => item.parentNode.classList.remove('is-active')); // 他のすべてのis-activeを削除
      this.parentNode.classList.add('is-active'); // クリックされたリンクの親にis-activeを追加
    });
  });
});
// FAQアコーディオンの初期化
function initFAQ() {
  const faqItems = document.querySelectorAll('.p-faq__content-item');
  faqItems.forEach(item => {
    const button = item.querySelector('.p-faq__content-item-title-icon');
    if (!button) return;
    button.addEventListener('click', () => {
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