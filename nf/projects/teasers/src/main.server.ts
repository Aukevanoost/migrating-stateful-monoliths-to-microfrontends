import { bootstrapApplication } from '@angular/platform-browser';
import { TeasersComponent } from './teasers/teasers.component';
import { config } from './teasers/teasers.config.server';

const bootstrap = () => bootstrapApplication(TeasersComponent, config);

export default bootstrap;
