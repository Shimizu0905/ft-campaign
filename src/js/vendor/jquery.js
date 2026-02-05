/**
 * jQuery単一インスタンス管理
 * - jQueryをグローバルに設定し、各モジュールで使用できるようにする
 * - このファイルから export することで、ESM環境でも統一されたjQueryインスタンスを使用
 */
import jQuery from 'jquery';

// グローバルに設定（slick-carouselなどのプラグインで必要）
window.$ = window.jQuery = jQuery;

export default jQuery;
