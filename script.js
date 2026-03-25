const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const progressBar = document.querySelector(".scroll-progress");
const revealItems = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const sections = [...document.querySelectorAll("main section[id]")];

const itemsInfo = {
  desayuno: {
    title: "Desayunos y mañanas",
    description: "Esta sección está pensada para captar a quien busca un sitio cómodo para desayunar en Linares. En una versión final se podrían añadir fotos reales, precios y promociones.",
    tags: ["Café", "Tostadas", "Inicio del día"]
  },
  tapas: {
    title: "Tapas para compartir",
    description: "Perfecta para transmitir variedad y apetito visual. Esta demo la usa como uno de los bloques más atractivos del local.",
    tags: ["Tapas", "Variedad", "Compartir"]
  },
  raciones: {
    title: "Raciones y platos",
    description: "Una categoría ideal para enseñar comida más completa y reforzar la sensación de abundancia y calidad.",
    tags: ["Comida", "Grupo", "Más completo"]
  },
  ambiente: {
    title: "Ambiente del local",
    description: "Una web así también sirve para vender sensaciones: comodidad, reuniones, terraza y buen rato en buena compañía.",
    tags: ["Ambiente", "Terraza", "Experiencia"]
  },
  cervezas: {
    title: "Cervecería y tardeo",
    description: "Ayuda a reforzar la identidad del negocio y atraer visitas para una cerveza, una tapa o una salida informal.",
    tags: ["Cervecería", "Amigos", "Tarde"]
  },
  horario: {
    title: "Horario amplio",
    description: "Un punto muy fuerte del negocio. La web puede usar esto como ventaja competitiva clara para atraer visitas durante casi todo el día.",
    tags: ["Flexible", "Todo el día", "Local"]
  }
};

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    body.classList.toggle("menu-open");
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach(item => revealObserver.observe(item));

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 8;

  if (header) {
    header.classList.toggle("scrolled", scrolled);
  }

  const scrollTop = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  let currentId = "";
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) currentId = section.id;
  });

  navLinks.forEach(link => {
    const target = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", target === currentId);
  });
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    menuCards.forEach(card => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hide", !matches);
    });
  });
});

const testimonials = document.querySelectorAll(".testimonial");
const prevButton = document.querySelector(".slider-arrow.prev");
const nextButton = document.querySelector(".slider-arrow.next");
let currentTestimonial = 0;
let testimonialInterval;

function showTestimonial(index) {
  testimonials.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function moveTestimonial(step) {
  currentTestimonial = (currentTestimonial + step + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
}

function startAutoplay() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(() => moveTestimonial(1), 5000);
}

if (prevButton && nextButton) {
  prevButton.addEventListener("click", () => {
    moveTestimonial(-1);
    startAutoplay();
  });

  nextButton.addEventListener("click", () => {
    moveTestimonial(1);
    startAutoplay();
  });

  showTestimonial(currentTestimonial);
  startAutoplay();
}

const modal = document.querySelector(".item-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalTags = document.getElementById("modal-tags");
const modalClose = document.querySelector(".modal-close");
const modalBackdrop = document.querySelector(".modal-backdrop");
const moreButtons = document.querySelectorAll(".item-more");

function openModal(key) {
  const item = itemsInfo[key];
  if (!item || !modal) return;

  modalTitle.textContent = item.title;
  modalDescription.textContent = item.description;
  modalTags.innerHTML = item.tags.map(tag => `<span>${tag}</span>`).join("");

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  body.style.overflow = "";
}

moreButtons.forEach(button => {
  button.addEventListener("click", () => {
    openModal(button.dataset.item);
  });
});

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && modal.classList.contains("open")) {
    closeModal();
  }
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const demoForm = document.getElementById("demoForm");

if (demoForm) {
  demoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim() || "";
    const telefono = document.getElementById("telefono")?.value.trim() || "";
    const mensaje = document.getElementById("mensaje")?.value.trim() || "";

    const texto = `Hola Cervecería Cafetería Viena,

Soy ${nombre || "un cliente"}.
Mi teléfono: ${telefono || "no indicado"}.

Quiero consultar:
${mensaje || "Me gustaría hacer una reserva o consulta."}`;

    const whatsappUrl = `https://wa.me/34627360382?text=${encodeURIComponent(texto)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}
