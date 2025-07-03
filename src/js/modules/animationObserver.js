// =============================================
// ANIMATION OBSERVER MODULE
// =============================================

export class AnimationObserver {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.observer = null;
    this.animatedElements = new Set();

    this.init();
  }

  init() {
    if (!("IntersectionObserver" in window)) {
      // Fallback for older browsers
      this.fallbackAnimation();
      return;
    }

    this.setupObserver();
    this.observeElements();
    console.log("🎬 Animation observer module initialized");
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, this.observerOptions);
  }

  observeElements() {
    // Auto-detect elements with animation classes
    const elementsToAnimate = document.querySelectorAll(`
      .fade-in,
      .slide-up,
      .slide-left,
      .slide-right,
      .scale-up,
      .feature-card,
      .hero__content,
      .hero__image,
      .features__header,
      .cta__content
    `);

    elementsToAnimate.forEach((element) => {
      // Add initial animation state
      this.prepareElement(element);

      // Start observing
      this.observer.observe(element);
    });
  }

  prepareElement(element) {
    // Add initial state based on animation type
    if (element.classList.contains("fade-in")) {
      element.style.opacity = "0";
      element.style.transition = "opacity 0.6s ease-out";
    } else if (element.classList.contains("slide-up")) {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition =
        "opacity 0.6s ease-out, transform 0.6s ease-out";
    } else if (element.classList.contains("slide-left")) {
      element.style.opacity = "0";
      element.style.transform = "translateX(-30px)";
      element.style.transition =
        "opacity 0.6s ease-out, transform 0.6s ease-out";
    } else if (element.classList.contains("slide-right")) {
      element.style.opacity = "0";
      element.style.transform = "translateX(30px)";
      element.style.transition =
        "opacity 0.6s ease-out, transform 0.6s ease-out";
    } else if (element.classList.contains("scale-up")) {
      element.style.opacity = "0";
      element.style.transform = "scale(0.8)";
      element.style.transition =
        "opacity 0.6s ease-out, transform 0.6s ease-out";
    } else {
      // Default animation for specific elements
      if (element.classList.contains("feature-card")) {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition =
          "opacity 0.6s ease-out, transform 0.6s ease-out";
      } else if (element.classList.contains("hero__content")) {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition =
          "opacity 0.8s ease-out, transform 0.8s ease-out";
      } else if (element.classList.contains("hero__image")) {
        element.style.opacity = "0";
        element.style.transform = "translateX(20px)";
        element.style.transition =
          "opacity 0.8s ease-out, transform 0.8s ease-out";
      } else if (element.classList.contains("features__header")) {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition =
          "opacity 0.6s ease-out, transform 0.6s ease-out";
      } else if (element.classList.contains("cta__content")) {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition =
          "opacity 0.6s ease-out, transform 0.6s ease-out";
      }
    }
  }

  animateElement(element) {
    // Prevent multiple animations
    if (this.animatedElements.has(element)) return;

    this.animatedElements.add(element);

    // Add delay for staggered animations
    const delay = this.getAnimationDelay(element);

    setTimeout(() => {
      this.performAnimation(element);
    }, delay);
  }

  performAnimation(element) {
    element.style.opacity = "1";
    element.style.transform = "translateY(0) translateX(0) scale(1)";

    // Add animate class for CSS-based animations
    element.classList.add("animate");

    // Fire custom event
    element.dispatchEvent(
      new CustomEvent("animated", {
        detail: { element },
      })
    );
  }

  getAnimationDelay(element) {
    // Stagger animations for cards
    if (element.classList.contains("feature-card")) {
      const cards = Array.from(document.querySelectorAll(".feature-card"));
      const index = cards.indexOf(element);
      return index * 150; // 150ms delay between cards
    }

    return 0;
  }

  fallbackAnimation() {
    // Simple fallback for older browsers
    const elementsToAnimate = document.querySelectorAll(`
      .fade-in,
      .slide-up,
      .slide-left,
      .slide-right,
      .scale-up,
      .feature-card,
      .hero__content,
      .hero__image,
      .features__header,
      .cta__content
    `);

    elementsToAnimate.forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
      element.classList.add("animate");
    });
  }

  // Public methods
  observe(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      this.prepareElement(element);
      if (this.observer) {
        this.observer.observe(element);
      }
    });
  }

  unobserve(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      if (this.observer) {
        this.observer.unobserve(element);
      }
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.animatedElements.clear();
  }
}

// Add CSS for animations
const style = document.createElement("style");
style.textContent = `
  .animate {
    opacity: 1 !important;
    transform: translateY(0) translateX(0) scale(1) !important;
  }
  
  .fade-in.animate {
    opacity: 1;
  }
  
  .slide-up.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .slide-left.animate {
    opacity: 1;
    transform: translateX(0);
  }
  
  .slide-right.animate {
    opacity: 1;
    transform: translateX(0);
  }
  
  .scale-up.animate {
    opacity: 1;
    transform: scale(1);
  }
  
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .fade-in,
    .slide-up,
    .slide-left,
    .slide-right,
    .scale-up,
    .feature-card,
    .hero__content,
    .hero__image,
    .features__header,
    .cta__content {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }
`;

document.head.appendChild(style);
