import * as esbuild from "esbuild";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CONFIG = {
  srcDir: 'src',
  outDir: 'dist',
  entryPoints: ['loader-from-discovery.js', 'loader.js'],
  staticFiles: ['index.html']
};

async function cleanDirectory(dir) {
  fs.rmSync(dir, { force: true, recursive: true });
  fs.mkdirSync(dir, { recursive: true });
}

async function copyStaticFiles(srcDir, outDir, files) {
  for (const file of files) {
    fs.copyFileSync(
      path.join(srcDir, file),
      path.join(outDir, file)
    );
  }
}

async function buildShims() {
  const shimsConfig = {
    stdin: {
      contents: `import 'es-module-shims'`,
      resolveDir: process.cwd(),
    },
    outfile: path.join(__dirname, CONFIG.outDir, 'es-module-shims.js'),
    bundle: true,
    platform: "browser",
    format: "esm",
    mainFields: ["es2022", "browser", "module", "main"],
    conditions: ["es2022", "es2015", "module"],
    resolveExtensions: [".js", ".mjs"],
    splitting: false,
    logLevel: "info",
    minify: true,
    sourcemap: true,
    target: ['es2022'],
    treeShaking: true,
  };

  return esbuild.build(shimsConfig);
}

async function build() {
  try {
    const srcDir = path.join(__dirname, CONFIG.srcDir);
    const outDir = path.join(__dirname, CONFIG.outDir);

    await cleanDirectory(outDir);
    await copyStaticFiles(srcDir, outDir, CONFIG.staticFiles);

    const buildConfig = {
      entryPoints: CONFIG.entryPoints.map(entry => path.join(srcDir, entry)),
      outdir: outDir,
      bundle: true,
      platform: "browser",
      format: "esm",
      mainFields: ["es2022", "browser", "module", "main"],
      conditions: ["es2022", "es2015", "module"],
      resolveExtensions: [".js", ".mjs"],
      splitting: false,
      logLevel: "info",
      minify: true,        
      sourcemap: true,      
      metafile: true,        
      target: ['es2022'],    
      loader: {             
        '.js': 'jsx',
        '.mjs': 'jsx'
      },
      treeShaking: true,
      external: ['es-module-shims'], // Exclude es-module-shims from main bundles
    };

    // Build main files
    const result = await esbuild.build(buildConfig);

    // Build separate es-module-shims bundle
    await buildShims();

    // Log build analytics
    const text = await esbuild.analyzeMetafile(result.metafile);
    console.log('\nBuild Analytics:\n' + text);

    console.log('\nBuild completed successfully! 🎉');
    console.log(`Output directory: ${outDir}`);

  } catch (error) {
    console.error("\nBuild failed:", error);
    process.exit(1);
  } finally {
    await esbuild.stop();
  }
}

process.on('SIGINT', async () => {
  console.log('\nBuild interrupted');
  await esbuild.stop();
  process.exit(0);
});

build();