const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'explore/recommendations',
  exposes: {
    './Component': './projects/recommendations/src/exp-recommendations/recommendations.component.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    /^@softarc\/native-federation-node/
  ],
  sharedMappings: ['@shared']
});