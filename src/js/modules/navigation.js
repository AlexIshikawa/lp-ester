// =============================================
// NAVIGATION MODULE
// =============================================

export class Navigation {
  constructor() {
    this.header = document.querySelector(".header");
    this.navToggle = document.querySelector(".nav__toggle");
    this.navMenu = document.querySelector(".nav__menu");
    this.navLinks = document.querySelectorAll(".nav__link");
    this.hamburger = document.querySelector(".nav__hamburger");

    this.isMenuOpen = false;
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
    // Mobile menu toggle
    if (this.navToggle) {
      this.navToggle.addEventListener("click", () => this.toggleMobileMenu());
    }

    // Navigation links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e));
    });

    // Scroll events
    window.addEventListener("scroll", () => this.handleScroll(), {
      passive: true,
    });

    // Resize events
    window.addEventListener("resize", () => this.handleResize());

    // Close menu on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      this.openMobileMenu();
    } else {
      this.closeMobileMenu();
    }
  }

  openMobileMenu() {
    this.navMenu.style.display = "flex";
    this.navMenu.style.position = "fixed";
    this.navMenu.style.top = "80px";
    this.navMenu.style.left = "0";
    this.navMenu.style.right = "0";
    this.navMenu.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
    this.navMenu.style.backdropFilter = "blur(20px)";
    this.navMenu.style.flexDirection = "column";
    this.navMenu.style.padding = "2rem";
    this.navMenu.style.gap = "1.5rem";
    this.navMenu.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    this.navMenu.style.zIndex = "1000";

    // Animate hamburger
    if (this.hamburger) {
      this.hamburger.style.backgroundColor = "transparent";
      this.hamburger.style.transform = "rotate(45deg)";

      const before = this.hamburger.querySelector("::before");
      const after = this.hamburger.querySelector("::after");

      this.hamburger.style.setProperty(
        "--before-transform",
        "rotate(90deg) translateX(8px)"
      );
      this.hamburger.style.setProperty(
        "--after-transform",
        "rotate(90deg) translateX(-8px)"
      );
    }

    // Update toggle button
    this.navToggle.setAttribute("aria-expanded", "true");
    this.navToggle.setAttribute("aria-label", "Fechar menu de navegação");

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  }

  closeMobileMenu() {
    this.navMenu.style.display = "";
    this.navMenu.style.position = "";
    this.navMenu.style.top = "";
    this.navMenu.style.left = "";
    this.navMenu.style.right = "";
    this.navMenu.style.backgroundColor = "";
    this.navMenu.style.backdropFilter = "";
    this.navMenu.style.flexDirection = "";
    this.navMenu.style.padding = "";
    this.navMenu.style.gap = "";
    this.navMenu.style.boxShadow = "";
    this.navMenu.style.zIndex = "";

    // Reset hamburger
    if (this.hamburger) {
      this.hamburger.style.backgroundColor = "";
      this.hamburger.style.transform = "";
      this.hamburger.style.setProperty("--before-transform", "");
      this.hamburger.style.setProperty("--after-transform", "");
    }

    // Update toggle button
    this.navToggle.setAttribute("aria-expanded", "false");
    this.navToggle.setAttribute("aria-label", "Abrir menu de navegação");

    // Restore body scroll
    document.body.style.overflow = "";

    this.isMenuOpen = false;
  }

  handleNavClick(e) {
    const href = e.target.getAttribute("href");

    if (href && href.startsWith("#")) {
      e.preventDefault();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight = this.header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }

      // Close mobile menu if open
      if (this.isMenuOpen) {
        this.closeMobileMenu();
      }
    }
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    // Header background on scroll
    if (currentScrollY > 50) {
      this.header.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
      this.header.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
    } else {
      this.header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      this.header.style.boxShadow = "";
    }

    // Hide header on scroll down, show on scroll up
    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      this.header.style.transform = "translateY(-100%)";
    } else {
      this.header.style.transform = "translateY(0)";
    }

    this.lastScrollY = currentScrollY;

    // Update active link
    this.setActiveLink();
  }

  setActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const headerHeight = this.header.offsetHeight;

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

  handleResize() {
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.closeMobileMenu();
    }
  }
}
