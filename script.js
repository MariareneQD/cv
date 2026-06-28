// ============================================================
// Datos de trayectoria — cursos, congresos y práctica laboral
// Ordenados cronológicamente. `hours` = carga horaria certificada.
// `major` = hito principal (se resalta en el timeline).
// ============================================================
const TIMELINE = [
  {
    date: "Octubre 2022",
    title: "Curso de Matemática, Física y Química",
    org: "Instituto Técnico \u201cSan Silvestre\u201d · R.M. 0262/2022",
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
    title: "Taller \u201cSimulador de Microempresa\u201d",
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
    title: "I Congreso Internacional en Tecnología y Emprendimiento en Producción Productiva",
    org: "FDTEUO — Oruro, Bolivia",
    hours: 120,
  },
  {
    date: "Septiembre 2024",
    title: "Curso de Prevención de Riesgos y Primeros Auxilios en la Industria",
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
];

const MAX_HOURS = Math.max(...TIMELINE.filter(t => t.hours).map(t => t.hours));

function barWidth(hours) {
  if (!hours) return 0;
  const ratio = Math.sqrt(hours / MAX_HOURS);
  return Math.round(18 + ratio * 82); // 18%–100%, compressed scale so small entries stay visible
}

function renderTimeline() {
  const list = document.getElementById("timeline-list");
  if (!list) return;

  const html = TIMELINE.map(item => {
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

  list.innerHTML = html;
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
  }, { threshold: 0.2 });

  items.forEach((el, i) => {
    setTimeout(() => observer.observe(el), i * 0); // staggered visually by scroll, not timer
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTimeline();
  observeTimeline();
});
