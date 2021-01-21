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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtbWVkaWEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2l4LWxpYnMvc3JjL2xpYi9peC1tZWRpYS9peC1tZWRpYS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBZSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUs3QyxNQUFNLE9BQU8sbUJBQW1CO0lBTTlCLFlBQW1CLEtBQW9CO1FBQXBCLFVBQUssR0FBTCxLQUFLLENBQWU7UUFDckMsSUFBSSxDQUFDLEtBQUs7YUFDUCxZQUFZLEVBQUU7YUFDZCxJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsT0FBc0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFDdEQsR0FBRyxDQUFDLENBQUMsT0FBc0IsRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ3RCLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUNIO2FBQ0EsU0FBUyxDQUFDLENBQUMsTUFBbUIsRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGFBQWEsQ0FBQyxVQUF5QixFQUFFLFFBQWdCO1FBQy9ELElBQUksTUFBTSxDQUFDO1FBQ1gsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3pCLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLEdBQUcsQ0FBQyxRQUFRO1FBQ2pCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ2xEO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FDNUIsTUFBTSxDQUFDLENBQUMsT0FBc0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFDdEQsR0FBRyxDQUFDLENBQUMsT0FBc0IsRUFBRSxFQUFFO2dCQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FDSCxDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7O1lBL0NGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBTFEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lZGlhT2JzZXJ2ZXIsIE1lZGlhQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBJeE1lZGlhUXVlcnlTZXJ2aWNlIHtcbiAgcHVibGljIG1xOiBzdHJpbmc7XG4gIHB1YmxpYyBtZWRpYVF1ZXJ5OiBzdHJpbmc7XG4gIHB1YmxpYyBzdWZmaXg6IHN0cmluZztcbiAgcHJpdmF0ZSBtZWRpYXM6IE1lZGlhQ2hhbmdlW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIG1lZGlhOiBNZWRpYU9ic2VydmVyKSB7XG4gICAgdGhpcy5tZWRpYVxuICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChjaGFuZ2VzOiBNZWRpYUNoYW5nZVtdKSA9PiBjaGFuZ2VzLmxlbmd0aCA+IDApLFxuICAgICAgICBtYXAoKGNoYW5nZXM6IE1lZGlhQ2hhbmdlW10pID0+IHtcbiAgICAgICAgICB0aGlzLm1lZGlhcyA9IGNoYW5nZXM7XG4gICAgICAgICAgcmV0dXJuIGNoYW5nZXNbMF07XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChjaGFuZ2U6IE1lZGlhQ2hhbmdlKSA9PiB7XG4gICAgICAgIHRoaXMubXEgPSBjaGFuZ2UubXFBbGlhcztcbiAgICAgICAgdGhpcy5tZWRpYVF1ZXJ5ID0gY2hhbmdlLm1lZGlhUXVlcnk7XG4gICAgICAgIHRoaXMuc3VmZml4ID0gY2hhbmdlLnN1ZmZpeDtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWVkaWFDaGVja2VyKG1lZGlhQXJyYXk6IE1lZGlhQ2hhbmdlW10sIG1xU3RyaW5nOiBzdHJpbmcpIHtcbiAgICBsZXQgZXhpc3RzO1xuICAgIG1lZGlhQXJyYXkuZm9yRWFjaCgobWVkKSA9PiB7XG4gICAgICBpZiAobWVkLm1xQWxpYXMgPT09IG1xU3RyaW5nKSB7XG4gICAgICAgIGV4aXN0cyA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGV4aXN0cztcbiAgfVxuXG4gIHB1YmxpYyBoYXMobXFTdHJpbmcpIHtcbiAgICBpZiAodGhpcy5tZWRpYXMpIHtcbiAgICAgIHJldHVybiB0aGlzLl9tZWRpYUNoZWNrZXIodGhpcy5tZWRpYXMsIG1xU3RyaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZWRpYS5hc09ic2VydmFibGUoKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKGNoYW5nZXM6IE1lZGlhQ2hhbmdlW10pID0+IGNoYW5nZXMubGVuZ3RoID4gMCksXG4gICAgICAgIG1hcCgoY2hhbmdlczogTWVkaWFDaGFuZ2VbXSkgPT4ge1xuICAgICAgICAgIHRoaXMuX21lZGlhQ2hlY2tlcihjaGFuZ2VzLCBtcVN0cmluZyk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19