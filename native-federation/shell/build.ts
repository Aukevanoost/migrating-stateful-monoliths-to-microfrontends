import * as esbuild from "esbuild";
import * as fs from "fs";
import * as path from "path";

async function build() {
    try {
        const projectRoot = path.join(__dirname, '..');
        
        fs.rmSync(path.join(projectRoot, "dist"), { force: true, recursive: true });
        fs.mkdirSync(path.join(projectRoot, "dist"), { recursive: true });
        fs.copyFileSync(
            path.join(projectRoot, "app", "index.html"),
            path.join(projectRoot, "dist", "index.html")
        );
        fs.copyFileSync(
            path.join(projectRoot, "app", "remoteEntry.json"),
            path.join(projectRoot, "dist", "remoteEntry.json")
        );
        const result = await esbuild.build({
            entryPoints: [
                "app/loader-with-discovery.ts",
                "app/loader.ts",
            ],
            
            outdir: path.join(projectRoot, "dist"),
            bundle: true,
            platform: "browser",
            format: "esm",
            mainFields: ["es2020", "browser", "module", "main"],
            conditions: ["es2020", "es2015", "module"],
            resolveExtensions: [".ts", ".mjs", ".js"],
            tsconfig: path.join(projectRoot, "tsconfig.json"),
            splitting: false,
            logLevel: "info",
        });

        console.log("Build completed:", result);
    } catch (error) {
        console.error("Build failed:", error);
        process.exit(1);
    }
}

build();