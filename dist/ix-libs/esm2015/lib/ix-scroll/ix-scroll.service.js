import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
export class ScrollButtonService {
    constructor() { }
    setContainerId(id) {
        if (id) {
            const bodyEl = document.getElementById(id);
            bodyEl.setAttribute('id', id);
        }
        else {
            const bodyEl = document.getElementsByTagName('BODY')[0];
            bodyEl.setAttribute('id', 'ix-scroll-container');
        }
    }
    checkScroll(id) {
        if (id) {
            const container = document.getElementById(id);
            return of(container.scrollHeight > container.clientHeight);
        }
        else {
            const container = document.getElementById('ix-scroll-container');
            return of(container.scrollHeight > container.clientHeight);
        }
    }
    scrollToTop(id) {
        if (id) {
            const container = document.getElementById(id);
            container.scroll({ top: 0, behavior: 'smooth' });
        }
        else {
            const container = document.getElementById('ix-scroll-container');
            container.scroll({ top: 0, behavior: 'smooth' });
        }
    }
}
ScrollButtonService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ScrollButtonService_Factory() { return new ScrollButtonService(); }, token: ScrollButtonService, providedIn: "root" });
ScrollButtonService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ScrollButtonService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtc2Nyb2xsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9peC1saWJzL3NyYy9saWIvaXgtc2Nyb2xsL2l4LXNjcm9sbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFLdEMsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixnQkFBZSxDQUFDO0lBRWhCLGNBQWMsQ0FBQyxFQUFHO1FBQ2hCLElBQUksRUFBRSxFQUFFO1lBQ04sTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMvQjthQUFNO1lBQ0wsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLHFCQUFxQixDQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLEVBQUc7UUFDYixJQUFJLEVBQUUsRUFBRTtZQUNOLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDNUQ7YUFBTTtZQUNMLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNqRSxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM1RDtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsRUFBRztRQUNiLElBQUksRUFBRSxFQUFFO1lBQ04sTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ0wsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2pFLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs7OztZQWxDRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsQnV0dG9uU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBzZXRDb250YWluZXJJZChpZD8pOiB2b2lkIHtcbiAgICBpZiAoaWQpIHtcbiAgICAgIGNvbnN0IGJvZHlFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIGJvZHlFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBib2R5RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnQk9EWScpWzBdO1xuICAgICAgYm9keUVsLnNldEF0dHJpYnV0ZSgnaWQnLCAnaXgtc2Nyb2xsLWNvbnRhaW5lcicpO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrU2Nyb2xsKGlkPyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGlmIChpZCkge1xuICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgcmV0dXJuIG9mKGNvbnRhaW5lci5zY3JvbGxIZWlnaHQgPiBjb250YWluZXIuY2xpZW50SGVpZ2h0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l4LXNjcm9sbC1jb250YWluZXInKTtcbiAgICAgIHJldHVybiBvZihjb250YWluZXIuc2Nyb2xsSGVpZ2h0ID4gY29udGFpbmVyLmNsaWVudEhlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgc2Nyb2xsVG9Ub3AoaWQ/KTogdm9pZCB7XG4gICAgaWYgKGlkKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICBjb250YWluZXIuc2Nyb2xsKHsgdG9wOiAwLCBiZWhhdmlvcjogJ3Ntb290aCcgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpeC1zY3JvbGwtY29udGFpbmVyJyk7XG4gICAgICBjb250YWluZXIuc2Nyb2xsKHsgdG9wOiAwLCBiZWhhdmlvcjogJ3Ntb290aCcgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=