import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './exp-teasers/teasers.config.server';
import { TeasersComponent } from './exp-teasers/teasers.component';

const bootstrap = () => bootstrapApplication(TeasersComponent, config);

export default bootstrap;
