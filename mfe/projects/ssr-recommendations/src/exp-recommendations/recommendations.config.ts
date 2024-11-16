import { APP_ID, ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_ID, useValue: 'exp-recommendations' },
    provideHttpClient(),
    provideClientHydration()
  ]
};