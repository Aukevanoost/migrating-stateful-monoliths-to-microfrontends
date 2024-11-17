import { initFederation } from 'vanilla-native-federation';

(() => {
    const manifest = {
        "teasers": "http://localhost:4001/remoteEntry.json",
        "recommendations": "http://localhost:4002/remoteEntry.json"
    };
    initFederation(manifest)
        .then(({load, importMap}) => {
            console.log("importMap: ", importMap);
            window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load}}));
        })
})();