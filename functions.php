<?php

/**
 * Functions
 */

/**
 * CSSとJavaScriptの読み込み
 *
 * @codex https://wpdocs.osdn.jp/%E3%83%8A%E3%83%93%E3%82%B2%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC
 */
function my_script_init()
{
  // CSS読み込み（圧縮版）
  wp_enqueue_style('my-style', get_template_directory_uri() . '/assets/css/min-style.css', array(), filemtime(get_theme_file_path('assets/css/min-style.css')),  'all');

  // JavaScript読み込み（圧縮版）
  wp_enqueue_script('my-script', get_template_directory_uri() . '/assets/js/min-script.js', array('jquery'), filemtime(get_theme_file_path('assets/js/min-script.js')), true);
}
add_action('wp_enqueue_scripts', 'my_script_init');
/**
 * セキュリティー対策
 */

/**
 * wordpressバージョン情報の削除
 * @see　https://qiita.com/Taka96/items/b541b1fef0fa20add47d
 */
remove_action('wp_head', 'wp_generator');

/**
 * 投稿者一覧ページを自動で生成されないようにする
 * @see　https://qiita.com/Taka96/items/b541b1fef0fa20add47d
 */
add_filter('author_rewrite_rules', '__return_empty_array');
function disable_author_archive()
{
  if (preg_match('#/author/.+#', $_SERVER['REQUEST_URI'])) {
    wp_redirect(esc_url(home_url('/404.php')));
    exit;
  }
}
add_action('init', 'disable_author_archive');

/**
 * /?author=1 などでアクセスしたらリダイレクトさせる
 * @see https://www.webdesignleaves.com/pr/wp/wp_user_enumeration.html
 */
if (!is_admin()) {
  if (preg_match('/author=([0-9]*)/i', $_SERVER['QUERY_STRING'])) die();
  add_filter('redirect_canonical', 'my_shapespace_check_enum', 10, 2);
}
function my_shapespace_check_enum($redirect, $request)
{
  if (preg_match('/\?author=([0-9]*)(\/*)/i', $request)) die();
  else return $redirect;
}

/**
 * pタグとbrタグの自動挿入を解除
 */
add_action('init', 'disable_output');

function disable_output()
{
  remove_filter('the_content', 'wpautop');  // 本文欄
  // remove_filter('the_title', 'wpautop');  // タイトル蘭
  // remove_filter('comment_text', 'wpautop');  // コメント欄
  // remove_filter('the_excerpt', 'wpautop');  // 抜粋欄
}

/*
 * テンプレートパスを返す
 */
function temp_path()
{
  echo esc_url(get_template_directory_uri());
}
/* assetsパスを返す */
function assets_path()
{
  echo esc_url(get_template_directory_uri() . '/assets');
}
/* 画像パスを返す */
function img_path()
{
  echo esc_url(get_template_directory_uri() . '/assets/img');
}
/* mediaフォルダへのURL */
function uploads_path()
{
  echo esc_url(wp_upload_dir()['baseurl']);
}

/* ホームURLのパスを返す
 *
 * $page = worksの場合、https://xxxx.co.jp/works/ を返す
 * 呼び出しは、<?php page_path('works'); ?> で実施する
 *
*/
function page_path($page = "")
{
  $page = $page . '/';
  echo esc_url(home_url($page));
}
