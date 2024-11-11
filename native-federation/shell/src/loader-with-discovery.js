import { initFederationWithDiscovery } from 'vanilla-native-federation';

(() => {
    initFederationWithDiscovery("http://localhost:3000", ["explore/recommendations", "explore/teasers"])
        .then(({load, discovery, importMap}) => {
            console.log("discovery: ", discovery);
            console.log("importMap: ", importMap);
            window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load}}));
        })
})();