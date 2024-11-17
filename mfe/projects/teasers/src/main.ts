import { initFederation } from '@angular-architects/native-federation';

initFederation({})
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap/bootstrap.ssr'))
  .then(_ => import('./bootstrap/bootstrap.csr'))
  .catch(err => console.error(err));