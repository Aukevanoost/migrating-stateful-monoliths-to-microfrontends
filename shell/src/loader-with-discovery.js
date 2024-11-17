import { initFederationWithDiscovery } from 'vanilla-native-federation/plugins/discovery';
import { createSessionStorageCache } from 'vanilla-native-federation/plugins/storage';

(() => {
    const customCache = createSessionStorageCache({
        externals: {},
        remoteNamesToRemote: {},
        baseUrlToRemoteNames: {},
        discovery: {}
    })
    initFederationWithDiscovery(
        "http://localhost:3000", 
        { cache: customCache }
    ).then(({load, discovery, importMap}) => {
            console.log("discovery: ", discovery);
            console.log("importMap: ", importMap);
            window.dispatchEvent(new CustomEvent("mfe-loader-available", {detail: {load}}));
        })
})();