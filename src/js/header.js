// ヘッダーとドロワーメニューの機能
import $ from './jquery-setup.js';

// ヘッダー要素が存在する場合のみ実行
$(function () {
  const $header = $('.js-header');
  if (!$header.length) return;

  const $body = $("body");
  const $hamburger = $(".js-hamburger");
  const $drawer = $(".js-drawer");
  let scrollY = 0;

  const syncScrollLock = () => {
    const isOpen = $drawer.hasClass("is-active");
    $body.toggleClass("no-scroll is-drawer-open", isOpen);
  };

  function openMenu() {
    $hamburger.addClass("is-active");
    $drawer.addClass("is-active");
    $header.addClass("is-active");
    $body.addClass("no-scroll is-drawer-open");
    syncScrollLock();
  }

  function closeMenu() {
    $hamburger.removeClass("is-active");
    $drawer.removeClass("is-active");
    $header.removeClass("is-active");

    // 強制的にスクロール復帰
    $body.removeClass("no-scroll is-drawer-open");
    document.documentElement.classList.remove("no-scroll"); // 念のため
    syncScrollLock();
  }

  // ハンバーガーメニューのクリックイベント
  $hamburger.on('click', function () {
    if ($drawer.hasClass("is-active")) {
      closeMenu();
    } else {
      openMenu();
    }
    setTimeout(syncScrollLock, 0);
  });

  // オーバーレイのクリックイベント（メニューを閉じる）
  $(".js-drawer-overlay").on('click', function () {
    closeMenu();
  });

  // ドロワーメニュー内のリンククリック時（メニューを閉じてスムーススクロール）
  $(".c-drawer__item a[href^='#']").on('click', function (e) {
    e.preventDefault();
    const targetId = $(this).attr('href');
    const $target = $(targetId);
    closeMenu();

    if ($target.length) {
      // メニューが閉じるアニメーション後にスクロール
      setTimeout(function () {
        $target[0].scrollIntoView({ behavior: 'smooth' });
        // URLにハッシュを残さない
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }, 300);
    }
  });

  // 外部リンク（#以外）の場合はメニューを閉じるだけ
  $(".c-drawer__item a").not("[href^='#']").on('click', function () {
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
      // 強制的にスクロール復帰
      $("body").removeClass("no-scroll is-drawer-open");
      document.documentElement.classList.remove("no-scroll"); // 念のため
    }
  });
});
