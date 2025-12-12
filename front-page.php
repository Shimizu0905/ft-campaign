<?php get_header(); ?>

<main>
  <h2 class="c-title">front-page.php</h2>

  <section style="padding: 40px; max-width: 1200px; margin: 0 auto;">
    <h3 style="margin-bottom: 30px;">SVG画像の表示確認</h3>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
      <div style="border: 1px solid #ddd; padding: 20px; text-align: center; background: #f9f9f9;">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/number/01-No.svg'); ?>" alt="01-No" style="max-width: 100%; height: auto; margin-bottom: 10px;">
        <p style="font-size: 12px; color: #666;">01-No.svg</p>
      </div>

      <div style="border: 1px solid #ddd; padding: 20px; text-align: center; background: #f9f9f9;">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/number/02-No-01.svg'); ?>" alt="02-No-01" style="max-width: 100%; height: auto; margin-bottom: 10px;">
        <p style="font-size: 12px; color: #666;">02-No-01.svg</p>
      </div>

      <div style="border: 1px solid #ddd; padding: 20px; text-align: center; background: #f9f9f9;">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/number/02-No-02.svg'); ?>" alt="02-No-02" style="max-width: 100%; height: auto; margin-bottom: 10px;">
        <p style="font-size: 12px; color: #666;">02-No-02.svg</p>
      </div>

      <div style="border: 1px solid #ddd; padding: 20px; text-align: center; background: #f9f9f9;">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/number/02-No-03.svg'); ?>" alt="02-No-03" style="max-width: 100%; height: auto; margin-bottom: 10px;">
        <p style="font-size: 12px; color: #666;">02-No-03.svg</p>
      </div>

      <div style="border: 1px solid #ddd; padding: 20px; text-align: center; background: #f9f9f9;">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/number/03-No.svg'); ?>" alt="03-No" style="max-width: 100%; height: auto; margin-bottom: 10px;">
        <p style="font-size: 12px; color: #666;">03-No.svg</p>
      </div>

      <div style="border: 1px solid #ddd; padding: 20px; text-align: center; background: #f9f9f9;">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/number/04-men.svg'); ?>" alt="04-men" style="max-width: 100%; height: auto; margin-bottom: 10px;">
        <p style="font-size: 12px; color: #666;">04-men.svg</p>
      </div>

      <div style="border: 1px solid #ddd; padding: 20px; text-align: center; background: #f9f9f9;">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/number/04-women.svg'); ?>" alt="04-women" style="max-width: 100%; height: auto; margin-bottom: 10px;">
        <p style="font-size: 12px; color: #666;">04-women.svg</p>
      </div>

      <div style="border: 1px solid #ddd; padding: 20px; text-align: center; background: #f9f9f9;">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/number/05-No.svg'); ?>" alt="05-No" style="max-width: 100%; height: auto; margin-bottom: 10px;">
        <p style="font-size: 12px; color: #666;">05-No.svg</p>
      </div>

      <div style="border: 1px solid #ddd; padding: 20px; text-align: center; background: #f9f9f9;">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/number/06-No.svg'); ?>" alt="06-No" style="max-width: 100%; height: auto; margin-bottom: 10px;">
        <p style="font-size: 12px; color: #666;">06-No.svg</p>
      </div>

      <div style="border: 1px solid #ddd; padding: 20px; text-align: center; background: #f9f9f9;">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/number/2 reasons for choosing.svg'); ?>" alt="2 reasons for choosing" style="max-width: 100%; height: auto; margin-bottom: 10px;">
        <p style="font-size: 12px; color: #666;">2 reasons for choosing.svg</p>
      </div>
    </div>

    <h3 style="margin-bottom: 30px; margin-top: 40px;">PNG画像の表示確認</h3>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
      <div style="border: 1px solid #ddd; padding: 20px; text-align: center; background: #f9f9f9;">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/number/07-yukyu-85.png'); ?>" alt="07-yukyu-85" style="max-width: 100%; height: auto; margin-bottom: 10px;">
        <p style="font-size: 12px; color: #666;">07-yukyu-85.png</p>
      </div>

      <div style="border: 1px solid #ddd; padding: 20px; text-align: center; background: #f9f9f9;">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/number/09-graph-91.png'); ?>" alt="09-graph-91" style="max-width: 100%; height: auto; margin-bottom: 10px;">
        <p style="font-size: 12px; color: #666;">09-graph-91.png</p>
      </div>
    </div>
  </section>
  <section class="p-faq">
    <div class="p-faq__inner inner">
      <img class="p-faq__accent p-faq__accent-01" src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/FAQ/FAQ.svg'); ?>" alt="">
      <img class="p-faq__accent p-faq__accent-02" src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/FAQ/FAQ.svg'); ?>" alt="">
      <img class="p-faq__accent p-faq__accent-03" src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/FAQ/FAQ.svg'); ?>" alt="">
      <h3 class="p-faq__title section-title-penki  text-outline-white">
        よくあるご質問
      </h3>
      <div class="p-faq__content">
        <div class="p-faq__content-item">
          <div class="p-faq__content-item-title">
            <span class="p-faq__content-item-label">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/FAQ/Q.svg'); ?>" alt="Q">
            </span>
            <p class="p-faq__content-item-title-text">見積もり依頼だけでも大丈夫でしょうか。</p>
            <button class="p-faq__content-item-title-icon" type="button" aria-label="開く">
              <span class="p-faq__content-item-title-icon-line"></span>
            </button>
          </div>
          <div class="p-faq__content-item-answer">
            <span class="p-faq__content-item-label">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/FAQ/A.svg'); ?>" alt="A">
            </span>
            <p class="p-faq__content-item-answer-text">
              もちろんです。お気軽にお問い合わせください。<br>
              お見積りを見ていただき、じっくりとご判断ください。</p>
          </div>
        </div>
        <div class="p-faq__content-item">
          <div class="p-faq__content-item-title">
            <span class="p-faq__content-item-label">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/FAQ/Q.svg'); ?>" alt="Q">
            </span>
            <p class="p-faq__content-item-title-text">塗り替えのタイミングはいつが良いですか？</p>
            <button class="p-faq__content-item-title-icon" type="button" aria-label="開く">
              <span class="p-faq__content-item-title-icon-line"></span>
            </button>
          </div>
          <div class="p-faq__content-item-answer">
            <span class="p-faq__content-item-label">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/FAQ/A.svg'); ?>" alt="A">
            </span>
            <p class="p-faq__content-item-answer-text">
              一般的に<span class="p-faq__content-item-answer-text-bold">10～15年</span>が塗替え時期です。チョーキング (白亜化)
              ・塗膜表面のひび割れ・シーリングの劣化などの減少が見られたら、要チェックです。現地調査で状態を確認し、お客様に最適なタイミングをご提案します。
            </p>
          </div>
        </div>
        <div class="p-faq__content-item">
          <div class="p-faq__content-item-title">
            <span class="p-faq__content-item-label">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/FAQ/Q.svg'); ?>" alt="Q">
            </span>
            <p class="p-faq__content-item-title-text">工事期間はどれくらいかかりますか？</p>
            <button class="p-faq__content-item-title-icon" type="button" aria-label="開く">
              <span class="p-faq__content-item-title-icon-line"></span>
            </button>
          </div>
          <div class="p-faq__content-item-answer">
            <span class="p-faq__content-item-label">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/FAQ/A.svg'); ?>" alt="A">
            </span>
            <p class="p-faq__content-item-answer-text">
              一般的に、<span class="p-faq__content-item-answer-text-bold">約2～3週間</span>が目安です。<br>
              建物の状態や天候によって前後することがありますが、事前にしっかりスケジュールをご説明し、安心して施工いただけるよう管理しています。</p>
          </div>
        </div>
        <div class="p-faq__content-item">
          <div class="p-faq__content-item-title">
            <span class="p-faq__content-item-label">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/FAQ/Q.svg'); ?>" alt="Q">
            </span>
            <p class="p-faq__content-item-title-text">工事の保証はありますか？</p>
            <button class="p-faq__content-item-title-icon" type="button" aria-label="開く">
              <span class="p-faq__content-item-title-icon-line"></span>
            </button>
          </div>
          <div class="p-faq__content-item-answer">
            <span class="p-faq__content-item-label">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/FAQ/A.svg'); ?>" alt="A">
            </span>
            <p class="p-faq__content-item-answer-text">
              はい、ございますので安心してください。<br>
              <span class="p-faq__content-item-answer-text-bold">外壁最長10年、屋根最長8年、付帯部2年</span>などです。
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>