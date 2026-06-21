// Shared top bar + hamburger menu injector.
// Each page calls NutritionRxNav.mount({ current: 'home' | 'about' | 'sneak-peek' | 'products' });

(function () {
  const LINKS = [
    { id: "home",       label: "Home",           href: "index.html",       num: "01" },
    { id: "about",      label: "About Cooper",   href: "about.html",       num: "02" },
    { id: "sneak-peek", label: "App Sneak Peek", href: "sneak-peek.html",  num: "03" },
  ];

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function mount({ current = "home" } = {}) {
    const dark = document.body.classList.contains("theme-green");
    const wmTop = dark ? "images/logo-wordmark-light.png" : "images/logo-wordmark.png";
    // Top bar
    const topbar = el(`
      <header class="topbar" data-comment-anchor="topbar">
        <a class="brand" href="index.html" aria-label="Nutrition Rx home">
          <img class="brand__logo" src="${wmTop}" alt="Nutrition Rx">
          <small>by Dr. Cooper</small>
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
          <a class="menu__brand" href="index.html" aria-label="Nutrition Rx home">
            <img class="menu__brand-logo" src="images/logo-wordmark-light.png" alt="Nutrition Rx">
          </a>
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
