import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import { ScrollButtonService } from './ix-scroll.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ix-scroll-button',
  templateUrl: './ix-scroll.component.html',
  styleUrls: ['./ix-scroll.component.scss'],
})
export class ScrollTopButtonComponent implements OnInit {
  @Input() color: 'primary' | 'accent';
  @Input() scrollableElementId: string;
  isScrollable = false;
  constructor(
    private ngZone: NgZone,
    public scrollButtonService: ScrollButtonService
  ) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.localCheckScroll();
      });
    };
  }

  localCheckScroll(): void {
    if (this.scrollableElementId) {
      this.scrollButtonService
        .checkScroll(this.scrollableElementId)
        .subscribe((res) => {
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

  ngOnInit(): void {
    this.scrollButtonService.setContainerId(this.scrollableElementId);
    setTimeout(() => {
      this.localCheckScroll();
    }, 500);
  }
}
