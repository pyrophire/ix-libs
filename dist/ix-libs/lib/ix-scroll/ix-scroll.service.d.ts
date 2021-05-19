import { Observable, Subscription } from 'rxjs';
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
}
