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
    var reqArr = ['swiper', 'big', 'index_category', 'tab', 'week_good'];
    var indexData = {};
    reqArr.map((item, index) => {
        connection.query(`select * from ${item}`, function(err, result) {
            if (err) {
                console.log(err.sqlMessage);
            } else {
                indexData[`${item}`] = result;
                if (index == reqArr.length - 1) {
                    res.send(indexData)
                }
            }
        })
    });
});
// 首页专题详情
router.get('/detail', function(req, res, next) {
    var {
        id,
        p,
        page_size
    } = req.query;
    p = p || 1;
    page_size = page_size || 10;
    connection.query(`select * from floor where id=${id} limit ${(p-1)*page_size},${page_size}`, function(err, result) {
        if (err) {
            res.send(err.sqlMessage);
        } else {
            res.send(result)
        }
    })
});
// 品牌列表
router.get('/brand_list', function(req, res, next) {

    connection.query(`SELECT * FROM brand ORDER BY cap`, function(err, result) {
        if (err) {
            res.send(err.sqlMessage);
        } else {
            var brandList = {};
            var firstCap = '';
            result.map((item, index) => {
                var newObj = {
                    cname: item.cname,
                    ename: item.ename,
                    id: item.brandId
                }
                if (firstCap != item.cap) {
                    firstCap = item.cap;
                    brandList[item.cap] = [];
                    brandList[item.cap].push(newObj)
                } else {
                    brandList[item.cap].push(newObj)
                }
            });
            res.send(brandList)
        }
    })
});

// 判断姓名是否存在
router.get('/checkname', function(req, res, next) {
    var {
        name
    } = req.query;
    connection.query(`select * from user where username='${name}'`, function(err, result) {
        if (err) {
            console.log(err.sqlMessage);
        } else {
            if (result.length == 0) {
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

    });
})

// 注册接口
router.post('/register', function(req, res, next) {
    var {
        username,
        password,
        create_time,
        phonenum
    } = req.body;
    var insertSql = `insert into user (username, password, create_time, phonenum) values ('${username}', '${password}', '${create_time}', '${phonenum}')`;
    connection.query(insertSql, function(err, result) {
        if (err) {
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
    })

});

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
                var {
                    username,
                    phonenum,
                    id
                } = result[0];
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
// 尖货头部数据
router.get('/hot_goods_header', function(req, res, next) {
    var data = {
        tags: [{
            introduction: "",
            img: "//pic12.secooimg.com/content/17/3/59c8671568454db98e26ae498cba9f96.jpg",
            title: "最新",
            id: 1
        }, {
            introduction: "",
            img: "//pic12.secooimg.com/content/17/4/ff053853b85946f18e97ca38711b69a0.jpg",
            title: "时髦",
            id: 5
        }, {
            introduction: "",
            img: "//pic12.secooimg.com/content/17/4/da7d1c418e1349a1bcfb3e2136ee457f.jpg",
            title: "型男",
            id: 8
        }, {
            introduction: "",
            img: "//pic12.secooimg.com/content/17/4/181d04c31b8441ff952dd4c56c7897ed.jpg",
            title: "女士",
            id: 15
        }, {
            introduction: "",
            img: "//pic12.secooimg.com/content/17/4/01fce687bc8d4499899dade5414c0123.jpg",
            title: "生活",
            id: 6
        }, {
            introduction: "",
            img: "//pic12.secooimg.com/content/17/4/5df48badd68b4790a307319775c2a6e6.jpg",
            title: "美妆",
            id: 7
        }, {
            introduction: "",
            img: "//pic12.secooimg.com/content/17/4/cf38233f22ed4dabaf05f1bf8707625e.jpg",
            title: "健康",
            id: 9
        }],
        banners: [{
            urlType: 0,
            img: "http://pic12.secooimg.com/content/17/11/b914b79fa0594972b5a9091d9039c019.jpg",
            url: "wb_1114_dkfur"
        }, {
            urlType: 0,
            img: "http://pic12.secooimg.com/content/17/11/ecd1b15a8d5c4fb890efcc95a817f513.jpg",
            url: "shzt_1115list"
        }, {
            urlType: 0,
            img: "http://pic12.secooimg.com/content/17/11/17036f33d0724eef862bfbea8dfca6e1.jpg",
            url: "shzt_1028list"
        }],
    }
    res.send(data);
});


module.exports = router;
