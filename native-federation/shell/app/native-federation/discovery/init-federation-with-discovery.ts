import { cacheHandlerFactory, toCache } from "../cache/cache.handler"
import { federationInitializerFactory, TFederationInitializer } from "../init-federation"
import { MfeDiscoveryManifest, DiscoveredRemoteModule, DiscoveryCache } from "./discovery.contract"
import { DEFAULT_CACHE } from "../cache"
import { globalCacheEntry } from "../cache/global-cache"
import { ImportMap } from "../import-map/import-map.contract"
import { TLoadRemoteModule } from "../load-remote-module"
import { dependencyHandlerFactory } from "../dependency/dependency.handler"
import { remoteInfoHandlerFactory } from "../remote-info/remote-info.handler"
import { importMapHandlerFactory } from "../import-map/import-map.handler"
import { discoveryHandlerFactory, TDiscoveryHandler } from "./discovery.handler"
import { verifyRequestedModules } from "./verify-requested-modules"
import { NativeFederationCache } from "../cache/cache.contract"
import { discoveryResolver } from "../resolver"

type TInitFederationWithDiscovery = (
    discoveryManifestUrl: string,
    microfrontends: string[]|Record<string,string|"latest">
) => Promise<{load: TLoadRemoteModule, manifest: MfeDiscoveryManifest, importMap: ImportMap}>

type DiscoveryFederationInitializerFactory = {
    init: TInitFederationWithDiscovery
}

const initFederationWithDiscoveryFactory = (
    federationInitializer: TFederationInitializer,
    discoveryHandler: TDiscoveryHandler,
): DiscoveryFederationInitializerFactory => {
    const setVersions = (requested: string[]|Record<string, string|"latest">): Record<string, string|"latest">  => {
        if(!Array.isArray(requested)) return requested;
        return requested.reduce((acc, r) => ({...acc, [r]: "latest"}), {});
    }

    const getEntryPointUrls = (manifest: MfeDiscoveryManifest, mfeFilter?: Record<string, string|"latest">): Record<string, string> => {
        if(!mfeFilter) mfeFilter = setVersions(Object.keys(manifest));
    
        return Object.entries(mfeFilter)
            .map(([mfe, version]) => ([mfe, manifest.microFrontends[mfe].find(m => version === "latest" || version === m.metadata.version)]))
            .reduce((nfConfig, [mfe,cfg]: [string, DiscoveredRemoteModule]) => ({
                ...nfConfig, 
                [mfe]: cfg.extras.nativefederation.remoteEntry
            }), {})
    }

    const init = (
        discoveryManifestUrl: string,
        microfrontends: string[]|Record<string,string|"latest"> = []
     ) => {
        const requestedMFE = setVersions(microfrontends ?? {});
    
        return discoveryHandler.fetchDiscovery(discoveryManifestUrl)
            .then(verifyRequestedModules(requestedMFE))
            .then(manifest => {
                const entryPoints = getEntryPointUrls(manifest, requestedMFE);
                return federationInitializer.init(entryPoints)
                    .then(federationProps => ({
                        ...federationProps, 
                        manifest
                    }))
            })
    }

    return {init};
}


const initFederationWithDiscovery: TInitFederationWithDiscovery = (
    discoveryManifestUrl: string,
    microfrontends: string[]|Record<string,string|"latest"> = []
): Promise<{load: TLoadRemoteModule, manifest: MfeDiscoveryManifest, importMap: ImportMap}> => {
    const DISCOVERY_CACHE = toCache({discovery: {}}, globalCacheEntry);
    
    const {
        remoteInfoHandler, 
        importMapHandler, 
        discoveryHandler
    } = discoveryResolver({...DEFAULT_CACHE, ...DISCOVERY_CACHE});

    const nfInitializer = federationInitializerFactory(remoteInfoHandler, importMapHandler);
    return initFederationWithDiscoveryFactory(nfInitializer, discoveryHandler)
        .init(discoveryManifestUrl, microfrontends);
}

export { initFederationWithDiscovery};