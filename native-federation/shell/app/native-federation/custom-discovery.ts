import { NAMESPACE } from "./global-cache";

class MFEDiscoveryError extends Error {
    constructor(message) {
      super(message); 
      this.name = "MFEDiscoveryError"; 
    }
  }

interface MfeDiscoveryManifest {
    url: string;
    metadata: {integrity: string; version: string},
    deployment: {traffic: number, default: boolean, prod?: boolean},
    extras: {
        nativefederation: {
            manifest: string,
            key: string,
            element: string
        }
    }
}

interface TeamDiscoveryManifest extends Record<string, {
    manifest: string;
    microfrontends: Record<string, MfeDiscoveryManifest[]>;
}> {}

const fetchDiscovery = ({disableCache, url} = {disableCache: false, url: "http://localhost:3000/teams"}): Promise<TeamDiscoveryManifest> => {
    if(disableCache) sessionStorage.removeItem(NAMESPACE + ".discovery");
    const cache = sessionStorage.getItem(NAMESPACE + ".discovery");

    const mfe_discovery_manifest = !!cache 
        ? Promise.resolve(JSON.parse(cache)) 
        : fetch(url).then(r => r.json());

    return mfe_discovery_manifest
        .then(r => {
            if(!disableCache) sessionStorage.setItem(NAMESPACE + ".discovery", JSON.stringify(r));
            return r;
        })
}

const verifyMicroFrontendsAvailable = (requested: Record<string, string[]>) => (manifest: TeamDiscoveryManifest): Promise<TeamDiscoveryManifest> => {
    Object.entries(requested).forEach(([team, mfe]) => {
        if(!manifest[team]) Promise.reject(new MFEDiscoveryError(`Team '${team}' not found.`));
        const discMfe = Object.keys(manifest[team].microfrontends);
        mfe.forEach(reqMfe => {
            if(!discMfe.includes(reqMfe)) Promise.reject(new MFEDiscoveryError(`Micro frontend not found in team '${team}', available: [${discMfe.join(', ')}]`));
        });
    });
    return Promise.resolve(manifest);
}

export {MfeDiscoveryManifest, TeamDiscoveryManifest, fetchDiscovery, verifyMicroFrontendsAvailable}