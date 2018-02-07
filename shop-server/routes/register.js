var express = require('express');
var router = express.Router();
var connection = require('../sql.js');

router.post('/', function(req, res, next) {
	var { username, password, create_time, phonenum } = req.body;
	var insertSql = `insert into user (username, password, create_time, phonenum) values ('${username}', '${password}', '${create_time}', '${phonenum}')`;
	connection.query(insertSql, function(err, result) {
		if(err) {
			console.log(err.sqlMessage);
			res.send({
				msg: '注册失败',
				status: 0
			})
		} else {
			res.send({
				msg: '注册成功',
				status: 1
			})
		}
	} )
	
} );
router.get('/checkname', function(req, res, next) {
	var { name } = req.query;
	connection.query(`select * from user where username='${name}'`, function(err, result) {
		if(err) {
			console.log(err.sqlMessage);
		} else {
			if( result.length == 0 ) {
				res.send({
					msg: '',
					status: 1
				})
			} else {
				res.send({
					msg: '该用户名已被占用',
					status: 0
				})
			}
		}
		
	} );
} )

module.exports = router;