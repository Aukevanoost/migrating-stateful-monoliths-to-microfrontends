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

const toExternalKey = (shared: SharedConfig): string => {
    return `${shared.packageName}@${shared.version}`;
}

const getExternalUrl = (shared: SharedConfig): string | undefined => {
    return globalCache.externals.get(toExternalKey(shared));
}

const setExternalUrl = (shared: SharedConfig, url: string): void => {
    globalCache.externals.set(toExternalKey(shared), url)
}

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

const importRemoteScript = (url: string) => {
    return global.importShim(url)
}

export {NativeFederationCache, getExternalUrl, NAMESPACE, setExternalUrl, addRemote, getRemote, isRemoteInitialized, getRemoteNameByBaseUrl, importRemoteScript}