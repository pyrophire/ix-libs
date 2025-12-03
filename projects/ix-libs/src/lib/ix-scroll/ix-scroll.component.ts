import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, input, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScrollButtonService } from './ix-scroll.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ix-scroll-button',
    templateUrl: './ix-scroll.component.html',
    styleUrls: ['./ix-scroll.component.scss'],
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollTopButtonComponent implements OnDestroy {
    // Inputs using the input() API with defaults
    color = input<'primary' | 'accent' | undefined>(undefined);
    scrollableElementId = input<string>('ix-scroll-container');
    isScrollableInput = input<boolean>(false);
    scrollHeightTrigger = input<number>(100);
    verticalButtonPosition = input<'top' | 'bottom'>('bottom');
    horizontalButtonPosition = input<'left' | 'right'>('right');

    private cdr = inject(ChangeDetectorRef);
    readonly scrollButtonService = inject(ScrollButtonService);

    // Local state via signals
    private internalScrollable = signal<boolean>(false);
    private scrollTop = signal<number>(0);

    // Derived state
    readonly isScrollable = computed(() => this.isScrollableInput() || this.internalScrollable());
    readonly showScrollButton = computed(() => this.scrollTop() > this.scrollHeightTrigger());

    // Cleanups
    private removeScrollListener: (() => void) | null = null;
    private removeResizeListener: (() => void) | null = null;

    constructor() {
        // Initialize after current task to avoid ExpressionChanged errors
        queueMicrotask(() => {
            this.scrollButtonService.setContainerId(this.scrollableElementId());
            this.measureScrollable();
            this.attachScrollListener();
        });

        // Re-measure on resize
        const onResize = () => this.measureScrollable();
        window.addEventListener('resize', onResize, { passive: true });
        this.removeResizeListener = () => window.removeEventListener('resize', onResize);

        // Re-attach listeners if target id changes
        effect(() => {
            const id = this.scrollableElementId();
            this.scrollButtonService.setContainerId(id);
            this.detachScrollListener();
            this.attachScrollListener();
            this.measureScrollable();
        });
    }

    private attachScrollListener(): void {
        const id = this.scrollableElementId();
        const el = document.getElementById(id);
        if (!el) {
            console.warn(`Element with id '${id}' not found for scroll watching`);
            return;
        }
        const onScroll = (e: Event) => {
            const st = (e.target as Element).scrollTop || 0;
            this.scrollTop.set(st);
        };
        el.addEventListener('scroll', onScroll, { passive: true });
        this.removeScrollListener = () => el.removeEventListener('scroll', onScroll);
    }

    private detachScrollListener(): void {
        if (this.removeScrollListener) {
            this.removeScrollListener();
            this.removeScrollListener = null;
        }
    }

    private measureScrollable(): void {
        const id = this.scrollableElementId();
        const scrollable = this.scrollButtonService.isScrollable(id);
        this.internalScrollable.set(scrollable);
        this.cdr.markForCheck();
    }

    scrollToTop(): void {
        const id = this.scrollableElementId();
        if (id) {
            this.scrollButtonService.scrollToTop(id);
        } else {
            this.scrollButtonService.scrollToTop();
        }
    }

    ngOnDestroy(): void {
        this.detachScrollListener();
        if (this.removeResizeListener) {
            this.removeResizeListener();
            this.removeResizeListener = null;
        }
    }
}
