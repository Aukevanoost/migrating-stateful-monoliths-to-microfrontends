import { createApplication } from '@angular/platform-browser';
import { appConfig } from './exp-teasers/teasers.config';
import { NgZone } from '@angular/core';
import 'zone.js';
import { createCustomElement } from '@angular/elements';
import { TeasersComponent } from './exp-teasers/teasers.component';

(async () => {
  await createApplication({
    providers: [
      (globalThis as any).ngZone ? { provide: NgZone, useValue: (globalThis as any).ngZone } : [],
      ...appConfig.providers
    ],
  }).then(({injector}) => customElements.define('exp-teasers', createCustomElement(TeasersComponent, {injector})));
})();