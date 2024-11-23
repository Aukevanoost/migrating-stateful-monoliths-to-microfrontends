import { consoleLogger } from 'vanilla-native-federation';
import { initFederationFromDiscovery } from 'vanilla-native-federation/plugins/discovery';
import { createSessionStorageCache } from 'vanilla-native-federation/plugins/storage';

(() => {
    initFederationFromDiscovery(
        "http://localhost:3000", 
        { 
            cache: createSessionStorageCache({
                externals: {},
                remoteNamesToRemote: {},
                baseUrlToRemoteNames: {},
                discovery: {}
            }),
            logLevel: 'debug',
            logger: consoleLogger
        }
    ).then(({load, discovered, importMap}) => {
        console.log("discovered: ", discovered);
        console.log("importMap: ", importMap);
        window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load}}));
    })
})();

