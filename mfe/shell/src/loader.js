import { initFederation } from 'vanilla-native-federation';

const initMicroFrontends = (urlOrManifest, remotes) => {
    if(typeof urlOrManifest === "object" && !remotes ){
        remotes = Object.keys(urlOrManifest);
    }

    return initFederation(urlOrManifest)
        .then(({load, importMap}) => Promise.all(
            remotes.map(r => load(r, "./Component"))
        ))
}

export { initMicroFrontends };