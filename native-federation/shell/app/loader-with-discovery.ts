import { fetchDiscovery, initFederation, loadRemoteModule } from './native-federation';
import { TeamDiscoveryManifest, verifyMicroFrontendsAvailable } from './native-federation/discovery';

const loadMicroFrontend = (manifest: TeamDiscoveryManifest) => ([team, comp]): Promise<boolean> => {
    const entry = manifest[team].microfrontends[comp][0];
    return loadRemoteModule(team, entry.extras.nativefederation.key)
        .then(_ => window.dispatchEvent(new CustomEvent('mfe-loaded', {
            detail: {...entry.metadata, ...entry.extras.nativefederation}
        })))
}

const loadMicroFrontends = (manifest: TeamDiscoveryManifest) => (mfe: Record<string, string[]>) => {
    return verifyMicroFrontendsAvailable(mfe)(manifest)
        .then(_ => initFederation(
            Object.entries(manifest).reduce((ngConfig, [team,cfg]) => ({
                ...ngConfig, 
                [team]: cfg.manifest
            }), {})
        ))
        .then(_ => window.dispatchEvent(new Event('mfe-initialized')))
        .then(_ => {
            window.dispatchEvent(new Event('mfe-initialized'));
            return Promise.all(
                Object.entries(mfe)
                    .flatMap(([team, components]) => 
                        components
                            .map(comp => [team, comp])
                            .map(loadMicroFrontend(manifest))
                    )
            )
        })
}

(() => {
    fetchDiscovery().then(manifest => {
        window.dispatchEvent(new CustomEvent('mfe-loader-available', {
            detail: { load: loadMicroFrontends(manifest) }
        }))
    })
})()