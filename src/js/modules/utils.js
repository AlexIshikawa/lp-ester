// =============================================
// UTILS MODULE
// =============================================

export class Utils {
  static init() {
    this.handlePageLoad();
    this.handleClickOutside();
    this.handleKeyboardNavigation();
    this.handlePrefersReducedMotion();
    console.log("🔧 Utils module initialized");
  }

  // Page load optimizations
  static handlePageLoad() {
    // Preload critical resources
    this.preloadCriticalResources();

    // Lazy load images
    this.lazyLoadImages();

    // Handle loading states
    this.handleLoadingStates();
  }

  static preloadCriticalResources() {
    // Preload Google Fonts
    const fontLink1 = document.createElement("link");
    fontLink1.rel = "preload";
    fontLink1.href =
      "https://fonts.googleapis.com/css2?family=Proxima+Nova:wght@300;400;500;600;700&display=swap";
    fontLink1.as = "style";
    fontLink1.onload = () => {
      fontLink1.rel = "stylesheet";
    };
    document.head.appendChild(fontLink1);

    const fontLink2 = document.createElement("link");
    fontLink2.rel = "preload";
    fontLink2.href =
      "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap";
    fontLink2.as = "style";
    fontLink2.onload = () => {
      fontLink2.rel = "stylesheet";
    };
    document.head.appendChild(fontLink2);
  }

  static lazyLoadImages() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      const lazyImages = document.querySelectorAll("img[data-src]");
      lazyImages.forEach((img) => {
        img.classList.add("lazy");
        imageObserver.observe(img);
      });
    }
  }

  static handleLoadingStates() {
    window.addEventListener("load", () => {
      document.body.classList.add("loaded");

      // Remove loading screen if exists
      const loadingScreen = document.querySelector(".loading-screen");
      if (loadingScreen) {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
          loadingScreen.remove();
        }, 300);
      }
    });
  }

  // Click outside handler
  static handleClickOutside() {
    document.addEventListener("click", (e) => {
      // Close mobile menu when clicking outside
      const nav = document.querySelector(".nav");
      const navToggle = document.querySelector(".nav__toggle");
      const navMenu = document.querySelector(".nav__menu");

      if (nav && navToggle && navMenu) {
        const isClickInsideNav = nav.contains(e.target);
        const isMenuOpen = navToggle.getAttribute("aria-expanded") === "true";

        if (!isClickInsideNav && isMenuOpen) {
          navToggle.click();
        }
      }
    });
  }

  // Keyboard navigation
  static handleKeyboardNavigation() {
    // Skip to main content link
    this.addSkipLink();

    // Enhanced focus management
    this.manageFocus();

    // Keyboard shortcuts
    this.setupKeyboardShortcuts();
  }

  static addSkipLink() {
    const skipLink = document.createElement("a");
    skipLink.href = "#main";
    skipLink.className = "skip-link";
    skipLink.textContent = "Pular para o conteúdo principal";
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #0ea5e9;
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 9999;
      transition: top 0.3s;
    `;

    skipLink.addEventListener("focus", () => {
      skipLink.style.top = "6px";
    });

    skipLink.addEventListener("blur", () => {
      skipLink.style.top = "-40px";
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  static manageFocus() {
    // Track focus for keyboard users
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-user");
      }
    });

    document.addEventListener("mousedown", () => {
      document.body.classList.remove("keyboard-user");
    });
  }

  static setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Alt + H: Go to home
      if (e.altKey && e.key === "h") {
        e.preventDefault();
        this.scrollToTop();
      }

      // Alt + C: Go to contact
      if (e.altKey && e.key === "c") {
        e.preventDefault();
        const ctaSection = document.querySelector("#cta");
        if (ctaSection) {
          ctaSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  // Accessibility and preferences
  static handlePrefersReducedMotion() {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleReducedMotion = (e) => {
      if (e.matches) {
        document.body.classList.add("reduced-motion");
      } else {
        document.body.classList.remove("reduced-motion");
      }
    };

    mediaQuery.addEventListener("change", handleReducedMotion);
    handleReducedMotion(mediaQuery);
  }

  // Utility functions
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  static formatDate(date) {
    return new Intl.DateTimeFormat("pt-BR").format(date);
  }

  static formatCurrency(amount) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  }

  static sanitizeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  static getScrollPercentage() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    return (scrollTop / docHeight) * 100;
  }

  static scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  static isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  static getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return "tablet";
    }
    if (
      /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(
        userAgent
      )
    ) {
      return "mobile";
    }
    return "desktop";
  }

  static copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }

  static showNotification(message, type = "info", duration = 3000) {
    const notification = document.createElement("div");
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem;
      border-radius: 8px;
      color: white;
      z-index: 9999;
      animation: slideInRight 0.3s ease-out;
      min-width: 300px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

    // Set background color based on type
    switch (type) {
      case "success":
        notification.style.backgroundColor = "#10b981";
        break;
      case "error":
        notification.style.backgroundColor = "#ef4444";
        break;
      case "warning":
        notification.style.backgroundColor = "#f59e0b";
        break;
      default:
        notification.style.backgroundColor = "#3b82f6";
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, duration);
  }

  // Performance monitoring
  static measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  }

  // Local storage helpers
  static setStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }

  static getStorage(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.warn("Could not read from localStorage:", e);
      return null;
    }
  }

  static removeStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("Could not remove from localStorage:", e);
    }
  }
}

// Add CSS for animations and utilities
const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .lazy {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .lazy.loaded {
    opacity: 1;
  }
  
  .keyboard-user *:focus {
    outline: 2px solid #0ea5e9;
    outline-offset: 2px;
  }
  
  .reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
`;

document.head.appendChild(style);
