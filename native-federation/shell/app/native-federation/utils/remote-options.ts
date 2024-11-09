import { RemoteOptions } from "../models/remote-options";

const normalize = (
    optionsOrRemoteName: RemoteOptions | string,
    exposedModule?: string
): RemoteOptions =>  {
    if (typeof optionsOrRemoteName === 'string' && exposedModule) {
        return {
            remoteName: optionsOrRemoteName,
            exposedModule,
        };
    } else if (typeof optionsOrRemoteName === 'object' && !exposedModule) {
        return optionsOrRemoteName;
    }
    
    throw new Error('unexpected arguments: please pass options or a remoteName/exposedModule-pair');
}

export {normalize}