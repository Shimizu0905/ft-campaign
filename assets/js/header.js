jQuery(function($) {
  $(function() {
    const $body = $("body");
    const $hamburger = $(".js-hamburger");
    const $drawer = $(".js-drawer");
    const $header = $(".js-header");
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
    $hamburger.on("click", function() {
      if ($drawer.hasClass("is-active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    $(".js-drawer-overlay").on("click", function() {
      closeMenu();
    });
    $(".c-drawer__item a").on("click", function() {
      closeMenu();
    });
    $(window).on("scroll", function() {
      if ($(window).scrollTop() > 50) {
        $(".c-header").addClass("is-scrolled");
      } else {
        $(".c-header").removeClass("is-scrolled");
      }
    });
  });
  $(window).on("resize", function() {
    if (window.matchMedia("(min-width: 768px)").matches) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-drawer").removeClass("is-active");
      $("body").removeClass("no-scroll is-drawer-open");
    }
  });
});
