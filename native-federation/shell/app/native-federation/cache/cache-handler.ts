import { RemoteInfo, SharedConfig } from "../remote-info";
import { CacheEntryValue, NativeFederationCache, TCacheEntry } from "./cache";
import { getSessionCache } from "./session-cache";


function cacheHandler(_cache: NativeFederationCache) {
    const toExternalKey = (shared: SharedConfig): string => {
        return `${shared.packageName}@${shared.version}`;
    }
    
    const getExternalUrl = (shared: SharedConfig): string | undefined => {
        return _cache.externals.get()[toExternalKey(shared)];
    }
    
    const setExternalUrl = (shared: SharedConfig, url: string): void => {
        _cache.externals.set({
            ..._cache.externals.get(),
            [toExternalKey(shared)]: url
        });
    }

    const addRemote = (remoteName: string, remote: RemoteInfo): void => {
        _cache.remoteNamesToRemote.set({
            ..._cache.remoteNamesToRemote.get(),
            [remoteName]: remote
        });
        _cache.baseUrlToRemoteNames.set({
            ..._cache.baseUrlToRemoteNames.get(),
            [remote.baseUrl]: remoteName
        });
    }

    const entry = <K extends keyof NativeFederationCache>(key: K): NativeFederationCache[K] => {
        return _cache[key];
    };

    const fetch = <K extends keyof NativeFederationCache>(
        key: K
    ): CacheEntryValue<NativeFederationCache[K]> => {
        return _cache[key].get() as CacheEntryValue<NativeFederationCache[K]>;
    };
    
    const getRemoteNameByBaseUrl = (baseUrl: string): string | undefined => {
        return _cache.baseUrlToRemoteNames.get()[baseUrl];
    }
    
    return {fetch, entry, getExternalUrl, setExternalUrl, addRemote, getRemoteNameByBaseUrl};
}

const CACHE = cacheHandler(
    getSessionCache()
)

export {CACHE};