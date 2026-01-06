const elements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

elements.forEach(el => observer.observe(el));

/* ========== Typed subtitle ========== */
(function initTyped() {
  const typedEl = document.querySelector(".typed");
  if (!typedEl) return;

  const phrases = [
    "Software Developer • ML • Computer Vision",
    "Building intelligent, scalable systems",
    "Computer Networking • System Design"
  ];

  let idx = 0, charIdx = 0, forward = true;

  function step() {
    const current = phrases[idx];
    if (forward) {
      charIdx++;
      typedEl.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        forward = false;
        setTimeout(step, 900);
        return;
      }
    } else {
      charIdx--;
      typedEl.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        forward = true;
        idx = (idx + 1) % phrases.length;
      }
    }
    setTimeout(step, forward ? 50 : 30);
  }
  step();
})();

/* ========== Blob parallax (mouse move) ========== */
(function initBlobParallax() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const blobs = Array.from(document.querySelectorAll(".hero .blob"));
  const strength = 0.02;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx);
    const dy = (e.clientY - cy);
    blobs.forEach((b, i) => {
      const tx = dx * strength * (i + 1);
      const ty = dy * strength * (i + 1);
      b.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${1 + i * 0.01})`;
    });
  });

  hero.addEventListener("mouseleave", () => {
    blobs.forEach(b => b.style.transform = "");
  });
})();
