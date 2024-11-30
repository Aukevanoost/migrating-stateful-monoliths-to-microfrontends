var h=class extends Error{constructor(e){super(e),this.name="NFError"}},v=class extends h{constructor(e){super(e),this.name="NFDiscoveryError"}},I=(e,r,s)=>{let c=t=>Object.keys(t).reduce((n,a)=>{if(!t[a])throw new v(`Could not preload remote '${a}', not available in discovery.`);return{...n,[a]:t[a].module.remoteEntry}},{}),d=(t,n)=>(a,o)=>{let l=s.getIfInitialized(n,a,o);return t(l)};return{init:(t,n)=>r.fetchDiscoveredRemotes(t,n).then(a=>{let o=c(a);return e.init(o).then(({load:l,importMap:u})=>({load:d(l,a),importMap:u,discovered:a}))})}},M=(e,r)=>{try{let s=e.split("."),c=r.split(".");for(let d=0;d<Math.min(s.length,c.length);d++){if(Number(s[d])>Number(c[d]))return 1;if(Number(s[d])<Number(c[d]))return-1}}catch{return e.localeCompare(r)}return 0},j=e=>e.reduce((r,s)=>({...r,[s]:"latest"}),{}),E=e=>e.sort(M)[0],S=(e,r)=>e.filter(s=>M(s,r)<0).sort(M)[0],P=e=>{let r=e.entry("discovery"),s=i=>E(Object.keys(i??{})),c=(i,t)=>t[i]?.version;return{getIfInitialized:(i,t,n)=>{let a=r.get()[t];if(!a||Object.keys(a).length<1)throw new v(`Remote '${t}' is not initialized.`);if(n||(n=c(t,i)??s(a)),!n)throw new v(`Remote '${t}' contains 0 initialized versions.`);let o=a[n];if(!o)throw new v(`Version '${n}' from remote '${t}' is not initialized.`);return o.module}}},O=(e,r,s)=>{let c=a=>{if(a==="skip-cache")return r.debug("[discovery] Skipping cached module configs"),!1;if(!e.entry("discovery").exists())return r.debug("[discovery] Discovery cache not found."),!1;let o=e.fetch("discovery"),l={};a==="all-latest"&&(r.debug(`[discovery] Adding 'latest' tag to cached remotes: ["${Object.keys(o).join('", "')}"]`),a=j(Object.keys(o)));for(let[u,m]of Object.entries(a)){if(!o[u]||Object.keys(o[u]).length===0)return r.warn(`[discovery] Remote ${u} does not exist in cache. Omitting cache`),!1;let p=m==="latest"?E(Object.keys(o[u])):m;if(!o[u][p])return r.warn(`[discovery] Version ${p} of ${u} does not exist in cache. Omitting cache`),!1;l[u]=o[u][p]}return l},d=a=>o=>((a==="all-latest"||Object.keys(a).length<1)&&(a=j(Object.keys(o))),Object.entries(a).reduce((l,[u,m])=>{if(!o[u]||typeof o[u]!="object")throw new v(`Remote '${u}' is not available in discovery.`);if(m==="latest"&&(m=E(Object.keys(o[u]))),!o[u][m]){r.warn(`[discovery] Version '${m}' of remote '${u}' is not available in discovery.`);let p=S(Object.keys(o[u]),m);if(!p)throw new v(`Remote '${u}' has no versions available before '${m}' in discovery.`);r.warn(`[discovery] Remote ${u} is falling back to version ${p}`),m=p}return{...l,[u]:o[u][m]}},{})),i=a=>(e.mutate("discovery",o=>(Object.entries(a).forEach(([l,u])=>{o[l]||(o[l]={}),o[l][u.version]||(o[l][u.version]=u)}),o)),a),t=a=>o=>{throw r.error(`${a}: ${o?.message??o}`),new v("[discovery] Could not load remote module configs")};return{fetchDiscoveredRemotes:(a,o)=>{let l=c(o);return l?(r.debug("[discovery] Retrieved remote configs from cache."),Promise.resolve(l)):(r.debug(`[discovery] Fetching discovery from ${a}`),o==="all-latest"&&(o={}),fetch(a).catch(t("Fetching manifest failed")).then(u=>s(u.json())).then(d(o)).catch(t("Mapping manifest failed")).then(i).catch(t("Could not update cache")))}}},_=e=>e;function T(e){let r=i=>e[i],s=i=>e[i].get();return{fetch:s,mutate:(i,t)=>{let n=t(s(i));return e[i].set(n),T(e)},get:()=>e,entry:r}}var R=(e,r)=>Object.entries(e).reduce((s,[c,d])=>({...s,[c]:r(c,d)}),{}),b="__NATIVE_FEDERATION__",H=(e,r)=>{globalThis[b]||(globalThis[b]={});let s=globalThis[b],c={get(){return s[e]??r},set(d){return s[e]=d,c},exists(){return e in s}};return c},k={externals:{},remoteNamesToRemote:{},baseUrlToRemoteNames:{}},C=R(k,H),A=()=>({createImportMap:s=>(document.head.appendChild(Object.assign(document.createElement("script"),{type:"importmap-shim",innerHTML:JSON.stringify(s)})),s),importModule:async s=>globalThis.importShim(s)}),w=e=>{let r=e.split("/");return r.pop(),r.join("/")},f=(e,r)=>(e=e.startsWith("/")?e.slice(1):e,r=r.endsWith("/")?r.slice(0,-1):r,`${e}/${r}`),V=e=>{let r=()=>({imports:{},scopes:{}}),s=t=>t.reduce((n,a)=>({imports:{...n.imports,...a.imports},scopes:{...n.scopes,...a.scopes}}),r()),c=(t,n)=>t.exposes.reduce((a,o)=>({...a,[f(n,o.key)]:f(t.baseUrl,o.outFileName)}),{}),d=t=>({[t.baseUrl+"/"]:e.mapSharedDeps(t)});return{toImportMap:(t,n)=>(n||(n=t.name),{imports:c(t,n),scopes:d(t)}),createEmpty:r,merge:s}},U=(e,r,s,c,d)=>{let i=(o={})=>typeof o=="string"?fetch(o).then(l=>l.json()):Promise.resolve(o),t=([o,l])=>s.loadRemoteInfo(l,o).then(u=>c.toImportMap(u,o)).catch(u=>(r.warn(`Error loading remoteEntry for ${o} at '${l}', skipping module`),c.createEmpty())),n=o=>Promise.all(Object.entries(o).map(t)).then(c.merge);return{init:(o={})=>i(o).then(n).then(e.createImportMap).then(l=>({importMap:l,load:d.load}))}},g={debug:0,warn:1,error:2},z=(e,r)=>Object.keys(g).filter(c=>isNaN(Number(c))).reduce((c,d)=>({...c,[d]:i=>{g[d]>=g[e]&&r[d](i)}}),{}),J={debug:e=>{},error:e=>{},warn:e=>{}},G=(e,r,s)=>{let c=t=>fetch(t).then(n=>n.json()).then(n=>({...n,baseUrl:w(t)})),d=(t,n)=>(e.mutate("remoteNamesToRemote",a=>({...a,[n]:t})),e.mutate("baseUrlToRemoteNames",a=>({...a,[t.baseUrl]:n})),r.debug(`Added remote '${n}' to the cache.`),t);return{loadRemoteInfo:(t,n)=>{if(!n&&t&&(n=e.fetch("baseUrlToRemoteNames")[w(t)]),!n)return Promise.reject(new h("Must provide valid remoteEntry or remoteName"));let a=e.fetch("remoteNamesToRemote")[n];return a?(r.debug(`Remote '${a.name}' retrieved from cache.`),Promise.resolve(a)):t?(r.debug(`Fetching '${n}' remoteEntry.json from: `+t),c(t).then(o=>d(o,n??o.name)).then(s.addSharedDepsToCache).catch(o=>(r.error("Failed to load remoteEntry: "+(o?.message??o)),Promise.reject(new h("Failed to load remoteEntry"))))):Promise.reject(new h(`Module not registered, provide a valid remoteEntryUrl for '${n}'`))}}},F=e=>`${e.packageName}@${e.version}`,W=e=>{let r=i=>e.fetch("externals")[F(i)],s=i=>i.shared.reduce((t,n)=>({...t,[n.packageName]:r(n)||f(i.baseUrl,n.outFileName)}),{}),c=i=>t=>i.shared.reduce((n,a)=>(n[F(a)]||(n[F(a)]=f(i.baseUrl,a.outFileName)),n),t);return{mapSharedDeps:s,addSharedDepsToCache:i=>(e.mutate("externals",c(i)),i)}},q=(e,r,s)=>{let c=(t,n)=>{if(typeof t=="string"&&n)return{remoteName:t,exposedModule:n};if(typeof t=="object"&&!n)return t;throw e.error("Failed to load remote module: exposedModule and/or remoteName not provided"),new h("Failed to load remote module")},d=(t,n)=>{let a=t.exposes.find(o=>o.key===n);if(!a)throw e.error(`Module '${n}'is not exposed in remote '${t.name}'`),new h("Failed to load remote module");return f(t.baseUrl,a.outFileName)};return{load:(t,n)=>{let a=c(t,n);if(e.debug(`Loading module ${JSON.stringify(a)}`),!a.remoteName||a.remoteName==="")throw new h("remoteName cannot be empty");return r.loadRemoteInfo(a.remoteEntry,a.remoteName).then(o=>d(o,a.exposedModule)).then(o=>(e.debug("Importing module: "+o),o)).then(s.importModule)}}},K=e=>({cache:e.cache??C,logger:e.logger??J,logLevel:e.logLevel??"error"}),Q=({cache:e,logger:r,logLevel:s})=>{let c=A(),d=T(e),i=z(s,r),t=W(d),n=G(d,i,t),a=V(t),o=q(i,n,c),l=U(c,i,n,a,o);return{domHandler:c,cacheHandler:d,logHandler:i,sharedInfoHandler:t,remoteInfoHandler:n,importMapHandler:a,remoteModuleHandler:o,initFederationHandler:l}},X=e=>({...K(e),cache:e.cache??{...C,...R({discovery:{}},H)},resolveFromCache:e.resolveFromCache??"all-latest",discoveryMapper:e.discoveryMapper??_}),Y=e=>{let r=Q(e),s=O(r.cacheHandler,r.logHandler,e.discoveryMapper),c=P(r.cacheHandler),d=I(r.initFederationHandler,s,c);return{...r,discoveryHandler:s,remoteModuleAdapter:c,initFederationAdapter:d}},N=(e,r={})=>{let s=X(r),{initFederationAdapter:c}=Y(s);return c.init(e,s.resolveFromCache)};var Z=Object.defineProperty,B=(e,r)=>{for(var s in r)Z(e,s,{get:r[s],enumerable:!0})};function D(e){let r=i=>e[i],s=i=>e[i].get();return{fetch:s,mutate:(i,t)=>{let n=t(s(i));return e[i].set(n),D(e)},get:()=>e,entry:r}}var $=(e,r)=>Object.entries(e).reduce((s,[c,d])=>({...s,[c]:r(c,d)}),{}),y="__NATIVE_FEDERATION__",L=(e,r)=>{globalThis[y]||(globalThis[y]={});let s=globalThis[y],c={get(){return s[e]??r},set(d){return s[e]=d,c},exists(){return e in s}};return c},ee=e=>$(e,L),re={externals:{},remoteNamesToRemote:{},baseUrlToRemoteNames:{}},te=$(re,L);var oe={};B(oe,{DEFAULT_CACHE:()=>te,NAMESPACE:()=>y,cacheHandlerFactory:()=>D,createGlobalCache:()=>ee,toCache:()=>$});var x={debug:e=>console.log(`[DEBUG]: ${e}`),error:e=>console.error(`[NF]: ${e}`),warn:e=>console.warn(`[NF]: ${e}`)};var ue=(e,r="error")=>N(e,{logLevel:r,logger:x});export{ue as initMicroFrontends};
//# sourceMappingURL=loader-from-discovery.js.map