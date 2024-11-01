var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// app/native-federation/util.ts
var getDirectory, joinPaths, normalizeOptions;
var init_util = __esm({
  "app/native-federation/util.ts"() {
    getDirectory = (url) => {
      const parts = url.split("/");
      parts.pop();
      return parts.join("/");
    };
    joinPaths = (path1, path2) => {
      while (path1.endsWith("/")) {
        path1 = path1.substring(0, path1.length - 1);
      }
      if (path2.startsWith("./")) {
        path2 = path2.substring(2, path2.length);
      }
      return `${path1}/${path2}`;
    };
    normalizeOptions = (optionsOrRemoteName, exposedModule) => {
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
  }
});

// app/native-federation/global-cache.ts
var NAMESPACE, global, globalCache, toExternalKey, getExternalUrl, setExternalUrl, addRemote, getRemoteNameByBaseUrl, isRemoteInitialized, getRemote, importRemoteScript;
var init_global_cache = __esm({
  "app/native-federation/global-cache.ts"() {
    NAMESPACE = "__NATIVE_FEDERATION__";
    global = globalThis;
    global[NAMESPACE] ??= {
      externals: /* @__PURE__ */ new Map(),
      remoteNamesToRemote: /* @__PURE__ */ new Map(),
      baseUrlToRemoteNames: /* @__PURE__ */ new Map()
    };
    globalCache = global[NAMESPACE];
    toExternalKey = (shared) => {
      return `${shared.packageName}@${shared.version}`;
    };
    getExternalUrl = (shared) => {
      return globalCache.externals.get(toExternalKey(shared));
    };
    setExternalUrl = (shared, url) => {
      globalCache.externals.set(toExternalKey(shared), url);
    };
    addRemote = (remoteName, remote) => {
      globalCache.remoteNamesToRemote.set(remoteName, remote);
      globalCache.baseUrlToRemoteNames.set(remote.baseUrl, remoteName);
    };
    getRemoteNameByBaseUrl = (baseUrl) => {
      return globalCache.baseUrlToRemoteNames.get(baseUrl);
    };
    isRemoteInitialized = (baseUrl) => {
      return globalCache.baseUrlToRemoteNames.has(baseUrl);
    };
    getRemote = (remoteName) => {
      return globalCache.remoteNamesToRemote.get(remoteName);
    };
    importRemoteScript = (url) => {
      return global.importShim(url);
    };
  }
});

// app/native-federation/import-map.ts
var createEmptyImportMap, createRemoteImportMap, mergeImportMaps, appendImportMapToBody;
var init_import_map = __esm({
  "app/native-federation/import-map.ts"() {
    init_global_cache();
    init_util();
    createEmptyImportMap = () => ({
      imports: {},
      scopes: {}
    });
    createRemoteImportMap = (remoteInfo, remoteName, baseUrl) => {
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
    mergeImportMaps = (importMaps) => importMaps.reduce(
      (acc, importMap) => ({
        imports: { ...acc.imports, ...importMap.imports },
        scopes: { ...acc.scopes, ...importMap.scopes }
      }),
      createEmptyImportMap()
    );
    appendImportMapToBody = (importMap) => {
      document.head.appendChild(
        Object.assign(document.createElement("script"), {
          type: "importmap-shim",
          innerHTML: JSON.stringify(importMap)
        })
      );
    };
  }
});

// app/native-federation/remote-info.ts
var processRemoteInfos, processRemoteInfo;
var init_remote_info = __esm({
  "app/native-federation/remote-info.ts"() {
    init_import_map();
    init_util();
    init_global_cache();
    processRemoteInfos = async (remotes) => {
      return Promise.all(
        Object.keys(remotes).map((remoteName) => {
          return processRemoteInfo(remotes[remoteName], remoteName).catch((_) => {
            console.error(`Error loading remote entry for ${remoteName} from file ${remotes[remoteName]}`);
            return createEmptyImportMap();
          });
        })
      ).then(mergeImportMaps);
    };
    processRemoteInfo = (federationInfoUrl, remoteName) => {
      return fetch(federationInfoUrl).then((r) => r.json()).then((info) => {
        if (!remoteName) remoteName = info.name;
        const baseUrl = getDirectory(federationInfoUrl);
        addRemote(remoteName, { ...info, baseUrl });
        return createRemoteImportMap(info, remoteName, baseUrl);
      });
    };
  }
});

// app/native-federation/load-remote-module.ts
var loadRemoteModule, initRemoteInfoIfUninitialized, getRemoteNameByOptions;
var init_load_remote_module = __esm({
  "app/native-federation/load-remote-module.ts"() {
    init_util();
    init_global_cache();
    init_remote_info();
    init_import_map();
    loadRemoteModule = (optionsOrRemoteName, exposedModule) => {
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
    initRemoteInfoIfUninitialized = (options) => {
      if (!options.remoteEntry || isRemoteInitialized(getDirectory(options.remoteEntry))) {
        return Promise.resolve();
      }
      return processRemoteInfo(options.remoteEntry).then(appendImportMapToBody);
    };
    getRemoteNameByOptions = (options) => {
      let remoteName = options.remoteName ?? getRemoteNameByBaseUrl(getDirectory(options.remoteEntry));
      if (!remoteName) throw new Error("unexpected arguments: Please pass remoteName or remoteEntry");
      return remoteName;
    };
  }
});

// app/native-federation/init-federation.ts
var initFederation, fetchRemotes;
var init_init_federation = __esm({
  "app/native-federation/init-federation.ts"() {
    init_import_map();
    init_remote_info();
    initFederation = async (remotesOrManifestUrl = {}) => {
      return fetchRemotes(remotesOrManifestUrl).then(processRemoteInfos).then((importMap) => {
        appendImportMapToBody(importMap);
        return importMap;
      });
    };
    fetchRemotes = (remotesOrManifestUrl = {}) => typeof remotesOrManifestUrl === "string" ? fetch(remotesOrManifestUrl).then((r) => r.json()) : Promise.resolve(remotesOrManifestUrl);
  }
});

// app/native-federation/index.ts
var init_native_federation = __esm({
  "app/native-federation/index.ts"() {
    init_load_remote_module();
    init_init_federation();
  }
});

// app/app.ts
var app_exports = {};
__export(app_exports, {
  loadMicroFrontend: () => loadMicroFrontend
});
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
var init_app = __esm({
  "app/app.ts"() {
    init_native_federation();
  }
});

// app/main.ts
init_native_federation();
(async () => {
  await initFederation({
    "explore": "http://localhost:4201/remoteEntry.json"
  });
  const { loadMicroFrontend: loadMicroFrontend2 } = await Promise.resolve().then(() => (init_app(), app_exports));
  window.dispatchEvent(new CustomEvent("loader-available", { detail: loadMicroFrontend2 }));
})();
