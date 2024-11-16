import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { AppEnv, ENV } from '../shared/env/env.contract';
import { provideHttpClient } from '@angular/common/http';

const env: AppEnv = {
  stage: "dev",
  api: "http://localhost:8081/v1",
  cdn: "http://localhost:8080"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    {provide: ENV, useValue: env},
    provideHttpClient(),
  ]
};
