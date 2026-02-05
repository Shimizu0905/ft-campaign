function initJoinAccordion() {
  const items = document.querySelectorAll(".p-join__item");
  items.forEach((item) => {
    const header = item.querySelector(".p-join__item-header");
    if (!header) return;
    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("p-join__item--open");
      if (isOpen) {
        item.classList.remove("p-join__item--open");
        header.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("p-join__item--open");
        header.setAttribute("aria-expanded", "true");
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", initJoinAccordion);
