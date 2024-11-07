var express = require('express');
var router = express.Router();
var MICRO_FRONTENDS = require('./../db/micro-frontends');

router.get('/', function(req, res, next) {
  // return json object
  res.json(MICRO_FRONTENDS);
});
module.exports = router;
