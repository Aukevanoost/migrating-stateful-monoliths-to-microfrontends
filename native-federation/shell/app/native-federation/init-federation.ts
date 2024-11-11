import * as _dom from './utils/dom';
import { ImportMap } from './import-map/import-map.contract';
import { remoteModuleLoaderFactory, TLoadRemoteModule } from './load-remote-module';
import { TRemoteInfoHandler } from './remote-info/remote-info.handler';
import { DEFAULT_CACHE } from './cache';
import { createEmptyImportMap, TImportMapHandler } from './import-map/import-map.handler';
import { mergeImportMaps } from './import-map/merge-import-maps';
import { resolver } from './resolver';
import { NativeFederationCache } from './cache/cache.contract';

type TInitFederation = (
    remotesOrManifestUrl: string | Record<string, string>
) => Promise<{load: TLoadRemoteModule, importMap: ImportMap}>

type TFederationInitializer = {
    init: TInitFederation
}

const federationInitializerFactory = (
    remoteInfoHandler: TRemoteInfoHandler,
    importMapHandler: TImportMapHandler
): TFederationInitializer => {
    const fetchRemotes = (remotesOrManifestUrl: string | Record<string, string> = {}): Promise<Record<string, string>> => 
        (typeof remotesOrManifestUrl === 'string')
            ? fetch(remotesOrManifestUrl).then(r => r.json())
            : Promise.resolve(remotesOrManifestUrl)
    
    const createImportMapFromRemotes = (remotes: Record<string, string>): Promise<ImportMap> => {
        return Promise.all(
            Object.entries(remotes)
                .map(([remoteName, remoteEntryUrl]) => {
                    return remoteInfoHandler.loadRemoteInfo(remoteEntryUrl, remoteName)
                        .then(info => importMapHandler.toImportMap(info, remoteName))
                        .catch(_ => {
                            console.warn(`Error loading remoteEntry for ${remoteName} at '${remoteEntryUrl}', skipping module`);
                            return createEmptyImportMap();
                        })
                })
        ).then(mergeImportMaps);
    }

    const init = (remotesOrManifestUrl: string | Record<string, string> = {}) => {
        return fetchRemotes(remotesOrManifestUrl)
            .then(createImportMapFromRemotes)
            .then(_dom.appendImportMapToBody)
            .then(importMap => ({
                importMap,
                load: remoteModuleLoaderFactory(remoteInfoHandler).load
            }))
    }

    return {init}
}

const initFederation = (
    remotesOrManifestUrl: string | Record<string, string> = {},
    o: {cache?: NativeFederationCache} = {}
)
    : Promise<{load: TLoadRemoteModule, importMap: ImportMap}> => {    
        const {remoteInfoHandler, importMapHandler} = resolver(o.cache ?? DEFAULT_CACHE);
        
        const nfInitializer = federationInitializerFactory( remoteInfoHandler, importMapHandler );
        return nfInitializer.init(remotesOrManifestUrl)
    }

export { initFederation, federationInitializerFactory, TFederationInitializer};