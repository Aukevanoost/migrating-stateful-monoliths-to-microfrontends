import { initFederation } from './native-federation';

(async () => {
    await initFederation({
        "explore": "http://localhost:4201/remoteEntry.json"
    });
    
    const { loadMicroFrontend } = await import('./app');
    window.dispatchEvent(new CustomEvent("loader-available", {detail: loadMicroFrontend}));
})();
