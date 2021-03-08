import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ReplaySubject } from 'rxjs';
import { IxLocalStorageService } from '../shared/local-storage.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../shared/local-storage.service";
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
IxDarkService.ɵprov = i0.ɵɵdefineInjectable({ factory: function IxDarkService_Factory() { return new IxDarkService(i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(i2.IxLocalStorageService)); }, token: IxDarkService, providedIn: "root" });
IxDarkService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
IxDarkService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: IxLocalStorageService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtZGFyay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaXgtbGlicy9zcmMvbGliL2l4LWRhcmsvaXgtZGFyay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXJDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7O0FBS3hFLE1BQU0sT0FBTyxhQUFhO0lBT3hCLFlBQzRCLFFBQWEsRUFDdkMsYUFBb0M7UUFEVixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBSnpDLGdCQUFXLEdBQUcsSUFBSSxhQUFhLEVBQVUsQ0FBQztRQU94QyxJQUFJLENBQUMsV0FBVztZQUNkLE1BQU0sQ0FBQyxVQUFVO2dCQUNqQixNQUFNLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzVELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDRCxpRkFBaUY7SUFDakYsc0VBQXNFO0lBQ3RFLDBDQUEwQztJQUMxQyxzRUFBc0U7SUFDdEUsaUVBQWlFO0lBQ2pFLHlCQUF5QjtJQUN6QixpRkFBaUY7SUFFakYscURBQXFEO0lBQ3JELHNFQUFzRTtJQUN0RSxpRUFBaUU7SUFDakUseUVBQXlFO0lBQ2xFLHFCQUFxQjtRQUMxQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNwRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsS0FBSyxNQUFNLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDL0I7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztTQUNGO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQjthQUFNO1lBQ0wsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztJQUVELG1DQUFtQztJQUM1QixtQkFBbUI7UUFDeEIsSUFBSSxJQUFJLENBQUMscUJBQXFCLEtBQUssT0FBTyxFQUFFO1lBQzFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQjthQUFNO1lBQ0wsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztJQUVPLGtCQUFrQixDQUFDLFVBQVU7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN4RSxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzlDO2FBQU0sSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxFQUFFO1lBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7Ozs7WUF6RUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7NENBU0ksTUFBTSxTQUFDLFFBQVE7WUFiWCxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJeExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEl4RGFya1NlcnZpY2Uge1xuICBwcmVmZXJzRGFyazogYm9vbGVhbjtcbiAgbG9jYWxTdG9yYWdlTGlnaHREYXJrOiBzdHJpbmc7XG4gIGN1cnJlbnRNb2RlOiBzdHJpbmc7XG4gIHRoZW1lU3RyZWFtID0gbmV3IFJlcGxheVN1YmplY3Q8c3RyaW5nPigpO1xuICBzb3JhZ2VTZXJ2aWNlOiBJeExvY2FsU3RvcmFnZVNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgIHNvcmFnZVNlcnZpY2U6IEl4TG9jYWxTdG9yYWdlU2VydmljZVxuICApIHtcbiAgICB0aGlzLnByZWZlcnNEYXJrID1cbiAgICAgIHdpbmRvdy5tYXRjaE1lZGlhICYmXG4gICAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXM7XG4gICAgdGhpcy5zb3JhZ2VTZXJ2aWNlID0gc29yYWdlU2VydmljZTtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZUxpZ2h0RGFyayA9IHNvcmFnZVNlcnZpY2UuZ2V0SXRlbSgnRGFya01vZGVQcmVmJyk7XG4gIH1cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIFRoaXMgc2VydmljZSByZXF1aXJlcyBBbmd1bGFyIE1hdGVyaWFsJ3MgdGhlbWluZyB0byBoYXZlIHR3byB0aGVtZXNcbiAgLy8gd2l0aCAubGlnaHQgYW5kIC5kYXJrIHdyYXBwaW5nIGNsYXNzZXMuXG4gIC8vIEl0IGlzIHBvc3NpYmxlIHRvIHVzZSB0aGlzIHNlcnZpY2Ugb3V0c2lkZSBvZiBBbmd1bGFyIE1hdGVyaWFsLCBidXRcbiAgLy8gbmF0aXZlIGZyYW1ld29yayBlbGVtZW50IGNvbG9yaW5nIHdpbGwgbm90IGJlIGFmZmVjdGVkIHdpdGhvdXRcbiAgLy8gY3VzdG9tIGNzcyBvdmVyd3JpdGVzLlxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICAvLyB1c2VkIG9uSW5pdCgpIHRvIGV2YWx1YXRlIHVzZXJzIHN5c3RlbSBwcmVmZXJlbmNlc1xuICAvLyBpZiB0aGV5IGhhdmUgYSBwcmVzZXQgcHJlZmVyZW5jZXMgaW4gbG9jYWxzdG9yYWdlIG9yIHdpbmRvdy5zdG9yYWdlXG4gIC8vIGl0IHdpbGwgYXBwbHkgdGhhdCB0aGVtZSwgaWYgbm90IGl0IHdpbGwgY2hlY2sgc3lzdGVtIHNldHRpbmdzXG4gIC8vIGlmIHRoZXkgaGF2ZSBkYXJrIG1vZGUgZW5hYmxlZCwgaXQgd2lsbCBhcHBseSB0aGUgZGFyayBtb2RlIHRvIHRoZSBhcHBcbiAgcHVibGljIHNldERhcmtNb2RlUHJlZmVyZW5jZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2VMaWdodERhcmspIHtcbiAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKHRoaXMubG9jYWxTdG9yYWdlTGlnaHREYXJrKTtcbiAgICAgIHRoaXMuX3RvZ2dsZUJvZHlDbGFzc2VzKHRoaXMubG9jYWxTdG9yYWdlTGlnaHREYXJrKTtcbiAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZUxpZ2h0RGFyayA9PT0gJ2RhcmsnKSB7XG4gICAgICAgIHRoaXMuX3RvZ2dsZUJvZHlDbGFzc2VzKCdkYXJrJyk7XG4gICAgICAgIHRoaXMudGhlbWVTdHJlYW0ubmV4dCgnZGFyaycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQm9keUNsYXNzZXMoJ2xpZ2h0Jyk7XG4gICAgICAgIHRoaXMudGhlbWVTdHJlYW0ubmV4dCgnbGlnaHQnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMucHJlZmVyc0RhcmspIHtcbiAgICAgIHRoaXMuX3RvZ2dsZUJvZHlDbGFzc2VzKCdkYXJrJyk7XG4gICAgICB0aGlzLnRoZW1lU3RyZWFtLm5leHQoJ2RhcmsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdG9nZ2xlQm9keUNsYXNzZXMoJ2xpZ2h0Jyk7XG4gICAgICB0aGlzLnRoZW1lU3RyZWFtLm5leHQoJ2xpZ2h0Jyk7XG4gICAgfVxuICB9XG5cbiAgLy8gdXNlZCB0byB0b2dnbGUgbGlnaHQvZGFyayB0aGVtZXNcbiAgcHVibGljIHRvZ2dsZURhcmtMaWdodE1vZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlTGlnaHREYXJrID09PSAnbGlnaHQnKSB7XG4gICAgICB0aGlzLl90b2dnbGVCb2R5Q2xhc3NlcygnZGFyaycpO1xuICAgICAgdGhpcy50aGVtZVN0cmVhbS5uZXh0KCdkYXJrJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RvZ2dsZUJvZHlDbGFzc2VzKCdsaWdodCcpO1xuICAgICAgdGhpcy50aGVtZVN0cmVhbS5uZXh0KCdsaWdodCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RvZ2dsZUJvZHlDbGFzc2VzKGNvbG9yVG9TZXQpOiB2b2lkIHtcbiAgICB0aGlzLnNvcmFnZVNlcnZpY2Uuc2V0SXRlbSgnRGFya01vZGVQcmVmJywgY29sb3JUb1NldCk7XG4gICAgdGhpcy5sb2NhbFN0b3JhZ2VMaWdodERhcmsgPSB0aGlzLnNvcmFnZVNlcnZpY2UuZ2V0SXRlbSgnRGFya01vZGVQcmVmJyk7XG4gICAgaWYgKGNvbG9yVG9TZXQudG9Mb3dlckNhc2UoKSA9PT0gJ2RhcmsnKSB7XG4gICAgICB0aGlzLmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbGlnaHQnKTtcbiAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKGNvbG9yVG9TZXQpO1xuICAgIH0gZWxzZSBpZiAoY29sb3JUb1NldC50b0xvd2VyQ2FzZSgpID09PSAnbGlnaHQnKSB7XG4gICAgICB0aGlzLmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGFyaycpO1xuICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoY29sb3JUb1NldCk7XG4gICAgfVxuICB9XG59XG4iXX0=