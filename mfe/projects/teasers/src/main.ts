import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './teasers/teasers.config';
import { TeasersComponent } from './teasers/teasers.component';

bootstrapApplication(TeasersComponent, appConfig)
  .catch((err) => console.error(err));
