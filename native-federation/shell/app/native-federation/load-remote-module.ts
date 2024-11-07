import { getDirectory, joinPaths, normalizeOptions, RemoteOptions } from "./util";
import * as globalCache from './global-cache';
import { processRemoteInfo } from "./remote-info";
import { appendImportMapToBody } from "./import-map";

const loadRemoteModule = (
    optionsOrRemoteName: RemoteOptions | string,
    exposedModule?: string
): Promise<any> => {
    const options = normalizeOptions(optionsOrRemoteName, exposedModule);

    return initRemoteInfoIfUninitialized(options)
        .then(_ => {
            const remoteName = getRemoteNameByOptions(options);
            const remote = globalCache.getRemote(remoteName);
            if (!remote) throw new Error('unknown remote ' + remoteName);
        
            const exposed = remote.exposes.find(e => e.key === options.exposedModule);
            if (!exposed) throw new Error(`Unknown exposed module ${options.exposedModule} in remote ${remoteName}`);
        
            return joinPaths(remote.baseUrl!, exposed.outFileName);
        })
        .then(url => globalCache.importRemoteScript(url))
}

const initRemoteInfoIfUninitialized = (options: RemoteOptions): Promise<void> => {
    if (!options.remoteEntry || globalCache.isRemoteInitialized(getDirectory(options.remoteEntry))) {
        return Promise.resolve();
    }
    return processRemoteInfo(options.remoteEntry)
            .then(appendImportMapToBody)
}

const getRemoteNameByOptions = (options: RemoteOptions): string => {
    let remoteName = options.remoteName
                  ?? globalCache.getRemoteNameByBaseUrl(getDirectory(options.remoteEntry));
    
    if (!remoteName) throw new Error('unexpected arguments: Please pass remoteName or remoteEntry');
    
    return remoteName;
}

export { loadRemoteModule }