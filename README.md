# Overscroll Behavior Demo

A simple web-based demo to test different overscroll behaviors on Android and iOS devices.

## What is Overscroll Behavior?

Overscroll behavior controls what happens when a user scrolls beyond the boundaries of a scrollable element. This is particularly important on mobile devices where users expect certain scrolling behaviors.

## Three Overscroll Behaviors

### 1. `auto` (Default)

- **Behavior**: Default browser behavior
- **iOS**: Bounce/rubber band effect when scrolling past boundaries
- **Android**: Usually shows a glow effect or slight bounce
- **Use Case**: Most natural feeling, matches user expectations

### 2. `contain`

- **Behavior**: Prevents overscroll but allows scroll chaining
- **Effect**: No bounce effect, but scrolling can still chain to parent elements
- **Use Case**: When you want to prevent overscroll but maintain scroll chaining

### 3. `none`

- **Behavior**: Prevents overscroll and scroll chaining
- **Effect**: No bounce effect, no scroll chaining to parent elements
- **Use Case**: When you want complete control over scrolling behavior

## How to Use

### Desktop Testing

1. Open `index.html` in a modern web browser
2. Use the buttons to switch between behaviors
3. Scroll to the top or bottom of the content area
4. Notice how the browser responds at boundaries

### Mobile Testing (Android/iOS)

1. Host the files on a web server (local or remote)
2. Open the URL on your mobile device
3. Use the touch interface to scroll through content
4. Test scrolling past the top and bottom boundaries
5. Switch between behaviors using the buttons

### Keyboard Shortcuts

- **1**: Switch to `auto` behavior
- **2**: Switch to `contain` behavior
- **3**: Switch to `none` behavior

## Features

- **Interactive Controls**: Buttons to switch between overscroll behaviors
- **Device Detection**: Automatically detects your device and platform
- **Visual Feedback**: Subtle visual indicators when overscroll occurs
- **Console Logging**: Detailed logging of overscroll events
- **Performance Monitoring**: Tracks scroll performance
- **Touch Support**: Optimized for mobile touch interactions
- **Responsive Design**: Works on all screen sizes

## Browser Support

- **Chrome**: Full support for all behaviors
- **Safari**: Full support (iOS 16.4+)
- **Firefox**: Full support
- **Edge**: Full support

## Testing Scenarios

### Test 1: Top Boundary

1. Scroll to the very top of the content
2. Try to scroll further up
3. Observe the overscroll behavior

### Test 2: Bottom Boundary

1. Scroll to the very bottom of the content
2. Try to scroll further down
3. Observe the overscroll behavior

### Test 3: Behavior Switching

1. Test each behavior in sequence
2. Notice the differences between behaviors
3. Check console for logging information

### Test 4: Performance

1. Scroll rapidly through content
2. Check console for performance metrics
3. Compare performance across different behaviors

## Technical Details

The demo uses:

- **CSS**: `overscroll-behavior` property for behavior control
- **JavaScript**: Event listeners for scroll and touch events
- **Touch Events**: Enhanced mobile detection and handling
- **Visual Feedback**: CSS animations for overscroll indication

## Common Issues

### iOS Safari

- Some older versions may not support all behaviors
- Touch scrolling might feel different from native apps

### Android Chrome

- Behavior might vary between Android versions
- Some devices may have custom scrolling implementations

### Desktop Browsers

- Overscroll effects are less pronounced
- Focus on the technical implementation rather than visual effects

## Development

To modify or extend the demo:

1. **Add New Behaviors**: Extend the CSS and JavaScript
2. **Custom Styling**: Modify `styles.css` for different visual themes
3. **Enhanced Logging**: Add more detailed event tracking
4. **Performance Metrics**: Implement additional performance monitoring

## License

This demo is provided as-is for educational and testing purposes.

## Contributing

Feel free to submit issues or improvements to help make this demo more useful for the community.
