import { CacheOf, DEFAULT_CACHE_ENTRY, toCache, toHandler } from './cache';
import {ImportMapBuilder}from './utils/import-map-builder';
import * as _dom from './utils/dom';
import { ImportMap } from './models/import-map';
import { fnLoadRemoteModule, getRemoteModuleLoader } from './load-remote-module';
import { NativeFederationProps, TCacheHandler } from './models/cache';
import { RemoteEntry } from './models/remote-info';
import { RemoteInfoBuilder } from './utils/remote-info-builder';

const initFederation = (
    remotesOrManifestUrl: string | Record<string, string> = {}, 
    {cacheHandler}: {cacheHandler?: TCacheHandler<CacheOf<NativeFederationProps>>} = {}
): Promise<fnLoadRemoteModule> => {    
    if(!cacheHandler) {
        cacheHandler = toHandler({
            externals: {},
            remoteNamesToRemote: {},
            baseUrlToRemoteNames: {}
        }, DEFAULT_CACHE_ENTRY)
    }

    const importMapBuilder = ImportMapBuilder({cacheHandler});
    const remoteInfoBuilder = RemoteInfoBuilder({cacheHandler});

    const fetchRemotes = (remotesOrManifestUrl: string | Record<string, string> = {}): Promise<Record<string, string>> => 
        (typeof remotesOrManifestUrl === 'string')
            ? fetch(remotesOrManifestUrl).then(r => r.json())
            : Promise.resolve(remotesOrManifestUrl)
    
    const createImportMapFromRemotes = (remotes: Record<string, string>): Promise<ImportMap> => {
        return Promise.all(
            Object.entries(remotes)
                .map(([mfe, entryUrl]) => {
                    return fetch(entryUrl)
                        .then(r => r.json() as unknown as RemoteEntry)
                        .then(cfg => remoteInfoBuilder.fromRemoteEntry(cfg, entryUrl))
                        .then(info => remoteInfoBuilder.addToCache(info, mfe))
                        .then(info => importMapBuilder.fromRemoteInfo(info, mfe))
                        .catch(_ => {
                            console.error(`Error loading remoteEntry for ${mfe} at '${entryUrl}'`);
                            return importMapBuilder.createEmpty();
                        })
                })
        ).then(importMapBuilder.merge);
    }

    return fetchRemotes(remotesOrManifestUrl)
        .then(createImportMapFromRemotes)
        .then(_dom.appendImportMapToBody)
        .then(_ => getRemoteModuleLoader({
            cacheHandler, 
            importMapBuilder, 
            remoteInfoBuilder
        }))
}

export { initFederation };