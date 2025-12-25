<?php get_header(); ?>
<?php
/*
Template Name: トップページ
*/
get_header();
?>
<main>
  <!-- FVセクション -->
  <section class="p-fv">
    <div class="p-fv__bg">
      <picture>
        <source media="(max-width: 765px)" srcset="<?php echo esc_url(get_template_directory_uri() . '/assets/images/fv/sp-fv-bg.png'); ?>">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/fv/fv-img.png'); ?>" alt="看護師" class="p-fv__bg-img">
      </picture>
    </div>
    <div class="p-fv__inner">
    </div>
  </section>
  <!-- CTAセクション -->
  <section class="c-cta l-cta" style="--cta-bg-image: url('<?php echo esc_url(get_template_directory_uri() . '/assets/images/common/cta-bg.png'); ?>'); --cta-bg-image-sp: url('<?php echo esc_url(get_template_directory_uri() . '/assets/images/common/sp-CTA-bg.png'); ?>');">
  </section>

  <section id="contact" class="p-contact">
    <div class="p-contact__inner l-inner">
      <h3 class="p-contact__title c-section-title" style="--title-bg-image: url('<?php echo esc_url(get_template_directory_uri() . '/assets/images/contact/contact-title.png'); ?>');">
        お問い合わせフォーム
      </h3>
      <div class="p-contact__form">
      <?php
      $sc = get_post_meta(get_the_ID(), '_contact_form_shortcode', true);
      if (!$sc) {
        $sc = '[contact-form-7 id="99d556f" title="お問い合わせ"]';
      }
      ?>
      <div class="p-contact__form">
        <?php echo do_shortcode($sc); ?>
      </div>

      </div>
    </div>
  </section>

  <!-- プライバシーポリシーモーダル -->
  <div class="c-privacy-modal" id="privacy-modal">
    <div class="c-privacy-modal__overlay"></div>
    <div class="c-privacy-modal__content">
      <div class="c-privacy-modal__header">
        <h4 class="c-privacy-modal__title">個人情報保護方針（プライバシーポリシー）</h4>
        <button class="c-privacy-modal__close" type="button" aria-label="閉じる">×</button>
      </div>
      <div class="c-privacy-modal__body" id="privacy-modal-body">
        <h5 class="c-privacy-modal__subtitle">個人情報保護について</h5>
        <p>当法人は信頼の医療・介護に向けて、患者様・利用者様に良い医療を受けていただけるよう日々努力を重ねております。｢患者様・利用者様の個人情報｣につきましても適切に保護し管理することが非常に重要であると考えております。そのために当法人では、以下の個人情報保護方針を定め確実な履行に努めます。</p>
      </div>
      <div class="c-privacy-modal__footer">
        <p class="c-privacy-modal__scroll-notice">下までスクロールして内容をご確認ください</p>
        <button class="c-privacy-modal__agree-btn" type="button" disabled>同意する</button>
      </div>
    </div>
  </div>
</main>

<?php get_footer(); ?>