import { NgModule } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
import * as i2 from "@angular/platform-browser";
export class IxIconsModule {
    constructor(iconRegistry, sanitizer) {
        iconRegistry.addSvgIcon('ix-file-pdf', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_pdf.svg'));
        iconRegistry.addSvgIcon('ix-file-doc', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_doc.svg'));
        iconRegistry.addSvgIcon('ix-file-excel', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_excel.svg'));
        iconRegistry.addSvgIcon('ix-file-html', sanitizer.bypassSecurityTrustResourceUrl('ix-img/file_html.svg'));
        iconRegistry.addSvgIcon('ix-export', sanitizer.bypassSecurityTrustResourceUrl('ix-img/export.svg'));
    }
}
IxIconsModule.ɵmod = i0.ɵɵdefineNgModule({ type: IxIconsModule });
IxIconsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function IxIconsModule_Factory(t) { return new (t || IxIconsModule)(i0.ɵɵinject(i1.MatIconRegistry), i0.ɵɵinject(i2.DomSanitizer)); } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(IxIconsModule, [{
        type: NgModule,
        args: [{}]
    }], function () { return [{ type: i1.MatIconRegistry }, { type: i2.DomSanitizer }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtaWNvbnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvaXgtaWNvbnMvc3JjL2xpYi9peC1pY29ucy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUt6QyxNQUFNLE9BQU8sYUFBYTtJQUN4QixZQUFZLFlBQTZCLEVBQUUsU0FBdUI7UUFDaEUsWUFBWSxDQUFDLFVBQVUsQ0FDckIsYUFBYSxFQUNiLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUNoRSxDQUFDO1FBQ0YsWUFBWSxDQUFDLFVBQVUsQ0FDckIsYUFBYSxFQUNiLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUNoRSxDQUFDO1FBQ0YsWUFBWSxDQUFDLFVBQVUsQ0FDckIsZUFBZSxFQUNmLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUNsRSxDQUFDO1FBQ0YsWUFBWSxDQUFDLFVBQVUsQ0FDckIsY0FBYyxFQUNkLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUNqRSxDQUFDO1FBQ0YsWUFBWSxDQUFDLFVBQVUsQ0FDckIsV0FBVyxFQUNYLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUM5RCxDQUFDO0lBQ0osQ0FBQzs7aURBdEJVLGFBQWE7eUdBQWIsYUFBYTtrREFBYixhQUFhO2NBRHpCLFFBQVE7ZUFBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEljb25SZWdpc3RyeSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBJeEljb25zTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoaWNvblJlZ2lzdHJ5OiBNYXRJY29uUmVnaXN0cnksIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gICAgaWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb24oXG4gICAgICAnaXgtZmlsZS1wZGYnLFxuICAgICAgc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnaXgtaW1nL2ZpbGVfcGRmLnN2ZycpXG4gICAgKTtcbiAgICBpY29uUmVnaXN0cnkuYWRkU3ZnSWNvbihcbiAgICAgICdpeC1maWxlLWRvYycsXG4gICAgICBzYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKCdpeC1pbWcvZmlsZV9kb2Muc3ZnJylcbiAgICApO1xuICAgIGljb25SZWdpc3RyeS5hZGRTdmdJY29uKFxuICAgICAgJ2l4LWZpbGUtZXhjZWwnLFxuICAgICAgc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnaXgtaW1nL2ZpbGVfZXhjZWwuc3ZnJylcbiAgICApO1xuICAgIGljb25SZWdpc3RyeS5hZGRTdmdJY29uKFxuICAgICAgJ2l4LWZpbGUtaHRtbCcsXG4gICAgICBzYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKCdpeC1pbWcvZmlsZV9odG1sLnN2ZycpXG4gICAgKTtcbiAgICBpY29uUmVnaXN0cnkuYWRkU3ZnSWNvbihcbiAgICAgICdpeC1leHBvcnQnLFxuICAgICAgc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnaXgtaW1nL2V4cG9ydC5zdmcnKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==