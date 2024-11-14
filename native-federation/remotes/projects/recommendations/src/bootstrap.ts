import { createApplication } from '@angular/platform-browser';
import { appConfig } from './exp-recommendations/recommendations.config';
import { RecommendationsComponent } from './exp-recommendations/recommendations.component';
import { createCustomElement } from '@angular/elements';
import 'zone.js';

(async () => {
  await createApplication(appConfig)
    .then(({injector}) => customElements.define(
      'exp-recommendations', 
      createCustomElement(RecommendationsComponent, {injector})
    ))
})()