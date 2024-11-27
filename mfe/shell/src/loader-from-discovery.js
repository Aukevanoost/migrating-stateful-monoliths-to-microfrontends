import { initFederationFromDiscovery } from 'vanilla-native-federation/plugins/discovery';
import { consoleLogger } from 'vanilla-native-federation';

const initMicroFrontends = (url, logLevel = "error") => {
    return initFederationFromDiscovery(url, { 
        logLevel: logLevel,
        logger: consoleLogger
    });
}

export { initMicroFrontends };