import * as esbuild from "esbuild";
import * as path from "path";
import * as fs from "fs";

import { esBuildAdapter } from "@softarc/native-federation-esbuild";
import { federationBuilder } from "@softarc/native-federation/build";

(async () => {
    await federationBuilder.init({
        options: {
            workspaceRoot: path.join(__dirname, ".."),
            outputPath: "dist",
            tsConfig: "tsconfig.json",
            federationConfig: "app/federation.config.js",
            verbose: false,
        },
        adapter: esBuildAdapter
    });


    fs.rmSync("dist", { force: true, recursive: true });

    await esbuild.build({
        entryPoints: [
            "app/loader-with-discovery.ts",
            "app/loader.ts",
        ],
        external: federationBuilder.externals,
        outdir: "dist",
        bundle: true,
        platform: "browser",
        format: "esm",
        mainFields: ["es2020", "browser", "module", "main"],
        conditions: ["es2020", "es2015", "module"],
        resolveExtensions: [".ts", ".mjs", ".js"],
        tsconfig: "tsconfig.json",
        splitting: false
    });

    fs.copyFileSync("app/index.html", "dist/index.html");

    await federationBuilder.build();
})()