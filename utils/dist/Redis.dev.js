"use strict";

var redis = require('redis'); // 创建客户端


var redisClient = redis.createClient(6379, '127.0.0.1');
redisClient.on('error', function (eror) {
  console.log(eror);
});
module.exports = redisClient;