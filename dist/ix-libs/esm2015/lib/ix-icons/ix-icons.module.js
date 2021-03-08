import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
import * as i2 from "@angular/platform-browser";
export class IxIconsModule {
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
/** @nocollapse */ IxIconsModule.ɵmod = i0.ɵɵdefineNgModule({ type: IxIconsModule });
/** @nocollapse */ IxIconsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function IxIconsModule_Factory(t) { return new (t || IxIconsModule)(i0.ɵɵinject(i1.MatIconRegistry), i0.ɵɵinject(i2.DomSanitizer)); } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(IxIconsModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                exports: [],
            }]
    }], function () { return [{ type: i1.MatIconRegistry }, { type: i2.DomSanitizer }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtaWNvbnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaXgtbGlicy9zcmMvbGliL2l4LWljb25zL2l4LWljb25zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFNekQsTUFBTSxPQUFPLGFBQWE7SUFDeEIsc0RBQXNEO0lBQ3RELFlBQVksWUFBNkIsRUFBRSxTQUF1QjtRQUNoRSxZQUFZLENBQUMsVUFBVSxDQUNyQixhQUFhLEVBQ2IsU0FBUyxDQUFDLDhCQUE4QixDQUFDLHFCQUFxQixDQUFDLENBQ2hFLENBQUM7UUFDRixZQUFZLENBQUMsVUFBVSxDQUNyQixhQUFhLEVBQ2IsU0FBUyxDQUFDLDhCQUE4QixDQUFDLHFCQUFxQixDQUFDLENBQ2hFLENBQUM7UUFDRixZQUFZLENBQUMsVUFBVSxDQUNyQixlQUFlLEVBQ2YsU0FBUyxDQUFDLDhCQUE4QixDQUFDLHVCQUF1QixDQUFDLENBQ2xFLENBQUM7UUFDRixZQUFZLENBQUMsVUFBVSxDQUNyQixjQUFjLEVBQ2QsU0FBUyxDQUFDLDhCQUE4QixDQUFDLHNCQUFzQixDQUFDLENBQ2pFLENBQUM7UUFDRixZQUFZLENBQUMsVUFBVSxDQUNyQixXQUFXLEVBQ1gsU0FBUyxDQUFDLDhCQUE4QixDQUFDLG1CQUFtQixDQUFDLENBQzlELENBQUM7UUFDRixZQUFZLENBQUMsVUFBVSxDQUNyQixXQUFXLEVBQ1gsU0FBUyxDQUFDLDhCQUE4QixDQUFDLG1CQUFtQixDQUFDLENBQzlELENBQUM7SUFDSixDQUFDOztvRUEzQlUsYUFBYTs0SEFBYixhQUFhO2tEQUFiLGFBQWE7Y0FKekIsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRSxFQUFFO2dCQUNoQixPQUFPLEVBQUUsRUFBRTthQUNaIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEljb25SZWdpc3RyeSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGV4cG9ydHM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBJeEljb25zTW9kdWxlIHtcbiAgLy8gVG8gdXNlOiA8bWF0LWljb24gc3ZnSWNvbj1cIml4LWZpbGUtcGRmXCI+PC9tYXQtaWNvbj5cbiAgY29uc3RydWN0b3IoaWNvblJlZ2lzdHJ5OiBNYXRJY29uUmVnaXN0cnksIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gICAgaWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb24oXG4gICAgICAnaXgtZmlsZS1wZGYnLFxuICAgICAgc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnaXgtaW1nL2ZpbGVfcGRmLnN2ZycpXG4gICAgKTtcbiAgICBpY29uUmVnaXN0cnkuYWRkU3ZnSWNvbihcbiAgICAgICdpeC1maWxlLWRvYycsXG4gICAgICBzYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKCdpeC1pbWcvZmlsZV9kb2Muc3ZnJylcbiAgICApO1xuICAgIGljb25SZWdpc3RyeS5hZGRTdmdJY29uKFxuICAgICAgJ2l4LWZpbGUtZXhjZWwnLFxuICAgICAgc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnaXgtaW1nL2ZpbGVfZXhjZWwuc3ZnJylcbiAgICApO1xuICAgIGljb25SZWdpc3RyeS5hZGRTdmdJY29uKFxuICAgICAgJ2l4LWZpbGUtaHRtbCcsXG4gICAgICBzYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKCdpeC1pbWcvZmlsZV9odG1sLnN2ZycpXG4gICAgKTtcbiAgICBpY29uUmVnaXN0cnkuYWRkU3ZnSWNvbihcbiAgICAgICdpeC1leHBvcnQnLFxuICAgICAgc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnaXgtaW1nL2V4cG9ydC5zdmcnKVxuICAgICk7XG4gICAgaWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb24oXG4gICAgICAnaXgtZGlhbG9nJyxcbiAgICAgIHNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoJ2l4LWltZy9kaWFsb2cuc3ZnJylcbiAgICApO1xuICB9XG59XG4iXX0=