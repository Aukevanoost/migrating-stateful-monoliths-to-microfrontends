import { NativeFederationCache } from "../cache/cache.contract";
import { RemoteEntry, RemoteInfo } from "./remote-info.contract";
import * as _path from "../utils/path";
import { TCacheHandler } from "../cache/cache.handler";
import { TDependencyHandler } from "../dependency/dependency.handler";

type TRemoteInfoHandler = {
    loadRemoteInfo: (remoteEntryUrl?: string, remoteName?: string) => Promise<RemoteInfo>
}

const remoteInfoHandlerFactory = (cacheHandler: TCacheHandler<NativeFederationCache>, dependencyHandler: TDependencyHandler): TRemoteInfoHandler => {

    const fromEntryJson = (entryUrl: string): Promise<RemoteInfo> => {
        return fetch(entryUrl)
            .then(r => r.json() as unknown as RemoteEntry)
            .then(cfg => ({...cfg, baseUrl: _path.getDir(entryUrl)}))
    }

    const addRemoteModuleToCache = (remoteInfo: RemoteInfo, remoteName: string): RemoteInfo => {
        cacheHandler.mutate("remoteNamesToRemote", v => ({...v, [remoteName]: remoteInfo}));
        cacheHandler.mutate("baseUrlToRemoteNames", v => ({...v, [remoteInfo.baseUrl]: remoteName}));
        return remoteInfo;
    } 

    const loadRemoteInfo = (remoteEntryUrl?: string, remoteName?: string): Promise<RemoteInfo> => {
        if(!remoteEntryUrl && !remoteName) return Promise.reject("Must provide valid remoteEntry or remoteName");

        if(!remoteName) remoteName = cacheHandler.fetch("baseUrlToRemoteNames")[_path.getDir(remoteEntryUrl)];

        const cachedRemote = cacheHandler.fetch("remoteNamesToRemote")[remoteName];
        if (!!cachedRemote) return Promise.resolve(cachedRemote);

        return fromEntryJson(remoteEntryUrl)
            .then(info => addRemoteModuleToCache(info, remoteName ?? info.name))
            .then(dependencyHandler.addSharedDepsToCache)
    }

    return {loadRemoteInfo};
}

export {remoteInfoHandlerFactory, TRemoteInfoHandler};