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
function initFAQ() {
  const faqItems = document.querySelectorAll(".p-faq__content-item");
  faqItems.forEach((item) => {
    const title = item.querySelector(".p-faq__content-item-title");
    const button = item.querySelector(".p-faq__content-item-title-icon");
    if (!title || !button) return;
    title.addEventListener("click", (e) => {
      if (e.target === button || button.contains(e.target)) {
        e.stopPropagation();
      }
      const isOpen = item.classList.contains("p-faq__content-item--open");
      if (isOpen) {
        item.classList.remove("p-faq__content-item--open");
        button.setAttribute("aria-label", "開く");
      } else {
        item.classList.add("p-faq__content-item--open");
        button.setAttribute("aria-label", "閉じる");
      }
    });
    button.addEventListener("click", (e) => {
      e.stopPropagation();
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
function initRecruitTabs() {
  const tabs = document.querySelectorAll(".p-recruit__tab");
  const panels = document.querySelectorAll(".p-recruit__content-panel");
  const content = document.querySelector(".p-recruit__content");
  function setContentMinHeight() {
    if (!content) return;
    const isMobile = window.innerWidth <= 767;
    let maxHeight = 0;
    panels.forEach((panel) => {
      const originalDisplay = panel.style.display;
      panel.style.display = "block";
      const height = panel.offsetHeight;
      panel.style.display = originalDisplay || "";
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    if (maxHeight > 0) {
      const minHeight = isMobile ? maxHeight + 50 : maxHeight;
      content.style.minHeight = minHeight + "px";
    }
  }
  setContentMinHeight();
  window.addEventListener("resize", setContentMinHeight);
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.getAttribute("data-tab");
      tabs.forEach((t) => t.classList.remove("p-recruit__tab--active"));
      tab.classList.add("p-recruit__tab--active");
      panels.forEach((panel) => {
        panel.classList.remove("p-recruit__content-panel--active");
      });
      const targetPanel = document.querySelector(`[data-content="${targetTab}"]`);
      if (targetPanel) {
        targetPanel.classList.add("p-recruit__content-panel--active");
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", function() {
  initRecruitTabs();
  initPrivacyModal();
});
function initPrivacyModal() {
  const modal = document.getElementById("privacy-modal");
  const modalBody = document.getElementById("privacy-modal-body");
  const closeBtn = modal == null ? void 0 : modal.querySelector(".c-privacy-modal__close");
  const overlay = modal == null ? void 0 : modal.querySelector(".c-privacy-modal__overlay");
  const agreeBtn = modal == null ? void 0 : modal.querySelector(".c-privacy-modal__agree-btn");
  if (!modal || !modalBody || !closeBtn || !overlay || !agreeBtn) return;
  const privacyLink = document.getElementById("privacy-link");
  if (privacyLink) {
    privacyLink.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }
  function openModal() {
    modal.classList.add("is-active");
    document.body.style.overflow = "hidden";
    modalBody.scrollTop = 0;
    agreeBtn.disabled = true;
    checkScroll();
  }
  function closeModal() {
    modal.classList.remove("is-active");
    document.body.style.overflow = "";
  }
  function checkScroll() {
    const scrollTop = modalBody.scrollTop;
    const scrollHeight = modalBody.scrollHeight;
    const clientHeight = modalBody.clientHeight;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    if (scrollBottom <= 10) {
      agreeBtn.disabled = false;
    } else {
      agreeBtn.disabled = true;
    }
  }
  modalBody.addEventListener("scroll", checkScroll);
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  agreeBtn.addEventListener("click", () => {
    const checkbox = document.getElementById("privacy_agree") || document.querySelector(".c-form__acceptance-checkbox");
    if (checkbox) {
      checkbox.checked = true;
      const event = new Event("change", { bubbles: true });
      checkbox.dispatchEvent(event);
    }
    closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-active")) {
      closeModal();
    }
  });
}
