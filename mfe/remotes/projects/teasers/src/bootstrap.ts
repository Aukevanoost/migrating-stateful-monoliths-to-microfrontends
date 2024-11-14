import { createApplication } from '@angular/platform-browser';
import { appConfig } from './exp-teasers/teasers.config';
import { TeasersComponent } from './exp-teasers/teasers.component';
import { createCustomElement } from '@angular/elements';
import 'zone.js';

(async () => {
  await createApplication(appConfig)
    .then(({injector}) => customElements.define(
      'exp-teasers', 
      createCustomElement(TeasersComponent, {injector})
    ))
})()