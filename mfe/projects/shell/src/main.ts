import { initFederation } from '@angular-architects/native-federation';

initFederation({
	// "exp-teasers": "http://localhost:4201/remoteEntry.json",
  "exp-teasers": "http://loaclhost:4001/remoteEntry.json"
})
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));