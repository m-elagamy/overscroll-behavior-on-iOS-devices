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

    const onTouchStart = (e: TouchEvent) => {
      lastY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollHeight - el.scrollTop === el.clientHeight;

      const isScrollingDown = currentY < lastY;
      const isScrollingUp = currentY > lastY;

      if ((atTop && isScrollingUp) || (atBottom && isScrollingDown)) {
        e.preventDefault();
        window.scrollBy(0, lastY - currentY);
      }

      lastY = currentY;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return ref;
}
