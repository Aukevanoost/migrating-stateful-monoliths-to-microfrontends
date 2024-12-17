import{assertInInjectionContext as b,inject as a,DestroyRef as u,\u0275RuntimeError as d,\u0275getOutputDestroyRef as h,Injector as p,effect as m,untracked as y,signal as f,computed as w}from"@angular/core";import{Observable as v,ReplaySubject as D}from"rxjs";import{takeUntil as j}from"rxjs/operators";function g(n){n||(b(g),n=a(u));let e=new v(t=>n.onDestroy(t.next.bind(t)));return t=>t.pipe(j(e))}var l=class{constructor(e){this.source=e,this.destroyed=!1,this.destroyRef=a(u),this.destroyRef.onDestroy(()=>{this.destroyed=!0})}subscribe(e){if(this.destroyed)throw new d(953,!1);let t=this.source.pipe(g(this.destroyRef)).subscribe({next:r=>e(r)});return{unsubscribe:()=>t.unsubscribe()}}};function I(n,e){return new l(n)}function M(n){let e=h(n);return new v(t=>{e?.onDestroy(()=>t.complete());let r=n.subscribe(i=>t.next(i));return()=>r.unsubscribe()})}function k(n,e){!e?.injector&&b(k);let t=e?.injector??a(p),r=new D(1),i=m(()=>{let o;try{o=n()}catch(c){y(()=>r.error(c));return}y(()=>r.next(o))},{injector:t,manualCleanup:!0});return t.get(u).onDestroy(()=>{i.destroy(),r.complete()}),r.asObservable()}function x(n,e){let t=!e?.manualCleanup;t&&!e?.injector&&b(x);let r=t?e?.injector?.get(u)??a(u):null,i=S(e?.equal),o;e?.requireSync?o=f({kind:0},{equal:i}):o=f({kind:1,value:e?.initialValue},{equal:i});let c=n.subscribe({next:s=>o.set({kind:1,value:s}),error:s=>{if(e?.rejectErrors)throw s;o.set({kind:2,error:s})}});if(e?.requireSync&&o().kind===0)throw new d(601,!1);return r?.onDestroy(c.unsubscribe.bind(c)),w(()=>{let s=o();switch(s.kind){case 1:return s.value;case 2:throw s.error;case 0:throw new d(601,!1)}},{equal:e?.equal})}function S(n=Object.is){return(e,t)=>e.kind===1&&t.kind===1&&n(e.value,t.value)}export{I as outputFromObservable,M as outputToObservable,g as takeUntilDestroyed,k as toObservable,x as toSignal};
/*! Bundled license information:

@angular/core/fesm2022/rxjs-interop.mjs:
  (**
   * @license Angular v18.2.13
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
