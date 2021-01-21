import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * This is a shim for the Window.localStorage api.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 *
 * This service performs feature detection of Window.localStorage. If
 * Window.localStorage is available then the functions are passed through.
 * If Window.localStorage is not available then items are stored on
 * an object on Window named Window.{storageKey}. And all methods act on that
 * object. The {storageKey} variable is stored in environments.storageKey.
 *
 * This service only supports Window.localStorage as Window.localStorage
 * is controlled by the browser and cannot be truely shimed beyond the sesssion.
 */
export class LocalStorageService {
    constructor() {
        this.localStorageFeatureAvailable = this.storageAvailable('localStorage');
        if (!this.localStorageFeatureAvailable) {
            console.warn('Window.localStorage is NOT available. Falling back to object storage.');
            window[`ix`] = {};
        }
    }
    /**
     * Save data to localStorage
     * @param key the key of the stored item
     * @param value the value being stored
     */
    setItem(key, value) {
        // pass through
        if (this.localStorageFeatureAvailable) {
            window.localStorage.setItem(key, value);
            return;
        }
        // fallback
        if (!this.localStorageFeatureAvailable) {
            window[`ix`][key] = value;
        }
    }
    /**
     * Get saved data from localStorage
     * @param key the key of the stored item
     */
    getItem(key) {
        // pass through
        if (this.localStorageFeatureAvailable) {
            return window.localStorage.getItem(key);
        }
        // fallback
        if (!this.localStorageFeatureAvailable) {
            return window[`ix`][key];
        }
    }
    /**
     * Remove saved data from localStorage
     * @param key the key of the stored item
     */
    removeItem(key) {
        // pass through
        if (this.localStorageFeatureAvailable) {
            window.localStorage.removeItem(key);
            return;
        }
        // fallback
        if (!this.localStorageFeatureAvailable) {
            window[`ix`][key] = null;
        }
    }
    /**
     * Remove all saved data from localStorage
     */
    clear() {
        // pass through
        if (this.localStorageFeatureAvailable) {
            window.localStorage.clear();
            return;
        }
        // fallback
        if (!this.localStorageFeatureAvailable) {
            window[`ix`] = {};
        }
    }
    iCanUseLocalStorageApi() {
        return this.storageAvailable('localStorage');
    }
    storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
LocalStorageService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LocalStorageService_Factory() { return new LocalStorageService(); }, token: LocalStorageService, providedIn: "root" });
LocalStorageService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
LocalStorageService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaXgtbGlicy9zcmMvbGliL3NoYXJlZC9zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFM0M7Ozs7Ozs7Ozs7OztHQVlHO0FBSUgsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QjtRQUNFLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRTtZQUN0QyxPQUFPLENBQUMsSUFBSSxDQUNWLHVFQUF1RSxDQUN4RSxDQUFDO1lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNuQjtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksT0FBTyxDQUFDLEdBQVcsRUFBRSxLQUFhO1FBQ3ZDLGVBQWU7UUFDZixJQUFJLElBQUksQ0FBQyw0QkFBNEIsRUFBRTtZQUNyQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEMsT0FBTztTQUNSO1FBRUQsV0FBVztRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUU7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSSxPQUFPLENBQUMsR0FBVztRQUN4QixlQUFlO1FBQ2YsSUFBSSxJQUFJLENBQUMsNEJBQTRCLEVBQUU7WUFDckMsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6QztRQUVELFdBQVc7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFO1lBQ3RDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFVBQVUsQ0FBQyxHQUFXO1FBQzNCLGVBQWU7UUFDZixJQUFJLElBQUksQ0FBQyw0QkFBNEIsRUFBRTtZQUNyQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQyxPQUFPO1NBQ1I7UUFFRCxXQUFXO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRTtZQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNWLGVBQWU7UUFDZixJQUFJLElBQUksQ0FBQyw0QkFBNEIsRUFBRTtZQUNyQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLE9BQU87U0FDUjtRQUVELFdBQVc7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFO1lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBRVMsc0JBQXNCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFUyxnQkFBZ0IsQ0FBQyxJQUFZO1FBQ3JDLElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSTtZQUNGLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLEdBQUcsa0JBQWtCLENBQUM7WUFDM0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixPQUFPLElBQUksQ0FBQztTQUNiO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7OztZQWxHRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhpcyBpcyBhIHNoaW0gZm9yIHRoZSBXaW5kb3cubG9jYWxTdG9yYWdlIGFwaS5cbiAqIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2luZG93L2xvY2FsU3RvcmFnZVxuICpcbiAqIFRoaXMgc2VydmljZSBwZXJmb3JtcyBmZWF0dXJlIGRldGVjdGlvbiBvZiBXaW5kb3cubG9jYWxTdG9yYWdlLiBJZlxuICogV2luZG93LmxvY2FsU3RvcmFnZSBpcyBhdmFpbGFibGUgdGhlbiB0aGUgZnVuY3Rpb25zIGFyZSBwYXNzZWQgdGhyb3VnaC5cbiAqIElmIFdpbmRvdy5sb2NhbFN0b3JhZ2UgaXMgbm90IGF2YWlsYWJsZSB0aGVuIGl0ZW1zIGFyZSBzdG9yZWQgb25cbiAqIGFuIG9iamVjdCBvbiBXaW5kb3cgbmFtZWQgV2luZG93LntzdG9yYWdlS2V5fS4gQW5kIGFsbCBtZXRob2RzIGFjdCBvbiB0aGF0XG4gKiBvYmplY3QuIFRoZSB7c3RvcmFnZUtleX0gdmFyaWFibGUgaXMgc3RvcmVkIGluIGVudmlyb25tZW50cy5zdG9yYWdlS2V5LlxuICpcbiAqIFRoaXMgc2VydmljZSBvbmx5IHN1cHBvcnRzIFdpbmRvdy5sb2NhbFN0b3JhZ2UgYXMgV2luZG93LmxvY2FsU3RvcmFnZVxuICogaXMgY29udHJvbGxlZCBieSB0aGUgYnJvd3NlciBhbmQgY2Fubm90IGJlIHRydWVseSBzaGltZWQgYmV5b25kIHRoZSBzZXNzc2lvbi5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZVNlcnZpY2Uge1xuICBwdWJsaWMgcmVhZG9ubHkgbG9jYWxTdG9yYWdlRmVhdHVyZUF2YWlsYWJsZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZUZlYXR1cmVBdmFpbGFibGUgPSB0aGlzLnN0b3JhZ2VBdmFpbGFibGUoJ2xvY2FsU3RvcmFnZScpO1xuICAgIGlmICghdGhpcy5sb2NhbFN0b3JhZ2VGZWF0dXJlQXZhaWxhYmxlKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdXaW5kb3cubG9jYWxTdG9yYWdlIGlzIE5PVCBhdmFpbGFibGUuIEZhbGxpbmcgYmFjayB0byBvYmplY3Qgc3RvcmFnZS4nXG4gICAgICApO1xuICAgICAgd2luZG93W2BpeGBdID0ge307XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgZGF0YSB0byBsb2NhbFN0b3JhZ2VcbiAgICogQHBhcmFtIGtleSB0aGUga2V5IG9mIHRoZSBzdG9yZWQgaXRlbVxuICAgKiBAcGFyYW0gdmFsdWUgdGhlIHZhbHVlIGJlaW5nIHN0b3JlZFxuICAgKi9cbiAgcHVibGljIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBwYXNzIHRocm91Z2hcbiAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2VGZWF0dXJlQXZhaWxhYmxlKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZmFsbGJhY2tcbiAgICBpZiAoIXRoaXMubG9jYWxTdG9yYWdlRmVhdHVyZUF2YWlsYWJsZSkge1xuICAgICAgd2luZG93W2BpeGBdW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHNhdmVkIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICogQHBhcmFtIGtleSB0aGUga2V5IG9mIHRoZSBzdG9yZWQgaXRlbVxuICAgKi9cbiAgcHVibGljIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIHBhc3MgdGhyb3VnaFxuICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZUZlYXR1cmVBdmFpbGFibGUpIHtcbiAgICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICB9XG5cbiAgICAvLyBmYWxsYmFja1xuICAgIGlmICghdGhpcy5sb2NhbFN0b3JhZ2VGZWF0dXJlQXZhaWxhYmxlKSB7XG4gICAgICByZXR1cm4gd2luZG93W2BpeGBdW2tleV07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzYXZlZCBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXG4gICAqIEBwYXJhbSBrZXkgdGhlIGtleSBvZiB0aGUgc3RvcmVkIGl0ZW1cbiAgICovXG4gIHB1YmxpYyByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gcGFzcyB0aHJvdWdoXG4gICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlRmVhdHVyZUF2YWlsYWJsZSkge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZmFsbGJhY2tcbiAgICBpZiAoIXRoaXMubG9jYWxTdG9yYWdlRmVhdHVyZUF2YWlsYWJsZSkge1xuICAgICAgd2luZG93W2BpeGBdW2tleV0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIHNhdmVkIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICovXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICAvLyBwYXNzIHRocm91Z2hcbiAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2VGZWF0dXJlQXZhaWxhYmxlKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZmFsbGJhY2tcbiAgICBpZiAoIXRoaXMubG9jYWxTdG9yYWdlRmVhdHVyZUF2YWlsYWJsZSkge1xuICAgICAgd2luZG93W2BpeGBdID0ge307XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGlDYW5Vc2VMb2NhbFN0b3JhZ2VBcGkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZUF2YWlsYWJsZSgnbG9jYWxTdG9yYWdlJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3RvcmFnZUF2YWlsYWJsZSh0eXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB2YXIgc3RvcmFnZTtcbiAgICB0cnkge1xuICAgICAgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXTtcbiAgICAgIHZhciB4ID0gJ19fc3RvcmFnZV90ZXN0X18nO1xuICAgICAgc3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xuICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19