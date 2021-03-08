(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material/icon'), require('@angular/platform-browser'), require('rxjs'), require('@angular/material/button'), require('@angular/common'), require('rxjs/operators'), require('@angular/flex-layout')) :
    typeof define === 'function' && define.amd ? define('ix-libs', ['exports', '@angular/core', '@angular/material/icon', '@angular/platform-browser', 'rxjs', '@angular/material/button', '@angular/common', 'rxjs/operators', '@angular/flex-layout'], factory) :
    (global = global || self, factory(global['ix-libs'] = {}, global.ng.core, global.ng.material.icon, global.ng.platformBrowser, global.rxjs, global.ng.material.button, global.ng.common, global.rxjs.operators, global.ng.flexLayout));
}(this, (function (exports, i0, i1, i2, rxjs, i2$1, i3, operators, i1$1) { 'use strict';

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
    /** @nocollapse */ IxIconsModule.ɵmod = i0.ɵɵdefineNgModule({ type: IxIconsModule });
    /** @nocollapse */ IxIconsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function IxIconsModule_Factory(t) { return new (t || IxIconsModule)(i0.ɵɵinject(i1.MatIconRegistry), i0.ɵɵinject(i2.DomSanitizer)); } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(IxIconsModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [],
                        exports: [],
                    }]
            }], function () { return [{ type: i1.MatIconRegistry }, { type: i2.DomSanitizer }]; }, null);
    })();

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
    /** @nocollapse */ ScrollButtonService.ɵfac = function ScrollButtonService_Factory(t) { return new (t || ScrollButtonService)(); };
    /** @nocollapse */ ScrollButtonService.ɵprov = i0.ɵɵdefineInjectable({ token: ScrollButtonService, factory: ScrollButtonService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ScrollButtonService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () { return []; }, null);
    })();

    var _c0 = function (a0, a1, a2) { return { "hidden": a0, "mat-primary": a1, "mat-accent": a2 }; };
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
    /** @nocollapse */ ScrollTopButtonComponent.ɵfac = function ScrollTopButtonComponent_Factory(t) { return new (t || ScrollTopButtonComponent)(i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(ScrollButtonService)); };
    /** @nocollapse */ ScrollTopButtonComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ScrollTopButtonComponent, selectors: [["ix-scroll-button"]], inputs: { color: "color", scrollableElementId: "scrollableElementId", isScrollable: "isScrollable" }, decls: 3, vars: 5, consts: [["mat-mini-fab", "", 1, "scroll-top", 3, "ngClass", "click"]], template: function ScrollTopButtonComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "button", 0);
                i0.ɵɵlistener("click", function ScrollTopButtonComponent_Template_button_click_0_listener() { return ctx.scrollToTop(); });
                i0.ɵɵelementStart(1, "mat-icon");
                i0.ɵɵtext(2, "arrow_upward");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(1, _c0, !ctx.isScrollable, ctx.color === "primary", ctx.color === "accent"));
            }
        }, directives: [i2$1.MatButton, i3.NgClass, i1.MatIcon], styles: ["body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{height:100%;margin:0;overflow-x:hidden;padding:0;width:100vw}button.scroll-top[_ngcontent-%COMP%]{bottom:8px;position:fixed;right:16px;transform:scale(1);transition:all .25s ease-in-out}button.scroll-top.hidden[_ngcontent-%COMP%]{transform:scale(0)}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ScrollTopButtonComponent, [{
                type: i0.Component,
                args: [{
                        // tslint:disable-next-line: component-selector
                        selector: 'ix-scroll-button',
                        templateUrl: './ix-scroll.component.html',
                        styleUrls: ['./ix-scroll.component.scss'],
                    }]
            }], function () { return [{ type: i0.NgZone }, { type: ScrollButtonService }]; }, { color: [{
                    type: i0.Input
                }], scrollableElementId: [{
                    type: i0.Input
                }], isScrollable: [{
                    type: i0.Input
                }] });
    })();

    var IxScrollModule = /** @class */ (function () {
        function IxScrollModule() {
        }
        return IxScrollModule;
    }());
    /** @nocollapse */ IxScrollModule.ɵmod = i0.ɵɵdefineNgModule({ type: IxScrollModule });
    /** @nocollapse */ IxScrollModule.ɵinj = i0.ɵɵdefineInjector({ factory: function IxScrollModule_Factory(t) { return new (t || IxScrollModule)(); }, imports: [[i2$1.MatButtonModule, i1.MatIconModule, i3.CommonModule]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(IxScrollModule, { declarations: [ScrollTopButtonComponent], imports: [i2$1.MatButtonModule, i1.MatIconModule, i3.CommonModule], exports: [ScrollTopButtonComponent] }); })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(IxScrollModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [ScrollTopButtonComponent],
                        imports: [i2$1.MatButtonModule, i1.MatIconModule, i3.CommonModule],
                        exports: [ScrollTopButtonComponent],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA],
                    }]
            }], null, null);
    })();

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
    /** @nocollapse */ IxMediaQueryService.ɵfac = function IxMediaQueryService_Factory(t) { return new (t || IxMediaQueryService)(i0.ɵɵinject(i1$1.MediaObserver)); };
    /** @nocollapse */ IxMediaQueryService.ɵprov = i0.ɵɵdefineInjectable({ token: IxMediaQueryService, factory: IxMediaQueryService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(IxMediaQueryService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () { return [{ type: i1$1.MediaObserver }]; }, null);
    })();

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
    /** @nocollapse */ IxLocalStorageService.ɵfac = function IxLocalStorageService_Factory(t) { return new (t || IxLocalStorageService)(); };
    /** @nocollapse */ IxLocalStorageService.ɵprov = i0.ɵɵdefineInjectable({ token: IxLocalStorageService, factory: IxLocalStorageService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(IxLocalStorageService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () { return []; }, null);
    })();

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
    /** @nocollapse */ IxDarkService.ɵfac = function IxDarkService_Factory(t) { return new (t || IxDarkService)(i0.ɵɵinject(i3.DOCUMENT), i0.ɵɵinject(IxLocalStorageService)); };
    /** @nocollapse */ IxDarkService.ɵprov = i0.ɵɵdefineInjectable({ token: IxDarkService, factory: IxDarkService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(IxDarkService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3.DOCUMENT]
                        }] }, { type: IxLocalStorageService }];
        }, null);
    })();

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
    /** @nocollapse */ IxSessionStorageService.ɵfac = function IxSessionStorageService_Factory(t) { return new (t || IxSessionStorageService)(); };
    /** @nocollapse */ IxSessionStorageService.ɵprov = i0.ɵɵdefineInjectable({ token: IxSessionStorageService, factory: IxSessionStorageService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(IxSessionStorageService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () { return []; }, null);
    })();

    var _c0$1 = function (a0, a1) { return { "dark-button": a0, "light-button": a1 }; };
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
    /** @nocollapse */ ThemeButtonComponent.ɵfac = function ThemeButtonComponent_Factory(t) { return new (t || ThemeButtonComponent)(i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(IxDarkService)); };
    /** @nocollapse */ ThemeButtonComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ThemeButtonComponent, selectors: [["ix-theme-button"]], decls: 3, vars: 4, consts: [["mat-icon-button", "", "id", "dark-mode-button", 3, "click"], [3, "ngClass"]], template: function ThemeButtonComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "button", 0);
                i0.ɵɵlistener("click", function ThemeButtonComponent_Template_button_click_0_listener() { return ctx.toggleDarkMode(); });
                i0.ɵɵelementStart(1, "mat-icon", 1);
                i0.ɵɵtext(2, " brightness_6 ");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(1, _c0$1, ctx.theme === "dark", ctx.theme === "light"));
            }
        }, directives: [i2$1.MatButton, i1.MatIcon, i3.NgClass], styles: ["#dark-mode-button[_ngcontent-%COMP%]   mat-icon.light-button[_ngcontent-%COMP%]{transform:rotate(0deg);transition:transform 225ms cubic-bezier(.4,0,.2,1)}#dark-mode-button[_ngcontent-%COMP%]   mat-icon.dark-button[_ngcontent-%COMP%]{transform:rotate(180deg);transition:transform 225ms cubic-bezier(.4,0,.2,1)}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ThemeButtonComponent, [{
                type: i0.Component,
                args: [{
                        // tslint:disable-next-line: component-selector
                        selector: 'ix-theme-button',
                        templateUrl: './ix-theme-button.component.html',
                        styleUrls: ['./ix-theme-button.component.scss'],
                    }]
            }], function () { return [{ type: i0.NgZone }, { type: IxDarkService }]; }, null);
    })();

    var IxThemeButtonModule = /** @class */ (function () {
        function IxThemeButtonModule() {
        }
        return IxThemeButtonModule;
    }());
    /** @nocollapse */ IxThemeButtonModule.ɵmod = i0.ɵɵdefineNgModule({ type: IxThemeButtonModule });
    /** @nocollapse */ IxThemeButtonModule.ɵinj = i0.ɵɵdefineInjector({ factory: function IxThemeButtonModule_Factory(t) { return new (t || IxThemeButtonModule)(); }, imports: [[i2$1.MatButtonModule, i1.MatIconModule, i3.CommonModule]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(IxThemeButtonModule, { declarations: [ThemeButtonComponent], imports: [i2$1.MatButtonModule, i1.MatIconModule, i3.CommonModule], exports: [ThemeButtonComponent] }); })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(IxThemeButtonModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [ThemeButtonComponent],
                        imports: [i2$1.MatButtonModule, i1.MatIconModule, i3.CommonModule],
                        exports: [ThemeButtonComponent],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA],
                    }]
            }], null, null);
    })();

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
