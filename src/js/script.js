import '../scss/style.scss';

// ハンバーガーメニューとドロワー
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.js-hamburger');
  const drawer = document.querySelector('.js-drawer');
  const header = document.querySelector('.js-header');
  const overlay = document.querySelector('.js-drawer-overlay');
  const drawerLinks = document.querySelectorAll('.c-drawer__item a');

  // ハンバーガーメニューのクリックイベント
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      drawer?.classList.toggle('is-active');
      header?.classList.toggle('is-active');
      document.body.classList.toggle('no-scroll');
    });
  }

  // オーバーレイのクリックイベント（メニューを閉じる）
  if (overlay) {
    overlay.addEventListener('click', () => {
      hamburger?.classList.remove('is-active');
      drawer?.classList.remove('is-active');
      header?.classList.remove('is-active');
      document.body.classList.remove('no-scroll');
    });
  }

  // ドロワーメニュー内のリンククリック時（メニューを閉じる）
  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('is-active');
      drawer?.classList.remove('is-active');
      header?.classList.remove('is-active');
      document.body.classList.remove('no-scroll');
    });
  });

  // ヘッダースクロール処理
  window.addEventListener('scroll', () => {
    const headerEl = document.querySelector('.c-header');
    if (window.scrollY > 50) {
      headerEl?.classList.add('is-scrolled');
    } else {
      headerEl?.classList.remove('is-scrolled');
    }
  });

  // リサイズ時にドロワーを閉じる
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      hamburger?.classList.remove('is-active');
      drawer?.classList.remove('is-active');
      document.body.classList.remove('no-scroll');
    }
  });

  // Experience ルート切り替え
  const experience = document.querySelector('.p-experience');
  const routeBtns = document.querySelectorAll('.p-experience__route-btn');

  routeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const route = btn.dataset.route; // 'habit' または 'result'

      // 1. 親要素に状態クラスを付与
      if (experience) {
        experience.classList.remove('is-habit', 'is-result');
        experience.classList.add('is-' + route);
      }

      // 2. ボタンの状態を更新
      routeBtns.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      // 3. ルートコンテンツの表示/非表示
      document.querySelectorAll('.p-experience__route').forEach((r) => r.classList.remove('is-active'));
      document.querySelector('.p-experience__route--' + route)?.classList.add('is-active');
    });
  });

  // 初期状態を設定（習慣化ルートがデフォルト）
  const activeRoute = experience?.querySelector('.p-experience__route.is-active');
  if (activeRoute?.classList.contains('p-experience__route--habit')) {
    experience?.classList.add('is-habit');
  } else if (activeRoute?.classList.contains('p-experience__route--result')) {
    experience?.classList.add('is-result');
  }
});