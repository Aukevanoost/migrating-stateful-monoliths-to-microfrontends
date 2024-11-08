// app/native-federation/util.ts
var getDirectory = (url) => {
  const parts = url.split("/");
  parts.pop();
  return parts.join("/");
};
var joinPaths = (path1, path2) => {
  while (path1.endsWith("/")) {
    path1 = path1.substring(0, path1.length - 1);
  }
  if (path2.startsWith("./")) {
    path2 = path2.substring(2, path2.length);
  }
  return `${path1}/${path2}`;
};
var normalizeOptions = (optionsOrRemoteName, exposedModule) => {
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

// app/native-federation/cache/cache.ts
var NAMESPACE = "__NATIVE_FEDERATION__";

// app/native-federation/cache/session-cache.ts
function sessionEntry(key, _init) {
  function set(value) {
    const clean = typeof value === "string" ? value : JSON.stringify(value);
    sessionStorage.setItem(`${NAMESPACE}.${key}`, clean);
    return this;
  }
  function get() {
    return JSON.parse(sessionStorage.getItem(`${NAMESPACE}.${key}`)) ?? _init;
  }
  function exists() {
    return !!sessionStorage.getItem(`${NAMESPACE}.${key}`);
  }
  return { get, set, exists };
}
var getSessionCache = () => ({
  externals: sessionEntry("externals", {}),
  remoteNamesToRemote: sessionEntry("remoteNamesToRemote", {}),
  baseUrlToRemoteNames: sessionEntry("baseUrlToRemoteNames", {}),
  discovery: sessionEntry("discovery", void 0)
});

// app/native-federation/cache/cache-handler.ts
function cacheHandler(_cache) {
  const toExternalKey = (shared) => {
    return `${shared.packageName}@${shared.version}`;
  };
  const getExternalUrl = (shared) => {
    return _cache.externals.get()[toExternalKey(shared)];
  };
  const setExternalUrl = (shared, url) => {
    _cache.externals.set({
      ..._cache.externals.get(),
      [toExternalKey(shared)]: url
    });
  };
  const addRemote = (remoteName, remote) => {
    _cache.remoteNamesToRemote.set({
      ..._cache.remoteNamesToRemote.get(),
      [remoteName]: remote
    });
    _cache.baseUrlToRemoteNames.set({
      ..._cache.baseUrlToRemoteNames.get(),
      [remote.baseUrl]: remoteName
    });
  };
  const entry = (key) => {
    return _cache[key];
  };
  const fetch2 = (key) => {
    return _cache[key].get();
  };
  const getRemoteNameByBaseUrl = (baseUrl) => {
    return _cache.baseUrlToRemoteNames.get()[baseUrl];
  };
  return { fetch: fetch2, entry, getExternalUrl, setExternalUrl, addRemote, getRemoteNameByBaseUrl };
}
var CACHE = cacheHandler(
  getSessionCache()
);

// app/native-federation/import-map.ts
var createEmptyImportMap = () => ({
  imports: {},
  scopes: {}
});
var createRemoteImportMap = (remoteInfo, remoteName, baseUrl) => {
  const imports = remoteInfo.exposes.reduce((acc, remote) => ({
    ...acc,
    [joinPaths(remoteName, remote.key)]: joinPaths(baseUrl, remote.outFileName)
  }), {});
  const scopedImports = remoteInfo.shared.reduce((acc, shared) => ({
    ...acc,
    [shared.packageName]: CACHE.getExternalUrl(shared) ?? joinPaths(baseUrl, shared.outFileName)
  }), {});
  remoteInfo.shared.forEach((shared) => {
    CACHE.setExternalUrl(shared, scopedImports[shared.packageName]);
  });
  return {
    imports,
    scopes: { [baseUrl + "/"]: scopedImports }
  };
};
var mergeImportMaps = (importMaps) => {
  return importMaps.reduce(
    (acc, importMap) => ({
      imports: { ...acc.imports, ...importMap.imports },
      scopes: { ...acc.scopes, ...importMap.scopes }
    }),
    createEmptyImportMap()
  );
};
var appendImportMapToBody = (importMap) => {
  document.head.appendChild(
    Object.assign(document.createElement("script"), {
      type: "importmap-shim",
      innerHTML: JSON.stringify(importMap)
    })
  );
};

// app/native-federation/remote-info.ts
var processRemoteInfos = async (remotes) => {
  return Promise.all(
    Object.keys(remotes).map((remoteName) => {
      return processRemoteInfo(remotes[remoteName], remoteName).catch((_) => {
        console.error(`Error loading remote entry for ${remoteName} from file ${remotes[remoteName]}`);
        return createEmptyImportMap();
      });
    })
  ).then(mergeImportMaps);
};
var processRemoteInfo = (federationInfoUrl, remoteName) => {
  return fetch(federationInfoUrl).then((r) => r.json()).then((info) => {
    if (!remoteName) remoteName = info.name;
    const baseUrl = getDirectory(federationInfoUrl);
    CACHE.addRemote(remoteName, { ...info, baseUrl });
    return createRemoteImportMap(info, remoteName, baseUrl);
  });
};

// app/native-federation/load-remote-module.ts
var loadRemoteModule = (optionsOrRemoteName, exposedModule) => {
  const options = normalizeOptions(optionsOrRemoteName, exposedModule);
  return initRemoteInfoIfUninitialized(options).then((_) => {
    const remoteName = getRemoteNameByOptions(options);
    const remote = CACHE.fetch("remoteNamesToRemote")[remoteName];
    if (!remote) throw new Error("unknown remote " + remoteName);
    const exposed = remote.exposes.find((e) => e.key === options.exposedModule);
    if (!exposed) throw new Error(`Unknown exposed module ${options.exposedModule} in remote ${remoteName}`);
    return joinPaths(remote.baseUrl, exposed.outFileName);
  }).then((url) => {
    return globalThis.importShim(url);
  });
};
var initRemoteInfoIfUninitialized = (options) => {
  if (!options.remoteEntry || CACHE.getRemoteNameByBaseUrl(getDirectory(options.remoteEntry))) {
    return Promise.resolve();
  }
  return processRemoteInfo(options.remoteEntry).then(appendImportMapToBody);
};
var getRemoteNameByOptions = (options) => {
  let remoteName = options.remoteName ?? CACHE.getRemoteNameByBaseUrl(getDirectory(options.remoteEntry));
  if (!remoteName) throw new Error("unexpected arguments: Please pass remoteName or remoteEntry");
  return remoteName;
};

// app/native-federation/init-federation.ts
var initFederation = (remotesOrManifestUrl = {}) => {
  return fetchRemotes(remotesOrManifestUrl).then(processRemoteInfos).then((importMap) => {
    appendImportMapToBody(importMap);
    return importMap;
  });
};
var fetchRemotes = (remotesOrManifestUrl = {}) => typeof remotesOrManifestUrl === "string" ? fetch(remotesOrManifestUrl).then((r) => r.json()) : Promise.resolve(remotesOrManifestUrl);

// app/loader.ts
(async () => {
  await initFederation({
    "explore": "http://localhost:4200/remoteEntry.json"
  });
  window.dispatchEvent(new CustomEvent("mfe-loader-available", { detail: { load: loadRemoteModule } }));
})();
