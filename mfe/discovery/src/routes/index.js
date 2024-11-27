var express = require('express');
var router = express.Router();
var {EXPLORE_MFE} = require('./../db/team-explore.js');

router.get('/', function(_, res, next) {
  res.json({
    ...Object.entries(EXPLORE_MFE)
      .reduce((remotes, [entry,modules]) => ({
        ...remotes, 
        [entry]: modules.reduce((versions, m) => ({
          ...versions,
          [m.metadata.version]: {
            url: m.url,
            version: m.metadata.version,
            module: {
              remoteName: entry,
              remoteEntry: m.extras.nativefederation.remoteEntry,
              exposedModule: m.extras.nativefederation.exposedModule
            }
          }
        }), {})
      }), {})
  });
});

router.get('/from-manifest', function(req, res, next) {
  res.json({
    schema: "https://github.com/awslabs/frontend-discovery/blob/main/schema/v1-pre.json",
    microFrontends: {
      ...EXPLORE_MFE,
    }
  });
});

router.get('/native-federation', function(req, res, next) {
  res.json({
    ...Object.entries(EXPLORE_MFE).reduce((acc, [k,v]) => {
      return {...acc, [k]: v[0].extras.nativefederation.remoteEntry}
    }, {})
  });
});
module.exports = router;