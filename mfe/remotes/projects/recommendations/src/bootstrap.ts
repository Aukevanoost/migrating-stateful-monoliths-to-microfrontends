import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { appConfig } from './exp-recommendations/recommendations.config';
import { RecommendationsComponent } from './exp-recommendations/recommendations.component';
import 'zone.js';

(async () => {
  await createApplication(appConfig)
    .then(({injector}) => customElements.define(
      'exp-recommendations', 
      createCustomElement(RecommendationsComponent, {injector})
    ))
})()