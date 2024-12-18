import { initNodeFederation } from '@softarc/native-federation-node';

console.log('Starting SSR for Shell');

(async () => {

  await fetch("http://localhost:3000/native-federation")
    .then(r => r.json())
    .then(manifestUrl => initNodeFederation({
      remotesOrManifestUrl: manifestUrl,
      relBundlePath: '../browser/',
    }))
  
  await import('./bootstrap-server');

})();
