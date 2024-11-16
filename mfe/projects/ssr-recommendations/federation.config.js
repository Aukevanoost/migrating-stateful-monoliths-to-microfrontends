const { withNativeFederation } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'ssr-teasers',
  exposes: {
    './exp-reccomendations': './projects/ssr-recommendations/src/bootstrap.ts',
  },
  shared: {
    //...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  // skip: [
  //   'rxjs/ajax',
  //   'rxjs/fetch',
  //   'rxjs/testing',
  //   'rxjs/webSocket',
  //   'express',
  //   '@angular/ssr',
  //   '@angular/elements'
  // ]
});