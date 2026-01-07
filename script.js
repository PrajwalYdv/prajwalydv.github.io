// theme toggle and persistence
const themeToggle = document.getElementById('themeToggle');
const body = document.documentElement; // <html>
const saved = localStorage.getItem('theme');
if (saved) body.setAttribute('data-theme', saved);
else body.setAttribute('data-theme', 'dark'); // default

themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// set year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// simple typewriter rotating words for hero
class Typer {
  constructor(el, words = [], typeSpeed = 60, pause = 1600) {
    this.el = el;
    this.words = words;
    this.typeSpeed = typeSpeed;
    this.pause = pause;
    this.wordIndex = 0;
    this.charIndex = 0;
    this.forward = true;
    this.loop();
  }
  loop() {
    const current = this.words[this.wordIndex];
    if(this.forward) {
      this.charIndex++;
      this.el.textContent = current.slice(0, this.charIndex);
      if(this.charIndex === current.length) {
        this.forward = false;
        setTimeout(()=> this.loop(), this.pause);
        return;
      }
    } else {
      this.charIndex--;
      this.el.textContent = current.slice(0, this.charIndex);
      if(this.charIndex === 0) {
        this.forward = true;
        this.wordIndex = (this.wordIndex + 1) % this.words.length;
      }
    }
    setTimeout(()=> this.loop(), this.typeSpeed);
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  // initialize typed word
  const typedEl = document.querySelector('.typed');
  if(typedEl){
    let words = [];
    try { words = JSON.parse(typedEl.dataset.words); } catch(e){ words = ['I build things.']; }
    new Typer(typedEl, words, 40, 1300);
  }

  // intersection observer for fade-up
  const elements = document.querySelectorAll('.section, .exp-card, .project-card, .edu-card, .skill, .hero-left, .hero-right');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('show','fade-up');
    });
  }, { threshold: 0.12 });

  elements.forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  // ensure toggle knob initial position matches theme (visual handled in CSS)
});
