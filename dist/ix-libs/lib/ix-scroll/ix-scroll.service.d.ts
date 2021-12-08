import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ScrollButtonService {
    subscription: Subscription;
    source: Observable<number>;
    constructor();
    setContainerId(id?: any): void;
    checkScroll(id?: any): Observable<boolean>;
    scrollToTop(id?: any): void;
    scrollElementIntoView(id: any, location: 'start' | 'end'): void;
    startScrollMarking(): void;
    stopScrollMarking(): void;
    private _markScrollables;
    private _throttle;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollButtonService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScrollButtonService>;
}
