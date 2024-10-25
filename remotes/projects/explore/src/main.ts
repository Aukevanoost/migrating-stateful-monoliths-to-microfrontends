import { initFederation } from '@angular-architects/native-federation';

initFederation()
  .catch(err => console.error(err))
  .then(_ => import('./teasers/teasers.bootstrap'))
  .catch(err => console.error(err));
