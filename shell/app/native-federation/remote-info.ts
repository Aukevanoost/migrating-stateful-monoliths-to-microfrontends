import { ImportMap, createEmptyImportMap, mergeImportMaps, createRemoteImportMap } from "./import-map";
import { getDirectory } from "./util";
import * as globalCache from './global-cache';

interface SharedConfig {
    packageName: string;
    version: string;
    outFileName: string;
}

interface ExposedModule {
    key: string;
    outFileName: string;
}

interface RemoteInfo {
    name: string;
    shared: SharedConfig[];
    exposes: ExposedModule[];
    baseUrl?: string;
}

const processRemoteInfos = async (remotes: Record<string, string>): Promise<ImportMap> => {
    return Promise.all(
        Object.keys(remotes).map(async remoteName => {
            return processRemoteInfo(remotes[remoteName], remoteName)
                .catch(_ => {
                    console.error(`Error loading remote entry for ${remoteName} from file ${remotes[remoteName]}`);
                    return createEmptyImportMap();
                })
        })
    ).then(mergeImportMaps)
}

const processRemoteInfo = (federationInfoUrl: string, remoteName?: string): Promise<ImportMap> => {
    return fetch(federationInfoUrl)
        .then(r => r.json())
        .then(info => {
            if(!remoteName) remoteName = info.name;
            const baseUrl = getDirectory(federationInfoUrl);
            globalCache.addRemote(remoteName, {...info, baseUrl})

            return createRemoteImportMap(info, remoteName, baseUrl);
        })
}

export {SharedConfig, ExposedModule, RemoteInfo, processRemoteInfo, processRemoteInfos};