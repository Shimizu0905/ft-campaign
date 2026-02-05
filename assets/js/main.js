function initScrollIndicator() {
  const indicator = document.getElementById("scroll-indicator");
  if (!indicator) return;
  const scrollThreshold = 100;
  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY >= scrollThreshold) {
      indicator.classList.add("is-hidden");
    } else {
      indicator.classList.remove("is-hidden");
    }
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}
document.addEventListener("DOMContentLoaded", initScrollIndicator);
