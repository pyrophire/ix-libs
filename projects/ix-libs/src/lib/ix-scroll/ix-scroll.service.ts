import { Injectable, signal } from '@angular/core';
import { interval, Observable, of, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScrollButtonService {
    subscription: Subscription;
    source = interval(5000);
    private containerId = signal<string>('ix-scroll-container');

    constructor() {}

    setContainerId(id?): void {
        if (id) {
            const bodyEl = document.getElementById(id);
            bodyEl.setAttribute('id', id);
            this.containerId.set(id);
        } else {
            const bodyEl = document.getElementsByTagName('BODY')[0];
            bodyEl.setAttribute('id', 'ix-scroll-container');
            this.containerId.set('ix-scroll-container');
        }
    }

    /**
     * Signal-friendly synchronous check
     */
    isScrollable(id?: string): boolean {
        const targetId = id || this.containerId();
        const container = document.getElementById(targetId);
        if (!container) return false;
        return container.scrollHeight > container.clientHeight;
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

    scrollElementIntoView(id, location: 'start' | 'end'): void {
        const element = document.getElementById(id);
        element.scrollIntoView({
            behavior: 'smooth',
            block: location || 'start',
            inline: 'nearest'
        });
    }

    public startScrollMarking(): void {
        this.subscription = this.source.subscribe((val) => {
            this._markScrollables();
        });
    }
    public stopScrollMarking(): void {
        this.subscription.unsubscribe();
    }

    private _markScrollables(): void {
        const slice = Array.prototype.slice;

        slice
            .call(document.querySelectorAll('*'))
            .filter((e) => e.scrollWidth > e.offsetWidth || e.scrollHeight > e.offsetHeight)
            .filter((e) => {
                const style = window.getComputedStyle(e);
                return [style.overflow, style.overflowX, style.overflowY].some((e) => e === 'auto' || e === 'scroll');
            })
            .forEach((e) => {
                const color = Math.floor(Math.random() * 16777215).toString(16);
                e.style.backgroundColor = '#' + color;
                this._throttle('scroll', 'optimizedScroll', e);
                e.addEventListener('scroll', (event) => {
                    console.log('%c[scroll]', 'color: white; background-color:#' + color, event.target);
                });
            });
    }
    private _throttle(type, name, obj) {
        obj = obj || window;
        let running = false;
        const func = () => {
            if (running) {
                return;
            }
            running = true;
            requestAnimationFrame(() => {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    }
}
