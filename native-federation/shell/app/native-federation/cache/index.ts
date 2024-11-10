export { TCacheEntry, TCacheHandler, CacheOf } from '../models/cache';
export { toCache, toHandler } from './cache-handler';

// --- CACHE IMPLEMENTATIONS
import { globalCacheEntry } from './global-cache';

const DEFAULT_CACHE_ENTRY = globalCacheEntry;

export {DEFAULT_CACHE_ENTRY};