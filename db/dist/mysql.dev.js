"use strict";

var mysql = require('mysql');

var connect = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: "123456",
  port: "3306",
  database: "music"
});
connect.connect();

function exec(sql) {
  var promise = new Promise(function (reslove, reject) {
    connect.query(sql, function (err, result) {
      if (err) {
        reject(err);
      }

      reslove(result);
    });
  });
  return promise;
}

module.exports = exec; // 查询