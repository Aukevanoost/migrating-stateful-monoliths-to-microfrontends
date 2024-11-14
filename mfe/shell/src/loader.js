import { initFederation } from 'vanilla-native-federation';

(() => {
    initFederation("http://localhost:3000/native-federation")
        .then(({load, importMap}) => {
            console.log("importMap: ", importMap);
            window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load}}));
        })
})();