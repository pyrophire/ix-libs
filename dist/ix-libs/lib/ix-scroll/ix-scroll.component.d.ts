import { NgZone, OnInit } from '@angular/core';
import { ScrollButtonService } from './ix-scroll.service';
import * as i0 from "@angular/core";
export declare class ScrollTopButtonComponent implements OnInit {
    private ngZone;
    scrollButtonService: ScrollButtonService;
    color: 'primary' | 'accent';
    scrollableElementId: string;
    isScrollable: boolean;
    constructor(ngZone: NgZone, scrollButtonService: ScrollButtonService);
    localCheckScroll(): void;
    scrollToTop(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<ScrollTopButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ScrollTopButtonComponent, "ix-scroll-button", never, { "color": "color"; "scrollableElementId": "scrollableElementId"; "isScrollable": "isScrollable"; }, {}, never, never>;
}
