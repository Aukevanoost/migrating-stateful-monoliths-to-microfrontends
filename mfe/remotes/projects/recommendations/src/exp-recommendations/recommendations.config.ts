import { APP_ID, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { MFE_ENV, Env } from '@shared';
import { APP_BASE_HREF } from '@angular/common';

const fallback: Env = {
  cdn: 'http://localhost:4000',
  shell: 'http://localhost:8080',
  api: 'http://localhost:8081/v1',
  mfe: 'http://localhost:4002'
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_ID, useValue: 'exp-recommendations' },
    { provide: APP_BASE_HREF, useValue: 'http://localhost:4002'},
    { provide: MFE_ENV, useValue: fallback },
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withFetch()),
    provideClientHydration()
  ]
};