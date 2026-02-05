// タイトルアニメーション - IntersectionObserverで表示時にis-inviewクラスを追加
const titles = document.querySelectorAll(
  '.p-fv__title, .p-about__title, .p-features__title, .p-crew__title, .p-gallery__title, .p-join__title, .p-locations__title'
);

// 要素が存在する場合のみ実行
if (titles.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.2,
    }
  );

  titles.forEach((title) => observer.observe(title));
}
