import { initFederationWithDiscovery } from './native-federation/discovery/init-federation-with-discovery';

(() => {
    initFederationWithDiscovery("http://localhost:3000", ["explore/recommendations", "explore/teasers"])
        .then(({loader, manifest}) => {
            console.log("manifest: ", manifest);
            window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load: loader}}));
        })
})();