import { TCacheHandler } from "../cache/cache.handler";
import { CacheOf } from "../cache/cache.contract";
import { AvailableRemoteModules, DiscoveryProps, MfeDiscoveryManifest } from "./discovery.contract";

type TDiscoveryHandler = {
    fetchDiscovery: (discoveryManifestUrl: string) => Promise<AvailableRemoteModules>
}

const discoveryHandlerFactory = (
    cacheHandler: TCacheHandler<CacheOf<DiscoveryProps>>
): TDiscoveryHandler => {

    const addAvailableModulesToCache = (modules: AvailableRemoteModules) => {
        cacheHandler.entry("discovery").set(modules); 
        return modules; 
    }

    const fetchDiscovery = (discoveryManifestUrl: string)
        : Promise<AvailableRemoteModules> => {
        const cachedDiscovery = cacheHandler.entry("discovery")

        if(cachedDiscovery.exists()) 
            return Promise.resolve(cachedDiscovery.get());


        return fetch(discoveryManifestUrl)
            .then(r => r.json() as unknown as MfeDiscoveryManifest)
            .then(manifest => manifest.microFrontends)
            .then(addAvailableModulesToCache);
    }
    return {fetchDiscovery};
}

export {discoveryHandlerFactory, TDiscoveryHandler}