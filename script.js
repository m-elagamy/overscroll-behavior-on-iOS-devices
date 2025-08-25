// script.js - Enhanced with iOS scroll chaining fix

class ScrollChaining {
  constructor() {
    this.scrollContent = null;
    this.behaviorSelect = null;
    this.isAtTop = false;
    this.isAtBottom = false;
    this.startY = 0;
    this.velocity = 0;
    this.lastY = 0;
    this.lastTime = Date.now();

    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Get your specific elements
    this.scrollContent = document.getElementById("scrollContent");
    this.behaviorSelect = document.getElementById("behaviorSelect");

    if (!this.scrollContent) {
      console.error("scrollContent element not found");
      return;
    }

    // Force enable scroll chaining globally
    this.forceEnableScrolling();

    // Set up your existing behavior selector
    this.setupBehaviorSelector();

    // Enable scroll chaining for your content
    this.enableScrollChaining();

    // Set up device info (your existing code)
    this.setupDeviceInfo();

    console.log("iOS scroll chaining enabled for your content");
  }

  forceEnableScrolling() {
    // Remove any scroll locks from body
    document.body.style.overflow = "auto";
    document.body.style.position = "static";
    document.body.style.height = "auto";
    document.body.style.touchAction = "manipulation";

    // Remove common scroll-lock classes
    const lockClasses = [
      "overflow-hidden",
      "fixed",
      "no-scroll",
      "modal-open",
      "body-scroll-lock",
    ];

    lockClasses.forEach((className) => {
      document.body.classList.remove(className);
    });

    // Apply to your container and content wrapper
    const container = document.querySelector(".container");
    const contentWrapper = document.querySelector(".content-wrapper");

    [container, contentWrapper, this.scrollContent].forEach((element) => {
      if (element) {
        element.style.webkitOverflowScrolling = "touch";
        element.style.touchAction = "manipulation";
      }
    });
  }

  setupBehaviorSelector() {
    if (!this.behaviorSelect) return;

    // Your existing behavior selector logic
    this.behaviorSelect.addEventListener("change", (e) => {
      const behavior = e.target.value;
      this.applyOverscrollBehavior(behavior);
      this.updateBehaviorDisplay(behavior);
    });

    // Set initial behavior
    this.applyOverscrollBehavior("auto");
  }

  applyOverscrollBehavior(behavior) {
    if (!this.scrollContent) return;

    // Apply to your scroll content
    this.scrollContent.style.overscrollBehavior = behavior;

    // Also apply to content wrapper and container for consistency
    const contentWrapper = document.querySelector(".content-wrapper");
    const container = document.querySelector(".container");

    [contentWrapper, container].forEach((element) => {
      if (element) {
        element.style.overscrollBehavior = behavior;
      }
    });

    console.log(`Applied overscroll-behavior: ${behavior}`);
  }

  updateBehaviorDisplay(behavior) {
    const currentBehaviorElements =
      document.querySelectorAll("#currentBehavior");
    currentBehaviorElements.forEach((element) => {
      element.textContent = behavior;
    });
  }

  enableScrollChaining() {
    // Check scroll boundaries
    const updateScrollPosition = () => {
      if (!this.scrollContent) return;

      this.isAtTop = this.scrollContent.scrollTop <= 0;
      this.isAtBottom =
        this.scrollContent.scrollTop + this.scrollContent.clientHeight >=
        this.scrollContent.scrollHeight - 1;
    };

    // Touch event handlers for iOS
    const handleTouchStart = (e) => {
      this.startY = e.touches[0].clientY;
      this.lastY = this.startY;
      this.lastTime = Date.now();
      this.velocity = 0;
      updateScrollPosition();
    };

    const handleTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const currentTime = Date.now();
      const deltaY = this.lastY - currentY;
      const deltaTime = currentTime - this.lastTime;

      // Calculate velocity for momentum
      if (deltaTime > 0) {
        this.velocity = deltaY / deltaTime;
      }

      updateScrollPosition();

      // Check if we should allow scroll chaining
      const shouldChainUp = deltaY < 0 && this.isAtTop;
      const shouldChainDown = deltaY > 0 && this.isAtBottom;

      if (shouldChainUp || shouldChainDown) {
        // Allow natural scroll chaining to body/container
        this.transferMomentumToBody();
        return; // Don't prevent default - allow chaining
      }

      // Normal scrolling within content - prevent body scroll
      e.preventDefault();

      this.lastY = currentY;
      this.lastTime = currentTime;
    };

    const handleTouchEnd = () => {
      this.velocity = 0;
    };

    // Add touch event listeners to your scroll content
    this.scrollContent.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    this.scrollContent.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    this.scrollContent.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    // Also add scroll event listener for boundary detection
    this.scrollContent.addEventListener("scroll", updateScrollPosition, {
      passive: true,
    });
  }

  transferMomentumToBody() {
    if (Math.abs(this.velocity) < 0.1) return;

    let currentVel = this.velocity * 30; // Momentum factor
    const deceleration = 0.92;

    const animate = () => {
      if (Math.abs(currentVel) < 1) return;

      // Scroll the body/container
      window.scrollBy(0, currentVel);
      currentVel *= deceleration;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  setupDeviceInfo() {
    // Your existing device detection code
    const deviceInfoElement = document.getElementById("deviceInfo");
    const platformInfoElement = document.getElementById("platformInfo");

    if (deviceInfoElement) {
      const userAgent = navigator.userAgent;
      let deviceInfo = "Unknown";

      if (/iPhone/.test(userAgent)) {
        deviceInfo = "iPhone";
      } else if (/iPad/.test(userAgent)) {
        deviceInfo = "iPad";
      } else if (/Android/.test(userAgent)) {
        deviceInfo = "Android";
      } else if (/Windows/.test(userAgent)) {
        deviceInfo = "Windows";
      } else if (/Mac/.test(userAgent)) {
        deviceInfo = "Mac";
      }

      deviceInfoElement.textContent = deviceInfo;
    }

    if (platformInfoElement) {
      platformInfoElement.textContent = navigator.platform || "Unknown";
    }
  }

  // Debug method
  debug() {
    console.log("Scroll Content:", this.scrollContent);
    console.log("Is at top:", this.isAtTop);
    console.log("Is at bottom:", this.isAtBottom);
    console.log("Current behavior:", this.behaviorSelect?.value);
    console.log("Body overflow:", document.body.style.overflow);
    console.log("Content scroll height:", this.scrollContent?.scrollHeight);
    console.log("Content client height:", this.scrollContent?.clientHeight);
  }
}

// Initialize the scroll chaining system
const scrollChaining = new ScrollChaining();

// Expose for debugging
window.scrollChaining = scrollChaining;

// Additional utility functions for your demo
function testScrollChaining() {
  console.log("Testing scroll chaining...");
  if (window.scrollChaining) {
    window.scrollChaining.debug();
  }
}

// Force enable on iOS Safari specifically
if (/iPhone|iPad/.test(navigator.userAgent)) {
  console.log("iOS device detected - forcing scroll chaining");

  // Additional iOS-specific fixes
  document.addEventListener("DOMContentLoaded", () => {
    // Remove any potential scroll blocks
    document.body.style.webkitOverflowScrolling = "touch";
    document.body.style.overscrollBehavior = "auto";

    // Apply to all your elements
    const elements = [".container", ".content-wrapper", "#scrollContent"];

    elements.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.webkitOverflowScrolling = "touch";
        element.style.overscrollBehavior = "auto";
        element.style.touchAction = "manipulation";
      }
    });
  });
}

// Export for testing
window.testScrollChaining = testScrollChaining;
