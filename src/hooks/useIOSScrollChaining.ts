"use client";

import { useEffect, useRef } from "react";

export function useIOSScrollChaining() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Detect iOS only
    const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
    if (!isIOS) return;

    let lastY = 0;
    let rafId: number | null = null;

    function onTouchStart(e: TouchEvent) {
      lastY = e.touches[0].clientY;
    }

    function onTouchMove(e: TouchEvent) {
      const currentY = e.touches[0].clientY;
      const atTop = el!.scrollTop === 0;
      const atBottom = el!.scrollHeight - el!.scrollTop === el!.clientHeight;

      const isScrollingDown = currentY < lastY;
      const isScrollingUp = currentY > lastY;

      if ((atTop && isScrollingUp) || (atBottom && isScrollingDown)) {
        e.preventDefault();

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          window.scrollBy(0, lastY - currentY);
        });
      }

      lastY = currentY;
    }

    // ✅ Important: attach to the DOM node, not React synthetic events
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return ref;
}
