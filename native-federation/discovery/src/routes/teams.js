var express = require('express');
var router = express.Router();
var TEAMS = require('./../db/teams');


router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  res.json(TEAMS[id]);
});

router.get('/', function(req, res, next) {
  res.json(TEAMS);
});



module.exports = router;
