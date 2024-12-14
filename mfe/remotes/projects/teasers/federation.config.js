const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'teasers',
  exposes: {
    './Component': './projects/teasers/src/bootstrap.ts',
  },
  shared: {
    // ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    '@shared',
    'rxjs/testing',
    'rxjs/webSocket',
    /^@softarc\/native-federation-node/
  ],
  sharedMappings: ['@shared']
});