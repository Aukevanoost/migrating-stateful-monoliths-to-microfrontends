interface MfeDiscoveryManifest {
    url: string;
    metadata: {integrity: string; version: string},
    deployment: {traffic: number, default: boolean, prod?: boolean},
    extras: {
        nativefederation: {
            entryPoint: string,
            key: string,
            element: string
        }
    }
}

interface TeamDiscoveryManifest extends Record<string, {
    entryPoint: string;
    microfrontends: Record<string, MfeDiscoveryManifest[]>;
}> {}

interface DiscoveryProps {
    discovery: TeamDiscoveryManifest;
}

export {MfeDiscoveryManifest, DiscoveryProps, TeamDiscoveryManifest}