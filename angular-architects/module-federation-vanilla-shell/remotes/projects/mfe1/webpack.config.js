const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfe1',
  exposes: {
    './Component': './projects/mfe1/src/bootstrap.ts',

  },
  shared: []  
});

const blub = withModuleFederationPlugin({
  name: 'mfe1',
  exposes: {
    './Component': './projects/mfe1/src/bootstrap.ts',

  },
  shared: []  
});
console.log("=======================================")
console.log(blub);
console.log("=======================================")
console.log(blub.plugins);
console.log("=======================================")
console.log(blub.plugins[0]);
console.log("=======================================")
console.log(blub.plugins[0]._options);