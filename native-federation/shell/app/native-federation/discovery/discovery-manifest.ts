interface MicroFrontendVersion {
    url: string;
    metadata: {integrity: string; version: string},
    deployment: {traffic: number, default: boolean, prod?: boolean},
    extras: {
        nativefederation: {
            remoteEntry: string,
            key: string,
            element: string
        }
    }
}

interface MfeDiscoveryManifest{
    schema: string;
    microFrontends: Record<string, MicroFrontendVersion[]>;
}

interface DiscoveryProps {
    discovery: MfeDiscoveryManifest;
}

export {MfeDiscoveryManifest, MicroFrontendVersion, DiscoveryProps}