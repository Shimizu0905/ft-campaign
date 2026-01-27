// Experience ルート切り替え
// タブと下のルート見出しが一体化して見えるUI実装
jQuery(function ($) {
  $(function () {
    const $experience = $('.p-experience');
    
    // タブクリック時の処理
    $('.p-experience__route-btn').on('click', function() {
      const $btn = $(this);
      const route = $btn.data('route'); // 'habit' または 'result'
      
      // 1. 親要素に状態クラスを付与（タブと見出し帯の色を連動させるため）
      $experience.removeClass('is-habit is-result');
      $experience.addClass('is-' + route);
      
      // 2. ボタンの状態を更新
      $('.p-experience__route-btn').removeClass('is-active').attr('aria-selected', 'false');
      $btn.addClass('is-active').attr('aria-selected', 'true');
      
      // 3. ルートコンテンツの表示/非表示
      $('.p-experience__route').removeClass('is-active');
      $('.p-experience__route--' + route).addClass('is-active');
    });
    
    // 初期状態を設定（習慣化ルートがデフォルト）
    const $activeRoute = $experience.find('.p-experience__route.is-active');
    if ($activeRoute.hasClass('p-experience__route--habit')) {
      $experience.addClass('is-habit');
    } else if ($activeRoute.hasClass('p-experience__route--result')) {
      $experience.addClass('is-result');
    }
  });
});
