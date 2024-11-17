import { ApplicationConfig } from '@angular/core';

import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }), 
    // provideRouter(routes), 
    // provideClientHydration()
    provideHttpClient(
      withFetch()
    ),
    // provideRouter(
    //     APP_ROUTES,
    //     withComponentInputBinding()
    // ),
    provideClientHydration()
  ]
};
