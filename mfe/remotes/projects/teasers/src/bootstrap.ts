import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './exp-teasers/teasers.config';
import { TeasersComponent } from './exp-teasers/teasers.component';

bootstrapApplication(TeasersComponent, appConfig)
  .catch((err) => console.error(err));
