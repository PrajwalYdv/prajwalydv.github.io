/* =========================
   THEME TOGGLE (DARK / LIGHT)
========================= */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
} else {
  root.setAttribute("data-theme", "dark");
}

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

/* =========================
   FOOTER YEAR
========================= */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =========================
   TYPEWRITER EFFECT
========================= */
class TypeWriter {
  constructor(element, words, speed = 60, pause = 1400) {
    this.el = element;
    this.words = words;
    this.speed = speed;
    this.pause = pause;
    this.wordIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const currentWord = this.words[this.wordIndex];
    let displayedText;

    if (this.isDeleting) {
      this.charIndex--;
      displayedText = currentWord.substring(0, this.charIndex);
    } else {
      this.charIndex++;
      displayedText = currentWord.substring(0, this.charIndex);
    }

    this.el.textContent = displayedText;

    let typingSpeed = this.speed;

    if (!this.isDeleting && displayedText === currentWord) {
      typingSpeed = this.pause;
      this.isDeleting = true;
    } else if (this.isDeleting && displayedText === "") {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      typingSpeed = 400;
    }

    setTimeout(() => this.type(), typingSpeed);
  }
}

// Initialize typing effect
document.addEventListener("DOMContentLoaded", () => {
  const typedElement = document.querySelector(".typed");

  if (typedElement) {
    const words = JSON.parse(typedElement.getAttribute("data-words"));
    new TypeWriter(typedElement, words);
  }

  /* =========================
     SCROLL REVEAL ANIMATION
  ========================= */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(el => revealObserver.observe(el));
});
