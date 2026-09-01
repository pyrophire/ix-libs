import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    inject,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { catchError, map, of, Subscription, switchMap } from 'rxjs';
import { ScrollButtonService, ScrollTopButtonComponent } from '../../../../public_api';
import { DocApplication, DocEntry, TocItem } from '../../models/docs.model';
import { DocsService } from '../../services/docs.service';
import { MarkdownService } from '../../services/markdown.service';
import { SearchService } from '../../services/search.service';
import { DOCS_ASSETS_ROOT, DOCS_BASE_ROUTE, DOCS_SCROLL_CONTAINER_ID, DOCS_TITLE_SUFFIX } from '../../tokens';
import { DocSearchComponent } from '../doc-search/doc-search.component';

/**
 * Renders one markdown document with:
 *  - a left sidebar listing every doc of the current application
 *  - the rendered document in the center
 *  - a right TOC panel with IntersectionObserver scrollspy
 *
 * URL shape: `/<docsBaseRoute>/<appId>/<doc/path/without/extension>`
 *
 * Provide tokens to configure behaviour:
 *  - `DOCS_BASE_ROUTE`          — router path prefix (default `/docs`)
 *  - `DOCS_TITLE_SUFFIX`        — page title suffix (default `Documentation`)
 *  - `DOCS_ASSETS_ROOT`         — assets base URL (default `assets/markdown`)
 *  - `DOCS_SCROLL_CONTAINER_ID` — ix-libs scroll container id
 */
@Component({
    selector: 'ix-doc-viewer',
    templateUrl: './doc-viewer.component.html',
    styleUrls: ['./doc-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule, ScrollTopButtonComponent, DocSearchComponent]
})
export class DocViewerComponent implements OnInit, OnDestroy {
    @ViewChild('docContent') docContent!: ElementRef<HTMLElement>;

    /** Route the "Back to Home" button navigates to when a document is not found. */
    @Input() homeRoute = '/home';

    app: DocApplication | undefined;
    entry: DocEntry | undefined;
    docPath = '';
    html: SafeHtml = '';
    toc: TocItem[] = [];
    activeTocId = '';
    notFound = false;
    loading = true;
    sidebarOpen = true;
    isScrollable = false;

    private readonly assetsRoot = inject(DOCS_ASSETS_ROOT);
    private readonly baseRoute = inject(DOCS_BASE_ROUTE);
    private readonly titleSuffix = inject(DOCS_TITLE_SUFFIX);
    readonly scrollContainerId = inject(DOCS_SCROLL_CONTAINER_ID);
    private scrollServ = inject(ScrollButtonService);
    private searchService = inject(SearchService);

    private sub = new Subscription();
    private pendingFragment: string | null = null;
    private scrollspy: IntersectionObserver | null = null;
    private visibleHeadings = new Set<string>();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private docsService: DocsService,
        private markdownService: MarkdownService,
        private sanitizer: DomSanitizer,
        private title: Title,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.sub.add(
            this.route.url
                .pipe(
                    switchMap((segments) => {
                        const appId = segments[0]?.path ?? '';
                        const requestedPath = segments
                            .slice(1)
                            .map((s) => s.path)
                            .join('/');
                        return this.docsService.getApplication(appId).pipe(
                            switchMap((app) => {
                                if (!app) {
                                    return of({ app: undefined, docPath: '', markdown: '' });
                                }
                                const docPath = requestedPath ? `${requestedPath}.md` : app.home;
                                return this.docsService.getMarkdown(app, docPath).pipe(
                                    map((markdown) => ({ app, docPath, markdown })),
                                    catchError(() => of({ app, docPath, markdown: null as string | null }))
                                );
                            })
                        );
                    })
                )
                .subscribe(({ app, docPath, markdown }) => {
                    this.pendingFragment = this.route.snapshot.fragment;
                    this.loading = false;
                    this.app = app;
                    this.docPath = docPath;
                    this.notFound = !app || markdown === null;
                    this.entry = app ? this.docsService.findEntry(app, docPath) : undefined;
                    this.html = this.notFound
                        ? ''
                        : this.sanitizer.bypassSecurityTrustHtml(
                              this.markdownService.render(markdown ?? '', app?.dir ?? '', docPath, this.assetsRoot)
                          );
                    const pageTitle = this.entry?.title ?? app?.name ?? 'Documentation';
                    this.title.setTitle(`${pageTitle} - ${this.titleSuffix}`);
                    this.cdr.detectChanges();
                    this.afterRender();
                })
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.teardownScrollspy();
    }

    private afterRender(): void {
        const container = this.docContent?.nativeElement;
        this.teardownScrollspy();

        if (!container || this.notFound) {
            this.toc = [];
            return;
        }

        this.toc = this.markdownService.buildToc(container);
        this.activeTocId = this.toc[0]?.id ?? '';
        this.visibleHeadings.clear();

        this.scrollServ.scrollToTop(this.scrollContainerId);

        if (this.pendingFragment) {
            const fragment = this.pendingFragment;
            setTimeout(() => this.scrollToHeading(fragment), 0);
        }

        setTimeout(() => this.setupScrollspy(container), 0);

        setTimeout(() => {
            this.scrollServ.checkScroll(this.scrollContainerId).subscribe((val) => {
                this.isScrollable = val;
            });
        }, 250);

        this.cdr.detectChanges();
    }

    private setupScrollspy(container: HTMLElement): void {
        const headings = Array.from(container.querySelectorAll<HTMLElement>('h1, h2, h3, h4'));
        if (!headings.length) {
            return;
        }

        this.scrollspy = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const id = entry.target.id;
                    if (entry.isIntersecting) {
                        this.visibleHeadings.add(id);
                    } else {
                        this.visibleHeadings.delete(id);
                    }
                }
                const next = this.toc.find((item) => this.visibleHeadings.has(item.id));
                const resolved = next?.id ?? this.activeTocId;
                if (resolved !== this.activeTocId) {
                    this.activeTocId = resolved;
                    this.cdr.detectChanges();
                }
            },
            { rootMargin: '-160px 0px -60% 0px' }
        );

        headings.forEach((h) => this.scrollspy?.observe(h));
    }

    private teardownScrollspy(): void {
        if (this.scrollspy) {
            this.scrollspy.disconnect();
            this.scrollspy = null;
        }
        this.visibleHeadings.clear();
    }

    public onContentClick(event: MouseEvent): void {
        const anchor = (event.target as HTMLElement).closest('a');
        if (!anchor || !this.app) {
            return;
        }
        const href = anchor.getAttribute('href') ?? '';

        if (href.startsWith('#')) {
            event.preventDefault();
            this.scrollToHeading(decodeURIComponent(href.substring(1)));
            return;
        }

        if (/^(https?:)?\/\//i.test(href) || href.startsWith('mailto:')) {
            anchor.setAttribute('target', '_blank');
            anchor.setAttribute('rel', 'noopener');
            return;
        }

        const [pathPart, fragment] = href.split('#');

        if (pathPart.startsWith('/')) {
            event.preventDefault();
            this.router.navigate([pathPart.replace(/\.md$/i, '')], { fragment: fragment || undefined });
            return;
        }

        if (/\.md$/i.test(pathPart)) {
            event.preventDefault();
            const resolved = this.docsService.resolveRelativePath(this.docPath, pathPart);
            this.router.navigate([this.baseRoute, this.app.id, ...resolved.replace(/\.md$/i, '').split('/')], {
                fragment: fragment || undefined
            });
        }
    }

    public scrollToHeading(id: string): void {
        const el = this.docContent?.nativeElement.querySelector<HTMLElement>(`[id="${CSS.escape(id)}"]`);
        if (el) {
            this.activeTocId = id;
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            this.router.navigate([], { fragment: id, replaceUrl: true, queryParamsHandling: 'preserve' });
        }
    }

    public isDocActive(doc: DocEntry): boolean {
        return this.docsService.normalize(doc.path) === this.docsService.normalize(this.docPath);
    }

    public docRoute(doc: DocEntry): string[] {
        return [this.baseRoute, this.app?.id ?? '', ...doc.path.replace(/\.md$/i, '').split('/')];
    }

    public toggleSidebar(): void {
        this.sidebarOpen = !this.sidebarOpen;
    }

    public openSearch(): void {
        this.searchService.open();
    }
}
