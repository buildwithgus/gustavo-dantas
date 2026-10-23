const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
let width = 0, height = 0;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = Math.min(90, Math.floor((width * height) / 15000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.35,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    alpha: Math.random() * 0.6 + 0.15
  }));
}
function drawParticles() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    if (!reducedMotion) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(66,245,255,${p.alpha})`;
    ctx.fill();
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x, dy = p.y - q.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(66,245,255,${(1 - distance / 100) * 0.12})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  if (!reducedMotion) requestAnimationFrame(drawParticles);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawParticles();

const phrases = [
  "Construindo soluções inteligentes",
  "Explorando Dados e Inteligência Artificial",
  "Transformando ideias em sistemas",
  "Aprendendo. Desenvolvendo. Evoluindo."
];
const typedText = document.getElementById("typedText");
let phraseIndex = 0, charIndex = 0, deleting = false;
function typeLoop() {
  if (reducedMotion) { typedText.textContent = phrases[0]; return; }
  const phrase = phrases[phraseIndex];
  typedText.textContent = phrase.substring(0, charIndex);
  if (!deleting && charIndex < phrase.length) {
    charIndex++;
    setTimeout(typeLoop, 58);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeLoop, 28);
  } else {
    deleting = !deleting;
    if (!deleting) phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeLoop, deleting ? 1500 : 350);
  }
}
typeLoop();

document.getElementById("year").textContent = new Date().getFullYear();
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}));

// Permite que o visitante pause e retome o movimento pelo teclado.
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});
