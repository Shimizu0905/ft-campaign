jQuery(function($) {
  const $experience = $(".p-experience");
  if (!$experience.length) return;
  function switchTab(route) {
    console.log("Switching to route:", route);
    $(".p-experience__route-btn").each(function() {
      const $btn = $(this);
      if ($btn.data("route") === route) {
        $btn.addClass("is-active").attr("aria-selected", "true");
      } else {
        $btn.removeClass("is-active").attr("aria-selected", "false");
      }
    });
    $(".p-experience__route").each(function() {
      const $panel = $(this);
      if ($panel.hasClass("p-experience__route--" + route)) {
        $panel.addClass("is-active");
      } else {
        $panel.removeClass("is-active");
      }
    });
    $experience.removeClass("is-habit is-result").addClass("is-" + route);
    setTimeout(function() {
      const $voiceSlider = $("#voice-swiper .swiper-wrapper");
      if ($voiceSlider.length && $voiceSlider.hasClass("slick-initialized")) {
        $voiceSlider.slick("setPosition");
      }
      const $crewSlider = $(".p-crew__slider");
      if ($crewSlider.length && $crewSlider.hasClass("slick-initialized")) {
        $crewSlider.slick("setPosition");
      }
      const $featuresSlider = $("#features-swiper .swiper-wrapper");
      if ($featuresSlider.length && $featuresSlider.hasClass("slick-initialized")) {
        $featuresSlider.slick("setPosition");
      }
    }, 300);
  }
  $experience.on("click", ".p-experience__route-btn", function() {
    const $btn = $(this);
    const route = $btn.data("route");
    switchTab(route);
  });
  if ($experience.find(".p-experience__route--result").hasClass("is-active")) {
    $experience.addClass("is-result");
  } else {
    $experience.addClass("is-habit");
  }
  $(document).on("click", ".p-result__training-cta-button", function(e) {
    e.preventDefault();
    console.log("Result CTA clicked");
    switchTab("habit");
    const $experienceSection = $("#experience");
    if ($experienceSection.length) {
      $("html, body").animate({
        scrollTop: $experienceSection.offset().top - 100
      }, 800, "swing");
    }
  });
  $(document).on("click", ".p-result__continue-link a", function(e) {
    e.preventDefault();
    console.log("Continue link clicked");
    switchTab("habit");
    const $experienceSection = $("#experience");
    if ($experienceSection.length) {
      $("html, body").animate({
        scrollTop: $experienceSection.offset().top - 100
      }, 800, "swing");
    }
  });
  $(document).on("click", ".p-crew__button a", function(e) {
    e.preventDefault();
    console.log("Crew button clicked");
    switchTab("result");
    const $experienceSection = $("#experience");
    if ($experienceSection.length) {
      $("html, body").animate({
        scrollTop: $experienceSection.offset().top - 100
      }, 800, "swing");
    }
  });
});
