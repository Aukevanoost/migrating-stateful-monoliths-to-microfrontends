import { RemoteInfo, SharedConfig } from "./remote-info";

interface NativeFederationCache {
    externals: Map<string, string>;
    remoteNamesToRemote: Map<string, RemoteInfo>;
    baseUrlToRemoteNames: Map<string, string>;
}

const NAMESPACE = '__NATIVE_FEDERATION__';

const global = globalThis as any;
global[NAMESPACE] ??= {
    externals: new Map<string, string>(),
    remoteNamesToRemote: new Map<string, RemoteInfo>(),
    baseUrlToRemoteNames: new Map<string, string>(),
};

const globalCache = global[NAMESPACE];


const toExternalKey = (shared: SharedConfig): string => `${shared.packageName}@${shared.version}`;

const getExternalUrl = (shared: SharedConfig): string | undefined => {
    return globalCache.externals.get(toExternalKey(shared));
}

const setExternalUrl = (shared: SharedConfig, url: string): void => {
    globalCache.externals.set(toExternalKey(shared), url)
}

// Remote management methods
const addRemote = (remoteName: string, remote: RemoteInfo): void => {
    globalCache.remoteNamesToRemote.set(remoteName, remote);
    globalCache.baseUrlToRemoteNames.set(remote.baseUrl!, remoteName);
}

const getRemoteNameByBaseUrl = (baseUrl: string): string | undefined => {
    return globalCache.baseUrlToRemoteNames.get(baseUrl);
}

const isRemoteInitialized = (baseUrl: string): boolean => {
    return globalCache.baseUrlToRemoteNames.has(baseUrl);
}

const getRemote = (remoteName: string): RemoteInfo | undefined => {
    return globalCache.remoteNamesToRemote.get(remoteName);
}

// private hasRemote(remoteName: string): boolean {
//     return FederationRuntime.globalCache.remoteNamesToRemote.has(remoteName);
// }

// public processRemoteImports(remoteInfo: RemoteInfo, baseUrl: string): Record<string, Record<string, string>> {
//     const scopes: Record<string, Record<string, string>> = {};
//     const scopedImports: Record<string, string> = {};

//     for (const shared of remoteInfo.shared) {
//         const outFileName = this.getExternalUrl(shared) ?? this.joinPaths(baseUrl, shared.outFileName);
//         this.setExternalUrl(shared, outFileName);
//         scopedImports[shared.packageName] = outFileName;
//     }

//     scopes[baseUrl + '/'] = scopedImports;
//     return scopes;
// }

export {NativeFederationCache, getExternalUrl, setExternalUrl, addRemote, getRemote, isRemoteInitialized, getRemoteNameByBaseUrl}