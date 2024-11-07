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

// app/native-federation/global-cache.ts
var NAMESPACE = "__NATIVE_FEDERATION__";
var global = globalThis;
global[NAMESPACE] ??= {
  externals: /* @__PURE__ */ new Map(),
  remoteNamesToRemote: /* @__PURE__ */ new Map(),
  baseUrlToRemoteNames: /* @__PURE__ */ new Map()
};
var globalCache = global[NAMESPACE];
var toExternalKey = (shared) => {
  return `${shared.packageName}@${shared.version}`;
};
var getExternalUrl = (shared) => {
  return globalCache.externals.get(toExternalKey(shared));
};
var setExternalUrl = (shared, url) => {
  globalCache.externals.set(toExternalKey(shared), url);
};
var addRemote = (remoteName, remote) => {
  globalCache.remoteNamesToRemote.set(remoteName, remote);
  globalCache.baseUrlToRemoteNames.set(remote.baseUrl, remoteName);
};
var getRemoteNameByBaseUrl = (baseUrl) => {
  return globalCache.baseUrlToRemoteNames.get(baseUrl);
};
var isRemoteInitialized = (baseUrl) => {
  return globalCache.baseUrlToRemoteNames.has(baseUrl);
};
var getRemote = (remoteName) => {
  return globalCache.remoteNamesToRemote.get(remoteName);
};
var importRemoteScript = (url) => {
  return global.importShim(url);
};

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
    [shared.packageName]: getExternalUrl(shared) ?? joinPaths(baseUrl, shared.outFileName)
  }), {});
  remoteInfo.shared.forEach((shared) => {
    setExternalUrl(shared, scopedImports[shared.packageName]);
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
    addRemote(remoteName, { ...info, baseUrl });
    return createRemoteImportMap(info, remoteName, baseUrl);
  });
};

// app/native-federation/load-remote-module.ts
var loadRemoteModule = (optionsOrRemoteName, exposedModule) => {
  const options = normalizeOptions(optionsOrRemoteName, exposedModule);
  return initRemoteInfoIfUninitialized(options).then((_) => {
    const remoteName = getRemoteNameByOptions(options);
    const remote = getRemote(remoteName);
    if (!remote) throw new Error("unknown remote " + remoteName);
    const exposed = remote.exposes.find((e) => e.key === options.exposedModule);
    if (!exposed) throw new Error(`Unknown exposed module ${options.exposedModule} in remote ${remoteName}`);
    return joinPaths(remote.baseUrl, exposed.outFileName);
  }).then((url) => importRemoteScript(url));
};
var initRemoteInfoIfUninitialized = (options) => {
  if (!options.remoteEntry || isRemoteInitialized(getDirectory(options.remoteEntry))) {
    return Promise.resolve();
  }
  return processRemoteInfo(options.remoteEntry).then(appendImportMapToBody);
};
var getRemoteNameByOptions = (options) => {
  let remoteName = options.remoteName ?? getRemoteNameByBaseUrl(getDirectory(options.remoteEntry));
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

// app/native-federation/custom-discovery.ts
var MFEDiscoveryError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "MFEDiscoveryError";
  }
};
var fetchDiscovery = ({ disableCache, url } = { disableCache: false, url: "http://localhost:3000/teams" }) => {
  if (disableCache) sessionStorage.removeItem(NAMESPACE + ".discovery");
  const cache = sessionStorage.getItem(NAMESPACE + ".discovery");
  const mfe_discovery_manifest = !!cache ? Promise.resolve(JSON.parse(cache)) : fetch(url).then((r) => r.json());
  return mfe_discovery_manifest.then((r) => {
    if (!disableCache) sessionStorage.setItem(NAMESPACE + ".discovery", JSON.stringify(r));
    return r;
  });
};
var verifyMicroFrontendsAvailable = (requested) => (manifest) => {
  Object.entries(requested).forEach(([team, mfe]) => {
    if (!manifest[team]) Promise.reject(new MFEDiscoveryError(`Team '${team}' not found.`));
    const discMfe = Object.keys(manifest[team].microfrontends);
    mfe.forEach((reqMfe) => {
      if (!discMfe.includes(reqMfe)) Promise.reject(new MFEDiscoveryError(`Micro frontend not found in team '${team}', available: [${discMfe.join(", ")}]`));
    });
  });
  return Promise.resolve(manifest);
};

// app/main.ts
var loadMicroFrontends = (manifest) => (mfe) => {
  return verifyMicroFrontendsAvailable(mfe)(manifest).then((_) => {
    return initFederation(
      Object.keys(manifest).reduce((a, b) => {
        return { ...a, [b]: manifest[b].manifest };
      }, {})
    );
  }).then((_) => window.dispatchEvent(new Event("mfe-initialized"))).then((_) => {
    window.dispatchEvent(new Event("mfe-initialized"));
    return Promise.all(
      Object.entries(mfe).flatMap(
        ([team, components]) => components.map((comp) => [team, comp]).map(([team2, c]) => [team2, manifest[team2].microfrontends[c][0]]).map(
          ([team2, c]) => loadRemoteModule(team2, c.extras.nativefederation.key).then((_2) => window.dispatchEvent(new CustomEvent("mfe-loaded", {
            detail: { ...c.metadata, ...c.extras.nativefederation }
          })))
        )
      )
    );
  });
};
(() => {
  fetchDiscovery().then((manifest) => {
    window.dispatchEvent(new CustomEvent("mfe-discovered", {
      detail: loadMicroFrontends(manifest)
    }));
  });
})();
