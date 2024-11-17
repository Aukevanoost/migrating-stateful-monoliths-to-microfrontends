import { createApplication } from '@angular/platform-browser';
import 'zone.js';
import { appConfig } from './../exp-teasers/teasers.config';
import { NgZone } from '@angular/core';

(async () => {
  await createApplication({
    providers: [
      (globalThis as any).ngZone ? { provide: NgZone, useValue: (globalThis as any).ngZone } : [],
      ...appConfig.providers
    ],
  });
})();