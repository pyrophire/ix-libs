[![Publish Package](https://github.com/pyrophire/ix-libs/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/pyrophire/ix-libs/actions/workflows/npm-publish.yml)

# IX Libraries & Services
License: MIT

- [IX Libraries & Services](#ix-libraries--services)
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
  - [Pipes](#pipes)
    - [Installation](#installation-5)
    - [Available Pipes](#available-pipes)
  - [Shared Services](#shared-services)
    - [Installation](#installation-6)
    - [Notes](#notes-4)
  - [Table](#table)
    - [Installation](#installation-7)
    - [Notes](#notes-5)
    - [Models](#models)
      - [IxTableColumn](#ixtablecolumn)
      - [IxTableSort](#ixtablesort)
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
* `@param scrollableElementId: string`
    * Used to set id of `<body>`
    * Pass in a preset `id` property to prevent it being changed to `id="ix-scroll-container"` by default
* `@param scrollHeightTrigger: number`
    * Number of pixels from top that the user has to scroll to show the top button, if page is scrollable
    * Defaulted to 100
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

<!-- #region ix-pipes -->

## Pipes

### Installation

1. Run

```
npm install --save ix-libs
```
2. Add to Module Imports
```
import { IxPipesModule } from 'ix-libs';
```

3. Use as any other pipe

### Available Pipes

1. Am PM Pipe - transforms string time to AM PM equivalent
     - Trigger: `ampm`
     - Input: string as `HH:MM:SS`
     - Output: `4:42:43 PM`
2. Camel to Title - transforms camel case to title case
     - Trigger: `ct2`
     - Input: string as `camelCased`
     - Ouput: string as `Title Cased`
3. File Size - transforms bits and displays human sizes
     - Trigger: `filesize`
     - Input: number as `bits`
     - Output: string as `304 MB`
4. Phone - tramsforms phone to human format
     - Trigger: `phone`
     - Input: string as `5124631155` or `51246311559999`
     - Output: string as `(512) 463-1155 9999`
5. Safe - Sanitizes urls or resources using Angular Sanitizer
     - Trigger: `safe`
     - Input: string as `url`, options as `html`, `style`, `script`, `url`, `sms`, `text`, `mailto`, `email`, `tel`, `resourceUrl`
     - Output: sanitized string as `url` or prefixed with option
        - Example: `user@email.com | safe: 'mailto'` => `mailto:user@email.com`
        - Example: `5124631155 | safe: 'tel'` => `tel:user@email.com`

       
<!-- #endregion -->

<!-- #region ix-dark-service -->

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
     * Remove saved data from localStorage/sessionStorage
     * `@param key` the key of the stored item
   * `clear(): void`
     * Remove all saved data from localStorage/sessionStorage

### Notes
* `IxLocalStorageService` & `IxSessionStorageService` have polyfils provided by @AlexKimball that will perform a feature detection of browser storage. If browser security prevents usage of localStorage or sessionStorage, a window['ix'] storage object will be used in place. 
* Window instance of storage will not be persisted on IxLocalStorageService, but will allow app to continue to function without throwing errors and stalling entirely. 

       
<!-- #endregion -->

<!-- #region ix-table -->
## Table

### Installation

1. Run

```
npm install --save ix-libs
```
2. Add to Module Imports
```
import { IxTableModule } from 'ix-libs';
```

3. Add to layout with

```
<ix-table></ix-table>
```

### Notes

* `@param  {boolean=false;} editButton` - show edit button
* `@param  {boolean=false;} deleteButton` - show delete button
* `@param  {boolean=false;} loading` - show loading ui-placeholder
* `@param  {boolean=false;} uiPlaceholder` - use ui-placeholder for loader, if false a material bar will be used
* `@param  {boolean=false;} showFilter` - show filter input inline
* `@param  {boolean=true;} showCount` - show row count on header
* `@param  {boolean=false;} hasClickEvent` - allows the row to be clicked, firing off itemEmit
* `@param  {boolean=false;} virtual` - use cdk virtual scroll
* `@param  {number=48;} virtualItemSize` - size of virtual item, needed to calculate virtual scroll buffers
* `@param  {any[];} data` - data of rows to display
* `@param  {IxTableColumn[];} columns` - columns to display, will render in order of declaration
* `@param  {IxTableSort;} defaultSort` - default sort object to be set at intialization, useful when array is not pre sorted
* `@param  {} itemEmit=newEventEmitter<any>` - event emitter for item click
* `@param  {} editEmit=newEventEmitter<any>` - event emitter for edit button
* `@param  {} deleteEmit=newEventEmitter<any>` - event emitter for delete button

### Models
#### IxTableColumn
* `@param {string} name` -  column header display text
* `@param {string} property` -  property for data binding
* `@param {string} width` -  can use any valid width unit, required to layout the columns as a row
* `@param {boolean=} truncate` -   truncate the text in the column for the column width
* `@param {boolean=} sortable` -  disable sorting if set to false, default true
* `@param {string=} type` -  type of column to display the formatted value, default string
* `@param {string=} dateFormat` -  format the date value using Angular Date Pipe, default MM/dd/yyyy
#### IxTableSort  
* `@param {string} property` - column data property
* `@param {string} direction` - 'asc' or 'desc'

<!-- #endregion -->
