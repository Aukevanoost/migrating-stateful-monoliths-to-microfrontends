import { initFederation } from 'vanilla-native-federation';
import { createSessionStorageCache } from 'vanilla-native-federation/plugins/storage'
(() => {
    const cache = createSessionStorageCache({
        externals: {},
        remoteNamesToRemote: {},
        baseUrlToRemoteNames: {}
      })
    initFederation("http://localhost:3000/native-federation", {cache})
        .then(({load, importMap}) => {
            console.log("importMap: ", importMap);
            window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load}}));
        })
})();