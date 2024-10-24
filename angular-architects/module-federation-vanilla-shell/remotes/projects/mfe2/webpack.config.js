const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfe2',
  exposes: {
    './Component': './projects/mfe2/src/bootstrap.ts',
  },
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
    "zone.js": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
  })
});