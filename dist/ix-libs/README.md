
# IX Libraries & Services

  - [Icons](#icons)
    - [Installation](#installation)
    - [Available icons](#available-icons)
  - [Scroll](#scroll)
    - [Installation](#installation-1)
    - [Notes](#notes)
  - [Theme Button](#theme-button)
    - [Installation](#installation-2)
    - [Notes](#notes-1)
  - [Dark Service](#dark-service)
    - [Installation](#installation-3)
    - [Notes](#notes-2)
  - [Media Service](#media-service)
    - [Installation](#installation-4)
    - [Notes](#notes-3)
  - [Shared Services](#shared-services)
    - [Installation](#installation-5)
    - [Notes](#notes-4)

<!-- #region ix-icons -->
## Icons

### Installation

1. Run

```
npm install --save ix-libs
```

2. Update angular.json/assets with

```
{
    "glob": "**/*",
    "input": "./node_modules/ix-icons/ix-img/",
    "output": "./ix-img"
}
```

3. Add to Module Imports
```
import { IxIconsModule } from 'ix-libs';
```

4. Add to layout with
```
<mat-icon svgIcon="ix-file-html"></mat-icon>
```

### Available icons

- ix-export
- ix-dialog
- ix-file-html
- ix-file-doc
- ix-file-excel
- ix-file-pdf

<!-- #endregion -->
  
<!-- #region ix-scroll -->
## Scroll

### Installation

1. Run

```
npm install --save ix-libs
```
2. Add to Module Imports
```
import { IxScrollModule } from 'ix-libs';
```

3. Add to layout with

```
<ix-scroll-top-button [color]="accent" ></ix-scroll-top-button>
```

### Notes
* `@param color`
    * `undefined`: default mat-fab-button coloring
    * `primary`: Primary color of Angular Material theme
    * `accent`: Accent color of Angular Material theme
* `@param scrollableElementId`
    * Used to set id of `<body>`
    * Pass in a preset `id` property to prevent it being changed to `id="ix-scroll-container"` by default
* Required styles
    * `<body>` element must have `height: 100%; overflow: auto` to ensure the body element is the scrollable element and not the html.

<!-- #endregion -->

<!-- #region ix-theme-button -->

## Theme Button

### Installation

1. Run

```
npm install --save ix-libs
```
2. Add to Module Imports
```
import { IxThemeButtonModule } from 'ix-libs';
```

3. Add to layout with

```
<ix-theme-button ></ix-theme-button>
```

### Notes
* Component uses the [`IxDarkService`](#Dark-Service) to provide the theme evalutation and switching.
* Theme requirements
    * a `.light` and `.dark` theme must be declared in the Angular Material theme file. 
      ``` 
        
        $light-theme: mat-light-theme($light-primary, $light-accent, $light-warn);
        .light {
          @include angular-material-theme($light-theme);
        }
        
        $dark-theme: mat-dark-theme($dark-primary, $dark-accent, $dark-warn);
        .dark {
          @include angular-material-theme($dark-theme);
        }
      ```

       
<!-- #endregion -->

<!-- #region ix-dark-service -->

## Dark Service

### Installation

1. Run

```
npm install --save ix-libs
```
2. Add to dependency injection
```
import { IxDarkService } from 'ix-libs';
```

3. Available service functions
   * `setDarkModePreference(): void` 
     * Will evauluate localStorage or window storage for an existing dark/light preference setting. If one is not found, it will evaulate the operating systems dark mode preference and set the above mentioned setting to match.
   * `toggleDarkLightMode(): void`
     * Will toggle between light and dark mode based on the local/window storage setting

4. Available Observable 
   * `themeStream<string>`
     * Will output either `light` or `dark` whenever the setting is initially read or changed


### Notes
* Service makes interal service calls to `LocalStorageService` to determine if browser security allows the use of localStorage.  
  

       
<!-- #endregion -->

<!-- #region ix-media-service -->

## Media Service

### Installation

1. Run

```
npm install --save ix-libs
```
2. Add to dependency injection
```
import { IxMediaQueryService } from 'ix-libs';
```

3. Available service functions
   * `has(mqString): boolean` 
     * Will return a boolean if the `@param mqString` is present on the current viewport resolution
     


### Notes
* This is a wrapper for [@angular/flex-layout](https://github.com/angular/flex-layout/)'s [MediaObserver](https://github.com/angular/flex-layout/wiki/MediaObserver) as a means to provide TypeScript a simple observable to trigger events if the viewport fits the provided `@param mqString` with limiting the usage of the fxLayout directives in the main application.

       
<!-- #endregion -->

<!-- #region ix-shared-services -->

## Shared Services

### Installation

1. Run

```
npm install --save ix-libs
```
2. Add to dependency injection
```
import { IxLocalStorageService, IxSessionStorageService } from 'ix-libs';
```

3. Available service functions
   * `setItem(key: string, value: string)` 
     * Save data to localStorage/sessionStorage
     * `@param key` the key of the stored item
     * `@param value` the value being stored   
   * `getItem(key: string): string`
     * Get saved data from localStorage/sessionStorage
     * `@param key` the key of the stored item
   * `removeItem(key: string): void`
     * `@param key` the key of the stored item
   * `clear(): void`
     * Remove all saved data from localStorage/sessionStorage

### Notes
* `IxLocalStorageService` & `IxSessionStorageService` have polyfils provided by @AlexKimball that will perform a feature detection of browser storage. If browser security prevents usage of localStorage or sessionStorage, a window['ix'] storage object will be used in place. 
* Window instance of storage will not be persisted on IxLocalStorageService, but will allow app to continue to function without throwing errors and stalling entirely. 

       
<!-- #endregion -->

