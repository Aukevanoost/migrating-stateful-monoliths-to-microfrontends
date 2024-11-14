var express = require('express');
var router = express.Router();
var {EXPLORE_MFE} = require('./../db/team-explore.js');

router.get('/', function(req, res, next) {
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
  }

  );
});
module.exports = router;
