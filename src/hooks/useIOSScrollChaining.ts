"use client";

import { useEffect, useRef } from "react";

export function useIOSScrollChaining() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
    if (!isIOS) return;

    let lastY = 0;
    let isAtBoundary = false;

    function onTouchStart(e: TouchEvent) {
      lastY = e.touches[0].clientY;
      isAtBoundary = false;
    }

    function onTouchMove(e: TouchEvent) {
      const currentY = e.touches[0].clientY;

      const atTop = el!.scrollTop <= 0;
      const atBottom =
        Math.ceil(el!.scrollTop + el!.clientHeight) >= el!.scrollHeight;

      const isScrollingDown = currentY < lastY; // finger up → content down
      const isScrollingUp = currentY > lastY; // finger down → content up

      // Only prevent default when at boundary AND trying to scroll past it
      if ((atTop && isScrollingUp) || (atBottom && isScrollingDown)) {
        // Check if we're already at the boundary and trying to overscroll
        if (isAtBoundary) {
          e.preventDefault();
        } else {
          // Mark that we're at a boundary
          isAtBoundary = true;
        }
      } else {
        // Reset boundary flag when not at boundary
        isAtBoundary = false;
      }

      lastY = currentY;
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return ref;
}
