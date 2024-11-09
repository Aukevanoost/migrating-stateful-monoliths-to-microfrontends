import { CacheOf, TCacheHandler } from "../models/cache";
import { MFEDiscoveryError } from "./discovery-error";
import { DiscoveryProps, TeamDiscoveryManifest } from "./discovery-manifest";

const fetchDiscovery = (discoveryManifestUrl: string, ctx: {cacheHandler: TCacheHandler<CacheOf<DiscoveryProps>>})
    : Promise<TeamDiscoveryManifest> => {
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

const verifyMicroFrontendsAvailable = (requested: Record<string, string[]>) => (manifest: TeamDiscoveryManifest): Promise<TeamDiscoveryManifest> => {
    Object.entries(requested).forEach(([team, mfe]) => {
        const availableMFE = Object.keys(manifest[team]!.microfrontends);
        mfe.forEach(reqMfe => {
            if(!availableMFE.includes(reqMfe)) Promise.reject(new MFEDiscoveryError(`Micro frontend not found in team '${team}', available: [${availableMFE.join(', ')}]`));
        });
    });
    return Promise.resolve(manifest);
}

const verifyEntryPointsAvailable = (requested: string[]) => (manifest: TeamDiscoveryManifest): Promise<TeamDiscoveryManifest> => {
    requested.forEach((team) => {
        if(!manifest[team]) Promise.reject(new MFEDiscoveryError(`Team '${team}' not found.`));
    });
    return Promise.resolve(manifest);
}

export {fetchDiscovery, verifyMicroFrontendsAvailable, verifyEntryPointsAvailable}