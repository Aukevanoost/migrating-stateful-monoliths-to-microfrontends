import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './exp-recommendations/recommendations.config.server';
import { RecommendationsComponent } from './exp-recommendations/recommendations.component';

const bootstrap = () => bootstrapApplication(RecommendationsComponent, config);

export default bootstrap;
