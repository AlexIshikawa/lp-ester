// =============================================
// SMOOTH SCROLL MODULE
// =============================================

export class SmoothScroll {
  constructor() {
    this.scrollLinks = document.querySelectorAll('a[href^="#"]');
    this.init();
  }

  init() {
    if (!this.scrollLinks.length) return;

    this.bindEvents();
    console.log("📜 Smooth scroll module initialized");
  }

  bindEvents() {
    this.scrollLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleClick(e));
    });
  }

  handleClick(e) {
    const href = e.target.getAttribute("href");

    if (!href || href === "#") return;

    e.preventDefault();

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    this.scrollToElement(targetElement);
  }

  scrollToElement(element) {
    const header = document.querySelector(".header");
    const headerHeight = header ? header.offsetHeight : 0;
    const elementTop = element.offsetTop;
    const offsetPosition = elementTop - headerHeight - 20;

    // Use modern scroll API with fallback
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      // Fallback for older browsers
      this.animateScroll(offsetPosition);
    }
  }

  animateScroll(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - percentage, 3);

      window.scrollTo(0, startPosition + distance * easeOut);

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  // Public method to scroll to any element
  scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
      this.scrollToElement(element);
    }
  }
}
