var express = require('express');
var router = express.Router();
var connection = require('../sql.js');

router.post('/', function(req, res, next) {
	var { username, password } = req.body;
	connection.query(`select * from user where username='${username}'`, function(err, result) {
		if(err) {
			console.log(err.sqlMessage);
		} else {
			if(result.length != 0) {
                var user={
                    name:"Chen-xy",
                    age:"22",
                    address:"bj"
                }
                req.session.user = user;
                console.log(req.session.user);
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
