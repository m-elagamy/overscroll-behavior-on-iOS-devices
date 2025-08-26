"use client";

import { useEffect, useRef } from "react";

export function useIOSScrollChaining() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
    if (!isIOS) return;

    // Enable scroll chaining on iOS using CSS properties
    el.style.overscrollBehavior = "auto";

    // For iOS Safari, we need to ensure the container can participate in scroll chaining
    el.style.position = "relative";

    // Add touch-action to allow natural touch scrolling
    el.style.touchAction = "pan-y";

    // Apply webkit-specific properties for iOS
    const webkitStyle = el.style as CSSStyleDeclaration & {
      webkitOverflowScrolling: string;
    };
    webkitStyle.webkitOverflowScrolling = "touch";

    // Add a class for additional CSS targeting if needed
    el.classList.add("ios-scroll-chaining-enabled");

    // Force a reflow to ensure styles are applied
    el.offsetHeight;

    // CRITICAL: Also configure the body/document for scroll chaining
    // This is essential for iOS Safari to allow scroll chaining
    const body = document.body;
    body.style.overscrollBehavior = "auto";
    const bodyWebkitStyle = body.style as CSSStyleDeclaration & {
      webkitOverflowScrolling: string;
    };
    bodyWebkitStyle.webkitOverflowScrolling = "touch";
    body.classList.add("ios-scroll-chaining-enabled");

    // Additional touch handling for better iOS compatibility
    let startY = 0;
    let startScrollTop = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startScrollTop = el.scrollTop;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      // Check if we're at the boundaries
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop >= el.scrollHeight - el.clientHeight;

      // If at boundaries and trying to scroll beyond, allow the event to bubble up
      if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
        // Don't prevent default - let the parent handle the scroll
        return;
      }
    };

    // Add touch event listeners
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      if (el) {
        el.classList.remove("ios-scroll-chaining-enabled");
        el.removeEventListener("touchstart", handleTouchStart);
        el.removeEventListener("touchmove", handleTouchMove);
      }

      // Clean up body styles
      if (body) {
        body.classList.remove("ios-scroll-chaining-enabled");
        body.style.overscrollBehavior = "";
        const bodyWebkitStyle = body.style as CSSStyleDeclaration & {
          webkitOverflowScrolling: string;
        };
        bodyWebkitStyle.webkitOverflowScrolling = "";
      }
    };
  }, []);

  return ref;
}
