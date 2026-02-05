/**
 * jQuery グローバル設定
 * slick-carouselより先に読み込む必要がある
 */
import $ from 'jquery';

// グローバルに公開（slick-carousel等のプラグインで必要）
window.$ = window.jQuery = $;

export default $;
