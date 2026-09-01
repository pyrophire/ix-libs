import { chain, Rule, SchematicsException, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readWorkspace(tree: Tree): Record<string, any> {
    const raw = tree.read('angular.json');
    if (!raw) {
        throw new SchematicsException('Could not find angular.json in the workspace root.');
    }
    return JSON.parse(raw.toString('utf-8'));
}

function resolveProjectSourceRoot(workspace: Record<string, any>, projectName: string): string {
    const project = workspace.projects[projectName];
    if (!project) {
        throw new SchematicsException(`Project "${projectName}" was not found in angular.json.`);
    }
    return (project.sourceRoot as string | undefined) ?? `${project.root}/src`;
}

function resolveProject(workspace: Record<string, any>, options: Schema): string {
    const name =
        options.project ??
        (workspace.defaultProject as string | undefined) ??
        Object.keys(workspace.projects)[0];
    if (!name) {
        throw new SchematicsException('No Angular project found in angular.json.');
    }
    return name;
}

// ─── Step 1: Create sample markdown assets ───────────────────────────────────

function createSampleAssets(sourceRoot: string, options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const markdownRoot = `${sourceRoot}/${options.assetsRoot}`;

        if (!tree.exists(`${markdownRoot}/index.md`)) {
            tree.create(
                `${markdownRoot}/index.md`,
                [
                    '# Welcome to the Docs Viewer',
                    '',
                    'This is your documentation home page.',
                    'Add your own markdown files to `' + options.assetsRoot + '/` and run:',
                    '',
                    '```bash',
                    'npm run docs:manifest',
                    '```',
                    '',
                    'The manifest is regenerated automatically before `npm start` and `npm run build`',
                    'once you add the `pre` scripts shown in the setup instructions.',
                    '',
                ].join('\n')
            );
            context.logger.info(`  CREATE ${markdownRoot}/index.md`);
        } else {
            context.logger.info(`  SKIP   ${markdownRoot}/index.md (already exists)`);
        }

        const sampleDir = `${markdownRoot}/getting-started`;
        if (!tree.exists(`${sampleDir}/overview.md`)) {
            tree.create(
                `${sampleDir}/overview.md`,
                [
                    '# Getting Started',
                    '',
                    '## Folder structure',
                    '',
                    'Each **top-level subfolder** under `' + options.assetsRoot + '/` becomes a documented',
                    'application in the sidebar. Markdown files within are grouped into sections.',
                    '',
                    '```',
                    options.assetsRoot + '/',
                    '├── index.md            ← home page',
                    '├── getting-started/',
                    '│   ├── _meta.json      ← optional: name, icon, order',
                    '│   └── overview.md     ← this file',
                    '└── my-feature/',
                    '    ├── _meta.json',
                    '    └── guide.md',
                    '```',
                    '',
                    '## Regenerating the manifest',
                    '',
                    'Run `npm run docs:manifest` any time you add, rename, or remove a markdown file.',
                    '',
                ].join('\n')
            );

            tree.create(
                `${sampleDir}/_meta.json`,
                JSON.stringify({ name: 'Getting Started', icon: 'rocket_launch', order: 1 }, null, 2) + '\n'
            );
            context.logger.info(`  CREATE ${sampleDir}/overview.md`);
            context.logger.info(`  CREATE ${sampleDir}/_meta.json`);
        }

        return tree;
    };
}

// ─── Step 2: Add docs:manifest script ────────────────────────────────────────

function addManifestScript(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const pkgBuffer = tree.read('package.json');
        if (!pkgBuffer) {
            context.logger.warn('  SKIP   package.json not found — add "docs:manifest" script manually.');
            return tree;
        }

        const pkg = JSON.parse(pkgBuffer.toString('utf-8'));
        pkg.scripts = pkg.scripts ?? {};

        if (pkg.scripts['docs:manifest']) {
            context.logger.info('  SKIP   docs:manifest script already exists in package.json');
            return tree;
        }

        const arg = options.assetsRoot !== 'assets/markdown' ? ` src/${options.assetsRoot}` : '';
        pkg.scripts['docs:manifest'] = `ix-doc-manifest${arg}`;

        tree.overwrite('package.json', JSON.stringify(pkg, null, 2) + '\n');
        context.logger.info('  UPDATE package.json (added docs:manifest script)');
        return tree;
    };
}

// ─── Step 3a: Create the docs route shell component ──────────────────────────

function createDocsShell(sourceRoot: string, options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        if (options.skipRoute) return tree;

        const routePath = options.docsBaseRoute.replace(/^\//, '');
        const shellDir = `${sourceRoot}/app/docs`;
        const shellFile = `${shellDir}/docs-shell.component.ts`;

        if (tree.exists(shellFile)) {
            context.logger.info(`  SKIP   ${shellFile} (already exists)`);
            return tree;
        }

        tree.create(
            shellFile,
            [
                `import { ChangeDetectionStrategy, Component } from '@angular/core';`,
                `import { RouterOutlet } from '@angular/router';`,
                ``,
                `@Component({`,
                `  selector: 'app-${routePath}-shell',`,
                `  template: '<router-outlet></router-outlet>',`,
                `  changeDetection: ChangeDetectionStrategy.OnPush,`,
                `  imports: [RouterOutlet],`,
                `})`,
                `export class DocsShellComponent {}`,
                ``,
            ].join('\n')
        );
        context.logger.info(`  CREATE ${shellFile}`);
        return tree;
    };
}

// ─── Step 3b: Inject lazy route into app.routes.ts ───────────────────────────

function addDocsRoute(sourceRoot: string, options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        if (options.skipRoute) {
            context.logger.info('  SKIP   route injection (--skip-route)');
            return tree;
        }

        const routeFile = `${sourceRoot}/app/app.routes.ts`;
        if (!tree.exists(routeFile)) {
            context.logger.warn(`  SKIP   ${routeFile} not found — add the route manually (see instructions below).`);
            return tree;
        }

        let content = tree.read(routeFile)!.toString('utf-8');
        const routePath = options.docsBaseRoute.replace(/^\//, '');

        if (content.includes(`path: '${routePath}'`) || content.includes(`path: "${routePath}"`)) {
            context.logger.info(`  SKIP   route "${routePath}" already present in ${routeFile}`);
            return tree;
        }

        // DocsShellComponent provides the <router-outlet> the child route needs.
        // DocViewerComponent cannot act as a parent — it has no router outlet of
        // its own, so mounting it as both parent and child blocks the child from
        // rendering. The empty-path redirect ensures bare /docs always delivers
        // an app ID (segments[0]) to the viewer.
        const shellImport = `import { DocsShellComponent } from './docs/docs-shell.component';`;
        const routeEntry = [
            `  {`,
            `    path: '${routePath}',`,
            `    component: DocsShellComponent,`,
            `    children: [`,
            `      {`,
            `        path: '',`,
            `        loadComponent: () =>`,
            `          import('@pyrophire/ix-libs').then(m => m.DocLandingComponent),`,
            `      },`,
            `      {`,
            `        path: '**',`,
            `        loadComponent: () =>`,
            `          import('@pyrophire/ix-libs').then(m => m.DocViewerComponent),`,
            `      },`,
            `    ],`,
            `  },`,
        ].join('\n');

        // Prepend the shell import if not already present.
        if (!content.includes('docs-shell.component')) {
            content = shellImport + '\n' + content;
        }

        // Match: export const routes: Routes = [...];
        // Handles both empty and non-empty arrays.
        const updated = content.replace(
            /(export\s+const\s+routes\s*:\s*Routes\s*=\s*\[)([\s\S]*?)(\s*\];)/,
            (_match, open, middle, close) => {
                const trimmed = middle.trim();
                if (trimmed === '') {
                    return `${open}\n${routeEntry}\n${close}`;
                }
                const sep = trimmed.endsWith(',') ? '\n' : ',\n';
                return `${open}${middle}${sep}${routeEntry}\n${close}`;
            }
        );

        if (updated === content) {
            context.logger.warn(
                `  WARN   Could not parse ${routeFile}. Add the route manually (see instructions below).`
            );
            return tree;
        }

        tree.overwrite(routeFile, updated);
        context.logger.info(`  UPDATE ${routeFile} (added ${routePath} route with DocsShellComponent)`);
        return tree;
    };
}

// ─── Step 4: Log setup instructions ──────────────────────────────────────────

function logSetupInstructions(options: Schema): Rule {
    return (_tree: Tree, context: SchematicContext) => {
        const route = options.docsBaseRoute.replace(/^\//, '');
        const useDefaultAssets = options.assetsRoot === 'assets/markdown';
        const useDefaultRoute = options.docsBaseRoute === 'docs' || options.docsBaseRoute === '/docs';
        const useDefaultTitle = options.titleSuffix === 'Documentation';

        const tokenProviders: string[] = ['provideHttpClient()'];
        if (!useDefaultAssets) {
            tokenProviders.push(`{ provide: DOCS_ASSETS_ROOT, useValue: '${options.assetsRoot}' }`);
        }
        if (!useDefaultRoute) {
            tokenProviders.push(`{ provide: DOCS_BASE_ROUTE, useValue: '/${route}' }`);
        }
        if (!useDefaultTitle) {
            tokenProviders.push(`{ provide: DOCS_TITLE_SUFFIX, useValue: '${options.titleSuffix}' }`);
        }

        const hasCustomTokens = tokenProviders.length > 1;
        const imports = hasCustomTokens
            ? `import { provideHttpClient } from '@angular/common/http';\nimport { DOCS_ASSETS_ROOT, DOCS_BASE_ROUTE, DOCS_TITLE_SUFFIX } from '@pyrophire/ix-libs';`
            : `import { provideHttpClient } from '@angular/common/http';`;

        const border = '─'.repeat(60);

        context.logger.info('');
        context.logger.info(`┌${border}┐`);
        context.logger.info(`│  ix-docs-viewer — setup complete!${' '.repeat(60 - 35)}│`);
        context.logger.info(`└${border}┘`);
        context.logger.info('');
        context.logger.info('╔══ 1. Configure providers in app.config.ts ══════════════╗');
        context.logger.info('');
        context.logger.info(imports);
        context.logger.info('');
        context.logger.info('providers: [');
        for (const p of tokenProviders) {
            context.logger.info(`  ${p},`);
        }
        context.logger.info(']');
        context.logger.info('');
        context.logger.info('╔══ 2. Auto-generate the manifest ════════════════════════╗');
        context.logger.info('');
        context.logger.info('Add pre-scripts to package.json so the manifest is always');
        context.logger.info('up to date before you serve or build:');
        context.logger.info('');
        context.logger.info('"prestart": "npm run docs:manifest",');
        context.logger.info('"prebuild": "npm run docs:manifest"');
        context.logger.info('');
        context.logger.info('╔══ 3. Manual route (if injection was skipped) ═══════════╗');
        context.logger.info('');
        context.logger.info('Create src/app/docs/docs-shell.component.ts:');
        context.logger.info('');
        context.logger.info(`  import { ChangeDetectionStrategy, Component } from '@angular/core';`);
        context.logger.info(`  import { RouterOutlet } from '@angular/router';`);
        context.logger.info(`  @Component({ selector: 'app-${route}-shell',`);
        context.logger.info(`    template: '<router-outlet></router-outlet>',`);
        context.logger.info(`    changeDetection: ChangeDetectionStrategy.OnPush,`);
        context.logger.info(`    imports: [RouterOutlet] })`);
        context.logger.info(`  export class DocsShellComponent {}`);
        context.logger.info('');
        context.logger.info('Then in app.routes.ts:');
        context.logger.info('');
        context.logger.info(`  // DocViewerComponent has no <router-outlet>, so it cannot be the`);
        context.logger.info(`  // parent route. DocsShellComponent provides the outlet instead.`);
        context.logger.info(`  {`);
        context.logger.info(`    path: '${route}',`);
        context.logger.info(`    component: DocsShellComponent,`);
        context.logger.info(`    children: [`);
        context.logger.info(`      { path: '', loadComponent: () => import('@pyrophire/ix-libs').then(m => m.DocLandingComponent) },`);
        context.logger.info(`      { path: '**', loadComponent: () => import('@pyrophire/ix-libs').then(m => m.DocViewerComponent) },`);
        context.logger.info(`    ],`);
        context.logger.info(`  }`);
        context.logger.info('');
        context.logger.info('╔══ 4. Customise the doc page (optional) ═════════════════╗');
        context.logger.info('');
        context.logger.info('Pass [homeRoute]="/home" to the <ix-doc-viewer> to control');
        context.logger.info('where the "Back to Home" button navigates on a 404.');
        context.logger.info('');
        context.logger.info(`✔  Navigate to /${route} in your app to see the viewer.`);
        context.logger.info('');
    };
}

// ─── Entry point ─────────────────────────────────────────────────────────────

export function ngAdd(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        // Apply schema defaults for options not supplied via prompts
        options.docsBaseRoute = (options.docsBaseRoute ?? 'docs').replace(/^\//, '');
        options.assetsRoot = options.assetsRoot ?? 'assets/markdown';
        options.titleSuffix = options.titleSuffix ?? 'Documentation';
        options.skipRoute = options.skipRoute ?? false;

        const workspace = readWorkspace(tree);
        const projectName = resolveProject(workspace, options);
        const sourceRoot = resolveProjectSourceRoot(workspace, projectName);

        context.logger.info(`\nConfiguring ix-docs-viewer for project "${projectName}"…\n`);

        return chain([
            createSampleAssets(sourceRoot, options),
            addManifestScript(options),
            createDocsShell(sourceRoot, options),
            addDocsRoute(sourceRoot, options),
            logSetupInstructions(options),
        ]);
    };
}
