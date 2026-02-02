// Experience ルート切り替え
// タブと下のルート見出しが一体化して見えるUI実装
jQuery(function ($) {
  const $experience = $('.p-experience');
  if (!$experience.length) return;

  // タブ切り替え関数
  function switchTab(route) {
    console.log('Switching to route:', route); // デバッグ用
    
    // タブボタンの状態変更
    $('.p-experience__route-btn').each(function() {
      const $btn = $(this);
      if ($btn.data('route') === route) {
        $btn.addClass('is-active').attr('aria-selected', 'true');
      } else {
        $btn.removeClass('is-active').attr('aria-selected', 'false');
      }
    });

    // パネルの表示切り替え
    $('.p-experience__route').each(function() {
      const $panel = $(this);
      if ($panel.hasClass('p-experience__route--' + route)) {
        $panel.addClass('is-active');
      } else {
        $panel.removeClass('is-active');
      }
    });

    // 親状態（色連動用）
    $experience.removeClass('is-habit is-result').addClass('is-' + route);

    // Slickスライダーの再計算（タブ切り替え後に実行）
    setTimeout(function() {
      // Voice スライダー
      const $voiceSlider = $('#voice-swiper .swiper-wrapper');
      if ($voiceSlider.length && $voiceSlider.hasClass('slick-initialized')) {
        $voiceSlider.slick('setPosition');
      }
      // Crew スライダー
      const $crewSlider = $('.p-crew__slider');
      if ($crewSlider.length && $crewSlider.hasClass('slick-initialized')) {
        $crewSlider.slick('setPosition');
      }
      // Features スライダー
      const $featuresSlider = $('#features-swiper .swiper-wrapper');
      if ($featuresSlider.length && $featuresSlider.hasClass('slick-initialized')) {
        $featuresSlider.slick('setPosition');
      }
    }, 300);
  }

  // タブボタンクリック
  $experience.on('click', '.p-experience__route-btn', function () {
    const $btn = $(this);
    const route = $btn.data('route'); // habit / result
    switchTab(route);
  });

  // 初期状態（HTMLで is-active を付けた方に合わせる）
  if ($experience.find('.p-experience__route--result').hasClass('is-active')) {
    $experience.addClass('is-result');
  } else {
    $experience.addClass('is-habit');
  }

  // 結果重視ルートのCTAボタン → 習慣化ルートへ
  $(document).on('click', '.p-result__training-cta-button', function (e) {
    e.preventDefault();
    console.log('Result CTA clicked'); // デバッグ用
    
    // 習慣化ルートに切り替え
    switchTab('habit');
    
    // Experienceセクションまでスムーススクロール
    const $experienceSection = $('#experience');
    if ($experienceSection.length) {
      $('html, body').animate({
        scrollTop: $experienceSection.offset().top - 100
      }, 800, 'swing');
    }
  });

  // 結果重視ルートの継続プランボタン → 習慣化ルートへ
  $(document).on('click', '.p-result__continue-link a', function (e) {
    e.preventDefault();
    console.log('Continue link clicked'); // デバッグ用
    
    // 習慣化ルートに切り替え
    switchTab('habit');
    
    // Experienceセクションまでスムーススクロール
    const $experienceSection = $('#experience');
    if ($experienceSection.length) {
      $('html, body').animate({
        scrollTop: $experienceSection.offset().top - 100
      }, 800, 'swing');
    }
  });

  // 習慣化ルートのCrewボタン → 結果重視ルートへ
  $(document).on('click', '.p-crew__button a', function (e) {
    e.preventDefault();
    console.log('Crew button clicked'); // デバッグ用
    
    // 結果重視ルートに切り替え
    switchTab('result');
    
    // Experienceセクションまでスムーススクロール
    const $experienceSection = $('#experience');
    if ($experienceSection.length) {
      $('html, body').animate({
        scrollTop: $experienceSection.offset().top - 100
      }, 800, 'swing');
    }
  });
});
