<?php get_template_part('parts/p-top-sns'); ?>

<footer id="footer" class="p-footer">
  <div class="p-footer__copyright">
    <small>Copyright © 2025 Katsuragi Hospital All Rights Reserved.</small>
  </div>
</footer>

<!-- 追従フッター（スマホ用） -->
<div class="p-sticky-footer">
  <a href="tel:072-422-9909" class="p-sticky-footer__btn p-sticky-footer__btn--tel">
    <div class="p-sticky-footer__content">
      <img src="<?php echo esc_url(get_theme_file_uri("./assets/images/common/icon-tel.png")); ?>" alt="" class="p-sticky-footer__icon">
      <div class="p-sticky-footer__text">
        <span class="p-sticky-footer__label">電話で応募</span>
      </div>
    </div>
  </a>
  <a href="https://lin.ee/9Q6D6U9" class="p-sticky-footer__btn p-sticky-footer__btn--line" id="line-link" target="_blank" rel="noopener noreferrer">
    <div class="p-sticky-footer__content">
      <img src="<?php echo esc_url(get_theme_file_uri("./assets/images/common/icon-line.png")); ?>" alt="" class="p-sticky-footer__icon">
      <span class="p-sticky-footer__label">LINEで応募</span>
    </div>
  </a>
  <a href="#contact" class="p-sticky-footer__btn p-sticky-footer__btn--form">
    <div class="p-sticky-footer__content">
      <img src="<?php echo esc_url(get_theme_file_uri("./assets/images/common/icon-mail.png")); ?>" alt="" class="p-sticky-footer__icon">
      <span class="p-sticky-footer__label">フォームで応募</span>
    </div>
  </a>
</div>

<?php wp_footer(); ?>
</div>

</body>
</html>
