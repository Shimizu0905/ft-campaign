const crewData = [
  {
    id: 0,
    name: "上野トレーナー",
    store: "円山店",
    catchphrase: '"コミュ力おばけ"と言えばこの漢<br>円山指名率No.1!!',
    catchphraseHighlight: ["コミュ力おばけ", "円山指名率No.1!!"],
    description: "僕自身もともと体型へのコンプレックスから無理な食事やトレーニングを行い、続かなかった経験があります。無理な目標設定や無謀な挑戦ではなくしっかりとプロセスを作り、まずは手前のゴールに導けるような指導を心がけております!",
    achievements: [
      {
        title: "2021 MUSCLE GATE 札幌",
        details: ["ノービス-172/4位", "-168/4位"]
      },
      {
        title: "2023 JBBF 札幌",
        details: ["23歳以下級jrOPEN/2位", "-168/2位"]
      },
      {
        title: "2024 JBBF 北海道大会",
        details: ["-168/4位"]
      },
      {
        title: "2025 JBBF 北海道大会",
        details: ["-168/優勝"]
      }
    ],
    photo: "./assets/images/experience/tresapo/crew/crew-01.webp"
  },
  {
    id: 1,
    name: "栗生トレーナー",
    store: "桑園店",
    catchphrase: "桑園のマザーテレサ",
    catchphraseHighlight: [],
    description: "ジムに通うことが楽しくなってくれると嬉しいので、会員様が常にモチベーションを高めていけるよう心がけて、目標に向けて全力サポートしていきます。今日も楽しかった！と思ってもらえるような時間を心がけています。",
    achievements: [],
    photo: "./assets/images/experience/tresapo/crew/crew-02.webp"
  },
  {
    id: 2,
    name: "中村トレーナー",
    store: "菊水店",
    catchphrase: "筋トレに人生を救われた<br>筋トレオタク!",
    catchphraseHighlight: [],
    description: "セルフトレーニングで効果的に実践していただくために、自分自身のトレーニング経験をもとに、無理なく最短で結果が出せるよう大切なポイントを端的に伝えることを心がけています。",
    achievements: [
      {
        title: "2022 JBBF 北海道大会",
        details: ["23歳以下級−172/5位"]
      },
      {
        title: "2023 JBBF 北海道大会　−172/5位"
      },
      {
        title: "2024 JBBF 北海道大会　−172/2位"
      }
    ],
    photo: "./assets/images/experience/tresapo/crew/crew-03.webp"
  },
  {
    id: 3,
    name: "小玉トレーナー",
    store: "南郷7丁目店",
    catchphrase: "細マッチョになりたいなら<br>この漢に!",
    catchphraseHighlight: [],
    description: "サポート前にしっかりとヒアリングを行い、不安に寄り添い解消できるよう心がけています。重さや強度も個々に適した設定をレクチャーいたしますので、安心して受講していただけます。",
    achievements: [
      {
        title: "マッスルゲート札幌大会",
        details: ["JBBF 北海道大会メンズフィジーク<br>新人−172 4位<br>一般−172 5位"]
      }
    ],
    photo: "./assets/images/experience/tresapo/crew/crew-04.webp"
  }
];
function initCrewModal() {
  const modal = document.getElementById("crew-modal");
  const modalOverlay = document.getElementById("crew-modal-overlay");
  const modalClose = document.getElementById("crew-modal-close");
  if (!modal) return;
  let isModalOpen = false;
  let modalCurrentIndex = 0;
  function updateModalContent(index) {
    if (index < 0 || index >= crewData.length) return;
    const data = crewData[index];
    const modalContent = modal.querySelector(".p-crew-modal__content");
    if (!modalContent) return;
    let catchphraseHtml = data.catchphrase;
    if (data.catchphraseHighlight && data.catchphraseHighlight.length > 0) {
      data.catchphraseHighlight.forEach((highlight) => {
        catchphraseHtml = catchphraseHtml.replace(
          highlight,
          `<span class="p-crew-modal__catchphrase-highlight">${highlight}</span>`
        );
      });
    }
    const achievementsHtml = data.achievements.map((achievement) => {
      const detailsHtml = achievement.details && achievement.details.length > 0 ? achievement.details.map((detail) => `<span class="p-crew-modal__achievement-detail">${detail}</span>`).join(" ") : "";
      return `
        <li class="p-crew-modal__achievement-item">
          <span class="p-crew-modal__achievement-title">${achievement.title}</span>
          ${detailsHtml ? `<span class="p-crew-modal__achievement-details-wrapper">${detailsHtml}</span>` : ""}
        </li>
      `;
    }).join("");
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
    modal.setAttribute("aria-labelledby", `crew-modal-title-${index}`);
    modal.setAttribute("aria-describedby", `crew-modal-desc-${index}`);
  }
  function openModal(index) {
    if (index < 0 || index >= crewData.length) return;
    isModalOpen = true;
    modalCurrentIndex = index;
    updateModalContent(index);
    modal.classList.add("is-open");
    document.body.classList.add("is-modal-open");
    if (window.crewSlider) {
      window.crewSlider.slick("slickPause");
      window.crewSlider.slick("slickGoTo", index);
    }
  }
  function closeModal() {
    isModalOpen = false;
    modal.classList.remove("is-open");
    document.body.classList.remove("is-modal-open");
    if (window.crewSlider) {
      window.crewSlider.slick("slickPlay");
    }
  }
  function modalGoToNext() {
    modalCurrentIndex = (modalCurrentIndex + 1) % crewData.length;
    updateModalContent(modalCurrentIndex);
    if (window.crewSlider) {
      window.crewSlider.slick("slickGoTo", modalCurrentIndex);
    }
  }
  function modalGoToPrev() {
    modalCurrentIndex = (modalCurrentIndex - 1 + crewData.length) % crewData.length;
    updateModalContent(modalCurrentIndex);
    if (window.crewSlider) {
      window.crewSlider.slick("slickGoTo", modalCurrentIndex);
    }
  }
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
  function handleModalTouchEnd() {
    if (!isModalDragging) return;
    isModalDragging = false;
    const diffX = modalCurrentX - modalStartX;
    const threshold = 50;
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        modalGoToPrev();
      } else {
        modalGoToNext();
      }
    }
  }
  const modalPrevBtn = document.getElementById("crew-modal-prev");
  const modalNextBtn = document.getElementById("crew-modal-next");
  if (modalPrevBtn) {
    modalPrevBtn.addEventListener("click", modalGoToPrev);
  }
  if (modalNextBtn) {
    modalNextBtn.addEventListener("click", modalGoToNext);
  }
  if (modal) {
    modal.addEventListener("touchstart", handleModalTouchStart, { passive: true });
    modal.addEventListener("touchmove", handleModalTouchMove, { passive: true });
    modal.addEventListener("touchend", handleModalTouchEnd, { passive: true });
  }
  document.addEventListener("click", (e) => {
    var _a;
    if (e.target.closest(".p-crew__open")) {
      const btn = e.target.closest(".p-crew__open");
      e.stopPropagation();
      const crewId = parseInt(
        btn.getAttribute("data-open") || ((_a = btn.closest(".p-crew__slide")) == null ? void 0 : _a.getAttribute("data-crew")) || "0"
      );
      openModal(crewId);
    } else if (e.target.closest(".p-crew__photo")) {
      const photo = e.target.closest(".p-crew__photo");
      const slide = photo.closest(".p-crew__slide");
      if (slide) {
        e.stopPropagation();
        const crewId = parseInt(slide.getAttribute("data-crew") || "0");
        openModal(crewId);
      }
    }
  });
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isModalOpen) {
      closeModal();
    }
  });
}
document.addEventListener("DOMContentLoaded", function() {
  initCrewModal();
});
