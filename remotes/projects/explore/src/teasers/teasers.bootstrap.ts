import { createApplication } from '@angular/platform-browser';
import { appConfig } from './teasers.config';
import { TeasersComponent } from './teasers.component';
import { createCustomElement } from '@angular/elements';
import 'zone.js';

(async () => {
  await createApplication(appConfig)
    .then(({injector}) => customElements.define(
      'exp-teasers', 
      createCustomElement(TeasersComponent, {injector})
    ))
})()