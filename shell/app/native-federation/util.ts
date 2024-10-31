import { ImportMap } from "./import-map";

const getDirectory = (url: string): string => {
    const parts = url.split('/');
    parts.pop();
    return parts.join('/');
}

const joinPaths = (path1: string, path2: string): string => {
    while (path1.endsWith('/')) {
        path1 = path1.substring(0, path1.length - 1);
    }
    if (path2.startsWith('./')) {
        path2 = path2.substring(2, path2.length);
    }
    return `${path1}/${path2}`;
}

const appendImportMap = (importMap: ImportMap): void => {
    document.head.appendChild(
        Object.assign(document.createElement('script'), {
            type: 'importmap-shim',
            innerHTML: JSON.stringify(importMap),
        })
    );
}

interface RemoteOptions {
    remoteName?: string;
    remoteEntry?: string;
    exposedModule: string;
}

const normalizeOptions = (
    optionsOrRemoteName: RemoteOptions | string,
    exposedModule?: string
): RemoteOptions =>  {
    if (typeof optionsOrRemoteName === 'string' && exposedModule) {
        return {
            remoteName: optionsOrRemoteName,
            exposedModule,
        };
    } else if (typeof optionsOrRemoteName === 'object' && !exposedModule) {
        return optionsOrRemoteName;
    }
    
    throw new Error('unexpected arguments: please pass options or a remoteName/exposedModule-pair');
}

export { getDirectory, joinPaths, appendImportMap, normalizeOptions, RemoteOptions }