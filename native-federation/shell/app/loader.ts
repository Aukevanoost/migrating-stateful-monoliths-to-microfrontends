import { initFederation, loadRemoteModule } from './native-federation';

(async () => {
    await initFederation({
        "explore": "http://localhost:4200/remoteEntry.json"
    });
    window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load: loadRemoteModule}}));
})();