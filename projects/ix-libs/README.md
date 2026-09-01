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
- [Documentation Viewer (`ix-docs-viewer`)](#documentation-viewer-ix-docs-viewer)
  - [Docs Viewer Overview](#docs-viewer-overview)
  - [Markdown File Structure](#markdown-file-structure)
  - [Generating the Manifest](#generating-the-manifest)
  - [Configuration Tokens](#configuration-tokens)
  - [Routing Setup](#routing-setup)
  - [Components](#components)
  - [Services](#services)
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

`@pyrophire/ix-libs@22.1.x` peer dependencies:

- `@angular/*` `^22.0.0`
- `@angular/material` `^22.0.0`
- `rxjs` `^7.8.0`
- `tslib` `^2.3.1`
- `marked` `^18.0.10` *(required when using `ix-docs-viewer`)*

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
- `DocViewerComponent`
- `DocSearchComponent`
- `DocsService`
- `MarkdownService`
- `SearchService`
- `DOCS_ASSETS_ROOT`
- `DOCS_BASE_ROUTE`
- `DOCS_TITLE_SUFFIX`
- `DOCS_SCROLL_CONTAINER_ID`
- `DocsManifest`, `DocApplication`, `DocSection`, `DocEntry`, `IndexedDoc`, `SearchResult`, `TocItem`

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

## Documentation Viewer (`ix-docs-viewer`)

### Docs Viewer Overview

A full-featured markdown documentation viewer for Angular applications. It loads markdown files from a generated manifest, renders them with syntax highlighting and accessible markup, and provides full-text search, table-of-contents scroll-spy, and multi-application sidebar navigation.

> **Peer dependency required** — `ix-docs-viewer` uses [`marked`](https://marked.js.org/) for markdown rendering. Install it alongside the library:
>
> ```bash
> npm install marked@^18.0.10
> ```
>
> `marked` is declared as a required peer dependency (`peerDependenciesMeta.optional: false`), so npm will warn if it is missing. Do not add it to your application's `dependencies` unless you need to pin a specific version — let npm resolve the compatible range automatically.

**Exported from the public API:**

- DocLandingComponent — tile-grid overview of all documented applications
- DocViewerComponent — main three-column viewer (sidebar, article, TOC)
- DocSearchComponent — keyboard-driven search overlay (Ctrl/Cmd+K)
- DocsService — manifest loading and markdown fetching
- MarkdownService — markdown-to-HTML rendering and TOC generation
- SearchService — full-text search indexing and ranking
- Configuration tokens — DOCS_ASSETS_ROOT, DOCS_BASE_ROUTE, DOCS_TITLE_SUFFIX, DOCS_SCROLL_CONTAINER_ID
- All model interfaces from docs.model.ts

---

### Markdown File Structure

Place markdown files under a root directory (default: `src/assets/markdown`). The folder layout determines the viewer sidebar structure.

```
src/assets/markdown/
├── manifest.json                ← generated by the CLI tool
├── index.md                     ← root-level docs grouped as "General"
├── readme.md
│
├── my-app/                      ← becomes a DocApplication
│   ├── _meta.json               ← optional metadata
│   ├── index.md                 ← home doc (auto-detected)
│   ├── getting-started.md
│   │
│   └── guides/                  ← becomes a DocSection
│       ├── _meta.json
│       ├── setup.md
│       └── deployment.md
│
└── another-app/
    ├── overview.md
    └── api/
        └── endpoints.md
```

**Conventions:**

- Each top-level subfolder becomes one documented application in the sidebar.
- Markdown files directly in the root are grouped under a "General" application.
- Nested subfolders become sidebar sections (titles joined with " / " for deeper nesting).
- Document titles are taken from the first `# heading` in the file. If no heading exists, the filename is humanized (e.g. `my-guide.md` → "My Guide").
- The application landing doc is the first of `index.md`, `readme.md`, or `overview.md` found. If none exist, the first document alphabetically is used.

**Optional _meta.json:**

Place a `_meta.json` file in any folder to customise its presentation:

```json
{
  "name": "Custom App Name",
  "description": "Brief description shown in the sidebar and landing-page tile",
  "icon": "material_symbol_name",
  "image": "my-app/banner.png",
  "order": 1,
  "rootSectionTitle": "Getting Started"
}
```

| Field            | Purpose                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| name             | Display name (overrides humanized folder name)                                                   |
| description      | Brief description                                                                                |
| icon             | Material Symbol icon name shown in the sidebar and as the tile fallback                          |
| image            | Tile image for the landing page — relative path from the docs root or an absolute URL            |
| order            | Sort order (lower values appear first)                                                           |
| rootSectionTitle | Title for the root-level section of docs in that folder                                          |

Running `npm run docs:manifest` creates stub `_meta.json` files (without `image`) in any directory that doesn't already have one, so you can fill in the fields at your own pace.

---

### Generating the Manifest

The viewer requires a `manifest.json` at the docs root. Generate it with the included CLI tool, which scans the folder structure and builds the manifest automatically.

**Run directly:**

```bash
npx ix-doc-manifest                         # uses default: src/assets/markdown
npx ix-doc-manifest path/to/docs            # custom path
```

**Or invoke the script explicitly:**

```bash
node node_modules/@pyrophire/ix-libs/src/lib/ix-docs-viewer/tools/generate-docs-manifest.cjs [docs-root]
```

**Recommended package.json scripts** to keep the manifest in sync:

```json
{
  "scripts": {
    "docs:manifest": "ix-doc-manifest",
    "prestart": "npm run docs:manifest",
    "prebuild": "npm run docs:manifest"
  }
}
```

The tool outputs `manifest.json` at the docs root with a timestamp and the full application/section/document tree. The manifest does not need to be committed to source control — regenerate it during build.

---

### Configuration Tokens

Override defaults by providing values in your application bootstrap:

```ts
import {
  DOCS_ASSETS_ROOT,
  DOCS_BASE_ROUTE,
  DOCS_TITLE_SUFFIX,
  DOCS_SCROLL_CONTAINER_ID
} from '@pyrophire/ix-libs';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: DOCS_ASSETS_ROOT, useValue: 'assets/docs' },
    { provide: DOCS_BASE_ROUTE, useValue: '/documentation' },
    { provide: DOCS_TITLE_SUFFIX, useValue: 'My App Docs' },
    { provide: DOCS_SCROLL_CONTAINER_ID, useValue: 'main-scroll' }
  ]
});
```

| Token                    | Default               | Purpose                                       |
| ------------------------ | --------------------- | --------------------------------------------- |
| DOCS_ASSETS_ROOT         | `assets/markdown`     | Base URL for manifest.json and markdown files |
| DOCS_BASE_ROUTE          | `/docs`               | Router base path for doc pages                |
| DOCS_TITLE_SUFFIX        | `Documentation`       | Suffix appended to the browser title          |
| DOCS_SCROLL_CONTAINER_ID | `ix-scroll-container` | ID of the scrollable container element        |

---

### Routing Setup

`DocViewerComponent` reads its own route URL segments directly (`segments[0]` = app ID, `segments[1+]` = document path). Because it has no `<router-outlet>`, it cannot act as a parent route that activates a child — doing so blocks the child from rendering. The correct setup uses a thin shell component as the parent and mounts `DocViewerComponent` only on the wildcard leaf.

#### 1. Create a route shell component

Add this file anywhere in your `src/app/` tree (e.g. `src/app/docs/docs-shell.component.ts`):

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-docs-shell',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet]
})
export class DocsShellComponent {}
```

#### 2. Configure routes

```ts
import { DocsShellComponent } from './docs/docs-shell.component';

const routes: Routes = [
  {
    path: 'docs',
    component: DocsShellComponent,          // provides the router outlet
    children: [
      {
        path: '',                            // /docs → tile-grid landing page
        loadComponent: () =>
          import('@pyrophire/ix-libs').then(m => m.DocLandingComponent),
      },
      {
        path: '**',                         // /docs/<appId>/... → viewer
        loadComponent: () =>
          import('@pyrophire/ix-libs').then(m => m.DocViewerComponent),
      },
    ],
  },
];
```

URLs follow the pattern `/<baseRoute>/<appId>/<doc/path/without/extension>`.

> **Why a shell component?** `DocViewerComponent` has no `<router-outlet>`, so it cannot act as a parent route — mounting it as both parent and child blocks the child from rendering. `DocsShellComponent` is a one-line wrapper that just provides the outlet.

---

### Components

#### DocLandingComponent (`ix-doc-landing`)

Tile-grid overview page that lists every documented application from the manifest. Intended as the root `/docs` route so users can orient themselves before diving into a specific application.

```html
<ix-doc-landing></ix-doc-landing>
```

**Inputs:**

- heading (default: `'Documentation'`) — h1 text at the top of the page

**Features:**

- Reads the manifest automatically via `DocsService` — no additional wiring needed
- Each tile shows a custom image (`image` field in `_meta.json`) or falls back to the Material symbol `icon`
- Search overlay (Ctrl/Cmd+K) is built-in — no need to add `<ix-doc-search>` separately when this component is used
- Responsive grid that collapses to a single column on narrow viewports

**Tile image** — add an `image` key to any app's `_meta.json`:

```json
{
  "name": "My App",
  "icon": "apps",
  "image": "my-app/banner.png"
}
```

Relative paths are resolved against the configured assets root URL; absolute URLs (`https://…`) are used as-is.

---

#### DocViewerComponent (`ix-doc-viewer`)

Three-column layout: left sidebar with organized doc list, center article with rendered markdown, and right TOC panel with active section highlighting.

```html
<router-outlet></router-outlet>
```

**Inputs:**

- homeRoute (default: `/home`) — fallback route when a document is not found

**Features:**

- IntersectionObserver-based scroll-spy that highlights the active TOC heading
- Relative `.md` links in markdown are intercepted and converted to Angular router navigation
- URL fragments scroll to the corresponding heading
- Responsive layout — sidebar and TOC hide below 1280px
- Search overlay (Ctrl/Cmd+K) is built-in via the search icon in the sidebar header — no need to add `<ix-doc-search>` separately

#### DocSearchComponent (`ix-doc-search`)

Full-text search overlay activated by Ctrl/Cmd+K or programmatically via `SearchService.open()`.

```html
<ix-doc-search></ix-doc-search>
```

`DocLandingComponent` and `DocViewerComponent` already include this internally. Only add it manually if you are building a custom layout that uses neither of those components. Results are debounced (200ms), ranked by title match and match count, and navigable with arrow keys and Enter.

---

### Services

#### DocsService

Loads and caches the manifest, fetches raw markdown files, and resolves relative paths.

```ts
import { DocsService } from '@pyrophire/ix-libs';
```

| Method                                 | Purpose                                   |
| -------------------------------------- | ----------------------------------------- |
| getManifest()                          | Returns cached Observable of DocsManifest |
| getApplication(appId)                  | Returns a single DocApplication by id     |
| getMarkdown(app, docPath)              | Fetches raw markdown content via HTTP     |
| findEntry(app, docPath)                | Finds a DocEntry by normalized path       |
| resolveRelativePath(current, relative) | Resolves relative markdown links          |

#### MarkdownService

Renders markdown to HTML, rewrites image paths relative to the assets root, and builds the table of contents from rendered headings.

```ts
import { MarkdownService } from '@pyrophire/ix-libs';
```

| Method                                        | Purpose                                       |
| --------------------------------------------- | --------------------------------------------- |
| render(markdown, appDir, docPath, assetsRoot) | Renders markdown to HTML with post-processing |
| buildToc(container)                           | Extracts h1–h4 headings and returns TocItem[] |

#### SearchService

Lazily indexes all markdown content and provides ranked full-text search (max 12 results).

```ts
import { SearchService } from '@pyrophire/ix-libs';
```

| Method           | Purpose                                                            |
| ---------------- | ------------------------------------------------------------------ |
| search(query)    | Returns ranked SearchResult[] with excerpts and match highlighting |
| open() / close() | Toggles the search overlay visibility                              |

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
