import { initFederation, consoleLogger } from 'vanilla-native-federation';

const initMicroFrontends = (url, logLevel = "error") => {
    return initFederation(url, {
        logLevel,
        logger: consoleLogger
    })
}

export { initMicroFrontends };