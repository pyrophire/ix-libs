import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/flex-layout";
export class IxMediaQueryService {
    constructor(media) {
        this.media = media;
        this.media
            .asObservable()
            .pipe(filter((changes) => changes.length > 0), map((changes) => {
            this.medias = changes;
            return changes[0];
        }))
            .subscribe((change) => {
            this.mq = change.mqAlias;
            this.mediaQuery = change.mediaQuery;
            this.suffix = change.suffix;
        });
    }
    _mediaChecker(mediaArray, mqString) {
        let exists;
        mediaArray.forEach((med) => {
            if (med.mqAlias === mqString) {
                exists = true;
            }
        });
        return exists;
    }
    // used to check if viewport has a media query size
    has(mqString) {
        if (this.medias) {
            return this._mediaChecker(this.medias, mqString);
        }
        else {
            this.media.asObservable().pipe(filter((changes) => changes.length > 0), map((changes) => {
                this._mediaChecker(changes, mqString);
            }));
        }
    }
}
/** @nocollapse */ IxMediaQueryService.ɵfac = function IxMediaQueryService_Factory(t) { return new (t || IxMediaQueryService)(i0.ɵɵinject(i1.MediaObserver)); };
/** @nocollapse */ IxMediaQueryService.ɵprov = i0.ɵɵdefineInjectable({ token: IxMediaQueryService, factory: IxMediaQueryService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(IxMediaQueryService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i1.MediaObserver }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtbWVkaWEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2l4LWxpYnMvc3JjL2xpYi9peC1tZWRpYS9peC1tZWRpYS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBZSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUs3QyxNQUFNLE9BQU8sbUJBQW1CO0lBTTlCLFlBQW1CLEtBQW9CO1FBQXBCLFVBQUssR0FBTCxLQUFLLENBQWU7UUFDckMsSUFBSSxDQUFDLEtBQUs7YUFDUCxZQUFZLEVBQUU7YUFDZCxJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsT0FBc0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFDdEQsR0FBRyxDQUFDLENBQUMsT0FBc0IsRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ3RCLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUNIO2FBQ0EsU0FBUyxDQUFDLENBQUMsTUFBbUIsRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGFBQWEsQ0FBQyxVQUF5QixFQUFFLFFBQWdCO1FBQy9ELElBQUksTUFBTSxDQUFDO1FBQ1gsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3pCLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELG1EQUFtRDtJQUM1QyxHQUFHLENBQUMsUUFBUTtRQUNqQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQzVCLE1BQU0sQ0FBQyxDQUFDLE9BQXNCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQ3RELEdBQUcsQ0FBQyxDQUFDLE9BQXNCLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7eUdBN0NVLG1CQUFtQjs4RUFBbkIsbUJBQW1CLFdBQW5CLG1CQUFtQixtQkFGbEIsTUFBTTtrREFFUCxtQkFBbUI7Y0FIL0IsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVkaWFPYnNlcnZlciwgTWVkaWFDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEl4TWVkaWFRdWVyeVNlcnZpY2Uge1xuICBwdWJsaWMgbXE6IHN0cmluZztcbiAgcHVibGljIG1lZGlhUXVlcnk6IHN0cmluZztcbiAgcHVibGljIHN1ZmZpeDogc3RyaW5nO1xuICBwcml2YXRlIG1lZGlhczogTWVkaWFDaGFuZ2VbXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVkaWE6IE1lZGlhT2JzZXJ2ZXIpIHtcbiAgICB0aGlzLm1lZGlhXG4gICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKGNoYW5nZXM6IE1lZGlhQ2hhbmdlW10pID0+IGNoYW5nZXMubGVuZ3RoID4gMCksXG4gICAgICAgIG1hcCgoY2hhbmdlczogTWVkaWFDaGFuZ2VbXSkgPT4ge1xuICAgICAgICAgIHRoaXMubWVkaWFzID0gY2hhbmdlcztcbiAgICAgICAgICByZXR1cm4gY2hhbmdlc1swXTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGNoYW5nZTogTWVkaWFDaGFuZ2UpID0+IHtcbiAgICAgICAgdGhpcy5tcSA9IGNoYW5nZS5tcUFsaWFzO1xuICAgICAgICB0aGlzLm1lZGlhUXVlcnkgPSBjaGFuZ2UubWVkaWFRdWVyeTtcbiAgICAgICAgdGhpcy5zdWZmaXggPSBjaGFuZ2Uuc3VmZml4O1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9tZWRpYUNoZWNrZXIobWVkaWFBcnJheTogTWVkaWFDaGFuZ2VbXSwgbXFTdHJpbmc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGxldCBleGlzdHM7XG4gICAgbWVkaWFBcnJheS5mb3JFYWNoKChtZWQpID0+IHtcbiAgICAgIGlmIChtZWQubXFBbGlhcyA9PT0gbXFTdHJpbmcpIHtcbiAgICAgICAgZXhpc3RzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZXhpc3RzO1xuICB9XG5cbiAgLy8gdXNlZCB0byBjaGVjayBpZiB2aWV3cG9ydCBoYXMgYSBtZWRpYSBxdWVyeSBzaXplXG4gIHB1YmxpYyBoYXMobXFTdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5tZWRpYXMpIHtcbiAgICAgIHJldHVybiB0aGlzLl9tZWRpYUNoZWNrZXIodGhpcy5tZWRpYXMsIG1xU3RyaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZWRpYS5hc09ic2VydmFibGUoKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKGNoYW5nZXM6IE1lZGlhQ2hhbmdlW10pID0+IGNoYW5nZXMubGVuZ3RoID4gMCksXG4gICAgICAgIG1hcCgoY2hhbmdlczogTWVkaWFDaGFuZ2VbXSkgPT4ge1xuICAgICAgICAgIHRoaXMuX21lZGlhQ2hlY2tlcihjaGFuZ2VzLCBtcVN0cmluZyk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19