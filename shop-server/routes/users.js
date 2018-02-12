var express = require('express');
var router = express.Router();
var connection = require('../sql.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(req.session.user);
});

module.exports = router;
