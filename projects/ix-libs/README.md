# @pyrophire/ix-libs

[![Publish Package](https://github.com/pyrophire/ix-libs/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/pyrophire/ix-libs/actions/workflows/npm-publish.yml)

Angular 21+ standalone components, services, and pipes used across IX applications.

This README is generated from the current source implementation in `projects/ix-libs/src/lib` and documents every exported feature **except** `ix-table` and `ix-table-header` (intentionally excluded).

---

## Contents

- [Requirements](#requirements)
- [Install](#install)
- [Quick Start](#quick-start)
- [Quick Reference](#quick-reference)
- [Public API (Documented Here)](#public-api-documented-here)
- [Icons (`provideIxIcons`)](#icons-provideixicons)
- [Theming](#theming)
  - [`IxDarkService`](#ixdarkservice)
  - [`ThemeButtonComponent` (`ix-theme-button`)](#themebuttoncomponent-ix-theme-button)
  - [`ThemeMenuItemComponent` (`ix-theme-menu-item`)](#thememenuitemcomponent-ix-theme-menu-item)
- [Scroll Features](#scroll-features)
  - [`ScrollTopButtonComponent` (`ix-scroll-button`)](#scrolltopbuttoncomponent-ix-scroll-button)
  - [`ScrollButtonService`](#scrollbuttonservice)
  - [`ScrollBarProgressComponent` (`ix-scroll-progress`)](#scrollbarprogresscomponent-ix-scroll-progress)
  - [`ProgressBarConfig`](#progressbarconfig)
- [Pipes](#pipes)
  - [`AmPmPipe` (`ampm`)](#ampmpipe-ampm)
  - [`CamelToTitlePipe` (`c2t`)](#cameltotitlepipe-c2t)
  - [`FileSizePipe` (`filesize`)](#filesizepipe-filesize)
  - [`PhonePipe` (`phone`)](#phonepipe-phone)
  - [`SafePipe` (`safe`)](#safepipe-safe)
- [Shared Utilities](#shared-utilities)
  - [`IxFormsHelperService`](#ixformshelperservice)
  - [`IxLocalStorageService`](#ixlocalstorageservice)
  - [`IxSessionStorageService`](#ixsessionstorageservice)
- [Notes and Caveats](#notes-and-caveats)

---

## Requirements

`@pyrophire/ix-libs@21.1.0` peer dependencies:

- `@angular/*` `^21.0.0`
- `@angular/material` `^21.0.0`
- `rxjs` `^7.8.0`
- `tslib` `^2.3.1`

---

## Install

```bash
npm install @pyrophire/ix-libs
```

If you use `provideIxIcons()`, copy icon assets from the package into your app build output:

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

---

## Quick Start

```ts
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideIxIcons } from '@pyrophire/ix-libs';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), provideIxIcons()]
});
```

```ts
// any standalone component
import { Component } from '@angular/core';
import {
  ScrollTopButtonComponent,
  ThemeButtonComponent,
  ScrollBarProgressComponent,
  AmPmPipe
} from '@pyrophire/ix-libs';

@Component({
  standalone: true,
  selector: 'app-demo',
  imports: [ScrollTopButtonComponent, ThemeButtonComponent, ScrollBarProgressComponent, AmPmPipe],
  template: `
    <ix-theme-button></ix-theme-button>
    <ix-scroll-progress [config]="progressConfig"></ix-scroll-progress>
    <ix-scroll-button color="primary"></ix-scroll-button>
    <div>{{ '13:45:00' | ampm }}</div>
  `
})
export class DemoComponent {
  progressConfig = { position: 'fixed', top: 0, left: 0, right: 0, barColor: '#1976d2', backgroundColor: '#e0e0e0' };
}
```

---

## Quick Reference

### 1) Install + Bootstrap

```bash
npm install @pyrophire/ix-libs
```

```ts
import { provideIxIcons } from '@pyrophire/ix-libs';

bootstrapApplication(AppComponent, {
  providers: [provideIxIcons()]
});
```

### 2) Import what you use

```ts
import {
  ThemeButtonComponent,
  ThemeMenuItemComponent,
  ScrollTopButtonComponent,
  ScrollBarProgressComponent,
  IxDarkService,
  IxLocalStorageService,
  AmPmPipe,
  CamelToTitlePipe,
  FileSizePipe,
  PhonePipe,
  SafePipe
} from '@pyrophire/ix-libs';
```

### 3) Use in template

```html
<ix-theme-button></ix-theme-button>
<ix-scroll-progress [config]="{ position: 'fixed', top: 0, left: 0, right: 0 }"></ix-scroll-progress>
<ix-scroll-button color="primary"></ix-scroll-button>

<div>{{ '14:30:00' | ampm }}</div>
<div>{{ 'firstName' | c2t }}</div>
<div>{{ 1048576 | filesize }}</div>
```

### 4) Feature map

- Theme switching: `IxDarkService`, `ix-theme-button`, `ix-theme-menu-item`
- Scroll helpers: `ix-scroll-button`, `ix-scroll-progress`, `ScrollButtonService`
- Data transforms: `ampm`, `c2t`, `filesize`, `phone`, `safe`
- Storage/forms utilities: `IxLocalStorageService`, `IxSessionStorageService`, `IxFormsHelperService`
- Material SVG icons: `provideIxIcons()` + `svgIcon="ix-*"`

---

## Public API (Documented Here)

From `src/public_api.ts`, excluding intentionally ignored exports:

- `provideIxIcons`
- `IxDarkService`
- `AmPmPipe`
- `CamelToTitlePipe`
- `FileSizePipe`
- `PhonePipe`
- `SafePipe`
- `ProgressBarConfig`
- `ScrollBarProgressComponent`
- `ScrollTopButtonComponent`
- `ScrollButtonService`
- `ThemeButtonComponent`
- `ThemeMenuItemComponent`
- `IxFormsHelperService`
- `IxLocalStorageService`
- `IxSessionStorageService`

Excluded in this README by request:

- `IxTableComponent`
- `IxTableHeaderComponent`

---

## Icons (`provideIxIcons`)

Provider that registers SVG icons with Angular Material `MatIconRegistry` at app bootstrap.

### Setup

1. Copy `ix-img` assets into your app output (see [Install](#install)).
2. Add `provideIxIcons()` to app providers.
3. Use icons via `svgIcon` on `<mat-icon>`.

### Registered icon names

- `ix-file-pdf`
- `ix-file-doc`
- `ix-file-excel`
- `ix-file-html`
- `ix-file-csv`
- `ix-save-csv`
- `ix-export`
- `ix-dialog`

### Example

```html
<mat-icon svgIcon="ix-file-pdf" aria-label="PDF"></mat-icon>
<mat-icon svgIcon="ix-export" aria-label="Export"></mat-icon>
```

---

## Theming

The theming utilities are class-based and expect `light` / `dark` classes to exist in your global theme styles.

### `IxDarkService`

Service for dark/light mode preference, body class toggling, and persistence.

#### IxDarkService injection

```ts
import { IxDarkService } from '@pyrophire/ix-libs';

constructor(private darkService: IxDarkService) {}
```

#### IxDarkService public members

- `prefersDark: boolean` — result of `matchMedia('(prefers-color-scheme: dark)')`
- `localStorageLightDark: string` — persisted preference from storage key `DarkModePref`
- `themeStream: ReplaySubject<string>` — emits `'light'` / `'dark'`

#### IxDarkService public methods

- `setDarkModePreference(): void`
  - Applies stored preference if present, otherwise system preference.
  - Updates body classes and emits theme.
- `toggleDarkLightMode(): void`
  - Switches between light and dark.
  - Persists to storage and updates body classes.
- `theme(): string`
  - Returns current theme from internal signal (`'light'` or `'dark'`).

#### IxDarkService example

```ts
this.darkService.setDarkModePreference();
this.darkService.themeStream.subscribe((theme) => {
  console.log('Theme changed:', theme);
});

this.darkService.toggleDarkLightMode();
```

---

### `ThemeButtonComponent` (`ix-theme-button`)

Standalone Material icon button that toggles dark mode via `IxDarkService`.

#### ThemeButton import

```ts
import { ThemeButtonComponent } from '@pyrophire/ix-libs';
```

#### ThemeButton template usage

```html
<ix-theme-button></ix-theme-button>
```

#### ThemeButton behavior

- Calls `setDarkModePreference()` during component initialization.
- Click triggers `toggleDarkMode()` which delegates to `IxDarkService.toggleDarkLightMode()`.
- Icon classes reflect current theme.

---

### `ThemeMenuItemComponent` (`ix-theme-menu-item`)

Material menu item variant of the theme toggle control.

#### ThemeMenuItem import

```ts
import { ThemeMenuItemComponent } from '@pyrophire/ix-libs';
```

#### ThemeMenuItem template usage

```html
<mat-menu #menu="matMenu">
  <ix-theme-menu-item></ix-theme-menu-item>
</mat-menu>
```

#### ThemeMenuItem behavior

- Same theme interaction pattern as `ThemeButtonComponent`.
- Intended for placement inside a Material menu.

---

## Scroll Features

### `ScrollTopButtonComponent` (`ix-scroll-button`)

Floating action button that appears after scrolling past a threshold and scrolls a target container back to top.

#### ScrollTopButton import

```ts
import { ScrollTopButtonComponent } from '@pyrophire/ix-libs';
```

#### ScrollTopButton inputs

- `color` (`'primary' | 'accent' | undefined`, default: `undefined`) — adds Material color class on the button.
- `scrollableElementId` (`string`, default: `'ix-scroll-container'`) — target element ID watched for scroll.
- `isScrollableInput` (`boolean`, default: `false`) — forces button logic to treat container as scrollable.
- `scrollHeightTrigger` (`number`, default: `100`) — pixels scrolled before showing button.
- `verticalButtonPosition` (`'top' | 'bottom'`, default: `'bottom'`) — vertical position class.
- `horizontalButtonPosition` (`'left' | 'right'`, default: `'right'`) — horizontal position class.

#### ScrollTopButton template usage

```html
<ix-scroll-button
  color="primary"
  scrollableElementId="page-content"
  [scrollHeightTrigger]="200"
  verticalButtonPosition="bottom"
  horizontalButtonPosition="right">
</ix-scroll-button>
```

#### ScrollTopButton requirements

- Target element must exist in the DOM with the given ID.
- Target element should be an actual scroll container (`overflow: auto|scroll`) with constrained height if not body-level scrolling.

---

### `ScrollButtonService`

Service used by `ScrollTopButtonComponent`, also available for direct use.

#### ScrollButtonService injection

```ts
import { ScrollButtonService } from '@pyrophire/ix-libs';

constructor(private scrollButtonService: ScrollButtonService) {}
```

#### ScrollButtonService public methods

- `setContainerId(id?: string): void`
  - Sets internal container ID; defaults to body ID `ix-scroll-container`.
- `isScrollable(id?: string): boolean`
  - Returns whether `scrollHeight > clientHeight`.
- `checkScroll(id?: string): Observable<boolean>`
  - Observable wrapper for scrollability check.
- `scrollToTop(id?: string): void`
  - Smooth-scrolls container to top.
- `scrollElementIntoView(id: string, location: 'start' | 'end'): void`
  - Calls `element.scrollIntoView({ behavior: 'smooth', block: location })`.
- `startScrollMarking(): void`
  - Debug helper that periodically marks scrollable elements.
- `stopScrollMarking(): void`
  - Stops debug marking subscription.

#### ScrollButtonService example

```ts
this.scrollButtonService.scrollToTop('page-content');
this.scrollButtonService.scrollElementIntoView('footer', 'start');
```

---

### `ScrollBarProgressComponent` (`ix-scroll-progress`)

Top/bottom/side progress bar that tracks document scroll percentage.

#### ScrollBarProgress import

```ts
import { ScrollBarProgressComponent } from '@pyrophire/ix-libs';
```

#### ScrollBarProgress input

- `config` (`ProgressBarConfig`) — colors and position values for the progress container and bar.

#### ScrollBarProgress template usage

```html
<ix-scroll-progress [config]="progressConfig"></ix-scroll-progress>
```

#### ScrollBarProgress example config

```ts
import { ProgressBarConfig } from '@pyrophire/ix-libs';

progressConfig: ProgressBarConfig = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: '#bdbdbd',
  barColor: '#3f51b5'
};
```

#### ScrollBarProgress public methods

- `bottomReached(): boolean` — true when computed progress is greater than 99.
- `progressBarProcess(): number` — computes percent and updates internal bar width.

---

### `ProgressBarConfig`

Model for `ix-scroll-progress`:

```ts
export class ProgressBarConfig {
  backgroundColor: string;
  barColor: string;
  position: 'sticky' | 'fixed' | 'absolute' | 'relative';
  top?: number | string;
  left?: number | string;
  bottom?: number | string;
  right?: number | string;
}
```

---

## Pipes

All pipes are standalone and can be imported directly into standalone components.

```ts
import {
  AmPmPipe,
  CamelToTitlePipe,
  FileSizePipe,
  PhonePipe,
  SafePipe
} from '@pyrophire/ix-libs';
```

### `AmPmPipe` (`ampm`)

Converts a time-like string (`HH:mm` or `HH:mm:ss`) into 12-hour format with AM/PM.

```html
{{ '00:10:00' | ampm }}   <!-- 12:10:00  AM -->
{{ '13:45' | ampm }}      <!-- 1:45  PM -->
```

---

### `CamelToTitlePipe` (`c2t`)

Converts camelCase/PascalCase-ish text into spaced title text.

```html
{{ 'firstName' | c2t }}      <!-- First Name -->
{{ 'HTMLParser2' | c2t }}    <!-- H T M L Parser 2 -->
```

---

### `FileSizePipe` (`filesize`)

Formats bytes into human-readable units. Accepts a number or number array.

```html
{{ 2048 | filesize }}              <!-- 2 KB -->
{{ [512, 1048576] | filesize }}    <!-- ['512 Bytes', '1 MB'] -->
```

---

### `PhonePipe` (`phone`)

Formats a digit string into US phone format `(xxx) xxx-xxxx` and appends extension text when extra digits are present.

```html
{{ '5551234567' | phone }}         <!-- (555) 123-4567 -->
{{ '5551234567123' | phone }}      <!-- (555) 123-4567 ext: 123 -->
```

---

### `SafePipe` (`safe`)

Bypasses Angular sanitization using `DomSanitizer` for explicit trust cases.

Supported types:

- `html`
- `style`
- `script`
- `url`
- `sms` / `text` (prepends `sms:`)
- `mailto` / `email` (prepends `mailto:`)
- `tel` (prepends `tel:`)
- `resourceUrl`

```html
<div [innerHTML]="htmlSnippet | safe:'html'"></div>
<a [href]="'support@example.com' | safe:'mailto'">Email support</a>
<iframe [src]="videoUrl | safe:'resourceUrl'"></iframe>
```

> Security note: only pass trusted content. This pipe explicitly bypasses Angular's built-in protections.

---

## Shared Utilities

### `IxFormsHelperService`

Helper methods for Angular forms.

#### IxFormsHelperService injection

```ts
import { IxFormsHelperService } from '@pyrophire/ix-libs';

constructor(private formsHelper: IxFormsHelperService) {}
```

#### IxFormsHelperService public methods

- `getDirtyValues(form): any`
  - Recursively returns only fields marked dirty.
- `hasValidationError(control: UntypedFormControl, errorCode: string): boolean`
  - True when control has error and has been touched.
- `requiredLabel(label: string, control: any): string`
  - Adds `*` suffix if control appears to include required validator.

#### IxFormsHelperService example

```ts
const patchPayload = this.formsHelper.getDirtyValues(this.form);
const showRequired = this.formsHelper.hasValidationError(this.form.controls['name'], 'required');
const label = this.formsHelper.requiredLabel('First Name', this.form.controls['firstName']);
```

---

### `IxLocalStorageService`

Wrapper around `window.localStorage` with in-memory fallback at `window.ix`.

#### IxLocalStorageService public properties

- `localStorageFeatureAvailable: boolean`

#### IxLocalStorageService public methods

- `setItem(key: string, value: string | object | any[]): void`
- `getItem(key: string): any` (JSON parsed if possible)
- `removeItem(key: string): void`
- `clear(): void`

#### IxLocalStorageService example

```ts
this.localStorageService.setItem('filters', { status: 'open' });
const filters = this.localStorageService.getItem('filters');
this.localStorageService.removeItem('filters');
```

---

### `IxSessionStorageService`

Wrapper around `window.sessionStorage` with in-memory fallback at `window.ix`.

#### IxSessionStorageService public properties

- `sessionStorageFeatureAvailable: boolean`

#### IxSessionStorageService public methods

- `setItem(key: string, value: string | object | any[]): void`
- `getItem(key: string): any` (JSON parsed if possible)
- `removeItem(key: string): void`
- `clear(): void`

#### IxSessionStorageService example

```ts
this.sessionStorageService.setItem('draft', this.form.value);
const draft = this.sessionStorageService.getItem('draft');
```

---

## Notes and Caveats

- `ix-tlc-auth` folders currently exist in source tree but are empty and are not exported in `public_api.ts`.
- `IxDarkService` requires your app theme to react to `body.light` / `body.dark` classes.
- `ScrollButtonService` methods assume target elements exist; pass valid IDs.
- `ScrollBarProgressComponent` uses an internal element ID (`progressBar`), so multiple instances on one page can conflict.
- `SafePipe` intentionally bypasses sanitization; use only with trusted data.

---

## License

MIT
