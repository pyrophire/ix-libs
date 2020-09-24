import { Observable } from 'rxjs';
export declare class ScrollButtonService {
    constructor();
    setContainerId(id?: any): void;
    checkScroll(id?: any): Observable<boolean>;
    scrollToTop(id?: any): void;
}
