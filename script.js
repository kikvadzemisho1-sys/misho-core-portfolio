const connectBtn = document.getElementById("connect-btn");
const coreScreen = document.getElementById("core-screen");
const coreNode = document.querySelector(".core-node");

connectBtn.addEventListener("click", () => {
  // 1. ბირთვი იწყებს სწრაფ ტრიალს და განათებას
  coreNode.classList.add("active-pulse");
  connectBtn.style.opacity = "0";
  connectBtn.style.pointerEvents = "none";

  // 2. 0.8 წამში გადავდივართ მთავარ ინტერფეისზე
  setTimeout(() => {
    coreScreen.style.opacity = "0";

    setTimeout(() => {
      coreScreen.style.display = "none";

      // შევქმნათ და გამოვაჩინოთ მთავარი ინტერფეისის კონტეინერი
      renderMainInterface();
    }, 600);
  }, 800);
});

function renderMainInterface() {
  const mainUI = document.createElement("main");
  mainUI.id = "main-ui";
  mainUI.className = "main-ui";

  mainUI.innerHTML = `
    <header class="top-bar">
      <div class="brand-code">MK // CORE_OS_v1.0</div>
      <div class="status-indicator">
        <span class="dot"></span> NODE_CONNECTED
      </div>
    </header>

    <section class="hero-container">
      <h1 class="glitch-title">MISHO KIKVADZE</h1>
      <p class="role-desc">CREATIVE FRONT-END ARCHITECT</p>
    </section>
  `;

  document.body.appendChild(mainUI);

  // რბილი გამოჩენა (Fade-in)
  requestAnimationFrame(() => {
    mainUI.classList.add("visible");
  });
}
