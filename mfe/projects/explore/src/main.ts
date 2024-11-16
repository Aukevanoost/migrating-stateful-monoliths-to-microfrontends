import { initFederation } from '@angular-architects/native-federation';

initFederation()
  .catch(err => console.error(err))
  .then(_ => import('./../../recommendations/src/bootstrap'))
  .catch(err => console.error(err))
  .then(_ => import('./../../teasers/src/bootstrap'))
  .catch(err => console.error(err));