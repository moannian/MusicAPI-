const mysql = require('mysql');
const connect = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "123456",
    port: "3306",
    database: "music"
})
connect.connect();



function exec(sql) {
    const promise = new Promise((reslove, reject) => {
        connect.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }
            reslove(result)
        })
    })

    return promise
}

module.exports = exec;
// 查询