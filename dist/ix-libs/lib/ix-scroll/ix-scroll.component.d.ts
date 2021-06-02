import { NgZone, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ScrollButtonService } from './ix-scroll.service';
export declare class ScrollTopButtonComponent implements OnInit {
    private ngZone;
    scrollButtonService: ScrollButtonService;
    color: 'primary' | 'accent';
    scrollableElementId: string;
    isScrollable: boolean;
    scrollHeightTrigger: number;
    showScrollButton: boolean;
    destroy: Subject<unknown>;
    destroy$: import("rxjs").Observable<unknown>;
    constructor(ngZone: NgZone, scrollButtonService: ScrollButtonService);
    localCheckScroll(): void;
    scrollToTop(): void;
    watchScroll(): void;
    ngOnInit(): void;
}
