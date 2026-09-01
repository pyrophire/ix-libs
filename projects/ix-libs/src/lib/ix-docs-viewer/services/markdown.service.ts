import { Injectable } from '@angular/core';
import { marked, Renderer } from 'marked';
import { TocItem } from '../models/docs.model';

/**
 * Renders markdown to HTML and post-processes the result for the doc viewer:
 * assigns stable slug ids to headings (for TOC links) and extracts the
 * table of contents from the rendered document.
 *
 * Relative image paths are rewritten at render time so they resolve against
 * the correct assets folder rather than the Angular route URL.
 */
@Injectable({ providedIn: 'root' })
export class MarkdownService {
    constructor() {
        marked.setOptions({ gfm: true, breaks: false });
    }

    /**
     * Renders markdown to an HTML string.
     *
     * @param markdown  Raw markdown content.
     * @param appDir    Application folder name within the assets root.
     * @param docPath   Path of the document within the app folder.
     * @param assetsRoot  Base assets URL (e.g. `assets/markdown`).
     */
    public render(markdown: string, appDir = '', docPath = '', assetsRoot = 'assets/markdown'): string {
        const renderer = new Renderer();
        const self = this;

        renderer.image = ({ href, title, text }) => {
            const resolvedHref = self.resolveAssetHref(href, appDir, docPath, assetsRoot);
            const titleAttr = title ? ` title="${escapeAttr(title)}"` : '';
            return `<img src="${escapeAttr(resolvedHref)}" alt="${escapeAttr(text)}"${titleAttr} loading="lazy">`;
        };

        // Add scope="col" to table header cells (WCAG 2.2 AA — 1.3.1).
        const origTablecell = renderer.tablecell.bind(renderer);
        renderer.tablecell = (token) => {
            const html = origTablecell(token);
            if (!token.header) {
                return html;
            }
            return html.replace(/^<th(\s|>)/, '<th scope="col"$1');
        };

        return marked.parse(markdown ?? '', { async: false, renderer }) as string;
    }

    public resolveAssetHref(href: string, appDir: string, docPath: string, assetsRoot = 'assets/markdown'): string {
        if (!href) {
            return href;
        }
        if (/^(https?:|data:|\/\/)/i.test(href)) {
            return href;
        }
        if (href.startsWith('/')) {
            return href;
        }
        const docDir = docPath.includes('/') ? docPath.slice(0, docPath.lastIndexOf('/')) : '';
        const parts = (docDir ? docDir.split('/') : []).concat(href.split('/'));
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
        const base = appDir ? `${assetsRoot}/${appDir}` : assetsRoot;
        return `${base}/${resolved.join('/')}`;
    }

    public buildToc(container: HTMLElement): TocItem[] {
        const toc: TocItem[] = [];
        const seen = new Map<string, number>();
        const headings = container.querySelectorAll<HTMLElement>('h1, h2, h3, h4');
        headings.forEach((heading) => {
            const label = (heading.textContent ?? '').trim();
            let id = this.slugify(label);
            const count = seen.get(id) ?? 0;
            seen.set(id, count + 1);
            if (count > 0) {
                id = `${id}-${count}`;
            }
            heading.id = id;
            toc.push({ id, label, level: Number(heading.tagName.substring(1)) });
        });
        return toc;
    }

    public slugify(text: string): string {
        return (text ?? '')
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }
}

function escapeAttr(s: string): string {
    return (s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
