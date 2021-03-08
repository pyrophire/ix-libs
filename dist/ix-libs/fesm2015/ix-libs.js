import { ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵinject, ɵsetClassMetadata, NgModule, ɵɵdefineInjectable, Injectable, ɵɵdirectiveInject, NgZone, ɵɵdefineComponent, ɵɵelementStart, ɵɵlistener, ɵɵtext, ɵɵelementEnd, ɵɵproperty, ɵɵpureFunction3, Component, Input, ɵɵsetNgModuleScope, CUSTOM_ELEMENTS_SCHEMA, Inject, ɵɵadvance, ɵɵpureFunction2 } from '@angular/core';
import { MatIconRegistry, MatIcon, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { of, ReplaySubject } from 'rxjs';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { NgClass, CommonModule, DOCUMENT } from '@angular/common';
import { MediaObserver } from '@angular/flex-layout';
import { filter, map } from 'rxjs/operators';

class IxIconsModule {
    // To use: <mat-icon svgIcon="ix-file-pdf"></mat-icon>
    constructor(iconRegistry, sanitizer) {
        iconRegistry.addSvgIcon('ix-file-pdf', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_pdf.svg'));
        iconRegistry.addSvgIcon('ix-file-doc', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_doc.svg'));
        iconRegistry.addSvgIcon('ix-file-excel', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_excel.svg'));
        iconRegistry.addSvgIcon('ix-file-html', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_html.svg'));
        iconRegistry.addSvgIcon('ix-export', sanitizer.bypassSecurityTrustResourceUrl('ix-img/export.svg'));
        iconRegistry.addSvgIcon('ix-dialog', sanitizer.bypassSecurityTrustResourceUrl('ix-img/dialog.svg'));
    }
}
/** @nocollapse */ IxIconsModule.ɵmod = ɵɵdefineNgModule({ type: IxIconsModule });
/** @nocollapse */ IxIconsModule.ɵinj = ɵɵdefineInjector({ factory: function IxIconsModule_Factory(t) { return new (t || IxIconsModule)(ɵɵinject(MatIconRegistry), ɵɵinject(DomSanitizer)); } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(IxIconsModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                exports: [],
            }]
    }], function () { return [{ type: MatIconRegistry }, { type: DomSanitizer }]; }, null); })();

class ScrollButtonService {
    constructor() { }
    setContainerId(id) {
        if (id) {
            const bodyEl = document.getElementById(id);
            bodyEl.setAttribute('id', id);
        }
        else {
            const bodyEl = document.getElementsByTagName('BODY')[0];
            bodyEl.setAttribute('id', 'ix-scroll-container');
        }
    }
    checkScroll(id) {
        if (id) {
            const container = document.getElementById(id);
            return of(container.scrollHeight > container.clientHeight);
        }
        else {
            const container = document.getElementById('ix-scroll-container');
            return of(container.scrollHeight > container.clientHeight);
        }
    }
    scrollToTop(id) {
        if (id) {
            const container = document.getElementById(id);
            container.scroll({ top: 0, behavior: 'smooth' });
        }
        else {
            const container = document.getElementById('ix-scroll-container');
            container.scroll({ top: 0, behavior: 'smooth' });
        }
    }
}
/** @nocollapse */ ScrollButtonService.ɵfac = function ScrollButtonService_Factory(t) { return new (t || ScrollButtonService)(); };
/** @nocollapse */ ScrollButtonService.ɵprov = ɵɵdefineInjectable({ token: ScrollButtonService, factory: ScrollButtonService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ScrollButtonService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();

const _c0 = function (a0, a1, a2) { return { "hidden": a0, "mat-primary": a1, "mat-accent": a2 }; };
class ScrollTopButtonComponent {
    constructor(ngZone, scrollButtonService) {
        this.ngZone = ngZone;
        this.scrollButtonService = scrollButtonService;
        this.isScrollable = false;
        window.onresize = (e) => {
            this.ngZone.run(() => {
                this.localCheckScroll();
            });
        };
    }
    localCheckScroll() {
        if (this.scrollableElementId) {
            this.scrollButtonService
                .checkScroll(this.scrollableElementId)
                .subscribe((res) => {
                this.isScrollable = res;
            });
        }
        else {
            this.scrollButtonService.checkScroll().subscribe((res) => {
                this.isScrollable = res;
            });
        }
    }
    scrollToTop() {
        if (this.scrollableElementId) {
            this.scrollButtonService.scrollToTop(this.scrollableElementId);
        }
        else {
            this.scrollButtonService.scrollToTop();
        }
    }
    ngOnInit() {
        this.scrollButtonService.setContainerId(this.scrollableElementId);
        setTimeout(() => {
            this.localCheckScroll();
        }, 500);
    }
}
/** @nocollapse */ ScrollTopButtonComponent.ɵfac = function ScrollTopButtonComponent_Factory(t) { return new (t || ScrollTopButtonComponent)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ScrollButtonService)); };
/** @nocollapse */ ScrollTopButtonComponent.ɵcmp = ɵɵdefineComponent({ type: ScrollTopButtonComponent, selectors: [["ix-scroll-button"]], inputs: { color: "color", scrollableElementId: "scrollableElementId", isScrollable: "isScrollable" }, decls: 3, vars: 5, consts: [["mat-mini-fab", "", 1, "scroll-top", 3, "ngClass", "click"]], template: function ScrollTopButtonComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "button", 0);
        ɵɵlistener("click", function ScrollTopButtonComponent_Template_button_click_0_listener() { return ctx.scrollToTop(); });
        ɵɵelementStart(1, "mat-icon");
        ɵɵtext(2, "arrow_upward");
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("ngClass", ɵɵpureFunction3(1, _c0, !ctx.isScrollable, ctx.color === "primary", ctx.color === "accent"));
    } }, directives: [MatButton, NgClass, MatIcon], styles: ["body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{height:100%;margin:0;overflow-x:hidden;padding:0;width:100vw}button.scroll-top[_ngcontent-%COMP%]{bottom:8px;position:fixed;right:16px;transform:scale(1);transition:all .25s ease-in-out}button.scroll-top.hidden[_ngcontent-%COMP%]{transform:scale(0)}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ScrollTopButtonComponent, [{
        type: Component,
        args: [{
                // tslint:disable-next-line: component-selector
                selector: 'ix-scroll-button',
                templateUrl: './ix-scroll.component.html',
                styleUrls: ['./ix-scroll.component.scss'],
            }]
    }], function () { return [{ type: NgZone }, { type: ScrollButtonService }]; }, { color: [{
            type: Input
        }], scrollableElementId: [{
            type: Input
        }], isScrollable: [{
            type: Input
        }] }); })();

class IxScrollModule {
}
/** @nocollapse */ IxScrollModule.ɵmod = ɵɵdefineNgModule({ type: IxScrollModule });
/** @nocollapse */ IxScrollModule.ɵinj = ɵɵdefineInjector({ factory: function IxScrollModule_Factory(t) { return new (t || IxScrollModule)(); }, imports: [[MatButtonModule, MatIconModule, CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(IxScrollModule, { declarations: [ScrollTopButtonComponent], imports: [MatButtonModule, MatIconModule, CommonModule], exports: [ScrollTopButtonComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(IxScrollModule, [{
        type: NgModule,
        args: [{
                declarations: [ScrollTopButtonComponent],
                imports: [MatButtonModule, MatIconModule, CommonModule],
                exports: [ScrollTopButtonComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            }]
    }], null, null); })();

class IxMediaQueryService {
    constructor(media) {
        this.media = media;
        this.media
            .asObservable()
            .pipe(filter((changes) => changes.length > 0), map((changes) => {
            this.medias = changes;
            return changes[0];
        }))
            .subscribe((change) => {
            this.mq = change.mqAlias;
            this.mediaQuery = change.mediaQuery;
            this.suffix = change.suffix;
        });
    }
    _mediaChecker(mediaArray, mqString) {
        let exists;
        mediaArray.forEach((med) => {
            if (med.mqAlias === mqString) {
                exists = true;
            }
        });
        return exists;
    }
    // used to check if viewport has a media query size
    has(mqString) {
        if (this.medias) {
            return this._mediaChecker(this.medias, mqString);
        }
        else {
            this.media.asObservable().pipe(filter((changes) => changes.length > 0), map((changes) => {
                this._mediaChecker(changes, mqString);
            }));
        }
    }
}
/** @nocollapse */ IxMediaQueryService.ɵfac = function IxMediaQueryService_Factory(t) { return new (t || IxMediaQueryService)(ɵɵinject(MediaObserver)); };
/** @nocollapse */ IxMediaQueryService.ɵprov = ɵɵdefineInjectable({ token: IxMediaQueryService, factory: IxMediaQueryService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(IxMediaQueryService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: MediaObserver }]; }, null); })();

/**
 * This is a shim for the Window.localStorage api.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 *
 * This service performs feature detection of Window.localStorage. If
 * Window.localStorage is available then the functions are passed through.
 * If Window.localStorage is not available then items are stored on
 * an object on Window named Window.{storageKey}. And all methods act on that
 * object. The {storageKey} variable is stored in environments.storageKey.
 *
 * This service only supports Window.localStorage as Window.localStorage
 * is controlled by the browser and cannot be truely shimed beyond the sesssion.
 */
class IxLocalStorageService {
    constructor() {
        this.localStorageFeatureAvailable = this.storageAvailable('localStorage');
        if (!this.localStorageFeatureAvailable) {
            console.warn('Window.localStorage is NOT available. Falling back to object storage.');
            window[`ix`] = {};
        }
    }
    /**
     * Save data to localStorage
     * @param key the key of the stored item
     * @param value the value being stored
     */
    setItem(key, value) {
        // pass through
        if (this.localStorageFeatureAvailable) {
            window.localStorage.setItem(key, value);
            return;
        }
        // fallback
        if (!this.localStorageFeatureAvailable) {
            window[`ix`][key] = value;
        }
    }
    /**
     * Get saved data from localStorage
     * @param key the key of the stored item
     */
    getItem(key) {
        // pass through
        if (this.localStorageFeatureAvailable) {
            return window.localStorage.getItem(key);
        }
        // fallback
        if (!this.localStorageFeatureAvailable) {
            return window[`ix`][key];
        }
    }
    /**
     * Remove saved data from localStorage
     * @param key the key of the stored item
     */
    removeItem(key) {
        // pass through
        if (this.localStorageFeatureAvailable) {
            window.localStorage.removeItem(key);
            return;
        }
        // fallback
        if (!this.localStorageFeatureAvailable) {
            window[`ix`][key] = null;
        }
    }
    /**
     * Remove all saved data from localStorage
     */
    clear() {
        // pass through
        if (this.localStorageFeatureAvailable) {
            window.localStorage.clear();
            return;
        }
        // fallback
        if (!this.localStorageFeatureAvailable) {
            window[`ix`] = {};
        }
    }
    iCanUseLocalStorageApi() {
        return this.storageAvailable('localStorage');
    }
    storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
/** @nocollapse */ IxLocalStorageService.ɵfac = function IxLocalStorageService_Factory(t) { return new (t || IxLocalStorageService)(); };
/** @nocollapse */ IxLocalStorageService.ɵprov = ɵɵdefineInjectable({ token: IxLocalStorageService, factory: IxLocalStorageService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(IxLocalStorageService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();

class IxDarkService {
    constructor(document, sorageService) {
        this.document = document;
        this.themeStream = new ReplaySubject();
        this.prefersDark =
            window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.sorageService = sorageService;
        this.localStorageLightDark = sorageService.getItem('DarkModePref');
    }
    // ******************************************************************************
    // This service requires Angular Material's theming to have two themes
    // with .light and .dark wrapping classes.
    // It is possible to use this service outside of Angular Material, but
    // native framework element coloring will not be affected without
    // custom css overwrites.
    // ******************************************************************************
    // used onInit() to evaluate users system preferences
    // if they have a preset preferences in localstorage or window.storage
    // it will apply that theme, if not it will check system settings
    // if they have dark mode enabled, it will apply the dark mode to the app
    setDarkModePreference() {
        if (this.localStorageLightDark) {
            this.document.body.classList.add(this.localStorageLightDark);
            this._toggleBodyClasses(this.localStorageLightDark);
            if (this.localStorageLightDark === 'dark') {
                this._toggleBodyClasses('dark');
                this.themeStream.next('dark');
            }
            else {
                this._toggleBodyClasses('light');
                this.themeStream.next('light');
            }
        }
        else if (this.prefersDark) {
            this._toggleBodyClasses('dark');
            this.themeStream.next('dark');
        }
        else {
            this._toggleBodyClasses('light');
            this.themeStream.next('light');
        }
    }
    // used to toggle light/dark themes
    toggleDarkLightMode() {
        if (this.localStorageLightDark === 'light') {
            this._toggleBodyClasses('dark');
            this.themeStream.next('dark');
        }
        else {
            this._toggleBodyClasses('light');
            this.themeStream.next('light');
        }
    }
    _toggleBodyClasses(colorToSet) {
        this.sorageService.setItem('DarkModePref', colorToSet);
        this.localStorageLightDark = this.sorageService.getItem('DarkModePref');
        if (colorToSet.toLowerCase() === 'dark') {
            this.document.body.classList.remove('light');
            this.document.body.classList.add(colorToSet);
        }
        else if (colorToSet.toLowerCase() === 'light') {
            this.document.body.classList.remove('dark');
            this.document.body.classList.add(colorToSet);
        }
    }
}
/** @nocollapse */ IxDarkService.ɵfac = function IxDarkService_Factory(t) { return new (t || IxDarkService)(ɵɵinject(DOCUMENT), ɵɵinject(IxLocalStorageService)); };
/** @nocollapse */ IxDarkService.ɵprov = ɵɵdefineInjectable({ token: IxDarkService, factory: IxDarkService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(IxDarkService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: IxLocalStorageService }]; }, null); })();

/**
 * This is a shim for the Window.sessionStorage api.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 *
 * This service performs feature detection of Window.sessionStorage. If
 * Window.sessionStorage is available then the functions are passed through.
 * If Window.sessionStorage is not available then items are stored on
 * an object on Window named Window.{storageKey}. And all methods act on that
 * object. The {storageKey} variable is stored in environments.storageKey.
 *
 * This service only supports Window.sessionStorage as Window.sessionStorage
 * is controlled by the browser and cannot be truely shimed beyond the sesssion.
 */
class IxSessionStorageService {
    constructor() {
        this.sessionStorageFeatureAvailable = this.storageAvailable('sessionStorage');
        if (!this.sessionStorageFeatureAvailable) {
            console.warn('Window.sessionStorage is NOT available. Falling back to object storage.');
            window[`ix`] = {};
        }
    }
    /**
     * Save data to sessionStorage
     * @param key the key of the stored item
     * @param value the value being stored
     */
    setItem(key, value) {
        // pass through
        if (this.sessionStorageFeatureAvailable) {
            window.sessionStorage.setItem(key, value);
            return;
        }
        // fallback
        if (!this.sessionStorageFeatureAvailable) {
            window[`ix`][key] = value;
        }
    }
    /**
     * Get saved data from sessionStorage
     * @param key the key of the stored item
     */
    getItem(key) {
        // pass through
        if (this.sessionStorageFeatureAvailable) {
            return window.sessionStorage.getItem(key);
        }
        // fallback
        if (!this.sessionStorageFeatureAvailable) {
            return window[`ix`][key];
        }
    }
    /**
     * Remove saved data from sessionStorage
     * @param key the key of the stored item
     */
    removeItem(key) {
        // pass through
        if (this.sessionStorageFeatureAvailable) {
            window.sessionStorage.removeItem(key);
            return;
        }
        // fallback
        if (!this.sessionStorageFeatureAvailable) {
            window[`ix`][key] = null;
        }
    }
    /**
     * Remove all saved data from sessionStorage
     */
    clear() {
        // pass through
        if (this.sessionStorageFeatureAvailable) {
            window.sessionStorage.clear();
            return;
        }
        // fallback
        if (!this.sessionStorageFeatureAvailable) {
            window[`ix`] = {};
        }
    }
    iCanUseSessionStorageApi() {
        return this.storageAvailable('sessionStorage');
    }
    storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
/** @nocollapse */ IxSessionStorageService.ɵfac = function IxSessionStorageService_Factory(t) { return new (t || IxSessionStorageService)(); };
/** @nocollapse */ IxSessionStorageService.ɵprov = ɵɵdefineInjectable({ token: IxSessionStorageService, factory: IxSessionStorageService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(IxSessionStorageService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();

const _c0$1 = function (a0, a1) { return { "dark-button": a0, "light-button": a1 }; };
class ThemeButtonComponent {
    constructor(ngZone, darkService) {
        this.ngZone = ngZone;
        this.darkService = darkService;
    }
    // will switch themes using the IxDark service
    toggleDarkMode() {
        this.darkService.toggleDarkLightMode();
    }
    // will subscribe to themes to animate icon
    _subToTheme() {
        this.darkService.themeStream.subscribe((ev) => {
            this.theme = ev;
        });
    }
    // will setup themes with IxDark service
    ngOnInit() {
        this._subToTheme();
        this.darkService.setDarkModePreference();
    }
}
/** @nocollapse */ ThemeButtonComponent.ɵfac = function ThemeButtonComponent_Factory(t) { return new (t || ThemeButtonComponent)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(IxDarkService)); };
/** @nocollapse */ ThemeButtonComponent.ɵcmp = ɵɵdefineComponent({ type: ThemeButtonComponent, selectors: [["ix-theme-button"]], decls: 3, vars: 4, consts: [["mat-icon-button", "", "id", "dark-mode-button", 3, "click"], [3, "ngClass"]], template: function ThemeButtonComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "button", 0);
        ɵɵlistener("click", function ThemeButtonComponent_Template_button_click_0_listener() { return ctx.toggleDarkMode(); });
        ɵɵelementStart(1, "mat-icon", 1);
        ɵɵtext(2, " brightness_6 ");
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngClass", ɵɵpureFunction2(1, _c0$1, ctx.theme === "dark", ctx.theme === "light"));
    } }, directives: [MatButton, MatIcon, NgClass], styles: ["#dark-mode-button[_ngcontent-%COMP%]   mat-icon.light-button[_ngcontent-%COMP%]{transform:rotate(0deg);transition:transform 225ms cubic-bezier(.4,0,.2,1)}#dark-mode-button[_ngcontent-%COMP%]   mat-icon.dark-button[_ngcontent-%COMP%]{transform:rotate(180deg);transition:transform 225ms cubic-bezier(.4,0,.2,1)}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ThemeButtonComponent, [{
        type: Component,
        args: [{
                // tslint:disable-next-line: component-selector
                selector: 'ix-theme-button',
                templateUrl: './ix-theme-button.component.html',
                styleUrls: ['./ix-theme-button.component.scss'],
            }]
    }], function () { return [{ type: NgZone }, { type: IxDarkService }]; }, null); })();

class IxThemeButtonModule {
}
/** @nocollapse */ IxThemeButtonModule.ɵmod = ɵɵdefineNgModule({ type: IxThemeButtonModule });
/** @nocollapse */ IxThemeButtonModule.ɵinj = ɵɵdefineInjector({ factory: function IxThemeButtonModule_Factory(t) { return new (t || IxThemeButtonModule)(); }, imports: [[MatButtonModule, MatIconModule, CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(IxThemeButtonModule, { declarations: [ThemeButtonComponent], imports: [MatButtonModule, MatIconModule, CommonModule], exports: [ThemeButtonComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(IxThemeButtonModule, [{
        type: NgModule,
        args: [{
                declarations: [ThemeButtonComponent],
                imports: [MatButtonModule, MatIconModule, CommonModule],
                exports: [ThemeButtonComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            }]
    }], null, null); })();

/*
 * Public API Surface of ix-libs
 */

/**
 * Generated bundle index. Do not edit.
 */

export { IxDarkService, IxIconsModule, IxLocalStorageService, IxMediaQueryService, IxScrollModule, IxSessionStorageService, IxThemeButtonModule, ScrollButtonService, ScrollTopButtonComponent, ThemeButtonComponent };
//# sourceMappingURL=ix-libs.js.map
