import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './recommendations/recommendations.config';
import { RecommendationsComponent } from './recommendations/recommendations.component';

bootstrapApplication(RecommendationsComponent, appConfig)
  .catch((err) => console.error(err));
