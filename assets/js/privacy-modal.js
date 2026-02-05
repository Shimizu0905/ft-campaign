function initPrivacyModal() {
  const modal = document.getElementById("privacy-modal");
  const modalBody = document.getElementById("privacy-modal-body");
  const closeBtn = modal == null ? void 0 : modal.querySelector(".c-privacy-modal__close");
  const overlay = modal == null ? void 0 : modal.querySelector(".c-privacy-modal__overlay");
  const agreeBtn = modal == null ? void 0 : modal.querySelector(".c-privacy-modal__agree-btn");
  if (!modal || !modalBody || !closeBtn || !overlay || !agreeBtn) return;
  const privacyLink = document.getElementById("privacy-link");
  if (privacyLink) {
    privacyLink.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }
  function openModal() {
    modal.classList.add("is-active");
    document.body.style.overflow = "hidden";
    modalBody.scrollTop = 0;
    agreeBtn.disabled = true;
    checkScroll();
  }
  function closeModal() {
    modal.classList.remove("is-active");
    document.body.style.overflow = "";
  }
  function checkScroll() {
    const scrollTop = modalBody.scrollTop;
    const scrollHeight = modalBody.scrollHeight;
    const clientHeight = modalBody.clientHeight;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    if (scrollBottom <= 10) {
      agreeBtn.disabled = false;
    } else {
      agreeBtn.disabled = true;
    }
  }
  modalBody.addEventListener("scroll", checkScroll);
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  agreeBtn.addEventListener("click", () => {
    const checkbox = document.getElementById("privacy_agree") || document.querySelector(".c-form__acceptance-checkbox");
    if (checkbox) {
      checkbox.checked = true;
      const event = new Event("change", { bubbles: true });
      checkbox.dispatchEvent(event);
    }
    closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-active")) {
      closeModal();
    }
  });
}
document.addEventListener("DOMContentLoaded", function() {
  initPrivacyModal();
});
