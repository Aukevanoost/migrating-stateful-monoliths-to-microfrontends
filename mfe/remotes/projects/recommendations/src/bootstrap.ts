import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './exp-recommendations/recommendations.config';
import { RecommendationsComponent } from './exp-recommendations/recommendations.component';

bootstrapApplication(RecommendationsComponent, appConfig)
  .catch((err) => console.error(err));
