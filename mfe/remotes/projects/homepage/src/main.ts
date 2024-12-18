import { initFederation } from '@angular-architects/native-federation';

initFederation('http://localhost:3000/native-federation')
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
