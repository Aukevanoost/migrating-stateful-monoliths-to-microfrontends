import * as esbuild from 'esbuild';
import * as path from 'path';
import * as fs from 'fs';

import { esBuildAdapter } from '@softarc/native-federation-esbuild';
import { federationBuilder } from '@softarc/native-federation/build';

export async function buildProject(projectName) {

    const tsConfig = 'tsconfig.json';
    const outputPath = `dist`;

    await federationBuilder.init({
        options: {
            workspaceRoot: path.join(__dirname, '..'),
            outputPath,
            tsConfig,
            federationConfig: `${projectName}/federation.config.js`,
            verbose: false,
        },
        adapter: esBuildAdapter
    });


    fs.rmSync(outputPath, { force: true, recursive: true });

    await esbuild.build({
        entryPoints: [`${projectName}/main.ts`],
        external: federationBuilder.externals,
        outdir: outputPath,
        bundle: true,
        platform: 'browser',
        format: 'esm',
        mainFields: ['es2020', 'browser', 'module', 'main'],
        conditions: ['es2020', 'es2015', 'module'],
        resolveExtensions: ['.ts', '.mjs', '.js'],
        tsconfig: tsConfig,
        splitting: true
    });

    fs.copyFileSync(`${projectName}/index.html`, `${outputPath}/index.html`);
    fs.copyFileSync(`${projectName}/favicon.ico`, `${outputPath}/favicon.ico`);
    fs.copyFileSync(`${projectName}/styles.css`, `${outputPath}/styles.css`);

    await federationBuilder.build();
}

buildProject('app');