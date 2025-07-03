// =============================================
// NAVIGATION MODULE
// =============================================

export class Navigation {
  constructor() {
    this.header = document.querySelector(".header");
    this.nav = document.querySelector(".nav");
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

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (this.isMenuOpen && !this.nav.contains(e.target)) {
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
    // Clone the menu for mobile
    const mobileMenu = this.navMenu.cloneNode(true);
    mobileMenu.classList.add("nav__menu--mobile");
    mobileMenu.style.display = "flex";

    // Remove existing mobile menu if any
    const existingMobileMenu = document.querySelector(".nav__menu--mobile");
    if (existingMobileMenu) {
      existingMobileMenu.remove();
    }

    // Append to nav container
    this.nav.appendChild(mobileMenu);

    // Add event listeners to mobile menu links
    const mobileLinks = mobileMenu.querySelectorAll(".nav__link");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        this.handleNavClick(e);
        this.closeMobileMenu();
      });
    });

    // Animate hamburger
    if (this.hamburger) {
      this.hamburger.style.backgroundColor = "transparent";
      this.hamburger.style.transform = "rotate(45deg)";
    }

    // Update toggle button
    this.navToggle.setAttribute("aria-expanded", "true");
    this.navToggle.setAttribute("aria-label", "Fechar menu de navegação");

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Animate menu in
    setTimeout(() => {
      mobileMenu.style.opacity = "1";
      mobileMenu.style.transform = "translateY(0)";
    }, 10);
  }

  closeMobileMenu() {
    const mobileMenu = document.querySelector(".nav__menu--mobile");
    if (mobileMenu) {
      mobileMenu.style.opacity = "0";
      mobileMenu.style.transform = "translateY(-10px)";

      setTimeout(() => {
        mobileMenu.remove();
      }, 200);
    }

    // Reset hamburger
    if (this.hamburger) {
      this.hamburger.style.backgroundColor = "";
      this.hamburger.style.transform = "";
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
        const headerHeight = this.header.offsetHeight + 40; // Add extra space for floating header
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

    // Header behavior on scroll - keep floating design
    if (currentScrollY > 100) {
      this.header.style.transform = "translateX(-50%) scale(0.95)";
      this.nav.style.background = "rgba(255, 255, 255, 0.05)";
    } else {
      this.header.style.transform = "translateX(-50%) scale(1)";
      this.nav.style.background = "rgba(255, 255, 255, 0.1)";
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

  handleResize() {
    if (window.innerWidth > 1024 && this.isMenuOpen) {
      this.closeMobileMenu();
    }
  }
}
