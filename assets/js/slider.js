const once = (selector, onEnter, options = {}) => {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  const io = new IntersectionObserver((entries, obs) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      onEnter(e.target);
      obs.unobserve(e.target);
    }
  }, options);
  els.forEach((el) => io.observe(el));
};
function initSlickSliders() {
  const featuresEl = document.querySelector("#features-swiper .swiper-wrapper");
  if (featuresEl && typeof jQuery !== "undefined" && jQuery.fn.slick) {
    once("#features-swiper", (target) => {
      const root = target.closest("section") || target.parentElement;
      const $slider = jQuery(featuresEl);
      const dotsEl = root.querySelector(".p-features__dots");
      $slider.slick({
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "10px",
        autoplay: true,
        autoplaySpeed: 4e3,
        pauseOnHover: true,
        dots: true,
        appendDots: jQuery(dotsEl),
        arrows: true,
        prevArrow: root.querySelector(".p-features__prev"),
        nextArrow: root.querySelector(".p-features__next"),
        cssEase: "ease-in-out",
        responsive: [
          {
            breakpoint: 768,
            settings: {
              centerPadding: "10px"
            }
          }
        ]
      });
    }, {
      threshold: 0.1,
      rootMargin: "50px 0px"
    });
  }
  const voiceEl = document.querySelector("#voice-swiper .swiper-wrapper");
  if (voiceEl && typeof jQuery !== "undefined" && jQuery.fn.slick) {
    once("#voice-swiper", (target) => {
      const root = target.closest("section") || target.parentElement;
      const $slider = jQuery(voiceEl);
      const dotsEl = root.querySelector(".p-voice__dots");
      $slider.slick({
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "6%",
        autoplay: true,
        autoplaySpeed: 5e3,
        pauseOnHover: true,
        dots: true,
        appendDots: jQuery(dotsEl),
        arrows: true,
        prevArrow: root.querySelector(".p-voice__btn--prev"),
        nextArrow: root.querySelector(".p-voice__btn--next"),
        cssEase: "ease-in-out"
      });
    }, {
      threshold: 0.1,
      rootMargin: "50px 0px"
    });
  }
  const crewEl = document.querySelector(".p-crew__slider");
  if (crewEl && typeof jQuery !== "undefined" && jQuery.fn.slick) {
    once(".p-crew__slider", (target) => {
      const $slider = jQuery(target);
      const $dots = $slider.closest(".p-crew__inner").find(".p-crew__dots");
      $slider.slick({
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "12%",
        // 画面幅の15%を両脇に表示
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        dots: true,
        appendDots: $dots,
        arrows: false,
        cssEase: "ease-in-out"
      });
      window.crewSlider = $slider;
    }, {
      threshold: 0.1,
      rootMargin: "50px 0px"
    });
  }
}
function initSlider(root) {
  if (root.dataset.sliderInit === "true") return;
  root.dataset.sliderInit = "true";
  const config = {
    loop: root.dataset.loop === "true",
    autoplay: parseInt(root.dataset.autoplay, 10) || 0,
    dots: root.dataset.dots === "true",
    nav: root.dataset.nav === "true",
    swipe: root.dataset.swipe !== "false",
    // デフォルトtrue
    centerMode: root.dataset.centerMode === "true",
    centerPadding: root.dataset.centerPadding || "0px",
    // 初回だけ長く表示するか
    firstSlideDelay: parseInt(root.dataset.firstSlideDelay, 10) || 0
  };
  const track = root.querySelector("[data-slider-track]");
  const slides = Array.from(root.querySelectorAll("[data-slider-slide]"));
  const prevBtn = root.querySelector("[data-slider-prev]");
  const nextBtn = root.querySelector("[data-slider-next]");
  const dotsContainer = root.querySelector("[data-slider-dots]");
  if (!track || slides.length === 0) return;
  const realCount = slides.length;
  let currentIndex = 0;
  let slideWidth = 0;
  let isAnimating = false;
  let autoplayTimer = null;
  if (config.loop && realCount > 1) {
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[realCount - 1].cloneNode(true);
    firstClone.classList.add("is-clone");
    lastClone.classList.add("is-clone");
    firstClone.removeAttribute("aria-current");
    lastClone.removeAttribute("aria-current");
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);
    currentIndex = 1;
  }
  function calculateSlideWidth() {
    if (config.centerMode) {
      const containerWidth = root.offsetWidth;
      const padding = parseFloat(config.centerPadding) || 0;
      const paddingPercent = config.centerPadding.includes("%") ? containerWidth * parseFloat(config.centerPadding) / 100 : padding;
      slideWidth = containerWidth - paddingPercent * 2;
    } else {
      slideWidth = root.offsetWidth;
    }
    const allSlides = track.querySelectorAll("[data-slider-slide]");
    allSlides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
      slide.style.flexShrink = "0";
    });
    track.style.width = `${slideWidth * allSlides.length}px`;
    const offset = config.centerMode ? -currentIndex * slideWidth + (root.offsetWidth - slideWidth) / 2 : -currentIndex * slideWidth;
    track.style.transition = "none";
    track.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(() => {
      track.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    });
  }
  function moveTo(index) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = index;
    const offset = config.centerMode ? -index * slideWidth + (root.offsetWidth - slideWidth) / 2 : -index * slideWidth;
    track.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    track.style.transform = `translateX(${offset}px)`;
    updateUI();
  }
  function jumpTo(index) {
    const offset = config.centerMode ? -index * slideWidth + (root.offsetWidth - slideWidth) / 2 : -index * slideWidth;
    track.style.transition = "none";
    track.style.transform = `translateX(${offset}px)`;
    currentIndex = index;
    updateUI();
    void track.offsetWidth;
    requestAnimationFrame(() => {
      track.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      isAnimating = false;
    });
  }
  track.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;
    if (config.loop && realCount > 1) {
      if (currentIndex === 0) {
        jumpTo(realCount);
        return;
      }
      if (currentIndex === realCount + 1) {
        jumpTo(1);
        return;
      }
    }
    isAnimating = false;
  });
  function getRealIndex() {
    if (!config.loop || realCount <= 1) return currentIndex;
    if (currentIndex === 0) return realCount - 1;
    if (currentIndex === realCount + 1) return 0;
    return currentIndex - 1;
  }
  function updateUI() {
    const realIndex = getRealIndex();
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll("[data-slider-dot]");
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === realIndex);
        dot.setAttribute("aria-current", i === realIndex ? "true" : "false");
      });
    }
    const allSlides = track.querySelectorAll("[data-slider-slide]");
    allSlides.forEach((slide, i) => {
      const isClone = slide.classList.contains("is-clone");
      if (isClone) {
        slide.removeAttribute("aria-current");
      } else {
        const slideRealIndex = config.loop && realCount > 1 ? i - 1 : i;
        slide.setAttribute("aria-current", slideRealIndex === realIndex ? "true" : "false");
      }
    });
  }
  function goToNext() {
    if (config.loop && realCount > 1) {
      moveTo(currentIndex + 1);
    } else {
      if (currentIndex < realCount - 1) {
        moveTo(currentIndex + 1);
      }
    }
    resetAutoplay();
  }
  function goToPrev() {
    if (config.loop && realCount > 1) {
      moveTo(currentIndex - 1);
    } else {
      if (currentIndex > 0) {
        moveTo(currentIndex - 1);
      }
    }
    resetAutoplay();
  }
  function goToSlide(realIndex) {
    const targetIndex = config.loop && realCount > 1 ? realIndex + 1 : realIndex;
    moveTo(targetIndex);
    resetAutoplay();
  }
  if (config.dots && dotsContainer) {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < realCount; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "c-slider__dot";
      dot.setAttribute("data-slider-dot", "");
      dot.setAttribute("aria-label", `スライド ${i + 1} へ移動`);
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  if (config.nav) {
    if (prevBtn) {
      prevBtn.addEventListener("click", goToPrev);
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", goToNext);
    }
  }
  function startAutoplay() {
    if (!config.autoplay || config.autoplay <= 0) return;
    stopAutoplay();
    const delay = config.firstSlideDelay > 0 && getRealIndex() === 0 ? config.firstSlideDelay : config.autoplay;
    autoplayTimer = setTimeout(() => {
      goToNext();
      startAutoplay();
    }, delay);
  }
  function stopAutoplay() {
    if (autoplayTimer) {
      clearTimeout(autoplayTimer);
      autoplayTimer = null;
    }
  }
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);
  if (config.swipe) {
    let getOffset2 = function() {
      return config.centerMode ? -currentIndex * slideWidth + (root.offsetWidth - slideWidth) / 2 : -currentIndex * slideWidth;
    }, handlePointerDown2 = function(e) {
      if (isAnimating) return;
      isDragging = true;
      startX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
      currentX = startX;
      startOffset = getOffset2();
      track.style.transition = "none";
      stopAutoplay();
    }, handlePointerMove2 = function(e) {
      if (!isDragging) return;
      currentX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
      const diffX = currentX - startX;
      track.style.transform = `translateX(${startOffset + diffX}px)`;
    }, handlePointerUp2 = function() {
      if (!isDragging) return;
      isDragging = false;
      const diffX = currentX - startX;
      const threshold = slideWidth * 0.15;
      if (Math.abs(diffX) > threshold) {
        track.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        if (diffX > 0) {
          goToPrev();
        } else {
          goToNext();
        }
      } else {
        track.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        track.style.transform = `translateX(${getOffset2()}px)`;
        startAutoplay();
      }
    };
    var getOffset = getOffset2, handlePointerDown = handlePointerDown2, handlePointerMove = handlePointerMove2, handlePointerUp = handlePointerUp2;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startOffset = 0;
    root.addEventListener("touchstart", handlePointerDown2, { passive: true });
    root.addEventListener("touchmove", handlePointerMove2, { passive: true });
    root.addEventListener("touchend", handlePointerUp2, { passive: true });
    root.addEventListener("touchcancel", handlePointerUp2, { passive: true });
    root.addEventListener("mousedown", handlePointerDown2);
    document.addEventListener("mousemove", handlePointerMove2);
    document.addEventListener("mouseup", handlePointerUp2);
  }
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(calculateSlideWidth, 150);
  });
  calculateSlideWidth();
  updateUI();
  startAutoplay();
  root.classList.add("is-slider-ready");
  root.sliderAPI = {
    goToNext,
    goToPrev,
    goToSlide,
    getRealIndex,
    pause: stopAutoplay,
    play: startAutoplay
  };
}
document.addEventListener("DOMContentLoaded", () => {
  initSlickSliders();
  once("[data-slider]", initSlider, {
    threshold: 0.1,
    rootMargin: "50px 0px"
  });
});
window.initSlider = initSlider;
