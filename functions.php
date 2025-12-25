<?php
/**
 * Vite + WordPress 用 assets 読み込み
 */
function my_script_init() {

  $is_local = (defined('WP_ENVIRONMENT_TYPE') && WP_ENVIRONMENT_TYPE === 'local');

  $theme_dir = get_template_directory();
  $theme_uri = get_template_directory_uri();

  /* =========================
   * 開発環境（Vite）
   * ========================= */
  if ($is_local) {

    // jQuery（既存JS依存用）
    wp_enqueue_script('jquery');

    // Vite HMR client
    wp_enqueue_script(
      'vite-client',
      'http://localhost:3000/@vite/client',
      [],
      null,
      true
    );
    wp_script_add_data('vite-client', 'type', 'module');

    // メインエントリ
    wp_enqueue_script(
      'vite-main',
      'http://localhost:3000/src/js/script.js',
      ['vite-client', 'jquery'],
      null,
      true
    );
    wp_script_add_data('vite-main', 'type', 'module');

    // ローカルでは build成果物は読まない
    return;
  }

  /* =========================
   * 本番環境（build：manifest）
   * ========================= */
  $manifest_path = $theme_dir . '/assets/.vite/manifest.json';
  if (!file_exists($manifest_path)) {
    error_log('[vite] manifest not found: ' . $manifest_path);
    return;
  }

  $manifest = json_decode(file_get_contents($manifest_path), true);
  if (!is_array($manifest)) {
    error_log('[vite] manifest json decode failed: ' . $manifest_path);
    return;
  }

  $entry_key = 'src/js/script.js';
  if (empty($manifest[$entry_key])) {
    error_log('[vite] entry not found in manifest: ' . $entry_key);
    return;
  }

  $entry = $manifest[$entry_key];

  // JS
  if (!empty($entry['file'])) {
    $js_rel = '/assets/' . ltrim($entry['file'], '/'); // 例: /assets/js/script.js
    $js_abs = $theme_dir . $js_rel;

    wp_enqueue_script(
      'my-script',
      $theme_uri . $js_rel,
      ['jquery'],
      file_exists($js_abs) ? filemtime($js_abs) : null,
      true
    );
  }

  // CSS（JSから生成されたCSS）
  if (!empty($entry['css']) && is_array($entry['css'])) {
    foreach ($entry['css'] as $i => $css_file) {
      $css_rel = '/assets/' . ltrim($css_file, '/'); // 例: /assets/css/style.css
      $css_abs = $theme_dir . $css_rel;

      wp_enqueue_style(
        'my-style-' . $i,
        $theme_uri . $css_rel,
        [],
        file_exists($css_abs) ? filemtime($css_abs) : null
      );
    }
  }
}
add_action('wp_enqueue_scripts', 'my_script_init');

// Vite の2つだけ、scriptタグを「強制的に module」として出力する
add_filter('script_loader_tag', function ($tag, $handle, $src) {

  if (!in_array($handle, ['vite-client', 'vite-main'], true)) {
    return $tag;
  }

  return sprintf(
    '<script type="module" crossorigin src="%s"></script>' . "\n",
    esc_url($src)
  );

}, 10, 3);


/* =========================
 * セキュリティ（元のまま）
 * ========================= */

remove_action('wp_head', 'wp_generator');

add_filter('author_rewrite_rules', '__return_empty_array');
function disable_author_archive() {
  if (preg_match('#/author/.+#', $_SERVER['REQUEST_URI'])) {
    wp_redirect(esc_url(home_url('/404.php')));
    exit;
  }
}
add_action('init', 'disable_author_archive');

if (!is_admin()) {
  if (preg_match('/author=([0-9]*)/i', $_SERVER['QUERY_STRING'])) {
    die();
  }
  add_filter('redirect_canonical', 'my_shapespace_check_enum', 10, 2);
}
function my_shapespace_check_enum($redirect, $request) {
  if (preg_match('/\?author=([0-9]*)(\/*)/i', $request)) {
    die();
  }
  return $redirect;
}

add_action('init', 'disable_output');
function disable_output() {
  remove_filter('the_content', 'wpautop');
  // Contact Form 7 のフォーム内の <p><br> 自動整形を止める
}
add_filter('wpcf7_autop_or_not', '__return_false');

// 固定ページに「フォーム用ショートコード」入力欄を追加
add_action('add_meta_boxes', function () {
  add_meta_box(
    'contact_form_shortcode',
    'お問い合わせフォーム（ショートコード）',
    function ($post) {
      $value = get_post_meta($post->ID, '_contact_form_shortcode', true);
      wp_nonce_field('save_contact_form_shortcode', 'contact_form_shortcode_nonce');
      echo '<p>例：<code>[contact-form-7 id="99d556f" title="お問い合わせ"]</code></p>';
      echo '<textarea style="width:100%;min-height:70px;" name="contact_form_shortcode">' . esc_textarea($value) . '</textarea>';
    },
    'page',
    'normal',
    'default'
  );
});

add_action('save_post_page', function ($post_id) {
  if (!isset($_POST['contact_form_shortcode_nonce']) || !wp_verify_nonce($_POST['contact_form_shortcode_nonce'], 'save_contact_form_shortcode')) return;
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
  if (!current_user_can('edit_page', $post_id)) return;

  $value = isset($_POST['contact_form_shortcode']) ? wp_kses_post($_POST['contact_form_shortcode']) : '';
  update_post_meta($post_id, '_contact_form_shortcode', $value);
});

/* =========================
 * 便利関数
 * ========================= */

function temp_path()    { echo esc_url(get_template_directory_uri()); }
function assets_path()  { echo esc_url(get_template_directory_uri() . '/assets'); }
function img_path()     { echo esc_url(get_template_directory_uri() . '/assets/img'); }
function uploads_path() { echo esc_url(wp_upload_dir()['baseurl']); }
function page_path($page = "") {
  echo esc_url(home_url(trailingslashit($page)));
}