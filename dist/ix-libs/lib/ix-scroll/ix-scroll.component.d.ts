import { NgZone, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ScrollButtonService } from './ix-scroll.service';
import * as i0 from "@angular/core";
export declare class ScrollTopButtonComponent implements OnInit {
    private ngZone;
    scrollButtonService: ScrollButtonService;
    color: 'primary' | 'accent';
    scrollableElementId: string;
    isScrollable: boolean;
    scrollHeightTrigger: number;
    verticalButtonPosition: 'top' | 'bottom';
    horizontalButtonPosition: 'left' | 'right';
    showScrollButton: boolean;
    destroy: Subject<unknown>;
    destroy$: import("rxjs").Observable<unknown>;
    constructor(ngZone: NgZone, scrollButtonService: ScrollButtonService);
    localCheckScroll(): void;
    scrollToTop(): void;
    watchScroll(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollTopButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScrollTopButtonComponent, "ix-scroll-button", never, { "color": "color"; "scrollableElementId": "scrollableElementId"; "isScrollable": "isScrollable"; "scrollHeightTrigger": "scrollHeightTrigger"; "verticalButtonPosition": "verticalButtonPosition"; "horizontalButtonPosition": "horizontalButtonPosition"; }, {}, never, never, false, never>;
}
