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
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
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

  <!-- スライダー -->
  <!-- <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/> -->

  <!-- 外部ライブラリ -->
  <link rel="stylesheet" href="//fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Open+Sans:ital,wght@0,800;1,800&family=Roboto:wght@400;500;700&display=swap" type="text/css" media="all">
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
            <img src="<?php echo esc_url(get_theme_file_uri("./assets/images/common/logo.png")); ?>" class="header__logo-img" alt="わか杉の郷">
          </a>
        </div>
        <nav class="header__nav md-none">
          <ul class="header__nav-list">
          <a href="<?php echo esc_url(home_url("/")) ?>">
            <img src="<?php echo esc_url(get_theme_file_uri("./assets/images/common/tel-btn-img.png")); ?>" class="header__logo-img" alt="電話">
          </a>
          </ul>
        </nav>
        <!-- ハンバーガーメニュー -->
        <div class="hamburger js-hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <!-- ドロワーメニュー -->
        <div class="drawer-menu js-drawer">
          <div class="drawer-menu__inner">
            <nav class="drawer-nav">
              <ul class="drawer-list">
                <li class="drawer__nav-item">
                  <a href="<?php echo esc_url(home_url("/")) ?>">ホーム</a>
                </li>
                <li class="drawer__nav-item">
                  <a href="<?php echo esc_url(home_url("/news")) ?>">お知らせ</a>
                </li>
                <li class="drawer__nav-item">
                  <a href="<?php echo esc_url(home_url("/info")) ?>">施設案内</a>
                </li>
                <li class="drawer__nav-item">
                  <a href="<?php echo esc_url(home_url("/info")) ?>">採用情報</a>
                </li>
                <li class="drawer__nav-item">
                  <a href="<?php echo esc_url(home_url("/flow")) ?>">情報公開</a>
                </li>
                <li class="drawer__nav-item drawer__nav-item--contact">
                  <a href="<?php echo esc_url(home_url("/contact")) ?>">お問い合わせ
                    <img class="button__icon button__icon--header" src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-arrow.svg" alt="">
                  </a>
                </li>
                <li class="drawer__nav-item drawer__nav-item--tel">
                  <a href="tel:0185-71-1515">お電話はこちら
                    <img class="button__icon button__icon--header" src="<?php echo get_template_directory_uri(); ?>/assets/images/common/icon-arrow.svg" alt="">
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div class="overlay js-overlay" id="js-overlay"></div>
    </header>