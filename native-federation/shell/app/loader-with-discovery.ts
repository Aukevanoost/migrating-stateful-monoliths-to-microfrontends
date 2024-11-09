import { initFederationWithDiscovery } from './native-federation/discovery/init-federation-with-discovery';

(() => {
    initFederationWithDiscovery("http://localhost:3000", {microfrontends: ["explore/recommendations", "explore/teasers"]})
        .then(({loader, manifest}) => {
            window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load: loader}}));
        })
})();