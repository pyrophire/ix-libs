import { ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵinject, ɵsetClassMetadata, NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

class IxIconsModule {
    constructor(iconRegistry, sanitizer) {
        iconRegistry.addSvgIcon('ix-file-pdf', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_pdf.svg'));
        iconRegistry.addSvgIcon('ix-file-doc', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_doc.svg'));
        iconRegistry.addSvgIcon('ix-file-excel', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_excel.svg'));
        iconRegistry.addSvgIcon('ix-file-html', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_html.svg'));
        iconRegistry.addSvgIcon('ix-export', sanitizer.bypassSecurityTrustResourceUrl('ix-img/export.svg'));
    }
}
IxIconsModule.ɵmod = ɵɵdefineNgModule({ type: IxIconsModule });
IxIconsModule.ɵinj = ɵɵdefineInjector({ factory: function IxIconsModule_Factory(t) { return new (t || IxIconsModule)(ɵɵinject(MatIconRegistry), ɵɵinject(DomSanitizer)); } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(IxIconsModule, [{
        type: NgModule,
        args: [{}]
    }], function () { return [{ type: MatIconRegistry }, { type: DomSanitizer }]; }, null); })();

/*
 * Public API Surface of ix-icons
 */

/**
 * Generated bundle index. Do not edit.
 */

export { IxIconsModule };
//# sourceMappingURL=ix-icons.js.map
