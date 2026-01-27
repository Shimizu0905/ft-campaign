// プライバシーポリシーモーダル機能
function initPrivacyModal() {
  const modal = document.getElementById('privacy-modal');
  const modalBody = document.getElementById('privacy-modal-body');
  const closeBtn = modal?.querySelector('.c-privacy-modal__close');
  const overlay = modal?.querySelector('.c-privacy-modal__overlay');
  const agreeBtn = modal?.querySelector('.c-privacy-modal__agree-btn');
  
  if (!modal || !modalBody || !closeBtn || !overlay || !agreeBtn) return;

  // プライバシーポリシーのリンクにクリックイベントを追加
  const privacyLink = document.getElementById('privacy-link');
  if (privacyLink) {
    privacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  // モーダルを開く
  function openModal() {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    // スクロール位置をリセット
    modalBody.scrollTop = 0;
    // ボタンを無効化
    agreeBtn.disabled = true;
    checkScroll();
  }

  // モーダルを閉じる
  function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  // スクロールをチェックして、下まで読んだらボタンを有効化
  function checkScroll() {
    const scrollTop = modalBody.scrollTop;
    const scrollHeight = modalBody.scrollHeight;
    const clientHeight = modalBody.clientHeight;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    // 下から10px以内に到達したら有効化
    if (scrollBottom <= 10) {
      agreeBtn.disabled = false;
    } else {
      agreeBtn.disabled = true;
    }
  }

  // スクロールイベント
  modalBody.addEventListener('scroll', checkScroll);

  // 閉じるボタン
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // 同意するボタン
  agreeBtn.addEventListener('click', () => {
    // チェックボックスを探してチェック
    const checkbox = document.getElementById('privacy_agree') || document.querySelector('.c-form__acceptance-checkbox');
    if (checkbox) {
      checkbox.checked = true;
      // changeイベントを発火
      const event = new Event('change', { bubbles: true });
      checkbox.dispatchEvent(event);
    }
    closeModal();
  });

  // ESCキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

// DOMContentLoaded時にモーダルを初期化
document.addEventListener('DOMContentLoaded', function() {
  initPrivacyModal();
});
