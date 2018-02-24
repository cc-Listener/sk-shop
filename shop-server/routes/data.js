var express = require('express');
var router = express.Router();
var connection = require('../sql.js');
var async = require('async');
var cors = require('cors');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('api demo');
});

router.get('/index_data', function(req, res, next) {
    var reqArr = ['swiper', 'big', 'category', 'tab', 'week_good'];
    var indexData = {};
    reqArr.map((item, index) => {
        connection.query(`select * from ${item}`, function(err, result) {
            if (err) {
                console.log(err.sqlMessage);
            } else {
                indexData[`${item}`] = result;
                if( index == reqArr.length - 1 ) {
                    res.send(indexData)
                }
            }
        })
    });
});

router.get('/detail', function(req, res, next) {
    var { id, p, page_size } = req.query;
    p = p || 1;
    page_size = page_size || 10;
    connection.query(`select * from floor where id=${id} limit ${(p-1)*10},${page_size * p}`, function (err, result) {
        if(err){
            res.send(err.sqlMessage);
        } else {
            res.send(result)
        }
    })
});

router.post('/login', function(req, res, next) {
  console.log(req.session.user);
    var {
        username,
        password
    } = req.body;
    connection.query(`select * from user where username='${username}'`, function(err, result) {
        if (err) {
            console.log(err.sqlMessage);
        } else {
            if (result.length != 0) {
                var user = {
                    name: "Chen-xy",
                    age: "22",
                    address: "bj"
                }
                req.session.user = user;
                res.send({
                    msg: '登录成功',
                    status: 1,
                    user: req.session.user
                })
            } else {
                res.send({
                    msg: '登录失败',
                    status: 0
                })
            }
        }
    });
});

module.exports = router;
