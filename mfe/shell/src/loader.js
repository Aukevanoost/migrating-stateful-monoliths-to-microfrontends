import { initFederation } from 'vanilla-native-federation';

const initMicroFrontends = async (urlOrManifest, remotes) => {
    performance.mark('nf:init');
    if(typeof urlOrManifest === "object" && !remotes ){
        remotes = Object.keys(urlOrManifest);
    }

    const {load} = await initFederation(urlOrManifest);

    performance.mark('nf:config');

    for (const r of remotes) {
        await load(r, "./Component");
    }
    performance.mark('nf:loaded');
}

export { initMicroFrontends }