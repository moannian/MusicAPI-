const exec = require("../db/mysql")
const login = (username, password) => {
    let sql = `select * from user where user="${username}" ;`
    return exec(sql).then(res => {
        if (res.length == 0) {
            return Promise.reject("没有此用户")
        } else {
            if (res[0].password != password) {
                return Promise.reject("密码错误")
            }
            return res
        }
    })
};
const register = (username, password) => {

        let find = ` select * from user where user="${username}";`
        return exec(find).then(res => {
                    if (res.length > 0) {
                        return Promise.reject("此账户已注册")
                    } else {
                        let sql = `insert into user(user,${`password`})values("${username}",${password});`
        }
    })
}


module.exports = {
    login,
    register
}