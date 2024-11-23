import { initFederation, consoleLogger } from 'vanilla-native-federation';
import { createSessionStorageCache } from 'vanilla-native-federation/plugins/storage';

(() => {
    initFederation("http://localhost:3000/native-federation", {
        cache: createSessionStorageCache({
            externals: {},
            remoteNamesToRemote: {},
            baseUrlToRemoteNames: {}
        }),
        logLevel: 'debug',
        logger: consoleLogger
    })
        .then(({load, importMap}) => {
            console.log("importMap: ", importMap);
            window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load}}));
        })
})();