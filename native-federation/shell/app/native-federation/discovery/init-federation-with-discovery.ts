import { CacheOf, DEFAULT_CACHE_ENTRY, toHandler } from "../cache"
import { initFederation } from "../init-federation"
import { NativeFederationProps, TCacheHandler } from "../models/cache"
import { fetchDiscovery, verifyMicroFrontendsAvailable } from "./discovery"
import { DiscoveryProps, MfeDiscoveryManifest, MicroFrontendVersion } from "./discovery-manifest"

const setVersions = (requested: string[]|Record<string, string|"latest">): Record<string, string|"latest">  => {
    if(!Array.isArray(requested)) return requested;
    return requested.reduce((acc, r) => ({...acc, [r]: "latest"}), {});
}

const getEntryPointUrls = (manifest: MfeDiscoveryManifest, mfeFilter?: Record<string, string|"latest">): Record<string, string> => {
    if(!mfeFilter) mfeFilter = setVersions(Object.keys(manifest));

    return Object.entries(mfeFilter)
        .map(([mfe, version]) => ([mfe, manifest.microFrontends[mfe].find(m => version === "latest" || version === m.metadata.version)]))
        .reduce((nfConfig, [mfe,cfg]: [string, MicroFrontendVersion]) => ({
            ...nfConfig, 
            [mfe]: cfg.extras.nativefederation.remoteEntry
        }), {})
}

const loadCacheHandler = (handler?: TCacheHandler<CacheOf<NativeFederationProps&DiscoveryProps>>) => {
    return handler ?? toHandler({
            externals: {},
            remoteNamesToRemote: {},
            baseUrlToRemoteNames: {},
            discovery: {}
        } as NativeFederationProps&DiscoveryProps, DEFAULT_CACHE_ENTRY)
    }

const initFederationWithDiscovery = (
    discoveryManifestUrl: string,
    microfrontends: string[]|Record<string,string|"latest"> = [],
    o: {
        cacheHandler?: TCacheHandler<CacheOf<NativeFederationProps&DiscoveryProps>>, 
    } = {}
 ) => {
    const cacheHandler = loadCacheHandler(o.cacheHandler);
    const requestedMFE = setVersions(microfrontends ?? {});

    return fetchDiscovery(discoveryManifestUrl, {cacheHandler})
        .then(verifyMicroFrontendsAvailable(requestedMFE))
        .then(manifest => {
            return initFederation(getEntryPointUrls(manifest, requestedMFE), {cacheHandler})
                .then(loader => ({loader, manifest}))
        })
}

export { initFederationWithDiscovery};