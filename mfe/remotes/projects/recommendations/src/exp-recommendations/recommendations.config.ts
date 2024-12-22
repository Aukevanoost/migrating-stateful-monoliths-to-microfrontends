import { APP_ID, ApplicationConfig, provideZoneChangeDetection, FactoryProvider, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MFE_ENV, Env } from '@shared';
import { APP_BASE_HREF } from '@angular/common';

const envFactory = (platformId: Object): Env => {
  const isSSR = isPlatformServer(platformId);
  
  return {
    cdn: 'http://localhost:4000',
    shell: 'http://localhost:8080',
    api: isSSR ? 'http://monolith:8081/v1' : 'http://localhost:8081/v1',
    mfe: 'http://localhost:4002'
  };
};

const provideEnvVariables: FactoryProvider = {
  provide: MFE_ENV,
  useFactory: envFactory,
  deps: [PLATFORM_ID]
};

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_ID, useValue: 'exp-recommendations' },
    { provide: APP_BASE_HREF, useValue: 'http://localhost:4002'},
    provideEnvVariables,
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay())
  ]
};