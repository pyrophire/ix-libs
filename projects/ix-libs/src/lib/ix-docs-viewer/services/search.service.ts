import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { IndexedDoc, SearchResult } from '../models/docs.model';
import { DOCS_ASSETS_ROOT } from '../tokens';
import { DocsService } from './docs.service';

const EXCERPT_RADIUS = 120;
const MAX_RESULTS = 12;

@Injectable({ providedIn: 'root' })
export class SearchService {
    private readonly assetsRoot = inject(DOCS_ASSETS_ROOT);
    private openSubject = new BehaviorSubject<boolean>(false);
    isOpen$ = this.openSubject.asObservable();
    private index$: Observable<IndexedDoc[]> | null = null;

    constructor(
        private docsService: DocsService,
        private http: HttpClient
    ) {}

    open(): void {
        this.openSubject.next(true);
    }

    close(): void {
        this.openSubject.next(false);
    }

    search(query: string): Observable<SearchResult[]> {
        const q = query.trim();
        if (!q) {
            return of([]);
        }
        return this.getIndex().pipe(map((docs) => rank(docs, q).slice(0, MAX_RESULTS)));
    }

    private getIndex(): Observable<IndexedDoc[]> {
        if (!this.index$) {
            this.index$ = this.docsService.getManifest().pipe(
                switchMap((manifest) => {
                    const fetches = manifest.applications.flatMap((app) =>
                        app.sections.flatMap((section) =>
                            section.docs.map((doc) => {
                                const base = app.dir ? `${this.assetsRoot}/${app.dir}` : this.assetsRoot;
                                return this.http.get(`${base}/${doc.path}`, { responseType: 'text' }).pipe(
                                    map(
                                        (markdown) =>
                                            ({
                                                appId: app.id,
                                                appName: app.name,
                                                docTitle: doc.title,
                                                docPath: doc.path,
                                                text: stripMarkdown(markdown)
                                            }) as IndexedDoc
                                    ),
                                    catchError(() => of(null as IndexedDoc | null))
                                );
                            })
                        )
                    );
                    if (!fetches.length) {
                        return of([] as IndexedDoc[]);
                    }
                    return forkJoin(fetches).pipe(
                        map((results) => results.filter((r): r is IndexedDoc => r !== null))
                    );
                }),
                shareReplay({ bufferSize: 1, refCount: false })
            );
        }
        return this.index$;
    }
}

function rank(docs: IndexedDoc[], query: string): SearchResult[] {
    const lq = query.toLowerCase();
    const results: SearchResult[] = [];
    for (const doc of docs) {
        const textLower = doc.text.toLowerCase();
        const titleLower = doc.docTitle.toLowerCase();
        const titleMatch = titleLower.includes(lq);
        const firstIdx = textLower.indexOf(lq);
        if (!titleMatch && firstIdx === -1) {
            continue;
        }
        let matchCount = 0;
        let idx = 0;
        while ((idx = textLower.indexOf(lq, idx)) !== -1) {
            matchCount++;
            idx += lq.length;
        }
        const excerpt = buildExcerpt(doc.text, query, firstIdx >= 0 ? firstIdx : 0);
        results.push({ appId: doc.appId, appName: doc.appName, docTitle: doc.docTitle, docPath: doc.docPath, excerpt, matchCount, titleMatch });
    }
    return results.sort((a, b) => {
        if (a.titleMatch !== b.titleMatch) {
            return a.titleMatch ? -1 : 1;
        }
        return b.matchCount - a.matchCount;
    });
}

function buildExcerpt(text: string, query: string, matchIdx: number): string {
    const start = Math.max(0, matchIdx - EXCERPT_RADIUS);
    const end = Math.min(text.length, matchIdx + query.length + EXCERPT_RADIUS);
    let snippet = text.slice(start, end);
    if (start > 0) snippet = '…' + snippet;
    if (end < text.length) snippet = snippet + '…';
    const escaped = escapeHtml(snippet);
    const escapedQuery = escapeRegExp(escapeHtml(query));
    return escaped.replace(new RegExp(escapedQuery, 'gi'), '<mark>$&</mark>');
}

function stripMarkdown(md: string): string {
    return md
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`[^`\n]+`/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/\*\*([^*\n]+)\*\*/g, '$1')
        .replace(/\*([^*\n]+)\*/g, '$1')
        .replace(/__([^_\n]+)__/g, '$1')
        .replace(/_([^_\n]+)_/g, '$1')
        .replace(/^[-*+]\s+/gm, '')
        .replace(/^\d+\.\s+/gm, '')
        .replace(/^>\s*/gm, '')
        .replace(/^\|.*$/gm, ' ')
        .replace(/^[-|: ]+$/gm, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
