import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { AppEnv, ENV } from '../env/env.contract';
import { provideHttpClient } from '@angular/common/http';

const env: AppEnv = {
  stage: "dev",
  frontendUrl: "http://localhost:4201",
  api: "http://localhost:8081/v1",
  shell: "http://localhost:8080"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    {provide: ENV, useValue: env},
    provideHttpClient(),
  ]
};
