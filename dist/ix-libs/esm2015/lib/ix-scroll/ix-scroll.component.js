import { Component, Input, NgZone, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScrollButtonService } from './ix-scroll.service';
export class ScrollTopButtonComponent {
    constructor(ngZone, scrollButtonService) {
        this.ngZone = ngZone;
        this.scrollButtonService = scrollButtonService;
        this.scrollableElementId = 'ix-scroll-container';
        this.isScrollable = false;
        this.scrollHeightTrigger = 100;
        this.destroy = new Subject();
        this.destroy$ = this.destroy.asObservable();
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
    watchScroll() {
        fromEvent(document.getElementById(this.scrollableElementId), 'scroll')
            .pipe(takeUntil(this.destroy$))
            .subscribe((e) => {
            let st = e.target.scrollTop;
            if (st > this.scrollHeightTrigger) {
                this.showScrollButton = true;
            }
            else {
                this.showScrollButton = false;
            }
        });
    }
    ngOnInit() {
        this.scrollButtonService.setContainerId(this.scrollableElementId);
        setTimeout(() => {
            this.localCheckScroll();
            this.watchScroll();
        }, 500);
    }
}
ScrollTopButtonComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line: component-selector
                selector: 'ix-scroll-button',
                template: "<button mat-mini-fab class=\"scroll-top\" (click)=\"scrollToTop()\" [ngClass]=\"{'hidden': !isScrollable || !showScrollButton, 'mat-primary': color === 'primary', 'mat-accent': color ===\n  'accent'}\">\n  <mat-icon>arrow_upward</mat-icon>\n</button>\n",
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
    isScrollable: [{ type: Input }],
    scrollHeightTrigger: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtc2Nyb2xsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2l4LWxpYnMvc3JjL2xpYi9peC1zY3JvbGwvaXgtc2Nyb2xsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBUTFELE1BQU0sT0FBTyx3QkFBd0I7SUFTbkMsWUFDVSxNQUFjLEVBQ2YsbUJBQXdDO1FBRHZDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBVHhDLHdCQUFtQixHQUFXLHFCQUFxQixDQUFDO1FBQ3BELGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLHdCQUFtQixHQUFHLEdBQUcsQ0FBQztRQUVuQyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQU1yQyxNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUNuQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixJQUFJLENBQUMsbUJBQW1CO2lCQUNyQixXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO2lCQUNyQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0wsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ2hFO2FBQU07WUFDTCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULFNBQVMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLFFBQVEsQ0FBQzthQUNuRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QixTQUFTLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRTtZQUN0QixJQUFJLEVBQUUsR0FBSSxDQUFDLENBQUMsTUFBa0IsQ0FBQyxTQUFTLENBQUM7WUFDekMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7YUFDL0I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNsRSxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7OztZQWxFRixTQUFTLFNBQUM7Z0JBQ1QsK0NBQStDO2dCQUMvQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1Qix3UUFBeUM7O2FBRTFDOzs7WUFaQyxNQUFNO1lBS0MsbUJBQW1COzs7b0JBU3pCLEtBQUs7a0NBQ0wsS0FBSzsyQkFDTCxLQUFLO2tDQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNjcm9sbEJ1dHRvblNlcnZpY2UgfSBmcm9tICcuL2l4LXNjcm9sbC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnaXgtc2Nyb2xsLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9peC1zY3JvbGwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9peC1zY3JvbGwuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsVG9wQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgY29sb3I6ICdwcmltYXJ5JyB8ICdhY2NlbnQnO1xuICBASW5wdXQoKSBzY3JvbGxhYmxlRWxlbWVudElkOiBzdHJpbmcgPSAnaXgtc2Nyb2xsLWNvbnRhaW5lcic7XG4gIEBJbnB1dCgpIGlzU2Nyb2xsYWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBzY3JvbGxIZWlnaHRUcmlnZ2VyID0gMTAwO1xuICBzaG93U2Nyb2xsQnV0dG9uOiBib29sZWFuO1xuICBkZXN0cm95ID0gbmV3IFN1YmplY3QoKTtcbiAgZGVzdHJveSQgPSB0aGlzLmRlc3Ryb3kuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwdWJsaWMgc2Nyb2xsQnV0dG9uU2VydmljZTogU2Nyb2xsQnV0dG9uU2VydmljZVxuICApIHtcbiAgICB3aW5kb3cub25yZXNpemUgPSAoZSkgPT4ge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2NhbENoZWNrU2Nyb2xsKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgbG9jYWxDaGVja1Njcm9sbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zY3JvbGxhYmxlRWxlbWVudElkKSB7XG4gICAgICB0aGlzLnNjcm9sbEJ1dHRvblNlcnZpY2VcbiAgICAgICAgLmNoZWNrU2Nyb2xsKHRoaXMuc2Nyb2xsYWJsZUVsZW1lbnRJZClcbiAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc1Njcm9sbGFibGUgPSByZXM7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNjcm9sbEJ1dHRvblNlcnZpY2UuY2hlY2tTY3JvbGwoKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmlzU2Nyb2xsYWJsZSA9IHJlcztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBzY3JvbGxUb1RvcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zY3JvbGxhYmxlRWxlbWVudElkKSB7XG4gICAgICB0aGlzLnNjcm9sbEJ1dHRvblNlcnZpY2Uuc2Nyb2xsVG9Ub3AodGhpcy5zY3JvbGxhYmxlRWxlbWVudElkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zY3JvbGxCdXR0b25TZXJ2aWNlLnNjcm9sbFRvVG9wKCk7XG4gICAgfVxuICB9XG5cbiAgd2F0Y2hTY3JvbGwoKTogdm9pZCB7XG4gICAgZnJvbUV2ZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2Nyb2xsYWJsZUVsZW1lbnRJZCksICdzY3JvbGwnKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoZTogRXZlbnQpID0+IHtcbiAgICAgICAgbGV0IHN0ID0gKGUudGFyZ2V0IGFzIEVsZW1lbnQpLnNjcm9sbFRvcDtcbiAgICAgICAgaWYgKHN0ID4gdGhpcy5zY3JvbGxIZWlnaHRUcmlnZ2VyKSB7XG4gICAgICAgICAgdGhpcy5zaG93U2Nyb2xsQnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNob3dTY3JvbGxCdXR0b24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNjcm9sbEJ1dHRvblNlcnZpY2Uuc2V0Q29udGFpbmVySWQodGhpcy5zY3JvbGxhYmxlRWxlbWVudElkKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubG9jYWxDaGVja1Njcm9sbCgpO1xuICAgICAgdGhpcy53YXRjaFNjcm9sbCgpO1xuICAgIH0sIDUwMCk7XG4gIH1cbn1cbiJdfQ==