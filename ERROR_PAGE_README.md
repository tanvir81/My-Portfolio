# Animated 404 Error Page

## Features

### Visual Effects
- **Glitch Animation** - Continuous glitch effect on the 404 text with skew and position shifts
- **RGB Color Split** - Red and cyan chromatic aberration layers for retro glitch aesthetic
- **Floating Numbers** - Each digit (4-0-4) floats independently with rotation
- **Gradient Text** - Beautiful gradient from blue to purple across the numbers
- **Particle System** - 20 animated particles floating upward with random trajectories
- **Animated Grid** - Subtle grid background with primary color overlay

### Interactive Elements
- **Animated Robot/Astronaut** - SVG illustration with:
  - Blinking eyes that scale
  - Rotating antenna with pulsing tip
  - Moving arms that wave
  - Floating body animation
  - Gradient fills
  
- **Action Buttons**:
  - "Go Home" - Primary button with shine effect
  - "Go Back" - Outlined button with fill animation
  - Both have hover scale and tap feedback

### Decorative Elements
- Rotating geometric shapes (circle and square)
- Pulsing text shadow on the title
- Smooth entrance animation with elastic easing

## Usage

### With React Router (Already Integrated)
The error page is set up as a catch-all route in `App.jsx`:

```jsx
<Route path="*" element={<ErrorPage />} />
```

This will automatically show the error page for any unmatched routes.

### Standalone Preview
To preview the error page independently:

1. Open `src/ErrorPageDemo.jsx`
2. Temporarily update `src/main.jsx`:
```jsx
import ErrorPageDemo from './ErrorPageDemo'

root.render(
  <React.StrictMode>
    <ErrorPageDemo />
  </React.StrictMode>
)
```

### Manual Usage
```jsx
import ErrorPage from './components/ErrorPage';

// Use anywhere in your app
<ErrorPage />
```

## Animations Breakdown

### GSAP Animations
1. **Glitch Timeline** - Repeating skew and position shifts
2. **Number Float** - Y-axis movement with yoyo
3. **Number Rotation** - 360° continuous rotation
4. **Particle Float** - Upward movement with fade out
5. **Entrance** - Scale and opacity fade-in

### Framer Motion Animations
1. **Container Stagger** - Sequential child animations
2. **Item Variants** - Fade and slide up
3. **Glitch Variants** - Opacity and position flicker
4. **Robot Parts** - Individual SVG element animations
5. **Button Hover** - Scale and shine effects
6. **Geometric Shapes** - Continuous rotation and scale

## Customization

### Colors
Change the gradient colors in the JSX:
```jsx
// Current: Blue to Purple
from-primary to-blue-600
from-blue-600 to-purple-600
from-purple-600 to-primary

// Example: Red to Orange
from-red-500 to-orange-500
```

### Text Content
Update the error message:
```jsx
<h1>Page Not Found</h1>
<p>Your custom message here...</p>
```

### Animation Speed
Adjust durations in the animations:
```jsx
// Slower glitch
duration: 0.2  // Change to 0.5

// Faster float
duration: 2  // Change to 1
```

### Particle Count
Change the number of particles:
```jsx
// Current: 20 particles
[...Array(20)]

// More particles: 50
[...Array(50)]
```

## Performance
- Uses GPU-accelerated transforms
- Optimized with useMemo for particle positions
- Efficient GSAP timelines
- No layout thrashing

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires CSS Grid and Flexbox support
- SVG support required for robot illustration

## Tips
- The glitch effect repeats every 2 seconds
- All animations are infinite loops
- Buttons have tactile feedback (scale on tap)
- Fully responsive design
- Dark theme optimized
