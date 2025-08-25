document.addEventListener("DOMContentLoaded", function () {
  const scrollContent = document.getElementById("scrollContent");
  const autoBtn = document.getElementById("autoBtn");
  const containBtn = document.getElementById("containBtn");
  const noneBtn = document.getElementById("noneBtn");
  const currentBehavior = document.getElementById("currentBehavior");
  const deviceInfo = document.getElementById("deviceInfo");
  const platformInfo = document.getElementById("platformInfo");

  console.log("DOM fully loaded and parsed");

  console.log("scrollContent:", scrollContent);

  if (!scrollContent) {
    console.error("❌ scrollContent element not found!");
    return;
  }

  // Device detection
  function detectDevice() {
    const userAgent = navigator.userAgent;
    let device = "Unknown";
    let platform = "Unknown";

    // Detect platform
    if (/Android/i.test(userAgent)) {
      platform = "Android";
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      platform = "iOS";
    } else if (/Windows/i.test(userAgent)) {
      platform = "Windows";
    } else if (/Mac/i.test(userAgent)) {
      platform = "macOS";
    } else if (/Linux/i.test(userAgent)) {
      platform = "Linux";
    }

    // Detect device type
    if (/Mobile|Android|iPhone|iPad|iPod/i.test(userAgent)) {
      device = "Mobile";
    } else if (/Tablet|iPad/i.test(userAgent)) {
      device = "Tablet";
    } else {
      device = "Desktop";
    }

    // Special case for iPad
    if (
      /iPad/i.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    ) {
      device = "Tablet";
      platform = "iOS";
    }

    return { device, platform };
  }

  // Update device info display
  function updateDeviceInfo() {
    const { device, platform } = detectDevice();
    deviceInfo.textContent = device;
    platformInfo.textContent = platform;
  }

  // Set overscroll behavior
  function setOverscrollBehavior(behavior) {
    // Remove all existing classes
    scrollContent.classList.remove(
      "overscroll-auto",
      "overscroll-contain",
      "overscroll-none"
    );

    // Add new class
    scrollContent.classList.add(`overscroll-${behavior}`);

    // Set CSS property
    scrollContent.style.overscrollBehavior = behavior;

    // Update display
    currentBehavior.textContent = behavior;

    // Update button states
    [autoBtn, containBtn, noneBtn].forEach((btn) =>
      btn.classList.remove("active")
    );
    event.target.classList.add("active");

    // Log the change
    console.log(`Overscroll behavior changed to: ${behavior}`);
  }

  // Add event listeners for buttons
  autoBtn.addEventListener("click", function () {
    setOverscrollBehavior("auto");
  });

  containBtn.addEventListener("click", function () {
    setOverscrollBehavior("contain");
  });

  noneBtn.addEventListener("click", function () {
    setOverscrollBehavior("none");
  });

  // Overscroll detection and visual feedback
  let isOverscrolling = false;
  let overscrollTimeout;

  function handleOverscroll(event) {
    const scrollTop = scrollContent.scrollTop;
    const scrollHeight = scrollContent.scrollHeight;
    const clientHeight = scrollContent.clientHeight;

    // Check if we're at the boundaries
    const atTop = scrollTop <= 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight;

    // Add visual feedback class
    scrollContent.classList.add("overscroll-feedback");

    // Clear existing timeout
    if (overscrollTimeout) {
      clearTimeout(overscrollTimeout);
    }

    // Remove feedback after animation
    overscrollTimeout = setTimeout(() => {
      scrollContent.classList.remove("overscroll-feedback");
    }, 300);

    // Log overscroll event
    if (atTop || atBottom) {
      const direction = atTop ? "top" : "bottom";
      console.log(
        `Overscroll detected at ${direction} with behavior: ${currentBehavior.textContent}`
      );
    }
  }

  // Add scroll event listener
  scrollContent.addEventListener("scroll", handleOverscroll);

  // Touch event handling for better mobile detection
  let touchStartY = 0;
  let touchEndY = 0;

  scrollContent.addEventListener("touchstart", function (e) {
    touchStartY = e.touches[0].clientY;
  });

  scrollContent.addEventListener("touchend", function (e) {
    touchEndY = e.changedTouches[0].clientY;
    const touchDiff = touchStartY - touchEndY;

    // Detect overscroll based on touch movement
    if (Math.abs(touchDiff) > 50) {
      const scrollTop = scrollContent.scrollTop;
      const scrollHeight = scrollContent.scrollHeight;
      const clientHeight = scrollContent.clientHeight;

      if (
        (touchDiff > 0 && scrollTop <= 0) ||
        (touchDiff < 0 && scrollTop + clientHeight >= scrollHeight)
      ) {
        console.log(
          `Touch overscroll detected with behavior: ${currentBehavior.textContent}`
        );
      }
    }
  });

  // Initialize
  updateDeviceInfo();
  setOverscrollBehavior("auto");

  console.log("Scrollable element:", scrollContent);

  scrollContent.addEventListener(
    "touchmove",
    (e) => {
      const atTop = scrollContent.scrollTop === 0;
      const atBottom =
        scrollContent.scrollTop + scrollContent.clientHeight >=
        scrollContent.scrollHeight;

      if (atTop || atBottom) {
        // Temporarily let the body handle scrolling
        scrollContent.style.overflowY = "hidden";
        setTimeout(() => {
          scrollContent.style.overflowY = "auto";
        }, 300);
      }
    },
    { passive: true }
  );

  // Performance monitoring
  let scrollCount = 0;
  let lastScrollTime = Date.now();

  scrollContent.addEventListener("scroll", function () {
    scrollCount++;
    const now = Date.now();

    // Log scroll performance every 100 scrolls
    if (scrollCount % 100 === 0) {
      const timeDiff = now - lastScrollTime;
      const scrollsPerSecond = (100 / timeDiff) * 1000;
      console.log(
        `Scroll performance: ${scrollsPerSecond.toFixed(1)} scrolls/second`
      );
      lastScrollTime = now;
    }
  });

  // Add keyboard navigation support
  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "1":
        setOverscrollBehavior("auto");
        break;
      case "2":
        setOverscrollBehavior("contain");
        break;
      case "3":
        setOverscrollBehavior("none");
        break;
    }
  });

  // Add instructions to the page
  const instructions = document.createElement("div");
  instructions.innerHTML = `
        <div style="background: #e3f2fd; padding: 15px; margin: 15px; border-radius: 8px; border-left: 4px solid #2196f3;">
            <h4 style="margin: 0 0 10px 0; color: #1976d2;">Keyboard Shortcuts:</h4>
            <p style="margin: 0; color: #424242; font-size: 14px;">
                <strong>1:</strong> Auto behavior | <strong>2:</strong> Contain behavior | <strong>3:</strong> None behavior
            </p>
        </div>
    `;

  // Insert instructions after the controls
  const controls = document.querySelector(".controls");
  controls.parentNode.insertBefore(instructions, controls.nextSibling);
});
