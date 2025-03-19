# Changelog

## [1.0.5] - 2025-03-19
### Added
- **index.html**
  - Added favicon with `<link rel="icon" href="./PUPLogo.ico" type="image/x-icon">`
  - Implemented a structured top banner with PUP logo, university name and tagline
  - Added proper heading hierarchy in the banner section
- **styles.css**
  - Added animations with keyframes for fade-in and rise effects for UI elements
  - Implemented staggered animations for lyric lines with increasing delays
  - Added styling for the fixed top banner with responsive design
  - Created university branding elements with proper color scheme (#8c0000)

### Improved
- **script.js**
  - Refined the lyric highlighting logic to improve scrolling behavior
  - Added forward and backward skip buttons (5 seconds) with proper event handlers
  - Enhanced audio player timing display and progress tracking

### Enhanced
- **styles.css**
  - Added detailed hover effects for playback buttons with scaling transform
  - Implemented tooltip-style labels for control buttons using pseudo-elements
  - Refined progress bar appearance with custom slider thumb styling
  - Added comprehensive responsive design with media queries for various screen sizes

### Fixed
- **styles.css**
  - Optimized layout for better viewing on different screen sizes
  - Fixed player controls alignment and visibility
  - Improved text rendering with font smoothing properties

### Updated
- **index.html**
  - Changed background image from "hero-bg.jpg" to "hero-bg-removed.jpg" for improved appearance
- **styles.css**
  - Implemented responsive typography with clamp() for fluid text sizing
  - Added hardware acceleration optimizations for animations
  - Enhanced visual hierarchy with z-index management
  - Implemented semi-transparent backgrounds for better readability

## [1.0.4] - 2025-03-18
### Updated
- **index.html**
  - Updated the header section to use <code>header.png</code> as the header image.
  - Modified the header so that the header image is fixed to the top left of the screen.
- **styles.css**
  - Updated the styling for the header image (<code>#hero img</code>) to fix it at the top left and added a drop shadow (using <code>box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);</code>) to enhance its visual prominence.

## [1.0.3] - 2025-03-18
### Updated
- **index.html**
  - Updated the header image to use "header.png" (instead of the previous logo URL) and ensured it is placed at the top left of the screen.
- **styles.css**
  - Modified the header styling so that the header image is fixed at the top left and retains a drop shadow effect (using <code>box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);</code>).

## [1.0.2] - 2025-03-18
### Updated
- **index.html**
  - Modified the webpage background to use <code>hero-bg.jpg</code> as its background. The <code>body</code> element now includes an inline style that sets the background image to be centered, fixed, and cover the entire viewport.
  
## [1.0.1] - 2025-03-18
### Updated
- **index.html**
  - Modified the footer section to retain its original structure while adding a new wrapper for the progress bar.
  - Added playback time indicators: the current playback time is now displayed to the left of the progress bar, and the full song duration (dynamically determined from the audio metadata, defaulting to "1:55") is displayed to the right.
  
- **script.js**
  - Updated the audio player's event handlers to update the playback time indicators.
    - The "loadedmetadata" event now sets the full duration using the formatTime function (with a fallback to "1:55" if the duration is not available).
    - The "timeupdate" event now updates the current playback time (formatted as minutes:seconds) on the left of the progress bar.
  - Retained the toggle button functionality that sets the title attribute for alternative text on hover (displaying "Play" or "Pause").

- **styles.css**
  - Maintained existing styling.
  - The CSS pseudo-element for the toggle button uses its title attribute to display the alternative text ("Play" or "Pause") on hover.

## [1.0.0] - 2025-03-16
### Added
- **index.html**
  - Created the main HTML structure.
  - Header now displays "PUP Hymn" as the English title and "Imno ng PUP" as the Tagalog title with authors listed.
  - Included a main section with a lyrics container that supports vertical scrolling.
  - Added a footer containing an audio player with basic controls (play/pause toggle and a progress slider).
- **styles.css**
  - Implemented a basic reset and applied style rules for the header, lyrics section, and audio controls.
  - Designed the control box to be fixed at the bottom of the viewport.
- **script.js**
  - Developed the audio player control logic including play, pause, progress bar update, and lyric highlighting based on audio time.
  - Implemented seek functionality via the progress slider.
