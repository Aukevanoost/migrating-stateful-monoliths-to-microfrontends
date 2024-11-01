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

// app/main.ts
function loadMicroFrontend(team, component, containerID) {
  return loadRemoteModule(team, `./${component}`).then((_) => {
    if (!!containerID) {
      const comp = document.createElement(component);
      const container = document.getElementById(containerID);
      if (!container) {
        throw new Error(`Container element with id '${containerID}' not found`);
      }
      container.appendChild(comp);
    }
  });
}
(async () => {
  await initFederation({
    "explore": "http://localhost:4201/remoteEntry.json"
  });
  window.dispatchEvent(new CustomEvent("loader-available", { detail: loadMicroFrontend }));
})();
