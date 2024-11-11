import { NFDiscoveryError } from "./discovery.error";
import { MfeDiscoveryManifest } from "./discovery.contract";

const verifyRequestedModules = (requested: Record<string, string|"latest">) => (manifest: MfeDiscoveryManifest): Promise<MfeDiscoveryManifest> => {
    Object
        .entries(requested)
        .forEach(([mfeName, version]) => {
            if(!manifest.microFrontends[mfeName] || manifest.microFrontends[mfeName].length < 1) 
                Promise.reject(new NFDiscoveryError(`Micro frontend '${mfeName}' not found`))
            
            if(version !== "latest" && !manifest.microFrontends[mfeName].some(m => m.metadata.version === version)){
                const availableVersions = manifest.microFrontends[mfeName].map(m => m.metadata.version);
                Promise.reject(new NFDiscoveryError(`Micro frontend '${mfeName}' version '${version}' not found, available: [${availableVersions.join(', ')}]`))
            }
        });
    return Promise.resolve(manifest);
}

export { verifyRequestedModules};