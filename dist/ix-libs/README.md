
# Ix-Libs
  - [Ix-Icons](#ix-icons)
    - [Installation](#installation)
    - [Available icons](#available-icons)
  - [Ix-Scroll](#ix-scroll)
    - [Installation](#installation-1)
    - [Notes](#notes)

## Ix-Icons

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
  

## Ix-Scroll

### Installation

1. Run

```
npm install --save ix-libs
```
2. Add to Module Imports
```
import { IxIconsModule } from 'ix-libs';
```

3. Add to layout with

```
<ix-scroll-top-button [color]="accent" ></ix-scroll-top-button>
```

### Notes
* Color property
    * `undefined`: default mat-fab-button coloring
    * `primary`: Primary color of Angular Material theme
    * `accent`: Accent color of Angular Material theme
* scrollableElementId property
    * Used to set id of `<body>`
    * Pass in a preset `id` property to prevent it being changed to `id="ix-scroll-container"` by default
* Required styles
    * `<body>` element must have `height: 100%; overflow: auto` to ensure the body element is the scrollable element and not the html.
