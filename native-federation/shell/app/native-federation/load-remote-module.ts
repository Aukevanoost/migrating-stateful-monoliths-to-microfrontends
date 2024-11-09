import * as _path from "./utils/path";
import * as _dom from "./utils/dom";
import * as _remoteOptions from './utils/remote-options';

import { TCacheHandler } from "./cache";
import { RemoteOptions } from "./models/remote-options";
import { TImportMapBuilder } from "./utils/import-map-builder";
import { CacheOf, NativeFederationProps } from "./models/cache";

type fnLoadRemoteModule = ( optionsOrRemoteName: RemoteOptions | string, exposedModule?: string ) => Promise<void>

const loadRemoteModule = (ctx: {
    cacheHandler: TCacheHandler<CacheOf<NativeFederationProps>>,
    importMapBuilder: TImportMapBuilder
}): fnLoadRemoteModule => {

    const getRemoteNameByBaseUrl = (url: string) => {
        return ctx.cacheHandler.fetch("baseUrlToRemoteNames")[url];
    }

    const initRemoteInfoIfUninitialized = (options: RemoteOptions): Promise<void> => {
        if (!options.remoteEntry || getRemoteNameByBaseUrl(_path.getDir(options.remoteEntry))) {
            return Promise.resolve();
        }
        return ctx.importMapBuilder
                .fromRemoteEntryJson(options.remoteEntry)
                .then(_dom.appendImportMapToBody)
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

export { loadRemoteModule, fnLoadRemoteModule }