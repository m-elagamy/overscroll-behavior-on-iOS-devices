"use client";

import { useIOSScrollChaining } from "../hooks/useIOSScrollChaining";

interface ScrollableContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollableContainer({
  children,
  className = "",
  style = {},
}: ScrollableContainerProps) {
  const scrollRef = useIOSScrollChaining();

  return (
    <div
      ref={scrollRef}
      className={`scrollable-container ${className}`}
      style={{
        overflow: "auto",
        height: "100%",
        maxHeight: "100vh",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Example usage with a long content list
export function ExampleUsage() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>App Header</h1>
      </header>

      <ScrollableContainer className="content-area">
        {/* Your scrollable content goes here */}
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="content-item">
            Content Item {i + 1}
          </div>
        ))}
      </ScrollableContainer>

      <footer className="app-footer">
        <p>App Footer</p>
      </footer>
    </div>
  );
}
