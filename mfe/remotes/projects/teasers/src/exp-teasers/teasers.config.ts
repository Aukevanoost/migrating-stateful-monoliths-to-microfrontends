import { APP_ID, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MFE_ENV, Env } from '../shared/env';
import { APP_BASE_HREF } from '@angular/common';

const fallback: Env = {
  cdn: 'http://localhost:8080',
  shell: 'http://localhost:8080',
  api: 'http://localhost:8081/v1',
  mfe: 'http://localhost:4001'
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_ID, useValue: 'exp-teasers' },
    { provide: APP_BASE_HREF, useValue: 'http://localhost:4001'},
    { provide: MFE_ENV, useValue: fallback },
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay())
  ]
};