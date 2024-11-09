import { CacheOf, NativeFederationProps, TCacheHandler } from "../models/cache";
import { ImportMap } from "../models/import-map";
import { RemoteInfo } from "../models/remote-info";
import { SharedConfig } from "../models/shared-config";
import * as _path from "./path";

type TImportMapBuilder = {
    createEmpty: () => ImportMap,
    createRemote: (remoteInfo: RemoteInfo, remoteName: string, baseUrl: string) => ImportMap,
    merge: (maps: ImportMap[]) => ImportMap,
    fromRemoteEntryJson: (remoteEntryUrl: string, remoteName?: string) => Promise<ImportMap> 
}

const ImportMapBuilder = (ctx: {cacheHandler: TCacheHandler<CacheOf<NativeFederationProps>>}): TImportMapBuilder => {

    const toExternalKey = (shared: SharedConfig): string => {
        return `${shared.packageName}@${shared.version}`;
    }

    const createEmpty = (): ImportMap => ({
        imports: {},
        scopes: {}
    })
    
    const createRemote = (remoteInfo: RemoteInfo, remoteName: string, baseUrl: string): ImportMap => {
        const imports: Record<string, string> = remoteInfo.exposes.reduce((acc,remote) => ({
            ...acc, 
            [_path.join(remoteName, remote.key)]: _path.join(baseUrl, remote.outFileName)
        }), {});
            
        const scopedImports: Record<string, string> = remoteInfo.shared.reduce((acc, shared) => ({
            ...acc,
            [shared.packageName]: ctx.cacheHandler.fetch("externals")[toExternalKey(shared)] ?? _path.join(baseUrl, shared.outFileName)
        }), {});
    
        remoteInfo.shared.forEach(shared => {
            const key = scopedImports[shared.packageName]!;
            ctx.cacheHandler.mutate("externals", (v) => ({...v, [key]: toExternalKey(shared)}))
        })
    
        return { 
            imports, 
            scopes: {[baseUrl + '/']: scopedImports}
        };
    }
        
    const merge = (maps: ImportMap[]) => {
        return maps.reduce(
            (acc: ImportMap, map: ImportMap) => ({
                imports: { ...acc.imports, ...map.imports },
                scopes: { ...acc.scopes, ...map.scopes },
            }),
            createEmpty()
        );
    }
    
    const addRemoteToCache = (remoteName: string, remote: RemoteInfo): void => {
        ctx.cacheHandler.mutate("remoteNamesToRemote", v => ({...v, [remoteName]: remote}));
        if(!!remote?.baseUrl) {
            ctx.cacheHandler.mutate("baseUrlToRemoteNames", v => ({...v, [remote.baseUrl!]: remoteName}));
        }
    }

    const fromRemoteEntryJson = (remoteEntryUrl: string, remoteName?: string): Promise<ImportMap> => {
        return fetch(remoteEntryUrl)
            .then(r => r.json())
            .then(info => {
                if(!remoteName) remoteName = info.name as string;
                const baseUrl = _path.getDir(remoteEntryUrl);
                addRemoteToCache(remoteName, {...info, baseUrl})
                return createRemote(info, remoteName, baseUrl);
            })
    }

    return {createEmpty, createRemote, merge, fromRemoteEntryJson};
}

export {ImportMapBuilder, TImportMapBuilder};