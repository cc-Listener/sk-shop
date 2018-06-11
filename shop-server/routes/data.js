var express = require('express');
var router = express.Router();
var connection = require('../sql.js');
var async = require('async');
var cors = require('cors');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('api demo');
});
// 首页数据
router.get('/index_data', function(req, res, next) {
    var reqArr = ['swiper', 'big', 'index_category', 'tab', 'week_good'];
    var indexData = {};
    reqArr.map((item, index) => {
        connection.query(`select * from ${item}`, function(err, result) {
            if (err) {
                res.send(err);
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
            img: "//pic12.secooimg.com/content/17/3/59c8671568454db98e26ae498cba9f96.jpg",
            title: "最新",
            id: 1
        }, {
            img: "//pic12.secooimg.com/content/17/4/ff053853b85946f18e97ca38711b69a0.jpg",
            title: "时髦",
            id: 5
        }, {
            img: "//pic12.secooimg.com/content/17/4/da7d1c418e1349a1bcfb3e2136ee457f.jpg",
            title: "型男",
            id: 8
        }, {
            img: "//pic12.secooimg.com/content/17/4/181d04c31b8441ff952dd4c56c7897ed.jpg",
            title: "女士",
            id: 15
        }, {
            img: "//pic12.secooimg.com/content/17/4/01fce687bc8d4499899dade5414c0123.jpg",
            title: "生活",
            id: 6
        }, {
            img: "//pic12.secooimg.com/content/17/4/5df48badd68b4790a307319775c2a6e6.jpg",
            title: "美妆",
            id: 7
        }, {
            img: "//pic12.secooimg.com/content/17/4/cf38233f22ed4dabaf05f1bf8707625e.jpg",
            title: "健康",
            id: 9
        }],
        banners: [{
            img: "http://pic12.secooimg.com/content/17/11/b914b79fa0594972b5a9091d9039c019.jpg",
            url: "wb_1114_dkfur"
        }, {
            img: "http://pic12.secooimg.com/content/17/11/ecd1b15a8d5c4fb890efcc95a817f513.jpg",
            url: "shzt_1115list"
        }, {
            img: "http://pic12.secooimg.com/content/17/11/17036f33d0724eef862bfbea8dfca6e1.jpg",
            url: "shzt_1028list"
        }],
    }
    res.send(data);
});

// 晒货列表
router.get('/hot_goods_comment', function(req, res, next) {
    var {
        lineNumber,
        tagId
    } = req.query;
    request(`http://las.secoo.com/api/show/hot_show_list?lineNumber=${lineNumber}&tagId=${tagId}&size=20&c_app_ver=1.0&c_device_id=8664e726-1448-4c49-a4c2-4350a13aa642`, function(err, response, body) {
        res.send(JSON.parse(body));
    })
})
// 商品详情
router.get('/good_detail', function(req, res, next) {
    var {
        id
    } = req.query;
    request(`http://las.secoo.com/api/product/detail_new?upk=&productId=${id}&size=2&c_platform_type=0&_=1519723794125`, function(err, response, body) {
        var data = JSON.parse(body);
        var {
            brandStory,
            kuChequeInfo,
            productInfo,
            pickupInfo,
            brandName,
            serviceList,
            wecharManage,
            modelSort
        } = data;
        var {
            categoryId,
            brandId
        } = productInfo;
        var detail = {
            brandStory,
            kuChequeInfo,
            productInfo,
            pickupInfo,
            brandName,
            serviceList,
            categoryId,
            brandId,
            wecharManage
        };
        res.send(detail);
    });
});
// 商品详情-推荐商品
router.get('/groom', function(req, res, next) {
    var {
        categoryId,
        brandId,
        id
    } = req.query;
    // 推荐商品
    request(`https://lr.secooimg.com/recommend?&productId=${id}&c_platform_type=0&type=similar&count=12&platformType=2&categoryId=${categoryId}&brandId=${brandId}&_=1519869583306`, function(err, ress, body) {
        if (err) {
            res.send(err)
        } else {
            var {
                productList
            } = JSON.parse(body);
            productList = productList.map(item => {
                item.picUrl = '//pic12.secooimg.com/product/300/300/' + item.picUrl;
                return item;
            });
            res.send(productList);
        }

    });
});
// 商品详情-商品评论
router.get('/good_comment', function(req, res, next) {
    var {
        categoryId,
        brandId,
        id
    } = req.query;
    // 获取评论列表
    request(`http://las.secoo.com/api/comment/show_product_comment?upk=&productId=${id}&size=2&c_platform_type=0&type=0&filter=0&page=1&pageSize=8&productBrandId=${brandId}&productCategoryId=${categoryId}&_=1519869583304`, function(err, response, body) {
        if (err) {
            res.send(err);
        } else {
            var data = JSON.parse(body);
            res.send(data);
        }

    })
});
// 商品详情-商品规格
router.get('/good_spec', function(req, res, next) {
    var {
        id
    } = req.query;
    // 获取颜色，码数
    request(`http://las.secoo.com/api/product/spec_new?upk=&productId=${id}&size=2&c_platform_type=0&_=1519876301591`, function(err, response, body) {
        var data = JSON.parse(body);
        res.send(data);
    })
});
// 商品详情-更多规格信息
router.get('/good_moreSize', function(req, res, next) {
    var {
        id
    } = req.query;
    request(`http://las.secoo.com/api/product/size?upk=&productId=${id}&size=2&c_platform_type=0&_=1521617937073`, function(err, response, body) {
        if (err) {
            res.send(err)
        } else {
            var data = JSON.parse(body);
            res.send(data);
        }
    })
})
// 晒货评论详情
router.get('/comment_detail', function(req, res, next) {
    var {
        id
    } = req.query;
    request(`https://las.secoo.com/api/show/comment_show?commentShowDetailId=${id}&c_app_ver=1.0&c_device_id=8664e726-1448-4c49-a4c2-4350a13aa642&_=1520323819839`, function(err, response, body) {

        var data = JSON.parse(body);
        if (err) {
            res.send(err)
        } else {
            res.send(data);
        }
    })
});


module.exports = router;
