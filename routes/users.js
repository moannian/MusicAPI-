var express = require('express');
const { register, login } = require('../contorl/user');
var router = express.Router();

const { SucceedModel, ErrorModel } = require('../model/model')
    /* GET users listing. */
router.post('/login', function(req, respontent, next) {

    let { username, password } = req.body;
    login(username, password).then(res => {
        // 同步到session中
        req.session.username = username;
        req.session.password = password;
        return respontent.json(new SucceedModel(res))
    }).catch(error => {
        return respontent.json(new ErrorModel(error))
    })

});
router.post('/register', function(req, res, next) {
    let { username, password } = req.body;
    register(username, password).then(_ => {
        return res.json(new SucceedModel("注册成功"))
    }).catch(error => {
        return res.json(new ErrorModel(error))
    })
});


// router.post('/register', function(req, res, next) {
//     const { username, password } = res.body;
//     // register(username, password).then(res => {
//     //     return res.json(new SucceedModel(res))
//     // })
//     // return res.json(new ErrorModel())
//     return res.json({ titel: 123 })

// });
module.exports = router;