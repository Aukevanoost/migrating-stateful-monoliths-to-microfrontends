import{a as Le,b as Qe,c as Ze,d as wt,e as et}from"./chunk-4KRK3UJB.js";import{APP_ID as Rt,provideZoneChangeDetection as Dt}from"@angular/core";import{provideHttpClient as St,withFetch as Ot}from"@angular/common/http";import{MFE_ENV as Nt}from"@shared";import{APP_BASE_HREF as Mt}from"@angular/common";var It,tt,nt=Ze(()=>{"use strict";It={cdn:"http://localhost:4000",shell:"http://localhost:8080",api:"http://localhost:8081/v1",mfe:"http://localhost:4000/recommendations"},tt={providers:[{provide:Rt,useValue:"exp-recommendations"},{provide:Mt,useValue:"http://localhost:4000/recommendations"},{provide:Nt,useValue:It},Dt({eventCoalescing:!0}),St(Ot())]}});import{inject as rt,signal as Lt}from"@angular/core";import{CommonModule as Zt}from"@angular/common";import{FeaturedHttpService as ot,fromCDNPipe as xt,MFE_ENV as At}from"@shared";import*as Z from"@angular/core";function Ht(e,n){if(e&1&&(Z.\u0275\u0275elementStart(0,"li",2)(1,"a",3),Z.\u0275\u0275element(2,"img",4),Z.\u0275\u0275pipe(3,"fromCDN"),Z.\u0275\u0275elementEnd()()),e&2){let i=n.$implicit,t=Z.\u0275\u0275nextContext();Z.\u0275\u0275advance(),Z.\u0275\u0275property("href",t.url(i.productSku,i.sku),Z.\u0275\u0275sanitizeUrl),Z.\u0275\u0275advance(),Z.\u0275\u0275property("src",Z.\u0275\u0275pipeBind2(3,2,i.image,"400"),Z.\u0275\u0275sanitizeUrl)}}var jt,Re,st=Ze(()=>{"use strict";jt=(e,n)=>n.key;Re=class e{#t=rt(At);http=rt(ot);#e=Lt([]);recommendations=this.#e.asReadonly();set product(n){let i=n.split(",");this.http.recommendations$(i).subscribe(t=>{this.#e.set(t)})}constructor(){this.http.recommendations$(["CL-01-GY","AU-07-MT"]).subscribe(n=>{this.#e.set(n)})}url(n,i){return this.#t+"/product/"+n+"/"+i}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Z.\u0275\u0275defineComponent({type:e,selectors:[["exp-recommendations"]],inputs:{product:"product"},standalone:!0,features:[Z.\u0275\u0275ProvidersFeature([ot]),Z.\u0275\u0275StandaloneFeature],decls:6,vars:0,consts:[["data-boundary","explore",1,"exp_recommendations"],[1,"exp_recommendations__list"],[1,"exp_recommendation"],[1,"exp_recommendation__link",3,"href"],["alt","","sizes","200px","width","200","height","200",1,"exp_recommendation__image",3,"src"]],template:function(i,t){i&1&&(Z.\u0275\u0275elementStart(0,"div",0)(1,"h2"),Z.\u0275\u0275text(2,"Recommendations"),Z.\u0275\u0275elementEnd(),Z.\u0275\u0275elementStart(3,"ul",1),Z.\u0275\u0275repeaterCreate(4,Ht,4,5,"li",2,jt),Z.\u0275\u0275elementEnd()()),i&2&&(Z.\u0275\u0275advance(4),Z.\u0275\u0275repeater(t.recommendations()))},dependencies:[xt,Zt],styles:["[_nghost-%COMP%]{--outer-space: 1.5rem;box-sizing:border-box;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;max-width:1000px;padding:0}.exp_recommendations[_ngcontent-%COMP%]{padding:1rem;margin:0 -1rem 3rem}.exp_recommendations__list[_ngcontent-%COMP%]{position:relative;display:grid;gap:40px;padding:0;list-style-type:none}@media (max-width: 499px){.exp_recommendations__list[_ngcontent-%COMP%]{grid-template-columns:1fr 1fr}}@media (min-width: 500px) and (max-width: 999px){.exp_recommendations__list[_ngcontent-%COMP%]{grid-template-columns:1fr 1fr 1fr}}@media (min-width: 1000px){.exp_recommendations__list[_ngcontent-%COMP%]{grid-template-columns:repeat(4,1fr)}}.exp_recommendation[_ngcontent-%COMP%]{margin:0}.exp_recommendation__link[_ngcontent-%COMP%]{text-decoration:none;color:#000}.exp_recommendation__image[_ngcontent-%COMP%]{width:100%;height:auto;aspect-ratio:1/1;display:block}.exp_recommendation__name[_ngcontent-%COMP%]{margin:1rem 0;color:#000;text-align:center;display:block}@media (min-width: 500px) and (max-width: 999px){.exp_Recommendation[_ngcontent-%COMP%]:nth-child(4){display:none}}"]})}});function te(e){return(ae.__Zone_symbol_prefix||"__zone_symbol__")+e}function Ft(){let e=ae.performance;function n(N){e&&e.mark&&e.mark(N)}function i(N,_){e&&e.measure&&e.measure(N,_)}n("Zone");let t=(()=>{class N{static{this.__symbol__=te}static assertZonePatched(){if(ae.Promise!==O.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")}static get root(){let r=N.current;for(;r.parent;)r=r.parent;return r}static get current(){return b.zone}static get currentTask(){return S}static __load_patch(r,o,y=!1){if(O.hasOwnProperty(r)){let P=ae[te("forceDuplicateZoneCheck")]===!0;if(!y&&P)throw Error("Already loaded patch: "+r)}else if(!ae["__Zone_disable_"+r]){let P="Zone:"+r;n(P),O[r]=o(ae,N,w),i(P,P)}}get parent(){return this._parent}get name(){return this._name}constructor(r,o){this._parent=r,this._name=o?o.name||"unnamed":"<root>",this._properties=o&&o.properties||{},this._zoneDelegate=new u(this,this._parent&&this._parent._zoneDelegate,o)}get(r){let o=this.getZoneWith(r);if(o)return o._properties[r]}getZoneWith(r){let o=this;for(;o;){if(o._properties.hasOwnProperty(r))return o;o=o._parent}return null}fork(r){if(!r)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,r)}wrap(r,o){if(typeof r!="function")throw new Error("Expecting function got: "+r);let y=this._zoneDelegate.intercept(this,r,o),P=this;return function(){return P.runGuarded(y,this,arguments,o)}}run(r,o,y,P){b={parent:b,zone:this};try{return this._zoneDelegate.invoke(this,r,o,y,P)}finally{b=b.parent}}runGuarded(r,o=null,y,P){b={parent:b,zone:this};try{try{return this._zoneDelegate.invoke(this,r,o,y,P)}catch(X){if(this._zoneDelegate.handleError(this,X))throw X}}finally{b=b.parent}}runTask(r,o,y){if(r.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(r.zone||Q).name+"; Execution: "+this.name+")");let P=r,{type:X,data:{isPeriodic:A=!1,isRefreshable:me=!1}={}}=r;if(r.state===Y&&(X===W||X===E))return;let le=r.state!=j;le&&P._transitionTo(j,h);let ue=S;S=P,b={parent:b,zone:this};try{X==E&&r.data&&!A&&!me&&(r.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,P,o,y)}catch(re){if(this._zoneDelegate.handleError(this,re))throw re}}finally{let re=r.state;if(re!==Y&&re!==$)if(X==W||A||me&&re===k)le&&P._transitionTo(h,j,k);else{let f=P._zoneDelegates;this._updateTaskCount(P,-1),le&&P._transitionTo(Y,j,Y),me&&(P._zoneDelegates=f)}b=b.parent,S=ue}}scheduleTask(r){if(r.zone&&r.zone!==this){let y=this;for(;y;){if(y===r.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${r.zone.name}`);y=y.parent}}r._transitionTo(k,Y);let o=[];r._zoneDelegates=o,r._zone=this;try{r=this._zoneDelegate.scheduleTask(this,r)}catch(y){throw r._transitionTo($,k,Y),this._zoneDelegate.handleError(this,y),y}return r._zoneDelegates===o&&this._updateTaskCount(r,1),r.state==k&&r._transitionTo(h,k),r}scheduleMicroTask(r,o,y,P){return this.scheduleTask(new m(G,r,o,y,P,void 0))}scheduleMacroTask(r,o,y,P,X){return this.scheduleTask(new m(E,r,o,y,P,X))}scheduleEventTask(r,o,y,P,X){return this.scheduleTask(new m(W,r,o,y,P,X))}cancelTask(r){if(r.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(r.zone||Q).name+"; Execution: "+this.name+")");if(!(r.state!==h&&r.state!==j)){r._transitionTo(V,h,j);try{this._zoneDelegate.cancelTask(this,r)}catch(o){throw r._transitionTo($,V),this._zoneDelegate.handleError(this,o),o}return this._updateTaskCount(r,-1),r._transitionTo(Y,V),r.runCount=-1,r}}_updateTaskCount(r,o){let y=r._zoneDelegates;o==-1&&(r._zoneDelegates=null);for(let P=0;P<y.length;P++)y[P]._updateTaskCount(r.type,o)}}return N})(),c={name:"",onHasTask:(N,_,r,o)=>N.hasTask(r,o),onScheduleTask:(N,_,r,o)=>N.scheduleTask(r,o),onInvokeTask:(N,_,r,o,y,P)=>N.invokeTask(r,o,y,P),onCancelTask:(N,_,r,o)=>N.cancelTask(r,o)};class u{get zone(){return this._zone}constructor(_,r,o){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this._zone=_,this._parentDelegate=r,this._forkZS=o&&(o&&o.onFork?o:r._forkZS),this._forkDlgt=o&&(o.onFork?r:r._forkDlgt),this._forkCurrZone=o&&(o.onFork?this._zone:r._forkCurrZone),this._interceptZS=o&&(o.onIntercept?o:r._interceptZS),this._interceptDlgt=o&&(o.onIntercept?r:r._interceptDlgt),this._interceptCurrZone=o&&(o.onIntercept?this._zone:r._interceptCurrZone),this._invokeZS=o&&(o.onInvoke?o:r._invokeZS),this._invokeDlgt=o&&(o.onInvoke?r:r._invokeDlgt),this._invokeCurrZone=o&&(o.onInvoke?this._zone:r._invokeCurrZone),this._handleErrorZS=o&&(o.onHandleError?o:r._handleErrorZS),this._handleErrorDlgt=o&&(o.onHandleError?r:r._handleErrorDlgt),this._handleErrorCurrZone=o&&(o.onHandleError?this._zone:r._handleErrorCurrZone),this._scheduleTaskZS=o&&(o.onScheduleTask?o:r._scheduleTaskZS),this._scheduleTaskDlgt=o&&(o.onScheduleTask?r:r._scheduleTaskDlgt),this._scheduleTaskCurrZone=o&&(o.onScheduleTask?this._zone:r._scheduleTaskCurrZone),this._invokeTaskZS=o&&(o.onInvokeTask?o:r._invokeTaskZS),this._invokeTaskDlgt=o&&(o.onInvokeTask?r:r._invokeTaskDlgt),this._invokeTaskCurrZone=o&&(o.onInvokeTask?this._zone:r._invokeTaskCurrZone),this._cancelTaskZS=o&&(o.onCancelTask?o:r._cancelTaskZS),this._cancelTaskDlgt=o&&(o.onCancelTask?r:r._cancelTaskDlgt),this._cancelTaskCurrZone=o&&(o.onCancelTask?this._zone:r._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;let y=o&&o.onHasTask,P=r&&r._hasTaskZS;(y||P)&&(this._hasTaskZS=y?o:c,this._hasTaskDlgt=r,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=this._zone,o.onScheduleTask||(this._scheduleTaskZS=c,this._scheduleTaskDlgt=r,this._scheduleTaskCurrZone=this._zone),o.onInvokeTask||(this._invokeTaskZS=c,this._invokeTaskDlgt=r,this._invokeTaskCurrZone=this._zone),o.onCancelTask||(this._cancelTaskZS=c,this._cancelTaskDlgt=r,this._cancelTaskCurrZone=this._zone))}fork(_,r){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,_,r):new t(_,r)}intercept(_,r,o){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,_,r,o):r}invoke(_,r,o,y,P){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,_,r,o,y,P):r.apply(o,y)}handleError(_,r){return this._handleErrorZS?this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,_,r):!0}scheduleTask(_,r){let o=r;if(this._scheduleTaskZS)this._hasTaskZS&&o._zoneDelegates.push(this._hasTaskDlgtOwner),o=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,_,r),o||(o=r);else if(r.scheduleFn)r.scheduleFn(r);else if(r.type==G)U(r);else throw new Error("Task is missing scheduleFn.");return o}invokeTask(_,r,o,y){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,_,r,o,y):r.callback.apply(o,y)}cancelTask(_,r){let o;if(this._cancelTaskZS)o=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,_,r);else{if(!r.cancelFn)throw Error("Task is not cancelable");o=r.cancelFn(r)}return o}hasTask(_,r){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,_,r)}catch(o){this.handleError(_,o)}}_updateTaskCount(_,r){let o=this._taskCounts,y=o[_],P=o[_]=y+r;if(P<0)throw new Error("More tasks executed then were scheduled.");if(y==0||P==0){let X={microTask:o.microTask>0,macroTask:o.macroTask>0,eventTask:o.eventTask>0,change:_};this.hasTask(this._zone,X)}}}class m{constructor(_,r,o,y,P,X){if(this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=_,this.source=r,this.data=y,this.scheduleFn=P,this.cancelFn=X,!o)throw new Error("callback is not defined");this.callback=o;let A=this;_===W&&y&&y.useG?this.invoke=m.invokeTask:this.invoke=function(){return m.invokeTask.call(ae,A,this,arguments)}}static invokeTask(_,r,o){_||(_=this),ee++;try{return _.runCount++,_.zone.runTask(_,r,o)}finally{ee==1&&K(),ee--}}get zone(){return this._zone}get state(){return this._state}cancelScheduleRequest(){this._transitionTo(Y,k)}_transitionTo(_,r,o){if(this._state===r||this._state===o)this._state=_,_==Y&&(this._zoneDelegates=null);else throw new Error(`${this.type} '${this.source}': can not transition to '${_}', expecting state '${r}'${o?" or '"+o+"'":""}, was '${this._state}'.`)}toString(){return this.data&&typeof this.data.handleId<"u"?this.data.handleId.toString():Object.prototype.toString.call(this)}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}}}let p=te("setTimeout"),g=te("Promise"),D=te("then"),d=[],C=!1,x;function F(N){if(x||ae[g]&&(x=ae[g].resolve(0)),x){let _=x[D];_||(_=x.then),_.call(x,N)}else ae[p](N,0)}function U(N){ee===0&&d.length===0&&F(K),N&&d.push(N)}function K(){if(!C){for(C=!0;d.length;){let N=d;d=[];for(let _=0;_<N.length;_++){let r=N[_];try{r.zone.runTask(r,null,null)}catch(o){w.onUnhandledError(o)}}}w.microtaskDrainDone(),C=!1}}let Q={name:"NO ZONE"},Y="notScheduled",k="scheduling",h="scheduled",j="running",V="canceling",$="unknown",G="microTask",E="macroTask",W="eventTask",O={},w={symbol:te,currentZoneFrame:()=>b,onUnhandledError:q,microtaskDrainDone:q,scheduleMicroTask:U,showUncaughtError:()=>!t[te("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:q,patchMethod:()=>q,bindArguments:()=>[],patchThen:()=>q,patchMacroTask:()=>q,patchEventPrototype:()=>q,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>q,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>q,wrapWithCurrentZone:()=>q,filterProperties:()=>[],attachOriginToPatched:()=>q,_redefineProperty:()=>q,patchCallbacks:()=>q,nativeScheduleMicroTask:F},b={parent:null,zone:new t(null,null)},S=null,ee=0;function q(){}return i("Zone","Zone"),t}function Vt(){let e=globalThis,n=e[te("forceDuplicateZoneCheck")]===!0;if(e.Zone&&(n||typeof e.Zone.__symbol__!="function"))throw new Error("Zone already loaded.");return e.Zone??=Ft(),e.Zone}function Be(e,n){return Zone.current.wrap(e,n)}function Ue(e,n,i,t,c){return Zone.current.scheduleMacroTask(e,n,i,t,c)}function We(e,n){for(let i=e.length-1;i>=0;i--)typeof e[i]=="function"&&(e[i]=Be(e[i],n+"_"+i));return e}function Ut(e,n){let i=e.constructor.name;for(let t=0;t<n.length;t++){let c=n[t],u=e[c];if(u){let m=Pe(e,c);if(!ht(m))continue;e[c]=(p=>{let g=function(){return p.apply(this,We(arguments,i+"."+c))};return _e(g,p),g})(u)}}}function ht(e){return e?e.writable===!1?!1:!(typeof e.get=="function"&&typeof e.set>"u"):!0}function ct(e,n,i){let t=Pe(e,n);if(!t&&i&&Pe(i,n)&&(t={enumerable:!0,configurable:!0}),!t||!t.configurable)return;let c=H("on"+n+"patched");if(e.hasOwnProperty(c)&&e[c])return;delete t.writable,delete t.value;let u=t.get,m=t.set,p=n.slice(2),g=Se[p];g||(g=Se[p]=H("ON_PROPERTY"+p)),t.set=function(D){let d=this;if(!d&&e===J&&(d=J),!d)return;typeof d[g]=="function"&&d.removeEventListener(p,it),m&&m.call(d,null),d[g]=D,typeof D=="function"&&d.addEventListener(p,it,!1)},t.get=function(){let D=this;if(!D&&e===J&&(D=J),!D)return null;let d=D[g];if(d)return d;if(u){let C=u.call(this);if(C)return t.set.call(this,C),typeof D[Bt]=="function"&&D.removeAttribute(n),C}return null},Fe(e,n,t),e[c]=!0}function mt(e,n,i){if(n)for(let t=0;t<n.length;t++)ct(e,"on"+n[t],i);else{let t=[];for(let c in e)c.slice(0,2)=="on"&&t.push(c);for(let c=0;c<t.length;c++)ct(e,t[c],i)}}function be(e){let n=J[e];if(!n)return;J[H(e)]=n,J[e]=function(){let c=We(arguments,e);switch(c.length){case 0:this[se]=new n;break;case 1:this[se]=new n(c[0]);break;case 2:this[se]=new n(c[0],c[1]);break;case 3:this[se]=new n(c[0],c[1],c[2]);break;case 4:this[se]=new n(c[0],c[1],c[2],c[3]);break;default:throw new Error("Arg list too long.")}},_e(J[e],n);let i=new n(function(){}),t;for(t in i)e==="XMLHttpRequest"&&t==="responseBlob"||function(c){typeof i[c]=="function"?J[e].prototype[c]=function(){return this[se][c].apply(this[se],arguments)}:Fe(J[e].prototype,c,{set:function(u){typeof u=="function"?(this[se][c]=Be(u,e+"."+c),_e(this[se][c],u)):this[se][c]=u},get:function(){return this[se][c]}})}(t);for(t in n)t!=="prototype"&&n.hasOwnProperty(t)&&(J[e][t]=n[t])}function de(e,n,i){let t=e;for(;t&&!t.hasOwnProperty(n);)t=Ve(t);!t&&e[n]&&(t=e);let c=H(n),u=null;if(t&&(!(u=t[c])||!t.hasOwnProperty(c))){u=t[c]=t[n];let m=t&&Pe(t,n);if(ht(m)){let p=i(u,c,n);t[n]=function(){return p(this,arguments)},_e(t[n],u)}}return u}function qt(e,n,i){let t=null;function c(u){let m=u.data;return m.args[m.cbIdx]=function(){u.invoke.apply(this,arguments)},t.apply(m.target,m.args),u}t=de(e,n,u=>function(m,p){let g=i(m,p);return g.cbIdx>=0&&typeof p[g.cbIdx]=="function"?Ue(g.name,p[g.cbIdx],g,c):u.apply(m,p)})}function _e(e,n){e[H("OriginalDelegate")]=n}function Xt(){try{let e=ke.navigator.userAgent;if(e.indexOf("MSIE ")!==-1||e.indexOf("Trident/")!==-1)return!0}catch{}return!1}function Yt(){if(at)return je;at=!0;try{let e=ke.navigator.userAgent;(e.indexOf("MSIE ")!==-1||e.indexOf("Trident/")!==-1||e.indexOf("Edge/")!==-1)&&(je=!0)}catch{}return je}function lt(e){return typeof e=="function"}function ut(e){return typeof e=="number"}function gt(e,n){let i=(n?n(e):e)+he,t=(n?n(e):e)+fe,c=Ce+i,u=Ce+t;ne[e]={},ne[e][he]=c,ne[e][fe]=u}function Jt(e,n,i,t){let c=t&&t.add||Ge,u=t&&t.rm||ze,m=t&&t.listeners||"eventListeners",p=t&&t.rmAll||"removeAllListeners",g=H(c),D="."+c+":",d="prependListener",C="."+d+":",x=function(k,h,j){if(k.isRemoved)return;let V=k.callback;typeof V=="object"&&V.handleEvent&&(k.callback=E=>V.handleEvent(E),k.originalDelegate=V);let $;try{k.invoke(k,h,[j])}catch(E){$=E}let G=k.options;if(G&&typeof G=="object"&&G.once){let E=k.originalDelegate?k.originalDelegate:k.callback;h[u].call(h,j.type,E,G)}return $};function F(k,h,j){if(h=h||e.event,!h)return;let V=k||h.target||e,$=V[ne[h.type][j?fe:he]];if($){let G=[];if($.length===1){let E=x($[0],V,h);E&&G.push(E)}else{let E=$.slice();for(let W=0;W<E.length&&!(h&&h[Tt]===!0);W++){let O=x(E[W],V,h);O&&G.push(O)}}if(G.length===1)throw G[0];for(let E=0;E<G.length;E++){let W=G[E];n.nativeScheduleMicroTask(()=>{throw W})}}}let U=function(k){return F(this,k,!1)},K=function(k){return F(this,k,!0)};function Q(k,h){if(!k)return!1;let j=!0;h&&h.useG!==void 0&&(j=h.useG);let V=h&&h.vh,$=!0;h&&h.chkDup!==void 0&&($=h.chkDup);let G=!1;h&&h.rt!==void 0&&(G=h.rt);let E=k;for(;E&&!E.hasOwnProperty(c);)E=Ve(E);if(!E&&k[c]&&(E=k),!E||E[g])return!1;let W=h&&h.eventNameToString,O={},w=E[g]=E[c],b=E[H(u)]=E[u],S=E[H(m)]=E[m],ee=E[H(p)]=E[p],q;h&&h.prepend&&(q=E[H(h.prepend)]=E[h.prepend]);function N(s,l){return!ye&&typeof s=="object"&&s?!!s.capture:!ye||!l?s:typeof s=="boolean"?{capture:s,passive:!0}:s?typeof s=="object"&&s.passive!==!1?Qe(Le({},s),{passive:!0}):s:{passive:!0}}let _=function(s){if(!O.isExisting)return w.call(O.target,O.eventName,O.capture?K:U,O.options)},r=function(s){if(!s.isRemoved){let l=ne[s.eventName],v;l&&(v=l[s.capture?fe:he]);let R=v&&s.target[v];if(R){for(let T=0;T<R.length;T++)if(R[T]===s){R.splice(T,1),s.isRemoved=!0,s.removeAbortListener&&(s.removeAbortListener(),s.removeAbortListener=null),R.length===0&&(s.allRemoved=!0,s.target[v]=null);break}}}if(s.allRemoved)return b.call(s.target,s.eventName,s.capture?K:U,s.options)},o=function(s){return w.call(O.target,O.eventName,s.invoke,O.options)},y=function(s){return q.call(O.target,O.eventName,s.invoke,O.options)},P=function(s){return b.call(s.target,s.eventName,s.invoke,s.options)},X=j?_:o,A=j?r:P,me=function(s,l){let v=typeof l;return v==="function"&&s.callback===l||v==="object"&&s.originalDelegate===l},le=h&&h.diff?h.diff:me,ue=Zone[H("UNPATCHED_EVENTS")],re=e[H("PASSIVE_EVENTS")];function f(s){if(typeof s=="object"&&s!==null){let l=Le({},s);return s.signal&&(l.signal=s.signal),l}return s}let a=function(s,l,v,R,T=!1,M=!1){return function(){let I=this||e,L=arguments[0];h&&h.transferEventName&&(L=h.transferEventName(L));let z=arguments[1];if(!z)return s.apply(this,arguments);if(Ne&&L==="uncaughtException")return s.apply(this,arguments);let B=!1;if(typeof z!="function"){if(!z.handleEvent)return s.apply(this,arguments);B=!0}if(V&&!V(s,z,I,arguments))return;let pe=ye&&!!re&&re.indexOf(L)!==-1,ie=f(N(arguments[2],pe)),Ee=ie?.signal;if(Ee?.aborted)return;if(ue){for(let ce=0;ce<ue.length;ce++)if(L===ue[ce])return pe?s.call(I,L,z,ie):s.apply(this,arguments)}let Me=ie?typeof ie=="boolean"?!0:ie.capture:!1,Xe=ie&&typeof ie=="object"?ie.once:!1,Ct=Zone.current,Ie=ne[L];Ie||(gt(L,W),Ie=ne[L]);let Ye=Ie[Me?fe:he],Te=I[Ye],$e=!1;if(Te){if($e=!0,$){for(let ce=0;ce<Te.length;ce++)if(le(Te[ce],z))return}}else Te=I[Ye]=[];let we,Je=I.constructor.name,Ke=pt[Je];Ke&&(we=Ke[L]),we||(we=Je+l+(W?W(L):L)),O.options=ie,Xe&&(O.options.once=!1),O.target=I,O.capture=Me,O.eventName=L,O.isExisting=$e;let ve=j?$t:void 0;ve&&(ve.taskData=O),Ee&&(O.options.signal=void 0);let oe=Ct.scheduleEventTask(we,z,ve,v,R);if(Ee){O.options.signal=Ee;let ce=()=>oe.zone.cancelTask(oe);s.call(Ee,"abort",ce,{once:!0}),oe.removeAbortListener=()=>Ee.removeEventListener("abort",ce)}if(O.target=null,ve&&(ve.taskData=null),Xe&&(O.options.once=!0),!ye&&typeof oe.options=="boolean"||(oe.options=ie),oe.target=I,oe.capture=Me,oe.eventName=L,B&&(oe.originalDelegate=z),M?Te.unshift(oe):Te.push(oe),T)return I}};return E[c]=a(w,D,X,A,G),q&&(E[d]=a(q,C,y,A,G,!0)),E[u]=function(){let s=this||e,l=arguments[0];h&&h.transferEventName&&(l=h.transferEventName(l));let v=arguments[2],R=v?typeof v=="boolean"?!0:v.capture:!1,T=arguments[1];if(!T)return b.apply(this,arguments);if(V&&!V(b,T,s,arguments))return;let M=ne[l],I;M&&(I=M[R?fe:he]);let L=I&&s[I];if(L)for(let z=0;z<L.length;z++){let B=L[z];if(le(B,T)){if(L.splice(z,1),B.isRemoved=!0,L.length===0&&(B.allRemoved=!0,s[I]=null,!R&&typeof l=="string")){let pe=Ce+"ON_PROPERTY"+l;s[pe]=null}return B.zone.cancelTask(B),G?s:void 0}}return b.apply(this,arguments)},E[m]=function(){let s=this||e,l=arguments[0];h&&h.transferEventName&&(l=h.transferEventName(l));let v=[],R=yt(s,W?W(l):l);for(let T=0;T<R.length;T++){let M=R[T],I=M.originalDelegate?M.originalDelegate:M.callback;v.push(I)}return v},E[p]=function(){let s=this||e,l=arguments[0];if(l){h&&h.transferEventName&&(l=h.transferEventName(l));let v=ne[l];if(v){let R=v[he],T=v[fe],M=s[R],I=s[T];if(M){let L=M.slice();for(let z=0;z<L.length;z++){let B=L[z],pe=B.originalDelegate?B.originalDelegate:B.callback;this[u].call(this,l,pe,B.options)}}if(I){let L=I.slice();for(let z=0;z<L.length;z++){let B=L[z],pe=B.originalDelegate?B.originalDelegate:B.callback;this[u].call(this,l,pe,B.options)}}}}else{let v=Object.keys(s);for(let R=0;R<v.length;R++){let T=v[R],M=Et.exec(T),I=M&&M[1];I&&I!=="removeListener"&&this[p].call(this,I)}this[p].call(this,"removeListener")}if(G)return this},_e(E[c],w),_e(E[u],b),ee&&_e(E[p],ee),S&&_e(E[m],S),!0}let Y=[];for(let k=0;k<i.length;k++)Y[k]=Q(i[k],t);return Y}function yt(e,n){if(!n){let u=[];for(let m in e){let p=Et.exec(m),g=p&&p[1];if(g&&(!n||g===n)){let D=e[m];if(D)for(let d=0;d<D.length;d++)u.push(D[d])}}return u}let i=ne[n];i||(gt(n),i=ne[n]);let t=e[i[he]],c=e[i[fe]];return t?c?t.concat(c):t.slice():c?c.slice():[]}function Kt(e,n){let i=e.Event;i&&i.prototype&&n.patchMethod(i.prototype,"stopImmediatePropagation",t=>function(c,u){c[Tt]=!0,t&&t.apply(c,u)})}function Qt(e,n){n.patchMethod(e,"queueMicrotask",i=>function(t,c){Zone.current.scheduleMicroTask("queueMicrotask",c[0])})}function ge(e,n,i,t){let c=null,u=null;n+=t,i+=t;let m={};function p(D){let d=D.data;d.args[0]=function(){return D.invoke.apply(this,arguments)};let C=c.apply(e,d.args);return ut(C)?d.handleId=C:(d.handle=C,d.isRefreshable=lt(C.refresh)),D}function g(D){let{handle:d,handleId:C}=D.data;return u.call(e,d??C)}c=de(e,n,D=>function(d,C){if(lt(C[0])){let x={isRefreshable:!1,isPeriodic:t==="Interval",delay:t==="Timeout"||t==="Interval"?C[1]||0:void 0,args:C},F=C[0];C[0]=function(){try{return F.apply(this,arguments)}finally{let{handle:j,handleId:V,isPeriodic:$,isRefreshable:G}=x;!$&&!G&&(V?delete m[V]:j&&(j[De]=null))}};let U=Ue(n,C[0],x,p,g);if(!U)return U;let{handleId:K,handle:Q,isRefreshable:Y,isPeriodic:k}=U.data;if(K)m[K]=U;else if(Q&&(Q[De]=U,Y&&!k)){let h=Q.refresh;Q.refresh=function(){let{zone:j,state:V}=U;return V==="notScheduled"?(U._state="scheduled",j._updateTaskCount(U,1)):V==="running"&&(U._state="scheduling"),h.call(this)}}return Q??K??U}else return D.apply(e,C)}),u=de(e,i,D=>function(d,C){let x=C[0],F;ut(x)?(F=m[x],delete m[x]):(F=x?.[De],F?x[De]=null:F=x),F?.type?F.cancelFn&&F.zone.cancelTask(F):D.apply(e,C)})}function en(e,n){let{isBrowser:i,isMix:t}=n.getGlobalObjects();if(!i&&!t||!e.customElements||!("customElements"in e))return;let c=["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"];n.patchCallbacks(n,e.customElements,"customElements","define",c)}function tn(e,n){if(Zone[n.symbol("patchEventTarget")])return;let{eventNames:i,zoneSymbolEventNames:t,TRUE_STR:c,FALSE_STR:u,ZONE_SYMBOL_PREFIX:m}=n.getGlobalObjects();for(let g=0;g<i.length;g++){let D=i[g],d=D+u,C=D+c,x=m+d,F=m+C;t[D]={},t[D][u]=x,t[D][c]=F}let p=e.EventTarget;if(!(!p||!p.prototype))return n.patchEventTarget(e,n,[p&&p.prototype]),!0}function nn(e,n){n.patchEventPrototype(e,n)}function kt(e,n,i){if(!i||i.length===0)return n;let t=i.filter(u=>u.target===e);if(!t||t.length===0)return n;let c=t[0].ignoreProperties;return n.filter(u=>c.indexOf(u)===-1)}function ft(e,n,i,t){if(!e)return;let c=kt(e,n,i);mt(e,c,t)}function He(e){return Object.getOwnPropertyNames(e).filter(n=>n.startsWith("on")&&n.length>2).map(n=>n.substring(2))}function rn(e,n){if(Ne&&!_t||Zone[e.symbol("patchEvents")])return;let i=n.__Zone_ignore_on_properties,t=[];if(qe){let c=window;t=t.concat(["Document","SVGElement","Element","HTMLElement","HTMLBodyElement","HTMLMediaElement","HTMLFrameSetElement","HTMLFrameElement","HTMLIFrameElement","HTMLMarqueeElement","Worker"]);let u=Xt()?[{target:c,ignoreProperties:["error"]}]:[];ft(c,He(c),i&&i.concat(u),Ve(c))}t=t.concat(["XMLHttpRequest","XMLHttpRequestEventTarget","IDBIndex","IDBRequest","IDBOpenDBRequest","IDBDatabase","IDBTransaction","IDBCursor","WebSocket"]);for(let c=0;c<t.length;c++){let u=n[t[c]];u&&u.prototype&&ft(u.prototype,He(u.prototype),i)}}function on(e){e.__load_patch("legacy",n=>{let i=n[e.__symbol__("legacyPatch")];i&&i()}),e.__load_patch("timers",n=>{let i="set",t="clear";ge(n,i,t,"Timeout"),ge(n,i,t,"Interval"),ge(n,i,t,"Immediate")}),e.__load_patch("requestAnimationFrame",n=>{ge(n,"request","cancel","AnimationFrame"),ge(n,"mozRequest","mozCancel","AnimationFrame"),ge(n,"webkitRequest","webkitCancel","AnimationFrame")}),e.__load_patch("blocking",(n,i)=>{let t=["alert","prompt","confirm"];for(let c=0;c<t.length;c++){let u=t[c];de(n,u,(m,p,g)=>function(D,d){return i.current.run(m,n,d,g)})}}),e.__load_patch("EventTarget",(n,i,t)=>{nn(n,t),tn(n,t);let c=n.XMLHttpRequestEventTarget;c&&c.prototype&&t.patchEventTarget(n,t,[c.prototype])}),e.__load_patch("MutationObserver",(n,i,t)=>{be("MutationObserver"),be("WebKitMutationObserver")}),e.__load_patch("IntersectionObserver",(n,i,t)=>{be("IntersectionObserver")}),e.__load_patch("FileReader",(n,i,t)=>{be("FileReader")}),e.__load_patch("on_property",(n,i,t)=>{rn(t,n)}),e.__load_patch("customElements",(n,i,t)=>{en(n,t)}),e.__load_patch("XHR",(n,i)=>{D(n);let t=H("xhrTask"),c=H("xhrSync"),u=H("xhrListener"),m=H("xhrScheduled"),p=H("xhrURL"),g=H("xhrErrorBeforeScheduled");function D(d){let C=d.XMLHttpRequest;if(!C)return;let x=C.prototype;function F(w){return w[t]}let U=x[xe],K=x[Ae];if(!U){let w=d.XMLHttpRequestEventTarget;if(w){let b=w.prototype;U=b[xe],K=b[Ae]}}let Q="readystatechange",Y="scheduled";function k(w){let b=w.data,S=b.target;S[m]=!1,S[g]=!1;let ee=S[u];U||(U=S[xe],K=S[Ae]),ee&&K.call(S,Q,ee);let q=S[u]=()=>{if(S.readyState===S.DONE)if(!b.aborted&&S[m]&&w.state===Y){let _=S[i.__symbol__("loadfalse")];if(S.status!==0&&_&&_.length>0){let r=w.invoke;w.invoke=function(){let o=S[i.__symbol__("loadfalse")];for(let y=0;y<o.length;y++)o[y]===w&&o.splice(y,1);!b.aborted&&w.state===Y&&r.call(w)},_.push(w)}else w.invoke()}else!b.aborted&&S[m]===!1&&(S[g]=!0)};return U.call(S,Q,q),S[t]||(S[t]=w),W.apply(S,b.args),S[m]=!0,w}function h(){}function j(w){let b=w.data;return b.aborted=!0,O.apply(b.target,b.args)}let V=de(x,"open",()=>function(w,b){return w[c]=b[2]==!1,w[p]=b[1],V.apply(w,b)}),$="XMLHttpRequest.send",G=H("fetchTaskAborting"),E=H("fetchTaskScheduling"),W=de(x,"send",()=>function(w,b){if(i.current[E]===!0||w[c])return W.apply(w,b);{let S={target:w,url:w[p],isPeriodic:!1,args:b,aborted:!1},ee=Ue($,h,S,k,j);w&&w[g]===!0&&!S.aborted&&ee.state===Y&&ee.invoke()}}),O=de(x,"abort",()=>function(w,b){let S=F(w);if(S&&typeof S.type=="string"){if(S.cancelFn==null||S.data&&S.data.aborted)return;S.zone.cancelTask(S)}else if(i.current[G]===!0)return O.apply(w,b)})}}),e.__load_patch("geolocation",n=>{n.navigator&&n.navigator.geolocation&&Ut(n.navigator.geolocation,["getCurrentPosition","watchPosition"])}),e.__load_patch("PromiseRejectionEvent",(n,i)=>{function t(c){return function(u){yt(n,c).forEach(p=>{let g=n.PromiseRejectionEvent;if(g){let D=new g(c,{promise:u.promise,reason:u.rejection});p.invoke(D)}})}}n.PromiseRejectionEvent&&(i[H("unhandledPromiseRejectionHandler")]=t("unhandledrejection"),i[H("rejectionHandledHandler")]=t("rejectionhandled"))}),e.__load_patch("queueMicrotask",(n,i,t)=>{Qt(n,t)})}function sn(e){e.__load_patch("ZoneAwarePromise",(n,i,t)=>{let c=Object.getOwnPropertyDescriptor,u=Object.defineProperty;function m(f){if(f&&f.toString===Object.prototype.toString){let a=f.constructor&&f.constructor.name;return(a||"")+": "+JSON.stringify(f)}return f?f.toString():Object.prototype.toString.call(f)}let p=t.symbol,g=[],D=n[p("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")]!==!1,d=p("Promise"),C=p("then"),x="__creationTrace__";t.onUnhandledError=f=>{if(t.showUncaughtError()){let a=f&&f.rejection;a?console.error("Unhandled Promise rejection:",a instanceof Error?a.message:a,"; Zone:",f.zone.name,"; Task:",f.task&&f.task.source,"; Value:",a,a instanceof Error?a.stack:void 0):console.error(f)}},t.microtaskDrainDone=()=>{for(;g.length;){let f=g.shift();try{f.zone.runGuarded(()=>{throw f.throwOriginal?f.rejection:f})}catch(a){U(a)}}};let F=p("unhandledPromiseRejectionHandler");function U(f){t.onUnhandledError(f);try{let a=i[F];typeof a=="function"&&a.call(this,f)}catch{}}function K(f){return f&&f.then}function Q(f){return f}function Y(f){return A.reject(f)}let k=p("state"),h=p("value"),j=p("finally"),V=p("parentPromiseValue"),$=p("parentPromiseState"),G="Promise.then",E=null,W=!0,O=!1,w=0;function b(f,a){return s=>{try{N(f,a,s)}catch(l){N(f,!1,l)}}}let S=function(){let f=!1;return function(s){return function(){f||(f=!0,s.apply(null,arguments))}}},ee="Promise resolved with itself",q=p("currentTaskTrace");function N(f,a,s){let l=S();if(f===s)throw new TypeError(ee);if(f[k]===E){let v=null;try{(typeof s=="object"||typeof s=="function")&&(v=s&&s.then)}catch(R){return l(()=>{N(f,!1,R)})(),f}if(a!==O&&s instanceof A&&s.hasOwnProperty(k)&&s.hasOwnProperty(h)&&s[k]!==E)r(s),N(f,s[k],s[h]);else if(a!==O&&typeof v=="function")try{v.call(s,l(b(f,a)),l(b(f,!1)))}catch(R){l(()=>{N(f,!1,R)})()}else{f[k]=a;let R=f[h];if(f[h]=s,f[j]===j&&a===W&&(f[k]=f[$],f[h]=f[V]),a===O&&s instanceof Error){let T=i.currentTask&&i.currentTask.data&&i.currentTask.data[x];T&&u(s,q,{configurable:!0,enumerable:!1,writable:!0,value:T})}for(let T=0;T<R.length;)o(f,R[T++],R[T++],R[T++],R[T++]);if(R.length==0&&a==O){f[k]=w;let T=s;try{throw new Error("Uncaught (in promise): "+m(s)+(s&&s.stack?`
`+s.stack:""))}catch(M){T=M}D&&(T.throwOriginal=!0),T.rejection=s,T.promise=f,T.zone=i.current,T.task=i.currentTask,g.push(T),t.scheduleMicroTask()}}}return f}let _=p("rejectionHandledHandler");function r(f){if(f[k]===w){try{let a=i[_];a&&typeof a=="function"&&a.call(this,{rejection:f[h],promise:f})}catch{}f[k]=O;for(let a=0;a<g.length;a++)f===g[a].promise&&g.splice(a,1)}}function o(f,a,s,l,v){r(f);let R=f[k],T=R?typeof l=="function"?l:Q:typeof v=="function"?v:Y;a.scheduleMicroTask(G,()=>{try{let M=f[h],I=!!s&&j===s[j];I&&(s[V]=M,s[$]=R);let L=a.run(T,void 0,I&&T!==Y&&T!==Q?[]:[M]);N(s,!0,L)}catch(M){N(s,!1,M)}},s)}let y="function ZoneAwarePromise() { [native code] }",P=function(){},X=n.AggregateError;class A{static toString(){return y}static resolve(a){return a instanceof A?a:N(new this(null),W,a)}static reject(a){return N(new this(null),O,a)}static withResolvers(){let a={};return a.promise=new A((s,l)=>{a.resolve=s,a.reject=l}),a}static any(a){if(!a||typeof a[Symbol.iterator]!="function")return Promise.reject(new X([],"All promises were rejected"));let s=[],l=0;try{for(let T of a)l++,s.push(A.resolve(T))}catch{return Promise.reject(new X([],"All promises were rejected"))}if(l===0)return Promise.reject(new X([],"All promises were rejected"));let v=!1,R=[];return new A((T,M)=>{for(let I=0;I<s.length;I++)s[I].then(L=>{v||(v=!0,T(L))},L=>{R.push(L),l--,l===0&&(v=!0,M(new X(R,"All promises were rejected")))})})}static race(a){let s,l,v=new this((M,I)=>{s=M,l=I});function R(M){s(M)}function T(M){l(M)}for(let M of a)K(M)||(M=this.resolve(M)),M.then(R,T);return v}static all(a){return A.allWithCallback(a)}static allSettled(a){return(this&&this.prototype instanceof A?this:A).allWithCallback(a,{thenCallback:l=>({status:"fulfilled",value:l}),errorCallback:l=>({status:"rejected",reason:l})})}static allWithCallback(a,s){let l,v,R=new this((L,z)=>{l=L,v=z}),T=2,M=0,I=[];for(let L of a){K(L)||(L=this.resolve(L));let z=M;try{L.then(B=>{I[z]=s?s.thenCallback(B):B,T--,T===0&&l(I)},B=>{s?(I[z]=s.errorCallback(B),T--,T===0&&l(I)):v(B)})}catch(B){v(B)}T++,M++}return T-=2,T===0&&l(I),R}constructor(a){let s=this;if(!(s instanceof A))throw new Error("Must be an instanceof Promise.");s[k]=E,s[h]=[];try{let l=S();a&&a(l(b(s,W)),l(b(s,O)))}catch(l){N(s,!1,l)}}get[Symbol.toStringTag](){return"Promise"}get[Symbol.species](){return A}then(a,s){let l=this.constructor?.[Symbol.species];(!l||typeof l!="function")&&(l=this.constructor||A);let v=new l(P),R=i.current;return this[k]==E?this[h].push(R,v,a,s):o(this,R,v,a,s),v}catch(a){return this.then(null,a)}finally(a){let s=this.constructor?.[Symbol.species];(!s||typeof s!="function")&&(s=A);let l=new s(P);l[j]=j;let v=i.current;return this[k]==E?this[h].push(v,l,a,a):o(this,v,l,a,a),l}}A.resolve=A.resolve,A.reject=A.reject,A.race=A.race,A.all=A.all;let me=n[d]=n.Promise;n.Promise=A;let le=p("thenPatched");function ue(f){let a=f.prototype,s=c(a,"then");if(s&&(s.writable===!1||!s.configurable))return;let l=a.then;a[C]=l,f.prototype.then=function(v,R){return new A((M,I)=>{l.call(this,M,I)}).then(v,R)},f[le]=!0}t.patchThen=ue;function re(f){return function(a,s){let l=f.apply(a,s);if(l instanceof A)return l;let v=l.constructor;return v[le]||ue(v),l}}return me&&(ue(me),de(n,"fetch",f=>re(f))),Promise[i.__symbol__("uncaughtPromiseErrors")]=g,A})}function cn(e){e.__load_patch("toString",n=>{let i=Function.prototype.toString,t=H("OriginalDelegate"),c=H("Promise"),u=H("Error"),m=function(){if(typeof this=="function"){let d=this[t];if(d)return typeof d=="function"?i.call(d):Object.prototype.toString.call(d);if(this===Promise){let C=n[c];if(C)return i.call(C)}if(this===Error){let C=n[u];if(C)return i.call(C)}}return i.call(this)};m[t]=i,Function.prototype.toString=m;let p=Object.prototype.toString,g="[object Promise]";Object.prototype.toString=function(){return typeof Promise=="function"&&this instanceof Promise?g:p.call(this)}})}function an(e,n,i,t,c){let u=Zone.__symbol__(t);if(n[u])return;let m=n[u]=n[t];n[t]=function(p,g,D){return g&&g.prototype&&c.forEach(function(d){let C=`${i}.${t}::`+d,x=g.prototype;try{if(x.hasOwnProperty(d)){let F=e.ObjectGetOwnPropertyDescriptor(x,d);F&&F.value?(F.value=e.wrapWithCurrentZone(F.value,C),e._redefineProperty(g.prototype,d,F)):x[d]&&(x[d]=e.wrapWithCurrentZone(x[d],C))}else x[d]&&(x[d]=e.wrapWithCurrentZone(x[d],C))}catch{}}),m.call(n,p,g,D)},e.attachOriginToPatched(n[t],m)}function ln(e){e.__load_patch("util",(n,i,t)=>{let c=He(n);t.patchOnProperties=mt,t.patchMethod=de,t.bindArguments=We,t.patchMacroTask=qt;let u=i.__symbol__("BLACK_LISTED_EVENTS"),m=i.__symbol__("UNPATCHED_EVENTS");n[m]&&(n[u]=n[m]),n[u]&&(i[u]=i[m]=n[u]),t.patchEventPrototype=Kt,t.patchEventTarget=Jt,t.isIEOrEdge=Yt,t.ObjectDefineProperty=Fe,t.ObjectGetOwnPropertyDescriptor=Pe,t.ObjectCreate=Gt,t.ArraySlice=zt,t.patchClass=be,t.wrapWithCurrentZone=Be,t.filterProperties=kt,t.attachOriginToPatched=_e,t._redefineProperty=Object.defineProperty,t.patchCallbacks=an,t.getGlobalObjects=()=>({globalSources:pt,zoneSymbolEventNames:ne,eventNames:c,isBrowser:qe,isMix:_t,isNode:Ne,TRUE_STR:fe,FALSE_STR:he,ZONE_SYMBOL_PREFIX:Ce,ADD_EVENT_LISTENER_STR:Ge,REMOVE_EVENT_LISTENER_STR:ze})})}function un(e){sn(e),cn(e),ln(e)}var ae,Pe,Fe,Ve,Gt,zt,Ge,ze,xe,Ae,fe,he,Ce,H,Oe,ke,J,Bt,dt,Ne,qe,_t,Se,Wt,it,se,at,je,ye,$t,ne,pt,Et,Tt,De,vt,bt=Ze(()=>{"use strict";ae=globalThis;Pe=Object.getOwnPropertyDescriptor,Fe=Object.defineProperty,Ve=Object.getPrototypeOf,Gt=Object.create,zt=Array.prototype.slice,Ge="addEventListener",ze="removeEventListener",xe=te(Ge),Ae=te(ze),fe="true",he="false",Ce=te("");H=te,Oe=typeof window<"u",ke=Oe?window:void 0,J=Oe&&ke||globalThis,Bt="removeAttribute";dt=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,Ne=!("nw"in J)&&typeof J.process<"u"&&J.process.toString()==="[object process]",qe=!Ne&&!dt&&!!(Oe&&ke.HTMLElement),_t=typeof J.process<"u"&&J.process.toString()==="[object process]"&&!dt&&!!(Oe&&ke.HTMLElement),Se={},Wt=H("enable_beforeunload"),it=function(e){if(e=e||J.event,!e)return;let n=Se[e.type];n||(n=Se[e.type]=H("ON_PROPERTY"+e.type));let i=this||e.target||J,t=i[n],c;if(qe&&i===ke&&e.type==="error"){let u=e;c=t&&t.call(this,u.message,u.filename,u.lineno,u.colno,u.error),c===!0&&e.preventDefault()}else c=t&&t.apply(this,arguments),e.type==="beforeunload"&&J[Wt]&&typeof c=="string"?e.returnValue=c:c!=null&&!c&&e.preventDefault();return c};se=H("originalInstance");at=!1,je=!1;ye=!1;if(typeof window<"u")try{let e=Object.defineProperty({},"passive",{get:function(){ye=!0}});window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch{ye=!1}$t={useG:!0},ne={},pt={},Et=new RegExp("^"+Ce+"(\\w+)(true|false)$"),Tt=H("propagationStopped");De=H("zoneTask");vt=Vt();un(vt);on(vt)});import{createApplication as fn}from"@angular/platform-browser";import{createCustomElement as hn}from"@angular/elements";var dn=wt(Pt=>{nt();st();bt();et(Pt,null,function*(){yield fn(tt).then(({injector:e})=>customElements.define("exp-recommendations",hn(Re,{injector:e})))})});export default dn();
/*! Bundled license information:

zone.js/fesm2015/zone.js:
  (**
   * @license Angular v<unknown>
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
