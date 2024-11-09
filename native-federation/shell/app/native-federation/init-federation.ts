import { CacheOf, DEFAULT_CACHE_ENTRY, toCache, toHandler } from './cache';
import {ImportMapBuilder}from './utils/import-map-builder';
import * as _dom from './utils/dom';
import { ImportMap } from './models/import-map';
import { fnLoadRemoteModule, loadRemoteModule } from './load-remote-module';
import { NativeFederationProps, TCacheHandler } from './models/cache';

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

    const fetchRemotes = (remotesOrManifestUrl: string | Record<string, string> = {}): Promise<Record<string, string>> => 
        (typeof remotesOrManifestUrl === 'string')
            ? fetch(remotesOrManifestUrl).then(r => r.json())
            : Promise.resolve(remotesOrManifestUrl)
    
    const createImportMapFromRemotes = (remotes: Record<string, string>): Promise<ImportMap> => {
        return Promise.all(
            Object.keys(remotes).map(remoteName => {
                return importMapBuilder.fromRemoteEntryJson(remotes[remoteName]!, remoteName)
                    .catch(_ => {
                        console.error(`Error loading remote entry for ${remoteName} from file ${remotes[remoteName]}`);
                        return importMapBuilder.createEmpty();
                    })
            })
        ).then(importMapBuilder.merge);
    }

    return fetchRemotes(remotesOrManifestUrl)
        .then(createImportMapFromRemotes)
        .then(_dom.appendImportMapToBody)
        .then(_ => loadRemoteModule({cacheHandler, importMapBuilder}))
}

export { initFederation };