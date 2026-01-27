// お客様の声スライダー（無限ループ：クローン方式）
function initVoiceSlider() {
  const track = document.getElementById('voice-track');
  const prevBtn = document.getElementById('voice-prev');
  const nextBtn = document.getElementById('voice-next');
  const dots = document.querySelectorAll('.p-voice__dot');

  if (!track || !prevBtn || !nextBtn) return;

  // もともとの本物スライド（4枚）
  const originalSlides = Array.from(track.querySelectorAll('.p-voice__slide'));
  const realCount = originalSlides.length;
  if (realCount === 0) return;

  let slideWidth = 0;

  // カードの高さを統一する関数
  function equalizeCardHeights() {
    // 全てのカードを取得（クローンも含む）
    const allCards = Array.from(track.querySelectorAll('.p-voice__card'));
    if (allCards.length === 0) return;

    // 一時的に高さをリセットして自然な高さを取得
    allCards.forEach(card => {
      card.style.height = 'auto';
    });

    // 全てのカードの高さを計算して最大値を取得
    let maxHeight = 0;
    allCards.forEach(card => {
      const height = card.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    // 全てのカードに最大の高さを適用
    if (maxHeight > 0) {
      allCards.forEach(card => {
        card.style.height = `${maxHeight}px`;
      });
    }
  }

  // クローン作成（末尾クローン + 先頭クローン）
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[realCount - 1].cloneNode(true);
  firstClone.classList.add('is-clone');
  lastClone.classList.add('is-clone');

  // いったんトラックを作り直す（順番が重要）
  track.innerHTML = '';
  track.appendChild(lastClone);
  originalSlides.forEach(s => track.appendChild(s));
  track.appendChild(firstClone);

  // 作り直した後のスライド一覧（6枚）
  const slides = Array.from(track.querySelectorAll('.p-voice__slide'));

  // クローン作成後、カードの高さを統一
  equalizeCardHeights();

  // currentIndex は「トラック上の位置」
  // 0: lastClone, 1..realCount: 本物, realCount+1: firstClone
  let currentIndex = 1;

  // アニメ制御（連打対策）
  let isAnimating = false;

  // スライド幅を計算
  function calculateSlideWidth() {
    const slider = track.closest('.p-voice__slider');
    if (!slider) return;
    slideWidth = slider.offsetWidth;
    
    // カードの高さを再計算
    equalizeCardHeights();
    
    jumpTo(currentIndex); // リサイズ後に位置を合わせる（アニメなし）
  }

  // アニメありで移動
  function moveTo(index) {
    if (isAnimating) return;
    isAnimating = true;

    track.style.transition = 'transform 0.3s ease';
    track.style.transform = `translateX(${-index * slideWidth}px)`;
    currentIndex = index;

    updateUI(); // ドット更新（※ここは実インデックス換算）
  }

  // アニメなしで瞬間移動
  function jumpTo(index) {
    // アニメーションを無効化して瞬間移動
    track.style.transition = 'none';
    track.style.transform = `translateX(${-index * slideWidth}px)`;
    currentIndex = index;

    // 次のフレームでtransitionを戻す（次のmoveで効くように）
    // 少し遅延を入れて確実にtransitionをリセット
    setTimeout(() => {
      track.style.transition = 'transform 0.3s ease';
    }, 50);

    updateUI();
  }

  // トラック上の index → 本物の index（0..realCount-1）へ変換
  function getRealIndex() {
    if (currentIndex === 0) return realCount - 1;            // lastClone 表示中は本物の最後
    if (currentIndex === realCount + 1) return 0;            // firstClone 表示中は本物の最初
    return currentIndex - 1;                                 // 本物は 1..realCount
  }

  // ドット等のUI更新
  function updateUI() {
    const realIndex = getRealIndex();

    dots.forEach((dot, i) => {
      if (i === realIndex) {
        dot.classList.add('is-active');
      } else {
        dot.classList.remove('is-active');
      }
    });

    // ボタンは常に有効（無限ループ）
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }

  // 次へ
  function goToNext() {
    moveTo(currentIndex + 1);
  }

  // 前へ
  function goToPrev() {
    moveTo(currentIndex - 1);
  }

  // ドットで移動（本物のindex指定 → トラック上のindexへ変換）
  function goToSlide(realIndex) {
    // 本物の realIndex(0..3) は trackIndex = realIndex + 1
    moveTo(realIndex + 1);
  }

  // アニメ終了後：クローンに到達していたら本物へ瞬間移動
  track.addEventListener('transitionend', (e) => {
    // transformのtransitionのみ処理（他のtransitionは無視）
    if (e.propertyName !== 'transform') return;
    
    isAnimating = false;

    // lastClone に到達（index=0）→ 本物の最後へ
    if (currentIndex === 0) {
      jumpTo(realCount);
      return;
    }

    // firstClone に到達（index=realCount+1）→ 本物の最初へ
    if (currentIndex === realCount + 1) {
      jumpTo(1);
      return;
    }
  });

  // クリックイベント
  prevBtn.addEventListener('click', goToPrev);
  nextBtn.addEventListener('click', goToNext);

  // スワイプ・ドラッグ対応（タッチとマウスの両方）
  const slider = track.closest('.p-voice__slider');
  if (!slider) return;

  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  // タッチ開始
  function handleTouchStart(e) {
    if (slideWidth === 0) return; // slideWidthが計算されていない場合は無視
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    track.style.transition = 'none';
    e.preventDefault(); // スクロールを防ぐ
  }

  // タッチ移動中
  function handleTouchMove(e) {
    if (!isDragging || slideWidth === 0) return;
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    track.style.transform = `translateX(${(-currentIndex * slideWidth) + diffX}px)`;
    e.preventDefault(); // スクロールを防ぐ
  }

  // タッチ終了
  function handleTouchEnd(e) {
    if (!isDragging) return;
    isDragging = false;

    const diffX = currentX - startX;
    const threshold = slideWidth * 0.2; // しきい値を20%に調整（より反応しやすく）

    track.style.transition = 'transform 0.3s ease';

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    } else {
      // 元の位置へ戻す
      track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
      isAnimating = false;
    }
  }

  // マウスドラッグ対応（デスクトップでも動作）
  function handleMouseDown(e) {
    if (slideWidth === 0) return;
    startX = e.clientX;
    currentX = startX;
    isDragging = true;
    track.style.transition = 'none';
    e.preventDefault();
  }

  function handleMouseMove(e) {
    if (!isDragging || slideWidth === 0) return;
    currentX = e.clientX;
    const diffX = currentX - startX;
    track.style.transform = `translateX(${(-currentIndex * slideWidth) + diffX}px)`;
  }

  function handleMouseUp(e) {
    if (!isDragging) return;
    isDragging = false;

    const diffX = currentX - startX;
    const threshold = slideWidth * 0.2;

    track.style.transition = 'transform 0.3s ease';

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    } else {
      track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
      isAnimating = false;
    }
  }

  // タッチイベント（スマホ）
  slider.addEventListener('touchstart', handleTouchStart, { passive: false });
  slider.addEventListener('touchmove', handleTouchMove, { passive: false });
  slider.addEventListener('touchend', handleTouchEnd, { passive: true });
  slider.addEventListener('touchcancel', handleTouchEnd, { passive: true });

  // マウスイベント（デスクトップ）
  slider.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  // リサイズ
  window.addEventListener('resize', calculateSlideWidth);

  // 初期化
  calculateSlideWidth();
  jumpTo(1); // 本物1枚目を表示
  
  // 画像の読み込み完了後にもカードの高さを再計算
  const images = track.querySelectorAll('img');
  let loadedImages = 0;
  const totalImages = images.length;
  
  if (totalImages > 0) {
    images.forEach(img => {
      if (img.complete) {
        loadedImages++;
        if (loadedImages === totalImages) {
          equalizeCardHeights();
        }
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === totalImages) {
            equalizeCardHeights();
          }
        });
      }
    });
  } else {
    // 画像がない場合は少し遅延させて実行
    setTimeout(() => {
      equalizeCardHeights();
    }, 100);
  }
}

// DOMContentLoaded時にスライダーを初期化
document.addEventListener('DOMContentLoaded', function() {
  initVoiceSlider();
});
