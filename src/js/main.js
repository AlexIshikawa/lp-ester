// =============================================
// MAIN JS - Landing Page
// =============================================

// Modules
import { Navigation } from "./modules/navigation.js";
import { SmoothScroll } from "./modules/smoothScroll.js";
import { FormHandler } from "./modules/formHandler.js";
import { AnimationObserver } from "./modules/animationObserver.js";
import { Utils } from "./modules/utils.js";

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Landing Page initialized");

  // Initialize modules
  initializeApp();
});

/**
 * Initialize all app modules
 */
function initializeApp() {
  try {
    // Initialize navigation
    const navigation = new Navigation();

    // Initialize smooth scroll
    const smoothScroll = new SmoothScroll();

    // Initialize form handler
    const formHandler = new FormHandler();

    // Initialize animation observer
    const animationObserver = new AnimationObserver();

    // Initialize utils
    Utils.init();

    console.log("✅ All modules initialized successfully");
  } catch (error) {
    console.error("❌ Error initializing app:", error);
  }
}

// Performance observer
if ("PerformanceObserver" in window) {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.entryType === "navigation") {
        console.log(
          `⚡ Page load time: ${entry.loadEventEnd - entry.loadEventStart}ms`
        );
      }
    });
  });

  observer.observe({ entryTypes: ["navigation"] });
}

// Export for global access if needed
window.LandingPage = {
  Navigation,
  SmoothScroll,
  FormHandler,
  AnimationObserver,
  Utils,
};
