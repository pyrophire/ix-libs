(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material/icon'), require('@angular/platform-browser'), require('rxjs'), require('@angular/material/button'), require('@angular/common'), require('@angular/flex-layout'), require('rxjs/operators'), require('@angular/flex-layout/core')) :
    typeof define === 'function' && define.amd ? define('ix-libs', ['exports', '@angular/core', '@angular/material/icon', '@angular/platform-browser', 'rxjs', '@angular/material/button', '@angular/common', '@angular/flex-layout', 'rxjs/operators', '@angular/flex-layout/core'], factory) :
    (global = global || self, factory(global['ix-libs'] = {}, global.ng.core, global.ng.material.icon, global.ng.platformBrowser, global.rxjs, global.ng.material.button, global.ng.common, global.ng.flexLayout, global.rxjs.operators, global.ng.flexLayout.core));
}(this, (function (exports, i0, icon, platformBrowser, rxjs, button, i1, flexLayout, operators, i1$1) { 'use strict';

    var IxIconsModule = /** @class */ (function () {
        // To use: <mat-icon svgIcon="ix-file-pdf"></mat-icon>
        function IxIconsModule(iconRegistry, sanitizer) {
            iconRegistry.addSvgIcon('ix-file-pdf', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_pdf.svg'));
            iconRegistry.addSvgIcon('ix-file-doc', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_doc.svg'));
            iconRegistry.addSvgIcon('ix-file-excel', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_excel.svg'));
            iconRegistry.addSvgIcon('ix-file-html', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_html.svg'));
            iconRegistry.addSvgIcon('ix-export', sanitizer.bypassSecurityTrustResourceUrl('ix-img/export.svg'));
            iconRegistry.addSvgIcon('ix-dialog', sanitizer.bypassSecurityTrustResourceUrl('ix-img/dialog.svg'));
        }
        return IxIconsModule;
    }());
    IxIconsModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [],
                    exports: [],
                },] }
    ];
    IxIconsModule.ctorParameters = function () { return [
        { type: icon.MatIconRegistry },
        { type: platformBrowser.DomSanitizer }
    ]; };

    var ScrollButtonService = /** @class */ (function () {
        function ScrollButtonService() {
        }
        ScrollButtonService.prototype.setContainerId = function (id) {
            if (id) {
                var bodyEl = document.getElementById(id);
                bodyEl.setAttribute('id', id);
            }
            else {
                var bodyEl = document.getElementsByTagName('BODY')[0];
                bodyEl.setAttribute('id', 'ix-scroll-container');
            }
        };
        ScrollButtonService.prototype.checkScroll = function (id) {
            if (id) {
                var container = document.getElementById(id);
                return rxjs.of(container.scrollHeight > container.clientHeight);
            }
            else {
                var container = document.getElementById('ix-scroll-container');
                return rxjs.of(container.scrollHeight > container.clientHeight);
            }
        };
        ScrollButtonService.prototype.scrollToTop = function (id) {
            if (id) {
                var container = document.getElementById(id);
                container.scroll({ top: 0, behavior: 'smooth' });
            }
            else {
                var container = document.getElementById('ix-scroll-container');
                container.scroll({ top: 0, behavior: 'smooth' });
            }
        };
        return ScrollButtonService;
    }());
    ScrollButtonService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ScrollButtonService_Factory() { return new ScrollButtonService(); }, token: ScrollButtonService, providedIn: "root" });
    ScrollButtonService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ScrollButtonService.ctorParameters = function () { return []; };

    var ScrollTopButtonComponent = /** @class */ (function () {
        function ScrollTopButtonComponent(ngZone, scrollButtonService) {
            var _this = this;
            this.ngZone = ngZone;
            this.scrollButtonService = scrollButtonService;
            this.isScrollable = false;
            window.onresize = function (e) {
                _this.ngZone.run(function () {
                    _this.localCheckScroll();
                });
            };
        }
        ScrollTopButtonComponent.prototype.localCheckScroll = function () {
            var _this = this;
            if (this.scrollableElementId) {
                this.scrollButtonService
                    .checkScroll(this.scrollableElementId)
                    .subscribe(function (res) {
                    _this.isScrollable = res;
                });
            }
            else {
                this.scrollButtonService.checkScroll().subscribe(function (res) {
                    _this.isScrollable = res;
                });
            }
        };
        ScrollTopButtonComponent.prototype.scrollToTop = function () {
            if (this.scrollableElementId) {
                this.scrollButtonService.scrollToTop(this.scrollableElementId);
            }
            else {
                this.scrollButtonService.scrollToTop();
            }
        };
        ScrollTopButtonComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.scrollButtonService.setContainerId(this.scrollableElementId);
            setTimeout(function () {
                _this.localCheckScroll();
            }, 500);
        };
        return ScrollTopButtonComponent;
    }());
    ScrollTopButtonComponent.decorators = [
        { type: i0.Component, args: [{
                    // tslint:disable-next-line: component-selector
                    selector: 'ix-scroll-button',
                    template: "<button mat-mini-fab class=\"scroll-top\" (click)=\"scrollToTop()\"\n  [ngClass]=\"{'hidden': !isScrollable, 'mat-primary': color === 'primary', 'mat-accent': color === 'accent'}\">\n  <mat-icon>arrow_upward</mat-icon>\n</button>\n",
                    styles: ["body,html{height:100%;margin:0;overflow-x:hidden;padding:0;width:100vw}button.scroll-top{bottom:8px;position:fixed;right:16px;transform:scale(1);transition:all .25s ease-in-out}button.scroll-top.hidden{transform:scale(0)}"]
                },] }
    ];
    ScrollTopButtonComponent.ctorParameters = function () { return [
        { type: i0.NgZone },
        { type: ScrollButtonService }
    ]; };
    ScrollTopButtonComponent.propDecorators = {
        color: [{ type: i0.Input }],
        scrollableElementId: [{ type: i0.Input }],
        isScrollable: [{ type: i0.Input }]
    };

    var IxScrollModule = /** @class */ (function () {
        function IxScrollModule() {
        }
        return IxScrollModule;
    }());
    IxScrollModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [ScrollTopButtonComponent],
                    imports: [button.MatButtonModule, icon.MatIconModule, i1.CommonModule],
                    exports: [ScrollTopButtonComponent],
                    schemas: [i0.CUSTOM_ELEMENTS_SCHEMA],
                },] }
    ];

    var IxMediaQueryService = /** @class */ (function () {
        function IxMediaQueryService(media) {
            var _this = this;
            this.media = media;
            this.media
                .asObservable()
                .pipe(operators.filter(function (changes) { return changes.length > 0; }), operators.map(function (changes) {
                _this.medias = changes;
                return changes[0];
            }))
                .subscribe(function (change) {
                _this.mq = change.mqAlias;
                _this.mediaQuery = change.mediaQuery;
                _this.suffix = change.suffix;
            });
        }
        IxMediaQueryService.prototype._mediaChecker = function (mediaArray, mqString) {
            var exists;
            mediaArray.forEach(function (med) {
                if (med.mqAlias === mqString) {
                    exists = true;
                }
            });
            return exists;
        };
        // used to check if viewport has a media query size
        IxMediaQueryService.prototype.has = function (mqString) {
            var _this = this;
            if (this.medias) {
                return this._mediaChecker(this.medias, mqString);
            }
            else {
                this.media.asObservable().pipe(operators.filter(function (changes) { return changes.length > 0; }), operators.map(function (changes) {
                    _this._mediaChecker(changes, mqString);
                }));
            }
        };
        return IxMediaQueryService;
    }());
    IxMediaQueryService.ɵprov = i0.ɵɵdefineInjectable({ factory: function IxMediaQueryService_Factory() { return new IxMediaQueryService(i0.ɵɵinject(i1$1.MediaObserver)); }, token: IxMediaQueryService, providedIn: "root" });
    IxMediaQueryService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    IxMediaQueryService.ctorParameters = function () { return [
        { type: flexLayout.MediaObserver }
    ]; };

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
    var IxLocalStorageService = /** @class */ (function () {
        function IxLocalStorageService() {
            this.localStorageFeatureAvailable = this.storageAvailable('localStorage');
            if (!this.localStorageFeatureAvailable) {
                console.warn('Window.localStorage is NOT available. Falling back to object storage.');
                window["ix"] = {};
            }
        }
        /**
         * Save data to localStorage
         * @param key the key of the stored item
         * @param value the value being stored
         */
        IxLocalStorageService.prototype.setItem = function (key, value) {
            // pass through
            if (this.localStorageFeatureAvailable) {
                window.localStorage.setItem(key, value);
                return;
            }
            // fallback
            if (!this.localStorageFeatureAvailable) {
                window["ix"][key] = value;
            }
        };
        /**
         * Get saved data from localStorage
         * @param key the key of the stored item
         */
        IxLocalStorageService.prototype.getItem = function (key) {
            // pass through
            if (this.localStorageFeatureAvailable) {
                return window.localStorage.getItem(key);
            }
            // fallback
            if (!this.localStorageFeatureAvailable) {
                return window["ix"][key];
            }
        };
        /**
         * Remove saved data from localStorage
         * @param key the key of the stored item
         */
        IxLocalStorageService.prototype.removeItem = function (key) {
            // pass through
            if (this.localStorageFeatureAvailable) {
                window.localStorage.removeItem(key);
                return;
            }
            // fallback
            if (!this.localStorageFeatureAvailable) {
                window["ix"][key] = null;
            }
        };
        /**
         * Remove all saved data from localStorage
         */
        IxLocalStorageService.prototype.clear = function () {
            // pass through
            if (this.localStorageFeatureAvailable) {
                window.localStorage.clear();
                return;
            }
            // fallback
            if (!this.localStorageFeatureAvailable) {
                window["ix"] = {};
            }
        };
        IxLocalStorageService.prototype.iCanUseLocalStorageApi = function () {
            return this.storageAvailable('localStorage');
        };
        IxLocalStorageService.prototype.storageAvailable = function (type) {
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
        };
        return IxLocalStorageService;
    }());
    IxLocalStorageService.ɵprov = i0.ɵɵdefineInjectable({ factory: function IxLocalStorageService_Factory() { return new IxLocalStorageService(); }, token: IxLocalStorageService, providedIn: "root" });
    IxLocalStorageService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    IxLocalStorageService.ctorParameters = function () { return []; };

    var IxDarkService = /** @class */ (function () {
        function IxDarkService(document, sorageService) {
            this.document = document;
            this.themeStream = new rxjs.ReplaySubject();
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
        IxDarkService.prototype.setDarkModePreference = function () {
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
        };
        // used to toggle light/dark themes
        IxDarkService.prototype.toggleDarkLightMode = function () {
            if (this.localStorageLightDark === 'light') {
                this._toggleBodyClasses('dark');
                this.themeStream.next('dark');
            }
            else {
                this._toggleBodyClasses('light');
                this.themeStream.next('light');
            }
        };
        IxDarkService.prototype._toggleBodyClasses = function (colorToSet) {
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
        };
        return IxDarkService;
    }());
    IxDarkService.ɵprov = i0.ɵɵdefineInjectable({ factory: function IxDarkService_Factory() { return new IxDarkService(i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(IxLocalStorageService)); }, token: IxDarkService, providedIn: "root" });
    IxDarkService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    IxDarkService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] },
        { type: IxLocalStorageService }
    ]; };

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
    var IxSessionStorageService = /** @class */ (function () {
        function IxSessionStorageService() {
            this.sessionStorageFeatureAvailable = this.storageAvailable('sessionStorage');
            if (!this.sessionStorageFeatureAvailable) {
                console.warn('Window.sessionStorage is NOT available. Falling back to object storage.');
                window["ix"] = {};
            }
        }
        /**
         * Save data to sessionStorage
         * @param key the key of the stored item
         * @param value the value being stored
         */
        IxSessionStorageService.prototype.setItem = function (key, value) {
            // pass through
            if (this.sessionStorageFeatureAvailable) {
                window.sessionStorage.setItem(key, value);
                return;
            }
            // fallback
            if (!this.sessionStorageFeatureAvailable) {
                window["ix"][key] = value;
            }
        };
        /**
         * Get saved data from sessionStorage
         * @param key the key of the stored item
         */
        IxSessionStorageService.prototype.getItem = function (key) {
            // pass through
            if (this.sessionStorageFeatureAvailable) {
                return window.sessionStorage.getItem(key);
            }
            // fallback
            if (!this.sessionStorageFeatureAvailable) {
                return window["ix"][key];
            }
        };
        /**
         * Remove saved data from sessionStorage
         * @param key the key of the stored item
         */
        IxSessionStorageService.prototype.removeItem = function (key) {
            // pass through
            if (this.sessionStorageFeatureAvailable) {
                window.sessionStorage.removeItem(key);
                return;
            }
            // fallback
            if (!this.sessionStorageFeatureAvailable) {
                window["ix"][key] = null;
            }
        };
        /**
         * Remove all saved data from sessionStorage
         */
        IxSessionStorageService.prototype.clear = function () {
            // pass through
            if (this.sessionStorageFeatureAvailable) {
                window.sessionStorage.clear();
                return;
            }
            // fallback
            if (!this.sessionStorageFeatureAvailable) {
                window["ix"] = {};
            }
        };
        IxSessionStorageService.prototype.iCanUseSessionStorageApi = function () {
            return this.storageAvailable('sessionStorage');
        };
        IxSessionStorageService.prototype.storageAvailable = function (type) {
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
        };
        return IxSessionStorageService;
    }());
    IxSessionStorageService.ɵprov = i0.ɵɵdefineInjectable({ factory: function IxSessionStorageService_Factory() { return new IxSessionStorageService(); }, token: IxSessionStorageService, providedIn: "root" });
    IxSessionStorageService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    IxSessionStorageService.ctorParameters = function () { return []; };

    var ThemeButtonComponent = /** @class */ (function () {
        function ThemeButtonComponent(ngZone, darkService) {
            this.ngZone = ngZone;
            this.darkService = darkService;
        }
        // will switch themes using the IxDark service
        ThemeButtonComponent.prototype.toggleDarkMode = function () {
            this.darkService.toggleDarkLightMode();
        };
        // will subscribe to themes to animate icon
        ThemeButtonComponent.prototype._subToTheme = function () {
            var _this = this;
            this.darkService.themeStream.subscribe(function (ev) {
                _this.theme = ev;
            });
        };
        // will setup themes with IxDark service
        ThemeButtonComponent.prototype.ngOnInit = function () {
            this._subToTheme();
            this.darkService.setDarkModePreference();
        };
        return ThemeButtonComponent;
    }());
    ThemeButtonComponent.decorators = [
        { type: i0.Component, args: [{
                    // tslint:disable-next-line: component-selector
                    selector: 'ix-theme-button',
                    template: "<button mat-icon-button id=\"dark-mode-button\" (click)=\"toggleDarkMode()\">\n  <mat-icon [ngClass]=\"{'dark-button': theme === 'dark', 'light-button': theme === 'light'}\">\n    brightness_6\n  </mat-icon>\n</button>\n",
                    styles: ["#dark-mode-button mat-icon.light-button{transform:rotate(0deg);transition:transform 225ms cubic-bezier(.4,0,.2,1)}#dark-mode-button mat-icon.dark-button{transform:rotate(180deg);transition:transform 225ms cubic-bezier(.4,0,.2,1)}"]
                },] }
    ];
    ThemeButtonComponent.ctorParameters = function () { return [
        { type: i0.NgZone },
        { type: IxDarkService }
    ]; };

    var IxThemeButtonModule = /** @class */ (function () {
        function IxThemeButtonModule() {
        }
        return IxThemeButtonModule;
    }());
    IxThemeButtonModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [ThemeButtonComponent],
                    imports: [button.MatButtonModule, icon.MatIconModule, i1.CommonModule],
                    exports: [ThemeButtonComponent],
                    schemas: [i0.CUSTOM_ELEMENTS_SCHEMA],
                },] }
    ];

    /*
     * Public API Surface of ix-libs
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.IxDarkService = IxDarkService;
    exports.IxIconsModule = IxIconsModule;
    exports.IxLocalStorageService = IxLocalStorageService;
    exports.IxMediaQueryService = IxMediaQueryService;
    exports.IxScrollModule = IxScrollModule;
    exports.IxSessionStorageService = IxSessionStorageService;
    exports.IxThemeButtonModule = IxThemeButtonModule;
    exports.ScrollButtonService = ScrollButtonService;
    exports.ScrollTopButtonComponent = ScrollTopButtonComponent;
    exports.ThemeButtonComponent = ThemeButtonComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ix-libs.umd.js.map
