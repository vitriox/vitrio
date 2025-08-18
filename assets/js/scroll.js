document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollToTopBtn");

  scrollBtn.style.opacity = "0";
  scrollBtn.style.transition = "opacity 0.3s ease";

  function toggleScrollButton() {
    const isMobile = window.matchMedia("(max-width: 600px)").matches;
    const scrolledPast = window.scrollY > (document.body.scrollHeight / 2.9);

    if (isMobile && scrolledPast) {
      scrollBtn.style.display = "block";
      requestAnimationFrame(() => {
        scrollBtn.style.opacity = "1";
      });
    } else {
      scrollBtn.style.opacity = "0";
      setTimeout(() => {
        if (scrollBtn.style.opacity === "0") {
          scrollBtn.style.display = "none";
        }
      }, 300);
    }
  }

  window.addEventListener("scroll", toggleScrollButton);
  window.addEventListener("resize", toggleScrollButton);

  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
