const { withNativeFederation } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'teasers',
  exposes: {
    './web-component': './projects/teasers/src/bootstrap/bootstrap.csr.ts',
    './ssr': './projects/teasers/src/bootstrap/bootstrap.ssr.ts',
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