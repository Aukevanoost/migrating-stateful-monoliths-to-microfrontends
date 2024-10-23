import {bootstrap} from '@angular-architects/module-federation-tools';
import { AppModule } from './app/app.module';

bootstrap(AppModule, {
  production: false,
  // appType: 'microfrontend', // this flag sets subrouting, which doesnt work if no router is defined
  activeLegacyMode: true,
  ngZoneSharing: true,
  platformSharing: true
})