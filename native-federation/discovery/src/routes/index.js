var express = require('express');
var router = express.Router();
var {EXPLORE_MFE} = require('./../db/team-explore.js');

router.get('/', function(req, res, next) {
  res.json({
    schema: "https://github.com/awslabs/frontend-discovery/blob/main/schema/v1-pre.json",
    microFrontends: {
      ...EXPLORE_MFE,
      // other team MFE
    }
  });
});
module.exports = router;
