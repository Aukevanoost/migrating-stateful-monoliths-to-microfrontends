import { initFederation } from 'vanilla-native-federation';

(() => {
    initFederation({
        "ssr-teasers": "http://localhost:4001/remoteEntry.json"
    })
        .then(({load, importMap}) => {
            console.log("importMap: ", importMap);
            window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load}}));
        })
})();