import { bootstrapApplication } from '@angular/platform-browser';
import { TeasersComponent } from './exp-teasers/teasers.component';
import { config } from './exp-teasers/teasers.config.server';

const bootstrap = () => bootstrapApplication(TeasersComponent, config);

export default bootstrap;
