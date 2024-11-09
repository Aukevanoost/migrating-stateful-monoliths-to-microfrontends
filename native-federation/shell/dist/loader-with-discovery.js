// app/native-federation/models/cache.ts
var NAMESPACE = "__NATIVE_FEDERATION__";

// app/native-federation/cache/cache-handler.ts
function getCacheHandler(_cache) {
  const entry = (key) => {
    return _cache[key];
  };
  const fetch2 = (key) => {
    return _cache[key].get();
  };
  const mutate = (key, mutateFn) => {
    const newVal = mutateFn(fetch2(key));
    _cache[key].set(newVal);
    return getCacheHandler(_cache);
  };
  return { fetch: fetch2, mutate, entry };
}
var toCache = (props, cacheEntryCreator) => {
  return Object.entries(props).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: cacheEntryCreator(key, value)
    }),
    {}
  );
};
var toHandler = (props, cacheEntryCreator) => {
  return getCacheHandler(toCache(props, cacheEntryCreator));
};

// app/native-federation/cache/session-cache.ts
var sessionStorageCacheEntry = (key, _fallback) => {
  const entry = {
    get() {
      const str = sessionStorage.getItem(`${NAMESPACE}.${key}`) ?? JSON.stringify(_fallback);
      return JSON.parse(str);
    },
    set(value) {
      const clean = typeof value === "string" ? value : JSON.stringify(value);
      sessionStorage.setItem(`${NAMESPACE}.${key}`, clean);
      return entry;
    },
    exists() {
      return !!sessionStorage.getItem(`${NAMESPACE}.${key}`);
    }
  };
  return entry;
};

// app/native-federation/cache/index.ts
var DEFAULT_CACHE_ENTRY = sessionStorageCacheEntry;

// app/native-federation/utils/path.ts
var getDir = (url) => {
  const parts = url.split("/");
  parts.pop();
  return parts.join("/");
};
var join = (pathA, pathB) => {
  pathA = pathA.startsWith("/") ? pathA.slice(1) : pathA;
  pathB = pathB.endsWith("/") ? pathB.slice(0, -1) : pathB;
  return `${pathA}/${pathB}`;
};

// app/native-federation/utils/import-map-builder.ts
var ImportMapBuilder = (ctx) => {
  const toExternalKey = (shared) => {
    return `${shared.packageName}@${shared.version}`;
  };
  const createEmpty = () => ({
    imports: {},
    scopes: {}
  });
  const createRemote = (remoteInfo, remoteName, baseUrl) => {
    const imports = remoteInfo.exposes.reduce((acc, remote) => ({
      ...acc,
      [join(remoteName, remote.key)]: join(baseUrl, remote.outFileName)
    }), {});
    const scopedImports = remoteInfo.shared.reduce((acc, shared) => ({
      ...acc,
      [shared.packageName]: ctx.cacheHandler.fetch("externals")[toExternalKey(shared)] ?? join(baseUrl, shared.outFileName)
    }), {});
    remoteInfo.shared.forEach((shared) => {
      const key = scopedImports[shared.packageName];
      ctx.cacheHandler.mutate("externals", (v) => ({ ...v, [key]: toExternalKey(shared) }));
    });
    return {
      imports,
      scopes: { [baseUrl + "/"]: scopedImports }
    };
  };
  const merge = (maps) => {
    return maps.reduce(
      (acc, map) => ({
        imports: { ...acc.imports, ...map.imports },
        scopes: { ...acc.scopes, ...map.scopes }
      }),
      createEmpty()
    );
  };
  const addRemoteToCache = (remoteName, remote) => {
    ctx.cacheHandler.mutate("remoteNamesToRemote", (v) => ({ ...v, [remoteName]: remote }));
    if (!!remote?.baseUrl) {
      ctx.cacheHandler.mutate("baseUrlToRemoteNames", (v) => ({ ...v, [remote.baseUrl]: remoteName }));
    }
  };
  const fromRemoteEntryJson = (remoteEntryUrl, remoteName) => {
    return fetch(remoteEntryUrl).then((r) => r.json()).then((info) => {
      if (!remoteName) remoteName = info.name;
      const baseUrl = getDir(remoteEntryUrl);
      addRemoteToCache(remoteName, { ...info, baseUrl });
      return createRemote(info, remoteName, baseUrl);
    });
  };
  return { createEmpty, createRemote, merge, fromRemoteEntryJson };
};

// app/native-federation/utils/dom.ts
var appendImportMapToBody = (map) => {
  document.head.appendChild(
    Object.assign(document.createElement("script"), {
      type: "importmap-shim",
      innerHTML: JSON.stringify(map)
    })
  );
};

// app/native-federation/utils/remote-options.ts
var normalize = (optionsOrRemoteName, exposedModule) => {
  if (typeof optionsOrRemoteName === "string" && exposedModule) {
    return {
      remoteName: optionsOrRemoteName,
      exposedModule
    };
  } else if (typeof optionsOrRemoteName === "object" && !exposedModule) {
    return optionsOrRemoteName;
  }
  throw new Error("unexpected arguments: please pass options or a remoteName/exposedModule-pair");
};

// app/native-federation/load-remote-module.ts
var loadRemoteModule = (ctx) => {
  const getRemoteNameByBaseUrl = (url) => {
    return ctx.cacheHandler.fetch("baseUrlToRemoteNames")[url];
  };
  const initRemoteInfoIfUninitialized = (options) => {
    if (!options.remoteEntry || getRemoteNameByBaseUrl(getDir(options.remoteEntry))) {
      return Promise.resolve();
    }
    return ctx.importMapBuilder.fromRemoteEntryJson(options.remoteEntry).then(appendImportMapToBody);
  };
  const getRemoteNameByOptions = (options) => {
    if (!!options?.remoteName) return options.remoteName;
    if (!options.remoteEntry) {
      throw new Error("unexpected arguments: Please pass remoteName or remoteEntry");
    }
    const remoteName = getRemoteNameByBaseUrl(getDir(options.remoteEntry));
    if (!remoteName) throw new Error(`RemoteName: '${options.remoteEntry}' not found.`);
    return remoteName;
  };
  const getRemoteUrl = (options) => {
    const remoteName = getRemoteNameByOptions(options);
    const remote = ctx.cacheHandler.fetch("remoteNamesToRemote")[remoteName];
    if (!remote) throw new Error("unknown remote " + remoteName);
    const exposed = remote.exposes.find((e) => e.key === options.exposedModule);
    if (!exposed) throw new Error(`Unknown exposed module ${options.exposedModule} in remote ${remoteName}`);
    return join(remote.baseUrl, exposed.outFileName);
  };
  return (optionsOrRemoteName, exposedModule) => {
    const options = normalize(optionsOrRemoteName, exposedModule);
    return initRemoteInfoIfUninitialized(options).then((_) => getRemoteUrl(options)).then((url) => {
      globalThis.importShim(url);
    });
  };
};

// app/native-federation/init-federation.ts
var initFederation = (remotesOrManifestUrl = {}, { cacheHandler } = {}) => {
  if (!cacheHandler) {
    cacheHandler = toHandler({
      externals: {},
      remoteNamesToRemote: {},
      baseUrlToRemoteNames: {}
    }, DEFAULT_CACHE_ENTRY);
  }
  const importMapBuilder = ImportMapBuilder({ cacheHandler });
  const fetchRemotes = (remotesOrManifestUrl2 = {}) => typeof remotesOrManifestUrl2 === "string" ? fetch(remotesOrManifestUrl2).then((r) => r.json()) : Promise.resolve(remotesOrManifestUrl2);
  const createImportMapFromRemotes = (remotes) => {
    return Promise.all(
      Object.keys(remotes).map((remoteName) => {
        return importMapBuilder.fromRemoteEntryJson(remotes[remoteName], remoteName).catch((_) => {
          console.error(`Error loading remote entry for ${remoteName} from file ${remotes[remoteName]}`);
          return importMapBuilder.createEmpty();
        });
      })
    ).then(importMapBuilder.merge);
  };
  return fetchRemotes(remotesOrManifestUrl).then(createImportMapFromRemotes).then(appendImportMapToBody).then((_) => loadRemoteModule({ cacheHandler, importMapBuilder }));
};

// app/native-federation/discovery/discovery-error.ts
var MFEDiscoveryError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "MFEDiscoveryError";
  }
};

// app/native-federation/discovery/discovery.ts
var fetchDiscovery = (discoveryManifestUrl, ctx) => {
  const cachedDiscovery = ctx.cacheHandler.entry("discovery");
  const mfe_discovery_manifest = cachedDiscovery.exists() ? Promise.resolve(cachedDiscovery.get()) : fetch(discoveryManifestUrl).then((r) => r.json());
  return mfe_discovery_manifest.then((r) => {
    cachedDiscovery.set(r);
    return r;
  });
};
var verifyEntryPointsAvailable = (requested) => (manifest) => {
  requested.forEach((team) => {
    if (!manifest[team]) Promise.reject(new MFEDiscoveryError(`Team '${team}' not found.`));
  });
  return Promise.resolve(manifest);
};

// app/native-federation/discovery/init-federation-with-discovery.ts
var getEntryPointUrls = (manifest, mfeCollectionFilter) => {
  if (!mfeCollectionFilter) mfeCollectionFilter = Object.keys(manifest);
  return Object.entries(manifest).filter(([collection, _]) => mfeCollectionFilter.includes(collection)).reduce((ngConfig, [collection, cfg]) => ({
    ...ngConfig,
    [collection]: cfg.entryPoint
  }), {});
};
var loadCacheHandler = (handler) => {
  return handler ?? toHandler({
    externals: {},
    remoteNamesToRemote: {},
    baseUrlToRemoteNames: {},
    discovery: {}
  }, DEFAULT_CACHE_ENTRY);
};
var initFederationWithDiscovery = (discoveryManifestUrl, o = {}) => {
  const cacheHandler = loadCacheHandler(o.cacheHandler);
  return fetchDiscovery(discoveryManifestUrl, { cacheHandler }).then(verifyEntryPointsAvailable(o.mfeCollectionFilter ?? [])).then((manifest) => {
    return initFederation(getEntryPointUrls(manifest, o.mfeCollectionFilter), { cacheHandler }).then((loader) => ({ loader, manifest }));
  });
};

// app/loader-with-discovery.ts
(() => {
  initFederationWithDiscovery("http://localhost:3000/teams", { mfeCollectionFilter: ["explore"] }).then(({ loader, manifest }) => {
    console.log(manifest);
    window.dispatchEvent(new CustomEvent("mfe-loader-available", { detail: { load: loader } }));
  });
})();
