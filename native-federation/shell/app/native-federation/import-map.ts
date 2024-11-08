import { CACHE } from "./cache/cache-handler";
import { RemoteInfo } from "./remote-info";
import { joinPaths } from "./util";

interface ImportMap {
    imports: Record<string, string>;
    scopes: Record<string, Record<string, string>>;
}

const createEmptyImportMap = (): ImportMap => ({
    imports: {},
    scopes: {}
})

const createRemoteImportMap = (remoteInfo: RemoteInfo, remoteName: string, baseUrl: string): ImportMap => {
    const imports: Record<string, string> = remoteInfo.exposes.reduce((acc,remote) => ({
        ...acc, 
        [joinPaths(remoteName, remote.key)]: joinPaths(baseUrl, remote.outFileName)
    }), {});
        
    const scopedImports: Record<string, string> = remoteInfo.shared.reduce((acc, shared) => ({
        ...acc,
        [shared.packageName]: CACHE.getExternalUrl(shared) ?? joinPaths(baseUrl, shared.outFileName)
    }), {});

    remoteInfo.shared.forEach(shared => {
        CACHE.setExternalUrl(shared, scopedImports[shared.packageName])
    })

    return { 
        imports, 
        scopes: {[baseUrl + '/']: scopedImports}
    };
}

const mergeImportMaps = (importMaps: ImportMap[]) => {
    return importMaps.reduce(
        (acc: ImportMap, importMap: ImportMap) => ({
            imports: { ...acc.imports, ...importMap.imports },
            scopes: { ...acc.scopes, ...importMap.scopes },
        }),
        createEmptyImportMap()
    );
}


const appendImportMapToBody = (importMap: ImportMap): void => {
    document.head.appendChild(
        Object.assign(document.createElement('script'), {
            type: 'importmap-shim',
            innerHTML: JSON.stringify(importMap),
        })
    );
}

export {ImportMap, mergeImportMaps, createEmptyImportMap, createRemoteImportMap, appendImportMapToBody};