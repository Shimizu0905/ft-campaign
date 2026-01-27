// Support Crewスライダー（Slick Carousel + モーダル対応）
// スタッフデータ（4人分）
const crewData = [
  {
    id: 0,
    name: '上野トレーナー',
    store: '円山店',
    catchphrase: '"コミュ力おばけ"と言えばこの漢 円山指名率No.1!!',
    catchphraseHighlight: ['コミュ力おばけ', '円山指名率No.1!!'], // 緑色で強調する部分
    description: '僕自身もともと体型へのコンプレックスから無理な食事やトレーニングを行い、続かなかった経験があります。無理な目標設定や無謀な挑戦ではなくしっかりとプロセスを作り、まずは手前のゴールに導けるような指導を心がけております!',
    achievements: [
      {
        title: '2021 MUSCLE GATE 札幌',
        details: ['ノービス-172/4位', '-168/4位']
      },
      {
        title: '2023 JBBF 札幌',
        details: ['23歳以下級jrOPEN/2位', '-168/2位']
      },
      {
        title: '2024 JBBF 北海道大会',
        details: ['-168/4位']
      },
      {
        title: '2025 JBBF 北海道大会',
        details: ['-168/優勝']
      }
    ],
    photo: '/assets/images/experience/tresapo/crew/crew-01.webp'
  },
  {
    id: 1,
    name: 'Yuki Tanaka',
    store: 'FITNESS24 渋谷店',
    catchphrase: '楽しく続けられるトレーニングを',
    catchphraseHighlight: [],
    description: 'スポーツトレーナーとしての経験を活かし、機能的なトレーニングを提供。初心者の方でも安心して取り組めるよう、丁寧にサポートします。「続けること」を大切にし、無理のないペースで目標達成を目指します。',
    achievements: [
      {
        title: 'NSCA認定パーソナルトレーナー',
        details: []
      },
      {
        title: 'ストレッチングインストラクター',
        details: []
      },
      {
        title: '延べ300名以上の指導実績',
        details: []
      }
    ],
    photo: '/assets/images/experience/tresapo/crew/crew-02.webp'
  },
  {
    id: 2,
    name: 'Mika Suzuki',
    store: 'FITNESS24 池袋店',
    catchphrase: '女性のためのボディメイク',
    catchphraseHighlight: [],
    description: '女性特有の悩みに寄り添ったトレーニングプログラムを提供。食事指導も含めたトータルサポートで、理想の体を実現します。産後ダイエットや姿勢改善など、幅広いニーズに対応可能です。',
    achievements: [
      {
        title: '女性ボディメイク専門資格',
        details: []
      },
      {
        title: '産後ケアトレーナー',
        details: []
      },
      {
        title: '延べ400名以上の指導実績',
        details: []
      }
    ],
    photo: '/assets/images/experience/tresapo/crew/crew-03.webp'
  },
  {
    id: 3,
    name: 'Takeshi Yamamoto',
    store: 'FITNESS24 横浜店',
    catchphrase: '結果にこだわる本格トレーニング',
    catchphraseHighlight: [],
    description: '競技スポーツの経験を活かし、パフォーマンス向上を重視した指導を行います。筋力アップ、パワー向上など、具体的な目標達成をサポート。科学的根拠に基づいたトレーニングメニューで、確実に結果を出します。',
    achievements: [
      {
        title: 'CSCS認定ストレングス&コンディショニングスペシャリスト',
        details: []
      },
      {
        title: 'アスリート指導経験10年',
        details: []
      },
      {
        title: '延べ600名以上の指導実績',
        details: []
      }
    ],
    photo: '/assets/images/experience/tresapo/crew/crew-04.webp'
  }
];

// スライダー初期化（Slick Carousel使用）
function initCrewSlider() {
  const modal = document.getElementById('crew-modal');
  const modalOverlay = document.getElementById('crew-modal-overlay');
  const modalClose = document.getElementById('crew-modal-close');

  if (!modal) return;

  // モーダル状態
  let isModalOpen = false;
  let modalCurrentIndex = 0; // モーダル内の現在のスタッフID
  let $crew = null; // SlickのjQueryオブジェクトを保持

  // モーダル内容を更新
  function updateModalContent(index) {
    if (index < 0 || index >= crewData.length) return;

    const data = crewData[index];
    const modalContent = modal.querySelector('.p-crew-modal__content');
    if (!modalContent) return;

    // キャッチフレーズのハイライト処理
    let catchphraseHtml = data.catchphrase;
    if (data.catchphraseHighlight && data.catchphraseHighlight.length > 0) {
      data.catchphraseHighlight.forEach(highlight => {
        catchphraseHtml = catchphraseHtml.replace(highlight, `<span class="p-crew-modal__catchphrase-highlight">${highlight}</span>`);
      });
    }

    // 実績リストの生成
    const achievementsHtml = data.achievements.map(achievement => {
      const detailsHtml = achievement.details && achievement.details.length > 0
        ? achievement.details.map(detail => `<span class="p-crew-modal__achievement-detail">${detail}</span>`).join('')
        : '';
      return `
        <li class="p-crew-modal__achievement-item">
          <span class="p-crew-modal__achievement-title">${achievement.title}</span>
          ${detailsHtml}
        </li>
      `;
    }).join('');

    modalContent.innerHTML = `
      <div class="p-crew-modal__header">
        <img src="${data.photo}" alt="${data.name}" class="p-crew-modal__photo">
        <div class="p-crew-modal__info">
          <h4 class="p-crew-modal__name">${data.name}<span class="p-crew-modal__store">〈${data.store}〉</span></h4>
        </div>
      </div>
      <div class="p-crew-modal__body">
        <p class="p-crew-modal__catchphrase">${catchphraseHtml}</p>
        <div class="p-crew-modal__description">
          <p>${data.description}</p>
        </div>
        <div class="p-crew-modal__achievements">
          <ul class="p-crew-modal__achievements-list">
            ${achievementsHtml}
          </ul>
        </div>
      </div>
    `;

    // aria属性更新
    modal.setAttribute('aria-labelledby', `crew-modal-title-${index}`);
    modal.setAttribute('aria-describedby', `crew-modal-desc-${index}`);
  }

  // モーダルを開く
  function openModal(index) {
    if (index < 0 || index >= crewData.length) return;

    isModalOpen = true;
    modalCurrentIndex = index;
    updateModalContent(index);
    modal.classList.add('is-open');
    document.body.classList.add('is-modal-open');

    // 背景スライダーを確実に停止してから該当スタッフを中央に
    if ($crew) {
      $crew.slick('slickPause'); // 自動再生を完全に停止
      $crew.slick('slickGoTo', index, true); // trueでアニメーションなしで同期
    }
  }

  // モーダルを閉じる
  function closeModal() {
    isModalOpen = false;
    modal.classList.remove('is-open');
    document.body.classList.remove('is-modal-open');

    // スライダーの自動再生を再開
    if ($crew) {
      // 現在のスライドインデックスを取得
      const currentSlide = $crew.slick('slickCurrentSlide');
      // 1枚目の場合は10000ms、それ以外は3500ms
      const autoplaySpeed = currentSlide === 0 ? 6000 : 3500;
      $crew.slick('slickSetOption', 'autoplaySpeed', autoplaySpeed, true);
      $crew.slick('slickPlay'); // 自動再生を再開
    }
  }

  // モーダル内で次へ
  function modalGoToNext() {
    modalCurrentIndex = (modalCurrentIndex + 1) % crewData.length;
    updateModalContent(modalCurrentIndex);
    // 背景スライダーも同期（自動再生は停止したまま）
    if ($crew) {
      $crew.slick('slickPause'); // 念のため再度停止
      $crew.slick('slickGoTo', modalCurrentIndex, true); // trueでアニメーションなし
    }
  }

  // モーダル内で前へ
  function modalGoToPrev() {
    modalCurrentIndex = (modalCurrentIndex - 1 + crewData.length) % crewData.length;
    updateModalContent(modalCurrentIndex);
    // 背景スライダーも同期（自動再生は停止したまま）
    if ($crew) {
      $crew.slick('slickPause'); // 念のため再度停止
      $crew.slick('slickGoTo', modalCurrentIndex, true); // trueでアニメーションなし
    }
  }

  // モーダル内スワイプ
  let modalStartX = 0;
  let modalCurrentX = 0;
  let isModalDragging = false;

  function handleModalTouchStart(e) {
    modalStartX = e.touches[0].clientX;
    modalCurrentX = modalStartX;
    isModalDragging = true;
  }

  function handleModalTouchMove(e) {
    if (!isModalDragging) return;
    modalCurrentX = e.touches[0].clientX;
  }

  function handleModalTouchEnd(e) {
    if (!isModalDragging) return;
    isModalDragging = false;

    const diffX = modalCurrentX - modalStartX;
    const threshold = 50; // スワイプしきい値

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        modalGoToPrev();
      } else {
        modalGoToNext();
      }
    }
  }

  // モーダル内のナビゲーションボタン
  const modalPrevBtn = document.getElementById('crew-modal-prev');
  const modalNextBtn = document.getElementById('crew-modal-next');

  if (modalPrevBtn) {
    modalPrevBtn.addEventListener('click', modalGoToPrev);
  }
  if (modalNextBtn) {
    modalNextBtn.addEventListener('click', modalGoToNext);
  }

  // モーダル内スワイプ
  if (modal) {
    modal.addEventListener('touchstart', handleModalTouchStart, { passive: true });
    modal.addEventListener('touchmove', handleModalTouchMove, { passive: true });
    modal.addEventListener('touchend', handleModalTouchEnd, { passive: true });
  }

  // モーダル開閉イベント
  // 各カードの丸矢印ボタン（動的に追加される要素なので、イベント委譲を使用）
  document.addEventListener('click', (e) => {
    if (e.target.closest('.p-crew__open')) {
      const btn = e.target.closest('.p-crew__open');
      e.stopPropagation();
      const crewId = parseInt(btn.getAttribute('data-open') || btn.closest('.p-crew__slide')?.getAttribute('data-crew') || '0');
      openModal(crewId);
    }
  });

  // 閉じるボタン
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // オーバーレイクリック
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  // ESCキー
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalOpen) {
      closeModal();
    }
  });

  // Slick Carousel初期化（features-sliderと同じ設定）
  jQuery(function ($) {
    $(document).ready(function() {
      const $slider = $(".p-crew__slider");
      if ($slider.length) {
        // jQueryオブジェクトとして保持
        $crew = $slider;
        
        $crew.slick({
          centerMode: true,
          centerPadding: '5%',
          dots: true,
          autoplay: true,
          autoplaySpeed: 10000,
          speed: 1000,
          infinite: true,
          arrows: false, // 矢印を非表示
          swipe: true, // スワイプを有効化
          touchMove: true, // タッチ移動を有効化
        });

        // スライド変更時にautoplaySpeedを変更（features-sliderと同じ）
        $crew.on("afterChange", function(event, slick, currentSlide, nextSlide) {
          // モーダルが開いている場合は同期のみ行い、autoplay関連操作は絶対にしない
          if (isModalOpen) {
            modalCurrentIndex = currentSlide;
            updateModalContent(currentSlide);
            return; // モーダルが開いている間はautoplaySpeedの変更は行わない
          }

          // モーダルが閉じている場合のみautoplaySpeedを変更
          switch (currentSlide){
            case 0:
              // 1枚目のスライド
              $crew.slick("slickSetOption", "autoplaySpeed", 10000, true);
              break;
            default:
              // その他のスライド
              $crew.slick("slickSetOption", "autoplaySpeed", 3500, true);
              break;
          }
        });
      }
    });
  });
}

// DOMContentLoaded時にスライダーを初期化
document.addEventListener('DOMContentLoaded', function() {
  initCrewSlider();
});
