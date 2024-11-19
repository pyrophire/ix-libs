import { Component, Input, NgZone, OnInit } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScrollButtonService } from './ix-scroll.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ix-scroll-button',
    templateUrl: './ix-scroll.component.html',
    styleUrls: ['./ix-scroll.component.scss'],
    standalone: false
})
export class ScrollTopButtonComponent implements OnInit {
  @Input() color: 'primary' | 'accent';
  @Input() scrollableElementId: string = 'ix-scroll-container';
  @Input() isScrollable = false;
  @Input() scrollHeightTrigger = 100;
  @Input() verticalButtonPosition: 'top' | 'bottom' = 'bottom';
  @Input() horizontalButtonPosition: 'left' | 'right' = 'right';
  showScrollButton: boolean;
  destroy = new Subject();
  destroy$ = this.destroy.asObservable();

  constructor(private ngZone: NgZone, public scrollButtonService: ScrollButtonService) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.localCheckScroll();
      });
    };
  }

  localCheckScroll(): void {
    if (this.scrollableElementId) {
      this.scrollButtonService.checkScroll(this.scrollableElementId).subscribe((res) => {
        this.isScrollable = res;
      });
    } else {
      this.scrollButtonService.checkScroll().subscribe((res) => {
        this.isScrollable = res;
      });
    }
  }
  scrollToTop(): void {
    if (this.scrollableElementId) {
      this.scrollButtonService.scrollToTop(this.scrollableElementId);
    } else {
      this.scrollButtonService.scrollToTop();
    }
  }

  watchScroll(): void {
    fromEvent(document.getElementById(this.scrollableElementId), 'scroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe((e: Event) => {
        let st = (e.target as Element).scrollTop;
        if (st > this.scrollHeightTrigger) {
          this.showScrollButton = true;
        } else {
          this.showScrollButton = false;
        }
      });
  }

  ngOnInit(): void {
    this.scrollButtonService.setContainerId(this.scrollableElementId);
    setTimeout(() => {
      this.localCheckScroll();
      this.watchScroll();
    }, 500);
  }
}
