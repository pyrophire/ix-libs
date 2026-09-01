import { InjectionToken } from '@angular/core';

/** Base URL where `manifest.json` and all markdown files are served from. Defaults to `assets/markdown`. */
export const DOCS_ASSETS_ROOT = new InjectionToken<string>('DOCS_ASSETS_ROOT', {
    providedIn: 'root',
    factory: () => 'assets/markdown'
});

/** Router base path for doc pages, e.g. `/docs`. Used when navigating between documents. */
export const DOCS_BASE_ROUTE = new InjectionToken<string>('DOCS_BASE_ROUTE', {
    providedIn: 'root',
    factory: () => '/docs'
});

/** Suffix appended to the browser title on each doc page, e.g. `My App Docs`. */
export const DOCS_TITLE_SUFFIX = new InjectionToken<string>('DOCS_TITLE_SUFFIX', {
    providedIn: 'root',
    factory: () => 'Documentation'
});

/** Id of the scrollable container element managed by `@pyrophire/ix-libs`. */
export const DOCS_SCROLL_CONTAINER_ID = new InjectionToken<string>('DOCS_SCROLL_CONTAINER_ID', {
    providedIn: 'root',
    factory: () => 'ix-scroll-container'
});
