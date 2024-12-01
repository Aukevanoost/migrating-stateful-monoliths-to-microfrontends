import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import 'zone.js';
import { appConfig } from './exp-teasers/teasers.config';
import { TeasersComponent } from './exp-teasers/teasers.component';

(async () => {
  await createApplication(appConfig)
    .then(({injector}) => customElements.define(
      'exp-teasers', 
      createCustomElement(TeasersComponent, {injector})
    ))
})()