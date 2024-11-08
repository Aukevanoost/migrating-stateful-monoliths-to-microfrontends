import { RemoteInfo } from "../remote-info";
import { NAMESPACE, NativeFederationCache, TCacheEntry } from "./cache";

function globalEntry<T>(key: string, _init: T): TCacheEntry<T> {
    if(!(globalThis as any)[NAMESPACE]) (globalThis as any)[NAMESPACE] = {};

    function entry() {
        return (globalThis as any)[NAMESPACE][key];
    }

    function set(value: T) {
        (globalThis as any)[NAMESPACE][key] = value;
        return this;
    }
    function get(): T {
        if(!entry()) return _init;
        return entry() as T;
    }
    function exists(): boolean {
        return !!entry();
    }

    return {get,set,exists};
}

const getGlobalCache = (): NativeFederationCache => ({
    externals: globalEntry('externals', {}),
    remoteNamesToRemote: globalEntry('remoteNamesToRemote', {}),
    baseUrlToRemoteNames: globalEntry('baseUrlToRemoteNames', {}),
    discovery: globalEntry('discovery', undefined)
});

export {globalEntry, getGlobalCache} ;