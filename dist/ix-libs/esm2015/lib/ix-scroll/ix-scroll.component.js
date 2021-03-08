import { Component, Input, NgZone, } from '@angular/core';
import { ScrollButtonService } from './ix-scroll.service';
import * as i0 from "@angular/core";
import * as i1 from "./ix-scroll.service";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/icon";
const _c0 = function (a0, a1, a2) { return { "hidden": a0, "mat-primary": a1, "mat-accent": a2 }; };
export class ScrollTopButtonComponent {
    constructor(ngZone, scrollButtonService) {
        this.ngZone = ngZone;
        this.scrollButtonService = scrollButtonService;
        this.isScrollable = false;
        window.onresize = (e) => {
            this.ngZone.run(() => {
                this.localCheckScroll();
            });
        };
    }
    localCheckScroll() {
        if (this.scrollableElementId) {
            this.scrollButtonService
                .checkScroll(this.scrollableElementId)
                .subscribe((res) => {
                this.isScrollable = res;
            });
        }
        else {
            this.scrollButtonService.checkScroll().subscribe((res) => {
                this.isScrollable = res;
            });
        }
    }
    scrollToTop() {
        if (this.scrollableElementId) {
            this.scrollButtonService.scrollToTop(this.scrollableElementId);
        }
        else {
            this.scrollButtonService.scrollToTop();
        }
    }
    ngOnInit() {
        this.scrollButtonService.setContainerId(this.scrollableElementId);
        setTimeout(() => {
            this.localCheckScroll();
        }, 500);
    }
}
/** @nocollapse */ ScrollTopButtonComponent.ɵfac = function ScrollTopButtonComponent_Factory(t) { return new (t || ScrollTopButtonComponent)(i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i1.ScrollButtonService)); };
/** @nocollapse */ ScrollTopButtonComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ScrollTopButtonComponent, selectors: [["ix-scroll-button"]], inputs: { color: "color", scrollableElementId: "scrollableElementId", isScrollable: "isScrollable" }, decls: 3, vars: 5, consts: [["mat-mini-fab", "", 1, "scroll-top", 3, "ngClass", "click"]], template: function ScrollTopButtonComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "button", 0);
        i0.ɵɵlistener("click", function ScrollTopButtonComponent_Template_button_click_0_listener() { return ctx.scrollToTop(); });
        i0.ɵɵelementStart(1, "mat-icon");
        i0.ɵɵtext(2, "arrow_upward");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(1, _c0, !ctx.isScrollable, ctx.color === "primary", ctx.color === "accent"));
    } }, directives: [i2.MatButton, i3.NgClass, i4.MatIcon], styles: ["body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{height:100%;margin:0;overflow-x:hidden;padding:0;width:100vw}button.scroll-top[_ngcontent-%COMP%]{bottom:8px;position:fixed;right:16px;transform:scale(1);transition:all .25s ease-in-out}button.scroll-top.hidden[_ngcontent-%COMP%]{transform:scale(0)}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ScrollTopButtonComponent, [{
        type: Component,
        args: [{
                // tslint:disable-next-line: component-selector
                selector: 'ix-scroll-button',
                templateUrl: './ix-scroll.component.html',
                styleUrls: ['./ix-scroll.component.scss'],
            }]
    }], function () { return [{ type: i0.NgZone }, { type: i1.ScrollButtonService }]; }, { color: [{
            type: Input
        }], scrollableElementId: [{
            type: Input
        }], isScrollable: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtc2Nyb2xsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2l4LWxpYnMvc3JjL2xpYi9peC1zY3JvbGwvaXgtc2Nyb2xsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2l4LWxpYnMvc3JjL2xpYi9peC1zY3JvbGwvaXgtc2Nyb2xsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7OztBQVExRCxNQUFNLE9BQU8sd0JBQXdCO0lBSW5DLFlBQ1UsTUFBYyxFQUNmLG1CQUF3QztRQUR2QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Ysd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUh4QyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUs1QixNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUNuQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixJQUFJLENBQUMsbUJBQW1CO2lCQUNyQixXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO2lCQUNyQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0wsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ2hFO2FBQU07WUFDTCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbEUsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7O21IQXpDVSx3QkFBd0I7Z0ZBQXhCLHdCQUF3QjtRQ2ZyQyxpQ0FFRTtRQUZzQyxxR0FBUyxpQkFBYSxJQUFDO1FBRTdELGdDQUFVO1FBQUEsNEJBQVk7UUFBQSxpQkFBVztRQUNuQyxpQkFBUzs7UUFGUCx3SEFBMkc7O2tERGNoRyx3QkFBd0I7Y0FOcEMsU0FBUztlQUFDO2dCQUNULCtDQUErQztnQkFDL0MsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsV0FBVyxFQUFFLDRCQUE0QjtnQkFDekMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7YUFDMUM7MkZBRVUsS0FBSztrQkFBYixLQUFLO1lBQ0csbUJBQW1CO2tCQUEzQixLQUFLO1lBQ0csWUFBWTtrQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjcm9sbEJ1dHRvblNlcnZpY2UgfSBmcm9tICcuL2l4LXNjcm9sbC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnaXgtc2Nyb2xsLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9peC1zY3JvbGwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9peC1zY3JvbGwuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsVG9wQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgY29sb3I6ICdwcmltYXJ5JyB8ICdhY2NlbnQnO1xuICBASW5wdXQoKSBzY3JvbGxhYmxlRWxlbWVudElkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlzU2Nyb2xsYWJsZSA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHB1YmxpYyBzY3JvbGxCdXR0b25TZXJ2aWNlOiBTY3JvbGxCdXR0b25TZXJ2aWNlXG4gICkge1xuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IChlKSA9PiB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmxvY2FsQ2hlY2tTY3JvbGwoKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBsb2NhbENoZWNrU2Nyb2xsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNjcm9sbGFibGVFbGVtZW50SWQpIHtcbiAgICAgIHRoaXMuc2Nyb2xsQnV0dG9uU2VydmljZVxuICAgICAgICAuY2hlY2tTY3JvbGwodGhpcy5zY3JvbGxhYmxlRWxlbWVudElkKVxuICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICB0aGlzLmlzU2Nyb2xsYWJsZSA9IHJlcztcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2Nyb2xsQnV0dG9uU2VydmljZS5jaGVja1Njcm9sbCgpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuaXNTY3JvbGxhYmxlID0gcmVzO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHNjcm9sbFRvVG9wKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNjcm9sbGFibGVFbGVtZW50SWQpIHtcbiAgICAgIHRoaXMuc2Nyb2xsQnV0dG9uU2VydmljZS5zY3JvbGxUb1RvcCh0aGlzLnNjcm9sbGFibGVFbGVtZW50SWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNjcm9sbEJ1dHRvblNlcnZpY2Uuc2Nyb2xsVG9Ub3AoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNjcm9sbEJ1dHRvblNlcnZpY2Uuc2V0Q29udGFpbmVySWQodGhpcy5zY3JvbGxhYmxlRWxlbWVudElkKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubG9jYWxDaGVja1Njcm9sbCgpO1xuICAgIH0sIDUwMCk7XG4gIH1cbn1cbiIsIjxidXR0b24gbWF0LW1pbmktZmFiIGNsYXNzPVwic2Nyb2xsLXRvcFwiIChjbGljayk9XCJzY3JvbGxUb1RvcCgpXCJcbiAgW25nQ2xhc3NdPVwieydoaWRkZW4nOiAhaXNTY3JvbGxhYmxlLCAnbWF0LXByaW1hcnknOiBjb2xvciA9PT0gJ3ByaW1hcnknLCAnbWF0LWFjY2VudCc6IGNvbG9yID09PSAnYWNjZW50J31cIj5cbiAgPG1hdC1pY29uPmFycm93X3Vwd2FyZDwvbWF0LWljb24+XG48L2J1dHRvbj5cbiJdfQ==