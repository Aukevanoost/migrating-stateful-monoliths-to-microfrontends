import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Env, MFE_ENV } from '@shared';

const fallback: Env = {
  cdn: 'http://localhost:8080',
  shell: 'http://localhost:8080',
  api: 'http://localhost:8081/v1',
  mfe: 'http://localhost:4000'
}


export const appConfig: ApplicationConfig = {
  providers: [
    // { provide: APP_ID, useValue: 'exp-homepage' },
    // { provide: APP_BASE_HREF, useValue: 'http://localhost:4000/'},
    { provide: MFE_ENV, useValue: fallback },
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay())
  ]
};
