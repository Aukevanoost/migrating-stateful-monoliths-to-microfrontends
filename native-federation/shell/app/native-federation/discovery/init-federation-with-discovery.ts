import { toCache } from "../cache/cache.handler"
import { federationInitializerFactory, TFederationInitializer } from "../init-federation"
import { DiscoveryCache, AvailableRemoteModule, AvailableRemoteModules } from "./discovery.contract"
import { DEFAULT_CACHE } from "../cache"
import { globalCacheEntry } from "../cache/global-cache"
import { ImportMap } from "../import-map/import-map.contract"
import { TLoadRemoteModule } from "../load-remote-module"
import { TDiscoveryHandler } from "./discovery.handler"
import { verifyRequestedModules } from "./verify-requested-modules"
import { NativeFederationCache } from "../cache/cache.contract"
import { discoveryResolver } from "../resolver"
import { NFDiscoveryError } from "./discovery.error"

type TInitFederationWithDiscovery = (
    discoveryManifestUrl: string,
    microfrontends: string[]|Record<string,string|"latest">
) => Promise<{load: TLoadRemoteModule, discovery: AvailableRemoteModules, importMap: ImportMap}>

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

    const getEntryPointUrls = (availableModules: AvailableRemoteModules, mfeFilter?: Record<string, string|"latest">): Record<string, string> => {
        if(!mfeFilter) mfeFilter = setVersions(Object.keys(availableModules));
    
        return Object.entries(mfeFilter)
            .map(([mfe, version]) => {
                const availableModule = availableModules[mfe]?.find(m => version === "latest" || version === m.metadata.version);
                if(!availableModule)
                    throw new NFDiscoveryError(`Micro frontend '${mfe}' version '${version}' does not exist!`);
                return [mfe, availableModule] as [string, AvailableRemoteModule];
            })
            .reduce((nfConfig, [mfe,cfg]) => ({
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
            .then(availableModules => {
                const entryPoints = getEntryPointUrls(availableModules, requestedMFE);
                return federationInitializer.init(entryPoints)
                    .then(federationProps => ({
                        ...federationProps, 
                        discovery: availableModules
                    }))
            })
    }

    return {init};
}


const initFederationWithDiscovery = (
    discoveryManifestUrl: string,
    microfrontends: string[]|Record<string,string|"latest"> = [],
    o: {cache?: NativeFederationCache & DiscoveryCache} = {}
): Promise<{load: TLoadRemoteModule, discovery: AvailableRemoteModules, importMap: ImportMap}> => {    
    const {
        remoteInfoHandler, 
        importMapHandler, 
        discoveryHandler
    } = discoveryResolver(o.cache ?? {...DEFAULT_CACHE, ...toCache({discovery: {}}, globalCacheEntry)});

    const nfInitializer = federationInitializerFactory(remoteInfoHandler, importMapHandler);
    return initFederationWithDiscoveryFactory(nfInitializer, discoveryHandler)
        .init(discoveryManifestUrl, microfrontends);
}

export { initFederationWithDiscovery};