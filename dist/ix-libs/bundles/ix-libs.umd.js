(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material/icon'), require('@angular/platform-browser'), require('rxjs'), require('@angular/material/button'), require('@angular/common'), require('@angular/flex-layout'), require('rxjs/operators'), require('@angular/flex-layout/core')) :
    typeof define === 'function' && define.amd ? define('ix-libs', ['exports', '@angular/core', '@angular/material/icon', '@angular/platform-browser', 'rxjs', '@angular/material/button', '@angular/common', '@angular/flex-layout', 'rxjs/operators', '@angular/flex-layout/core'], factory) :
    (global = global || self, factory(global['ix-libs'] = {}, global.ng.core, global.ng.material.icon, global.ng.platformBrowser, global.rxjs, global.ng.material.button, global.ng.common, global.ng.flexLayout, global.rxjs.operators, global.ng.flexLayout.core));
}(this, (function (exports, i0, icon, platformBrowser, rxjs, button, i1, flexLayout, operators, i1$1) { 'use strict';

    var IxIconsModule = /** @class */ (function () {
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
    var LocalStorageService = /** @class */ (function () {
        function LocalStorageService() {
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
        LocalStorageService.prototype.setItem = function (key, value) {
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
        LocalStorageService.prototype.getItem = function (key) {
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
        LocalStorageService.prototype.removeItem = function (key) {
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
        LocalStorageService.prototype.clear = function () {
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
        LocalStorageService.prototype.iCanUseLocalStorageApi = function () {
            return this.storageAvailable('localStorage');
        };
        LocalStorageService.prototype.storageAvailable = function (type) {
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
        return LocalStorageService;
    }());
    LocalStorageService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LocalStorageService_Factory() { return new LocalStorageService(); }, token: LocalStorageService, providedIn: "root" });
    LocalStorageService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    LocalStorageService.ctorParameters = function () { return []; };

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
        // used onInit()
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
    IxDarkService.ɵprov = i0.ɵɵdefineInjectable({ factory: function IxDarkService_Factory() { return new IxDarkService(i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(LocalStorageService)); }, token: IxDarkService, providedIn: "root" });
    IxDarkService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    IxDarkService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] },
        { type: LocalStorageService }
    ]; };

    /*
     * Public API Surface of ix-icons
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.IxDarkService = IxDarkService;
    exports.IxIconsModule = IxIconsModule;
    exports.IxMediaQueryService = IxMediaQueryService;
    exports.IxScrollModule = IxScrollModule;
    exports.ScrollButtonService = ScrollButtonService;
    exports.ScrollTopButtonComponent = ScrollTopButtonComponent;
    exports.ɵa = LocalStorageService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ix-libs.umd.js.map
