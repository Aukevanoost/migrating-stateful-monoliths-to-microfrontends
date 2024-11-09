import { CacheOf, DEFAULT_CACHE_ENTRY, toHandler } from "../cache"
import { initFederation } from "../init-federation"
import { NativeFederationProps, TCacheHandler } from "../models/cache"
import { fetchDiscovery, verifyEntryPointsAvailable } from "./discovery"
import { DiscoveryProps, TeamDiscoveryManifest } from "./discovery-manifest"

const getEntryPointUrls = (manifest: TeamDiscoveryManifest, mfeCollectionFilter?: string[]): Record<string, string> => {
    if(!mfeCollectionFilter) mfeCollectionFilter = Object.keys(manifest);

    return Object.entries(manifest)
        .filter(([collection,_]) => mfeCollectionFilter.includes(collection))
        .reduce((ngConfig, [collection,cfg]) => ({
            ...ngConfig, 
            [collection]: cfg.entryPoint
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
    o: {
        cacheHandler?: TCacheHandler<CacheOf<NativeFederationProps&DiscoveryProps>>,
        mfeCollectionFilter?: string[]
    } = {}
 ) => {
    const cacheHandler = loadCacheHandler(o.cacheHandler);

    return fetchDiscovery(discoveryManifestUrl, {cacheHandler})
        .then(verifyEntryPointsAvailable(o.mfeCollectionFilter ?? []))
        .then(manifest => {
            return initFederation(getEntryPointUrls(manifest, o.mfeCollectionFilter), {cacheHandler})
                .then(loader => ({loader, manifest}))
        })
}

export { initFederationWithDiscovery};