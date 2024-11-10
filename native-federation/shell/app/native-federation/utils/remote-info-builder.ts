import { CacheOf, TCacheHandler } from "../cache";
import { NativeFederationProps } from "../models/cache";
import { RemoteEntry, RemoteInfo } from "../models/remote-info";
import * as _path from "./path";

type TRemoteInfoBuilder = {
    fromRemoteEntry: (remoteEntry: RemoteEntry, remoteEntryUrl: string) => RemoteInfo,
    fromEntryJson: (entryUrl: string) => Promise<RemoteInfo>,
    addToCache: (remoteInfo: RemoteInfo, remoteName?: string) => RemoteInfo
}

const RemoteInfoBuilder = (ctx: {cacheHandler: TCacheHandler<CacheOf<NativeFederationProps>>}): TRemoteInfoBuilder => {
    const fromRemoteEntry = (remoteEntry: RemoteEntry, remoteEntryUrl: string): RemoteInfo => ({
        ...remoteEntry,
        baseUrl: _path.getDir(remoteEntryUrl)
    })

    const fromEntryJson = (entryUrl: string): Promise<RemoteInfo> => {
        return fetch(entryUrl)
            .then(r => r.json() as unknown as RemoteEntry)
            .then(cfg => fromRemoteEntry(cfg, entryUrl))
    }

    const addToCache = (remoteInfo: RemoteInfo, remoteName?: string): RemoteInfo => {
        if(!remoteName) remoteName = remoteInfo.name as string;
        ctx.cacheHandler.mutate("remoteNamesToRemote", v => ({...v, [remoteName]: remoteInfo}));
        ctx.cacheHandler.mutate("baseUrlToRemoteNames", v => ({...v, [remoteInfo.baseUrl]: remoteName})); // todo: look at later
        return remoteInfo;
    } 

    return {fromRemoteEntry, fromEntryJson, addToCache};
}

export {RemoteInfoBuilder, TRemoteInfoBuilder};