import {
    LoadRemoteModuleOptions,
    Manifest,
    RemoteConfig
} from "@angular-architects/module-federation";
import { InjectionToken } from "@angular/core";

export type MFEDiscoveryContract = RemoteConfig & {
    exposedModule: string;
    displayName: string;
    routePath: string;
    ngComponentName: string;
}

export type MFeManifest = Manifest<MFEDiscoveryContract>;

export const MANIFEST = new InjectionToken<MFeManifest>('manifest');


// -----

export type PluginOptions = LoadRemoteModuleOptions & {
    displayName: string;
    componentName: string;
}