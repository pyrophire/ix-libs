(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material/icon'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@ix/icons', ['exports', '@angular/core', '@angular/material/icon', '@angular/platform-browser'], factory) :
    (global = global || self, factory((global.ix = global.ix || {}, global.ix.icons = {}), global.ng.core, global.ng.material.icon, global.ng.platformBrowser));
}(this, (function (exports, i0, i1, i2) { 'use strict';

    var IxIconsModule = /** @class */ (function () {
        function IxIconsModule(iconRegistry, sanitizer) {
            iconRegistry.addSvgIcon('ix-file-pdf', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_pdf.svg'));
            iconRegistry.addSvgIcon('ix-file-doc', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_doc.svg'));
            iconRegistry.addSvgIcon('ix-file-excel', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_excel.svg'));
            iconRegistry.addSvgIcon('ix-file-html', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_html.svg'));
            iconRegistry.addSvgIcon('ix-export', sanitizer.bypassSecurityTrustResourceUrl('ix-img/export.svg'));
        }
        return IxIconsModule;
    }());
    IxIconsModule.ɵmod = i0.ɵɵdefineNgModule({ type: IxIconsModule });
    IxIconsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function IxIconsModule_Factory(t) { return new (t || IxIconsModule)(i0.ɵɵinject(i1.MatIconRegistry), i0.ɵɵinject(i2.DomSanitizer)); } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(IxIconsModule, [{
                type: i0.NgModule,
                args: [{}]
            }], function () { return [{ type: i1.MatIconRegistry }, { type: i2.DomSanitizer }]; }, null);
    })();

    /*
     * Public API Surface of ix-icons
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.IxIconsModule = IxIconsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ix-icons.umd.js.map
