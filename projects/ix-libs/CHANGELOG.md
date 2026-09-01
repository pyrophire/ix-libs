# Changelog

All notable changes to this project will be documented in this file.

## 22.1.5 — 2026-09-01

### `ix-docs-viewer` — new features

#### `DocLandingComponent` (`ix-doc-landing`)

New tile-grid landing page component served at the root docs route (`/docs`). Lists every documented application from the manifest as a card. Each card shows a custom image when an `image` field is present in the app's `_meta.json`, or falls back to the Material symbol `icon`. The search overlay (Ctrl/Cmd+K) is built in — no need to add `<ix-doc-search>` separately when this component is used.

```html
<ix-doc-landing [heading]="'My Docs'"></ix-doc-landing>
```

**Inputs:** `heading` (default: `'Documentation'`).

#### Tile images in `_meta.json`

A new optional `image` field is supported in every app-level `_meta.json`. Relative paths are resolved against the configured assets root URL; absolute URLs are used as-is.

```json
{ "name": "My App", "icon": "apps", "image": "my-app/banner.png" }
```

`npm run docs:manifest` reads and forwards the field into `manifest.json`.

#### Search built into `DocViewerComponent`

`DocViewerComponent` now includes `DocSearchComponent` internally. A search icon button appears in the sidebar header — users no longer need to place `<ix-doc-search>` in their own root template. `DocSearchComponent` remains exported for custom layouts.

#### `ng add @pyrophire/ix-libs` schematic

Running `ng add @pyrophire/ix-libs` now fully configures the docs viewer in a target Angular workspace:

- Prompts for `docsBaseRoute`, `assetsRoot`, and `titleSuffix`.
- Scaffolds `src/assets/markdown/` with sample markdown and `_meta.json` files.
- Adds `"docs:manifest": "ix-doc-manifest"` to the consumer app's `package.json`.
- Creates `src/app/docs/docs-shell.component.ts` (the `<router-outlet>` wrapper required by the viewer's routing pattern).
- Injects the complete route block into `app.routes.ts`, including the landing page at the empty path and `DocViewerComponent` on the wildcard.

#### Manifest generator: auto-scaffold `_meta.json`

`npm run docs:manifest` (or `npx ix-doc-manifest`) now creates a stub `_meta.json` with humanized defaults in every directory that does not already have one. This includes the docs root (`name: "General"`) and every application/section subfolder. Re-running is safe — existing files are never overwritten. A summary line reports how many files were created.

### Routing — breaking fix

The previously documented routing pattern (`DocViewerComponent` as both parent and child) does not work: the component has no `<router-outlet>`, so mounting it as a parent blocks the child from rendering. The correct pattern requires a thin shell component as the parent:

```ts
// src/app/docs/docs-shell.component.ts
@Component({ selector: 'app-docs-shell', template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterOutlet] })
export class DocsShellComponent {}

// app.routes.ts
{
  path: 'docs',
  component: DocsShellComponent,
  children: [
    { path: '', loadComponent: () => import('@pyrophire/ix-libs').then(m => m.DocLandingComponent) },
    { path: '**', loadComponent: () => import('@pyrophire/ix-libs').then(m => m.DocViewerComponent) },
  ],
}
```

### Build

- `npm run build` now compiles Angular schematics via `tsc` **after** `ng-packagr` so compiled schematic files are not wiped by ng-packagr's dest clean step.
- `npm run publish` now passes `--access public` (required for scoped packages on the public npm registry).

---

## 21.1.0 — 2025-12-03

Modernized the library for Angular 21 with standalone components/pipes and signals. This release removes all NgModules and switches internal state management away from RxJS subscriptions where appropriate. It also introduces a provider-based API for icon registration.

### Highlights

- Angular 21-first: all components and pipes are standalone.
- No more NgModules in the public API (backwards-compat wrappers were removed).
- Signals-first usage internally; simpler consumption patterns in apps.
- Icon registration via `provideIxIcons()` for standalone bootstrap.

### Breaking changes

- Removed NgModules from the package. The following modules no longer exist and are no longer exported:
	- IxPipesModule
	- IxScrollModule
	- IxScrollProgressModule
	- IxThemeButtonModule
	- IxThemeMenuItemModule
	- IxTableHeaderModule
	- IxTableModule
	- IxIconsModule
- Consumers must import standalone components/pipes directly on the components/routes where used and provide icons via `provideIxIcons()`.
- Minimum peer versions: Angular ^21.0.0 and RxJS ^7.8.0.

### What’s new (public API)

- Components (standalone):
	- `ScrollTopButtonComponent` (ix-scroll)
	- `ScrollBarProgressComponent` (ix-scroll-progress)
	- `IxTableHeaderComponent` (ix-table-header)
	- `IxTableComponent` (ix-table)
	- `ThemeButtonComponent` (ix-theme-button)
	- `ThemeMenuItemComponent` (ix-theme-menu-item)
- Pipes (standalone):
	- `AmPmPipe`, `CamelToTitlePipe`, `FileSizePipe`, `PhonePipe`, `SafePipe`
- Services:
	- `IxDarkService`, `ScrollButtonService`, `IxFormsHelperService`, `IxLocalStorageService`, `IxSessionStorageService`
- Providers:
	- `provideIxIcons()` — registers the library’s SVG icons with Angular Material’s `MatIconRegistry` at bootstrap.
- Models:
	- `ProgressBarConfig`

### Internal changes

- All previously RxJS-driven UI subscriptions inside components were replaced with Angular Signals (`signal`, `computed`, `effect`) where practical.
- Library components use `ChangeDetectionStrategy.OnPush` and are self-contained with their own `imports`, so consumers do not need to import Material modules separately for these components.

---

## Migration guide (Angular 21 standalone)

This guide shows how to update your app from NgModule-based imports to standalone + signals.

### 1) Replace NgModule imports with standalone component/pipe imports

Before (NgModule):

```ts
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IxTableModule, IxTableHeaderModule, IxScrollModule, IxPipesModule } from '@pyrophire/ix-libs';

@NgModule({
	imports: [BrowserModule, IxTableModule, IxTableHeaderModule, IxScrollModule, IxPipesModule],
	bootstrap: [AppComponent]
})
export class AppModule {}
```

After (Standalone):

```ts
// app.config.ts (or main.ts bootstrapApplication config)
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideIxIcons } from '@pyrophire/ix-libs';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter([]),
		provideAnimations(),
		provideIxIcons() // replaces IxIconsModule
	]
};
```

```ts
// any standalone feature component where you use ix-libs items
import { Component } from '@angular/core';
import {
	IxTableComponent,
	IxTableHeaderComponent,
	ScrollTopButtonComponent,
	AmPmPipe,
	SafePipe
} from '@pyrophire/ix-libs';

@Component({
	selector: 'app-feature',
	standalone: true,
	imports: [IxTableComponent, IxTableHeaderComponent, ScrollTopButtonComponent, AmPmPipe, SafePipe],
	template: `
		<ix-table [columns]="cols" [data]="rows"></ix-table>
		<ix-scroll-button />
	`
})
export class FeatureComponent {}
```

Notes:
- You no longer import `IxPipesModule`. Import each pipe you use directly (e.g., `SafePipe`).
- `IxTableComponent` already includes `IxTableHeaderComponent` internally for its own template; import only `IxTableComponent` when using the table itself in your templates.

### 2) Icon registration: use `provideIxIcons()`

Before:

```ts
import { IxIconsModule } from '@pyrophire/ix-libs';

@NgModule({
	imports: [IxIconsModule]
})
export class AppModule {}
```

After:

```ts
import { provideIxIcons } from '@pyrophire/ix-libs';

export const appConfig: ApplicationConfig = {
	providers: [provideIxIcons()]
};
```

Your existing `<mat-icon svgIcon="ix-file-pdf"></mat-icon>` usages continue to work.

### 3) Theme state: prefer signals over subscriptions

We added a theme signal to `IxDarkService` to simplify consuming the current theme in components.

Before (RxJS subscription):

```ts
this.darkService.themeStream.subscribe((t) => this.theme = t);
```

After (signals + effect):

```ts
import { effect } from '@angular/core';

constructor(private darkService: IxDarkService) {
	effect(() => {
		this.theme = this.darkService.theme();
	});
}
```

`themeStream` remains available for backward compatibility, but `theme()` is preferred for Angular 21 apps.

### 4) Minimum versions

- Angular: ^21.0.0
- RxJS: ^7.8.0

Make sure your workspace is updated via `ng update @angular/core @angular/cli @angular/material` and that your tsconfig targets match Angular 21 recommendations.

### 5) Quick checklist

- Remove all `Ix*Module` imports from your application modules.
- Import standalone components/pipes directly where used.
- Add `provideIxIcons()` to your application providers (once).
- Replace subscription-based theme usage with signal-based `theme()` when convenient.
- Rebuild your app; fix missing imports by adding the used standalone artifacts to `imports` of your standalone components or routes.

---

If you hit any migration issues, please open an issue with a minimal reproduction and we’ll help you get sorted.
