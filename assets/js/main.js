function updateHeroHeight() {
  const hero = document.querySelector('.video-hero__pin');
  if (hero) {
    hero.style.height = `${window.innerHeight}px`;
  }
}

window.addEventListener('load', updateHeroHeight);
window.addEventListener('resize', updateHeroHeight);
window.addEventListener('orientationchange', updateHeroHeight);