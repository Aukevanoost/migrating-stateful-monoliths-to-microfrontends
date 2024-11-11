import { CacheOf } from "../cache/cache.contract";

type DiscoveredRemoteModule = {
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

type MfeDiscoveryManifest = {
    schema: string;
    microFrontends: Record<string, DiscoveredRemoteModule[]>;
}

type DiscoveryProps = { discovery: Record<string, DiscoveredRemoteModule[]>; }
type DiscoveryCache = CacheOf<DiscoveryProps>;

export {MfeDiscoveryManifest, DiscoveredRemoteModule, DiscoveryProps, DiscoveryCache}