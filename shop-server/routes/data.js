var express = require('express');
var router = express.Router();
var connection = require('../sql.js');
var async = require('async');
var cors = require('cors');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('api demo');
});
// 首页数据
router.get('/index_data', function(req, res, next) {
    console.log(req.session);
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
// 首页专题详情
router.get('/detail', function(req, res, next) {
    var { id, p, page_size } = req.query;
    p = p || 1;
    page_size = page_size || 10;
    connection.query(`select * from floor where id=${id} limit ${(p-1)*page_size},${page_size}`, function (err, result) {
        if(err){
            res.send(err.sqlMessage);
        } else {
            res.send(result)
        }
    })
});
// 品牌列表
router.get('/brand_list', function(req, res, next) {

    connection.query(`SELECT * FROM brand ORDER BY cap`, function (err, result) {
        if(err){
            res.send(err.sqlMessage);
        } else {
            var brandList = {};
            var firstCap = '';
            result.map( (item, index) => {
                var newObj = {
                    cname: item.cname,
                    ename: item.ename,
                    id: item.brandId
                }
                if( firstCap != item.cap ) {
                    firstCap = item.cap;
                    brandList[item.cap] = [];
                    brandList[item.cap].push(newObj)
                } else {
                    brandList[item.cap].push(newObj)
                }
            } );
            res.send(brandList)
        }
    })
});

// 判断姓名是否存在
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

// 注册接口
router.post('/register', function(req, res, next) {
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

// 登陆接口
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
                var { username, phonenum, id } = result[0];
                var userInfor = {
                    username,
                    phonenum,
                    id
                }
                console.log(userInfor);
                req.session.user = userInfor;
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
    });
});

module.exports = router;
