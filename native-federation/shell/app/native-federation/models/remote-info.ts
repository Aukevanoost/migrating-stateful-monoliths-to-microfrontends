import { SharedConfig } from "./shared-config";

export type RemoteInfo = {
    name: string;
    shared: SharedConfig[];
    exposes: {
        key: string;
        outFileName: string;
    }[];
    baseUrl?: string;
}