import { APP_ID, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_ID, useValue: 'exp-recommendations' },
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(),
    provideClientHydration()
  ]
};