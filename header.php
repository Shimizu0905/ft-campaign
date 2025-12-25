<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="format-detection" content="telephone=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <!-- ページタイトル -->
  <title><?php wp_title('|', true, 'right');
          bloginfo('name'); ?></title>

  <!-- 画像最適化 -->
  <style>
    img:is([sizes="auto" i], [sizes^="auto," i]) {
      contain-intrinsic-size: 3000px 1500px
    }
  </style>

  <!-- DNS Prefetch -->
  <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
  <link rel="dns-prefetch" href="//kit.fontawesome.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="dns-prefetch" href="//cdn.jsdelivr.net">
  <link rel="dns-prefetch" href="//www.googletagmanager.com">

  <!-- RSS Feed -->
  <link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> » フィード" href="<?php bloginfo('rss2_url'); ?>">
  <link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> » コメントフィード" href="<?php bloginfo('comments_rss2_url'); ?>">

  <!-- SEO SIMPLE PACK -->
  <meta name="description" content="<?php bloginfo('description'); ?>">
  <meta name="keywords" content="WordPress, ポートフォリオ, Web制作">
  <link rel="canonical" href="<?php echo home_url(); ?>">
  <meta property="og:locale" content="ja_JP">
  <meta property="og:type" content="website">
  <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/assets/images/og-image.jpg">
  <meta property="og:title" content="<?php wp_title('|', true, 'right');
                                      bloginfo('name'); ?>">
  <meta property="og:description" content="<?php bloginfo('description'); ?>">
  <meta property="og:url" content="<?php echo home_url(); ?>">
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>">
  <meta name="twitter:card" content="summary">

  <!-- Google Analytics (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  <!-- / SEO SIMPLE PACK -->

  <!-- 外部ライブラリ -->
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css?ver=1.11.3" type="text/css" media="all">
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js?ver=1.0.1" id="jquery-js"></script>
  <script type="text/javascript" src="//kit.fontawesome.com/e6a238fcba.js" id="fontawesome-kit-js"></script>

  <!-- WordPress REST API -->
  <link rel="https://api.w.org/" href="<?php echo home_url(); ?>/wp-json/">
  <link rel="alternate" type="application/json" href="<?php echo home_url(); ?>/wp-json/wp/v2/pages/<?php echo get_the_ID(); ?>">
  <link rel="EditURI" type="application/rsd+xml" title="RSD" href="<?php echo home_url(); ?>/xmlrpc.php?rsd">
  <meta name="generator" content="WordPress <?php echo get_bloginfo('version'); ?>">
  <link rel="shortlink" href="<?php echo home_url(); ?>">
  <link rel="alternate" title="oEmbed (JSON)" type="application/json+oembed" href="<?php echo home_url(); ?>/wp-json/oembed/1.0/embed?url=<?php echo urlencode(home_url()); ?>">
  <link rel="alternate" title="oEmbed (XML)" type="text/xml+oembed" href="<?php echo home_url(); ?>/wp-json/oembed/1.0/embed?url=<?php echo urlencode(home_url()); ?>&format=xml">

  <!-- ファビコン -->
  <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon-32x32.png" sizes="32x32">
  <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon-192x192.png" sizes="192x192">
  <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon-180x180.png">
  <meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/assets/images/favicon-270x270.png">

  <?php //if ( is_singular() ) wp_enqueue_script( "comment-reply" );
  ?>
  <?php wp_head(); ?>
</head>


<body <?php body_class(); ?>>
  <?php wp_body_open(); ?>
  <div id="page" class="l-site">
    <header class="header js-header" id="header">
      <div class="header__inner">
        <div class="header__logo js-header__logo">
          <a href="<?php echo esc_url(home_url("/")) ?>">
            <img src="<?php echo esc_url(get_theme_file_uri("./assets/images/common/logo.png")); ?>" class="header__logo-img" alt="葛城病院">
          </a>
        </div>
        <nav class="header__nav md-none">
          <ul class="header__nav-list">
            <li class="header__nav-item">
              <a href="tel:072-422-9909">
                <img src="<?php echo esc_url(get_theme_file_uri("./assets/images/common/tel-btn-img.png")); ?>" class="header__logo-img" alt="電話">
              </a>
            </li>
            <li class="header__nav-item">
              <a href="https://lin.ee/9Q6D6U9" target="_blank" rel="noopener noreferrer">
                <img src="<?php echo esc_url(get_theme_file_uri("./assets/images/common/line-btn-img.png")); ?>" class="header__logo-img" alt="LINE">
              </a>
            </li>
            <li class="header__nav-item">
              <a href="#contact">
                <img src="<?php echo esc_url(get_theme_file_uri("./assets/images/common/contact-btn-img.png")); ?>" class="header__logo-img" alt="お問い合わせフォームから応募する">
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="overlay js-overlay" id="js-overlay"></div>
    </header>