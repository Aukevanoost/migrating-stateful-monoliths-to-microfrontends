import { APP_ID, ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_ID, useValue: 'exp-teasers' },
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay())
  ]
};