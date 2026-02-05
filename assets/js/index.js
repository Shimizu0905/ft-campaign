import "./main.js";
import "./header.js";
import "./slider.js";
import "./experience.js";
import "./crew-slider.js";
import "./gallery-slider.js";
import "./faq.js";
import "./join-accordion.js";
import "./privacy-modal.js";
import "./locations-modal.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const titles = document.querySelectorAll(
  ".p-fv__title, .p-about__title, .p-features__title, .p-crew__title, .p-gallery__title, .p-join__title, .p-locations__title"
);
if (titles.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-inview");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.2
    }
  );
  titles.forEach((title) => observer.observe(title));
}
document.addEventListener("DOMContentLoaded", () => {
  const pagetopBtn = document.getElementById("pagetop");
  if (!pagetopBtn) return;
  pagetopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const buttonPC = document.getElementById("sticky-button-pc");
  const buttonSP = document.querySelector(".p-sticky-footer--sp");
  const offerSection = document.querySelector(".p-offer");
  if (!offerSection) return;
  const show = () => {
    if (buttonPC) buttonPC.classList.add("is-visible");
    if (buttonSP) buttonSP.classList.add("is-visible");
  };
  const hide = () => {
    if (buttonPC) buttonPC.classList.remove("is-visible");
    if (buttonSP) buttonSP.classList.remove("is-visible");
  };
  hide();
  let lastY = window.scrollY;
  const offerObserver = new IntersectionObserver(
    (entries) => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastY;
      lastY = currentY;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show();
          return;
        }
        if (!isScrollingDown) {
          hide();
        }
      });
    },
    { threshold: 0.2 }
  );
  offerObserver.observe(offerSection);
});
