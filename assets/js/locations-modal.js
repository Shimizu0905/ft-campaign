document.addEventListener("DOMContentLoaded", () => {
  const mapLink = document.getElementById("locations-map-link");
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImg = document.getElementById("gallery-lightbox-img");
  const lightboxClose = document.getElementById("gallery-lightbox-close");
  const lightboxOverlay = document.getElementById("gallery-lightbox-overlay");
  if (!mapLink || !lightbox || !lightboxImg) return;
  mapLink.addEventListener("click", (e) => {
    e.preventDefault();
    const imageUrl = mapLink.dataset.image;
    if (imageUrl) {
      lightboxImg.src = imageUrl;
      lightboxImg.alt = "FITNESS24 店舗マップ";
      lightbox.classList.add("is-open");
      document.body.classList.add("is-gallery-lightbox-open");
    }
  });
  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      closeLightbox();
    });
  }
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener("click", () => {
      closeLightbox();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("is-gallery-lightbox-open");
    setTimeout(() => {
      lightboxImg.src = "";
      lightboxImg.alt = "";
    }, 300);
  }
});
