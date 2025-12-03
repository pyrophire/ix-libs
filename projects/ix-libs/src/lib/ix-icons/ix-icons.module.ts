import { APP_INITIALIZER, EnvironmentProviders, inject, makeEnvironmentProviders } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

// Standalone provider-style API for Angular 15+ apps without NgModules
function initIxIcons() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIcon('ix-file-pdf', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_pdf.svg'));
    iconRegistry.addSvgIcon('ix-file-doc', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_doc.svg'));
    iconRegistry.addSvgIcon('ix-file-excel', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_excel.svg'));
    iconRegistry.addSvgIcon('ix-file-html', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_html.svg'));
    iconRegistry.addSvgIcon('ix-file-csv', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_csv.svg'));
    iconRegistry.addSvgIcon('ix-save-csv', sanitizer.bypassSecurityTrustResourceUrl('ix-img/download_csv.svg'));
    iconRegistry.addSvgIcon('ix-export', sanitizer.bypassSecurityTrustResourceUrl('ix-img/export.svg'));
    iconRegistry.addSvgIcon('ix-dialog', sanitizer.bypassSecurityTrustResourceUrl('ix-img/dialog.svg'));
}

export function provideIxIcons(): EnvironmentProviders {
    // Using makeEnvironmentProviders to run a side-effectful init at bootstrap
    return makeEnvironmentProviders([
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: () => {
                return () => initIxIcons();
            }
        }
    ]);
}
