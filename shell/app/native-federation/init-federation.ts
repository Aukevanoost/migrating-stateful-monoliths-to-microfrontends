import { appendImportMapToBody, ImportMap } from './import-map'; 
import { processRemoteInfos } from './remote-info';

const initFederation = async (remotesOrManifestUrl: string | Record<string, string> = {}) => {
    return fetchRemotes(remotesOrManifestUrl)
        .then(processRemoteInfos)
        .then(importMap => {
            appendImportMapToBody(importMap);
            return importMap;
        })
}

const fetchRemotes = (remotesOrManifestUrl: string | Record<string, string> = {}): Promise<Record<string, string>> => 
    (typeof remotesOrManifestUrl === 'string')
        ? fetch(remotesOrManifestUrl).then(r => r.json())
        : Promise.resolve(remotesOrManifestUrl)

export { initFederation};