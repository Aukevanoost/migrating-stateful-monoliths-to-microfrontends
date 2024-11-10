import { initFederation, loadRemoteModule } from './native-federation';

(() => {
    initFederation("http://localhost:3000/native-federation")
        .then(load => {
            window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load}}));
        })
})();