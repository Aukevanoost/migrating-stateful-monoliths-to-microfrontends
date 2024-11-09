export { TCacheEntry, TCacheHandler, CacheOf } from '../models/cache';
export { toCache, toHandler } from './cache-handler';

// --- CACHE IMPLEMENTATIONS
import { sessionStorageCacheEntry } from './session-cache';
import { localStorageCacheEntry } from './localstorage-cache';
import { globalCacheEntry } from './global-cache';

const DEFAULT_CACHE_ENTRY = sessionStorageCacheEntry;

export {sessionStorageCacheEntry, localStorageCacheEntry, globalCacheEntry, DEFAULT_CACHE_ENTRY};