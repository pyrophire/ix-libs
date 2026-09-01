import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
import { DocApplication } from '../../models/docs.model';
import { DocsService } from '../../services/docs.service';
import { SearchService } from '../../services/search.service';
import { DOCS_ASSETS_ROOT, DOCS_BASE_ROUTE } from '../../tokens';
import { DocSearchComponent } from '../doc-search/doc-search.component';

/**
 * Landing page that lists all documented applications as a tile grid.
 *
 * Place at the root docs route so users get an overview before drilling
 * into a specific application. Includes the search overlay — no need to
 * add `<ix-doc-search>` separately when this component is in use.
 *
 * Each application tile shows:
 *  - A custom image when `image` is set in the app's `_meta.json`
 *  - The Material symbol `icon` (default `description`) otherwise
 *  - `name` and optional `description`
 *
 * Clicking a tile navigates to `/<docsBaseRoute>/<appId>`.
 */
@Component({
    selector: 'ix-doc-landing',
    templateUrl: './doc-landing.component.html',
    styleUrls: ['./doc-landing.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        DocSearchComponent,
    ],
})
export class DocLandingComponent {
    /** Heading shown at the top of the landing page. */
    @Input() heading = 'Documentation';

    readonly applications$ = inject(DocsService)
        .getManifest()
        .pipe(map((m) => m.applications));

    readonly baseRoute = inject(DOCS_BASE_ROUTE);

    private readonly assetsRoot = inject(DOCS_ASSETS_ROOT);
    private readonly searchService = inject(SearchService);

    resolveImage(app: DocApplication): string | null {
        if (!app.image) return null;
        if (/^https?:\/\//i.test(app.image)) return app.image;
        const base = app.dir ? `${this.assetsRoot}/${app.dir}` : this.assetsRoot;
        return `${base}/${app.image}`;
    }

    openSearch(): void {
        this.searchService.open();
    }
}
