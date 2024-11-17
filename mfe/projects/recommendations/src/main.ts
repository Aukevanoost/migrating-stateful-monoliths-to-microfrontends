import { initFederation } from '@angular-architects/native-federation';

initFederation({})
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap/bootstrap.csr'))
  .then(_ => import('./bootstrap/bootstrap.ssr'))
  .catch(err => console.error(err));