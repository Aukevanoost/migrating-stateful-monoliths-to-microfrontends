import { initFederationWithDiscovery } from './native-federation/discovery/init-federation-with-discovery';

(() => {
    initFederationWithDiscovery("http://localhost:3000", ["explore/recommendations", "explore/teasers"])
        .then(({load, manifest, importMap}) => {
            console.log("manifest: ", manifest);
            console.log("importMap: ", importMap);
            window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load}}));
        })
})();