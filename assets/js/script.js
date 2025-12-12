jQuery(function($2) {
});
jQuery(function($2) {
  $2(function() {
    $2(".js-hamburger").on("click", function() {
      $2(".js-hamburger").toggleClass("is-active");
      $2(".js-overlay").toggleClass("is-active");
      $2(".js-drawer").toggleClass("is-active");
      $2(".js-header").toggleClass("is-active");
      $2("body").toggleClass("no-scroll");
    });
    $2(".js-overlay").on("click", function() {
      $2(".js-hamburger").removeClass("is-active");
      $2(".js-overlay").removeClass("is-active");
      $2(".js-drawer").removeClass("is-active");
      $2(".js-header").removeClass("is-active");
      $2("body").removeClass("no-scroll");
    });
    $2(".js-drawer .drawer__nav-item a").on("click", function() {
      $2(".js-hamburger").removeClass("is-active");
      $2(".js-overlay").removeClass("is-active");
      $2(".js-drawer").removeClass("is-active");
      $2(".js-header").removeClass("is-active");
      $2("body").removeClass("no-scroll");
    });
  });
  $2(window).on("resize", function() {
    if (window.matchMedia("(min-width: 768px)").matches) {
      $2(".js-hamburger").removeClass("is-active");
      $2(".js-drawer").fadeOut().removeClass("is-active");
    }
  });
});
jQuery(function($2) {
  new Swiper(".js-mv-swiper", {
    loop: true,
    speed: 2e3,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 4e3,
      disableOnInteraction: false
    }
  });
});
$(window).on("scroll", function() {
  $(".js-fadeUP").each(function() {
    var elemPos = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll > elemPos - windowHeight + 100) {
      $(this).addClass("is-show");
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
        $(this).addClass("is-active");
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll(".side-navigation-link");
  links.forEach((link) => {
    if (link.href.includes(currentPath)) {
      link.parentNode.classList.add("is-active");
    }
  });
  links.forEach((link) => {
    link.addEventListener("click", function() {
      links.forEach((item) => item.parentNode.classList.remove("is-active"));
      this.parentNode.classList.add("is-active");
    });
  });
});
function initFAQ() {
  const faqItems = document.querySelectorAll(".p-faq__content-item");
  faqItems.forEach((item) => {
    const button = item.querySelector(".p-faq__content-item-title-icon");
    if (!button) return;
    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("p-faq__content-item--open");
      if (isOpen) {
        item.classList.remove("p-faq__content-item--open");
        button.setAttribute("aria-label", "開く");
      } else {
        item.classList.add("p-faq__content-item--open");
        button.setAttribute("aria-label", "閉じる");
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", function() {
  initFAQ();
});
