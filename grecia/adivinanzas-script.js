/* ============================================
   ADIVINANZAS DE LOS DIOSES — adivinanzas-script.js
   ============================================ */

// ---------- Partículas de fondo (igual que la landing) ----------
(function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const symbols = ['⭐', '✨', '💛', '🌟', '🔶', '🟡', '🪙', '💫', '🔸'];
  const COUNT = 14;

  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement('span');
    el.classList.add('particle');
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const size  = 0.8 + Math.random() * 1.2;
    const left  = Math.random() * 100;
    const delay = Math.random() * 18;
    const dur   = 12 + Math.random() * 16;

    el.style.cssText = `
      font-size: ${size}rem;
      left: ${left}%;
      animation-duration: ${dur}s;
      animation-delay: -${delay}s;
    `;
    container.appendChild(el);
  }
})();


// ---------- Flip de tarjetas + progreso ----------
(function initRiddleCards() {
  const cards = document.querySelectorAll('.riddle-card');
  const progressEl = document.getElementById('adivProgress');
  if (!cards.length) return;

  const revealed = new Set();

  function updateProgress() {
    if (!progressEl) return;
    progressEl.textContent = `${revealed.size} de ${cards.length} adivinanzas descubiertas 🏺`;
    if (revealed.size === cards.length) {
      progressEl.textContent = '¡Descubriste a los 4 dioses! 🎉🏛️';
    }
  }

  cards.forEach((card) => {
    const flipBtns = card.querySelectorAll('.riddle-flip-btn');
    const audio = card.querySelector('.riddle-audio');

    flipBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        card.classList.toggle('flipped');

        // Pausar el audio al dar vuelta la tarjeta
        if (audio) audio.pause();

        if (card.classList.contains('flipped')) {
          revealed.add(card.dataset.riddle);
          updateProgress();
        }
      });
    });
  });

  updateProgress();
})();


// ---------- Mini-carrusel de imágenes (tarjetas con más de 1 dibujo) ----------
(function initRiddleCarousels() {
  document.querySelectorAll('.riddle-img-carousel').forEach((carousel) => {
    const images  = Array.from(carousel.querySelectorAll('.riddle-carousel-img'));
    const dots    = Array.from(carousel.querySelectorAll('.riddle-dot-btn'));
    const prevBtn = carousel.querySelector('.riddle-carousel-btn.prev');
    const nextBtn = carousel.querySelector('.riddle-carousel-btn.next');

    if (images.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    let current = 0;

    function show(index) {
      current = (index + images.length) % images.length;
      images.forEach((img, i) => img.classList.toggle('active', i === current));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
    nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        show(parseInt(dot.dataset.index, 10) || 0);
      });
    });
  });
})();
