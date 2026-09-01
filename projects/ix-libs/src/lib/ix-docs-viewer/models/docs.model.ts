/** A single markdown document. */
export interface DocEntry {
    /** Display title (first `# heading` of the file, or humanized filename). */
    title: string;

    /**
     * Path to the markdown file, relative to the application's folder.
     * May include subfolders, e.g. `admin/user-roles.md`.
     */
    path: string;
}

/** A group of documents derived from one subfolder. */
export interface DocSection {
    title: string;
    docs: DocEntry[];
}

/** One documented application: a top-level folder under the assets markdown root. */
export interface DocApplication {
    /** URL-safe identifier used in routes (the folder name). */
    id: string;
    /** Folder path relative to the markdown root ('' for root-level docs). */
    dir: string;
    name: string;
    description?: string;
    /** Material symbol name for display. */
    icon?: string;
    /**
     * Optional image path for the landing-page tile.
     * Relative paths are resolved against the configured assets root URL;
     * absolute URLs (http/https) are used as-is.
     */
    image?: string;
    /** Path (relative to the app folder) of the doc shown at the application root route. */
    home: string;
    sections: DocSection[];
}

/** Root shape of the generated `manifest.json`. */
export interface DocsManifest {
    generatedAt?: string;
    applications: DocApplication[];
}

/** A document indexed for full-text search. */
export interface IndexedDoc {
    appId: string;
    appName: string;
    docTitle: string;
    docPath: string;
    /** Markdown stripped to plain text, used for searching. */
    text: string;
}

/** One search result returned by SearchService. */
export interface SearchResult {
    appId: string;
    appName: string;
    docTitle: string;
    docPath: string;
    /** HTML snippet with the matched term wrapped in &lt;mark&gt;. */
    excerpt: string;
    matchCount: number;
    titleMatch: boolean;
}

/** One entry in the rendered document's table-of-contents panel. */
export interface TocItem {
    /** Element id of the heading this bookmark scrolls to. */
    id: string;
    /** Visible heading text. */
    label: string;
    /** Heading level (1–4) used for indentation. */
    level: number;
}
