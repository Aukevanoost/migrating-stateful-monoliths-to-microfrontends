import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { RecommendationsComponent } from '../exp-recommendations/recommendations.component';
import { NgZone } from '@angular/core';
import { appConfig } from '../exp-recommendations/recommendations.config';

(async () => {
  await createApplication({
    providers: [
      (globalThis as any).ngZone ? { provide: NgZone, useValue: (globalThis as any).ngZone } : [],
      ...appConfig.providers
    ],
  }).then(({injector}) => customElements.define('exp-teasers', createCustomElement(RecommendationsComponent, {injector})));
})();