import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// if (environment.production) {
//     enableProdMode();
// }

bootstrapApplication(AppComponent, config);

// const bootstrap = () => bootstrapApplication(AppComponent, config);

// export default bootstrap;
