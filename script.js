document.addEventListener("DOMContentLoaded", () => {
  const scrollContent = document.getElementById("scrollContent");

  // Track touch position
  let lastY = 0;

  // Detect if iOS Safari (so we don’t mess with Android/desktop which behave correctly)
  const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent);

  if (isIOS && scrollContent) {
    scrollContent.addEventListener("touchstart", (e) => {
      lastY = e.touches[0].clientY;
    });

    scrollContent.addEventListener("touchmove", (e) => {
      const currentY = e.touches[0].clientY;
      const atTop = scrollContent.scrollTop === 0;
      const atBottom =
        scrollContent.scrollHeight - scrollContent.scrollTop ===
        scrollContent.clientHeight;

      const isScrollingDown = currentY < lastY; // finger going up → content scrolls down
      const isScrollingUp = currentY > lastY; // finger going down → content scrolls up

      if ((atTop && isScrollingUp) || (atBottom && isScrollingDown)) {
        // Prevent the "dead stop"
        e.preventDefault();

        // Manually forward scroll to body
        window.scrollBy(0, lastY - currentY);
      }

      lastY = currentY;
    });
  }
});
