import { Component, Input, NgZone, } from '@angular/core';
import { ScrollButtonService } from './ix-scroll.service';
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
ScrollTopButtonComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line: component-selector
                selector: 'ix-scroll-button',
                template: "<button mat-mini-fab class=\"scroll-top\" (click)=\"scrollToTop()\"\n  [ngClass]=\"{'hidden': !isScrollable, 'mat-primary': color === 'primary', 'mat-accent': color === 'accent'}\">\n  <mat-icon>arrow_upward</mat-icon>\n</button>\n",
                styles: ["body,html{height:100%;padding:0;margin:0;width:100vw;overflow-x:hidden}button.scroll-top{position:fixed;bottom:8px;right:16px;transition:all .25s ease-in-out;transform:scale(1)}button.scroll-top.hidden{transform:scale(0)}"]
            },] }
];
ScrollTopButtonComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ScrollButtonService }
];
ScrollTopButtonComponent.propDecorators = {
    color: [{ type: Input }],
    scrollableElementId: [{ type: Input }],
    isScrollable: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtc2Nyb2xsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2l4LWxpYnMvc3JjL2xpYi9peC1zY3JvbGwvaXgtc2Nyb2xsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFRMUQsTUFBTSxPQUFPLHdCQUF3QjtJQUluQyxZQUNVLE1BQWMsRUFDZixtQkFBd0M7UUFEdkMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNmLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFIeEMsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFLNUIsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsSUFBSSxDQUFDLG1CQUFtQjtpQkFDckIsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztpQkFDckMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDdkQsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFDRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNoRTthQUFNO1lBQ0wsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xFLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDOzs7WUEvQ0YsU0FBUyxTQUFDO2dCQUNULCtDQUErQztnQkFDL0MsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsbVBBQXlDOzthQUUxQzs7O1lBVkMsTUFBTTtZQUdDLG1CQUFtQjs7O29CQVN6QixLQUFLO2tDQUNMLEtBQUs7MkJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjcm9sbEJ1dHRvblNlcnZpY2UgfSBmcm9tICcuL2l4LXNjcm9sbC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnaXgtc2Nyb2xsLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9peC1zY3JvbGwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9peC1zY3JvbGwuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsVG9wQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgY29sb3I6ICdwcmltYXJ5JyB8ICdhY2NlbnQnO1xuICBASW5wdXQoKSBzY3JvbGxhYmxlRWxlbWVudElkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlzU2Nyb2xsYWJsZSA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHB1YmxpYyBzY3JvbGxCdXR0b25TZXJ2aWNlOiBTY3JvbGxCdXR0b25TZXJ2aWNlXG4gICkge1xuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IChlKSA9PiB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmxvY2FsQ2hlY2tTY3JvbGwoKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBsb2NhbENoZWNrU2Nyb2xsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNjcm9sbGFibGVFbGVtZW50SWQpIHtcbiAgICAgIHRoaXMuc2Nyb2xsQnV0dG9uU2VydmljZVxuICAgICAgICAuY2hlY2tTY3JvbGwodGhpcy5zY3JvbGxhYmxlRWxlbWVudElkKVxuICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICB0aGlzLmlzU2Nyb2xsYWJsZSA9IHJlcztcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2Nyb2xsQnV0dG9uU2VydmljZS5jaGVja1Njcm9sbCgpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuaXNTY3JvbGxhYmxlID0gcmVzO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHNjcm9sbFRvVG9wKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNjcm9sbGFibGVFbGVtZW50SWQpIHtcbiAgICAgIHRoaXMuc2Nyb2xsQnV0dG9uU2VydmljZS5zY3JvbGxUb1RvcCh0aGlzLnNjcm9sbGFibGVFbGVtZW50SWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNjcm9sbEJ1dHRvblNlcnZpY2Uuc2Nyb2xsVG9Ub3AoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNjcm9sbEJ1dHRvblNlcnZpY2Uuc2V0Q29udGFpbmVySWQodGhpcy5zY3JvbGxhYmxlRWxlbWVudElkKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubG9jYWxDaGVja1Njcm9sbCgpO1xuICAgIH0sIDUwMCk7XG4gIH1cbn1cbiJdfQ==