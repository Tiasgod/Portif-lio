const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("main section[id], footer[id]");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.style.color = isActive ? "var(--blue-light)" : "";
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach((section) => navObserver.observe(section));

const revealTargets = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
);

revealTargets.forEach((el) => revealObserver.observe(el));

(function heroCodeRain() {
  const canvas = document.querySelector(".hero__canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;

  const chars = "01{}<>/=;#*+-_python()fn=>".split("");
  let columns = [];
  const fontSize = 15;
  let width = 0;
  let height = 0;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = rect.width;
    height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const columnCount = Math.floor(width / fontSize);
    columns = new Array(columnCount).fill(0).map(() => Math.random() * -height);
  }

  function draw() {
    ctx.fillStyle = "rgba(2, 6, 23, 0.12)";
    ctx.fillRect(0, 0, width, height);

    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
    ctx.textBaseline = "top";

    columns.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;

      ctx.fillStyle = "rgba(96, 165, 250, 0.42)";
      ctx.fillText(char, x, y);

      if (y > height && Math.random() > 0.975) {
        columns[i] = 0;
      } else {
        columns[i] = y + fontSize;
      }
    });

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
})();
