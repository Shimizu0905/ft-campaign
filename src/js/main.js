// メインエントリーポイント（SCSSのインポート）
import '../scss/style.scss';

// スクロールインジケーター
import './scroll-indicator.js';

// 句読点の自動調整（text-align: justify用）
import { initCommaKuten } from './text-justify.js';
initCommaKuten('.u-text-kuten');
