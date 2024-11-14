import { bootstrapApplication } from '@angular/platform-browser';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { config } from './recommendations/recommendations.config.server';

const bootstrap = () => bootstrapApplication(RecommendationsComponent, config);

export default bootstrap;
