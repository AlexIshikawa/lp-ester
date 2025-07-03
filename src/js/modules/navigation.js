// =============================================
// NAVIGATION MODULE
// =============================================

export class Navigation {
  constructor() {
    this.header = document.querySelector(".header");
    this.nav = document.querySelector(".nav");
    this.navLinks = document.querySelectorAll(".nav__link");

    this.lastScrollY = 0;

    this.init();
  }

  init() {
    if (!this.header) return;

    this.bindEvents();
    this.setActiveLink();
    console.log("📱 Navigation module initialized");
  }

  bindEvents() {
    // Navigation links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e));
    });

    // Scroll events
    window.addEventListener("scroll", () => this.handleScroll(), {
      passive: true,
    });
  }

  handleNavClick(e) {
    const href = e.target.getAttribute("href");

    if (href && href.startsWith("#")) {
      e.preventDefault();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight = this.header.offsetHeight + 40; // Add extra space for floating header
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    // Header behavior on scroll - keep floating design
    if (currentScrollY > 100) {
      this.header.style.transform = "translateX(-50%) scale(0.95)";
      this.nav.style.background = "rgba(52, 48, 45, 0.95)";
    } else {
      this.header.style.transform = "translateX(-50%) scale(1)";
      this.nav.style.background = "#34302D";
    }

    this.lastScrollY = currentScrollY;

    // Update active link
    this.setActiveLink();
  }

  setActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const headerHeight = this.header.offsetHeight + 60;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const currentScroll = window.scrollY;

      if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
        // Remove active class from all links
        this.navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Add active class to current link
        const activeLink = document.querySelector(
          `.nav__link[href="#${section.id}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }
}
