import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocApplication, DocEntry, DocsManifest } from '../models/docs.model';
import { DOCS_ASSETS_ROOT } from '../tokens';

/**
 * Loads the documentation manifest and markdown content from the configured
 * assets root (default: `assets/markdown/`). The manifest is generated at
 * build time from the folder structure by `tools/generate-docs-manifest.js`.
 *
 * The manifest is fetched once and cached for the lifetime of the app;
 * markdown files are fetched on demand as the user navigates between docs.
 *
 * Override the assets root by providing `DOCS_ASSETS_ROOT` in your app config:
 * ```ts
 * { provide: DOCS_ASSETS_ROOT, useValue: 'assets/docs' }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class DocsService {
    private readonly assetsRoot = inject(DOCS_ASSETS_ROOT);
    private manifest$: Observable<DocsManifest>;

    constructor(private http: HttpClient) {
        this.manifest$ = this.http
            .get<DocsManifest>(`${this.assetsRoot}/manifest.json`)
            .pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }

    public getManifest(): Observable<DocsManifest> {
        return this.manifest$;
    }

    public getApplication(appId: string): Observable<DocApplication | undefined> {
        return this.manifest$.pipe(map((m) => m.applications.find((a) => a.id === appId)));
    }

    public getMarkdown(app: { dir: string }, docPath: string): Observable<string> {
        if (!docPath) {
            return of('');
        }
        const base = app.dir ? `${this.assetsRoot}/${app.dir}` : this.assetsRoot;
        return this.http.get(`${base}/${docPath}`, { responseType: 'text' });
    }

    public findEntry(app: DocApplication, docPath: string): DocEntry | undefined {
        for (const section of app.sections ?? []) {
            const match = section.docs.find((d) => this.normalize(d.path) === this.normalize(docPath));
            if (match) {
                return match;
            }
        }
        return undefined;
    }

    public normalize(path: string): string {
        return (path ?? '')
            .replace(/^\.\//, '')
            .replace(/\.md$/i, '')
            .toLowerCase();
    }

    public resolveRelativePath(currentDocPath: string, relativeLink: string): string {
        const baseDir = currentDocPath.includes('/')
            ? currentDocPath.slice(0, currentDocPath.lastIndexOf('/'))
            : '';
        const parts = (baseDir ? baseDir.split('/') : []).concat(relativeLink.split('/'));
        const resolved: string[] = [];
        for (const part of parts) {
            if (part === '' || part === '.') {
                continue;
            }
            if (part === '..') {
                resolved.pop();
            } else {
                resolved.push(part);
            }
        }
        return resolved.join('/');
    }
}
