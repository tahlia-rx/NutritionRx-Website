// Shared top bar + hamburger menu injector.
// Each page calls NutritionRxNav.mount({ current: 'home' | 'about' | 'sneak-peek' | 'products' });

(function () {
  const LINKS = [
    { id: "home",       label: "Home",            href: "https://38ebd151-0711-48f5-b0aa-54f2b20b8835.claudeusercontent.com/v1/design/projects/38ebd151-0711-48f5-b0aa-54f2b20b8835/serve/mobile/index.html?t=e06baa44c9c4c420fc03121a1256f8cfed9c6aff70de0fab4bd49fe251b8d713.e6d27146-04ad-4a14-9966-75253eb72420.7bfd5f30-734a-47d4-814c-40c2be260cab.1780737321.fp&direct=1",       num: "01" },
    { id: "about",      label: "About Cooper",     href: "https://38ebd151-0711-48f5-b0aa-54f2b20b8835.claudeusercontent.com/v1/design/projects/38ebd151-0711-48f5-b0aa-54f2b20b8835/serve/mobile/about.html?t=ea915ea2edce2a5f0293e23384404a94e0b4460595a948cfbebd67d19dd01de9.e6d27146-04ad-4a14-9966-75253eb72420.7bfd5f30-734a-47d4-814c-40c2be260cab.1780737321.fp&direct=1",       num: "02" },
    { id: "sneak-peek", label: "App Sneak Peek",  href: "https://38ebd151-0711-48f5-b0aa-54f2b20b8835.claudeusercontent.com/v1/design/projects/38ebd151-0711-48f5-b0aa-54f2b20b8835/serve/mobile/sneak-peek.html?t=74c95805f2782c0aebafd3854acc090a0a80d5191af2e0d86b04108fe4ef19f1.e6d27146-04ad-4a14-9966-75253eb72420.7bfd5f30-734a-47d4-814c-40c2be260cab.1780737322.fp&direct=1",  num: "03" },
  ];

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function mount({ current = "home" } = {}) {
    // Top bar
    const topbar = el(`
      <header class="topbar" data-comment-anchor="topbar">
        <a class="brand" href="https://38ebd151-0711-48f5-b0aa-54f2b20b8835.claudeusercontent.com/v1/design/projects/38ebd151-0711-48f5-b0aa-54f2b20b8835/serve/mobile/index.html?t=e06baa44c9c4c420fc03121a1256f8cfed9c6aff70de0fab4bd49fe251b8d713.e6d27146-04ad-4a14-9966-75253eb72420.7bfd5f30-734a-47d4-814c-40c2be260cab.1780737321.fp&direct=1">
          Nutrition Rx<small>by Dr. Cooper</small>
        </a>
        <button class="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="primary-menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="4" y1="8"  x2="20" y2="8"/>
            <line x1="4" y1="16" x2="20" y2="16"/>
          </svg>
        </button>
      </header>
    `);

    // Menu overlay
    const menu = el(`
      <nav class="menu" id="primary-menu" aria-hidden="true" data-comment-anchor="primary-menu">
        <div class="menu__top">
          <a class="menu__brand" href="https://38ebd151-0711-48f5-b0aa-54f2b20b8835.claudeusercontent.com/v1/design/projects/38ebd151-0711-48f5-b0aa-54f2b20b8835/serve/mobile/index.html?t=e06baa44c9c4c420fc03121a1256f8cfed9c6aff70de0fab4bd49fe251b8d713.e6d27146-04ad-4a14-9966-75253eb72420.7bfd5f30-734a-47d4-814c-40c2be260cab.1780737321.fp&direct=1">Nutrition Rx</a>
          <button class="menu__close" aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="6"  y1="6"  x2="18" y2="18"/>
              <line x1="18" y1="6"  x2="6"  y2="18"/>
            </svg>
          </button>
        </div>
        <div class="menu__nav" role="menu"></div>
        <div class="menu__foot">
          <span>© ${new Date().getFullYear()} Nutrition Rx</span>
          <span><a href="#">Join the waitlist &nbsp;↗</a></span>
        </div>
      </nav>
    `);

    const navList = menu.querySelector(".menu__nav");
    LINKS.forEach(l => {
      const a = el(`
        <a class="menu__link" href="${l.href}" role="menuitem"${l.id === current ? ' aria-current="page"' : ""}>
          <span class="num">${l.num}</span>
          <span class="label">${l.label}</span>
          <span class="arrow">→</span>
        </a>
      `);
      if (l.id === current) {
        a.querySelector(".arrow").textContent = "●";
      }
      navList.appendChild(a);
    });

    document.body.prepend(topbar);
    document.body.appendChild(menu);

    const burger = topbar.querySelector(".hamburger");
    const close  = menu.querySelector(".menu__close");

    function open() {
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      burger.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    }
    function shut() {
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }
    burger.addEventListener("click", open);
    close.addEventListener("click", shut);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) shut();
    });

    // Fade in a solid header fill once the page is scrolled.
    const onScroll = () => {
      topbar.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  window.NutritionRxNav = { mount };
})();
