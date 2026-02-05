// メインエントリーポイント
// jQueryとSlickの初期化（1箇所に集約）
import $ from './vendor/jquery.js';

import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// プロジェクトのスタイル（後で読み込んで優先）
import '../scss/style.scss';

// 全ページ共通の機能
import './scroll-indicator.js';
import { initCommaKuten } from './text-justify.js';

// ページ要素ベースの機能（要素が存在する場合のみ実行）
import './about-title.js';
import './header.js';
import './slider.js';
import './experience.js';
import './crew-slider.js';
import './gallery-slider.js';
import './faq.js';
import './join-accordion.js';
import './privacy-modal.js';
import './locations-modal.js';

// 句読点の自動調整を初期化
initCommaKuten('main');
