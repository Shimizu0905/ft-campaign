// main.js
// jQueryをグローバル化（slick-carouselより先に読み込む）
import './jquery-setup.js';

// slick-carousel（jQueryプラグイン）
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../scss/style.scss';

import './scroll-indicator.js';
import { initCommaKuten } from './text-justify.js';

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
import './sticky-button.js';
import './pagetop.js';

// main全体に句読点処理
initCommaKuten('main');
