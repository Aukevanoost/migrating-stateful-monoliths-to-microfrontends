import { toCache } from './cache.handler';
import { NativeFederationCache } from './cache.contract';
import { globalCacheEntry } from './global-cache';

const DEFAULT_CACHE: NativeFederationCache = toCache({
    externals: {},
    remoteNamesToRemote: {},
    baseUrlToRemoteNames: {}
}, globalCacheEntry);

export {DEFAULT_CACHE};