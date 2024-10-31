import { initFederation } from '@angular-architects/native-federation';

initFederation()
  .catch(err => console.error(err))
  .then(_ => import('./teasers/teasers.bootstrap'))
  .then(_ => import('./recommendations/recommendations.bootstrap'))
  .catch(err => console.error(err));
