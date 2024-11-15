import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { ENV, AppEnv } from '../shared/env/env.contract';

const env: AppEnv = {
  stage: "dev",
  api: "http://localhost:8081/v1",
  cdn: "http://localhost:8080"
};

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: ENV, useValue: env},
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideClientHydration(),
    provideHttpClient(),
  ]
};