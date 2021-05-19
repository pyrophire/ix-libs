import { NgModule, Pipe, CUSTOM_ELEMENTS_SCHEMA, ɵɵdefineInjectable, Injectable, Component, NgZone, Input, ɵɵinject, Inject } from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule, DOCUMENT } from '@angular/common';
import * as filesize_ from 'filesize';
import { interval, of, ReplaySubject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MediaObserver as MediaObserver$1 } from '@angular/flex-layout';
import { filter, map } from 'rxjs/operators';
import { MediaObserver } from '@angular/flex-layout/core';

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
IxIconsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                exports: [],
            },] }
];
IxIconsModule.ctorParameters = () => [
    { type: MatIconRegistry },
    { type: DomSanitizer }
];

class AmPmPipe {
    transform(value, ...args) {
        const timeArray = value.split(':');
        const rawHour = parseInt(timeArray[0], 10);
        let hour;
        let minutes;
        let seconds;
        let amPm;
        if (rawHour > 12) {
            hour = rawHour - 12;
            amPm = ' PM';
        }
        else {
            if (rawHour === 0) {
                hour = 12;
            }
            else {
                hour = rawHour;
            }
            amPm = ' AM';
        }
        if (timeArray[1]) {
            minutes = `${timeArray[1]}`;
        }
        if (timeArray[2]) {
            seconds = `${timeArray[2]}`;
        }
        else {
            minutes = '00';
        }
        const displayString = seconds ? `${hour}:${minutes}:${seconds} ${amPm}` : `${hour}:${minutes} ${amPm}`;
        return displayString;
    }
}
AmPmPipe.decorators = [
    { type: Pipe, args: [{
                name: 'ampm'
            },] }
];

class CamelToTitlePipe {
    transform(value, ...args) {
        const result = value.replace(/([A-Z])/g, ' $1');
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return finalResult;
    }
}
CamelToTitlePipe.decorators = [
    { type: Pipe, args: [{
                name: 'c2t'
            },] }
];

class FileSizePipe {
    static transformOne(value, options) {
        const filesize = filesize_;
        return filesize(value, options);
    }
    transform(value, options) {
        if (Array.isArray(value)) {
            return value.map((val) => FileSizePipe.transformOne(val, options));
        }
        return FileSizePipe.transformOne(value, options);
    }
}
FileSizePipe.decorators = [
    { type: Pipe, args: [{
                name: 'filesize',
            },] }
];

class PhonePipe {
    transform(val) {
        const areaCode = val.substring(0, 3);
        const prefix = val.substring(3, 6);
        const suffix = val.substring(6, 10);
        const ext = `ext: ${val.substring(10, 20)}`;
        if (val.substring(11, 16)) {
            return `(${areaCode}) ${prefix}-${suffix} ${ext}`;
        }
        else {
            return `(${areaCode}) ${prefix}-${suffix}`;
        }
    }
}
PhonePipe.decorators = [
    { type: Pipe, args: [{
                name: 'phone'
            },] }
];

class SafePipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value, type) {
        switch (type) {
            case `html`:
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case `style`:
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case `script`:
                return this.sanitizer.bypassSecurityTrustScript(value);
            case `url`:
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case `sms`:
                return this.sanitizer.bypassSecurityTrustUrl(`sms:${value}`);
            case `text`:
                return this.sanitizer.bypassSecurityTrustUrl(`sms:${value}`);
            case `mailto`:
                return this.sanitizer.bypassSecurityTrustUrl(`mailto:${value}`);
            case `email`:
                return this.sanitizer.bypassSecurityTrustUrl(`mailto:${value}`);
            case `tel`:
                return this.sanitizer.bypassSecurityTrustUrl(`tel:${value}`);
            case `resourceUrl`:
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error(`Invalid safe type specified: ${type}`);
        }
    }
}
SafePipe.decorators = [
    { type: Pipe, args: [{
                name: `safe`,
            },] }
];
SafePipe.ctorParameters = () => [
    { type: DomSanitizer }
];

const pipes = [SafePipe, PhonePipe, FileSizePipe, AmPmPipe, CamelToTitlePipe];
class IxPipesModule {
}
IxPipesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [pipes],
                imports: [CommonModule],
                exports: [pipes],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            },] }
];

class ScrollButtonService {
    constructor() {
        this.source = interval(5000);
    }
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
    scrollElementIntoView(id, location) {
        const element = document.getElementById(id);
        element.scrollIntoView({
            behavior: 'smooth',
            block: location || 'start',
            inline: 'nearest',
        });
    }
    startScrollMarking() {
        this.subscription = this.source.subscribe((val) => {
            this._markScrollables();
        });
    }
    stopScrollMarking() {
        this.subscription.unsubscribe();
    }
    _markScrollables() {
        const slice = Array.prototype.slice;
        slice
            .call(document.querySelectorAll('*'))
            .filter((e) => e.scrollWidth > e.offsetWidth || e.scrollHeight > e.offsetHeight)
            .filter((e) => {
            const style = window.getComputedStyle(e);
            return [style.overflow, style.overflowX, style.overflowY].some((e) => e === 'auto' || e === 'scroll');
        })
            .forEach((e) => {
            const color = Math.floor(Math.random() * 16777215).toString(16);
            e.style.backgroundColor = '#' + color;
            this._throttle('scroll', 'optimizedScroll', e);
            e.addEventListener('scroll', (event) => {
                console.log('%c[scroll]', 'color: white; background-color:#' + color, event.target);
            });
        });
    }
    _throttle(type, name, obj) {
        obj = obj || window;
        let running = false;
        const func = () => {
            if (running) {
                return;
            }
            running = true;
            requestAnimationFrame(() => {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    }
}
ScrollButtonService.ɵprov = ɵɵdefineInjectable({ factory: function ScrollButtonService_Factory() { return new ScrollButtonService(); }, token: ScrollButtonService, providedIn: "root" });
ScrollButtonService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ScrollButtonService.ctorParameters = () => [];

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
ScrollTopButtonComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line: component-selector
                selector: 'ix-scroll-button',
                template: "<button mat-mini-fab class=\"scroll-top\" (click)=\"scrollToTop()\"\n  [ngClass]=\"{'hidden': !isScrollable, 'mat-primary': color === 'primary', 'mat-accent': color === 'accent'}\">\n  <mat-icon>arrow_upward</mat-icon>\n</button>\n",
                styles: ["body,html{height:100%;padding:0;margin:0;width:100vw;overflow-x:hidden}button.scroll-top{position:fixed;bottom:8px;right:16px;transition:all .25s ease-in-out;transform:scale(1)}button.scroll-top.hidden{transform:scale(0)}"]
            },] }
];
ScrollTopButtonComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ScrollButtonService }
];
ScrollTopButtonComponent.propDecorators = {
    color: [{ type: Input }],
    scrollableElementId: [{ type: Input }],
    isScrollable: [{ type: Input }]
};

class IxScrollModule {
}
IxScrollModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ScrollTopButtonComponent],
                imports: [MatButtonModule, MatIconModule, CommonModule],
                exports: [ScrollTopButtonComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            },] }
];

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
IxMediaQueryService.ɵprov = ɵɵdefineInjectable({ factory: function IxMediaQueryService_Factory() { return new IxMediaQueryService(ɵɵinject(MediaObserver)); }, token: IxMediaQueryService, providedIn: "root" });
IxMediaQueryService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
IxMediaQueryService.ctorParameters = () => [
    { type: MediaObserver$1 }
];

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
IxLocalStorageService.ɵprov = ɵɵdefineInjectable({ factory: function IxLocalStorageService_Factory() { return new IxLocalStorageService(); }, token: IxLocalStorageService, providedIn: "root" });
IxLocalStorageService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
IxLocalStorageService.ctorParameters = () => [];

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
IxDarkService.ɵprov = ɵɵdefineInjectable({ factory: function IxDarkService_Factory() { return new IxDarkService(ɵɵinject(DOCUMENT), ɵɵinject(IxLocalStorageService)); }, token: IxDarkService, providedIn: "root" });
IxDarkService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
IxDarkService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: IxLocalStorageService }
];

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
IxSessionStorageService.ɵprov = ɵɵdefineInjectable({ factory: function IxSessionStorageService_Factory() { return new IxSessionStorageService(); }, token: IxSessionStorageService, providedIn: "root" });
IxSessionStorageService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
IxSessionStorageService.ctorParameters = () => [];

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
ThemeButtonComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line: component-selector
                selector: 'ix-theme-button',
                template: "<button mat-icon-button id=\"dark-mode-button\" (click)=\"toggleDarkMode()\">\n  <mat-icon [ngClass]=\"{'dark-button': theme === 'dark', 'light-button': theme === 'light'}\">\n    brightness_6\n  </mat-icon>\n</button>\n",
                styles: ["#dark-mode-button mat-icon.light-button{transform:rotate(0deg);transition:transform 225ms cubic-bezier(.4,0,.2,1)}#dark-mode-button mat-icon.dark-button{transform:rotate(180deg);transition:transform 225ms cubic-bezier(.4,0,.2,1)}"]
            },] }
];
ThemeButtonComponent.ctorParameters = () => [
    { type: NgZone },
    { type: IxDarkService }
];

class IxThemeButtonModule {
}
IxThemeButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ThemeButtonComponent],
                imports: [MatButtonModule, MatIconModule, CommonModule],
                exports: [ThemeButtonComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            },] }
];

/*
 * Public API Surface of ix-libs
 */

/**
 * Generated bundle index. Do not edit.
 */

export { IxDarkService, IxIconsModule, IxLocalStorageService, IxMediaQueryService, IxPipesModule, IxScrollModule, IxSessionStorageService, IxThemeButtonModule, ScrollButtonService, ScrollTopButtonComponent, ThemeButtonComponent, SafePipe as ɵa, PhonePipe as ɵb, FileSizePipe as ɵc, AmPmPipe as ɵd, CamelToTitlePipe as ɵe };
//# sourceMappingURL=ix-libs.js.map
