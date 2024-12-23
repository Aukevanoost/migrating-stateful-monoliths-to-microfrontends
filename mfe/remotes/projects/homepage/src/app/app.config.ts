import { ApplicationConfig, provideZoneChangeDetection, FactoryProvider, PLATFORM_ID } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MFE_ENV, Env } from '@shared';
import { APP_BASE_HREF } from '@angular/common';

const provideEnvVariables: FactoryProvider = {
  provide: MFE_ENV,
  useFactory: (platformId: Object): Env => ({
    cdn: 'http://docker.for.mac.localhost:4000',
    shell: 'http://docker.for.mac.localhost:8080',
    api: 'http://docker.for.mac.localhost:8081/v1',
    mfe: 'http://docker.for.mac.localhost:4001'
  }),
  deps: [PLATFORM_ID]
};

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_BASE_HREF, useValue: 'http://docker.for.mac.localhost:4003/'},
    provideEnvVariables,
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay())
  ]
};
