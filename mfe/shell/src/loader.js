import { initFederation } from 'vanilla-native-federation';

const initMicroFrontends = async (urlOrManifest, remotes) => {
    performance.mark('nf:init');
    if(typeof urlOrManifest === "object" && !remotes ){
        remotes = Object.keys(urlOrManifest);
    }

    return initFederation(urlOrManifest)
        .then(({load}) => {
            performance.mark('nf:config');
            return Promise.all(remotes.map(r => load(r, "./Component")))
        })
        .then(_ => performance.mark('nf:loaded'));

    // const {load} = await initFederation(urlOrManifest);

    // performance.mark('nf:config');

    // for (const r of remotes) {
    //     await load(r, "./Component");
    // }
    // performance.mark('nf:loaded');
}

export { initMicroFrontends }