import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ReplaySubject } from 'rxjs';
import { IxLocalStorageService } from '../shared/local-storage.service';
import * as i0 from "@angular/core";
import * as i1 from "../shared/local-storage.service";
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
    // used onInit() to evaluate users system preferences
    // if they have a preset preferences in localstorage or window.storage
    // it will apply that theme, if not it will check system settings
    // if they have dark mode enabled, it will apply the dark mode to the app
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
/** @nocollapse */ IxDarkService.ɵfac = function IxDarkService_Factory(t) { return new (t || IxDarkService)(i0.ɵɵinject(DOCUMENT), i0.ɵɵinject(i1.IxLocalStorageService)); };
/** @nocollapse */ IxDarkService.ɵprov = i0.ɵɵdefineInjectable({ token: IxDarkService, factory: IxDarkService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(IxDarkService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: i1.IxLocalStorageService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtZGFyay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaXgtbGlicy9zcmMvbGliL2l4LWRhcmsvaXgtZGFyay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXJDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7QUFLeEUsTUFBTSxPQUFPLGFBQWE7SUFPeEIsWUFDNEIsUUFBYSxFQUN2QyxhQUFvQztRQURWLGFBQVEsR0FBUixRQUFRLENBQUs7UUFKekMsZ0JBQVcsR0FBRyxJQUFJLGFBQWEsRUFBVSxDQUFDO1FBT3hDLElBQUksQ0FBQyxXQUFXO1lBQ2QsTUFBTSxDQUFDLFVBQVU7Z0JBQ2pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNELGlGQUFpRjtJQUNqRixzRUFBc0U7SUFDdEUsMENBQTBDO0lBQzFDLHNFQUFzRTtJQUN0RSxpRUFBaUU7SUFDakUseUJBQXlCO0lBQ3pCLGlGQUFpRjtJQUVqRixxREFBcUQ7SUFDckQsc0VBQXNFO0lBQ3RFLGlFQUFpRTtJQUNqRSx5RUFBeUU7SUFDbEUscUJBQXFCO1FBQzFCLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3BELElBQUksSUFBSSxDQUFDLHFCQUFxQixLQUFLLE1BQU0sRUFBRTtnQkFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMvQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hDO1NBQ0Y7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRUQsbUNBQW1DO0lBQzVCLG1CQUFtQjtRQUN4QixJQUFJLElBQUksQ0FBQyxxQkFBcUIsS0FBSyxPQUFPLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRU8sa0JBQWtCLENBQUMsVUFBVTtRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sRUFBRTtZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUM7YUFBTSxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQzs7NkZBdEVVLGFBQWEsY0FRZCxRQUFRO3dFQVJQLGFBQWEsV0FBYixhQUFhLG1CQUZaLE1BQU07a0RBRVAsYUFBYTtjQUh6QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQVNJLE1BQU07dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEl4TG9jYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSXhEYXJrU2VydmljZSB7XG4gIHByZWZlcnNEYXJrOiBib29sZWFuO1xuICBsb2NhbFN0b3JhZ2VMaWdodERhcms6IHN0cmluZztcbiAgY3VycmVudE1vZGU6IHN0cmluZztcbiAgdGhlbWVTdHJlYW0gPSBuZXcgUmVwbGF5U3ViamVjdDxzdHJpbmc+KCk7XG4gIHNvcmFnZVNlcnZpY2U6IEl4TG9jYWxTdG9yYWdlU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgc29yYWdlU2VydmljZTogSXhMb2NhbFN0b3JhZ2VTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMucHJlZmVyc0RhcmsgPVxuICAgICAgd2luZG93Lm1hdGNoTWVkaWEgJiZcbiAgICAgIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcbiAgICB0aGlzLnNvcmFnZVNlcnZpY2UgPSBzb3JhZ2VTZXJ2aWNlO1xuICAgIHRoaXMubG9jYWxTdG9yYWdlTGlnaHREYXJrID0gc29yYWdlU2VydmljZS5nZXRJdGVtKCdEYXJrTW9kZVByZWYnKTtcbiAgfVxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gVGhpcyBzZXJ2aWNlIHJlcXVpcmVzIEFuZ3VsYXIgTWF0ZXJpYWwncyB0aGVtaW5nIHRvIGhhdmUgdHdvIHRoZW1lc1xuICAvLyB3aXRoIC5saWdodCBhbmQgLmRhcmsgd3JhcHBpbmcgY2xhc3Nlcy5cbiAgLy8gSXQgaXMgcG9zc2libGUgdG8gdXNlIHRoaXMgc2VydmljZSBvdXRzaWRlIG9mIEFuZ3VsYXIgTWF0ZXJpYWwsIGJ1dFxuICAvLyBuYXRpdmUgZnJhbWV3b3JrIGVsZW1lbnQgY29sb3Jpbmcgd2lsbCBub3QgYmUgYWZmZWN0ZWQgd2l0aG91dFxuICAvLyBjdXN0b20gY3NzIG92ZXJ3cml0ZXMuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIC8vIHVzZWQgb25Jbml0KCkgdG8gZXZhbHVhdGUgdXNlcnMgc3lzdGVtIHByZWZlcmVuY2VzXG4gIC8vIGlmIHRoZXkgaGF2ZSBhIHByZXNldCBwcmVmZXJlbmNlcyBpbiBsb2NhbHN0b3JhZ2Ugb3Igd2luZG93LnN0b3JhZ2VcbiAgLy8gaXQgd2lsbCBhcHBseSB0aGF0IHRoZW1lLCBpZiBub3QgaXQgd2lsbCBjaGVjayBzeXN0ZW0gc2V0dGluZ3NcbiAgLy8gaWYgdGhleSBoYXZlIGRhcmsgbW9kZSBlbmFibGVkLCBpdCB3aWxsIGFwcGx5IHRoZSBkYXJrIG1vZGUgdG8gdGhlIGFwcFxuICBwdWJsaWMgc2V0RGFya01vZGVQcmVmZXJlbmNlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZUxpZ2h0RGFyaykge1xuICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQodGhpcy5sb2NhbFN0b3JhZ2VMaWdodERhcmspO1xuICAgICAgdGhpcy5fdG9nZ2xlQm9keUNsYXNzZXModGhpcy5sb2NhbFN0b3JhZ2VMaWdodERhcmspO1xuICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlTGlnaHREYXJrID09PSAnZGFyaycpIHtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQm9keUNsYXNzZXMoJ2RhcmsnKTtcbiAgICAgICAgdGhpcy50aGVtZVN0cmVhbS5uZXh0KCdkYXJrJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl90b2dnbGVCb2R5Q2xhc3NlcygnbGlnaHQnKTtcbiAgICAgICAgdGhpcy50aGVtZVN0cmVhbS5uZXh0KCdsaWdodCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5wcmVmZXJzRGFyaykge1xuICAgICAgdGhpcy5fdG9nZ2xlQm9keUNsYXNzZXMoJ2RhcmsnKTtcbiAgICAgIHRoaXMudGhlbWVTdHJlYW0ubmV4dCgnZGFyaycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90b2dnbGVCb2R5Q2xhc3NlcygnbGlnaHQnKTtcbiAgICAgIHRoaXMudGhlbWVTdHJlYW0ubmV4dCgnbGlnaHQnKTtcbiAgICB9XG4gIH1cblxuICAvLyB1c2VkIHRvIHRvZ2dsZSBsaWdodC9kYXJrIHRoZW1lc1xuICBwdWJsaWMgdG9nZ2xlRGFya0xpZ2h0TW9kZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2VMaWdodERhcmsgPT09ICdsaWdodCcpIHtcbiAgICAgIHRoaXMuX3RvZ2dsZUJvZHlDbGFzc2VzKCdkYXJrJyk7XG4gICAgICB0aGlzLnRoZW1lU3RyZWFtLm5leHQoJ2RhcmsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdG9nZ2xlQm9keUNsYXNzZXMoJ2xpZ2h0Jyk7XG4gICAgICB0aGlzLnRoZW1lU3RyZWFtLm5leHQoJ2xpZ2h0Jyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdG9nZ2xlQm9keUNsYXNzZXMoY29sb3JUb1NldCk6IHZvaWQge1xuICAgIHRoaXMuc29yYWdlU2VydmljZS5zZXRJdGVtKCdEYXJrTW9kZVByZWYnLCBjb2xvclRvU2V0KTtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZUxpZ2h0RGFyayA9IHRoaXMuc29yYWdlU2VydmljZS5nZXRJdGVtKCdEYXJrTW9kZVByZWYnKTtcbiAgICBpZiAoY29sb3JUb1NldC50b0xvd2VyQ2FzZSgpID09PSAnZGFyaycpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdsaWdodCcpO1xuICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoY29sb3JUb1NldCk7XG4gICAgfSBlbHNlIGlmIChjb2xvclRvU2V0LnRvTG93ZXJDYXNlKCkgPT09ICdsaWdodCcpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrJyk7XG4gICAgICB0aGlzLmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChjb2xvclRvU2V0KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==