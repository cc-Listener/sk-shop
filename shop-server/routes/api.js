var express = require('express');
var router = express.Router();
var connection = require('../sql.js');
var async = require('async');
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('api demo');
});
router.get('/index_data', function(req, res, next) {
    var indexData = {};
    console.log(req.session);
    async.parallel([
        function(cb) {
            connection.query('select * from swiper', function(err, result) {
                if (err) {
                    console.log(err.sqlMessage);
                } else {
                    indexData.swiper = result;
                    cb(null);
                }
            })
        },

        function(cb) {
            connection.query('select * from big', function(err, result) {
                if (err) {
                    console.log(err.sqlMessage);
                } else {
                    indexData.big = result;
                    cb(null);
                }
            })
        },

        function(cb) {
            connection.query('select * from category', function(err, result) {
                if (err) {
                    console.log(err.sqlMessage);
                } else {
                    indexData.category = result;
                    cb(null);
                }
            })
        },

        function(cb) {
            connection.query('select * from tab', function(err, result) {
                if (err) {
                    console.log(err.sqlMessage);
                } else {
                    indexData.tab = result;
                    cb(null);
                }
            });
        },

        function(cb) {
            connection.query('select * from week_good', function(err, result) {
                if (err) {
                    console.log(err.sqlMessage);
                } else {
                    indexData.week = result;
                    cb(null);
                }
            });
        },

    ],function (err, result) {
        res.send(indexData);
    } )
} );
module.exports = router;
