[![Publish Package](https://github.com/pyrophire/ix-libs/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/pyrophire/ix-libs/actions/workflows/npm-publish.yml)

# IX Libraries & Services

**License: MIT** | **Angular 21+ Compatible** | **TypeScript Ready**

A comprehensive collection of reusable Angular components, services, and utilities designed to accelerate development and provide consistent UI/UX patterns across applications. Built with Angular Material integration and modern web standards in mind.

## 🚀 Key Features

- **Theme Management**: Complete dark/light theme switching with persistent storage
- **UI Components**: Production-ready components for common interface patterns  
- **Utility Services**: Browser storage, form helpers, and scroll management
- **Data Pipes**: Transform and format data with built-in pipes
- **Icon Library**: Curated SVG icon set optimized for Angular Material
- **TypeScript Support**: Full type safety and IntelliSense support
- **Tree Shakable**: Import only what you need to keep bundle sizes small

## 📋 Requirements

- Angular 21.0.0 or higher
- Angular Material 21.0.0 or higher
- RxJS 7.8.0 or higher
- TypeScript 5.0 or higher

> Note: Starting in v21.1.0 this library is fully standalone. NgModules have been removed. Import components and pipes directly, and register icons via `provideIxIcons()` at bootstrap. See the migration guide in `projects/ix-libs/CHANGELOG.md`.

## 📜 Changelog

- View on GitHub: https://github.com/pyrophire/ix-libs/blob/master/projects/ix-libs/CHANGELOG.md
- View in package: [CHANGELOG.md](./CHANGELOG.md)

- [IX Libraries \& Services](#ix-libraries--services)
  - [Icons](#icons)
    - [Installation](#installation)
    - [Available icons](#available-icons)
  - [Scroll](#scroll)
    - [Installation](#installation-1)
    - [Notes](#notes)
  - [Scroll Progress](#scroll-progress)
    - [Installation](#installation-2)
    - [Notes](#notes-1)
  - [Theme Button](#theme-button)
    - [Installation](#installation-3)
    - [Notes](#notes-2)
  - [Theme Menu Item](#theme-menu-item)
    - [Installation](#installation-4)
    - [Notes](#notes-3)
  - [Dark Service](#dark-service)
    - [Installation](#installation-5)
    - [Notes](#notes-4)
  - [Pipes](#pipes)
    - [Installation](#installation-6)
    - [Available Pipes](#available-pipes)
  - [Shared Services](#shared-services)
    - [Installation](#installation-7)
    - [Available Services](#available-services)
    - [Notes](#notes-5)
  - [Table Header](#table-header)
    - [Installation](#installation-8)
    - [Notes](#notes-6)
<!-- #region ix-icons -->
## Icons

The IX Icons module provides a curated collection of SVG icons optimized for Angular Material applications. These icons are designed to maintain consistency across your application while providing clear visual communication.

### Installation

1. **Install the package**
```bash
npm install --save @pyrophire/ix-libs
```

2. **Configure Angular assets** - Update `angular.json` to copy icon assets:
```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              {
                "glob": "**/*",
                "input": "./node_modules/@pyrophire/ix-libs/ix-img/",
                "output": "./ix-img"
              }
            ]
          }
        }
      }
    }
  }
}
```

3. **Register the icons provider** once at application bootstrap:
```typescript
// main.ts (Angular 15+)
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideIxIcons } from '@pyrophire/ix-libs';

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), provideIxIcons()]
});
```

4. **Use in templates** with Angular Material's mat-icon:
```html
<!-- Basic usage -->
<mat-icon svgIcon="ix-file-pdf"></mat-icon>

<!-- With styling -->
<mat-icon svgIcon="ix-export" class="icon-primary"></mat-icon>

<!-- In buttons -->
<button mat-icon-button>
  <mat-icon svgIcon="ix-dialog"></mat-icon>
</button>

<!-- With tooltips -->
<mat-icon svgIcon="ix-file-excel" 
          matTooltip="Download Excel file"
          aria-label="Download Excel file">
</mat-icon>
```

### Available Icons

| Icon Name       | Description            | Use Case                      |
| --------------- | ---------------------- | ----------------------------- |
| `ix-export`     | Export/download symbol | Data export, file downloads   |
| `ix-dialog`     | Dialog/modal indicator | Modal triggers, popup actions |
| `ix-file-html`  | HTML file type         | HTML file representation      |
| `ix-file-doc`   | Document file type     | Word documents, text files    |
| `ix-file-excel` | Spreadsheet file type  | Excel files, data tables      |
| `ix-file-pdf`   | PDF file type          | PDF documents, reports        |

### Styling Icons

```scss
// Custom icon sizes
.icon-small { font-size: 16px; }
.icon-medium { font-size: 24px; }
.icon-large { font-size: 32px; }

// Color variations
.icon-primary { color: var(--primary-color); }
.icon-accent { color: var(--accent-color); }
.icon-warn { color: var(--warn-color); }

// Interactive states
.icon-clickable {
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
}
```

### Best Practices

- Always include `aria-label` for screen readers when icons convey meaning
- Use consistent sizing throughout your application
- Consider adding tooltips for better user experience
- Test icon visibility in both light and dark themes

<!-- #endregion -->
  
<!-- #region ix-scroll -->
## Scroll

A smooth "scroll to top" button component that appears when users scroll down the page. Provides an accessible way for users to quickly return to the top of long content pages.

### Installation

1. **Install the package**
```bash
npm install --save @pyrophire/ix-libs
```

2. **Import the standalone component** where you need it:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollTopButtonComponent } from '@pyrophire/ix-libs';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, ScrollTopButtonComponent],
  template: `
    <ix-scroll-button color="primary"></ix-scroll-button>
  `
})
export class FeatureComponent {}
```

3. **Add required styles to your global stylesheet**
```scss
// Required for proper scroll detection
body {
  height: 100%;
  overflow: auto;
}

html {
  height: 100%;
}
```

4. **Use in your templates**

**Basic Usage:**
```html
<ix-scroll-button></ix-scroll-button>
```

**With Custom Styling:**
```html
<ix-scroll-button 
  [color]="'primary'"
  [scrollHeightTrigger]="200"
  [scrollableElementId]="'custom-container'">
</ix-scroll-button>
```

**Multiple Scroll Containers:**
```html
<!-- For main page scrolling -->
<ix-scroll-button 
  color="primary" 
  scrollableElementId="main-content">
</ix-scroll-button>

<!-- For sidebar scrolling -->
<ix-scroll-button 
  color="accent" 
  scrollableElementId="sidebar"
  [scrollHeightTrigger]="150">
</ix-scroll-button>
```

### Configuration Options

| Property              | Type                                           | Default                 | Description                                    |
| --------------------- | ---------------------------------------------- | ----------------------- | ---------------------------------------------- |
| `color`               | `'primary' \| 'accent' \| 'warn' \| undefined` | `undefined`             | Material Design color theme for the button     |
| `scrollableElementId` | `string`                                       | `'ix-scroll-container'` | ID of the element to monitor for scroll events |
| `scrollHeightTrigger` | `number`                                       | `100`                   | Pixels scrolled before button appears          |

### Component Behavior

- **Auto-hide/show**: Button automatically appears/disappears based on scroll position
- **Smooth scrolling**: Uses native smooth scrolling behavior when available
- **Accessibility**: Includes proper ARIA labels and keyboard navigation
- **Performance**: Uses throttled scroll event listeners to minimize performance impact

### Advanced Usage

**Custom Scroll Container:**
```typescript
// Component
export class MyComponent implements OnInit {
  ngOnInit() {
    // Ensure your custom container has the correct ID
    const container = document.getElementById('my-scroll-area');
    if (container) {
      container.style.overflow = 'auto';
      container.style.height = '400px';
    }
  }
}
```

```html
<!-- Template -->
<div id="my-scroll-area" class="custom-scroll-container">
  <!-- Long content here -->
</div>

<ix-scroll-top-button 
  scrollableElementId="my-scroll-area"
  color="primary">
</ix-scroll-top-button>
```

**Styling the Button:**
```scss
// Override default positioning
ix-scroll-button {
  .scroll-button {
    bottom: 20px;
    right: 20px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  }
}
```

### Troubleshooting

**Button not appearing:**
- Ensure the target element has `overflow: auto` or `overflow: scroll`
- Verify the `scrollableElementId` matches your container's ID
- Check that content is actually scrollable (taller than container)

**Button appears too early/late:**
- Adjust the `scrollHeightTrigger` value
- Consider different values for mobile vs desktop viewports

<!-- #endregion -->

<!-- #region ix-scroll-progress -->
## Scroll Progress

A visual progress bar that shows users how much of the page content they have scrolled through. Perfect for long-form content, articles, and documentation pages to provide reading progress feedback.

### Installation

1. **Install the package**
```bash
npm install --save @pyrophire/ix-libs
```

2. **Import the standalone component** where needed:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollBarProgressComponent } from '@pyrophire/ix-libs';

@Component({
  standalone: true,
  imports: [CommonModule, ScrollBarProgressComponent],
  template: `<ix-scroll-progress [config]="progressConfig"></ix-scroll-progress>`
})
export class ArticleComponent {}
```

3. **Use in your templates**

**Basic Usage:**
```html
<ix-scroll-progress></ix-scroll-progress>
```

**With Custom Configuration:**
```html
<ix-scroll-progress [config]="progressConfig"></ix-scroll-progress>
```

```typescript
// In your component
export class MyComponent {
  progressConfig: ProgressBarConfig = {
    height: '4px',
    backgroundColor: '#e0e0e0',
    progressColor: '#3f51b5',
    position: 'fixed',
    zIndex: 9999
  };
}
```

### ProgressBarConfig Interface

```typescript
interface ProgressBarConfig {
  height?: string;          // Height of the progress bar (default: '3px')
  backgroundColor?: string; // Background color (default: '#f0f0f0')
  progressColor?: string;   // Progress fill color (default: primary theme color)
  position?: string;        // CSS position (default: 'fixed')
  top?: string;            // Distance from top (default: '0')
  left?: string;           // Distance from left (default: '0')
  right?: string;          // Distance from right (default: '0')
  zIndex?: number;         // Z-index for layering (default: 1000)
  borderRadius?: string;   // Border radius (default: '0')
  transition?: string;     // CSS transition (default: 'width 0.1s ease')
}
```

### Usage Examples

**Article Reading Progress:**
```html
<!-- Fixed top progress bar -->
<ix-scroll-progress [config]="{
  height: '3px',
  progressColor: '#4caf50',
  backgroundColor: 'rgba(0,0,0,0.1)',
  position: 'fixed',
  top: '0',
  zIndex: 9999
}"></ix-scroll-progress>

<article>
  <!-- Your long-form content -->
</article>
```

**Bottom Progress Bar:**
```html
<ix-scroll-progress [config]="{
  height: '5px',
  progressColor: '#ff5722',
  position: 'fixed',
  top: 'auto',
  bottom: '0',
  borderRadius: '2px 2px 0 0'
}"></ix-scroll-progress>
```

**Sidebar Progress Indicator:**
```html
<div class="sidebar">
  <ix-scroll-progress [config]="{
    height: '100%',
    width: '4px',
    progressColor: '#9c27b0',
    backgroundColor: '#e1bee7',
    position: 'absolute',
    top: '0',
    right: '0'
  }"></ix-scroll-progress>
</div>
```

### Component Features

- **Real-time Updates**: Progress updates smoothly as user scrolls
- **Performance Optimized**: Uses efficient scroll event handling
- **Customizable Appearance**: Full control over colors, dimensions, and positioning
- **Responsive**: Works on all screen sizes and orientations
- **Accessibility**: Doesn't interfere with screen readers or keyboard navigation

### Integration with Theme

**Material Design Integration:**
```typescript
import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  template: `
    <ix-scroll-progress [config]="progressConfig"></ix-scroll-progress>
  `
})
export class MyComponent {
  progressConfig = {
    progressColor: 'var(--primary-color)',
    backgroundColor: 'var(--surface-variant)',
    height: '2px'
  };
}
```

**Dark Theme Support:**
```scss
// CSS custom properties for theme support
:root {
  --progress-bg: #e0e0e0;
  --progress-color: #1976d2;
}

[data-theme="dark"] {
  --progress-bg: #424242;
  --progress-color: #90caf9;
}
```

### Best Practices

- Place the component early in your template for immediate visibility
- Use subtle colors that don't distract from content
- Consider different styles for different content types (articles vs data tables)
- Test with various content lengths to ensure proper behavior
- Ensure good contrast ratios for accessibility

<!-- #endregion -->

<!-- #region ix-theme-button -->

## Theme Button

A beautifully animated theme toggle button that allows users to switch between light and dark themes. Features smooth transitions, persistent theme storage, and automatic system preference detection.

### Installation

1. **Install the package**
```bash
npm install --save @pyrophire/ix-libs
```

2. **Import the standalone component**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeButtonComponent } from '@pyrophire/ix-libs';

@Component({
  standalone: true,
  imports: [CommonModule, ThemeButtonComponent],
  template: `<ix-theme-button></ix-theme-button>`
})
export class YourComponent {}
```

3. **Set up Angular Material themes** in your `styles.scss`:
```scss
@import '@angular/material/theming';

// Include the common styles for Angular Material
@include mat-core();

// Define your color palettes
$light-primary: mat-palette($mat-blue);
$light-accent: mat-palette($mat-pink, A200, A100, A400);
$light-warn: mat-palette($mat-red);

$dark-primary: mat-palette($mat-blue-grey);
$dark-accent: mat-palette($mat-amber, A200, A100, A400);
$dark-warn: mat-palette($mat-deep-orange);

// Create theme objects
$light-theme: mat-light-theme($light-primary, $light-accent, $light-warn);
$dark-theme: mat-dark-theme($dark-primary, $dark-accent, $dark-warn);

// Apply themes with CSS classes
.light {
  @include angular-material-theme($light-theme);
}

.dark {
  @include angular-material-theme($dark-theme);
}

// Default theme
@include angular-material-theme($light-theme);
```

4. **Use in your templates**

**Basic Usage:**
```html
<ix-theme-button></ix-theme-button>
```

**In Toolbar:**
```html
<mat-toolbar>
  <span>My App</span>
  <span class="spacer"></span>
  <ix-theme-button></ix-theme-button>
</mat-toolbar>
```

**Custom Styling:**
```html
<ix-theme-button class="custom-theme-toggle"></ix-theme-button>
```

### Theme Integration

The component automatically integrates with the [`IxDarkService`](#dark-service) to provide seamless theme management.

**App Component Setup:**
```typescript
import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IxDarkService } from '@pyrophire/ix-libs';

@Component({
  selector: 'app-root',
  template: `
    <div [class]="currentTheme">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit {
  currentTheme = 'light';

  constructor(
    private darkService: IxDarkService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    // Initialize theme from storage or system preference
    this.darkService.setDarkModePreference();
    
    // Subscribe to theme changes
    this.darkService.themeStream.subscribe(theme => {
      this.currentTheme = theme;
      this.updateBodyClass(theme);
    });
  }

  private updateBodyClass(theme: string) {
    this.renderer.removeClass(this.document.body, 'light');
    this.renderer.removeClass(this.document.body, 'dark');
    this.renderer.addClass(this.document.body, theme);
  }
}
```

### Advanced Theme Configuration

**Custom Color Schemes:**
```scss
// Extended theme with custom properties
.light {
  @include angular-material-theme($light-theme);
  
  --surface-color: #ffffff;
  --text-color: #212121;
  --border-color: #e0e0e0;
  --shadow-color: rgba(0, 0, 0, 0.12);
}

.dark {
  @include angular-material-theme($dark-theme);
  
  --surface-color: #121212;
  --text-color: #ffffff;
  --border-color: #333333;
  --shadow-color: rgba(255, 255, 255, 0.12);
}

// Use custom properties in your components
.my-component {
  background-color: var(--surface-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px var(--shadow-color);
}
```

**Multiple Theme Variants:**
```scss
// Seasonal themes
.light.winter {
  --primary-color: #1565c0;
  --accent-color: #0277bd;
}

.light.summer {
  --primary-color: #ff8f00;
  --accent-color: #ffb300;
}

.dark.winter {
  --primary-color: #42a5f5;
  --accent-color: #29b6f6;
}

.dark.summer {
  --primary-color: #ffb74d;
  --accent-color: #ffcc02;
}
```

### Animation Customization

**Custom Button Animations:**
```scss
ix-theme-button {
  .theme-toggle-button {
    transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    // Custom icon rotation
    .theme-icon {
      transition: transform 0.5s ease-in-out;
    }
    
    &.dark .theme-icon {
      transform: rotate(180deg);
    }
  }
}
```

### Accessibility Features

- **ARIA Labels**: Automatically provides descriptive labels
- **Keyboard Navigation**: Full keyboard support with Enter and Space
- **Screen Reader Support**: Announces theme changes
- **High Contrast**: Works with system high contrast modes
- **Reduced Motion**: Respects `prefers-reduced-motion` settings

### Browser Support

- **Local Storage**: Persistent theme preferences across sessions
- **System Preference**: Automatically detects OS dark mode preference
- **Fallback Storage**: Uses session storage if localStorage is unavailable
- **SSR Compatible**: Works with server-side rendering

### Best Practices

- Place the theme button in a consistent location (header/toolbar)
- Test both themes thoroughly for contrast and readability
- Use semantic color names in your custom CSS properties
- Provide visual feedback during theme transitions
- Consider user preference persistence across different devices

       
<!-- #endregion -->

<!-- #region ix-theme-menu-item -->

## Theme Menu Item

A theme toggle component specifically designed for dropdown menus and navigation drawers. Provides the same theme switching functionality as the Theme Button but with a menu-friendly interface and layout.

### Installation

1. **Install the package**
```bash
npm install --save @pyrophire/ix-libs
```

2. **Import the standalone component**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeMenuItemComponent } from '@pyrophire/ix-libs';

@Component({
  standalone: true,
  imports: [CommonModule, ThemeMenuItemComponent],
  templateUrl: './menu.component.html'
})
export class MenuComponent {}
```

3. **Set up themes** (same as [Theme Button](#theme-button))

4. **Use in your templates**

**In Angular Material Menu:**
```html
<button mat-button [matMenuTriggerFor]="menu">
  Settings
</button>

<mat-menu #menu="matMenu">
  <button mat-menu-item>
    <mat-icon>account_circle</mat-icon>
    Profile
  </button>
  
  <ix-theme-menu-item></ix-theme-menu-item>
  
  <button mat-menu-item>
    <mat-icon>logout</mat-icon>
    Logout
  </button>
</mat-menu>
```

**In Navigation Drawer:**
```html
<mat-sidenav-container>
  <mat-sidenav mode="side">
    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard">
        <mat-icon>dashboard</mat-icon>
        Dashboard
      </a>
      
      <a mat-list-item routerLink="/users">
        <mat-icon>people</mat-icon>
        Users
      </a>
      
      <mat-divider></mat-divider>
      
      <ix-theme-menu-item></ix-theme-menu-item>
      
    </mat-nav-list>
  </mat-sidenav>
  
  <mat-sidenav-content>
    <!-- Main content -->
  </mat-sidenav-content>
</mat-sidenav-container>
```

**In Custom Dropdown:**
```html
<div class="dropdown-menu">
  <div class="menu-item">
    <mat-icon>settings</mat-icon>
    Settings
  </div>
  
  <ix-theme-menu-item></ix-theme-menu-item>
  
  <div class="menu-item">
    <mat-icon>help</mat-icon>
    Help
  </div>
</div>
```

### Component Features

- **Menu Integration**: Designed specifically for dropdown and navigation menus
- **Icon Animation**: Smooth transitions between light/dark mode icons
- **Theme Sync**: Automatically syncs with [`IxDarkService`](#dark-service) state
- **Consistent Styling**: Matches Angular Material menu item patterns
- **Hover States**: Proper hover and focus states for menu interaction

### Styling and Customization

**Custom Menu Item Appearance:**
```scss
ix-theme-menu-item {
  .theme-menu-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
    
    .theme-icon {
      margin-right: 16px;
      transition: transform 0.3s ease;
    }
    
    .theme-label {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.87);
    }
  }
}

// Dark theme adjustments
.dark ix-theme-menu-item {
  .theme-menu-item {
    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }
    
    .theme-label {
      color: rgba(255, 255, 255, 0.87);
    }
  }
}
```

**Integration with Material Design:**
```scss
// Match Material menu item height and spacing
ix-theme-menu-item .theme-menu-item {
  min-height: 48px;
  padding: 0 16px;
  
  // Use Material Design ripple effect
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: currentColor;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s, opacity 0.3s;
  }
  
  &:active::after {
    width: 300px;
    height: 300px;
    opacity: 0.12;
  }
}
```

### Usage Examples

**Settings Menu with Theme Toggle:**
```typescript
@Component({
  template: `
    <button mat-icon-button [matMenuTriggerFor]="settingsMenu">
      <mat-icon>settings</mat-icon>
    </button>
    
    <mat-menu #settingsMenu="matMenu" class="settings-menu">
      <div class="menu-section">
        <div class="menu-section-title">Appearance</div>
        <ix-theme-menu-item></ix-theme-menu-item>
      </div>
      
      <mat-divider></mat-divider>
      
      <div class="menu-section">
        <div class="menu-section-title">Account</div>
        <button mat-menu-item>
          <mat-icon>person</mat-icon>
          Edit Profile
        </button>
        <button mat-menu-item>
          <mat-icon>security</mat-icon>
          Privacy Settings
        </button>
      </div>
    </mat-menu>
  `
})
export class HeaderComponent { }
```

**Mobile Navigation with Theme Toggle:**
```html
<mat-toolbar class="mobile-header">
  <button mat-icon-button (click)="sidenav.toggle()">
    <mat-icon>menu</mat-icon>
  </button>
  <span>My App</span>
</mat-toolbar>

<mat-sidenav-container>
  <mat-sidenav #sidenav mode="over" class="mobile-nav">
    <div class="nav-header">
      <img src="assets/logo.svg" alt="Logo">
      <h2>My App</h2>
    </div>
    
    <mat-nav-list>
      <a mat-list-item routerLink="/home" (click)="sidenav.close()">
        <mat-icon>home</mat-icon>
        Home
      </a>
      
      <a mat-list-item routerLink="/profile" (click)="sidenav.close()">
        <mat-icon>person</mat-icon>
        Profile
      </a>
      
      <mat-divider></mat-divider>
      
      <div class="nav-section-title">Preferences</div>
      <ix-theme-menu-item (click)="sidenav.close()"></ix-theme-menu-item>
      
    </mat-nav-list>
  </mat-sidenav>
  
  <mat-sidenav-content>
    <router-outlet></router-outlet>
  </mat-sidenav-content>
</mat-sidenav-container>
```

### Accessibility

- **Keyboard Navigation**: Full arrow key and Enter/Space support
- **Screen Reader Support**: Proper ARIA labels and role attributes
- **Focus Management**: Maintains focus within menu context
- **High Contrast**: Works with system high contrast modes

### Best Practices

- Use in menus where space is limited
- Group with other preference/settings menu items
- Provide clear visual feedback for current theme state
- Consider menu closing behavior after theme toggle
- Test menu behavior on mobile devices

<!-- #endregion -->

<!-- #region ix-dark-service -->

## Dark Service

A comprehensive theme management service that handles dark/light mode switching, persistent storage, and system preference detection. This service powers all theme-related components and provides a centralized way to manage theme state across your application.

### Installation

1. **Install the package**
```bash
npm install --save @pyrophire/ix-libs
```

2. **Inject into your services/components**
```typescript
import { IxDarkService } from '@pyrophire/ix-libs';

@Injectable()
export class MyService {
  constructor(private darkService: IxDarkService) {}
}

// Or in a component
@Component({...})
export class MyComponent {
  constructor(private darkService: IxDarkService) {}
}
```

3. **Initialize in your app component**
```typescript
import { Component, OnInit } from '@angular/core';
import { IxDarkService } from '@pyrophire/ix-libs';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(private darkService: IxDarkService) {}

  ngOnInit() {
    // Initialize theme from storage or system preference
    this.darkService.setDarkModePreference();
  }
}
```

### API Reference

#### Methods

**`setDarkModePreference(): void`**
Initializes the theme preference by checking:
1. Existing localStorage/sessionStorage setting
2. System OS dark mode preference (if no stored preference)
3. Falls back to light mode as default

```typescript
// Initialize theme on app startup
ngOnInit() {
  this.darkService.setDarkModePreference();
}
```

**`toggleDarkLightMode(): void`**
Switches between light and dark themes and persists the choice.

```typescript
// Toggle theme programmatically
onToggleTheme() {
  this.darkService.toggleDarkLightMode();
}
```

**`getCurrentTheme(): string`**
Returns the current theme ('light' or 'dark').

```typescript
// Get current theme state
const currentTheme = this.darkService.getCurrentTheme();
console.log('Current theme:', currentTheme);
```

**`setTheme(theme: 'light' | 'dark'): void`**
Sets a specific theme directly.

```typescript
// Set theme explicitly
this.darkService.setTheme('dark');
```

#### Observables

**`themeStream: Observable<string>`**
Emits theme changes ('light' or 'dark') whenever the theme is modified.

```typescript
ngOnInit() {
  this.darkService.themeStream.subscribe(theme => {
    console.log('Theme changed to:', theme);
    this.updateUIForTheme(theme);
  });
}

private updateUIForTheme(theme: string) {
  // Update component-specific theme logic
  this.isDarkTheme = theme === 'dark';
  this.themeClass = theme;
}
```

### Advanced Usage Examples

**Theme-Aware Component:**
```typescript
@Component({
  selector: 'app-dashboard',
  template: `
    <div [class]="themeClass">
      <h1>Dashboard</h1>
      <p>Current theme: {{ currentTheme }}</p>
      <button (click)="toggleTheme()">
        Switch to {{ currentTheme === 'light' ? 'dark' : 'light' }} mode
      </button>
    </div>
  `,
  styles: [`
    .light { background: white; color: black; }
    .dark { background: #121212; color: white; }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentTheme = 'light';
  themeClass = 'light';
  private subscription?: Subscription;

  constructor(private darkService: IxDarkService) {}

  ngOnInit() {
    this.subscription = this.darkService.themeStream.subscribe(theme => {
      this.currentTheme = theme;
      this.themeClass = theme;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  toggleTheme() {
    this.darkService.toggleDarkLightMode();
  }
}
```

**Service Integration:**
```typescript
@Injectable({ providedIn: 'root' })
export class ChartService {
  private chartColors$ = this.darkService.themeStream.pipe(
    map(theme => theme === 'dark' 
      ? { primary: '#90caf9', secondary: '#f48fb1' }
      : { primary: '#1976d2', secondary: '#d81b60' }
    )
  );

  constructor(private darkService: IxDarkService) {}

  getChartConfig() {
    return this.chartColors$.pipe(
      map(colors => ({
        data: this.getChartData(),
        options: {
          plugins: {
            legend: {
              labels: { color: colors.primary }
            }
          }
        }
      }))
    );
  }
}
```

**Conditional Rendering Based on Theme:**
```typescript
@Component({
  template: `
    <div *ngIf="isDarkTheme$ | async; else lightTemplate">
      <!-- Dark theme specific content -->
      <app-dark-mode-chart></app-dark-mode-chart>
    </div>
    
    <ng-template #lightTemplate>
      <!-- Light theme specific content -->
      <app-light-mode-chart></app-light-mode-chart>
    </ng-template>
  `
})
export class ChartsComponent {
  isDarkTheme$ = this.darkService.themeStream.pipe(
    map(theme => theme === 'dark')
  );

  constructor(private darkService: IxDarkService) {}
}
```

### Storage and Persistence

The service automatically handles theme persistence using:

1. **LocalStorage** (primary): Persistent across browser sessions
2. **SessionStorage** (fallback): Available for current session only
3. **Window Storage** (backup): In-memory storage if others are blocked

```typescript
// Storage key used
const THEME_STORAGE_KEY = 'ix-theme-preference';

// Manual storage operations (usually not needed)
const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
localStorage.setItem(THEME_STORAGE_KEY, 'dark');
```

### System Integration

**Detecting OS Theme Preference:**
```typescript
// The service automatically detects system preference
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// You can also listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('ix-theme-preference')) {
    // Only apply system theme if user hasn't set a preference
    this.darkService.setTheme(e.matches ? 'dark' : 'light');
  }
});
```

### Error Handling and Fallbacks

```typescript
@Injectable()
export class ThemeGuardService {
  constructor(private darkService: IxDarkService) {}

  initializeThemeWithFallback() {
    try {
      this.darkService.setDarkModePreference();
    } catch (error) {
      console.warn('Theme initialization failed, using light theme:', error);
      this.darkService.setTheme('light');
    }
  }
}
```

### Testing

**Unit Testing with Dark Service:**
```typescript
describe('DarkService', () => {
  let service: IxDarkService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IxDarkService]
    });
    service = TestBed.inject(IxDarkService);
  });

  it('should initialize with light theme by default', () => {
    expect(service.getCurrentTheme()).toBe('light');
  });

  it('should toggle between themes', () => {
    service.setTheme('light');
    service.toggleDarkLightMode();
    expect(service.getCurrentTheme()).toBe('dark');
  });

  it('should emit theme changes', (done) => {
    service.themeStream.subscribe(theme => {
      expect(theme).toBe('dark');
      done();
    });
    service.setTheme('dark');
  });
});
```

### Performance Considerations

- **Efficient Storage**: Uses optimized storage detection and fallbacks
- **Minimal DOM Operations**: Service only manages state, components handle DOM updates
- **Memory Management**: Properly implements observables with cleanup
- **Lazy Loading**: Service is tree-shakable and only loaded when needed

### Browser Compatibility

- **Modern Browsers**: Full feature support including system preference detection
- **Legacy Support**: Graceful degradation with localStorage fallbacks
- **Mobile Devices**: Works on all mobile browsers with proper touch support
- **SSR Compatible**: Safe for server-side rendering environments  
  

       
<!-- #endregion -->



<!-- #region ix-pipes -->

## Pipes

A collection of utility pipes for common data transformation needs in Angular applications. These pipes help format and display data consistently across your application while maintaining type safety and performance.

### Installation

1. **Install the package**
```bash
npm install --save @pyrophire/ix-libs
```

2. **Import standalone pipes directly** into your component:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmPmPipe, CamelToTitlePipe, FileSizePipe, PhonePipe, SafePipe } from '@pyrophire/ix-libs';

@Component({
  standalone: true,
  imports: [CommonModule, AmPmPipe, CamelToTitlePipe, FileSizePipe, PhonePipe, SafePipe],
  template: `
    <p>{{ '14:30:00' | ampm }}</p>
    <p>{{ 'firstName' | camelToTitle }}</p>
  `
})
export class PipesDemoComponent {}
```

3. **Use in templates** like any Angular pipe

### Available Pipes

#### 1. AM/PM Time Pipe

Transforms 24-hour time format to 12-hour format with AM/PM indicator.

**Pipe Name:** `ampm`

**Usage:**
```html
<!-- Basic usage -->
<p>Meeting time: {{ '14:30:00' | ampm }}</p>
<!-- Output: Meeting time: 2:30:00 PM -->

<!-- With seconds -->
<p>Event starts: {{ '09:15:45' | ampm }}</p>
<!-- Output: Event starts: 9:15:45 AM -->

<!-- In data tables -->
<mat-table [dataSource]="events">
  <ng-container matColumnDef="time">
    <mat-header-cell *matHeaderCellDef>Time</mat-header-cell>
    <mat-cell *matCellDef="let event">
      {{ event.startTime | ampm }}
    </mat-cell>
  </ng-container>
</mat-table>
```

**Input/Output Examples:**
| Input        | Output        |
| ------------ | ------------- |
| `'00:00:00'` | `12:00:00 AM` |
| `'12:00:00'` | `12:00:00 PM` |
| `'13:45:30'` | `1:45:30 PM`  |
| `'23:59:59'` | `11:59:59 PM` |

#### 2. Camel Case to Title Case Pipe

Converts camelCase strings to Title Case format for display.

**Pipe Name:** `camelToTitle` (alias: `ct2`)

**Usage:**
```html
<!-- Property names -->
<p>{{ 'firstName' | camelToTitle }}</p>
<!-- Output: First Name -->

<!-- API field names -->
<div *ngFor="let field of formFields">
  <label>{{ field.name | camelToTitle }}:</label>
  <input [formControlName]="field.name">
</div>

<!-- Dynamic headers -->
<mat-header-cell *matHeaderCellDef>
  {{ columnName | camelToTitle }}
</mat-header-cell>
```

**Input/Output Examples:**
| Input                   | Output                  |
| ----------------------- | ----------------------- |
| `'firstName'`           | `First Name`            |
| `'userAccountSettings'` | `User Account Settings` |
| `'isActive'`            | `Is Active`             |
| `'createdAt'`           | `Created At`            |

#### 3. File Size Pipe

Converts bytes to human-readable file size format (B, KB, MB, GB, TB).

**Pipe Name:** `fileSize`

**Usage:**
```html
<!-- File upload display -->
<div *ngFor="let file of uploadedFiles">
  <span>{{ file.name }}</span>
  <span class="file-size">{{ file.size | fileSize }}</span>
</div>

<!-- Storage usage -->
<mat-progress-bar [value]="usedStorage / totalStorage * 100"></mat-progress-bar>
<p>{{ usedStorage | fileSize }} of {{ totalStorage | fileSize }} used</p>

<!-- Download sizes -->
<button mat-button>
  Download ({{ downloadSize | fileSize }})
</button>
```

**Input/Output Examples:**
| Input (bytes)   | Output   |
| --------------- | -------- |
| `1024`          | `1 KB`   |
| `1536`          | `1.5 KB` |
| `1048576`       | `1 MB`   |
| `1073741824`    | `1 GB`   |
| `1099511627776` | `1 TB`   |

**Advanced Usage:**
```html
<!-- With precision control -->
<p>{{ largeFile | fileSize:2 }}</p>
<!-- Shows 2 decimal places: 1.25 GB -->

<!-- In data binding -->
<mat-slider [value]="fileSize" 
            [displayWith]="formatFileSize">
</mat-slider>
```

```typescript
// Component method for slider display
formatFileSize = (value: number) => this.pipe.transform(value);
```

#### 4. Phone Number Pipe

Formats phone numbers into readable format with proper spacing and parentheses.

**Pipe Name:** `phone`

**Usage:**
```html
<!-- Contact display -->
<div class="contact-info">
  <p>Phone: {{ user.phone | phone }}</p>
  <p>Mobile: {{ user.mobile | phone }}</p>
</div>

<!-- In forms with formatting -->
<mat-form-field>
  <input matInput 
         [value]="phoneControl.value | phone" 
         placeholder="Phone Number">
</mat-form-field>

<!-- Call links -->
<a [href]="'tel:' + contact.phone" 
   mat-button>
  {{ contact.phone | phone }}
</a>
```

**Input/Output Examples:**
| Input              | Output                 |
| ------------------ | ---------------------- |
| `'5124631155'`     | `(512) 463-1155`       |
| `'15124631155'`    | `1 (512) 463-1155`     |
| `'51246311559999'` | `(512) 463-1155 x9999` |
| `'8005551234'`     | `(800) 555-1234`       |

**International Support:**
```html
<!-- With country codes -->
<p>{{ '+1234567890' | phone }}</p>
<!-- Output: +1 (234) 567-890 -->

<!-- Extensions -->
<p>{{ '5551234567,123' | phone }}</p>
<!-- Output: (555) 123-4567 ext. 123 -->
```

#### 5. Safe Sanitization Pipe

Safely sanitizes URLs and content using Angular's DomSanitizer for secure content display.

**Pipe Name:** `safe`

**Sanitization Types:**
- `'html'` - HTML content
- `'style'` - CSS styles
- `'script'` - JavaScript (use with caution)
- `'url'` - Regular URLs
- `'resourceUrl'` - Resource URLs (iframes, etc.)
- `'mailto'` - Email links
- `'tel'` - Phone links
- `'sms'` - SMS links

**Usage:**
```html
<!-- Email links -->
<a [href]="'contact@example.com' | safe:'mailto'">
  Send Email
</a>
<!-- Output: mailto:contact@example.com -->

<!-- Phone links -->
<a [href]="phoneNumber | safe:'tel'" mat-button>
  Call {{ phoneNumber | phone }}
</a>
<!-- Output: tel:5124631155 -->

<!-- SMS links -->
<a [href]="'5551234567' | safe:'sms'" mat-button>
  Send Text
</a>
<!-- Output: sms:5551234567 -->

<!-- External URLs -->
<a [href]="externalUrl | safe:'url'" 
   target="_blank" 
   rel="noopener">
  Visit Site
</a>

<!-- Embedded content (use carefully) -->
<div [innerHTML]="userContent | safe:'html'"></div>

<!-- Resource URLs for iframes -->
<iframe [src]="videoUrl | safe:'resourceUrl'" 
        width="560" 
        height="315">
</iframe>
```

**Security Examples:**
```html
<!-- Email with subject and body -->
<a [href]="emailData | safe:'mailto'">Contact Support</a>
```

```typescript
// Component
get emailData() {
  const email = 'support@example.com';
  const subject = encodeURIComponent('Help Request');
  const body = encodeURIComponent('I need help with...');
  return `${email}?subject=${subject}&body=${body}`;
}
```

**Advanced Sanitization:**
```html
<!-- Multiple sanitization options -->
<div class="dynamic-content">
  <!-- Safe HTML rendering -->
  <div [innerHTML]="blogContent | safe:'html'"></div>
  
  <!-- Safe style injection -->
  <div [style]="dynamicStyles | safe:'style'">
    Styled content
  </div>
</div>
```

### Pipe Combinations

**Chaining Multiple Pipes:**
```html
<!-- Format file info with multiple transformations -->
<div class="file-info">
  <h3>{{ fileName | camelToTitle }}</h3>
  <p>Size: {{ fileSize | fileSize }}</p>
  <p>Modified: {{ modifiedTime | ampm }}</p>
  <a [href]="contactEmail | safe:'mailto'">
    Contact Owner
  </a>
</div>

<!-- Complex data display -->
<mat-card *ngFor="let contact of contacts">
  <mat-card-header>
    <mat-card-title>{{ contact.fullName | camelToTitle }}</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <p>Phone: {{ contact.phoneNumber | phone }}</p>
    <p>Last seen: {{ contact.lastSeen | ampm }}</p>
    <a [href]="contact.email | safe:'mailto'" mat-button>
      Email
    </a>
    <a [href]="contact.phone | safe:'tel'" mat-button>
      Call
    </a>
  </mat-card-content>
</mat-card>
```

### Performance Considerations

- **Pure Pipes**: All pipes are pure for optimal change detection performance
- **Memoization**: Repeated calls with same input return cached results
- **Tree Shaking**: Import only the pipes you need to reduce bundle size

**Selective Import:**
```typescript
// Import only specific pipes if needed
import { AmPmPipe, FileSizePipe } from '@pyrophire/ix-libs';

@NgModule({
  declarations: [AmPmPipe, FileSizePipe],
  // ...
})
export class FeatureModule { }
```

### Custom Extensions

**Extending Pipes in Your Components:**
```typescript
@Component({
  template: `
    <p>{{ complexData | myCustomPipe | fileSize }}</p>
  `
})
export class MyComponent {
  // Combine with your own custom pipes
}
```

       
<!-- #endregion -->

<!-- #region ix-dark-service -->

<!-- #region ix-shared-services -->

## Shared Services

A collection of utility services that provide common functionality for browser storage management and form handling. These services include built-in fallbacks and error handling for robust applications.

### Installation

1. **Install the package**
```bash
npm install --save @pyrophire/ix-libs
```

2. **Inject into your services/components**
```typescript
import { 
  IxLocalStorageService, 
  IxSessionStorageService, 
  IxFormsHelperService 
} from '@pyrophire/ix-libs';

@Injectable()
export class MyService {
  constructor(
    private localStorage: IxLocalStorageService,
    private sessionStorage: IxSessionStorageService,
    private formsHelper: IxFormsHelperService
  ) {}
}
```

### Available Services

#### IxLocalStorageService & IxSessionStorageService

Browser storage services with automatic fallback mechanisms and security-aware implementations.

**API Methods:**

**`setItem(key: string, value: string): void`**
```typescript
// Save user preferences
this.localStorage.setItem('theme', 'dark');
this.localStorage.setItem('language', 'en');

// Save session data
this.sessionStorage.setItem('currentTab', 'dashboard');
this.sessionStorage.setItem('tempData', JSON.stringify(complexObject));
```

**`getItem(key: string): string | null`**
```typescript
// Retrieve saved preferences
const theme = this.localStorage.getItem('theme') || 'light';
const language = this.localStorage.getItem('language') || 'en';

// Parse JSON data
const tempDataStr = this.sessionStorage.getItem('tempData');
const tempData = tempDataStr ? JSON.parse(tempDataStr) : null;
```

**`removeItem(key: string): void`**
```typescript
// Clear specific items
this.localStorage.removeItem('outdatedSetting');
this.sessionStorage.removeItem('temporaryData');
```

**`clear(): void`**
```typescript
// Clear all stored data (use with caution)
this.localStorage.clear();
this.sessionStorage.clear();
```

**Advanced Usage Examples:**

**Settings Service:**
```typescript
@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly SETTINGS_KEY = 'app-settings';
  
  constructor(private storage: IxLocalStorageService) {}

  saveSettings(settings: AppSettings): void {
    this.storage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
  }

  getSettings(): AppSettings {
    const stored = this.storage.getItem(this.SETTINGS_KEY);
    return stored ? JSON.parse(stored) : this.getDefaultSettings();
  }

  updateSetting<K extends keyof AppSettings>(
    key: K, 
    value: AppSettings[K]
  ): void {
    const settings = this.getSettings();
    settings[key] = value;
    this.saveSettings(settings);
  }

  private getDefaultSettings(): AppSettings {
    return {
      theme: 'light',
      language: 'en',
      notifications: true,
      autoSave: true
    };
  }
}
```

**Session Management:**
```typescript
@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(private sessionStorage: IxSessionStorageService) {}

  setActiveWorkspace(workspaceId: string): void {
    this.sessionStorage.setItem('activeWorkspace', workspaceId);
  }

  getActiveWorkspace(): string | null {
    return this.sessionStorage.getItem('activeWorkspace');
  }

  saveFormDraft(formId: string, data: any): void {
    const key = `form-draft-${formId}`;
    this.sessionStorage.setItem(key, JSON.stringify(data));
  }

  getFormDraft(formId: string): any {
    const key = `form-draft-${formId}`;
    const stored = this.sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  }

  clearFormDraft(formId: string): void {
    const key = `form-draft-${formId}`;
    this.sessionStorage.removeItem(key);
  }
}
```

#### IxFormsHelperService

Utility service for common Angular Reactive Forms operations and validation handling.

**API Methods:**

**`getDirtyValues(form: AbstractControl): any`**

Extracts only the modified (dirty) form control values, useful for partial updates and change tracking.

```typescript
@Component({
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input formControlName="firstName" placeholder="First Name">
      <input formControlName="lastName" placeholder="Last Name">
      <input formControlName="email" placeholder="Email">
      <button type="submit" [disabled]="!userForm.dirty">
        Update Profile
      </button>
    </form>
  `
})
export class ProfileComponent {
  userForm = this.fb.group({
    firstName: ['John'],
    lastName: ['Doe'],
    email: ['john.doe@example.com']
  });

  constructor(
    private fb: FormBuilder,
    private formsHelper: IxFormsHelperService,
    private userService: UserService
  ) {}

  onSubmit(): void {
    if (this.userForm.valid && this.userForm.dirty) {
      // Only send changed fields to API
      const changedData = this.formsHelper.getDirtyValues(this.userForm);
      console.log('Changed fields:', changedData);
      // Output: { firstName: 'Jane' } (if only first name was changed)
      
      this.userService.updateUser(changedData).subscribe(
        response => console.log('Updated successfully'),
        error => console.error('Update failed', error)
      );
    }
  }
}
```

**Complex Form Example:**
```typescript
// Nested form groups
this.complexForm = this.fb.group({
  personal: this.fb.group({
    firstName: [''],
    lastName: ['']
  }),
  contact: this.fb.group({
    email: [''],
    phone: ['']
  }),
  preferences: this.fb.group({
    theme: ['light'],
    notifications: [true]
  })
});

// Get only dirty values from nested structure
const dirtyValues = this.formsHelper.getDirtyValues(this.complexForm);
// Output: { contact: { email: 'new@email.com' } }
```

**`hasValidationError(control: AbstractControl, errorCode: string): boolean`**

Checks if a form control has a specific validation error and has been touched by the user.

```typescript
@Component({
  template: `
    <form [formGroup]="registrationForm">
      <mat-form-field>
        <input matInput 
               formControlName="email" 
               placeholder="Email"
               [class.error]="hasEmailError()">
        <mat-error *ngIf="hasEmailError('required')">
          Email is required
        </mat-error>
        <mat-error *ngIf="hasEmailError('email')">
          Please enter a valid email
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <input matInput 
               type="password"
               formControlName="password" 
               placeholder="Password">
        <mat-error *ngIf="hasPasswordError('required')">
          Password is required
        </mat-error>
        <mat-error *ngIf="hasPasswordError('minlength')">
          Password must be at least 8 characters
        </mat-error>
      </mat-form-field>
    </form>
  `
})
export class RegistrationComponent {
  registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private formsHelper: IxFormsHelperService
  ) {}

  hasEmailError(errorType?: string): boolean {
    const emailControl = this.registrationForm.get('email');
    if (!emailControl) return false;
    
    if (errorType) {
      return this.formsHelper.hasValidationError(emailControl, errorType);
    }
    return emailControl.invalid && emailControl.touched;
  }

  hasPasswordError(errorType: string): boolean {
    const passwordControl = this.registrationForm.get('password');
    return passwordControl ? 
      this.formsHelper.hasValidationError(passwordControl, errorType) : false;
  }
}
```

**Dynamic Form Validation:**
```typescript
@Component({
  template: `
    <div *ngFor="let field of formFields">
      <mat-form-field>
        <input matInput 
               [formControlName]="field.name"
               [placeholder]="field.label">
        <mat-error *ngIf="hasFieldError(field.name, 'required')">
          {{ field.label }} is required
        </mat-error>
      </mat-form-field>
    </div>
  `
})
export class DynamicFormComponent {
  formFields = [
    { name: 'name', label: 'Full Name', required: true },
    { name: 'company', label: 'Company', required: false },
    { name: 'phone', label: 'Phone Number', required: true }
  ];

  dynamicForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formsHelper: IxFormsHelperService
  ) {
    this.buildForm();
  }

  private buildForm(): void {
    const controls = {};
    this.formFields.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      controls[field.name] = ['', validators];
    });
    this.dynamicForm = this.fb.group(controls);
  }

  hasFieldError(fieldName: string, errorType: string): boolean {
    const control = this.dynamicForm.get(fieldName);
    return control ? 
      this.formsHelper.hasValidationError(control, errorType) : false;
  }
}
```

### Storage Fallback System

Both storage services include automatic fallback mechanisms:

1. **Primary**: Native localStorage/sessionStorage
2. **Fallback**: Window-based storage object
3. **Error Handling**: Graceful degradation when storage is blocked

```typescript
// The services automatically handle these scenarios:
// - Private browsing mode restrictions
// - Storage quota exceeded
// - Browser security settings
// - Disabled JavaScript storage

// Example of the internal fallback logic:
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  // Use native localStorage
} catch (error) {
  // Fall back to window storage
  window['ix-storage'] = window['ix-storage'] || {};
}
```

### Best Practices

**Type Safety with Storage:**
```typescript
interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  autoSave: boolean;
}

@Injectable()
export class PreferencesService {
  constructor(private storage: IxLocalStorageService) {}

  setPreferences(prefs: UserPreferences): void {
    this.storage.setItem('user-prefs', JSON.stringify(prefs));
  }

  getPreferences(): UserPreferences {
    const stored = this.storage.getItem('user-prefs');
    if (stored) {
      try {
        return JSON.parse(stored) as UserPreferences;
      } catch {
        return this.getDefaultPreferences();
      }
    }
    return this.getDefaultPreferences();
  }
}
```

**Form Validation Helpers:**
```typescript
// Create reusable validation methods
export class ValidationHelpers {
  constructor(private formsHelper: IxFormsHelperService) {}

  createErrorChecker(form: FormGroup) {
    return (controlName: string, errorType: string) => {
      const control = form.get(controlName);
      return control ? 
        this.formsHelper.hasValidationError(control, errorType) : false;
    };
  }

  getFirstError(control: AbstractControl): string | null {
    if (control.errors && control.touched) {
      return Object.keys(control.errors)[0];
    }
    return null;
  }
}
```

### Notes
* `IxLocalStorageService` & `IxSessionStorageService` have polyfils provided by @AlexKimball that will perform a feature detection of browser storage. If browser security prevents usage of localStorage or sessionStorage, a window['ix'] storage object will be used in place. 
* Window instance of storage will not be persisted on IxLocalStorageService, but will allow app to continue to function without throwing errors and stalling entirely. 

       
<!-- #endregion -->

<!-- #region ix-table-header -->
## Table Header

A standardized, reusable table header component that provides consistent styling, sorting capabilities, and filtering functionality for Angular Material tables. Designed to reduce boilerplate code and ensure uniform table experiences across your application.

### Installation

1. **Install the package**
```bash
npm install --save @pyrophire/ix-libs
```

2. **Import the module**
```typescript
import { IxTableHeaderModule } from '@pyrophire/ix-libs';

@NgModule({
  imports: [
    IxTableHeaderModule,
    MatTableModule,    // Required for Material table integration
    MatSortModule,     // Required for sorting features
    MatInputModule,    // Required for filter functionality
    // ... other imports
  ]
})
export class YourModule { }
```

3. **Use with Angular Material Tables**

**Basic Table with Header:**
```html
<div class="table-container">
  <ix-table-header 
    [title]="'Users Management'"
    [showFilter]="true"
    [filterPlaceholder]="'Search users...'"
    (filterChange)="applyFilter($event)">
  </ix-table-header>

  <mat-table [dataSource]="dataSource" matSort>
    <ng-container matColumnDef="name">
      <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
      <mat-cell *matCellDef="let user">{{ user.name }}</mat-cell>
    </ng-container>

    <ng-container matColumnDef="email">
      <mat-header-cell *matHeaderCellDef mat-sort-header>Email</mat-header-cell>
      <mat-cell *matCellDef="let user">{{ user.email }}</mat-cell>
    </ng-container>

    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
  </mat-table>
</div>
```

**Advanced Configuration:**
```html
<ix-table-header 
  [title]="tableTitle"
  [subtitle]="tableSubtitle"
  [showFilter]="true"
  [showActions]="true"
  [showRefresh]="true"
  [showExport]="true"
  [filterPlaceholder]="'Search by name, email, or department...'"
  [totalCount]="dataSource.data.length"
  [filteredCount]="dataSource.filteredData?.length"
  (filterChange)="onFilterChange($event)"
  (refreshClick)="onRefresh()"
  (exportClick)="onExport()"
  (actionClick)="onCustomAction($event)">
  
  <!-- Custom action buttons -->
  <ng-container slot="actions">
    <button mat-button color="primary" (click)="addNew()">
      <mat-icon>add</mat-icon>
      Add User
    </button>
    <button mat-icon-button (click)="bulkEdit()" [disabled]="!hasSelection">
      <mat-icon>edit</mat-icon>
    </button>
  </ng-container>
</ix-table-header>
```

### Component Properties

| Property            | Type      | Default       | Description                        |
| ------------------- | --------- | ------------- | ---------------------------------- |
| `title`             | `string`  | `''`          | Main title displayed in the header |
| `subtitle`          | `string`  | `''`          | Secondary text below the title     |
| `showFilter`        | `boolean` | `false`       | Show/hide the search filter input  |
| `showActions`       | `boolean` | `false`       | Show/hide the actions section      |
| `showRefresh`       | `boolean` | `false`       | Show/hide the refresh button       |
| `showExport`        | `boolean` | `false`       | Show/hide the export button        |
| `filterPlaceholder` | `string`  | `'Filter...'` | Placeholder text for filter input  |
| `totalCount`        | `number`  | `0`           | Total number of items              |
| `filteredCount`     | `number`  | `0`           | Number of items after filtering    |
| `loading`           | `boolean` | `false`       | Show loading state                 |

### Events

| Event          | Type     | Description                             |
| -------------- | -------- | --------------------------------------- |
| `filterChange` | `string` | Emitted when filter text changes        |
| `refreshClick` | `void`   | Emitted when refresh button is clicked  |
| `exportClick`  | `void`   | Emitted when export button is clicked   |
| `actionClick`  | `string` | Emitted when custom action is triggered |

### Usage Examples

**Complete Data Table Implementation:**
```typescript
@Component({
  selector: 'app-users-table',
  template: `
    <div class="users-table">
      <ix-table-header 
        title="Team Members"
        subtitle="Manage user accounts and permissions"
        [showFilter]="true"
        [showRefresh]="true"
        [showExport]="true"
        [totalCount]="totalUsers"
        [filteredCount]="dataSource.filteredData?.length || 0"
        [loading]="isLoading"
        (filterChange)="applyFilter($event)"
        (refreshClick)="loadUsers()"
        (exportClick)="exportUsers()">
      </ix-table-header>

      <mat-table [dataSource]="dataSource" matSort class="users-mat-table">
        <!-- Columns definitions -->
        <ng-container matColumnDef="avatar">
          <mat-header-cell *matHeaderCellDef></mat-header-cell>
          <mat-cell *matCellDef="let user">
            <img [src]="user.avatar" class="user-avatar">
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
          <mat-cell *matCellDef="let user">
            <div class="user-info">
              <span class="user-name">{{ user.name }}</span>
              <span class="user-title">{{ user.title }}</span>
            </div>
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="department">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Department</mat-header-cell>
          <mat-cell *matCellDef="let user">{{ user.department }}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="status">
          <mat-header-cell *matHeaderCellDef>Status</mat-header-cell>
          <mat-cell *matCellDef="let user">
            <mat-chip [color]="getStatusColor(user.status)">
              {{ user.status }}
            </mat-chip>
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let user">
            <button mat-icon-button (click)="editUser(user)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button (click)="deleteUser(user)" color="warn">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>

      <mat-paginator 
        [pageSizeOptions]="[10, 25, 50, 100]"
        showFirstLastButtons>
      </mat-paginator>
    </div>
  `
})
export class UsersTableComponent implements OnInit {
  displayedColumns = ['avatar', 'name', 'department', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>();
  totalUsers = 0;
  isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe(users => {
      this.dataSource.data = users;
      this.totalUsers = users.length;
      this.isLoading = false;
    });
  }

  exportUsers() {
    const csvData = this.convertToCSV(this.dataSource.filteredData);
    this.downloadCSV(csvData, 'users-export.csv');
  }

  editUser(user: User) {
    // Edit implementation
  }

  deleteUser(user: User) {
    // Delete implementation
  }
}
```

**Responsive Table with Mobile Layout:**
```html
<div class="responsive-table">
  <ix-table-header 
    [title]="'Orders'"
    [showFilter]="true"
    [showActions]="true"
    filterPlaceholder="Search orders..."
    (filterChange)="applyFilter($event)">
    
    <ng-container slot="actions">
      <button mat-button color="primary" (click)="createOrder()">
        <mat-icon>add</mat-icon>
        <span class="hide-mobile">New Order</span>
      </button>
    </ng-container>
  </ix-table-header>

  <!-- Desktop Table -->
  <mat-table [dataSource]="dataSource" 
             matSort 
             class="desktop-table"
             [class.mobile-hidden]="isMobile">
    <!-- Standard table columns -->
  </mat-table>

  <!-- Mobile Cards -->
  <div class="mobile-cards" [class.desktop-hidden]="!isMobile">
    <mat-card *ngFor="let order of dataSource.filteredData" class="order-card">
      <mat-card-header>
        <mat-card-title>{{ order.number }}</mat-card-title>
        <mat-card-subtitle>{{ order.date | date }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p><strong>Customer:</strong> {{ order.customer }}</p>
        <p><strong>Total:</strong> {{ order.total | currency }}</p>
      </mat-card-content>
    </mat-card>
  </div>
</div>
```

### Styling and Theming

**Custom Header Styles:**
```scss
ix-table-header {
  .table-header {
    background: var(--surface-color);
    border-bottom: 1px solid var(--divider-color);
    padding: 16px 24px;
    
    .header-title {
      font-size: 20px;
      font-weight: 500;
      color: var(--text-primary);
    }
    
    .header-subtitle {
      font-size: 14px;
      color: var(--text-secondary);
      margin-top: 4px;
    }
    
    .header-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    
    .filter-input {
      min-width: 300px;
      
      @media (max-width: 768px) {
        min-width: 200px;
      }
    }
  }
}
```

**Dark Theme Support:**
```scss
.dark ix-table-header {
  .table-header {
    background: var(--surface-dark);
    border-color: var(--divider-dark);
    
    .header-title {
      color: var(--text-primary-dark);
    }
    
    .header-subtitle {
      color: var(--text-secondary-dark);
    }
  }
}
```

### Integration with Other IX Components

**With Theme Components:**
```html
<div class="app-layout">
  <mat-toolbar color="primary">
    <span>My App</span>
    <span class="spacer"></span>
    <ix-theme-button></ix-theme-button>
  </mat-toolbar>
  
  <div class="content">
    <ix-table-header 
      title="Data Table"
      [showFilter]="true">
    </ix-table-header>
    
    <!-- Your table implementation -->
  </div>
</div>
```

**With Scroll Components:**
```html
<div class="table-page">
  <ix-scroll-progress></ix-scroll-progress>
  
  <ix-table-header 
    title="Large Dataset"
    [showFilter]="true"
    [totalCount]="10000"
    [filteredCount]="filteredCount">
  </ix-table-header>
  
  <cdk-virtual-scroll-viewport itemSize="48" class="table-viewport">
    <!-- Virtual scrolling table -->
  </cdk-virtual-scroll-viewport>
  
  <ix-scroll-button color="primary"></ix-scroll-button>
</div>
```

### Best Practices

- **Consistent Placement**: Always place the table header directly above your table
- **Filter Performance**: Debounce filter changes for large datasets
- **Responsive Design**: Consider mobile layouts and touch interactions
- **Accessibility**: Ensure proper ARIA labels and keyboard navigation
- **Loading States**: Use the loading property to show data fetch progress
- **Action Organization**: Group related actions logically in the header

### Performance Optimization

```typescript
// Debounced filtering for large datasets
@Component({...})
export class OptimizedTableComponent {
  private filterSubject = new Subject<string>();

  ngOnInit() {
    this.filterSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(filter => {
      this.dataSource.filter = filter;
    });
  }

  onFilterChange(filterValue: string) {
    this.filterSubject.next(filterValue);
  }
}
```

<!-- #endregion -->

<!-- #endregion -->
