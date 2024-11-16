const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'teasers',
  exposes: {
    './routes': './projects/teasers/src/exp-teasers/teasers.route.ts',
    './Component': './projects/teasers/src/exp-teasers/teasers.component.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    'express',
    '@angular/ssr'
  ]
});
