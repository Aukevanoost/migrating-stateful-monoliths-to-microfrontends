import { createApplication } from '@angular/platform-browser';
import { NgZone } from '@angular/core';
import { appConfig } from './exp-recommendations/recommendations.config';
import 'zone.js';

(async () => {
  await createApplication({
    providers: [
      (globalThis as any).ngZone ? { provide: NgZone, useValue: (globalThis as any).ngZone } : [],
      ...appConfig.providers
    ],
  });
})();