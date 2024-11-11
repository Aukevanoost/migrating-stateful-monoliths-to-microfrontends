import { TDependencyHandler } from "../dependency/dependency.handler";
import { ImportMap } from "../import-map/import-map.contract";
import { RemoteInfo } from "../remote-info/remote-info.contract";
import * as _path from "../utils/path";
import { createEmptyImportMap } from "./create-empty-import-map";

type TImportMapHandler = {
    toImportMap: (remoteInfo: RemoteInfo, remoteName?: string) => ImportMap,
}

const importMapHandlerFactory = (dependencyHandler: TDependencyHandler): TImportMapHandler => {
    const getImports = (remoteInfo: RemoteInfo, remoteName: string) => {
        return remoteInfo.exposes.reduce((acc,remote) => ({
            ...acc, 
            [_path.join(remoteName, remote.key)]: _path.join(remoteInfo.baseUrl, remote.outFileName)
        }), {});
    }

    const getScopedDeps = (remoteInfo: RemoteInfo) => {
        return {[remoteInfo.baseUrl + '/']: dependencyHandler.mapSharedDeps(remoteInfo)}
    }

    const toImportMap = (remoteInfo: RemoteInfo, remoteName?: string): ImportMap => {
        if(!remoteName) remoteName = remoteInfo.name as string;

        return { 
            imports: getImports(remoteInfo, remoteName), 
            scopes: getScopedDeps(remoteInfo)
        };
    }

    return {toImportMap};
}

export {createEmptyImportMap, importMapHandlerFactory, TImportMapHandler};