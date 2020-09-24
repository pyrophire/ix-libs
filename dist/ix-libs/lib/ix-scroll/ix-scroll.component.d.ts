import { NgZone, OnInit } from '@angular/core';
import { ScrollButtonService } from './ix-scroll.service';
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
}
