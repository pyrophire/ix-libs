import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollButtonService {
  constructor() {}

  setContainerId(id?): void {
    if (id) {
      const bodyEl = document.getElementById(id);
      bodyEl.setAttribute('id', id);
    } else {
      const bodyEl = document.getElementsByTagName('BODY')[0];
      bodyEl.setAttribute('id', 'ix-scroll-container');
    }
  }

  checkScroll(id?): Observable<boolean> {
    if (id) {
      const container = document.getElementById(id);
      return of(container.scrollHeight > container.clientHeight);
    } else {
      const container = document.getElementById('ix-scroll-container');
      return of(container.scrollHeight > container.clientHeight);
    }
  }

  scrollToTop(id?): void {
    if (id) {
      const container = document.getElementById(id);
      container.scroll({ top: 0, behavior: 'smooth' });
    } else {
      const container = document.getElementById('ix-scroll-container');
      container.scroll({ top: 0, behavior: 'smooth' });
    }
  }
}
