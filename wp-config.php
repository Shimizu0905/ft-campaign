<?php
/**
 * The base configuration for WordPress
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 */

// ** Database settings ** //
define('DB_NAME', 'local');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');
define('DB_HOST', 'localhost');

define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');

// Keys and salts（※そのまま）
define('AUTH_KEY',          'xZhkF{N(KkmV18W[ds6w1@U:c9 D6qtK.3Q-QBH.Oujxw0W$s/1{SM;Y=rG]u*gM');
define('SECURE_AUTH_KEY',   'V]0ig{{I2n[*;^1H.+~J(9`aw#3k/%D`4tBP+UpF{c<[ZH&j.*FU!/%yHLH/kgsL');
define('LOGGED_IN_KEY',     'T?TWrOlN0<hQOwuUQKmvQ;L#5Vp|)]8{rBqLoO$U<vve^*vS#h>sY:99Wr{$Pskk');
define('NONCE_KEY',         '+MJ9&S$d*R/tj]^~5`Ljk2 0dElUtU3^[4$49+y+^iPDEx8FWLxi 1)^{$Mb$~R;');
define('AUTH_SALT',         'VmUllvHq;.Aqis{%)q<_M W!QwrKcxJn:v,dp;rYAH?W3Ez`5l!!O80+Q1 @Tu2p');
define('SECURE_AUTH_SALT',  'Ll B*p(x3>(`1Y&QI6!.*B,B(uEb>*]7t1x}vr1Z_L~Ewb3.e;zY3{(TX5jwSS4_');
define('LOGGED_IN_SALT',    'tK4$xB HtC}8Lt8S@:VwbM<jLU0V((X$QK_`^Bi ws) (@a}qy&%U.=$xlg;1@S2');
define('NONCE_SALT',        '{L1[lMN{H3Pz!~&y-WJ^hRb.j@+C|?]a6L#bH=+Q^Br5 ;fTIYtCD@0Yl&UT.FC1');
define('WP_CACHE_KEY_SALT', 'QC.  J-`4V_1R />L9ZiFlPEbzRf(~b3d>M<X]c)a`PW^yw 2Q!k_0et<)6MW]I$');

// DB prefix
$table_prefix = 'wp_';

/**
 * === Local dev flags ===
 * ここが重要：Vite分岐を確実にONにする
 */
define('WP_ENVIRONMENT_TYPE', 'local');
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', true);
define('SCRIPT_DEBUG', true);

// That's all, stop editing!
if (!defined('ABSPATH')) {
  define('ABSPATH', __DIR__ . '/');
}
require_once ABSPATH . 'wp-settings.php';
