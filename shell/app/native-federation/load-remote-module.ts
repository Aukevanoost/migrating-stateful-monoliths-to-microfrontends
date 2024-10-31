import { getDirectory, joinPaths, normalizeOptions, RemoteOptions } from "./util";
import * as globalCache from './global-cache';
import { processRemoteInfo } from "./remote-info";
import { appendImportMapToBody } from "./import-map";

const loadRemoteModule = async (
    optionsOrRemoteName: RemoteOptions | string,
    exposedModule?: string
): Promise<any> => {
    const options = normalizeOptions(optionsOrRemoteName, exposedModule);

    return initRemoteInfoIfUninitialized(options)
        .then(_ => {
            const remoteName = getRemoteNameByOptions(options);
            const remote = globalCache.getRemote(remoteName);
            
            if (!remote) {
                throw new Error('unknown remote ' + remoteName);
            }
        
            const exposed = remote.exposes.find(e => e.key === options.exposedModule);
            if (!exposed) {
                throw new Error(`Unknown exposed module ${options.exposedModule} in remote ${remoteName}`);
            }
        
            return joinPaths(remote.baseUrl!, exposed.outFileName);
        })
        .then(url => (globalThis as any).importShim(url))
}

const initRemoteInfoIfUninitialized = async (options: RemoteOptions): Promise<void> => {
    return (options.remoteEntry && !globalCache.isRemoteInitialized(getDirectory(options.remoteEntry)))
        ? processRemoteInfo(options.remoteEntry).then(appendImportMapToBody)
        : Promise.resolve();
}



const getRemoteNameByOptions = (options: RemoteOptions): string => {
    let remoteName: string | undefined;
    
    if (options.remoteName) {
        remoteName = options.remoteName;
    } else if (options.remoteEntry) {
        const baseUrl = getDirectory(options.remoteEntry);
        remoteName = globalCache.getRemoteNameByBaseUrl(baseUrl);
    } else {
        throw new Error('unexpected arguments: Please pass remoteName or remoteEntry');
    }

    if (!remoteName) {
        throw new Error('unknown remoteName ' + remoteName);
    }

    return remoteName;
}

export { loadRemoteModule }