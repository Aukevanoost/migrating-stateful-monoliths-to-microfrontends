import { fetchDiscovery, initFederation, loadRemoteModule } from './native-federation';
import { MfeDiscoveryManifest, TeamDiscoveryManifest, verifyMicroFrontendsAvailable } from './native-federation/custom-discovery';

const loadMicroFrontends = (manifest: TeamDiscoveryManifest) => (mfe: Record<string, string[]>) => {
    return verifyMicroFrontendsAvailable(mfe)(manifest)
        .then(_ => {
            return initFederation(
                Object.keys(manifest).reduce((a,b) => {
                    return {...a, [b]: manifest[b].manifest};
                }, {})
            )
        })
        .then(_ => window.dispatchEvent(new Event('mfe-initialized')))
        .then(_ => {
            window.dispatchEvent(new Event('mfe-initialized'));
            return Promise.all(
                Object.entries(mfe)
                    .flatMap(([team, components]) => 
                        components
                            .map(comp => [team, comp])
                            .map(([team, c]) => [team, manifest[team].microfrontends[c][0]]) 
                            .map(([team, c]: [string, MfeDiscoveryManifest]) => 
                                loadRemoteModule(team, c.extras.nativefederation.key)
                                    .then(_ => window.dispatchEvent(new CustomEvent('mfe-loaded', {
                                        detail: {...c.metadata, ...c.extras.nativefederation}
                                    })))
                            )
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