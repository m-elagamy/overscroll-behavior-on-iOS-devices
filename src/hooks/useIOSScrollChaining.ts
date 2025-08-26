"use client";

import { useEffect, useRef } from "react";

export function useIOSScrollChaining() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollContent = ref.current;
    if (!scrollContent) return;

    // Detect if iOS Safari (so we don't mess with Android/desktop which behave correctly)
    const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent);

    if (isIOS) {
      // Apply CSS properties for smooth scroll chaining
      scrollContent.style.overscrollBehavior = "auto";
      (
        scrollContent.style as CSSStyleDeclaration & {
          webkitOverflowScrolling: string;
        }
      ).webkitOverflowScrolling = "touch";

      // Ensure the container can participate in scroll chaining
      scrollContent.style.position = "relative";
      scrollContent.style.touchAction = "pan-y";

      // Force hardware acceleration for smoother scrolling
      scrollContent.style.transform = "translateZ(0)";
      scrollContent.style.webkitTransform = "translateZ(0)";

      // Add a class for additional styling if needed
      scrollContent.classList.add("ios-scroll-chaining-enabled");

      // Also configure the body for scroll chaining
      const body = document.body;
      body.style.overscrollBehavior = "auto";
      (
        body.style as CSSStyleDeclaration & { webkitOverflowScrolling: string }
      ).webkitOverflowScrolling = "touch";
      body.classList.add("ios-scroll-chaining-enabled");

      return () => {
        // Clean up styles
        if (scrollContent) {
          scrollContent.classList.remove("ios-scroll-chaining-enabled");
          scrollContent.style.overscrollBehavior = "";
          (
            scrollContent.style as CSSStyleDeclaration & {
              webkitOverflowScrolling: string;
            }
          ).webkitOverflowScrolling = "";
          scrollContent.style.position = "";
          scrollContent.style.touchAction = "";
          scrollContent.style.transform = "";
          scrollContent.style.webkitTransform = "";
        }

        // Clean up body styles
        if (body) {
          body.classList.remove("ios-scroll-chaining-enabled");
          body.style.overscrollBehavior = "";
          (
            body.style as CSSStyleDeclaration & {
              webkitOverflowScrolling: string;
            }
          ).webkitOverflowScrolling = "";
        }
      };
    }
  }, []);

  return ref;
}
