import { cacheHandlerFactory, TCacheHandler } from "../cache/cache.handler";
import { CacheOf } from "../cache/cache.contract";
import { DiscoveryProps, MfeDiscoveryManifest } from "./discovery.contract";

type TDiscoveryHandler = {
    fetchDiscovery: (discoveryManifestUrl: string) => Promise<MfeDiscoveryManifest>
}

const discoveryHandlerFactory = (
    cacheHandler: TCacheHandler<CacheOf<DiscoveryProps>>
): TDiscoveryHandler => {
    const fetchDiscovery = (discoveryManifestUrl: string)
        : Promise<MfeDiscoveryManifest> => {
        const cachedDiscovery = cacheHandler.entry("discovery")
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
    return {fetchDiscovery};
}

export {discoveryHandlerFactory, TDiscoveryHandler}