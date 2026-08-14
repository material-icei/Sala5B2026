/* ============================================
   CURIOSIDADES DE ROMA — curiosidades-script.js
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


// ---------- Entrada animada de las tarjetas ----------
(function initCurioCards() {
  const cards = document.querySelectorAll('.curio-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const idx = Array.from(cards).indexOf(el);
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, idx * 120);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => observer.observe(card));
})();
