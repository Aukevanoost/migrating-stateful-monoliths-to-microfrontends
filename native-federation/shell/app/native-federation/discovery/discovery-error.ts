class MFEDiscoveryError extends Error {
    constructor(message: string) {
      super(message); 
      this.name = "MFEDiscoveryError"; 
    }
}

export {MFEDiscoveryError}