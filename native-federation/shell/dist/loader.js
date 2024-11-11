// app/native-federation/utils/dom.ts
var appendImportMapToBody = (map) => {
  document.head.appendChild(
    Object.assign(document.createElement("script"), {
      type: "importmap-shim",
      innerHTML: JSON.stringify(map)
    })
  );
  return map;
};

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

// app/native-federation/native-federation-error.ts
var NativeFederationError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "NFError";
  }
};

// app/native-federation/cache/cache.handler.ts
function cacheHandlerFactory(_cache) {
  const entry = (key) => {
    return _cache[key];
  };
  const fetch2 = (key) => {
    return _cache[key].get();
  };
  const mutate = (key, mutateFn) => {
    const newVal = mutateFn(fetch2(key));
    _cache[key].set(newVal);
    return cacheHandlerFactory(_cache);
  };
  const get = () => _cache;
  return { fetch: fetch2, mutate, get, entry };
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

// app/native-federation/dependency/dependency.handler.ts
var toExternalKey = (shared) => {
  return `${shared.packageName}@${shared.version}`;
};
var dependencyHandlerFactory = (cache) => {
  const getSharedDepRef = (dep) => {
    return cache.fetch("externals")[toExternalKey(dep)];
  };
  const mapSharedDeps = (remoteInfo) => {
    return remoteInfo.shared.reduce((dependencies, moduleDep) => {
      return {
        ...dependencies,
        [moduleDep.packageName]: getSharedDepRef(moduleDep) || join(remoteInfo.baseUrl, moduleDep.outFileName)
      };
    }, {});
  };
  const mapModuleDepsIntoSharedDepsList = (remoteInfo) => (sharedList) => {
    return remoteInfo.shared.reduce((existing, dep) => {
      if (!existing[toExternalKey(dep)]) {
        existing[toExternalKey(dep)] = join(remoteInfo.baseUrl, dep.outFileName);
      }
      return existing;
    }, sharedList);
  };
  const addSharedDepsToCache = (remoteInfo) => {
    cache.mutate("externals", mapModuleDepsIntoSharedDepsList(remoteInfo));
    return remoteInfo;
  };
  return { mapSharedDeps, addSharedDepsToCache };
};

// app/native-federation/import-map/create-empty-import-map.ts
var createEmptyImportMap = () => ({
  imports: {},
  scopes: {}
});

// app/native-federation/import-map/import-map.handler.ts
var importMapHandlerFactory = (dependencyHandler) => {
  const getImports = (remoteInfo, remoteName) => {
    return remoteInfo.exposes.reduce((acc, remote) => ({
      ...acc,
      [join(remoteName, remote.key)]: join(remoteInfo.baseUrl, remote.outFileName)
    }), {});
  };
  const getScopedDeps = (remoteInfo) => {
    return { [remoteInfo.baseUrl + "/"]: dependencyHandler.mapSharedDeps(remoteInfo) };
  };
  const toImportMap = (remoteInfo, remoteName) => {
    if (!remoteName) remoteName = remoteInfo.name;
    return {
      imports: getImports(remoteInfo, remoteName),
      scopes: getScopedDeps(remoteInfo)
    };
  };
  return { toImportMap };
};

// app/native-federation/remote-info/remote-info.handler.ts
var remoteInfoHandlerFactory = (cacheHandler, dependencyHandler) => {
  const fromEntryJson = (entryUrl) => {
    return fetch(entryUrl).then((r) => r.json()).then((cfg) => ({ ...cfg, baseUrl: getDir(entryUrl) }));
  };
  const addRemoteModuleToCache = (remoteInfo, remoteName) => {
    cacheHandler.mutate("remoteNamesToRemote", (v) => ({ ...v, [remoteName]: remoteInfo }));
    cacheHandler.mutate("baseUrlToRemoteNames", (v) => ({ ...v, [remoteInfo.baseUrl]: remoteName }));
    return remoteInfo;
  };
  const loadRemoteInfo = (remoteEntryUrl, remoteName) => {
    if (!remoteEntryUrl && !remoteName) return Promise.reject("Must provide valid remoteEntry or remoteName");
    if (!remoteName) remoteName = cacheHandler.fetch("baseUrlToRemoteNames")[getDir(remoteEntryUrl)];
    const cachedRemote = cacheHandler.fetch("remoteNamesToRemote")[remoteName];
    if (!!cachedRemote) return Promise.resolve(cachedRemote);
    return fromEntryJson(remoteEntryUrl).then((info) => addRemoteModuleToCache(info, remoteName ?? info.name)).then(dependencyHandler.addSharedDepsToCache);
  };
  return { loadRemoteInfo };
};

// app/native-federation/resolver.ts
var resolveNativeFedationHandlers = (cacheHandler) => {
  const dependencyHandler = dependencyHandlerFactory(cacheHandler);
  const remoteInfoHandler = remoteInfoHandlerFactory(cacheHandler, dependencyHandler);
  const importMapHandler = importMapHandlerFactory(dependencyHandler);
  return { dependencyHandler, remoteInfoHandler, importMapHandler };
};
var resolver = (cache) => {
  const cacheHandler = cacheHandlerFactory(cache);
  return {
    cacheHandler,
    ...resolveNativeFedationHandlers(cacheHandler)
  };
};

// app/native-federation/cache/cache.contract.ts
var NAMESPACE = "__NATIVE_FEDERATION__";

// app/native-federation/cache/global-cache.ts
var globalCacheEntry = (key, _fallback) => {
  if (!globalThis[NAMESPACE]) {
    globalThis[NAMESPACE] = {};
  }
  const namespace = globalThis[NAMESPACE];
  const entry = {
    get() {
      return namespace[key] ?? _fallback;
    },
    set(value) {
      namespace[key] = value;
      return entry;
    },
    exists() {
      return key in namespace;
    }
  };
  return entry;
};

// app/native-federation/cache/index.ts
var DEFAULT_CACHE = toCache({
  externals: {},
  remoteNamesToRemote: {},
  baseUrlToRemoteNames: {}
}, globalCacheEntry);

// app/native-federation/load-remote-module.ts
var remoteModuleLoaderFactory = (remoteInfoHandler) => {
  const mapToRemoteModule = (optionsOrRemoteName, exposedModule) => {
    if (typeof optionsOrRemoteName === "string" && exposedModule) {
      return {
        remoteName: optionsOrRemoteName,
        exposedModule
      };
    } else if (typeof optionsOrRemoteName === "object" && !exposedModule) {
      return optionsOrRemoteName;
    }
    throw new NativeFederationError("unexpected arguments: please pass options or a remoteName/exposedModule-pair");
  };
  const getExposedModuleUrl = (remoteInfo, exposedModule) => {
    const exposed = remoteInfo.exposes.find((e) => e.key === exposedModule);
    if (!exposed) throw new NativeFederationError(`Unknown exposed module ${exposedModule} in remote ${remoteInfo.name}`);
    return join(remoteInfo.baseUrl, exposed.outFileName);
  };
  const load = (remoteNameOrModule, exposedModule) => {
    const remoteModule = mapToRemoteModule(remoteNameOrModule, exposedModule);
    if (!remoteModule.remoteName || remoteModule.remoteName === "") throw new NativeFederationError("remoteName cannot be empty");
    return remoteInfoHandler.loadRemoteInfo(remoteModule.remoteEntry, remoteModule.remoteName).then((info) => getExposedModuleUrl(info, remoteModule.exposedModule)).then((url) => globalThis.importShim(url));
  };
  return { load };
};

// app/native-federation/import-map/merge-import-maps.ts
var mergeImportMaps = (maps) => {
  return maps.reduce(
    (acc, map) => ({
      imports: { ...acc.imports, ...map.imports },
      scopes: { ...acc.scopes, ...map.scopes }
    }),
    createEmptyImportMap()
  );
};

// app/native-federation/init-federation.ts
var federationInitializerFactory = (remoteInfoHandler, importMapHandler) => {
  const fetchRemotes = (remotesOrManifestUrl = {}) => typeof remotesOrManifestUrl === "string" ? fetch(remotesOrManifestUrl).then((r) => r.json()) : Promise.resolve(remotesOrManifestUrl);
  const createImportMapFromRemotes = (remotes) => {
    return Promise.all(
      Object.entries(remotes).map(([remoteName, remoteEntryUrl]) => {
        return remoteInfoHandler.loadRemoteInfo(remoteEntryUrl, remoteName).then((info) => importMapHandler.toImportMap(info, remoteName)).catch((_) => {
          console.warn(`Error loading remoteEntry for ${remoteName} at '${remoteEntryUrl}', skipping module`);
          return createEmptyImportMap();
        });
      })
    ).then(mergeImportMaps);
  };
  const init = (remotesOrManifestUrl = {}) => {
    return fetchRemotes(remotesOrManifestUrl).then(createImportMapFromRemotes).then(appendImportMapToBody).then((importMap) => ({
      importMap,
      load: remoteModuleLoaderFactory(remoteInfoHandler).load
    }));
  };
  return { init };
};
var initFederation = (remotesOrManifestUrl = {}) => {
  const { remoteInfoHandler, importMapHandler } = resolver(DEFAULT_CACHE);
  const nfInitializer = federationInitializerFactory(remoteInfoHandler, importMapHandler);
  return nfInitializer.init(remotesOrManifestUrl);
};

// app/loader.ts
(() => {
  initFederation("http://localhost:3000/native-federation").then(({ load, importMap }) => {
    console.log("importMap: ", importMap);
    window.dispatchEvent(new CustomEvent("mfe-loader-available", { detail: { load } }));
  });
})();
