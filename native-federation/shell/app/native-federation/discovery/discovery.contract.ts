import { CacheOf } from "../cache/cache.contract";

type AvailableRemoteModule = {
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

type AvailableRemoteModules = Record<string, AvailableRemoteModule[]>;

type MfeDiscoveryManifest = {
    schema: string;
    microFrontends: AvailableRemoteModules;
}

type DiscoveryProps = { discovery: AvailableRemoteModules; }
type DiscoveryCache = CacheOf<DiscoveryProps>;

export {MfeDiscoveryManifest, AvailableRemoteModule, AvailableRemoteModules, DiscoveryProps, DiscoveryCache}