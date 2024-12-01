import { createApplication } from '@angular/platform-browser';
import { appConfig } from './exp-teasers/teasers.config';
import { NgZone } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { TeasersComponent } from './exp-teasers/teasers.component';
import 'zone.js';

(async () => {
  await createApplication({
    providers: [
      (globalThis as any).ngZone ? { provide: NgZone, useValue: (globalThis as any).ngZone } : [],
      ...appConfig.providers
    ],
  }).then(({injector}) => customElements.define('exp-teasers', createCustomElement(TeasersComponent, {injector})));
})();