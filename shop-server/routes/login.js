var express = require('express');
var router = express.Router();
var connection = require('../sql.js');

router.post('/', function(req, res, next) {
	console.log(req.body);
	var { username, password } = req.body;
	connection.query(`select * from user where username='${username}'`, function(err, result) {
		if(err) {
			console.log(err.sqlMessage);
		} else {
			if(res.length != 0) {
				res.send({
					msg: '登录成功',
					status: 1
				})
			} else {
				res.send({
					msg: '登录失败',
					status: 0
				})
			}
		}
	} );
} );

module.exports = router;