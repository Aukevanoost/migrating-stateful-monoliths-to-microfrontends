import { initFederation, loadRemoteModule } from './native-federation';

(() => {
    initFederation({"explore": "http://localhost:4200/remoteEntry.json"})
        .then(load => {
            window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load}}));
        })
})();