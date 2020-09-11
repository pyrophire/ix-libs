import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({})
export class IxIconsModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'ix-file-pdf',
      sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_pdf.svg')
    );
    iconRegistry.addSvgIcon(
      'ix-file-doc',
      sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_doc.svg')
    );
    iconRegistry.addSvgIcon(
      'ix-file-excel',
      sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_excel.svg')
    );
    iconRegistry.addSvgIcon(
      'ix-file-html',
      sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_html.svg')
    );
    iconRegistry.addSvgIcon(
      'ix-export',
      sanitizer.bypassSecurityTrustResourceUrl('ix-img/export.svg')
    );
  }
}
