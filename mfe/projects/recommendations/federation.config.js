const { withNativeFederation } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'recommendations',
  exposes: {
    './web-component': './projects/recommendations/src/bootstrap/bootstrap.csr.ts',
    './ssr': './projects/recommendations/src/bootstrap/bootstrap.ssr.ts',
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