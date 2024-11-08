import { RemoteInfo } from "../remote-info";
import { NAMESPACE, NativeFederationCache, TCacheEntry } from "./cache";


function sessionEntry<T>(key: string, _init: T): TCacheEntry<T> {

    function set(value: T) {
        const clean = typeof value === 'string' ? value : JSON.stringify(value);
        sessionStorage.setItem(`${NAMESPACE}.${key}`, clean)
        return this;
    }
    function get(): T {
        return JSON.parse(sessionStorage.getItem(`${NAMESPACE}.${key}`)) ?? _init
    }
    function exists(): boolean {
        return !!sessionStorage.getItem(`${NAMESPACE}.${key}`);
    }
    return {get,set,exists};
}

const getSessionCache = (): NativeFederationCache => ({
    externals: sessionEntry('externals', {}),
    remoteNamesToRemote: sessionEntry('remoteNamesToRemote', {}),
    baseUrlToRemoteNames: sessionEntry('baseUrlToRemoteNames', {}),
    discovery: sessionEntry('discovery', undefined)
});

export {sessionEntry, getSessionCache};