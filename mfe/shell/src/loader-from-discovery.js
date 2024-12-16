import { initFederationFromDiscovery } from 'vanilla-native-federation/plugins/discovery';
import { consoleLogger } from 'vanilla-native-federation';

const initMicroFrontends = (url, logLevel = "error") => {
    performance.mark('nf:init');
    return initFederationFromDiscovery(url, {logLevel, logger: consoleLogger})
        .then(mfe => {
            performance.mark('nf:config');
            return Promise.all(remotes.map(r => load(r, "./Component")))
        })
        .then(_ => performance.mark('nf:loaded'));
}

export { initMicroFrontends };