// Shared top bar + hamburger menu injector.
// Each page calls NutritionRxNav.mount({ current: 'home' | 'about' | 'sneak-peek' | 'faq' });

(function () {
  const LINKS = [
    { id: "home",       label: "Home",           href: "index.html",       num: "01" },
    { id: "about",      label: "About Cooper",   href: "about.html",       num: "02" },
    { id: "sneak-peek", label: "App Sneak Peek", href: "sneak-peek.html",  num: "03" },
    { id: "faq",        label: "FAQ",            href: "faq.html",         num: "04" },
    { id: "contact",    label: "Contact",        href: "contact.html",     num: "05" },
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
        <a class="brand" href="index.html" aria-label="Doctor's Hour home">
          <svg class="brand__mark" viewBox="0 0 100 100" aria-hidden="true" fill="none" stroke-linecap="round"><g class="brand__mark-ticks"><line x1="50" y1="5" x2="50" y2="12.5" stroke-width="3.4" transform="rotate(0 50 50)"></line><line x1="50" y1="6" x2="50" y2="9.5" stroke-width="2.6" transform="rotate(30 50 50)"></line><line x1="50" y1="6" x2="50" y2="9.5" stroke-width="2.6" transform="rotate(60 50 50)"></line><line x1="50" y1="5" x2="50" y2="12.5" stroke-width="3.4" transform="rotate(90 50 50)"></line><line x1="50" y1="6" x2="50" y2="9.5" stroke-width="2.6" transform="rotate(120 50 50)"></line><line x1="50" y1="6" x2="50" y2="9.5" stroke-width="2.6" transform="rotate(150 50 50)"></line><line x1="50" y1="5" x2="50" y2="12.5" stroke-width="3.4" transform="rotate(180 50 50)"></line><line x1="50" y1="6" x2="50" y2="9.5" stroke-width="2.6" transform="rotate(210 50 50)"></line><line x1="50" y1="6" x2="50" y2="9.5" stroke-width="2.6" transform="rotate(240 50 50)"></line><line x1="50" y1="5" x2="50" y2="12.5" stroke-width="3.4" transform="rotate(270 50 50)"></line><line x1="50" y1="6" x2="50" y2="9.5" stroke-width="2.6" transform="rotate(300 50 50)"></line><line x1="50" y1="6" x2="50" y2="9.5" stroke-width="2.6" transform="rotate(330 50 50)"></line></g><path class="brand__mark-fork" d="M43.8 20.5V27a6.2 6.2 0 0 0 12.4 0v-6.5M50 20.5V50" stroke-width="3.4"></path><path class="brand__mark-hand" d="M50 50H71" stroke-width="4"></path><circle class="brand__mark-dot" cx="50" cy="50" r="5"></circle></svg><span class="wm wm--refined brand__wm">Doctor<span class="wm__ap"><span class="wm__q">&rsquo;</span>s</span> <em>Hour</em></span>
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
          <a class="menu__brand" href="index.html" aria-label="Doctor's Hour home">
            <span class="wm wm--refined menu__wm">Doctor<span class="wm__ap"><span class="wm__q">&rsquo;</span>s</span> <em>Hour</em></span>
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
          <span>© ${new Date().getFullYear()} Doctor's Hour</span>
          <span><a href="https://www.doctorshour.com/" target="_blank" rel="noopener">Join the app &nbsp;↗</a></span>
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
