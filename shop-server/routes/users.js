var express = require('express');
var router = express.Router();
var connection = require('../sql.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  connection.query('select pageid,id from big union all select pageid,id from category union all select pageid,id from tab union all select pageid,id from week_good',
  	function(err, response) {
  		if(err) {
  			console.log(err);
  		} else {
  			res.send(response)
  		}
  	} )
});

module.exports = router;
