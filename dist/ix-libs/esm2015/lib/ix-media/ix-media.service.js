import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/flex-layout/core";
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
IxMediaQueryService.ɵprov = i0.ɵɵdefineInjectable({ factory: function IxMediaQueryService_Factory() { return new IxMediaQueryService(i0.ɵɵinject(i1.MediaObserver)); }, token: IxMediaQueryService, providedIn: "root" });
IxMediaQueryService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
IxMediaQueryService.ctorParameters = () => [
    { type: MediaObserver }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtbWVkaWEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2l4LWxpYnMvc3JjL2xpYi9peC1tZWRpYS9peC1tZWRpYS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBZSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUs3QyxNQUFNLE9BQU8sbUJBQW1CO0lBTTlCLFlBQW1CLEtBQW9CO1FBQXBCLFVBQUssR0FBTCxLQUFLLENBQWU7UUFDckMsSUFBSSxDQUFDLEtBQUs7YUFDUCxZQUFZLEVBQUU7YUFDZCxJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsT0FBc0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFDdEQsR0FBRyxDQUFDLENBQUMsT0FBc0IsRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ3RCLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUNIO2FBQ0EsU0FBUyxDQUFDLENBQUMsTUFBbUIsRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGFBQWEsQ0FBQyxVQUF5QixFQUFFLFFBQWdCO1FBQy9ELElBQUksTUFBTSxDQUFDO1FBQ1gsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3pCLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELG1EQUFtRDtJQUM1QyxHQUFHLENBQUMsUUFBUTtRQUNqQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQzVCLE1BQU0sQ0FBQyxDQUFDLE9BQXNCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQ3RELEdBQUcsQ0FBQyxDQUFDLE9BQXNCLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7OztZQWhERixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQUxRLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZWRpYU9ic2VydmVyLCBNZWRpYUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSXhNZWRpYVF1ZXJ5U2VydmljZSB7XG4gIHB1YmxpYyBtcTogc3RyaW5nO1xuICBwdWJsaWMgbWVkaWFRdWVyeTogc3RyaW5nO1xuICBwdWJsaWMgc3VmZml4OiBzdHJpbmc7XG4gIHByaXZhdGUgbWVkaWFzOiBNZWRpYUNoYW5nZVtdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZWRpYTogTWVkaWFPYnNlcnZlcikge1xuICAgIHRoaXMubWVkaWFcbiAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoY2hhbmdlczogTWVkaWFDaGFuZ2VbXSkgPT4gY2hhbmdlcy5sZW5ndGggPiAwKSxcbiAgICAgICAgbWFwKChjaGFuZ2VzOiBNZWRpYUNoYW5nZVtdKSA9PiB7XG4gICAgICAgICAgdGhpcy5tZWRpYXMgPSBjaGFuZ2VzO1xuICAgICAgICAgIHJldHVybiBjaGFuZ2VzWzBdO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoY2hhbmdlOiBNZWRpYUNoYW5nZSkgPT4ge1xuICAgICAgICB0aGlzLm1xID0gY2hhbmdlLm1xQWxpYXM7XG4gICAgICAgIHRoaXMubWVkaWFRdWVyeSA9IGNoYW5nZS5tZWRpYVF1ZXJ5O1xuICAgICAgICB0aGlzLnN1ZmZpeCA9IGNoYW5nZS5zdWZmaXg7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX21lZGlhQ2hlY2tlcihtZWRpYUFycmF5OiBNZWRpYUNoYW5nZVtdLCBtcVN0cmluZzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbGV0IGV4aXN0cztcbiAgICBtZWRpYUFycmF5LmZvckVhY2goKG1lZCkgPT4ge1xuICAgICAgaWYgKG1lZC5tcUFsaWFzID09PSBtcVN0cmluZykge1xuICAgICAgICBleGlzdHMgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBleGlzdHM7XG4gIH1cblxuICAvLyB1c2VkIHRvIGNoZWNrIGlmIHZpZXdwb3J0IGhhcyBhIG1lZGlhIHF1ZXJ5IHNpemVcbiAgcHVibGljIGhhcyhtcVN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLm1lZGlhcykge1xuICAgICAgcmV0dXJuIHRoaXMuX21lZGlhQ2hlY2tlcih0aGlzLm1lZGlhcywgbXFTdHJpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1lZGlhLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoY2hhbmdlczogTWVkaWFDaGFuZ2VbXSkgPT4gY2hhbmdlcy5sZW5ndGggPiAwKSxcbiAgICAgICAgbWFwKChjaGFuZ2VzOiBNZWRpYUNoYW5nZVtdKSA9PiB7XG4gICAgICAgICAgdGhpcy5fbWVkaWFDaGVja2VyKGNoYW5nZXMsIG1xU3RyaW5nKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=