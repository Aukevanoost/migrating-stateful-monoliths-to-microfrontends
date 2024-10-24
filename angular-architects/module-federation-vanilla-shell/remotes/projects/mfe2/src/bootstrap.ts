import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app/app.component';
import { provideZoneChangeDetection } from '@angular/core';
import 'zone.js';

createApplication({ providers: [provideZoneChangeDetection({ eventCoalescing: true })]})
    .then((app) => {
        const wc = createCustomElement(AppComponent, { injector: app.injector });
        customElements.define('mfe-two', wc);
    })
    .catch((err) => console.error(err));