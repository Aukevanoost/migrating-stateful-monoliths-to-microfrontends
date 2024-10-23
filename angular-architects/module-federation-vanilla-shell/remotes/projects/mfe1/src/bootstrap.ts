import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app/app.component';

import 'zone.js';

createApplication()
    .then((app) => {
        const wc = createCustomElement(AppComponent, { injector: app.injector });
        customElements.define('mfe-one', wc);
    })
    .catch((err) => console.error(err));

