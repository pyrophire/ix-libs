(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material/icon'), require('@angular/platform-browser'), require('rxjs'), require('@angular/material/button'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ix-libs', ['exports', '@angular/core', '@angular/material/icon', '@angular/platform-browser', 'rxjs', '@angular/material/button', '@angular/common'], factory) :
    (global = global || self, factory(global['ix-libs'] = {}, global.ng.core, global.ng.material.icon, global.ng.platformBrowser, global.rxjs, global.ng.material.button, global.ng.common));
}(this, (function (exports, i0, icon, platformBrowser, rxjs, button, common) { 'use strict';

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
        scrollableElementId: [{ type: i0.Input }]
    };

    var IxScrollModule = /** @class */ (function () {
        function IxScrollModule() {
        }
        return IxScrollModule;
    }());
    IxScrollModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [ScrollTopButtonComponent],
                    imports: [button.MatButtonModule, icon.MatIconModule, common.CommonModule],
                    exports: [ScrollTopButtonComponent],
                    schemas: [i0.CUSTOM_ELEMENTS_SCHEMA],
                },] }
    ];

    /*
     * Public API Surface of ix-icons
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.IxIconsModule = IxIconsModule;
    exports.IxScrollModule = IxScrollModule;
    exports.ScrollButtonService = ScrollButtonService;
    exports.ScrollTopButtonComponent = ScrollTopButtonComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ix-libs.umd.js.map
