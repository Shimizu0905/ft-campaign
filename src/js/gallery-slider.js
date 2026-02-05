// ============================================================
// Gym Gallery - Slick ティッカー（連続スクロール）
// Slickデフォルトスタイルを尊重し、CSSで上書きしない
// ============================================================
import $ from './jquery-setup.js';

function initGallerySlider() {
  const $track = $('#gallery-track');
  if (!$track.length || !$.fn.slick) return;

  // 既に初期化済みなら何もしない
  if ($track.hasClass('slick-initialized')) return;

  $track.slick({
    autoplay: true,
    autoplaySpeed: 1,
    speed: 6000,
    cssEase: 'linear',
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    variableWidth: false,
    centerMode: false,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    draggable: false,
    swipe: false,
    touchMove: false,
    waitForAnimate: false,
    useCSS: true,
    useTransform: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          speed: 7000
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          speed: 6000
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          speed: 5000
        }
      }
    ]
  });
}

document.addEventListener('DOMContentLoaded', initGallerySlider);
