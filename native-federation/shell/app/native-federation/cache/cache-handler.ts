import { CacheEntryCreator, CacheEntryValue, CacheOf, TCacheHandler } from "../models/cache";

function getCacheHandler<TCache extends CacheOf<Record<keyof TCache, any>>>(
    _cache: TCache
): TCacheHandler<TCache> {
    const entry = <K extends keyof TCache>(key: K): TCache[K] => {
        return _cache[key];
    };

    const fetch = <K extends keyof TCache>(key: K): CacheEntryValue<TCache[K]> => {
        return _cache[key].get();
    };

    const mutate = <K extends keyof TCache>(
        key: K,
        mutateFn: (v: CacheEntryValue<TCache[K]>) => CacheEntryValue<TCache[K]>
    ): TCacheHandler<TCache> => {
        const newVal = mutateFn(fetch(key));
        _cache[key].set(newVal);
        return getCacheHandler(_cache);
    };

    return { fetch, mutate, entry };
}

const toCache = <Tprops extends Record<string, any>>(
    props: Tprops,
    cacheEntryCreator: CacheEntryCreator
): CacheOf<Tprops> => {
    return Object.entries(props).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: cacheEntryCreator(key, value)
        }),
        {} as CacheOf<Tprops>
    );
};

const toHandler = <Tprops extends Record<string, any>>(
    props: Tprops,
    cacheEntryCreator: CacheEntryCreator
): TCacheHandler<CacheOf<Tprops>> => {
    return getCacheHandler(toCache(props, cacheEntryCreator))
}


export {toHandler, toCache};