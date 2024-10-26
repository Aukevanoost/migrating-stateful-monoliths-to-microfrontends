import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { AppEnv, ENV } from '../env/env.contract';

const env: AppEnv = {
  stage: "dev",
  frontendUrl: "http://localhost:4201",
  backendUrl: "http://localhost:8080"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    {provide: ENV, useValue: env}
  ]
};
