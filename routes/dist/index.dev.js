"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../model/model'),
    SucceedModel = _require.SucceedModel,
    ErrorModel = _require.ErrorModel;

var _require2 = require('../contorl/user'),
    login = _require2.login;
/* GET home page. */


router.get('/', function (req, res, next) {
  res.json({
    test: "我是测试"
  });
});
module.exports = router;