"use strict";

var express = require('express');

var _require = require('../contorl/user'),
    register = _require.register,
    login = _require.login;

var router = express.Router();

var _require2 = require('../model/model'),
    SucceedModel = _require2.SucceedModel,
    ErrorModel = _require2.ErrorModel;
/* GET users listing. */


router.post('/login', function (req, respontent, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;
  login(username, password).then(function (res) {
    // 同步到session中
    req.session.username = username;
    req.session.password = password;
    return respontent.json(new SucceedModel(res));
  })["catch"](function (error) {
    return respontent.json(new ErrorModel(error));
  });
});
router.post('/register', function (req, res, next) {
  var _req$body2 = req.body,
      username = _req$body2.username,
      password = _req$body2.password;
  register(username, password).then(function (_) {
    return res.json(new SucceedModel("注册成功"));
  })["catch"](function (error) {
    return res.json(new ErrorModel(error));
  });
}); // router.post('/register', function(req, res, next) {
//     const { username, password } = res.body;
//     // register(username, password).then(res => {
//     //     return res.json(new SucceedModel(res))
//     // })
//     // return res.json(new ErrorModel())
//     return res.json({ titel: 123 })
// });

module.exports = router;