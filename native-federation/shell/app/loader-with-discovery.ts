import { initFederationWithDiscovery } from './native-federation/discovery/init-federation-with-discovery';

(() => {
    initFederationWithDiscovery("http://localhost:3000/teams", {mfeCollectionFilter: ["explore"]})
        .then(({loader, manifest}) => {
            console.log(manifest);
            window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load: loader}}));
        })
})();