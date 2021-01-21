import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ReplaySubject } from 'rxjs';
import { LocalStorageService } from '../shared/storage.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../shared/storage.service";
export class IxDarkService {
    constructor(document, sorageService) {
        this.document = document;
        this.themeStream = new ReplaySubject();
        this.prefersDark =
            window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.sorageService = sorageService;
        this.localStorageLightDark = sorageService.getItem('DarkModePref');
    }
    // ******************************************************************************
    // This service requires Angular Material's theming to have two themes
    // with .light and .dark wrapping classes.
    // It is possible to use this service outside of Angular Material, but
    // native framework element coloring will not be affected without
    // custom css overwrites.
    // ******************************************************************************
    // used onInit()
    setDarkModePreference() {
        if (this.localStorageLightDark) {
            this.document.body.classList.add(this.localStorageLightDark);
            this._toggleBodyClasses(this.localStorageLightDark);
            if (this.localStorageLightDark === 'dark') {
                this._toggleBodyClasses('dark');
                this.themeStream.next('dark');
            }
            else {
                this._toggleBodyClasses('light');
                this.themeStream.next('light');
            }
        }
        else if (this.prefersDark) {
            this._toggleBodyClasses('dark');
            this.themeStream.next('dark');
        }
        else {
            this._toggleBodyClasses('light');
            this.themeStream.next('light');
        }
    }
    // used to toggle light/dark themes
    toggleDarkLightMode() {
        if (this.localStorageLightDark === 'light') {
            this._toggleBodyClasses('dark');
            this.themeStream.next('dark');
        }
        else {
            this._toggleBodyClasses('light');
            this.themeStream.next('light');
        }
    }
    _toggleBodyClasses(colorToSet) {
        this.sorageService.setItem('DarkModePref', colorToSet);
        this.localStorageLightDark = this.sorageService.getItem('DarkModePref');
        if (colorToSet.toLowerCase() === 'dark') {
            this.document.body.classList.remove('light');
            this.document.body.classList.add(colorToSet);
        }
        else if (colorToSet.toLowerCase() === 'light') {
            this.document.body.classList.remove('dark');
            this.document.body.classList.add(colorToSet);
        }
    }
}
IxDarkService.ɵprov = i0.ɵɵdefineInjectable({ factory: function IxDarkService_Factory() { return new IxDarkService(i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(i2.LocalStorageService)); }, token: IxDarkService, providedIn: "root" });
IxDarkService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
IxDarkService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: LocalStorageService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtZGFyay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaXgtbGlicy9zcmMvbGliL2l4LWRhcmsvaXgtZGFyay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXJDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7O0FBS2hFLE1BQU0sT0FBTyxhQUFhO0lBT3hCLFlBQzRCLFFBQWEsRUFDdkMsYUFBa0M7UUFEUixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBSnpDLGdCQUFXLEdBQUcsSUFBSSxhQUFhLEVBQVUsQ0FBQztRQU94QyxJQUFJLENBQUMsV0FBVztZQUNkLE1BQU0sQ0FBQyxVQUFVO2dCQUNqQixNQUFNLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzVELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDRCxpRkFBaUY7SUFDakYsc0VBQXNFO0lBQ3RFLDBDQUEwQztJQUMxQyxzRUFBc0U7SUFDdEUsaUVBQWlFO0lBQ2pFLHlCQUF5QjtJQUN6QixpRkFBaUY7SUFFakYsZ0JBQWdCO0lBQ1QscUJBQXFCO1FBQzFCLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3BELElBQUksSUFBSSxDQUFDLHFCQUFxQixLQUFLLE1BQU0sRUFBRTtnQkFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMvQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hDO1NBQ0Y7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRUQsbUNBQW1DO0lBQzVCLG1CQUFtQjtRQUN4QixJQUFJLElBQUksQ0FBQyxxQkFBcUIsS0FBSyxPQUFPLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRU8sa0JBQWtCLENBQUMsVUFBVTtRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sRUFBRTtZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUM7YUFBTSxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQzs7OztZQXRFRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs0Q0FTSSxNQUFNLFNBQUMsUUFBUTtZQWJYLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc3RvcmFnZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEl4RGFya1NlcnZpY2Uge1xuICBwcmVmZXJzRGFyazogYm9vbGVhbjtcbiAgbG9jYWxTdG9yYWdlTGlnaHREYXJrOiBzdHJpbmc7XG4gIGN1cnJlbnRNb2RlOiBzdHJpbmc7XG4gIHRoZW1lU3RyZWFtID0gbmV3IFJlcGxheVN1YmplY3Q8c3RyaW5nPigpO1xuICBzb3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICBzb3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMucHJlZmVyc0RhcmsgPVxuICAgICAgd2luZG93Lm1hdGNoTWVkaWEgJiZcbiAgICAgIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcbiAgICB0aGlzLnNvcmFnZVNlcnZpY2UgPSBzb3JhZ2VTZXJ2aWNlO1xuICAgIHRoaXMubG9jYWxTdG9yYWdlTGlnaHREYXJrID0gc29yYWdlU2VydmljZS5nZXRJdGVtKCdEYXJrTW9kZVByZWYnKTtcbiAgfVxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gVGhpcyBzZXJ2aWNlIHJlcXVpcmVzIEFuZ3VsYXIgTWF0ZXJpYWwncyB0aGVtaW5nIHRvIGhhdmUgdHdvIHRoZW1lc1xuICAvLyB3aXRoIC5saWdodCBhbmQgLmRhcmsgd3JhcHBpbmcgY2xhc3Nlcy5cbiAgLy8gSXQgaXMgcG9zc2libGUgdG8gdXNlIHRoaXMgc2VydmljZSBvdXRzaWRlIG9mIEFuZ3VsYXIgTWF0ZXJpYWwsIGJ1dFxuICAvLyBuYXRpdmUgZnJhbWV3b3JrIGVsZW1lbnQgY29sb3Jpbmcgd2lsbCBub3QgYmUgYWZmZWN0ZWQgd2l0aG91dFxuICAvLyBjdXN0b20gY3NzIG92ZXJ3cml0ZXMuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIC8vIHVzZWQgb25Jbml0KClcbiAgcHVibGljIHNldERhcmtNb2RlUHJlZmVyZW5jZSgpIHtcbiAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2VMaWdodERhcmspIHtcbiAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKHRoaXMubG9jYWxTdG9yYWdlTGlnaHREYXJrKTtcbiAgICAgIHRoaXMuX3RvZ2dsZUJvZHlDbGFzc2VzKHRoaXMubG9jYWxTdG9yYWdlTGlnaHREYXJrKTtcbiAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZUxpZ2h0RGFyayA9PT0gJ2RhcmsnKSB7XG4gICAgICAgIHRoaXMuX3RvZ2dsZUJvZHlDbGFzc2VzKCdkYXJrJyk7XG4gICAgICAgIHRoaXMudGhlbWVTdHJlYW0ubmV4dCgnZGFyaycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQm9keUNsYXNzZXMoJ2xpZ2h0Jyk7XG4gICAgICAgIHRoaXMudGhlbWVTdHJlYW0ubmV4dCgnbGlnaHQnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMucHJlZmVyc0RhcmspIHtcbiAgICAgIHRoaXMuX3RvZ2dsZUJvZHlDbGFzc2VzKCdkYXJrJyk7XG4gICAgICB0aGlzLnRoZW1lU3RyZWFtLm5leHQoJ2RhcmsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdG9nZ2xlQm9keUNsYXNzZXMoJ2xpZ2h0Jyk7XG4gICAgICB0aGlzLnRoZW1lU3RyZWFtLm5leHQoJ2xpZ2h0Jyk7XG4gICAgfVxuICB9XG5cbiAgLy8gdXNlZCB0byB0b2dnbGUgbGlnaHQvZGFyayB0aGVtZXNcbiAgcHVibGljIHRvZ2dsZURhcmtMaWdodE1vZGUoKSB7XG4gICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlTGlnaHREYXJrID09PSAnbGlnaHQnKSB7XG4gICAgICB0aGlzLl90b2dnbGVCb2R5Q2xhc3NlcygnZGFyaycpO1xuICAgICAgdGhpcy50aGVtZVN0cmVhbS5uZXh0KCdkYXJrJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RvZ2dsZUJvZHlDbGFzc2VzKCdsaWdodCcpO1xuICAgICAgdGhpcy50aGVtZVN0cmVhbS5uZXh0KCdsaWdodCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RvZ2dsZUJvZHlDbGFzc2VzKGNvbG9yVG9TZXQpIHtcbiAgICB0aGlzLnNvcmFnZVNlcnZpY2Uuc2V0SXRlbSgnRGFya01vZGVQcmVmJywgY29sb3JUb1NldCk7XG4gICAgdGhpcy5sb2NhbFN0b3JhZ2VMaWdodERhcmsgPSB0aGlzLnNvcmFnZVNlcnZpY2UuZ2V0SXRlbSgnRGFya01vZGVQcmVmJyk7XG4gICAgaWYgKGNvbG9yVG9TZXQudG9Mb3dlckNhc2UoKSA9PT0gJ2RhcmsnKSB7XG4gICAgICB0aGlzLmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbGlnaHQnKTtcbiAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKGNvbG9yVG9TZXQpO1xuICAgIH0gZWxzZSBpZiAoY29sb3JUb1NldC50b0xvd2VyQ2FzZSgpID09PSAnbGlnaHQnKSB7XG4gICAgICB0aGlzLmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGFyaycpO1xuICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoY29sb3JUb1NldCk7XG4gICAgfVxuICB9XG59XG4iXX0=