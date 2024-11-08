import { TeamDiscoveryManifest } from "../discovery";
import { RemoteInfo } from "../remote-info";

const NAMESPACE = "__NATIVE_FEDERATION__";

type TCacheEntry<T> = {
    set: (value: T) => TCacheEntry<T>;
    get: () => T;
    exists: () => boolean;
};

type CacheEntryValue<T> = T extends TCacheEntry<infer U> ? U : never;

interface NativeFederationCache {
    externals: TCacheEntry<Record<string, string>>;
    remoteNamesToRemote: TCacheEntry<Record<string, RemoteInfo>>;
    baseUrlToRemoteNames: TCacheEntry<Record<string, string>>;
    discovery: TCacheEntry<TeamDiscoveryManifest|undefined>;
}

export {NAMESPACE, CacheEntryValue, TCacheEntry, NativeFederationCache}