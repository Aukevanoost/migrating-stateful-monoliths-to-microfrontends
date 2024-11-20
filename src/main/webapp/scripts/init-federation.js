function h(r){let o=e=>r[e],s=e=>r[e].get();return{fetch:s,mutate:(e,t)=>{let a=t(s(e));return r[e].set(a),h(r)},get:()=>r,entry:o}}var f=(r,o)=>Object.entries(r).reduce((s,[i,n])=>({...s,[i]:o(i,n)}),{}),d="__NATIVE_FEDERATION__",g=(r,o)=>{globalThis[d]||(globalThis[d]={});let s=globalThis[d],i={get(){return s[r]??o},set(n){return s[r]=n,i},exists(){return r in s}};return i},T={externals:{},remoteNamesToRemote:{},baseUrlToRemoteNames:{}},b=f(T,g),v=()=>({imports:{},scopes:{}}),m=r=>{let o=r.split("/");return o.pop(),o.join("/")},u=(r,o)=>(r=r.startsWith("/")?r.slice(1):r,o=o.endsWith("/")?o.slice(0,-1):o,`${r}/${o}`),F=r=>{let o=(n,e)=>n.exposes.reduce((t,a)=>({...t,[u(e,a.key)]:u(n.baseUrl,a.outFileName)}),{}),s=n=>({[n.baseUrl+"/"]:r.mapSharedDeps(n)});return{toImportMap:(n,e)=>(e||(e=n.name),{imports:o(n,e),scopes:s(n)})}},E=r=>r.reduce((o,s)=>({imports:{...o.imports,...s.imports},scopes:{...o.scopes,...s.scopes}}),v()),l=class extends Error{constructor(r){super(r),this.name="NFError"}},M=(r,o)=>{let s=e=>fetch(e).then(t=>t.json()).then(t=>({...t,baseUrl:m(e)})),i=(e,t)=>(r.mutate("remoteNamesToRemote",a=>({...a,[t]:e})),r.mutate("baseUrlToRemoteNames",a=>({...a,[e.baseUrl]:t})),e);return{loadRemoteInfo:(e,t)=>{if(!t&&e&&(t=r.fetch("baseUrlToRemoteNames")[m(e)]),!t)return Promise.reject("Must provide valid remoteEntry or remoteName");let a=r.fetch("remoteNamesToRemote")[t];return a?Promise.resolve(a):e?s(e).then(c=>i(c,t??c.name)).then(o.addSharedDepsToCache):Promise.reject(`Module not registered, provide a valid remoteEntryUrl for '${t}'`)}}},p=r=>`${r.packageName}@${r.version}`,y=r=>{let o=e=>r.fetch("externals")[p(e)],s=e=>e.shared.reduce((t,a)=>({...t,[a.packageName]:o(a)||u(e.baseUrl,a.outFileName)}),{}),i=e=>t=>e.shared.reduce((a,c)=>(a[p(c)]||(a[p(c)]=u(e.baseUrl,c.outFileName)),a),t);return{mapSharedDeps:s,addSharedDepsToCache:e=>(r.mutate("externals",i(e)),e)}},R=r=>{let o=y(r),s=M(r,o),i=F(o);return{sharedInfoHandler:o,remoteInfoHandler:s,importMapHandler:i}},N=r=>{let o=h(r);return{cacheHandler:o,...R(o)}},I=r=>{let o=(n,e)=>{if(typeof n=="string"&&e)return{remoteName:n,exposedModule:e};if(typeof n=="object"&&!e)return n;throw new l("unexpected arguments: please pass options or a remoteName/exposedModule-pair")},s=(n,e)=>{let t=n.exposes.find(a=>a.key===e);if(!t)throw new l(`Unknown exposed module ${e} in remote ${n.name}`);return u(n.baseUrl,t.outFileName)};return{load:(n,e)=>{let t=o(n,e);if(!t.remoteName||t.remoteName==="")throw new l("remoteName cannot be empty");return r.loadRemoteInfo(t.remoteEntry,t.remoteName).then(a=>s(a,t.exposedModule)).then(a=>globalThis.importShim(a))}}};var S=r=>(document.head.appendChild(Object.assign(document.createElement("script"),{type:"importmap-shim",innerHTML:JSON.stringify(r)})),r),x=(r,o)=>{let s=(e={})=>typeof e=="string"?fetch(e).then(t=>t.json()):Promise.resolve(e),i=e=>Promise.all(Object.entries(e).map(([t,a])=>r.loadRemoteInfo(a,t).then(c=>o.toImportMap(c,t)).catch(c=>(console.warn(`Error loading remoteEntry for ${t} at '${a}', skipping module`),v())))).then(E);return{init:(e={})=>s(e).then(i).then(S).then(t=>({importMap:t,load:I(r).load}))}},D=(r={},o={})=>{let{remoteInfoHandler:s,importMapHandler:i}=N(o.cache??b);return x(s,i).init(r)};export{D as initFederation};
//# sourceMappingURL=init-federation.js.map
