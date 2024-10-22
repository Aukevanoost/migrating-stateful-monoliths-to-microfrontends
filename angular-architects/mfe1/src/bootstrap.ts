import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';
import { appConfig } from './app/app.config';

import { NgZone } from '@angular/core';

(async () => {
    const app = await createApplication(appConfig);
    const root = createCustomElement(AppComponent, {injector: app.injector});
    customElements.define('app-root', root);

    app.injector.get(NgZone).run(() => {
        app.bootstrap(AppComponent, 'app-root');
    });
})();


// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

