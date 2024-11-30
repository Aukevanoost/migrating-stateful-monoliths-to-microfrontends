var T=Object.defineProperty,C=(e,o)=>{for(var n in o)T(e,n,{get:o[n],enumerable:!0})};function v(e){let o=c=>e[c],n=c=>e[c].get();return{fetch:n,mutate:(c,t)=>{let r=t(n(c));return e[c].set(r),v(e)},get:()=>e,entry:o}}var b=(e,o)=>Object.entries(e).reduce((n,[d,i])=>({...n,[d]:o(d,i)}),{}),p="__NATIVE_FEDERATION__",y=(e,o)=>{globalThis[p]||(globalThis[p]={});let n=globalThis[p],d={get(){return n[e]??o},set(i){return n[e]=i,d},exists(){return e in n}};return d},H=e=>b(e,y),N={externals:{},remoteNamesToRemote:{},baseUrlToRemoteNames:{}},E=b(N,y),R=()=>({createImportMap:n=>(document.head.appendChild(Object.assign(document.createElement("script"),{type:"importmap-shim",innerHTML:JSON.stringify(n)})),n),importModule:async n=>globalThis.importShim(n)}),F=e=>{let o=e.split("/");return o.pop(),o.join("/")},m=(e,o)=>(e=e.startsWith("/")?e.slice(1):e,o=o.endsWith("/")?o.slice(0,-1):o,`${e}/${o}`),j=e=>{let o=()=>({imports:{},scopes:{}}),n=t=>t.reduce((r,a)=>({imports:{...r.imports,...a.imports},scopes:{...r.scopes,...a.scopes}}),o()),d=(t,r)=>t.exposes.reduce((a,s)=>({...a,[m(r,s.key)]:m(t.baseUrl,s.outFileName)}),{}),i=t=>({[t.baseUrl+"/"]:e.mapSharedDeps(t)});return{toImportMap:(t,r)=>(r||(r=t.name),{imports:d(t,r),scopes:i(t)}),createEmpty:o,merge:n}},$=(e,o,n,d,i)=>{let c=(s={})=>typeof s=="string"?fetch(s).then(l=>l.json()):Promise.resolve(s),t=([s,l])=>n.loadRemoteInfo(l,s).then(f=>d.toImportMap(f,s)).catch(f=>(o.warn(`Error loading remoteEntry for ${s} at '${l}', skipping module`),d.createEmpty())),r=s=>Promise.all(Object.entries(s).map(t)).then(d.merge);return{init:(s={})=>c(s).then(r).then(e.createImportMap).then(l=>({importMap:l,load:i.load}))}},h={debug:0,warn:1,error:2},w=(e,o)=>Object.keys(h).filter(d=>isNaN(Number(d))).reduce((d,i)=>({...d,[i]:c=>{h[i]>=h[e]&&o[i](c)}}),{}),L={debug:e=>{},error:e=>{},warn:e=>{}},u=class extends Error{constructor(e){super(e),this.name="NFError"}},S=(e,o,n)=>{let d=t=>fetch(t).then(r=>r.json()).then(r=>({...r,baseUrl:F(t)})),i=(t,r)=>(e.mutate("remoteNamesToRemote",a=>({...a,[r]:t})),e.mutate("baseUrlToRemoteNames",a=>({...a,[t.baseUrl]:r})),o.debug(`Added remote '${r}' to the cache.`),t);return{loadRemoteInfo:(t,r)=>{if(!r&&t&&(r=e.fetch("baseUrlToRemoteNames")[F(t)]),!r)return Promise.reject(new u("Must provide valid remoteEntry or remoteName"));let a=e.fetch("remoteNamesToRemote")[r];return a?(o.debug(`Remote '${a.name}' retrieved from cache.`),Promise.resolve(a)):t?(o.debug(`Fetching '${r}' remoteEntry.json from: `+t),d(t).then(s=>i(s,r??s.name)).then(n.addSharedDepsToCache).catch(s=>(o.error("Failed to load remoteEntry: "+(s?.message??s)),Promise.reject(new u("Failed to load remoteEntry"))))):Promise.reject(new u(`Module not registered, provide a valid remoteEntryUrl for '${r}'`))}}},g=e=>`${e.packageName}@${e.version}`,D=e=>{let o=c=>e.fetch("externals")[g(c)],n=c=>c.shared.reduce((t,r)=>({...t,[r.packageName]:o(r)||m(c.baseUrl,r.outFileName)}),{}),d=c=>t=>c.shared.reduce((r,a)=>(r[g(a)]||(r[g(a)]=m(c.baseUrl,a.outFileName)),r),t);return{mapSharedDeps:n,addSharedDepsToCache:c=>(e.mutate("externals",d(c)),c)}},P=(e,o,n)=>{let d=(t,r)=>{if(typeof t=="string"&&r)return{remoteName:t,exposedModule:r};if(typeof t=="object"&&!r)return t;throw e.error("Failed to load remote module: exposedModule and/or remoteName not provided"),new u("Failed to load remote module")},i=(t,r)=>{let a=t.exposes.find(s=>s.key===r);if(!a)throw e.error(`Module '${r}'is not exposed in remote '${t.name}'`),new u("Failed to load remote module");return m(t.baseUrl,a.outFileName)};return{load:(t,r)=>{let a=d(t,r);if(e.debug(`Loading module ${JSON.stringify(a)}`),!a.remoteName||a.remoteName==="")throw new u("remoteName cannot be empty");return o.loadRemoteInfo(a.remoteEntry,a.remoteName).then(s=>i(s,a.exposedModule)).then(s=>(e.debug("Importing module: "+s),s)).then(n.importModule)}}},_=e=>({cache:e.cache??E,logger:e.logger??L,logLevel:e.logLevel??"error"}),x=({cache:e,logger:o,logLevel:n})=>{let d=R(),i=v(e),c=w(n,o),t=D(i),r=S(i,c,t),a=j(t),s=P(c,r,d),l=$(d,c,r,a,s);return{domHandler:d,cacheHandler:i,logHandler:c,sharedInfoHandler:t,remoteInfoHandler:r,importMapHandler:a,remoteModuleHandler:s,initFederationHandler:l}},M=(e={},o={})=>{let{initFederationHandler:n}=x(_(o));return n.init(e)};var I={};C(I,{DEFAULT_CACHE:()=>E,NAMESPACE:()=>p,cacheHandlerFactory:()=>v,createGlobalCache:()=>H,toCache:()=>b});var G=(e,o)=>(typeof e=="object"&&!o&&(o=Object.keys(e)),M(e).then(({load:n,importMap:d})=>Promise.all(o.map(i=>n(i,"./Component")))));export{G as initMicroFrontends};
//# sourceMappingURL=loader.js.map