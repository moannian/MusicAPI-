var express = require('express');
var router = express.Router();
const { SucceedModel, ErrorModel } = require('../model/model')
const { login } = require('../contorl/user')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({
        test: "我是测试"
    })


});

module.exports = router;