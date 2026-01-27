// ヘッダーとドロワーメニューの機能
jQuery(function ($) {
  $(function () {
    // ハンバーガーメニューのクリックイベント
    $(".js-hamburger").on('click', function () {
      $(".js-hamburger").toggleClass("is-active");
      $(".js-drawer").toggleClass("is-active");
      $(".js-header").toggleClass("is-active");
      $("body").toggleClass("no-scroll");
    });

    // オーバーレイのクリックイベント（メニューを閉じる）
    $(".js-drawer-overlay").on('click', function () {
      $(".js-hamburger").removeClass("is-active");
      $(".js-drawer").removeClass("is-active");
      $(".js-header").removeClass("is-active");
      $("body").removeClass("no-scroll");
    });

    // ドロワーメニュー内のリンククリック時（メニューを閉じる）
    $(".c-drawer__item a").on('click', function () {
      $(".js-hamburger").removeClass("is-active");
      $(".js-drawer").removeClass("is-active");
      $(".js-header").removeClass("is-active");
      $("body").removeClass("no-scroll");
    });

    // ヘッダースクロール処理
    $(window).on('scroll', function() {
      if ($(window).scrollTop() > 50) {
        $(".c-header").addClass("is-scrolled");
      } else {
        $(".c-header").removeClass("is-scrolled");
      }
    });
  });

  // リサイズ
  $(window).on('resize', function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-drawer").removeClass("is-active");
      $("body").removeClass("no-scroll");
    }
  });
});
