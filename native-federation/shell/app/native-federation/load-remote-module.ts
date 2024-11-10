import * as _path from "./utils/path";
import * as _dom from "./utils/dom";
import * as _remoteOptions from './utils/remote-options';

import { TCacheHandler } from "./cache";
import { RemoteOptions } from "./models/remote-options";
import { TImportMapBuilder } from "./utils/import-map-builder";
import { CacheOf, NativeFederationProps } from "./models/cache";
import { TRemoteInfoBuilder } from "./utils/remote-info-builder";
import { RemoteEntry } from "./models/remote-info";

type fnLoadRemoteModule = ( optionsOrRemoteName: RemoteOptions | string, exposedModule?: string ) => Promise<void>

const getRemoteModuleLoader = (ctx: {
    cacheHandler: TCacheHandler<CacheOf<NativeFederationProps>>,
    importMapBuilder: TImportMapBuilder,
    remoteInfoBuilder: TRemoteInfoBuilder,
}): fnLoadRemoteModule => {

    const getRemoteNameByBaseUrl = (url: string) => {
        return ctx.cacheHandler.fetch("baseUrlToRemoteNames")[url];
    }

    const initRemoteInfoIfUninitialized = (options: RemoteOptions): Promise<void> => {
        if (!options.remoteEntry || getRemoteNameByBaseUrl(_path.getDir(options.remoteEntry))) {
            return Promise.resolve();
        }

        fetch(options.remoteEntry)
            .then(r => r.json() as unknown as RemoteEntry)
            .then(cfg => ctx.remoteInfoBuilder.fromRemoteEntry(cfg, options.remoteEntry))
            .then(info => ctx.remoteInfoBuilder.addToCache(info))
            .then(info => ctx.importMapBuilder.fromRemoteInfo(info))
    }
    
    const getRemoteNameByOptions = (options: RemoteOptions): string => {
        if(!!options?.remoteName) return options.remoteName;
    
        if(!options.remoteEntry) {
            throw new Error('unexpected arguments: Please pass remoteName or remoteEntry');
        }
    
        const remoteName =  getRemoteNameByBaseUrl(_path.getDir(options.remoteEntry));
        if (!remoteName) throw new Error(`RemoteName: '${options.remoteEntry}' not found.`);
    
        return remoteName;
    }

    const getRemoteUrl = (options: RemoteOptions): string => {
        const remoteName = getRemoteNameByOptions(options);
    
        const remote = ctx.cacheHandler.fetch("remoteNamesToRemote")[remoteName];
        if (!remote) throw new Error('unknown remote ' + remoteName);
    
        const exposed = remote.exposes.find(e => e.key === options.exposedModule);
        if (!exposed) throw new Error(`Unknown exposed module ${options.exposedModule} in remote ${remoteName}`);
    
        return _path.join(remote.baseUrl!, exposed.outFileName);
    }

    return (
        optionsOrRemoteName: RemoteOptions | string,
        exposedModule?: string
    ): Promise<void> => {
        const options = _remoteOptions.normalize(optionsOrRemoteName, exposedModule);
    
        return initRemoteInfoIfUninitialized(options)
            .then(_ => getRemoteUrl(options))
            .then(url => {(globalThis as any).importShim(url)})
    }
}

export { getRemoteModuleLoader, fnLoadRemoteModule }