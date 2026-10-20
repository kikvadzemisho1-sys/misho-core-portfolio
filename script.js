const enterButton = document.querySelector("#enter-button");
const intro = document.querySelector("#intro");
const portfolio = document.querySelector("#portfolio");
const localTime = document.querySelector("#local-time");
const currentYear = document.querySelector("#current-year");
const pointerGlow = document.querySelector(".ambient__pointer");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateClock() {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tbilisi",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date());

  localTime.textContent = `TBILISI, GE · ${time}`;
}

updateClock();
window.setInterval(updateClock, 30_000);
currentYear.textContent = new Date().getFullYear();

enterButton.addEventListener("click", () => {
  portfolio.inert = false;
  portfolio.setAttribute("aria-hidden", "false");
  portfolio.classList.add("is-visible");
  intro.inert = true;
  intro.classList.add("is-leaving");
  intro.setAttribute("aria-hidden", "true");

  window.setTimeout(() => {
    intro.hidden = true;
    document.querySelector("#hero-title").focus({ preventScroll: true });
  }, 1100);
});

const revealItems = document.querySelectorAll(".reveal");

if (motionPreference.matches || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-revealed"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

if (finePointer.matches && !motionPreference.matches) {
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let frame = 0;

  function animatePointer() {
    currentX += (targetX - currentX) * 0.09;
    currentY += (targetY - currentY) * 0.09;
    pointerGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate3d(-50%, -50%, 0)`;

    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      frame = window.requestAnimationFrame(animatePointer);
    } else {
      frame = 0;
    }
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      pointerGlow.style.opacity = "1";

      if (!frame) {
        frame = window.requestAnimationFrame(animatePointer);
      }
    },
    { passive: true },
  );

  document.documentElement.addEventListener("pointerleave", () => {
    pointerGlow.style.opacity = "0";
  });

  document.documentElement.addEventListener("pointerenter", () => {
    pointerGlow.style.opacity = "1";
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && frame) {
      window.cancelAnimationFrame(frame);
      frame = 0;
    }
  });
}

if (finePointer.matches && !motionPreference.matches) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      card.style.setProperty("--tilt-x", `${(x - 0.5) * 2.4}deg`);
      card.style.setProperty("--tilt-y", `${(0.5 - y) * 2.4}deg`);
      card.style.setProperty("--lift", "-3px");
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--lift", "0px");
    });
  });
}
