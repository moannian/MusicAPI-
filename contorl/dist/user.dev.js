"use strict";

var exec = require("../db/mysql");

var login = function login(username, password) {
  var sql = "select * from user where user=\"".concat(username, "\" ;");
  return exec(sql).then(function (res) {
    if (res.length == 0) {
      return Promise.reject("没有此用户");
    } else {
      if (res[0].password != password) {
        return Promise.reject("密码错误");
      }

      return res;
    }
  });
};

var register = function register(username, password) {
  var find = " select * from user where user=\"".concat(username, "\";");
  return exec(find).then(function (res) {
    if (res.length > 0) {
      return Promise.reject("此账户已注册");
    } else {
      var sql = "insert into user(user,".concat("password", ")values(\"", username, "\",").concat(password, ");");
    }
  });
};

module.exports = {
  login: login,
  register: register
};