// ヘッダーとドロワーメニューの機能
import $ from './vendor/jquery.js';

// ヘッダー要素が存在する場合のみ実行
$(function () {
  const $header = $('.js-header');
  if (!$header.length) return;

  const $body = $("body");
  const $hamburger = $(".js-hamburger");
  const $drawer = $(".js-drawer");
  let scrollY = 0;

  function openMenu() {
    $hamburger.addClass("is-active");
    $drawer.addClass("is-active");
    $header.addClass("is-active");
    $body.addClass("no-scroll is-drawer-open");
  }

  function closeMenu() {
    $hamburger.removeClass("is-active");
    $drawer.removeClass("is-active");
    $header.removeClass("is-active");
    $body.removeClass("no-scroll is-drawer-open");
  }

  // ハンバーガーメニューのクリックイベント
  $hamburger.on('click', function () {
    if ($drawer.hasClass("is-active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // オーバーレイのクリックイベント（メニューを閉じる）
  $(".js-drawer-overlay").on('click', function () {
    closeMenu();
  });

  // ドロワーメニュー内のリンククリック時（メニューを閉じる）
  $(".c-drawer__item a").on('click', function () {
    closeMenu();
  });

  // ヘッダースクロール処理
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 50) {
      $(".c-header").addClass("is-scrolled");
    } else {
      $(".c-header").removeClass("is-scrolled");
    }
  });

  // リサイズ
  $(window).on('resize', function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-drawer").removeClass("is-active");
      $("body").removeClass("no-scroll is-drawer-open");
    }
  });
});
