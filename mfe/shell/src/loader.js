import { initFederation } from 'vanilla-native-federation';

const initMicroFrontends = (urlOrManifest, remotes) => {
    return initFederation(urlOrManifest)
        .then(({load, importMap}) => Promise.all(
            remotes.map(r => load(r, "./Component"))
        ))
}

export { initMicroFrontends };