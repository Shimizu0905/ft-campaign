function initFAQ() {
  const faqItems = document.querySelectorAll(".p-faq__content-item");
  faqItems.forEach((item) => {
    const title = item.querySelector(".p-faq__content-item-title");
    const button = item.querySelector(".p-faq__content-item-title-icon");
    if (!title || !button) return;
    title.addEventListener("click", (e) => {
      if (e.target === button || button.contains(e.target)) {
        e.stopPropagation();
      }
      const isOpen = item.classList.contains("p-faq__content-item--open");
      if (isOpen) {
        item.classList.remove("p-faq__content-item--open");
        button.setAttribute("aria-label", "開く");
      } else {
        item.classList.add("p-faq__content-item--open");
        button.setAttribute("aria-label", "閉じる");
      }
    });
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = item.classList.contains("p-faq__content-item--open");
      if (isOpen) {
        item.classList.remove("p-faq__content-item--open");
        button.setAttribute("aria-label", "開く");
      } else {
        item.classList.add("p-faq__content-item--open");
        button.setAttribute("aria-label", "閉じる");
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", function() {
  initFAQ();
});
