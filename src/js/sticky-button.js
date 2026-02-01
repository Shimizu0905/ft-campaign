/**
 * Sticky Button (PC & SP)
 * offerセクションの20%が表示されたらボタンを表示
 * それ以降フッターまでずっと表示
 * 上にスクロールしてofferの20%位置を過ぎたら非表示
 */

document.addEventListener('DOMContentLoaded', () => {
  const buttonPC = document.getElementById('sticky-button-pc');
  const buttonSP = document.querySelector('.p-sticky-footer--sp');
  const offerSection = document.querySelector('.p-offer');

  if (!offerSection) return;

  const show = () => {
    if (buttonPC) buttonPC.classList.add('is-visible');
    if (buttonSP) buttonSP.classList.add('is-visible');
  };
  const hide = () => {
    if (buttonPC) buttonPC.classList.remove('is-visible');
    if (buttonSP) buttonSP.classList.remove('is-visible');
  };

  hide(); // 初期は非表示

  let lastY = window.scrollY;

  const offerObserver = new IntersectionObserver(
    (entries) => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastY;
      lastY = currentY;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // offerが20%見えたら表示
          show();
          return;
        }

        // isIntersecting=false になったとき：
        // 下スクロールなら維持（offer通過後でも消さない）
        // 上スクロールなら非表示（offerへ戻る動き）
        if (!isScrollingDown) {
          hide();
        }
      });
    },
    { threshold: 0.2 }
  );

  offerObserver.observe(offerSection);
});
