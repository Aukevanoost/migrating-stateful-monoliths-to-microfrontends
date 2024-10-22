import 'zone.js';

import { initFederation } from '@softarc/native-federation';

(async () => {

    await initFederation({
        "mfe": "http://localhost:4201/remoteEntry.json"
    });
    
    await import('./app');
})();
