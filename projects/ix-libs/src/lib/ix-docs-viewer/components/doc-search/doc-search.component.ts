import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    inject,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchResult } from '../../models/docs.model';
import { SearchService } from '../../services/search.service';
import { DOCS_BASE_ROUTE } from '../../tokens';

/**
 * Full-text search overlay for markdown documentation.
 *
 * Opens on `Ctrl/Cmd+K` or by calling `SearchService.open()`.
 * Results are keyboard-navigable (↑↓ + Enter).
 *
 * Place this component once in your root app template:
 * ```html
 * <ix-doc-search></ix-doc-search>
 * ```
 */
@Component({
    selector: 'ix-doc-search',
    templateUrl: './doc-search.component.html',
    styleUrls: ['./doc-search.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CommonModule, FormsModule, MatIconModule, MatProgressSpinnerModule]
})
export class DocSearchComponent implements OnInit, OnDestroy {
    @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

    isOpen = false;
    query = '';
    results: SearchResult[] = [];
    activeIndex = 0;
    loading = false;

    private readonly baseRoute = inject(DOCS_BASE_ROUTE);
    private sub = new Subscription();
    private querySubject = new Subject<string>();

    constructor(
        private searchService: SearchService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {}

    @HostListener('document:keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
            event.preventDefault();
            this.searchService.open();
            return;
        }
        if (!this.isOpen) {
            return;
        }
        if (event.key === 'Escape') {
            this.close();
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.activeIndex = Math.min(this.activeIndex + 1, this.results.length - 1);
            this.cdr.detectChanges();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.activeIndex = Math.max(this.activeIndex - 1, 0);
            this.cdr.detectChanges();
        } else if (event.key === 'Enter' && this.results[this.activeIndex]) {
            this.navigateTo(this.results[this.activeIndex]);
        }
    }

    ngOnInit(): void {
        this.sub.add(
            this.searchService.isOpen$.subscribe((open) => {
                this.isOpen = open;
                if (open) {
                    setTimeout(() => this.searchInput?.nativeElement?.focus(), 0);
                }
                this.cdr.detectChanges();
            })
        );

        this.sub.add(
            this.querySubject
                .pipe(
                    debounceTime(200),
                    distinctUntilChanged(),
                    switchMap((q) => {
                        if (!q.trim()) {
                            this.results = [];
                            this.loading = false;
                            this.cdr.detectChanges();
                            return of([] as SearchResult[]);
                        }
                        this.loading = true;
                        this.cdr.detectChanges();
                        return this.searchService.search(q).pipe(catchError(() => of([] as SearchResult[])));
                    })
                )
                .subscribe((results) => {
                    this.results = results;
                    this.activeIndex = 0;
                    this.loading = false;
                    this.cdr.detectChanges();
                })
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onQueryChange(value: string): void {
        this.query = value;
        this.querySubject.next(value);
    }

    close(): void {
        this.query = '';
        this.results = [];
        this.loading = false;
        this.searchService.close();
    }

    navigateTo(result: SearchResult): void {
        const segments = [this.baseRoute, result.appId, ...result.docPath.replace(/\.md$/i, '').split('/')];
        this.router.navigate(segments);
        this.close();
    }
}
