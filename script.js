/* FADE ANIMATION */
const elements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

/* THEME TOGGLE */
const toggleBtn = document.getElementById("themeToggle");
const html = document.documentElement;

toggleBtn.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  toggleBtn.textContent = next === "dark" ? "☀️" : "🌙";
});
