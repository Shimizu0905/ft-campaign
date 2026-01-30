/**
 * 共通スライダー実装（Slick統合版）
 * - IntersectionObserver で遅延初期化（初期化後 unobserve）
 * - Slickを使用した実装
 * - 画面に入ってからスライダーをスタート
 */

// IntersectionObserver で要素が表示されたら1回だけコールバック実行
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

/**
 * Swiper初期化関数（画面に入ってから開始）
 */
function initSlickSliders() {
  // Features スライダー
  const featuresEl = document.querySelector('#features-swiper .swiper-wrapper');
  if (featuresEl && typeof jQuery !== 'undefined' && jQuery.fn.slick) {
    once('#features-swiper', (target) => {
      const root = target.closest('section') || target.parentElement;
      const $slider = jQuery(featuresEl);
      const dotsEl = root.querySelector('.p-features__dots');

      $slider.slick({
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        dots: true,
        appendDots: jQuery(dotsEl),
        arrows: true,
        prevArrow: root.querySelector('.p-features__prev'),
        nextArrow: root.querySelector('.p-features__next'),
        cssEase: 'ease-in-out',
        responsive: [
          {
            breakpoint: 768,
            settings: {
              centerPadding: '0px',
            },
          },
        ],
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px 0px',
    });
  }

  // Voice スライダー
  const voiceEl = document.querySelector('#voice-swiper .swiper-wrapper');
  if (voiceEl && typeof jQuery !== 'undefined' && jQuery.fn.slick) {
    once('#voice-swiper', (target) => {
      const root = target.closest('section') || target.parentElement;
      const $slider = jQuery(voiceEl);
      const dotsEl = root.querySelector('.p-voice__dots');

      $slider.slick({
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '6%',
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        dots: true,
        appendDots: jQuery(dotsEl),
        arrows: true,
        prevArrow: root.querySelector('.p-voice__btn--prev'),
        nextArrow: root.querySelector('.p-voice__btn--next'),
        cssEase: 'ease-in-out',
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px 0px',
    });
  }

  // Crew スライダー（Slick使用）
  const crewEl = document.querySelector('.p-crew__slider');
  if (crewEl && typeof jQuery !== 'undefined' && jQuery.fn.slick) {
    once('.p-crew__slider', (target) => {
      const $slider = jQuery(target);
      const $dots = $slider.closest('.p-crew__inner').find('.p-crew__dots');

      $slider.slick({
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '15%', // 画面幅の15%を両脇に表示
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        dots: true,
        appendDots: $dots,
        arrows: false,
        cssEase: 'ease-in-out',
      });

      // グローバルに公開（モーダル等から使用可能に）
      window.crewSlider = $slider;
    }, {
      threshold: 0.1,
      rootMargin: '50px 0px',
    });
  }
}

/**
 * data-slider属性を使った旧スライダー初期化
 * @param {HTMLElement} root - [data-slider] を持つルート要素
 */
function initSlider(root) {
  // 既に初期化済みならスキップ
  if (root.dataset.sliderInit === 'true') return;
  root.dataset.sliderInit = 'true';

  // --- 設定読み取り ---
  const config = {
    loop: root.dataset.loop === 'true',
    autoplay: parseInt(root.dataset.autoplay, 10) || 0,
    dots: root.dataset.dots === 'true',
    nav: root.dataset.nav === 'true',
    swipe: root.dataset.swipe !== 'false', // デフォルトtrue
    centerMode: root.dataset.centerMode === 'true',
    centerPadding: root.dataset.centerPadding || '0px',
    // 初回だけ長く表示するか
    firstSlideDelay: parseInt(root.dataset.firstSlideDelay, 10) || 0,
  };

  // --- 要素取得 ---
  const track = root.querySelector('[data-slider-track]');
  const slides = Array.from(root.querySelectorAll('[data-slider-slide]'));
  const prevBtn = root.querySelector('[data-slider-prev]');
  const nextBtn = root.querySelector('[data-slider-next]');
  const dotsContainer = root.querySelector('[data-slider-dots]');

  if (!track || slides.length === 0) return;

  const realCount = slides.length;
  let currentIndex = 0;
  let slideWidth = 0;
  let isAnimating = false;
  let autoplayTimer = null;
  let clones = { first: null, last: null };

  // --- ループモード: クローン作成 ---
  if (config.loop && realCount > 1) {
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[realCount - 1].cloneNode(true);
    firstClone.classList.add('is-clone');
    lastClone.classList.add('is-clone');
    firstClone.removeAttribute('aria-current');
    lastClone.removeAttribute('aria-current');
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);
    clones = { first: firstClone, last: lastClone };
    currentIndex = 1; // 本物の最初を指す
  }

  // --- スライド幅計算 ---
  function calculateSlideWidth() {
    if (config.centerMode) {
      // centerMode: padding を除いたスライド幅
      const containerWidth = root.offsetWidth;
      const padding = parseFloat(config.centerPadding) || 0;
      const paddingPercent = config.centerPadding.includes('%')
        ? (containerWidth * parseFloat(config.centerPadding)) / 100
        : padding;
      slideWidth = containerWidth - paddingPercent * 2;
    } else {
      slideWidth = root.offsetWidth;
    }
    // 全スライドに幅を設定
    const allSlides = track.querySelectorAll('[data-slider-slide]');
    allSlides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
      slide.style.flexShrink = '0';
    });

    // トラック幅
    track.style.width = `${slideWidth * allSlides.length}px`;

    // 位置を即座に再設定（transitionなし）
    const offset = config.centerMode
      ? -currentIndex * slideWidth + (root.offsetWidth - slideWidth) / 2
      : -currentIndex * slideWidth;
    
    track.style.transition = 'none';
    track.style.transform = `translateX(${offset}px)`;
    
    // 次フレームでtransitionを戻す
    requestAnimationFrame(() => {
      track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  }

  // --- 移動（アニメーションあり） ---
  function moveTo(index) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = index;
    
    const offset = config.centerMode
      ? -index * slideWidth + (root.offsetWidth - slideWidth) / 2
      : -index * slideWidth;

    // transitionが確実に適用されている状態で移動
    track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = `translateX(${offset}px)`;
    
    updateUI();
  }

  // --- 瞬間移動（アニメーションなし） ---
  function jumpTo(index) {
    const offset = config.centerMode
      ? -index * slideWidth + (root.offsetWidth - slideWidth) / 2
      : -index * slideWidth;

    // transitionを無効化して即座に移動
    track.style.transition = 'none';
    track.style.transform = `translateX(${offset}px)`;
    currentIndex = index;

    // UIを即座に更新
    updateUI();

    // 強制リフローでDOM更新を確定
    void track.offsetWidth;

    // 次フレームでtransitionを戻す
    requestAnimationFrame(() => {
      track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      isAnimating = false;
    });
  }

  // --- transitionend 処理（ループ時のジャンプ） ---
  track.addEventListener('transitionend', (e) => {
    if (e.propertyName !== 'transform') return;

    if (config.loop && realCount > 1) {
      // 先頭クローン（lastClone）に到達 → 本物の最後へ
      if (currentIndex === 0) {
        jumpTo(realCount);
        return;
      }
      // 末尾クローン（firstClone）に到達 → 本物の最初へ
      if (currentIndex === realCount + 1) {
        jumpTo(1);
        return;
      }
    }

    isAnimating = false;
  });

  // --- 実インデックス取得（ループ時のクローン考慮） ---
  function getRealIndex() {
    if (!config.loop || realCount <= 1) return currentIndex;
    if (currentIndex === 0) return realCount - 1;
    if (currentIndex === realCount + 1) return 0;
    return currentIndex - 1;
  }

  // --- UI更新（ドット、aria-current） ---
  function updateUI() {
    const realIndex = getRealIndex();

    // ドット更新
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('[data-slider-dot]');
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === realIndex);
        dot.setAttribute('aria-current', i === realIndex ? 'true' : 'false');
      });
    }

    // スライドのaria-current更新
    const allSlides = track.querySelectorAll('[data-slider-slide]');
    allSlides.forEach((slide, i) => {
      const isClone = slide.classList.contains('is-clone');
      if (isClone) {
        slide.removeAttribute('aria-current');
      } else {
        const slideRealIndex = config.loop && realCount > 1 ? i - 1 : i;
        slide.setAttribute('aria-current', slideRealIndex === realIndex ? 'true' : 'false');
      }
    });
  }

  // --- ナビゲーション ---
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

  // --- ドット生成 ---
  if (config.dots && dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < realCount; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'c-slider__dot';
      dot.setAttribute('data-slider-dot', '');
      dot.setAttribute('aria-label', `スライド ${i + 1} へ移動`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  // --- ナビボタンイベント ---
  if (config.nav) {
    if (prevBtn) {
      prevBtn.addEventListener('click', goToPrev);
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', goToNext);
    }
  }

  // --- オートプレイ ---
  function startAutoplay() {
    if (!config.autoplay || config.autoplay <= 0) return;
    stopAutoplay();

    // 初回だけ長く表示する場合
    const delay =
      config.firstSlideDelay > 0 && getRealIndex() === 0
        ? config.firstSlideDelay
        : config.autoplay;

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

  // ホバー時に一時停止
  root.addEventListener('mouseenter', stopAutoplay);
  root.addEventListener('mouseleave', startAutoplay);

  // --- スワイプ対応 ---
  if (config.swipe) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startOffset = 0;

    function getOffset() {
      return config.centerMode
        ? -currentIndex * slideWidth + (root.offsetWidth - slideWidth) / 2
        : -currentIndex * slideWidth;
    }

    function handlePointerDown(e) {
      if (isAnimating) return;
      isDragging = true;
      startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      currentX = startX;
      startOffset = getOffset();
      track.style.transition = 'none';
      stopAutoplay();
    }

    function handlePointerMove(e) {
      if (!isDragging) return;
      currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const diffX = currentX - startX;
      track.style.transform = `translateX(${startOffset + diffX}px)`;
    }

    function handlePointerUp() {
      if (!isDragging) return;
      isDragging = false;

      const diffX = currentX - startX;
      const threshold = slideWidth * 0.15;

      if (Math.abs(diffX) > threshold) {
        // スライド切り替え
        track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        if (diffX > 0) {
          goToPrev();
        } else {
          goToNext();
        }
      } else {
        // 元の位置へ戻る
        track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = `translateX(${getOffset()}px)`;
        startAutoplay();
      }
    }

    // タッチイベント
    root.addEventListener('touchstart', handlePointerDown, { passive: true });
    root.addEventListener('touchmove', handlePointerMove, { passive: true });
    root.addEventListener('touchend', handlePointerUp, { passive: true });
    root.addEventListener('touchcancel', handlePointerUp, { passive: true });

    // マウスイベント
    root.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('mousemove', handlePointerMove);
    document.addEventListener('mouseup', handlePointerUp);
  }

  // --- リサイズ対応 ---
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(calculateSlideWidth, 150);
  });

  // --- 初期化 ---
  calculateSlideWidth();
  updateUI();
  startAutoplay();
  root.classList.add('is-slider-ready');

  // 外部からアクセスできるようにAPIを公開
  root.sliderAPI = {
    goToNext,
    goToPrev,
    goToSlide,
    getRealIndex,
    pause: stopAutoplay,
    play: startAutoplay,
  };
}

// --- エントリーポイント ---
document.addEventListener('DOMContentLoaded', () => {
  // Slickスライダーを初期化（画面に入ってから開始）
  initSlickSliders();

  // data-slider属性を使った旧スライダーも初期化（画面に入ってから開始）
  once('[data-slider]', initSlider, {
    threshold: 0.1,
    rootMargin: '50px 0px',
  });
});

// グローバルに公開（モーダル等から使用可能に）
window.initSlider = initSlider;
