const mysql = require('mysql')

const db = mysql.createConnection({
    host : "localhost", 
    user : "root", 
    password : "", 
    database : "task_management"
})

module.exports = db