import { RemoteInfo } from "./remote-info";

const NAMESPACE = "__NATIVE_FEDERATION__";

/**
 * ENTRIES
 */
type TCacheEntry<T> = {
    set: (value: T) => TCacheEntry<T>;
    get: () => T;
    exists: () => boolean;
};

type CacheEntryValue<T> = T extends TCacheEntry<infer U> ? U : never;


type CacheOf<T> = {
    [K in keyof T]: TCacheEntry<T[K]>;
};

type CacheEntryCreator = <T>(key: string, initialValue: T) => TCacheEntry<T>;

/**
 * CACHE
 */
interface TCacheHandler<TCache extends CacheOf<Record<keyof TCache, any>>> {
    fetch: <K extends keyof TCache>(key: K) => CacheEntryValue<TCache[K]>;
    entry: <K extends keyof TCache>(key: K) => TCache[K];
    mutate: <K extends keyof TCache>(
        key: K,
        mutateFn: (v: CacheEntryValue<TCache[K]>) => CacheEntryValue<TCache[K]>
    ) => TCacheHandler<TCache>;
}

/**
 * DEFAULT STORED PROPERTIES
 */
type NativeFederationProps = {
    externals: Record<string, string>;
    remoteNamesToRemote: Record<string, RemoteInfo>;
    baseUrlToRemoteNames: Record<string, string>;
}



export {NAMESPACE, CacheEntryValue, TCacheEntry, CacheOf, NativeFederationProps, CacheEntryCreator, TCacheHandler}