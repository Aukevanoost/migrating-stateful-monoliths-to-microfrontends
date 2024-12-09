const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'explore',

  exposes: {
    './Component': './projects/recommendations/src/bootstrap.ts'
  },

  shared: {
    //...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  skip: [
    'rxjs/ajax',
    '@shared',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    /^@softarc\/native-federation-node/
  ],
  sharedMappings: ['@shared']
});
