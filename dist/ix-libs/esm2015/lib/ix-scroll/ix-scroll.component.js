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
                styles: ["body,html{height:100%;margin:0;overflow-x:hidden;padding:0;width:100vw}button.scroll-top{bottom:8px;position:fixed;right:16px;transform:scale(1);transition:all .25s ease-in-out}button.scroll-top.hidden{transform:scale(0)}"]
            },] }
];
ScrollTopButtonComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ScrollButtonService }
];
ScrollTopButtonComponent.propDecorators = {
    color: [{ type: Input }],
    scrollableElementId: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtc2Nyb2xsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2l4LWxpYnMvc3JjL2xpYi9peC1zY3JvbGwvaXgtc2Nyb2xsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFRMUQsTUFBTSxPQUFPLHdCQUF3QjtJQUluQyxZQUNVLE1BQWMsRUFDZixtQkFBd0M7UUFEdkMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNmLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFIakQsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFLbkIsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsSUFBSSxDQUFDLG1CQUFtQjtpQkFDckIsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztpQkFDckMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDdkQsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFDRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNoRTthQUFNO1lBQ0wsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xFLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDOzs7WUEvQ0YsU0FBUyxTQUFDO2dCQUNULCtDQUErQztnQkFDL0MsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsbVBBQXlDOzthQUUxQzs7O1lBVkMsTUFBTTtZQUdDLG1CQUFtQjs7O29CQVN6QixLQUFLO2tDQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTY3JvbGxCdXR0b25TZXJ2aWNlIH0gZnJvbSAnLi9peC1zY3JvbGwuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2l4LXNjcm9sbC1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vaXgtc2Nyb2xsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaXgtc2Nyb2xsLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFRvcEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGNvbG9yOiAncHJpbWFyeScgfCAnYWNjZW50JztcbiAgQElucHV0KCkgc2Nyb2xsYWJsZUVsZW1lbnRJZDogc3RyaW5nO1xuICBpc1Njcm9sbGFibGUgPSBmYWxzZTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwdWJsaWMgc2Nyb2xsQnV0dG9uU2VydmljZTogU2Nyb2xsQnV0dG9uU2VydmljZVxuICApIHtcbiAgICB3aW5kb3cub25yZXNpemUgPSAoZSkgPT4ge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2NhbENoZWNrU2Nyb2xsKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgbG9jYWxDaGVja1Njcm9sbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zY3JvbGxhYmxlRWxlbWVudElkKSB7XG4gICAgICB0aGlzLnNjcm9sbEJ1dHRvblNlcnZpY2VcbiAgICAgICAgLmNoZWNrU2Nyb2xsKHRoaXMuc2Nyb2xsYWJsZUVsZW1lbnRJZClcbiAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc1Njcm9sbGFibGUgPSByZXM7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNjcm9sbEJ1dHRvblNlcnZpY2UuY2hlY2tTY3JvbGwoKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmlzU2Nyb2xsYWJsZSA9IHJlcztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBzY3JvbGxUb1RvcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zY3JvbGxhYmxlRWxlbWVudElkKSB7XG4gICAgICB0aGlzLnNjcm9sbEJ1dHRvblNlcnZpY2Uuc2Nyb2xsVG9Ub3AodGhpcy5zY3JvbGxhYmxlRWxlbWVudElkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zY3JvbGxCdXR0b25TZXJ2aWNlLnNjcm9sbFRvVG9wKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zY3JvbGxCdXR0b25TZXJ2aWNlLnNldENvbnRhaW5lcklkKHRoaXMuc2Nyb2xsYWJsZUVsZW1lbnRJZCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmxvY2FsQ2hlY2tTY3JvbGwoKTtcbiAgICB9LCA1MDApO1xuICB9XG59XG4iXX0=