import { CacheOf, TCacheHandler } from "../models/cache";
import { MFEDiscoveryError } from "./discovery-error";
import { DiscoveryProps, MfeDiscoveryManifest } from "./discovery-manifest";

const fetchDiscovery = (discoveryManifestUrl: string, ctx: {cacheHandler: TCacheHandler<CacheOf<DiscoveryProps>>})
    : Promise<MfeDiscoveryManifest> => {
    const cachedDiscovery = ctx.cacheHandler.entry("discovery")
    const mfe_discovery_manifest = 
        (cachedDiscovery.exists())
            ? Promise.resolve(cachedDiscovery.get()) 
            : fetch(discoveryManifestUrl).then(r => r.json());

    return mfe_discovery_manifest
        .then(r => {
            cachedDiscovery.set(r);
            return r;
        })
}


const verifyMicroFrontendsAvailable = (requested: Record<string, string|"latest">) => (manifest: MfeDiscoveryManifest): Promise<MfeDiscoveryManifest> => {
    Object
        .entries(requested)
        .forEach(([mfeName, version]) => {
            if(!manifest.microFrontends[mfeName] || manifest.microFrontends[mfeName].length < 1) 
                Promise.reject(new MFEDiscoveryError(`Micro frontend '${mfeName}' not found`))
            
            if(version !== "latest" && !manifest.microFrontends[mfeName].some(m => m.metadata.version === version)){
                const availableVersions = manifest.microFrontends[mfeName].map(m => m.metadata.version);
                Promise.reject(new MFEDiscoveryError(`Micro frontend '${mfeName}' version '${version}' not found, available: [${availableVersions.join(', ')}]`))
            }
        });
    return Promise.resolve(manifest);
}

export {fetchDiscovery, verifyMicroFrontendsAvailable}