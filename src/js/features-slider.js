// Features スライダー初期化（Slick Carousel）
jQuery(function ($) {
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
});
