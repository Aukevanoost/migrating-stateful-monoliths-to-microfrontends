import { bootstrapApplication } from '@angular/platform-browser';
import { RecommendationsComponent } from './exp-recommendations/recommendations.component';
import { config } from './exp-recommendations/recommendations.config.server';

const bootstrap = () => bootstrapApplication(RecommendationsComponent, config);

export default bootstrap;
