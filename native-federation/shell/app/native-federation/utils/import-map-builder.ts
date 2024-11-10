import { CacheOf, NativeFederationProps, TCacheHandler } from "../models/cache";
import { ImportMap } from "../models/import-map";
import { RemoteEntry, RemoteInfo } from "../models/remote-info";
import { SharedConfig } from "../models/shared-config";
import * as _path from "./path";

type TImportMapBuilder = {
    createEmpty: () => ImportMap,
    createRemote: (remoteInfo: RemoteInfo, remoteName: string) => ImportMap,
    merge: (maps: ImportMap[]) => ImportMap,
    fromRemoteInfo: (remoteEntry: RemoteInfo, remoteName?: string) => ImportMap 
}

const ImportMapBuilder = (ctx: {cacheHandler: TCacheHandler<CacheOf<NativeFederationProps>>}): TImportMapBuilder => {

    const toExternalKey = (shared: SharedConfig): string => {
        return `${shared.packageName}@${shared.version}`;
    }

    const createEmpty = (): ImportMap => ({
        imports: {},
        scopes: {}
    })
    
    const createRemote = (remoteInfo: RemoteInfo, remoteName: string): ImportMap => {
        const imports: Record<string, string> = remoteInfo.exposes.reduce((acc,remote) => ({
            ...acc, 
            [_path.join(remoteName, remote.key)]: _path.join(remoteInfo.baseUrl, remote.outFileName)
        }), {});
            
        const scopedImports: Record<string, string> = remoteInfo.shared.reduce((acc, shared) => ({
            ...acc,
            [shared.packageName]: ctx.cacheHandler.fetch("externals")[toExternalKey(shared)] ?? _path.join(remoteInfo.baseUrl, shared.outFileName)
        }), {});
    
        remoteInfo.shared.forEach(shared => {
            const key = scopedImports[shared.packageName]!;
            ctx.cacheHandler.mutate("externals", (v) => ({...v, [key]: toExternalKey(shared)}))
        })
    
        return { 
            imports, 
            scopes: {[remoteInfo.baseUrl + '/']: scopedImports}
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
    const fromRemoteInfo = (remoteEntry: RemoteInfo, remoteName?: string): ImportMap => {
        if(!remoteName) remoteName = remoteEntry.name as string;
        return createRemote(remoteEntry, remoteName);
    }

    return {createEmpty, createRemote, merge, fromRemoteInfo};
}

export {ImportMapBuilder, TImportMapBuilder};