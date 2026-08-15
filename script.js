// ============================================================
// Trayectoria — cursos y certificaciones
// Ordenados cronológicamente. major = hito destacado (color cobre).
// ============================================================
const TIMELINE = [
  {
    date: "Octubre 2022",
    title: "Curso de Matemática, Física y Química",
    org: "Instituto Técnico \"San Silvestre\" · R.M. 0262/2022",
    hours: null,
  },
  {
    date: "Mayo 2023",
    title: "I Congreso Nacional en Instalaciones Eléctricas y Seguridad Industrial",
    org: "El Docente Influencer / Electrotech — La Paz",
    hours: 80,
  },
  {
    date: "Junio 2023",
    title: "Taller \"Simulador de Microempresa\"",
    org: "Instituto Tecnológico Industrial Brasil-Bolivia (ITIBB)",
    hours: 10,
  },
  {
    date: "Septiembre 2023",
    title: "Seminario de Instalación de Cámaras de Seguridad",
    org: "ITIBB · en coordinación con Indomotek",
    hours: 20,
  },
  {
    date: "Octubre 2023",
    title: "I Congreso Internacional en Tecnología y Emprendimiento Productivo",
    org: "FDTEUO — Oruro, Bolivia",
    hours: 120,
  },
  {
    date: "Septiembre 2024",
    title: "Capacitación en Prevención de Riesgos y Primeros Auxilios en la Industria",
    org: "ITIBB",
    hours: 42,
  },
  {
    date: "Septiembre 2024",
    title: "Capacitación en Instrumentación Industrial",
    org: "ITIBB",
    hours: 24,
  },
  {
    date: "Septiembre 2024",
    title: "Capacitación en Ciberseguridad — Seguridad y Herramientas Perimetrales",
    org: "ITIBB",
    hours: 24,
  },
  {
    date: "Septiembre 2024",
    title: "Fibra Óptica FTTX — Fundamentos y Aplicaciones en Telecomunicaciones",
    org: "ITIBB",
    hours: 24,
  },
  {
    date: "Nov. 2024 — Mar. 2025",
    title: "Práctica Laboral · Dirección Académica",
    org: "Instituto Tecnológico Industrial Brasil-Bolivia (ITIBB)",
    hours: 420,
    major: true,
  },
  {
    date: "Jul. 2026",
    title: "Técnico Auxiliar en Inteligencia Artificial",
    org: "Confederación Universitaria Boliviana (CUB) · R.M. 125/25",
    hours: 100,
    major: true,
  },
];

const MAX_HOURS = Math.max(...TIMELINE.filter(t => t.hours).map(t => t.hours));

function barWidth(hours) {
  if (!hours) return 0;
  const ratio = Math.sqrt(hours / MAX_HOURS);
  return Math.round(18 + ratio * 82);
}

function renderTimeline() {
  const list = document.getElementById("timeline-list");
  if (!list) return;

  list.innerHTML = TIMELINE.map(item => {
    const w = barWidth(item.hours);
    const hoursLabel = item.hours ? `${item.hours} hrs` : "—";
    return `
      <li class="t-item${item.major ? " is-major" : ""}">
        <p class="t-date">${item.date}</p>
        <div class="t-head">
          <h3 class="t-title">${item.title}</h3>
          <span class="t-hours">${hoursLabel}</span>
        </div>
        <p class="t-org">${item.org}</p>
        ${item.hours ? `
        <div class="t-bar-track">
          <div class="t-bar-fill" style="--w:${w}%"></div>
        </div>` : ""}
      </li>
    `;
  }).join("");
}

function observeTimeline() {
  const items = document.querySelectorAll(".t-item");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));
}

// ============================================================
// Typewriter — mensaje debajo del hero
// ============================================================
function typewriter() {
  const el = document.getElementById("tw-text");
  if (!el) return;

  const msg = "Tengo el conocimiento técnico para entender el hardware industrial y la capacidad práctica de usar IA para optimizar sus datos y procesos.";
  let i = 0;

  function tick() {
    if (i <= msg.length) {
      el.textContent = msg.slice(0, i);
      i++;
      setTimeout(tick, i === msg.length ? 2000 : 38);
    } else {
      // reiniciar después de pausa
      setTimeout(() => { i = 0; tick(); }, 1200);
    }
  }

  setTimeout(tick, 900);
}

document.addEventListener("DOMContentLoaded", () => {
  renderTimeline();
  observeTimeline();
  typewriter();
});
