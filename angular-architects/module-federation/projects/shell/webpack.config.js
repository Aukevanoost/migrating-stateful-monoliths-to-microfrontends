const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "mfe1": "http://localhost:4201/remoteEntry.js",    
  },

  //
  // The combination of singleton: true and strictVersion: true makes webpack emit a runtime error
  // when the shell and the Micro Frontend(s) need different incompatible versions (e. g. two different
  // major versions). If we skipped strictVersion or set it to false, webpack would only emit a warning
  // at runtime. More information³⁶ about dealing with version mismatches can be found in one of the
  // subsequent chapters.
  // The setting requiredVersion: 'auto' is a little extra provided by the @angular-architects/module-federation
  // plugin. It looks up the used version in your package.json. This prevents several issues.
  //
  // - Enterprise Angular v6

  shared: share({
    "@angular/core": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@angular/common": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@angular/common/http": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@angular/router": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
  }),
  // shared: {...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })} ,

});
