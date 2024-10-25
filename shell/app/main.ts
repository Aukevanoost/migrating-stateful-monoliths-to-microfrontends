import { initFederation } from '@softarc/native-federation';

(async () => {
    await initFederation({
        "explore": "http://localhost:4201/remoteEntry.json"
    });
    
    const { loadMicroFrontend, renderMicroFrontend } = await import('./app');
    window.dispatchEvent(new CustomEvent("loader-available", {detail: { 
        load: loadMicroFrontend, 
        render: renderMicroFrontend 
    }}));
})();
