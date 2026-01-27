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

  //リサイズ
  $(window).on('resize', function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-drawer").removeClass("is-active");
      $("body").removeClass("no-scroll");
    }
  });

  // Features スライダー初期化
  $(document).ready(function() {
    if ($(".p-features__slider").length) {
      $(".p-features__slider").slick({
        centerMode: true,
        centerPadding: '5%',
        dots: true,
        autoplay: true,
        autoplaySpeed: 10000,
        speed: 1000,
        infinite: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev c-features-arrow c-features-arrow--prev"><img src="/assets/images/common/arrow-white.svg" alt="前へ"></button>',
        nextArrow: '<button type="button" class="slick-next c-features-arrow c-features-arrow--next"><img src="/assets/images/common/arrow-white.svg" alt="次へ"></button>',
      });
      $(".p-features__slider").on("afterChange", function(event, slick, currentSlide, nextSlide) {
        switch (currentSlide){
          case 0:
            // 1枚目のスライド
            $(this).slick("slickSetOption", "autoplaySpeed", 10000);
            break;
          default:
            // その他のスライド
            $(this).slick("slickSetOption", "autoplaySpeed", 3500);
            break;
        }
      });
    }
  });

  // Experience ルート切り替え
  // タブと下のルート見出しが一体化して見えるUI実装
  $(function() {
    const $experience = $('.p-experience');
    
    // タブクリック時の処理
    $('.p-experience__route-btn').on('click', function() {
      const $btn = $(this);
      const route = $btn.data('route'); // 'habit' または 'result'
      
      // 1. 親要素に状態クラスを付与（タブと見出し帯の色を連動させるため）
      $experience.removeClass('is-habit is-result');
      $experience.addClass('is-' + route);
      
      // 2. ボタンの状態を更新
      $('.p-experience__route-btn').removeClass('is-active').attr('aria-selected', 'false');
      $btn.addClass('is-active').attr('aria-selected', 'true');
      
      // 3. ルートコンテンツの表示/非表示
      $('.p-experience__route').removeClass('is-active');
      $('.p-experience__route--' + route).addClass('is-active');
    });
    
    // 初期状態を設定（習慣化ルートがデフォルト）
    const $activeRoute = $experience.find('.p-experience__route.is-active');
    if ($activeRoute.hasClass('p-experience__route--habit')) {
      $experience.addClass('is-habit');
    } else if ($activeRoute.hasClass('p-experience__route--result')) {
      $experience.addClass('is-result');
    }
  });
});
let lastScrollTop = 0;

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

// お客様の声スライダー（バニラJS実装）
function initVoiceSlider() {
  const track = document.getElementById('voice-track');
  const prevBtn = document.getElementById('voice-prev');
  const nextBtn = document.getElementById('voice-next');
  const dots = document.querySelectorAll('.p-voice__dot');
  const slides = document.querySelectorAll('.p-voice__slide');
  
  if (!track || !prevBtn || !nextBtn || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let slideWidth = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  // スライド幅を計算（リサイズ時にも再計算）
  function calculateSlideWidth() {
    const slider = track.closest('.p-voice__slider');
    if (!slider) return;
    slideWidth = slider.offsetWidth;
    updateTrackPosition();
  }

  // トラックの位置を更新
  function updateTrackPosition() {
    const offset = -currentIndex * slideWidth;
    track.style.transform = `translateX(${offset}px)`;
    
    // スライドのaria-current属性を更新
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.setAttribute('aria-current', 'true');
      } else {
        slide.removeAttribute('aria-current');
      }
    });
    
    // ドットの状態を更新
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('is-active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('is-active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
    
    // ループするためボタンは常に有効
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }

  // 前のスライドへ（ループ対応）
  function goToPrev() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalSlides - 1; // 最初から最後へループ
    }
    updateTrackPosition();
  }

  // 次のスライドへ（ループ対応）
  function goToNext() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // 最後から最初へループ
    }
    updateTrackPosition();
  }

  // 指定したスライドへ移動
  function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
      currentIndex = index;
      updateTrackPosition();
    }
  }

  // スワイプ処理
  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.transition = 'none';
  }

  function handleTouchMove(e) {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    const offset = -currentIndex * slideWidth + diffX;
    track.style.transform = `translateX(${offset}px)`;
  }

  function handleTouchEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.3s ease';
    
    const diffX = currentX - startX;
    const threshold = slideWidth * 0.3; // 30%以上スワイプしたら移動
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        goToPrev(); // 右にスワイプ = 前へ（ループ対応）
      } else {
        goToNext(); // 左にスワイプ = 次へ（ループ対応）
      }
    } else {
      updateTrackPosition(); // 元の位置に戻す
    }
  }

  // イベントリスナーを設定
  prevBtn.addEventListener('click', goToPrev);
  nextBtn.addEventListener('click', goToNext);
  
  // ドットクリック
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // スワイプイベント
  track.addEventListener('touchstart', handleTouchStart, { passive: true });
  track.addEventListener('touchmove', handleTouchMove, { passive: true });
  track.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  // リサイズ時に再計算
  window.addEventListener('resize', () => {
    calculateSlideWidth();
  });
  
  // 初期化
  calculateSlideWidth();
}

// DOMContentLoaded時にスライダーを初期化
document.addEventListener('DOMContentLoaded', function() {
  initVoiceSlider();
});