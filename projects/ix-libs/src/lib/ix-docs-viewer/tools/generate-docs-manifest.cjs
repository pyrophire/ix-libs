#!/usr/bin/env node
/**
 * Scans a markdown folder and generates a `manifest.json` file describing
 * all documented applications and their documents.
 *
 * Usage (from your project root):
 *   npx ix-doc-manifest [docs-root]
 *   node node_modules/@pyrophire/ix-libs/src/lib/ix-docs-viewer/tools/generate-docs-manifest.cjs [docs-root]
 *
 * [docs-root]  Path to the markdown assets folder.
 *              Defaults to `src/assets/markdown` relative to the current
 *              working directory.
 *
 * Add to package.json scripts for automatic generation before build/serve:
 *   "docs:manifest": "ix-doc-manifest",
 *   "prestart": "npm run docs:manifest",
 *   "prebuild": "npm run docs:manifest"
 *
 * Folder conventions:
 *   - Each top-level subfolder becomes one documented application.
 *   - Markdown files directly in the root are grouped as a "General" application.
 *   - Nested subfolders become sidebar sections (titles joined with ' / ').
 *   - A document's title is taken from its first `# heading`, else its filename.
 *   - The application landing doc is index.md, readme.md, or overview.md
 *     (first found), otherwise the first document alphabetically.
 *   - An optional `_meta.json` in any folder customises presentation:
 *       { "name": "...", "description": "...", "icon": "material_symbol", "order": 1 }
 */
const fs = require('fs');
const path = require('path');

const DOCS_ROOT = process.argv[2] ? path.resolve(process.argv[2]) : path.join(process.cwd(), 'src', 'assets', 'markdown');

const MANIFEST_PATH = path.join(DOCS_ROOT, 'manifest.json');
const HOME_CANDIDATES = ['index.md', 'readme.md', 'overview.md'];

function humanize(name) {
    return name
        .replace(/\.md$/i, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function readMeta(dir) {
    const metaPath = path.join(dir, '_meta.json');
    if (fs.existsSync(metaPath)) {
        try {
            return JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        } catch (err) {
            console.warn(`  ! Ignoring invalid _meta.json in ${dir}: ${err.message}`);
        }
    }
    return {};
}

function firstHeading(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : null;
}

function listMarkdownFiles(dir) {
    return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((e) => e.isFile() && /\.md$/i.test(e.name))
        .map((e) => e.name)
        .sort();
}

function listSubfolders(dir) {
    return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
        .sort();
}

function docEntry(absDir, appDir, fileName) {
    const filePath = path.join(absDir, fileName);
    const relPath = path.relative(appDir, filePath).split(path.sep).join('/');
    return {
        title: firstHeading(filePath) || humanize(fileName),
        path: relPath
    };
}

/**
 * Walks every directory under `dir` (inclusive) and writes a `_meta.json`
 * with humanized defaults wherever one does not already exist.
 * Returns the number of files created.
 */
function ensureMetaFiles(dir, isRoot) {
    let created = 0;
    const metaPath = path.join(dir, '_meta.json');

    if (!fs.existsSync(metaPath)) {
        const name = isRoot ? 'General' : humanize(path.basename(dir));
        const icon = isRoot ? 'folder' : 'description';
        // "image" is optional — set it to a relative path or absolute URL to show
        // a custom tile image on the docs landing page instead of the icon.
        const meta = { name, description: '', icon, order: 0 };
        fs.writeFileSync(metaPath, JSON.stringify(meta, null, 4) + '\n');
        console.log(`  CREATE ${path.relative(process.cwd(), metaPath)}`);
        created++;
    }

    for (const sub of listSubfolders(dir)) {
        created += ensureMetaFiles(path.join(dir, sub), false);
    }

    return created;
}

function collectSections(absDir, appDir, titleTrail) {
    const sections = [];
    const files = listMarkdownFiles(absDir);
    if (files.length) {
        const meta = readMeta(absDir);
        const title = titleTrail.length ? titleTrail.join(' / ') : meta.rootSectionTitle || 'Documents';
        sections.push({
            title,
            order: meta.order ?? 0,
            docs: files.map((f) => docEntry(absDir, appDir, f))
        });
    }
    for (const sub of listSubfolders(absDir)) {
        const subDir = path.join(absDir, sub);
        const subMeta = readMeta(subDir);
        sections.push(...collectSections(subDir, appDir, [...titleTrail, subMeta.name || humanize(sub)]));
    }
    return sections;
}

function pickHome(sections) {
    const allDocs = sections.flatMap((s) => s.docs);
    for (const candidate of HOME_CANDIDATES) {
        const found = allDocs.find((d) => d.path.toLowerCase() === candidate);
        if (found) {
            return found.path;
        }
    }
    return allDocs[0] ? allDocs[0].path : null;
}

function buildApplication(id, dir, absDir) {
    const meta = readMeta(absDir);
    const sections = collectSections(absDir, absDir, []).sort((a, b) => a.order - b.order);
    sections.forEach((s) => delete s.order);
    const home = pickHome(sections);
    if (!home) {
        return null;
    }
    const entry = {
        id,
        dir,
        name: meta.name || humanize(id),
        description: meta.description || '',
        icon: meta.icon || 'description',
        order: meta.order ?? 0,
        home,
        sections
    };
    if (meta.image) {
        entry.image = meta.image;
    }
    return entry;
}

function main() {
    if (!fs.existsSync(DOCS_ROOT)) {
        console.error(`Documentation root not found: ${DOCS_ROOT}`);
        console.error(`Usage: ix-doc-manifest [path/to/markdown/root]`);
        process.exit(1);
    }

    const metaCreated = ensureMetaFiles(DOCS_ROOT, true);

    const applications = [];

    const rootFiles = listMarkdownFiles(DOCS_ROOT);
    if (rootFiles.length) {
        const rootMeta = readMeta(DOCS_ROOT);
        const rootApp = {
            id: 'general',
            dir: '',
            name: rootMeta.name || 'General',
            description: rootMeta.description || '',
            icon: rootMeta.icon || 'folder',
            order: rootMeta.order ?? 0,
            home: pickHome([{ docs: rootFiles.map((f) => docEntry(DOCS_ROOT, DOCS_ROOT, f)) }]),
            sections: [{ title: 'Documents', docs: rootFiles.map((f) => docEntry(DOCS_ROOT, DOCS_ROOT, f)) }]
        };
        if (rootMeta.image) {
            rootApp.image = rootMeta.image;
        }
        applications.push(rootApp);
    }

    for (const folder of listSubfolders(DOCS_ROOT)) {
        const app = buildApplication(folder, folder, path.join(DOCS_ROOT, folder));
        if (app) {
            applications.push(app);
        }
    }

    applications.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
    applications.forEach((a) => delete a.order);

    const manifest = {
        generatedAt: new Date().toISOString(),
        applications
    };
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 4) + '\n');

    const docTotal = applications.reduce((sum, a) => sum + a.sections.reduce((s, sec) => s + sec.docs.length, 0), 0);
    if (metaCreated > 0) {
        console.log(`  Created ${metaCreated} _meta.json file(s) with default values — edit them to customise names, icons, and order.`);
    }
    console.log(`Docs manifest generated: ${applications.length} application(s), ${docTotal} document(s).`);
    console.log(`  Output: ${MANIFEST_PATH}`);
}

main();
