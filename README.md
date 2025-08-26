# iOS Scroll Chaining Solution

This project provides a solution for the iOS Safari scroll chaining issue where nested scrollable containers don't smoothly continue scrolling to their parent containers.

## The Problem

On iOS Safari (and WebView), scroll chaining is disabled by default for performance and UX reasons. When you scroll inside a nested container (`overflow: auto/scroll`), once you hit the top or bottom of that container, the scroll stops dead. The user has to lift their finger and start a new swipe gesture on the body to continue scrolling.

This is different from Android browsers where scroll chaining works by default.

## The Solution

This project provides a custom React hook (`useIOSScrollChaining`) that enables proper scroll chaining on iOS devices by:

1. **CSS Properties**: Setting the correct `overscroll-behavior` and `-webkit-overflow-scrolling` properties
2. **Body Configuration**: Configuring the document body to accept scroll chaining
3. **Touch Event Handling**: Properly handling touch events to allow natural scroll behavior
4. **iOS-Specific Optimizations**: Using webkit-specific properties and transforms

## Installation

1. Copy the `useIOSScrollChaining.ts` hook to your project
2. Copy the `ios-scroll-chaining.css` file to your styles directory
3. Import and use the hook in your components

## Usage

### Basic Usage

```tsx
import { useIOSScrollChaining } from "./hooks/useIOSScrollChaining";

function MyScrollableComponent() {
  const scrollRef = useIOSScrollChaining();

  return (
    <div ref={scrollRef} style={{ overflow: "auto", height: "300px" }}>
      {/* Your scrollable content */}
    </div>
  );
}
```

### Using the Pre-built Component

```tsx
import { ScrollableContainer } from "./components/ScrollableContainer";

function MyApp() {
  return (
    <div className="app">
      <header>Header</header>

      <ScrollableContainer className="content">
        {/* Long content that needs scrolling */}
        {Array.from({ length: 100 }, (_, i) => (
          <div key={i}>Item {i}</div>
        ))}
      </ScrollableContainer>

      <footer>Footer</footer>
    </div>
  );
}
```

## How It Works

1. **Detection**: The hook detects if the user is on an iOS device
2. **CSS Configuration**: Sets the necessary CSS properties on both the target element and the document body
3. **Touch Handling**: Adds touch event listeners that allow events to bubble up when at scroll boundaries
4. **Cleanup**: Properly removes all event listeners and styles when the component unmounts

## Key CSS Properties

- `overscroll-behavior: auto` - Allows scroll chaining
- `-webkit-overflow-scrolling: touch` - Enables momentum scrolling on iOS
- `touch-action: pan-y` - Allows natural touch scrolling
- `position: relative` - Ensures proper positioning for scroll chaining

## Browser Support

- ✅ iOS Safari (primary target)
- ✅ iOS WebView
- ✅ Android Chrome (works by default, but enhanced)
- ✅ Other modern browsers

## Important Notes

1. **Body Configuration**: The hook automatically configures the document body for scroll chaining. This is crucial for iOS Safari.
2. **CSS Import**: Make sure to import the CSS file to get the full benefits of the styling.
3. **Overflow Required**: The target element must have `overflow: auto` or `overflow: scroll` for this to work.
4. **Touch Events**: The solution relies on touch events, so it only works on touch devices.

## Troubleshooting

If scroll chaining still doesn't work:

1. Ensure the CSS file is imported
2. Check that the target element has proper overflow settings
3. Verify the element is properly positioned in the DOM
4. Test on an actual iOS device (simulators may behave differently)

## Example Implementation

See `ScrollableContainer.tsx` for a complete example of how to implement this solution in a React component.

## License

This solution is provided as-is for educational and development purposes.
