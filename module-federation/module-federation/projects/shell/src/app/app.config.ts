import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { getManifest } from '@angular-architects/module-federation';
import { MANIFEST, MFeManifest } from './config';
import { buildRoutesFromManifest } from './app.routes';

const manifest = getManifest<MFeManifest>();
const routes = buildRoutesFromManifest(manifest);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), {provide: MANIFEST, useValue: manifest}]
};
